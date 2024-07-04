let store: {};

function createStore() {
	return {};
}

function getStore() {
	if (!store) store = createStore();
	return store;
}

export { getStore };
