# sqrrl

<img src="https://github.com/user-attachments/assets/6280d6d6-5786-4ea8-bae4-38bc283f8c27" alt="drawing" width="300"/>

A minimal state management library for React.\
**WARNING: This was written primarily for learning purposes, and is NOT production ready.**

# Usage

**Step 1.** Install the latest version of `sqrrl` using npm or yarn.

`npm i @rushdynamic/sqrrl`

**Step 2.** Create a `rootReducer` which takes accepts the global state object and an action event.
Example:

```
const rootReducer = (state, action) => {
	switch (action.type) {
		case 'increment':
			state.myCount += action.payload.by;
			return state;
		case 'decrement':
			state.myCount -= action.payload.by;
			return state;
		default:
			return state;
	}
};

export default rootReducer;
```

**Step 3.** Import the `SqrrlWrapper` component in your root component, and wrap it around your custom components to inject the state into them. Also pass the `rootReducer` function you created above as a prop to this wrapper component.

Example:

```
import SqrrlWrapper from '@rushdynamic/sqrrl';
import rootReducer from './reducer.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<>
			<SqrrlWrapper initialState={{ myCount: 0 }} rootReducer={rootReducer}>
				<App />
				<SomeOtherComponent />
			</SqrrlWrapper>
		</>
	</React.StrictMode>
);
```

**Step 4.** From your custom components, you can now accept the `useSqrrlState` and `dispatch` functions for subscribing to, and updating the global state respectively.

Example:

```
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
```

That's it. Feel free to refer to the `examples` directory for more clarity.

<span style="color:red">**WARNING: This library was written for learning purposes, and is NOT production ready.**</span>
