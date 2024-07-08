import { State } from '../../../src/lib/types';

const increment = (state: State, payload: State) => {
	state.value += payload.by;
	return state;
};

export default increment;
