import { Container, CssBaseline, Typography } from '@mui/material'
import React from 'react'
import Header from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserRoutes from './Utils/UserRoutes'

export default function App() {
	return (
		<>
			<CssBaseline />
			<Header />
			<Container maxWidth="sm" sx={{ py: "70px" }}>
				<Routes>
					{UserRoutes.map((r) => {
						return <Route
							key={r.path}
							path={r.path}
							element={r.element}
						/>
					})}
					<Route path='*' element={<Navigate to={"/"} />} />
				</Routes>
			</Container>
		</>
	)
}
