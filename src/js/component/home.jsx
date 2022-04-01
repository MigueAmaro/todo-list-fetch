import React, { useState, useEffect } from "react";
import ListInput from "./ListInput.jsx";
import ListItem from "./ListItem.jsx";

const URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user";
//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState({ label: "", done: false });

	const handleChange = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value });
		console.log(event);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			putFakeAPI();
		}
	};
	const removeTodo = async (id) => {
		const newTodos = todos.filter((value, index) => id != index);
		//setTodos(newTodos);
		try {
			let response = await fetch(`${URL_BASE}/MiguelAmaro`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodos),
			});
			let result = await response.json();
			if (response.ok) {
				setTask({ label: "", done: false });
				getFakeAPI();
			} else {
				//donothing
			}
		} catch (error) {
			console.log(error);
		}
	};
	//update task
	// funciton that updates json.stringify
	async function getFakeAPI() {
		try {
			let response = await fetch(`${URL_BASE}/MiguelAmaro`);
			let result = await response.json();
			if (response.ok) {
				setTodos(result);
			} else {
				addUser();
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function putFakeAPI() {
		try {
			let response = await fetch(`${URL_BASE}/MiguelAmaro`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([...todos, task]),
			});
			let result = await response.json();
			if (response.ok) {
				setTask({ label: "", done: false });
				getFakeAPI();
			} else {
				//donothing
			}
		} catch (error) {
			console.log(error);
		}
	}

	function addUser() {
		fetch(`${URL_BASE}/MiguelAmaro`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([]),
		}).then((response) => {
			if (response.ok) {
				getFakeAPI();
			} else {
				console.log(response.status);
			}
		});
	}

	useEffect(() => {
		getFakeAPI();
	}, []);

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<p className="text-centered mt-5 mb-2 headertittle">Todos</p>
			<div className="card">
				<ul className="list-group list-group-flush">
					<ListInput
						task={task}
						handleChange={handleChange}
						handleKeyPress={(event) => handleKeyPress(event)}
						todos={todos}
					/>

					{todos.map((todo, index) => (
						<ListItem
							key={index}
							todo={todo}
							removeTodo={removeTodo}
							id={index}
						/>
					))}
					<li className="list-group-item text-muted small">
						{todos.length} Items Left
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
