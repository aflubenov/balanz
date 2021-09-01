export interface ITicker {
    Cotizacion: {
        PrecioCompra: number,
        PrecioMaximo: number,
        PrecioMinimo: number,
        PrecioVenta: number
    }
}

export interface IResponse {
    C48: ITicker,
    CI: ITicker
}

const BALANZ_URL = 'http://localhost:3000/cotizacion';

export const getCotiz = async (ticker: string): Promise<IResponse> => {
    const url = BALANZ_URL + '?ticker=' + ticker;

    return fetch(url).then(response => {
        return response.json();
    });
}

export interface calculo {
    CI: {
        cotiz: number,
        compra: number,
        venta: number
    },
    C48: {
        cotiz: number,
        compra: number,
        venta: number
    }
}

export const calcular = async (ticker: string): Promise<any> => {
    //compro al30c / vendo al30
    let al30cp = getCotiz(ticker + 'C');
    let al30p = getCotiz(ticker);
    let resp: calculo = {
        C48: {
            compra:0,
            cotiz: 0,
            venta: 0
        },
        CI: {
            compra: 0,
            cotiz: 0,
            venta: 0
        }

    };

    return Promise.all([al30cp, al30p]).then(([al30c, al30]) => {
        resp.CI.compra = al30.CI.Cotizacion.PrecioCompra;
        resp.CI.venta = al30c.CI.Cotizacion.PrecioVenta
        resp.CI.cotiz = resp.CI.compra  / resp.CI.venta ;
        resp.C48.compra = al30.C48.Cotizacion.PrecioCompra
        resp.C48.venta = al30c.C48.Cotizacion.PrecioVenta;
        resp.C48.cotiz = resp.C48.compra  / resp.C48.venta ;
        return resp;
    })
}
