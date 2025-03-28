import { create, debug } from "avastha";

type UserFullName = {
    firstName: string,
    lastName: string
}

type User = {
    name: UserFullName,
    id: number
}

type UserState = {
    user: User,
    setUserFirstName: (firstName: string) => void,
    setUserLastName: (lastName: string) => void,
    setUserFirstNameMutable: (firstName: string) => void,
}

const useUserStore = create<UserState>((setState, updateState) => {
    return {
        user: {
            name: { firstName: "Rush", lastName: "Dynamic" },
            id: 1
        },
        setUserFirstName: (firstName) => setState((state) => ({
            user: { ...state.user, name: { ...state.user.name, firstName: firstName } }
        })),
        setUserLastName: (lastName) => setState((state) => ({
            user: { ...state.user, name: { ...state.user.name, lastName: lastName } }
        })),
        setUserFirstNameMutable: (firstName) => updateState((state) => { state.user.name.firstName = firstName }),
    }
}, debug.log)

export default useUserStore