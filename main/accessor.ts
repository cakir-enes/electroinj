import { Parameter } from '../shared/types';

export type Mod = string;
export type Path = string;
export type Val = string;
export type Enum = string;

export type ModInfo = { params: Parameter[]; enums: EnumVal[] }
export type EnumVal = { name: string, vals: string[] }
export type PathVal = { path: string, val: string }

export interface Accessor {
	allParameterInfo: () => Promise<ModInfo>;
	multiSet: (newVals: PathVal[]) => void;
	multiGet: (paths: Path[]) => PathVal[];
}
