import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import SomeOtherComponent from './SomeOtherComponent.jsx';
import SqrrlWrapper from '../../../lib/src/SqrrlWrapper.tsx';
import rootReducer from './reducer.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<>
			<SqrrlWrapper initialState={{ myCount: 0 }} rootReducer={rootReducer}>
				<App />
				<SomeOtherComponent />
			</SqrrlWrapper>
		</>
	</React.StrictMode>
);
