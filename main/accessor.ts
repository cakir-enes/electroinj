import {ModInfo, PathVal} from '../shared/types';

export interface Accessor {
  multiSet: (newVals: PathVal[]) => void;
  multiGet: (paths: string[]) => Promise<{[keyof: string]: PathVal[]}>;
  allParameterInfo: () => Promise<{[keyof: string]: ModInfo}>;
}
