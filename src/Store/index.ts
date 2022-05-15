import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools }          from "redux-devtools-extension";

// Import Own Components
import { saveState } from "./persistor";
import reducers      from "./reducers";

const Store = createStore(
	reducers,
	undefined,
	composeWithDevTools(applyMiddleware())
);

Store.subscribe(() => saveState(Store.getState()));

export default Store;
