import { createStore } from '../lib/store';

let initialValue: {} = { value: 1 };
const { subscribe, dispatch } = createStore(initialValue);

console.log(initialValue);

subscribe((state) => {
	initialValue = state;
});

dispatch('some action');

console.log(initialValue);
