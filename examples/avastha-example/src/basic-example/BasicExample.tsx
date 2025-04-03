import counterStore from './CounterStore';

function App() {
	const count = counterStore.useState((state) => state.count);
	const increment = counterStore.useAction((actions) => actions.increment);
	const incrementMutable = counterStore.useAction(
		(actions) => actions.incrementMutable
	);
	const decrement = counterStore.useAction((actions) => actions.decrement);
	return (
		<>
			<h1>Basic Example</h1>
			<p>
				<b>Current count: </b>
				{count}
			</p>
			<button onClick={increment}>Increment</button>
			<button onClick={incrementMutable}>Increment by mutating</button>
			<button onClick={decrement}>Decrement</button>
		</>
	);
}

export default App;
