let store: {};
let subscribers: ((arg: {}) => any)[];
let reducers = [];

const createStore = (initialValue: {} = {}) => {
	if (!store) store = initialValue;
	return { dispatch, subscribe };
};

const defaultReducer = (state: any, action: any) => {
	// apply all reducers here
	return state;
};

const subscribe = (subscriber: (arg: {}) => any) => {
	if (!subscribers) subscribers = [];
	subscribers.push(subscriber);
};

const dispatch = (action: any) => {
	let prevState = store;
	let currentState = defaultReducer({ ...prevState }, action);
	subscribers.forEach((sub) => {
		sub(currentState);
	});
};

export { createStore };
