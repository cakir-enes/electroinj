import { Parameter } from '../shared/types';

export type Mod = string;
export type Path = string;
export type Val = string;
export type Enum = string;

export interface Accessor {
	readonly name: Mod;
	allParameterInfo: () => { params: Parameter[]; enums: [Enum, Val[]] };
	multiSet: (newVals: [Path, Val][]) => void;
	multiGet: (paths: Path[]) => [Path, Val][];
}
