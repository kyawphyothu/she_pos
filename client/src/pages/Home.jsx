import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContextProvider'
import { Box, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const { auth } = useContext(AppContext);

	const navigate = useNavigate();

	const handleClickTableBorrow = () => {
		navigate("/table_borrow");
	}

	return (
		<>
			{
				auth ? (
					<React.Fragment>
						<Box>
							<Button
								variant='contained'
								sx={{
									width: "100%",
									padding: 3,
									mb: 2,
									borderRadius: 4,
									fontSize: "large"
								}}
								onClick={handleClickTableBorrow}>
								စားပွဲငှား
							</Button>
							<Button
								variant='contained'
								color='secondary'
								sx={{
									width: "100%",
									padding: 3,
									borderRadius: 4,
									fontSize: "large"
								}}>
								ရွှေရောင်း
							</Button>
						</Box>
					</React.Fragment>
				):(
					<div>Login first</div>
				)
			}
		</>
	)
}
