import NatsClient from "./ModAccessor/natsClient";
import { REQ } from "../shared/rpc";
import { setInterval, clearInterval } from "timers";
import { ipcMain } from "electron";

export const initHandlers = () => {
  NatsClient.createNew()
    .then(nc => {

      ipcMain.on(REQ.AllParamInfo, (event, arg) => {
        console.log("AllParamInfo received");
        nc.allParameterInfo().then(info => event.reply(REQ.AllParamInfo, info))
      });

      let tok: NodeJS.Timeout | null = null;
      ipcMain.on(REQ.SUBSCRIBE_PARAMS, (event, p, freq) => {
        console.log(`SUB PARAMS: ${JSON.stringify(p)} p: ${JSON.stringify(p)} Freq: ${freq}`);
        tok = setInterval(() => {
          let newVals = Object.entries(p)
            .map(([mod, params]: [string, string[]]) =>
              params.map(param => ({
                name: `${mod}.${param}`,
                val: Math.random().toFixed(3),
                type: "str"
              }))
            )
            .flat();
          // console.log(newVals)
          params.forEach(p => (p.val = Math.random().toFixed(3)))
          event.reply(REQ.SUBSCRIBE_PARAMS, params);
        }, freq)
        // tok = setInterval(() => nc.multiGet(p).then(), freq)
      });


      ipcMain.on(REQ.UNSUB_PARAMS, (e, a) => clearInterval(tok));

      ipcMain.on(REQ.SET, (e, paramName, newVal) => {
        console.log(`SENDING SET REQ NewVal: ${paramName} -> ${newVal}`)
        nc.multiSet([{ path: paramName, val: newVal }])
      })
    })
    .catch(err => console.error(err));
};

const modParams = {
  FTE: {
    params: [{ name: "A.B.C", val: "34", type: "str" }],
    enums: [{ name: "abc", vals: ["a", "v"] }]
  },
  ESM: {
    params: Array.from({ length: 150 }).map((_, i) => ({
      name: `A.X.${i}`,
      val: `${i}`,
      type: "int"
    })),
    enums: []
  }
};

let params = Array.from({ length: 150 }).map((_, i) => ({
  name: `A.B.C[${i}]`,
  val: `${i}`,
  type: "int"
}));
