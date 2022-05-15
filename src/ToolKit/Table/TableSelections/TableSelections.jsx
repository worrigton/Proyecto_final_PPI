/* eslint-disable no-undef */
import PropTypes from "prop-types";

// Import Own Components
import { Button } from "~/ToolKit";
import useStyles  from "./styles";

const TableSelections = ({
	data,
	actions,
	handleActionClick,
}) => {
	const classes = useStyles();

	return (
		data.size > 0 ? (
			<div className={classes.root}>
				<div className="content">
					<Button
						color="white"
						onClick={handleActionClick}
					>
						<span className="deleteAll">
							<span className="icon" />
						</span>
						{ `${data.size} seleccionado${data.size > 1 ? "s" : ""}` }
					</Button>
					{ actions.map(({ name, handler }, id) => (
						<Button
							key={id}
							color="white"
							onClick={() => handleActionClick(handler)}
							className="actions"
						>
							{ name }
						</Button>
					)) }
				</div>

				<div className="spacer" />
			</div>
		) : null
	);
};

TableSelections.propTypes = {
	data              : PropTypes.instanceOf(Map).isRequired,
	actions           : PropTypes.array.isRequired,
	handleActionClick : PropTypes.func.isRequired,
};

export default TableSelections;
