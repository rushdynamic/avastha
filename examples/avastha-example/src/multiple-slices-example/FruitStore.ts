import { create } from 'avastha';

type Fruit = {
	name: string;
	quantity: number;
};

type FruitState = {
	orange: Fruit;
	apple: Fruit;
};

type FruitActions = {
	setAppleQty: (quantity: number) => void;
};

type FruitStore = {
	state: FruitState;
	actions: FruitActions;
};

const fruitStore = create<FruitStore>((set) => ({
	state: {
		orange: { name: 'Orange', quantity: 5 },
		apple: { name: 'Apple', quantity: 2 },
	},
	actions: {
		setAppleQty: (quantity: number) =>
			set((state) => {
				return { ...state, apple: { ...state.apple, quantity: quantity } };
			}),
	},
}));

export default fruitStore;
