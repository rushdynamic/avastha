function App({ useSqrrlState, dispatch }) {
	const count = useSqrrlState('myCount');
	return (
		<>
			<div>
				<div>{'Count: ' + count}</div>
				<button
					onClick={() => dispatch({ type: 'increment', payload: { by: 5 } })}
				>
					Increment
				</button>
				<button
					onClick={() => dispatch({ type: 'decrement', payload: { by: 5 } })}
				>
					Decrement
				</button>
			</div>
		</>
	);
}

export default App;
