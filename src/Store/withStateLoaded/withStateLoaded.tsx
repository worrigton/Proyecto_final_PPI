import { Dispatch } from "redux";
import { connect }  from "react-redux";

type MapStateToProps    = ((state: any) => object) | null;
type MapDispatchToProps = ((dispatch: Dispatch) => object) | null;

type ReduxConnect = <T = {}>(mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps) => (Component: React.FC) => React.FC<T>;

/**
 * Works just like react-redux connect higher order function, but this only renders
 * the component if the global redux state, has the property "stateLoaded" set to true
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param mapStateToProps - maps the state to the props
 * @param mapDispatchToProps - maps the dispatch to the props
 */
const withStateLoaded: ReduxConnect = (mapStateToProps = null, mapDispatchToProps = null) => Component => {
	interface WrapperComponentProps {
		stateLoaded?: boolean;
	};

	const WrapperComponent: React.FC<WrapperComponentProps> = ({ stateLoaded = false, ...rest }) => (
		stateLoaded
			? <Component {...rest} />
			: <></>
	);

	const mergedMapStateToProps = state => {
		const stateLoadedProp = {
			stateLoaded : state?.stateLoaded || false,
		};

		return mapStateToProps
			? { ...stateLoadedProp, ...mapStateToProps(state) }
			: stateLoadedProp;
	};

	return connect(mergedMapStateToProps, mapDispatchToProps)(WrapperComponent);
};

export default withStateLoaded;
