type NonMutatingAction<State> = (state: State) => Partial<State>;
type MutatingAction<State> = (state: State) => void;
export type ExtractState<T> = T extends { state: infer S } ? S : never;
export type ExtractActions<T> = T extends { actions?: infer S } ? S : never;
export type StateSelector<Store, Result> = (state: ExtractState<Store>) => Result;
export type ActionSelector<Store, Result> = (actions: ExtractActions<Store>) => Result;
export type Listener = () => void;
export type SetState<State> = (nonMutatingAction: NonMutatingAction<State>) => void;
export type UpdateState<State> = (mutatingAction: MutatingAction<State>) => void;
export type Initializer<Store> = (
    setState: SetState<ExtractState<Store>>,
    updateState: UpdateState<ExtractState<Store>>
) => Store;
export type DebugFn<State> = (next: State, prev?: State, updated?: Partial<State>) => void;
export type Changed = { status: boolean };
export type GetProxyWithStatus = <State>(state: State) => {
    proxyState: State;
    changed: Changed;
};
