import userStore from './UserStore';
import { useRef } from 'react';
import FirstName from './FirstName';
import LastName from './LastName';

export default function NestedStateTransformsExample() {
	const { setUserFirstName, setUserLastName, setUserFirstNameMutable } =
		userStore.useAction((actions) => actions);
	const inputElementRef = useRef<HTMLInputElement>(null);
	const firstNameRef = useRef<HTMLInputElement>(null);
	const firstNameInverted = userStore.useState(
		(state) => state.user.name.firstName
	);
	return (
		<div>
			<h1>Nested State with Transforms Example</h1>
			<h3>
				NOTE: The first and last names are inverted using a transformation
				function
			</h3>
			<div style={{ display: 'flex', gap: 4 }}>
				<FirstName />
				<LastName />
			</div>
			<div>
				<span>
					First name switched to last using transform: {firstNameInverted}
				</span>
			</div>
			<input ref={inputElementRef} placeholder="Enter name" />
			<button
				onClick={() =>
					setUserFirstNameMutable(
						inputElementRef.current?.value || 'Default First Name'
					)
				}
			>
				Set First Name
			</button>
			<button
				onClick={() =>
					setUserLastName(inputElementRef.current?.value || 'Default Last Name')
				}
			>
				Set Last Name
			</button>
			<p>
				<span>Automatically set the first name as you type</span>
				<br />
				<input
					ref={firstNameRef}
					placeholder="Enter first name"
					onChange={(e) => setUserFirstName(e.target.value)}
				/>
			</p>
		</div>
	);
}
