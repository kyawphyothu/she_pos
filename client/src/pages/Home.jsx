import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContextProvider'

export default function Home() {
	const { auth } = useContext(AppContext);

	return (
		<>
			{
				auth ? (
					<>
						<h5>This is Home Page</h5>
					</>
				):(
					<div>Login first</div>
				)
			}
		</>
	)
}
