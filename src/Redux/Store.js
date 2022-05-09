import {configureStore} from "@reduxjs/toolkit";
import reducer from "./Reducer";

export default configureStore({
    reducer: reducer,
});
