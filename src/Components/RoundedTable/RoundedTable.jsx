import PropTypes         from "prop-types";
import { Card, Divider } from "@material-ui/core";

// Import Own Components
import Item from "~/Components/RoundedTableItem";
// import useStyles from "./styles";

const RoundedTable = ({
	objetos,
}) => (
	<Card
		variant="outlined"
		elevation={0}
	>
		{
			objetos != [] && objetos.map((item, id) =>
				<div key={id}>
					<Item
						icon={item.icon}
						text={item.text}
						key={item.id}
						justify={item.justify}
					/>
					{id != objetos.length - 1 &&
						<Divider />}
				</div>
			)
		}
	</Card>
);

RoundedTable.propTypes = {
	objetos : PropTypes.array,
};

RoundedTable.defaultProps = {
	objetos     : [],
	cardActions : <></>,
};

export default RoundedTable;
