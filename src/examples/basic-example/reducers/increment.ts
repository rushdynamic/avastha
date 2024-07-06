const increment = (state: any, payload: any) => {
	state.value += payload.by;
	return state;
};

export default increment;
