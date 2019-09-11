import { connect, Client, Msg, Payload } from 'ts-nats'
import { Accessor, Enum, Val, ModInfo } from './accessor';
import { Parameter } from '../shared/types';


const mods = ["FTE", "ESM"]

type Status<T> = { payload: T, resolved: boolean }
const catchHandler = error => (<Status<never>>{ payload: error, resolved: false });
function successHandler<T>(result: T) {
    return (<Status<T>>{ payload: result, resolved: true })
};
function reflect<T>(p: Promise<T>): Promise<Status<T>> {
    return p.then(r => successHandler<T>(r)).catch(catchHandler)
}
// const reflect = p => (p.then(successHandler).catch(catchHandler))

class NatsClient implements Accessor {
    multiSet: (newVals: import("./accessor").PathVal[]) => void;
    multiGet: (paths: string[]) => import("./accessor").PathVal[];

    client: Client


    static async createNew(): Promise<NatsClient> {
        return new Promise<NatsClient>((res, rej) => {
            connect({ payload: Payload.JSON })
                .then(conn => {
                    let nc = new NatsClient()
                    nc.client = conn
                    res(nc)
                })
                .catch(err => rej(err))
        })
    }


    async allParameterInfo(): Promise<ModInfo> {
        let info = <ModInfo>{}
        await Promise.all(mods.map(m => reflect<Msg>(this.client.request(`FTE.DISCOVER`))))
            .then(results => results.filter(s => s.resolved == true))
            .then(msgs => msgs.forEach(msg => {
                info.params = msg.payload.data.params
                info.enums = msg.payload.data.enums
            }))
            .catch(err => console.error(err))
        return new Promise(res => { res(info) })
    }
}


let nc = NatsClient.createNew()
nc.then(nc => {
    console.log("ALL PARAMS")
    nc.allParameterInfo().then(v => console.log(v))
})

export default NatsClient