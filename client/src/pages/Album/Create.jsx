import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { LoadingButton } from '@mui/lab';
import { createAlbum } from '../../apiCalls';
import { AppContext } from '../../AppContextProvider';

export default function Create() {
	const { snackNoti }  = useContext(AppContext)

	const [isLoadingBtn, setIsLoadingBtn] = useState(false);

	const nameRef = useRef();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		const name = nameRef.current.value;

		setIsLoadingBtn(true)

		const result = await createAlbum({ name });
		if(result.ok){
			snackNoti({ msg: "Album create success", type: "success" })
			navigate(-1);
		}else{
			console.log(result)
			snackNoti({ msg: result.err, type: "error" })
		}

		setIsLoadingBtn(false)
	}

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
				<IconButton onClick={() => navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
				<Typography>Create Album</Typography>
				<Typography></Typography>
			</Box>

			{/* form */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
				<TextField
					name='name'
					label="Album Name"
					size='small'
					inputRef={nameRef}
					sx={{ mb: 2 }}
					required
					fullWidth
				/>
				<LoadingButton loading={isLoadingBtn} variant='contained' fullWidth type='submit'>save</LoadingButton>
			</form>
		</>
	)
}
