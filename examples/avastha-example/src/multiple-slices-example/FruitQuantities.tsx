import fruitStore from './FruitStore';

export default function FruitQuantities() {
	const { appleQty, orangeQty } = fruitStore.useState((state) => ({
		appleQty: state.apple.quantity,
		orangeQty: state.orange.quantity,
	}));
	return (
		<p>
			<span>Apples: {appleQty}</span>
			<br />
			<span>Oranges: {orangeQty}</span>
		</p>
	);
}
