import createWindow from './create-window';
import exitOnChange from './exit-on-change';

export {
  createWindow,
  exitOnChange,
};


export type Status<T> = {
  payload: T; resolved: boolean;
};
const catchHandler = error => <Status<never>>{payload: error, resolved: false};
function successHandler<T>(result: T) {
  return <Status<T>>{payload: result, resolved: true};
}
export function reflect<T>(p: Promise<T>): Promise<Status<T>> {
  return p.then(r => successHandler<T>(r)).catch(catchHandler);
}
