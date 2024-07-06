import { State } from '../../../lib/types';

const decrement = (state: State, payload: State) => {
	state.value -= payload.by;
	return state;
};

export default decrement;
