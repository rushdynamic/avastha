import { create, debug } from 'avastha';

type CounterStore = {
	state: {
		count: number;
	};
	actions: {
		increment: () => void;
		incrementMutable: () => void;
		decrement: () => void;
	};
};

const counterStore = create<CounterStore>((setState, updateState) => {
	return {
		state: {
			count: 1,
		},
		actions: {
			increment: () => setState((state) => ({ count: state.count + 1 })),
			incrementMutable: () =>
				updateState((state) => {
					state.count += 1;
				}),
			decrement: () => setState((state) => ({ count: state.count - 1 })),
		},
	};
}, debug.log);

export default counterStore;
