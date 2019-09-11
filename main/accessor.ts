import { ModInfo, PathVal } from '../shared/types';

export interface Accessor {
	allParameterInfo: () => Promise<ModInfo>;
	multiSet: (newVals: PathVal[]) => void;
	multiGet: (paths: string[]) => PathVal[];
}
