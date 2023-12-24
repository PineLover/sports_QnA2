import React from "react";
import { createContext } from "react";

export interface ResultContextType {
    selectedSportsId: string;
}

export const SportsSelectContext = createContext<ResultContextType>({
    selectedSportsId: "all",
});
