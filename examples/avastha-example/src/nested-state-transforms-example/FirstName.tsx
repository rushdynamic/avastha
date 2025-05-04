import userStore from './UserStore';

export default function FirstName() {
	const firstName = userStore.useState((state) => state.user.name.firstName);
	console.log('Rendered FirstName');
	return (
		<div>
			<p>{firstName}</p>
		</div>
	);
}
