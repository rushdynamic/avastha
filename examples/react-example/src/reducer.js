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
