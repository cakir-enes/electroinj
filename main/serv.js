var nc = require('ts-nats')
const catchHandler = err => ({ payload: err, resolved: false })
const successHandler = v => ({ payload: v, resolved: true })
const reflect = p => (p.then(successHandler).catch(catchHandler))

const subs = ['FTE.DISC', 'ESM.DISC']
nc.connect().then(conn => {
    console.log("CONNECTED")
    Promise.all(subs.map(s => reflect(conn.request(s))))
        .then(v => console.log(v))

    // .then(r => r.forEach(console.log(r)))
    // .catch(er => console.log(er))
})


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}