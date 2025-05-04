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

type UserTransforms = {
	user: (user: User) => User;
};

type UserStore = {
	state: UserState;
	actions: UserActions;
	transforms: UserTransforms;
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
		transforms: {
			user: (user) => ({
				...user,
				name: {
					...user.name,
					firstName: user.name.lastName,
					lastName: user.name.firstName,
				},
			}),
		},
	};
}, debug.log);

export default userStore;
