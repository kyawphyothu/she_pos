import { Autocomplete, Box, Button, ButtonGroup, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, LinearProgress, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { amber, blue, cyan, green, grey, indigo, lightBlue, orange, pink, purple, red, teal } from '@mui/material/colors';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBadge from '../components/CustomBudge';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import GetMMDate from '../helper/GetMMDate';
import NumChangeEngToMM from '../helper/NumChangeEngToMM';
import ComponentToPrint from '../components/print/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { createOrderAlbum, deleteOrder, deleteOrderAlbum, getAllAlbums, getHistoryByOrderId, getOrderById } from '../apiCalls';
import CalculateWeight from '../helper/CalculateWeight';
import FormatCode from '../helper/FormetCode';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../AppContextProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CalculateOrderByHistory from '../helper/CalculateOrderByHistory';

export default function Detail() {
	const { id } = useParams();
	const { snackNoti } = useContext(AppContext);

	const [q, setQ] = useState("");
	const [order, setOrder] = useState({});
	const [histories, setHistories] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [dateLang, setDateLang] = useState("mm");
	const [isPrinting, setIsPrinting] = useState(false);
	const [albums, setAlbums] = useState([]);
	const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
	const [selectedAlbum, setSelectedAlbum] = useState({});
	const [isLoadingAlbumAddDialogBtn, setIsLoadingAlbumAddDialogBtn] = useState(false);
	const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
	const [isLoadingDeleteBtn, setIsLoadingDeleteBtn] = useState(false);

	const printRef = useRef();

	const navigate = useNavigate();

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
		onBeforeGetContent: () => setIsPrinting(true),
		onAfterPrint: () => setIsPrinting(false),
	});

	const handleClickBckBtn = () => {
		navigate(-1)
		// if(q===null || q==="null"){
		// 	navigate(`/search`);
		// }else{
		// 	navigate(`/search?q=${q}`)
		// }
	}

	const toggleDateLang = () => {
		dateLang==="mm" ? setDateLang("eng") : setDateLang("mm");
		return;
	};

	const handleCloseAlbumDialog = () => {
		setOpenAlbumDialog(false);
	}
	const handleChangeAlbumAutoComplete = (e, newVal) => {
		setSelectedAlbum(newVal);
	}
	const handleSubmitAlbum = async () => {
		if(!selectedAlbum) return snackNoti({msg: "Album တစ်ခုရွေးပါ", type: "warning"});

		setIsLoadingAlbumAddDialogBtn(true);

		const result = await createOrderAlbum({order_id: id, album_id: selectedAlbum.id});
		if(result.ok){
			snackNoti({msg: "Album ထဲသို့ ထည့်သွင်းပြီးပါပြီ", type: "success"});
			handleCloseAlbumDialog();

			setOrder((prev) => ({...prev, album_id: selectedAlbum.id, album_name: selectedAlbum.name, order_album_id: result.insertId}))
		}else{
			snackNoti({msg: result.err, type: "error"});
		}

		setIsLoadingAlbumAddDialogBtn(true);
	}
	const handleRemoveAlbum = async () => {
		const result = await deleteOrderAlbum(order.order_album_id);
		if(result.ok){
			snackNoti({msg: result.msg, type: "success"});
			setOrder((prev) => ({...prev, album_id: null, album_name: null, order_album_id: null}))
		}else{
			snackNoti({msg: result.err, type: "error"});
		}
	}

	const handleDeleteOrder = async () => {
		setIsLoadingDeleteBtn(true);

		const result = await deleteOrder(id);
		if(result.ok){
			snackNoti({msg: result.msg, type: "success"});
			navigate(-1);
		}else{
			snackNoti({msg: result.err, type: "error"});
		}

		setIsLoadingDeleteBtn(false);
	}

	const EditButton = (props) => {
		const { onClick } = props;

		return (
			<IconButton color='primary' onClick={onClick}>
				<EditIcon />
			</IconButton>
		)
	}

	const handleEditPawn = (pawnId) => {
		navigate(`/editpawn/${pawnId}`)
	}

	useEffect(() => {
		const fetchData = async () => {
			const [orderResult, historyResult, albumResult] = await Promise.all([
				getOrderById(id),
				getHistoryByOrderId(id),
				getAllAlbums()
			]);

			if (orderResult.ok && historyResult.ok) {
				setHistories(historyResult);

				const orderData = {
					...orderResult
				};
				const orderByHistory = CalculateOrderByHistory(historyResult);
				orderData.gold=orderByHistory.gold;
				orderData.weight=orderByHistory.weight;
				orderData.price=orderByHistory.price;
				orderData.date=orderByHistory.date;
				orderData.htet_yu=orderByHistory.htet_yu;
				if (orderByHistory.htet_yu.length) {
					orderByHistory.htet_yu.map(i => {
						i.gold ? orderData.gold+=` ${i.gold}`: "";
						i.weight ? orderData.weight+=i.weight: "";
					})
				}

				setOrder(orderData);
			}

			if (albumResult.ok) {
				setAlbums(albumResult);
			}

			setIsFetching(false);
		}

		fetchData();
		setQ(localStorage.getItem("q") || "");
	}, [])

	return (
		<>
			{
				isFetching ? (
					<>
						<LinearProgress />
					</>
				):(
					<>
						<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
							<IconButton onClick={handleClickBckBtn}>
								<ArrowBackRoundedIcon />
							</IconButton>
							{
								isPrinting ? (
									<LoadingButton loading></LoadingButton>
								) : (
									<IconButton sx={{ color: orange[400] }} onClick={handlePrint}>
										<PrintRoundedIcon />
									</IconButton>
								)
							}
							<div style={{ display: "none" }}>
								<ComponentToPrint ref={printRef} order={order} histories={histories} />
							</div>
							{/* <div ref={printRef}>hello</div> */}
						</Box>

						<Box className="floatingCard" sx={{ borderRadius: "0.1rem", mb: 2 }}>
							<Stack>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
										{order.name}
									</Typography>
									<IconButton color='error' onClick={() => setOpenDeleteConfirmDialog(true)}>
										<DeleteForeverIcon />
									</IconButton>
								</Box>
								<Typography variant='subtitle1' color={teal[500]}>{FormatCode(order.code)}</Typography>
								<Typography variant='subtitle1'>{order.village}</Typography>
								<Typography variant='subtitle1'>{order.phone}</Typography>
								<Typography variant='subtitle1'>{order.gold}</Typography>
								<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(order.weight)}</Typography>
								<Typography variant='subtitle1' color={green[500]}>
									{NumChangeEngToMM(order.price, true)}
									{
										order.htet_yu.length ? order.htet_yu.map(i => {
											return ` + ${NumChangeEngToMM(i.price, true)}`
										}) : ""
									}
								</Typography>
								<Typography variant='subtitle1' color={grey[500]}>
									{
										dateLang==="mm" ?
										GetMMDate(new Date(order.date)) :
										`${new Date(order.date).getDate()}-${new Date(order.date).getMonth()+1}-${new Date(order.date).getFullYear()}`
									}
									<IconButton color='warning' onClick={toggleDateLang}><ChangeCircleIcon /></IconButton>
								</Typography>
								{
									order.htet_yu.length ? order.htet_yu.map(i => {
										return <Typography variant='subtitle1' color={grey[500]} key={i.date}>
												{
													dateLang==="mm" ?
													GetMMDate(new Date(i.date)) :
													`${new Date(i.date).getDate()}-${new Date(i.date).getMonth()+1}-${new Date(i.date).getFullYear()}`
												}
											</Typography>
									}) : ''
								}
								<span style={{ marginBottom: "8px" }}>
									{
										order.album_id ? (
											<Chip
												label={order.album_name}
												onClick={() => navigate(`/album/${order.album_id}`)}
												onDelete={() => {handleRemoveAlbum()}}
											/>
										) : (
											<Chip
												label="+ Album"
												variant='outlined'
												onClick={() => {setOpenAlbumDialog(true)}}
											/>
										)
									}
								</span>
								<span>
									<CustomBadge>{order.acceptor}</CustomBadge>
									{
										Boolean(order.redeem) && (
											<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
										)
									}
								</span>
								{
									!Boolean(order.redeem) && (
										<Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", mt: 2 }}>
											<Button size='small' variant='outlined' onClick={() => navigate(`/htetyu/${order.id}`) }>ထပ်ယူ</Button>
											<Button size='small' variant='outlined' onClick={() => navigate(`/payinterest/${order.id}`) }>အတိုးဆပ်</Button>
											<Button size='small' variant='contained' color='error' onClick={() => navigate(`/reextract/${order.id}`) }>ရွေး</Button>
										</Box>
									)
								}
							</Stack>
						</Box>

						{/* history */}
						<Grid container spacing={3} mb={3}>
							<Grid item xs={12}>
								<Divider>
									<Chip label="မှတ်တမ်းများ" />
								</Divider>
							</Grid>
							{!histories.length ? (
									<>
										<Grid item xs={12}>
											<Skeleton width="20%" animation="wave" />
											<Skeleton width="30%" animation="wave" />
											<Skeleton width="20%" animation="wave" />
											<Skeleton width="35%" animation="wave" />
											<Skeleton width="55%" animation="wave" />
										</Grid>
									</>
								):(
									histories.map((history, index) => {
										return (
											<React.Fragment key={history.created_at}>
												{/* ထား */}
												{history.status === "pawn" ? (
													<Grid item xs={12}>
														<Stack>
															<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem", display: "flex", justifyContent: "space-between" }}>
																{history.name}
																{
																	index === histories.length-1 && <EditButton onClick={() => handleEditPawn(history.id)} />
																}
															</Typography>
															<Typography variant='subtitle1'>{history.gold}</Typography>
															<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(history.weight)}</Typography>
															<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
															<Typography variant='subtitle1' color={grey[500]}>
																{
																	dateLang==="mm" ?
																	GetMMDate(new Date(history.date)) :
																	`${new Date(history.date).getDate()}-${new Date(history.date).getMonth()+1}-${new Date(history.date).getFullYear()}`
																}
															</Typography>
															<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
														</Stack>
													</Grid>
												) : null}

												{/* ထပ်ယူ */}
												{history.status === "htet_yu" ? (
													<Grid item xs={12}>
														<Stack>
															<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
																{history.name}
																<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem", flexGrow: 1 }} color={red[500]}>(ထပ်ယူ)</Typography>
																{
																	index === histories.length-1 && <EditButton />
																}
															</Typography>
															<Typography variant='subtitle1'>{history.gold}</Typography>
															<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(history.weight)}</Typography>
															<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
															<Typography variant='subtitle1' color={grey[500]}>
																{
																	dateLang==="mm" ?
																	GetMMDate(new Date(history.date)) :
																	`${new Date(history.date).getDate()}-${new Date(history.date).getMonth()+1}-${new Date(history.date).getFullYear()}`
																}
															</Typography>
															<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
														</Stack>
													</Grid>
												) : null}

												{/* အတိုးဆပ် */}
												{history.status === "pay_interest" ? (
													<Grid item xs={12}>
														<Stack>
															<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
																{history.name}
																<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem", flexGrow: 1 }} color={red[500]}>(အတိုးဆပ်)</Typography>
																{
																	index === histories.length-1 && <EditButton />
																}
															</Typography>
															<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.pay_price, true)} ကျပ်တိတိ (ဆပ်)</Typography>
															<Typography variant='subtitle1' color={grey[500]}>
																{
																	dateLang==="mm" ?
																	GetMMDate(new Date(history.pay_date)) :
																	`${new Date(history.pay_date).getDate()}-${new Date(history.pay_date).getMonth()+1}-${new Date(history.pay_date).getFullYear()}`
																} (ဆပ်)
															</Typography>
															<Typography variant='subtitle1' color={grey[500]}>
																{
																	dateLang==="mm" ?
																	GetMMDate(new Date(history.change_date)) :
																	`${new Date(history.change_date).getDate()}-${new Date(history.change_date).getMonth()+1}-${new Date(history.change_date).getFullYear()}`
																} (ပြောင်း)
															</Typography>
															<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
														</Stack>
													</Grid>
												) : null}

												{/* ခွဲရွေး */}
												{history.status === "half_redeem" ? (
													<Grid item xs={12}>
														<Stack>
															<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
																{history.name}
																<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem", flexGrow: 1 }} color={red[500]}>(ခွဲရွေး)</Typography>
																{
																	index === histories.length-1 && <EditButton />
																}
															</Typography>
															<Typography variant='subtitle1'>{history.take_gold && `${history.take_gold} (ရွေး)`}</Typography>
															<Typography variant='subtitle1'>{history.left_gold && `${history.left_gold} (ကျန်)`}</Typography>
															<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(history.weight)}</Typography>
															<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.pay_price, true)} ကျပ်တိတိ (သွင်း)</Typography>
															<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.left_price, true)} ကျပ်တိတိ (ကျန်)</Typography>
															<Typography variant='subtitle1' color={grey[500]}>
																{
																	dateLang==="mm" ?
																	GetMMDate(new Date(history.date)) :
																	`${new Date(history.date).getDate()}-${new Date(history.date).getMonth()+1}-${new Date(history.date).getFullYear()}`
																}
															</Typography>
															{/* <Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.change_date))} (ပြောင်း)</Typography> */}
															<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
														</Stack>
													</Grid>
												) : null}

												{/* ရွေး */}
												{history.status === "redeem" ? (
													<Grid item xs={12}>
														<Stack>
															<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
																{history.name}
																<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem", flexGrow: 1 }} color={red[500]}>(ရွေး)</Typography>
																{
																	index === histories.length-1 && <EditButton />
																}
															</Typography>
															<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
															<Typography variant='subtitle1' color={grey[500]}>
																{
																	dateLang==="mm" ?
																	GetMMDate(new Date(history.date)) :
																	`${new Date(history.date).getDate()}-${new Date(history.date).getMonth()+1}-${new Date(history.date).getFullYear()}`
																}
															</Typography>
															<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
														</Stack>
													</Grid>
												) : null}
											</React.Fragment>
										)
									})
								)
							}
						</Grid>

						{/* choose album dialog */}
						<Dialog open={openAlbumDialog} fullWidth onClose={handleCloseAlbumDialog}>
							<DialogTitle>Choose Album</DialogTitle>
							<DialogContent>
								<Autocomplete
									disablePortal
									id="combo-box-demo"
									options={albums}
									getOptionLabel={(option) => option.name}
									sx={{ height: 300, pt: 2 }}
									renderInput={(params) => <TextField {...params} label="Album" />}
									onChange={handleChangeAlbumAutoComplete}
								/>
							</DialogContent>
							<DialogActions>
								<LoadingButton loading={isLoadingAlbumAddDialogBtn} onClick={handleCloseAlbumDialog}>cancle</LoadingButton>
								<LoadingButton loading={isLoadingAlbumAddDialogBtn} onClick={handleSubmitAlbum} variant='contained'>save</LoadingButton>
							</DialogActions>
						</Dialog>

						{/* delete order confirm dialog */}
						<Dialog open={openDeleteConfirmDialog} fullWidth onClose={() => setOpenDeleteConfirmDialog(false)}>
							<DialogTitle>Delete Confirm</DialogTitle>
							<DialogContent>
								<DialogContentText>ဤစာရင်းကို အပြီးတိုင် ဖျက်ပစ်မည်။ သေချာပါသလား?</DialogContentText>
							</DialogContent>
							<DialogActions>
								<LoadingButton loading={isLoadingDeleteBtn} onClick={() => setOpenDeleteConfirmDialog(false)}>cancle</LoadingButton>
								<LoadingButton loading={isLoadingDeleteBtn} variant='contained' color='error' onClick={handleDeleteOrder}>သေချာပါသည်</LoadingButton>
							</DialogActions>
						</Dialog>
					</>
				)
			}
		</>
	)
}
