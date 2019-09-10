import { Parameter } from '../shared/types';

export type Mod = string;
export type Path = string;
export type Val = string;
export type Enum = string;
export type ModInfo = { params: Parameter[]; enums: [Enum, Val[]] }
export interface Accessor {
	allParameterInfo: () => ModInfo;
	multiSet: (newVals: [Path, Val][]) => void;
	multiGet: (paths: Path[]) => [Path, Val][];
}
