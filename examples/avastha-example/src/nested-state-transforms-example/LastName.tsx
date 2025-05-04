import userStore from './UserStore';

export default function LastName() {
	const lastName = userStore.useState((state) => state.user.name.lastName);
	console.log('Rendered LastName');
	return (
		<div>
			<p>{lastName}</p>
		</div>
	);
}
