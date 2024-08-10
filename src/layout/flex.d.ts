export declare function flexContainer(direction?: 'row' | 'column', justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around', align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'): {
    display: string;
    flexDirection: "row" | "column";
    justifyContent: "start" | "end" | "center" | "space-between" | "space-around";
    alignItems: "start" | "end" | "center" | "stretch" | "baseline";
};
export declare function flexItem(grow?: number, basis?: string | number, shrink?: number): {
    flex: string;
};
