/* eslint-disable max-len */
import SvgIcon from "~/Resources/icons/SvgIcon";

const FaChevronDown: React.FC<SvgIcon> = ({ className = "", style = {}, ...rest }) => (
    <svg
        style={{
            height : "1em",
            width  : "1.5em",
            ...style,
        }}
        className={`svg-inline--fa fa-chevron-down fa-w-14 ${className}`}
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="chevron-down"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        data-fa-i2svg=""
        {...rest}
    >
        <path
            fill="currentColor"
            d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
        />
    </svg>
);

export default FaChevronDown;
