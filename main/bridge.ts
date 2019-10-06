import NatsClient from "./ModAccessor/natsClient";
import { REQ } from "../shared/rpc";
import { setInterval, clearInterval } from "timers";
import { ipcMain } from "electron";

export const initHandlers = () => {
  NatsClient.createNew()
    .then(nc => {
      ipcMain.on(REQ.AllParamInfo, (event, arg) => {
        console.log("AllParamInfo received");
        event.reply(REQ.AllParamInfo, modParams);
      });

      let tok: NodeJS.Timeout | null = null;
      ipcMain.on(REQ.SUBSCRIBE_PARAMS, (event, p, freq) => {
        console.log(`SUB PARAMS: ${JSON.stringify(p)}`);
        tok = setInterval(() => {
          let newVals = Object.entries(p)
            .map(([mod, params]: [string, string[]]) =>
              params.map(param => ({
                name: `${mod}.${param}`,
                val: Math.random().toFixed(3)
              }))
            )
            .flat();
          //   let a = params.map(v => ({
          //     ...v,
          //     val: Math.random()
          //       .toFixed(3)
          //       .toString()
          //   }));
          event.reply(REQ.SUBSCRIBE_PARAMS, newVals);
        }, freq);
      });
      ipcMain.on(REQ.UNSUB_PARAMS, (e, a) => clearInterval(tok));
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
