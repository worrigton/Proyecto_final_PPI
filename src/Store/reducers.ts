import { Reducer } from "redux";

// Import Own Components
import alertReducer    from "~/Components/Alert/store/reducer";
import dialogReducer   from "~/Components/Dialog/store/reducer";
import productsReducer from "~/Components/Products/ProductsStore/store/reducer";
import userReducer     from "./UserStore/reducer";
import categoryReducer from "./CategoryStore/reducer";
import combineReducers from "./combineReducers";
import loaderReducer   from "~/Components/Loader/store/reducer";

const reducers: Reducer = combineReducers({
	alertReducer,
	userReducer,
	dialogReducer,
	productsReducer,
	categoryReducer,
	loaderReducer,
});

export default reducers;
