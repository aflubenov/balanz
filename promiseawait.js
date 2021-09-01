
let useAwait = async () => {
    let responses = [];
    const startTS = Date.now();
    for(let i = 0; i < 50; i ++) {
        let rta = await fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8").then(r => r.json());
        responses.push(rta);
    }

    return {
        totalTime: Date.now() - startTS,
        responses
    };
}
let usePromiseAll = async () => {
    let promises = [];
    const startTS = Date.now();
    for(let i = 0; i < 50; i ++) {
        promises.push(fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8").then(r => r.json()));
    }

    return Promise.all(promises).then(responses => {
        return {
            totalTime: Date.now() - startTS,
            responses
        };
    })

}

let rawait = await useAwait();
let rpromise = await usePromiseAll();