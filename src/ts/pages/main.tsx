import React from 'react';
import ReactDOM from 'react-dom/client';


import '~/styles/style.scss';
import { TopPage } from './Top';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<>
		<React.StrictMode>
			<TopPage />
		</React.StrictMode>
	</>
);
