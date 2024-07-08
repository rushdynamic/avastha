import defaultReducer from './reducer';
import { Action, Reducer, State, Subscriber } from './types';

let store: {};
let subscribers: Subscriber[];
let rootReducer: Reducer;
let isInitialized = false;

const createStore = (
	initialValue: State = {},
	reducer: Reducer = defaultReducer
) => {
	if (isInitialized) {
		return;
	}
	if (!store) store = initialValue;
	rootReducer = reducer;
	isInitialized = true;
};

const subscribe = (subscriber: Subscriber) => {
	if (!isInitialized) {
		console.warn('Store was not initialized');
		return;
	}
	if (!subscribers) subscribers = [];
	subscribers.push(subscriber);
};

const unsubscribe = (subscriber: Subscriber) => {
	if (!isInitialized) {
		console.warn('Store was not initialized');
		return;
	}
	subscribers = subscribers.filter((sub) => sub != subscriber);
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

export { createStore, subscribe, unsubscribe, dispatch };
