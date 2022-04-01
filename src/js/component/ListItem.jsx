import React from "react";

function ListItem({ todo, id, removeTodo }) {
	return (
		<li className="list-group-item close " onClick={() => removeTodo(id)}>
			{todo.label}
		</li>
	);
}

export default ListItem;
