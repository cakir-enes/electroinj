import {ModInfo, ModInfoMap, NewValsMap, PathVal} from '../../shared/types';

export interface IAccessor {
  multiSet: (newVals: PathVal[]) => void;
  multiGet: (paths: string[]) => Promise<NewValsMap>;
  allParameterInfo: () => Promise<ModInfoMap>;
}
