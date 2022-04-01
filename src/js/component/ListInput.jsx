import React from "react";
import PropTypes from "prop-types";

const ListInput = ({ handleKeyPress, task, handleChange }) => {
	return (
		/* <form
			onSubmit={(e) => {
				e.preventDefault();
			}}> */
		<li className="list-group-item">
			<input
				type="text"
				value={task.label}
				placeholder="Whats needs to be done?"
				className="form-control Custom"
				name="label"
				onKeyPress={handleKeyPress}
				onChange={handleChange}
			/>
		</li>
		//</form>
	);
};

ListInput.propTypes = {
	handleKeyPress: PropTypes.func,
	task: PropTypes.object,
	handleChange: PropTypes.func,
};

export default ListInput;
