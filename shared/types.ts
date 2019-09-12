export type Parameter = { name: string; val: string; type: string };

export type ModsInfo = {
    [key: string]: ModInfo
}

export type ModInfo = {
    params: Parameter[];
    enums: EnumVal[];
};

export type EnumVal = {
    name: string;
    vals: string[];
};

export type PathVal = {
    path: string;
    val: string;
};
