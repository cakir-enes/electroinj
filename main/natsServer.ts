import { connect, Payload } from "ts-nats";

let params = Array.from({ length: 15 }).map((_, i) => ({
  name: `A.B.${i}`,
  val: i.toString(),
  type: "String"
}));

let disc = { params, enums: [{ name: "ASD", vals: ["aa", "bb"] }] };

let logTime = false;
setInterval(() => logTime = !logTime, 1000)

let client = connect({ payload: Payload.JSON });
client
  .then(nc => {
    nc.subscribe("FTE.DISCOVER", (err, msg) => {
      if (err) console.log(err);
      if (msg.reply) {
        console.log(`RECEIVED ${msg}`);
        nc.publish(msg.reply, disc);
      }
    });

    nc.subscribe("FTE.MULTI_SET", (err, msg) => {
      if (err) console.log(err);
      if (msg.reply) {
        console.log(`MULTI_SET PARAMS: ${msg.data}`);
        nc.publish(
          msg.reply,
          msg.data.map(p => ({ path: p, val: Math.random().toFixed(2) }))
        );
      }
    });



    nc.subscribe("FTE.MULTI_GET", (err, msg) => {
      if (logTime) console.log(`RECEIVED MULTI_GET`)
      if (err) console.log(err);
      if (msg.reply) {
        nc.publish(
          msg.reply,
          msg.data.map(p => ({ path: p, val: Math.random().toFixed(2) }))
        );
      }
    });
  })
  .catch(err => console.log(`CANT CONNECT ${err}`));


