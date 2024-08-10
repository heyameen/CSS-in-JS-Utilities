export declare function gridContainer(columns?: number | string, rows?: number | string, gap?: string, justifyItems?: 'start' | 'end' | 'center' | 'stretch', alignItems?: 'start' | 'end' | 'center' | 'stretch', justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly', alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'): {
    display: string;
    gridTemplateColumns: string;
    gridTemplateRows: string;
    gap: string;
    justifyItems: "start" | "end" | "center" | "stretch";
    alignItems: "start" | "end" | "center" | "stretch";
    justifyContent: "start" | "end" | "center" | "space-between" | "space-around" | "stretch" | "space-evenly";
    alignContent: "start" | "end" | "center" | "space-between" | "space-around" | "stretch" | "space-evenly";
};
export declare function gridItem(colStart?: number | 'auto', colEnd?: number | 'auto', rowStart?: number | 'auto', rowEnd?: number | 'auto', justifySelf?: 'start' | 'end' | 'center' | 'stretch', alignSelf?: 'start' | 'end' | 'center' | 'stretch'): {
    gridColumnStart: number | "auto";
    gridColumnEnd: number | "auto";
    gridRowStart: number | "auto";
    gridRowEnd: number | "auto";
    justifySelf: "start" | "end" | "center" | "stretch";
    alignSelf: "start" | "end" | "center" | "stretch";
};
