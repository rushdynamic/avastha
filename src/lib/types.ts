interface Action {
	type: string;
	payload: any;
}

interface State {
	[key: string]: any;
}

interface Reducer {
	(state: State, action: Action): State;
}

interface Subscriber {
	(state: State): void;
}

export { State, Action, Reducer, Subscriber };
