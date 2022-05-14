/* eslint-disable max-len */
import SvgIcon from "~/Resources/icons/SvgIcon";

const FaAngleLeft: React.FC<SvgIcon> = ({ className = "", style = {}, ...rest }) => (
	<svg
		style={{
			height : "1.5rem",
			width  : "1.5rem",
			...style,
		}}
		className={`svg-inline--fa fa-angle-left fa-w-6 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="far"
		data-icon="angle-left"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 192 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"
		/>
	</svg>
);

export default FaAngleLeft;
