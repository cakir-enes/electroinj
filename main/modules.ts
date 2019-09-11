import { Accessor } from './accessor';

// type PathMap = { [mod: string]: Path[] };
class DataAccessor {
	// accessors: { [key in Mod]: Accessor };
	// addAccessor(acc: Accessor) {
	// 	this.accessors[acc.name] = acc;
	// }
	// allParameterInfo(): { [mod: string]: { params: Parameter[]; enums: [Enum, Val[]] } } {
	// 	let map: { [mod: string]: { params: Parameter[]; enums: [Enum, Val[]] } } = {};
	// 	Object.entries(this.accessors).forEach(([ mod, acc ]) => {
	// 		let vals = acc.allParameterInfo();
	// 		map[mod].params = vals.params;
	// 		map[mod].enums = vals.enums;
	// 	});
	// 	return map;
	// }
	// multiGet(paths: Path[]): { [key in Mod]: [Path, Val][] } {
	// 	let map = this.groupPaths(paths);
	// 	let vals = {} as { [key in Mod]: [Path, Val][] };
	// 	Object.keys(map).forEach((m) => {
	// 		vals[m] = this.accessors[m].multiGet(map[m]);
	// 	});
	// 	return vals;
	// }
	// multiSet(newVals: [Path, Val][]) {
	// 	let map = {} as { [mod: string]: [Path, Val][] };
	// 	newVals.forEach(([ path, val ]) => {
	// 		let idx = path.indexOf('.');
	// 		let mod = path.substring(0, idx);
	// 		let rawPath = path.substring(++idx);
	// 		if (mod in map) map[mod].push([ rawPath, val ]);
	// 		else map[mod] = [ [ rawPath, val ] ];
	// 	});
	// 	Object.entries(map).forEach(([ mod, vals ]) => this.accessors[mod].multiSet(vals));
	// }
	// private groupPaths(paths: Path[]): PathMap {
	// 	let map = {} as PathMap;
	// 	paths.forEach((path) => {
	// 		let idx = path.indexOf('.');
	// 		let mod = path.substring(0, idx);
	// 		let rawPath = path.substring(++idx);
	// 		if (mod in map) map[mod].push(rawPath);
	// 		else map[mod] = [rawPath];
	// 	});
	// 	return map;
	// }
}

export default DataAccessor;
