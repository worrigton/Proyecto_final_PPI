import { useCallback } from "react";

// Import Own Components
import ProductsActions from "~/Components/Products/ProductsStore/store/actions";
import withStateLoaded from "~/Store/withStateLoaded";
import { bindAll }     from "~/Util";
import Filters         from "./Filters";

const handleChange = ({ target : { name, value, checked } }, productsActions) => {
    const newValue = (() => {
        switch (name) {
            case "order":
                return checked ? "DESC" : "ASC";
            case "volume_discount":
                return Boolean(checked);
            case "frezee":
                return !value;
            case "order_by":
                return value;
            case "min_price":
            case "max_price": {
                // Remove all the occurrences of a dot except for the first one
                value = value.replace(/\./g, (val, index, str) => index === str.indexOf(".") ? val : "");

                // Accept just dots and numbers
                if (value.match(/[^0-9.]/gi)) {
                    return null;
                }

                const dotPosition = value.indexOf(".");

                if (dotPosition !== -1) {
                    const decimals = value.substr(dotPosition + 1);

                    if (decimals.length > 2) {
                        return null;
                    }
                }

                return value;
            }
            default:
                return null;
        }
    })();

    if (newValue == null) return;

    productsActions.setFilter({
        [name] : newValue,
    });
};



interface Props {
    productsActions : any;
};

const FiltersContainer: React.FC<Props> = ({ productsActions }) => {
    const handleChangeMethod = useCallback(event => handleChange(event, productsActions), [productsActions]);
    const handleCleanFiltersMethod = useCallback(productsActions.removeFilters, [productsActions]);
    return (
        <Filters
            delegations={{
                handleChange : handleChangeMethod,
                handleCleanFiltersMethod,
            }}
        />
    );
};

const mapDispatchToProps = bindAll({ ProductsActions });

export default withStateLoaded(null, mapDispatchToProps)(FiltersContainer);
