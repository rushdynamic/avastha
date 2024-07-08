import { State } from '../../../lib/src/types';

const increment = (state: State, payload: State) => {
	state.value += payload.by;
	return state;
};

export default increment;
