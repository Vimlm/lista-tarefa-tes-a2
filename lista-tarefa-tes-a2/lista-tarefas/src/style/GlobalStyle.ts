import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 	* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			font-family: 'Roboto', sans-serif;
			background: #000;
			color: #fff;
	}

	a {
			text-decoration: none;
			color: inherit;
		}

	ul {
		list-style: none;
	}
`;
