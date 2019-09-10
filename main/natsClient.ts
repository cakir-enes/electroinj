import { connect, Client, Msg } from 'ts-nats'
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
    readonly name = "NATS"
    client: Client


    static async createNew(): Promise<NatsClient> {
        return new Promise<NatsClient>((res, rej) => {
            connect()
                .then(conn => {
                    let nc = new NatsClient()
                    nc.client = conn
                    res(nc)
                })
                .catch(err => rej(err))
        })
    }


    allParameterInfo(): ModInfo {
        const catchHandler = error => ({ payload: error, resolved: false });
        let info = <ModInfo>{}
        Promise.all(mods
            .map(m => reflect<Msg>(this.client.request(`${m}.DISC`))))
            .then(results => results.filter(s => s.resolved == true))
            .then(msgs => msgs.forEach(msg => info[msg.payload.subject] = msg.payload.data))
            .catch(err => console.error(err))
        return info
    }


    multiSet: (newVals: [string, string][]) => void;
    multiGet: (paths: string[]) => [string, string][];


}
