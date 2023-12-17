import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAlbum, getOrdersByAlbumId, updateAlbum } from '../../apiCalls';
import { green, grey, orange } from '@mui/material/colors';
import CalculateWeight from '../../helper/CalculateWeight';
import NumChangeEngToMM from '../../helper/NumChangeEngToMM';
import GetMMDate from '../../helper/GetMMDate';
import CustomBadge from '../../components/CustomBudge';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../AppContextProvider';

export default function Detail() {
	const { id } = useParams();
	const { snackNoti } = useContext(AppContext)

	const navigate = useNavigate();

	const [isFetching, setIsFetching] = useState(true);
	const [orders, setOrders] = useState([]);
	const [album, setAlbum] = useState({});
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [isLoadingUpdateFormBtn, setIsLoadingUpdateFormBtn] = useState(false);
	const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
	const [isLoadingDeleteConfirmBtn, setIsLoadingDeleteConfirmBtn] = useState(false);

	const albumNameRef = useRef();

	const handleClickDetail = (id) => {
		navigate(`/detail/${id}`);
	}

	const handleCloseEditDialog = () => {
		setOpenEditDialog(false);
	}
	const handleSubmitUpdate = async () => {
		const name = albumNameRef.current.value;
		if(!name) return snackNoti({msg: "Album Name လိုအပ်သည်", type: "warning"});

		setIsLoadingUpdateFormBtn(true);

		const result = await updateAlbum(id, {name});
		if(result.ok){
			setAlbum((prev) => ({...prev, name}));
			snackNoti({msg: "update success", type: "success"})

			handleCloseEditDialog();
			setIsLoadingUpdateFormBtn(false);
		} else {
			snackNoti({msg: result.err, type: "error"})
		}
	}

	const handleCloseDeleteConfirmDialog = () => {
		setOpenDeleteConfirmDialog(false);
	}
	const handleSubmitDelete = async () => {
		setIsLoadingDeleteConfirmBtn(true);

		const result = await deleteAlbum(id);
		if(result.ok){
			snackNoti({msg: "delete album success", type: "success"})
			setIsLoadingDeleteConfirmBtn(false)
			navigate(`/albums`);
		}else{
			snackNoti({msg: result.err, type: "error"})
		}
	}

	useEffect(() => {
		const fetchOrders = async () => {
			const result = await getOrdersByAlbumId(id);
			if(result.ok){
				setOrders(result.orders);
				setAlbum(result.album);
			}
			setIsFetching(false);
		}

		fetchOrders();
	}, [])

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
				<IconButton onClick={() => navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
				<Typography>{album.name}</Typography>
				<Typography></Typography>
			</Box>

			<Box sx={{ mb: 2, display: 'flex', justifyContent: "end" }}>
				<IconButton variant='contained' size='small' color='primary' sx={{ mr: 1 }} onClick={() => setOpenEditDialog(true)}><EditIcon /></IconButton>
				<IconButton variant='contained' size='small' color='error' onClick={() => setOpenDeleteConfirmDialog(true)}><DeleteForeverIcon /></IconButton>
			</Box>

			<Grid container>
				{
					isFetching ? (
						[1].map((i) => {
							return (
								<Grid item xs={12} key={i}>
									<Box className="floatingCard" sx={{ borderRadius: "0.1rem", mb: 2 }}>
										<Stack>
											<Skeleton height={20} width={"60%"} />
											<Skeleton height={20} width={"30%"} />
											<Skeleton height={20} width={"20%"} />
											<Skeleton height={20} width={"75%"} />
											<Skeleton height={20} width={"90%"} />
											<Skeleton height={20} width={"6%"} />
											<Skeleton height={50} />
										</Stack>
									</Box>
								</Grid>
							)
						})
					) : orders.length < 1 ? (
						<>
							<Typography>ပစ္စည်းမရှိသေးပါ</Typography>
						</>
					) : (
						orders.map((order) => {
							return (
								<Grid item xs={12} key={order.id}>
									<Box className="floatingCard" sx={{ borderRadius: "0.1rem", mb: 2 }}>
										<Stack>
											<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>{order.name}</Typography>
											{/* <Typography variant='subtitle1' color={teal[500]}>{FormatCode(order.code)}</Typography> */}
											<Typography variant='subtitle1'>{order.village}</Typography>
											<Typography variant='subtitle1'>{order.phone}</Typography>
											<Typography variant='subtitle1'>{order.gold}</Typography>
											<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(order.weight)}</Typography>
											<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(order.price || 0, true)} ကျပ်တိတိ</Typography>
											<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(order.date))}</Typography>
											<span>
												<CustomBadge>{order.acceptor}</CustomBadge>
												{
													Boolean(order.redeem) && (
														<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
													)
												}
											</span>
											<Button
												variant='contained'
												size='small'
												sx={{ mt: 2 }}
												onClick={() => handleClickDetail(order.id)}>
												detail
											</Button>
										</Stack>
									</Box>
								</Grid>
							)
						})
					)
				}
			</Grid>

			{/* edit dialog */}
			<Dialog open={openEditDialog} fullWidth onClose={handleCloseEditDialog}>
				<DialogTitle>Album Name Change</DialogTitle>
				<DialogContent>
					<TextField
						sx={{ mt: 2 }}
						name='name'
						label="Album Name"
						defaultValue={album.name}
						inputRef={albumNameRef}
					/>
				</DialogContent>
				<DialogActions>
					<LoadingButton loading={isLoadingUpdateFormBtn} onClick={handleCloseEditDialog}>cancle</LoadingButton>
					<LoadingButton loading={isLoadingUpdateFormBtn} variant='contained' onClick={handleSubmitUpdate}>save</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* delete confirm dialog */}
			<Dialog open={openDeleteConfirmDialog} fullWidth onClose={handleCloseDeleteConfirmDialog}>
				<DialogTitle>
					Confirm Delete
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`"${album.name}" Album ကိုဖျက်မည်သေချာပါလား?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LoadingButton loading={isLoadingDeleteConfirmBtn} onClick={handleCloseDeleteConfirmDialog}>cancle</LoadingButton>
					<LoadingButton loading={isLoadingDeleteConfirmBtn} variant='contained' color='error' onClick={handleSubmitDelete}>Yes</LoadingButton>
				</DialogActions>
			</Dialog>
		</>
	)
}
