import { Container, CssBaseline, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Header from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserRoutes from './Utils/UserRoutes'
import { AppContext } from './AppContextProvider'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import SnackMessage from './components/SnackMessage'
import { fetchUser } from './apiCalls'

export default function App() {
	const { auth, setAuth, setAuthUser } = useContext(AppContext);

	useEffect(() => {
		(
			async () => {
				const result = await fetchUser();
				if(result.ok){
					console.log(result);
					setAuth(true);
					setAuthUser(result);
				}
			}
		)()

	}, [])

	return (
		<>
			<CssBaseline />
			<Header />
			<Container maxWidth="sm" sx={{ py: "70px" }}>
				<Routes>
					{auth && UserRoutes.map((r) => {
						return <Route
							key={r.path}
							path={r.path}
							element={r.element}
						/>
					})}
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFound />} />
				</Routes>

				<SnackMessage />
			</Container>
		</>
	)
}
