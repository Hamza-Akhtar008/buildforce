import { createCustomContext } from "@/lib/CreateCustomContext";
import react from "react";

interface IGlobalState {
   labourStage: "without-data" | "unverified" | "verified";
   clockedIn: boolean;
   clockedInTime?: Date;
}
const initialState: IGlobalState = {
   labourStage: "without-data",
   clockedIn: false,
};

const functions = {
   setState: (state: IGlobalState, data: Partial<IGlobalState>) => {
      return { ...state, ...data };
   },
};

const { Context, Provider, useContextHook } = createCustomContext<
   IGlobalState,
   //@ts-ignore
   typeof functions
>({
   initialState,
   functions,
});

export const GlobalContextProvider = Provider;
export const useGlobalContext = useContextHook;
