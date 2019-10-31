var nc = require('ts-nats')


const catchHandler = err => ({ payload: err, resolved: false })
const successHandler = v => ({ payload: v, resolved: true })
const reflect = p => p.then(successHandler).catch(catchHandler)



nc.connect().then(conn => {
    console.log("CONNECTED")
    conn.subscribe('FTE.*', (err, msg) => {
        console.log("SUBBED")
        if (err) {
            console.error(err)
        } else if (msg.reply) {
            conn.publish(msg.reply, JSON.stringify({ params: [{ name: 'fte.sfd', val: '234', type: 'str' }], enums: [{ name: 'FuelType', vals: ['ACD'] }] }))
        }
    })
    console.log("SUBBED to FTE")
    conn.subscribe('ESM.*', (err, msg) => {

        if (err) {
            console.error(err)
        } else if (msg.reply) {
            setTimeout(() => conn.publish(msg.reply, JSON.stringify({ params: 'esm', enums: [{ name: 'FuelType', values: ['DIESEL', 'ZXC'] }] })), 1000)
        }
    })
    console.log("SUBBED TO ESM")
}).catch(err => console.error(err))


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}