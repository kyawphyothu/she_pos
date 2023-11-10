import { Box, Grid, IconButton, LinearProgress, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBadge from '../components/CustomBudge';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import NumChangeEngToMM from '../helper/NumChangeEngToMM';
import { LoadingButton } from '@mui/lab';
import CustomDateInput from '../components/CustomDateInput';
import { createHtetYu, getOrderById } from '../apiCalls';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { format, parse } from 'date-fns';
import { AppContext } from '../AppContextProvider';

export default function HtetYu() {
	const { snackNoti } = useContext(AppContext);
	const { id } = useParams();

	const [order, setOrder] = useState({});
	const [isFetching, setIsFetching] = useState(true);
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);
	const [formData, setFormData] = useState({order_id: 0, name: "", price: 0, date: "", gold: "", weight: "", description: ""});

	const printRef = useRef();
	const dateRef = useRef();
	const kRef = useRef();	//ကျပ်
	const pRef = useRef();	//ပဲ
	const rRef = useRef();	//ရွေး

	const navigate = useNavigate();

	const handlePrintVoucher = () => {
		// printRef.current.print();
		// window.print();
	}

	const handleChangeFormData = (e) => {
		let value;
		if (e.target.type === "number" && e.target.name !== "phone") {
			value = +e.target.value;
		} else {
			value = e.target.value;
		}

		setFormData(prev => ({...prev, [e.target.name]: value}))
	}

	const handleSave = () => {
		handleSubmit();
	}
	const handleSaveAndSubmit = () => {
		handleSubmit();
	}

	const handleSubmit = async () => {
		const data = formData;
		data.weight = +rRef.current.value + (pRef.current.value*8) + (kRef.current.value*128);

		// Input date string in "DD/MM/YYYY" format
		const inputDate = dateRef.current.value;
		// Parse the input date string into a Date object
		const parsedDate = parse(inputDate, 'dd/MM/yyyy', new Date());
		// Format the parsed date as "YYYY-MM-DD" string
		const outputDate = format(parsedDate, 'yyyy-MM-dd');
		// Create a new date string in "YYYY-MM-DD" format
		data.date = outputDate;

		if(data.gold && !data.weight){
			snackNoti({type: "warning", msg: "အလေးချိန် ထည့်ပါ"});
			return;
		}

		const result = await createHtetYu(data);
		if(result.ok){
			snackNoti({type: "success", msg: result.msg});
			navigate(`/detail/${id}`);
		} else {
			snackNoti({type: "error", msg: result.err});
		}

	}

	useEffect(() => {
		const fetchOrder = async () => {
			const result = await getOrderById(id);
			setIsFetching(false);
			if(result.ok){
				setOrder(result);
				setFormData(prev => ({...prev, order_id: result.id, name: result.name}))
			}
		}

		fetchOrder();
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
						<form onSubmit={(e) => {
							e.preventDefault();

							handleSave();
						}}>
							<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
								<IconButton onClick={() => history.back()}>
									<ArrowBackRoundedIcon />
								</IconButton>
								<Typography>ထပ်ယူ</Typography>
								<span></span>
							</Box>

							{/* ထပ်ယူ form */}
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<CustomBadge>{order.acceptor}</CustomBadge>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="အမည်"
										size='small'
										name='name'
										fullWidth
										required
										defaultValue={order.name}
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="ထပ်တိုးပစ္စည်း"
										name='gold'
										size='small'
										fullWidth
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										label="ကျပ်"
										size='small'
										type='number'
										fullWidth
										inputRef={kRef}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										label="ပဲ"
										size='small'
										type='number'
										fullWidth
										inputRef={pRef}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										label="ရွေး"
										size='small'
										type='number'
										fullWidth
										inputRef={rRef}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="ယူငွေ"
										name='price'
										type='number'
										size='small'
										fullWidth
										required
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<MobileDatePicker
											label={"နေ့ရက်"}
											defaultValue={dayjs(new Date())}
											format={"DD/MM/YYYY"}
											inputRef={dateRef}
											slotProps={{
												textField: {
													size: 'small',
													fullWidth: true,
												}
											}}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="မှတ်ချက်"
										multiline
										name='description'
										rows={4}
										fullWidth
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<LoadingButton loading={isLoadingBtn} variant='outlined' sx={{ mr: 1 }} type='submit'>save</LoadingButton>
									<LoadingButton loading={isLoadingBtn} variant='contained' type='submit'>save & print</LoadingButton>
								</Grid>
							</Grid>
						</form>
					</>
				)
			}
		</>
	)
}
