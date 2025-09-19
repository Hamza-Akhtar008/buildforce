import { createCustomContext } from "@/lib/CreateCustomContext";
import react from "react";

interface IGlobalState {
   labourStage: "without-data" | "unverified" | "verified";
}
const initialState: IGlobalState = {
   labourStage: "without-data",
};

const functions = {};

const { Context, Provider, useContextHook } = createCustomContext<
   IGlobalState,
   typeof functions
>({
   initialState,
   functions,
});

export const GlobalContextProvider = Provider;
export const useGlobalContext = useContextHook;
