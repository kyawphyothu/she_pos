import React, { useContext, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, TextField, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import { createVillage, getAllvillages, updateVillage } from '../../apiCalls';
import { AppContext } from '../../AppContextProvider';

export default function Village() {
	const { snackNoti } = useContext(AppContext);

	const [villages, setVillages] = useState([]);
	const [isFetchingVillages, setIsFetchingVillages] = useState(true);
	const [isLoadingSubmitVillageBtn, setIsLoadingSubmitVillageBtn] = useState(false);
	const [editVillage, setEditVillage] = useState({id: null, name: ""});
	const [openEditVillageDialog, setOpenEditVillageDialog] = useState(false);

	const createVillageNameRef = useRef();

	const handleSubmitCreateVillage = async () => {
		const name = createVillageNameRef.current.value;

		if(!name) return snackNoti({msg: "ရွာအမည်ထည့်ပါ", type: "error"})

		setIsLoadingSubmitVillageBtn(true);

		const result = await createVillage({name});
		if(result.ok){
			setVillages((prev) => ([...prev, {id: result.id, name}]))
			snackNoti({msg: result.msg, type: "success"})
			createVillageNameRef.current.value = "";
		}else{
			snackNoti({msg: result.err, type: "error"})
		}

		setIsLoadingSubmitVillageBtn(false);
	}

	const handleClickEditBtn = (id) => {
		setEditVillage(() => {
			return villages.filter(i => i.id===id)[0];
		});

		setOpenEditVillageDialog(true);
	}

	const handleSubmitEditVillage = async () => {
		const {id, name} = editVillage;

		setIsLoadingSubmitVillageBtn(true);

		const result = await updateVillage(id, {name});
		if(result.ok){
			setVillages((prev) => {
				return prev.map((i) => {
					if(i.id === id){
						return {id: i.id, name};
					}else{
						return i;
					}
				})
			})
			snackNoti({msg: result.msg, type: "success"})
			setOpenEditVillageDialog(false);
		}else{
			snackNoti({msg: result.err, type: "error"})
		}

		setIsLoadingSubmitVillageBtn(false);
	}

	useEffect(() => {
		const fetchVillages = async () => {
			const result = await getAllvillages();
			if(result.ok) setVillages(result);
			setIsFetchingVillages(false);
		};

		fetchVillages();
	}, [])

	return (
		<>
			<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
				<IconButton onClick={() => history.back()}>
					<ArrowBackRoundedIcon />
				</IconButton>
				<Typography>ရွာများ</Typography>
				<span></span>
			</Box>

			<Box sx={{ display: "flex", mb: 2 }}>
				<TextField
					name='villageName'
					inputRef={createVillageNameRef}
					label="ရွာအမည်"
					size='small'
					sx={{ flexGrow: 1 }}
				/>
				<LoadingButton loading={isLoadingSubmitVillageBtn} variant='contained' size='small' onClick={handleSubmitCreateVillage}>+Add</LoadingButton>
			</Box>

			<Box>
				<List dense={false}>
					{
						isFetchingVillages ? (
							[1,2,3].map((i) => {
								return (
									<Box sx={{ display: "flex", mb: 2 }} key={i}>
										<Skeleton width={"60%"} />
										<Box sx={{ flexGrow: 1 }}></Box>
										<Skeleton variant="circular" width={30} height={30} sx={{ alignItems: "end" }} />
									</Box>
								)
							})
						):(
							villages.slice().reverse().map((i, index) => {
								return (
									<ListItem
										key={i.id}
										secondaryAction={
											<IconButton color='primary' onClick={() => handleClickEditBtn(i.id)}>
												<EditIcon />
											</IconButton>
										}
										>
										<ListItemText
											primary={`${index+1}. ${i.name}`}
										/>
									</ListItem>
								)
							})
						)
					}
				</List>
			</Box>


			{/* edit village dialog */}
			<Dialog open={openEditVillageDialog} fullWidth onClose={() => setOpenEditVillageDialog(false)}>
				<DialogTitle>Edit Village</DialogTitle>
				<DialogContent>
					<TextField
						name='name'
						label="ရွာအမည်"
						sx={{ mt: 1 }}
						size='small'
						value={editVillage.name}
						onChange={(e) => setEditVillage((prev) => ({...prev, name: e.target.value}))}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<LoadingButton loading={isLoadingSubmitVillageBtn} onClick={() => setOpenEditVillageDialog(false)}>cancle</LoadingButton>
					<LoadingButton loading={isLoadingSubmitVillageBtn} variant='contained' onClick={handleSubmitEditVillage}>save</LoadingButton>
				</DialogActions>
			</Dialog>
		</>
	)
}
