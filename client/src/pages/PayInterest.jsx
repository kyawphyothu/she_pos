import { Box, Grid, IconButton, LinearProgress, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CustomBadge from '../components/CustomBudge';
import { LoadingButton } from '@mui/lab';
import CustomDateInput from '../components/CustomDateInput';
import { AppContext } from '../AppContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { createPayInterest, getOrderById } from '../apiCalls';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { format, parse } from 'date-fns';
import GetMMDate from '../helper/GetMMDate';

export default function PayInterest() {
	const { snackNoti } = useContext(AppContext);
	const { id } = useParams();

	const [isFetching, setIsFetching] = useState(true);
	const [order, setOrder] = useState({});
	const [formData, setFormData] = useState({order_id: 0, name: "", pay_price: 0, left_price: 0, pay_date: "", change_date: "", description: ""});
	const [MMDate, setMMDate] = useState({pay: GetMMDate(new Date()), change: ""})

	const paydateRef = useRef();
	const changedateRef = useRef();

	const navigate = useNavigate();

	const handleChangeFormData = (e) => {
		let value;
		if (e.target.type === "number" && e.target.name !== "phone") {
			value = +e.target.value;
		} else {
			value = e.target.value;
		}

		setFormData(prev => ({...prev, [e.target.name]: value}))
	}

	const handleChangeDate = (newVal, item) => {
		setMMDate((prev) => ({...prev, [item]: GetMMDate(newVal)}));
	}

	const handleSubmit = async () => {
		const data = formData;

		// Input date string in "DD/MM/YYYY" format
		const inputPayDate = paydateRef.current.value;
		// Parse the input date string into a Date object
		const parsedPayDate = parse(inputPayDate, 'dd/MM/yyyy', new Date());
		// Format the parsed date as "YYYY-MM-DD" string
		const outputPayDate = format(parsedPayDate, 'yyyy-MM-dd');
		// Create a new date string in "YYYY-MM-DD" format
		data.pay_date = outputPayDate;

		if(!changedateRef.current.value){
			snackNoti({type: "warning", msg: "ပြောင်းလိုသည့်ရက်ဖြည့်သွင်းပါ"});
			return;
		}
		// Input date string in "DD/MM/YYYY" format
		const inputChangeDate = changedateRef.current.value;
		// Parse the input date string into a Date object
		const parsedChangeDate = parse(inputChangeDate, 'dd/MM/yyyy', new Date());
		// Format the parsed date as "YYYY-MM-DD" string
		const outputChangeDate = format(parsedChangeDate, 'yyyy-MM-dd');
		// Create a new date string in "YYYY-MM-DD" format
		data.change_date = outputChangeDate;

		const res = await createPayInterest(data);
		if(res.ok){
			snackNoti({type: "success", msg: res.msg});
			navigate(`/detail/${id}`)
		} else {
			snackNoti({type: "error", msg: res.err});
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
						<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
							<IconButton onClick={() => history.back()}>
								<ArrowBackRoundedIcon />
							</IconButton>
							<Typography>အတိုးဆပ် လပြောင်း</Typography>
							<span></span>
						</Box>

						<form onSubmit={(e) => {
							e.preventDefault();

							handleSubmit();
						}}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<CustomBadge>{order.acceptor}</CustomBadge>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="အမည်"
										size="small"
										name='name'
										fullWidth
										required
										defaultValue={order.name}
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="ဆပ်ငွေ"
										name='pay_price'
										size="small"
										type='number'
										fullWidth
										required
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="ကျန်ငွေ"
										name='left_price'
										type='number'
										size="small"
										fullWidth
										required
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<MobileDatePicker
											label={"ဆပ် နေ့ရက်"}
											defaultValue={dayjs(new Date())}
											format={"DD/MM/YYYY"}
											inputRef={paydateRef}
											onAccept={(newVal) => handleChangeDate(newVal, "pay")}
											slotProps={{
												textField: {
													helperText: MMDate.pay,
													size: 'small',
													fullWidth: true,
													required: true
												}
											}}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<MobileDatePicker
											label={"ပြောင်း နေ့ရက်"}
											// defaultValue={dayjs(new Date())}
											format={"DD/MM/YYYY"}
											inputRef={changedateRef}
											onAccept={(newVal) => handleChangeDate(newVal, "change")}
											slotProps={{
												textField: {
													helperText: MMDate.change,
													size: 'small',
													fullWidth: true,
													required: true
												}
											}}
										/>
									</LocalizationProvider>
								</Grid>
								{/* <Grid item xs={12}>
									<CustomDateInput
										label="ဆပ် နေ့ရက်"
										defaultValue={new Date()}
									/>
								</Grid>
								<Grid item xs={12}>
									<CustomDateInput
										label="ပြောင်း နေ့ရက်"
									/>
								</Grid> */}
								<Grid item xs={12}>
									<TextField
										multiline
										name="description"
										label="မှတ်ချက်"
										rows={4}
										fullWidth
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<LoadingButton variant='outlined' sx={{ mr: 1 }} type='submit'>save</LoadingButton>
									<LoadingButton variant='contained' type='submit'>save & print</LoadingButton>
								</Grid>
							</Grid>
						</form>
					</>
				)
			}
		</>
	)
}
