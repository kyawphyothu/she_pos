import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div>
			<h5>page not found</h5>
			<button onClick={() => navigate("/login")}>login</button>
			<button onClick={() => navigate("/")}>home</button>
		</div>
	)
}
