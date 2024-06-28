import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './appStore';
import { BaseLayout } from './layouts/BaseLayout';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BaseLayout />
		</Provider>
	</React.StrictMode>
);
