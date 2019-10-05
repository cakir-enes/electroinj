import {Client, connect, Msg, Payload} from 'ts-nats';

import {ModInfo, ModInfoMap, NewValsMap, PathVal} from '../../shared/types';
import {reflect, Status} from '../helpers';

import {IAccessor} from './IAccessor';

const mods = ['FTE', 'ESM'];


class NatsClient implements IAccessor {
  private client: Client;

  static async createNew(): Promise<NatsClient> {
    return new Promise<NatsClient>((res, rej) => {
      connect({payload: Payload.JSON})
          .then(conn => {
            let nc = new NatsClient();
            nc.client = conn;
            res(nc);
          })
          .catch(err => rej(err));
    });
  }

  async multiSet(newVals: PathVal[]): Promise<void> {
    let map = this.groupByMods<PathVal>(newVals);
    console.log(`MULTI_SET REQ: ${JSON.stringify(map)}`);
    Object.keys(map).forEach(v => {
      console.log(`Sending request to ${v}.MULTI_SET -> ${map[v]}`);
      this.client.request(`${v}.MULTI_SET`, 500, map[v])
          .catch(err => console.error(`COULDNT MULTI_SET values: ${err}`));
    });
  }

  async allParameterInfo(): Promise<ModInfoMap> {
    let info = <ModInfoMap>{};
    await Promise
        .all(mods.map(m => reflect<Msg>(this.client.request(`${m}.DISCOVER`))))
        .then(
            results =>
                mods.map<[string, Status<Msg>]>((m, i) => [m, results[i]]))
        .then(msgs => msgs.forEach(([mod, msg]) => {
          if (msg.resolved) {
            info[mod] = <ModInfo>{};
            info[mod].enums = msg.payload.data.enums;
            info[mod].params = msg.payload.data.params;
          } else {
            console.error(`Couldnt fetch param infos of ${mod}`);
          }
        }))
        .catch(err => console.error(`Error Fetcing ParamInfos: ${err}`));
    return new Promise(res => {
      res(info);
    });
  }

  async multiGet(paths: string[]): Promise<NewValsMap> {
    let map = this.groupByMods(paths);
    let ans = <NewValsMap>{};
    console.log(`MULTI_GET_REQ: ${JSON.stringify(map)}`);
    return new Promise(
        res => Promise
                   .all(Object.keys(map).map(
                       m => reflect<Msg>(
                           this.client.request(`${m}.MULTI_GET`, 500, map[m]))))
                   .then(
                       results => Object.keys(map).map<[string, Status<Msg>]>(
                           (m, i) => [m, results[i]]))
                   .then(
                       msgs => msgs.forEach(
                           ([mod, msg]) => msg.resolved ?
                               (ans[mod] = msg.payload.data) :
                               console.error(`COULDNT FETCH VALUES OF ${mod}`)))
                   .then(() => res(ans)));
  }

  private groupByMods<T extends {path: string}>(paths: T[]|
                                                string[]): Map<string, T[]> {
    let map = new Map<string, T[]>();
    paths.forEach(p => {
      const isString = typeof p === 'string';
      const path = isString ? p : p.path;

      const idx = path.indexOf('.');
      const mod = path.substr(0, idx);
      p = isString ? path.substr(idx + 1) : {...p, path: path.substr(idx + 1)};
      if (map[mod])
        map[mod].push(p);
      else
        map[mod] = [p];
    });
    return map;
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
