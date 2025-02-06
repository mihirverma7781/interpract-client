// app/redux-provider.js
"use client";

import { Provider } from "react-redux";
import { store } from "./make-store";

export default function StoreProvider({ children }) {
    console.log("INITIAL_APP_STATE = " + JSON.stringify(store.getState(), null, 2));
    return <Provider store={store}>{children}</Provider>;
}