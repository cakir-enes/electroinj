import { connect, Client, Msg, Payload } from "ts-nats";
import { Accessor } from "./accessor";

import { PathVal, ModInfo, ModsInfo } from "../shared/types";

const mods = ["FTE", "ESM"];

type Status<T> = { payload: T; resolved: boolean };
const catchHandler = error =>
  <Status<never>>{ payload: error, resolved: false };
function successHandler<T>(result: T) {
  return <Status<T>>{ payload: result, resolved: true };
}
function reflect<T>(p: Promise<T>): Promise<Status<T>> {
  return p.then(r => successHandler<T>(r)).catch(catchHandler);
}
// const reflect = p => (p.then(successHandler).catch(catchHandler))

type NewValsMap = { [keyof: string]: PathVal[] };
type ModInfoMap = { [keyof: string]: ModInfo };

class NatsClient {
  private client: Client;

  async multiSet(newVals: PathVal[]): Promise<void> {
    let map = this.groupByMods<PathVal>(newVals);
    console.log(`MULTI_SET REQ: ${JSON.stringify(map)}`);
    Object.keys(map).forEach(v => {
      console.log(`Sending request to ${v}.MULTI_SET -> ${map[v]}`);
      this.client
        .request(`${v}.MULTI_SET`, 500, map[v])
        .catch(err => console.error(`COULDNT MULTI_SET values: ${err}`));
    });
  }

  private groupByMods<T extends { path: string }>(
    paths: T[] | string[]
  ): Map<string, T[]> {
    let map = new Map<string, T[]>();
    paths.forEach(p => {
      const isString = typeof p === "string";
      const path = isString ? p : p.path;

      const idx = path.indexOf(".");
      const mod = path.substr(0, idx);
      p = isString
        ? path.substr(idx + 1)
        : { ...p, path: path.substr(idx + 1) };
      if (map[mod]) map[mod].push(p);
      else map[mod] = [p];
    });
    return map;
  }

  async multiGet(paths: string[]): Promise<NewValsMap> {
    let map = this.groupByMods(paths);
    let ans = <NewValsMap>{};
    console.log(`MULTI_GET_REQ: ${JSON.stringify(map)}`);
    return new Promise(res =>
      Promise.all(
        Object.keys(map).map(m =>
          reflect<Msg>(this.client.request(`${m}.MULTI_GET`, 500, map[m]))
        )
      )
        .then(results =>
          Object.keys(map).map<[string, Status<Msg>]>((m, i) => [m, results[i]])
        )
        .then(msgs =>
          msgs.forEach(([mod, msg]) =>
            msg.resolved
              ? (ans[mod] = msg.payload.data)
              : console.error(`COULDNT FETCH VALUES OF ${mod}`)
          )
        )
        .then(() => res(ans))
    );
  }

  static async createNew(): Promise<NatsClient> {
    return new Promise<NatsClient>((res, rej) => {
      connect({ payload: Payload.JSON })
        .then(conn => {
          let nc = new NatsClient();
          nc.client = conn;
          res(nc);
        })
        .catch(err => rej(err));
    });
  }

  async allParameterInfo(): Promise<ModInfoMap> {
    let info = <ModInfoMap>{};
    await Promise.all(
      mods.map(m => reflect<Msg>(this.client.request(`${m}.DISCOVER`)))
    )
      .then(results =>
        mods.map<[string, Status<Msg>]>((m, i) => [m, results[i]])
      )
      .then(msgs =>
        msgs.forEach(([mod, msg]) => {
          if (msg.resolved) {
            info[mod] = <ModInfo>{};
            info[mod].enums = msg.payload.data.enums;
            info[mod].params = msg.payload.data.params;
          } else {
            console.error(`Couldnt fetch param infos of ${mod}`);
          }
        })
      )
      .catch(err => console.error(`Error Fetcing ParamInfos: ${err}`));
    return new Promise(res => {
      res(info);
    });
  }
}

// NatsClient.createNew().then(c =>
//   c
//     .allParameterInfo()
//     .then(e => {
//       console.log(JSON.stringify(e));
//       return Object.entries(e).reduce(
//         (ps, [mod, info]) =>
//           ps.concat(info.params.map(v => `${mod}.${v.name}`)),
//         [] as string[]
//       );
//     })
//     .then(e => c.multiGet(e))
//     .then(v => console.log(`NewVals:\n ${JSON.stringify(v)}`))
//     .then(() => c.multiSet([{ path: "FTE.A.B.C.D", val: "325" }]))
// );

export default NatsClient;
