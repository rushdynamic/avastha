import { createStore, dispatch, subscribe } from '../../lib/src/store';
import rootReducer from './reducers/rootReducer';

let myValue: {} = { value: 1 };
createStore(myValue, rootReducer);

console.log('Initial state:', myValue);

subscribe((state) => {
	myValue = state;
});

dispatch({ type: 'increment', payload: { by: 3 } });
dispatch({ type: 'increment', payload: { by: 5 } });
dispatch({ type: 'decrement', payload: { by: 3 } });

console.log('Updated state:', myValue);
