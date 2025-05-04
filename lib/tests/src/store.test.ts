import { describe, it, expect } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { create } from "../../src/store";

describe("createStore", () => {
    it("should initialize store with given state", () => {
        type CounterState = { state: { count: number } };
        const counterStore = create<CounterState>((_setState, _updateState) => ({
            state: { count: 1 }
        }));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));
        expect(result.current).toBe(1);
    });

    it("should update state immutably", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                increment: () => void;
            };
        };

        const counterStore = create<CounterState>((setState, _updateState) => ({
            state: { count: 2 },
            actions: {
                increment: () => setState((state) => ({ ...state, count: state.count + 1 }))
            }
        }));

        const {
            result: { current: increment }
        } = renderHook(() => counterStore.useAction((actions) => actions.increment));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            increment();
        });

        expect(result.current).toBe(3);
    });

    it("should update state mutably", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                incrementMutable: () => void;
            };
        };

        const counterStore = create<CounterState>((_setState, updateState) => ({
            state: { count: 5 },
            actions: {
                incrementMutable: () =>
                    updateState((state) => {
                        state.count += 1;
                    })
            }
        }));

        const {
            result: { current: incrementMutable }
        } = renderHook(() => counterStore.useAction((actions) => actions.incrementMutable));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            incrementMutable();
        });

        expect(result.current).toBe(6);
    });

    it("should return transformed state during immutable update", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                increment: () => void;
            };
            transforms: {
                count: (count: number) => number;
            };
        };

        const counterStore = create<CounterState>((setState, _updateState) => ({
            state: { count: 2 },
            actions: {
                increment: () => setState((state) => ({ ...state, count: state.count + 1 }))
            },
            transforms: {
                count: (count) => count * 5
            }
        }));

        const {
            result: { current: increment }
        } = renderHook(() => counterStore.useAction((actions) => actions.increment));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            increment();
        });

        expect(result.current).toBe(15);
    });

    it("should return transformed state during mutable update", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                incrementMutable: () => void;
            };
            transforms: {
                count: (count: number) => number;
            };
        };

        const counterStore = create<CounterState>((_setState, updateState) => ({
            state: { count: 2 },
            actions: {
                incrementMutable: () =>
                    updateState((state) => {
                        state.count += 1;
                    })
            },
            transforms: {
                count: (count) => count * 5
            }
        }));

        const {
            result: { current: incrementMutable }
        } = renderHook(() => counterStore.useAction((actions) => actions.incrementMutable));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            incrementMutable();
        });

        expect(result.current).toBe(15);
    });
});

describe("createStore with nested state transforms", () => {
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
        user: (user: User) => Partial<User>;
    };

    type UserStore = {
        state: UserState;
        actions: UserActions;
        transforms: UserTransforms;
    };

    it("should apply transform to nested fields correctly", () => {
        const userStore = create<UserStore>((setState, updateState) => {
            return {
                state: {
                    user: {
                        name: { firstName: "Rush", lastName: "Dynamic" },
                        id: 1
                    }
                },
                actions: {
                    setUserFirstName: (firstName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, firstName }
                            }
                        })),
                    setUserLastName: (lastName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, lastName }
                            }
                        })),
                    setUserFirstNameMutable: (firstName) =>
                        updateState((state) => {
                            state.user.name.firstName = firstName;
                        })
                },
                transforms: {
                    user: (user) => {
                        return {
                            name: {
                                firstName: user.name.lastName,
                                lastName: user.name.firstName
                            }
                        };
                    }
                }
            };
        });

        const { result } = renderHook(() =>
            userStore.useState((state) => state.user.name.firstName)
        );

        // transform swaps first and last names, so we should see "Dynamic"
        expect(result.current).toBe("Dynamic");
    });

    it("should reflect updated name after action", () => {
        const userStore = create<UserStore>((setState, updateState) => {
            return {
                state: {
                    user: {
                        name: { firstName: "Rush", lastName: "Dynamic" },
                        id: 1
                    }
                },
                actions: {
                    setUserFirstName: (firstName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, firstName }
                            }
                        })),
                    setUserLastName: (lastName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, lastName }
                            }
                        })),
                    setUserFirstNameMutable: (firstName) =>
                        updateState((state) => {
                            state.user.name.firstName = firstName;
                        })
                },
                transforms: {
                    user: (user) => {
                        return {
                            name: {
                                firstName: user.name.lastName,
                                lastName: user.name.firstName
                            }
                        };
                    }
                }
            };
        });

        const { result: firstName } = renderHook(() =>
            userStore.useState((state) => state.user.name.firstName)
        );

        act(() => {
            userStore.useAction((actions) => actions.setUserLastName("Cohle"));
        });

        expect(firstName.current).toBe("Cohle");
    });

    it("should reflect mutable updates", () => {
        const userStore = create<UserStore>((setState, updateState) => {
            return {
                state: {
                    user: {
                        name: { firstName: "Rush", lastName: "Dynamic" },
                        id: 1
                    }
                },
                actions: {
                    setUserFirstName: (firstName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, firstName }
                            }
                        })),
                    setUserLastName: (lastName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, lastName }
                            }
                        })),
                    setUserFirstNameMutable: (firstName) =>
                        updateState((state) => {
                            state.user.name.firstName = firstName;
                        })
                },
                transforms: {
                    user: (user) => {
                        return {
                            name: {
                                firstName: user.name.lastName,
                                lastName: user.name.firstName
                            }
                        };
                    }
                }
            };
        });

        const { result: firstName } = renderHook(() =>
            userStore.useState((state) => state.user.name.firstName)
        );

        act(() => {
            userStore.useAction((actions) => actions.setUserFirstNameMutable("Rust"));
        });

        // transform swaps first and last name, so we expect the new first name to be "Dynamic"
        expect(firstName.current).toBe("Dynamic");
    });

    it("should return the full transformed user", () => {
        const userStore = create<UserStore>((setState, updateState) => {
            return {
                state: {
                    user: {
                        name: { firstName: "Rush", lastName: "Dynamic" },
                        id: 1
                    }
                },
                actions: {
                    setUserFirstName: (firstName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, firstName }
                            }
                        })),
                    setUserLastName: (lastName) =>
                        setState((state) => ({
                            user: {
                                ...state.user,
                                name: { ...state.user.name, lastName }
                            }
                        })),
                    setUserFirstNameMutable: (firstName) =>
                        updateState((state) => {
                            state.user.name.firstName = firstName;
                        })
                },
                transforms: {
                    user: (user) => {
                        return {
                            name: {
                                firstName: user.name.lastName,
                                lastName: user.name.firstName
                            }
                        };
                    }
                }
            };
        });

        const { result } = renderHook(() => userStore.useState((state) => state.user));

        expect(result.current.name).toEqual({
            firstName: "Dynamic",
            lastName: "Rush"
        });
    });
});
