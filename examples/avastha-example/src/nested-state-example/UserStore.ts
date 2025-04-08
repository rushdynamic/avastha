import { create, debug } from 'avastha';

type UserFullName = {
	firstName: string;
	lastName: string;
};

type User = {
	name: UserFullName;
	id: number;
};

type UserState = {
	user: User;
};

type UserActions = {
	setUserFirstName: (firstName: string) => void;
	setUserLastName: (lastName: string) => void;
	setUserFirstNameMutable: (firstName: string) => void;
};

type UserStore = {
	state: UserState;
	actions: UserActions;
};

const userStore = create<UserStore>((setState, updateState) => {
	return {
		state: {
			user: {
				name: { firstName: 'Rush', lastName: 'Dynamic' },
				id: 1,
			},
		},
		actions: {
			setUserFirstName: (firstName) =>
				setState((state) => ({
					user: {
						...state.user,
						name: { ...state.user.name, firstName: firstName },
					},
				})),
			setUserLastName: (lastName) =>
				setState((state) => ({
					user: {
						...state.user,
						name: { ...state.user.name, lastName: lastName },
					},
				})),
			setUserFirstNameMutable: (firstName) =>
				updateState((state) => {
					state.user.name.firstName = firstName;
				}),
		},
	};
}, debug.log);

export default userStore;
