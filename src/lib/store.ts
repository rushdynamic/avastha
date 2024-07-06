import defaultReducer from './reducer';
import { Action } from './types';

let store: {};
let subscribers: ((arg: {}) => any)[];
let rootReducer: (state: {}, action: Action) => any;
let isInitialized = false;

const createStore = (initialValue: {} = {}, reducer = defaultReducer) => {
	if (!store) store = initialValue;
	rootReducer = reducer;
	isInitialized = true;
};

const subscribe = (subscriber: (arg: {}) => any) => {
	if (!isInitialized) {
		console.warn('Store was not initialized');
		return;
	}

	if (!subscribers) subscribers = [];
	subscribers.push(subscriber);
};

const dispatch = (action: Action) => {
	if (!isInitialized) {
		console.warn('Store was not initialized');
		return;
	}

	let prevState = { ...store };
	store = rootReducer(prevState, action);
	subscribers.forEach((sub) => {
		sub(store);
	});
};

export { createStore, subscribe, dispatch };
