import { create } from "avastha";

type Fruit = {
    name: string,
    quantity: number,
}

type FruitStore = {
    orange: Fruit,
    apple: Fruit,
    setAppleQty: (quantity: number) => void;
}

const useFruitStore = create<FruitStore>((set) => ({
    orange: { name: "Orange", quantity: 5 },
    apple: { name: "Apple", quantity: 2 },
    setAppleQty: (quantity: number) => set((state) => { return { ...state, apple: { ...state.apple, quantity: quantity } } })
}))

export default useFruitStore