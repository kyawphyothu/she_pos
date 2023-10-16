import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from "./AppContextProvider";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import {
	amber,
	blue,
	brown,
	cyan,
	deepOrange,
	deepPurple,
	green,
	indigo,
	lime,
	purple,
	red,
	teal,
	yellow,
} from "@mui/material/colors";

let theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#1a2035",
			paper: "#1a2035",
		},
		app: {
			color: "#ffffff",
			// background: "#1a2035",
		},
		appbar: {
			background: "#001f3f",
		},
		logo: {
			color: "white",
		},
	},
});
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
				<AppContextProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AppContextProvider>
			</ThemeProvider>
	</React.StrictMode>,
)
