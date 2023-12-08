import { Box, Checkbox, FormControlLabel, Grid, IconButton, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CustomBadge from '../components/CustomBudge';
import { LoadingButton } from '@mui/lab';
import CustomDateInput from '../components/CustomDateInput';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { createHalfRedeem, createRedeem, getOrderById } from '../apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { AppContext } from '../AppContextProvider';
import GetMMDate from '../helper/GetMMDate';

export default function Redeem() {
	const { snackNoti } = useContext(AppContext);
	const { id } = useParams();

	const [isHalfRedeem, setIsHalfRedeem] = useState(false);
	const [isFetching, setIsFetching] = useState(true);
	const [order, setOrder] = useState({});
	const [formData, setFormData] = useState({order_id: "", name: "", price: "", pay_price: "", left_Price: "", take_gold: "", left_gold: "", weight: "", date: "", description: ""});
	const [MMDate, setMMDate] = useState(GetMMDate(new Date()));

	const kRef = useRef(0);	//ကျပ်
	const pRef = useRef(0);	//ပဲ
	const rRef = useRef(0);	//ရွေး
	const dateRef = useRef();

	const navigate = useNavigate();

	const handleChangeCheckBox = (e) => {
		setIsHalfRedeem(e.target.checked);
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

	const handleChangeDate = (newVal) => {
		setMMDate(GetMMDate(newVal));
	}

	const handleSubmit = async () => {
		const data = {};
		data.order_id = formData.order_id;
		data.name = formData.name;
		data.description = formData.description;

		// Input date string in "DD/MM/YYYY" format
		const inputDate = dateRef.current.value;
		// Parse the input date string into a Date object
		const parsedDate = parse(inputDate, 'dd/MM/yyyy', new Date());
		// Format the parsed date as "YYYY-MM-DD" string
		const outputDate = format(parsedDate, 'yyyy-MM-dd');
		// Create a new date string in "YYYY-MM-DD" format
		data.date = outputDate;

		if (isHalfRedeem) {
			data.pay_price = formData.pay_price;
			data.left_price = formData.left_price;
			data.take_gold = formData.take_gold;
			data.left_gold = formData.left_gold;
			data.weight = +rRef.current.value + (pRef.current.value*8) + (kRef.current.value*128);
			if(!data.weight){
				snackNoti({type: "warning", msg: "အလေးချိန် ဖြည့်သွင်းပါ"})
				return;
			}

			const result = await createHalfRedeem(data);
			if(result.ok){
				snackNoti({type: "success", msg: result.msg});
				navigate(`/detail/${id}`);
			}else{
				snackNoti({type: "error", msg: result.err})
			}
		} else {
			data.price = formData.price;

			const result = await createRedeem(data);
			if(result.ok){
				snackNoti({type: "success", msg: result.msg});
				navigate(`/detail/${id}`);
			}else{
				snackNoti({type: "error", msg: result.err})
			}
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
	}, []);

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
							<Typography>ရွေး</Typography>
							<span></span>
						</Box>

						{/* ရွေး */}
						<form onSubmit={(e) => {
							e.preventDefault();

							handleSubmit();
						}}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack direction={"row"} flexWrap={"wrap"}>
										<CustomBadge>{order.acceptor}</CustomBadge>
										<CustomBadge color='warning'>{order.gold}</CustomBadge>
									</Stack>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												onChange={handleChangeCheckBox}
											/>
										}
										label="ခွဲရွေးမည်"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="အမည်"
										size='small'
										defaultValue={order.name}
										name='name'
										fullWidth
										required
										onChange={handleChangeFormData}
									/>
								</Grid>
								{
									isHalfRedeem ? (
										<>
											<Grid item xs={12}>
												<TextField
													label="သွင်းငွေ"
													size='small'
													type='number'
													name='pay_price'
													fullWidth
													required
													onChange={handleChangeFormData}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													label="ကျန်ငွေ"
													size='small'
													type='number'
													name='left_price'
													fullWidth
													required
													onChange={handleChangeFormData}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													label="ရွေး ပစ္စည်း"
													size='small'
													name='take_gold'
													fullWidth
													required
													onChange={handleChangeFormData}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													label="ကျန် ပစ္စည်း"
													size='small'
													name='left_gold'
													fullWidth
													required
													onChange={handleChangeFormData}
												/>
											</Grid>
											<Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
												<TextField
													label="ကျပ်"
													size="small"
													type='number'
													sx={{ maxWidth: "30%" }}
													inputRef={kRef}
												/>
												<TextField
													label="ပဲ"
													size="small"
													type='number'
													sx={{ maxWidth: "30%" }}
													inputRef={pRef}
												/>
												<TextField
													label="ရွေး"
													size="small"
													type='number'
													sx={{ maxWidth: "30%" }}
													inputRef={rRef}
												/>
											</Grid>
										</>
									):(
										<>
											<Grid item xs={12}>
												<TextField
													label="ကျသင့်ငွေ"
													size='small'
													name='price'
													type='number'
													fullWidth
													required
													onChange={handleChangeFormData}
												/>
											</Grid>
										</>
									)
								}
								<Grid item xs={12}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<MobileDatePicker
											label={"နေ့ရက်"}
											defaultValue={dayjs(new Date())}
											format={"DD/MM/YYYY"}
											inputRef={dateRef}
											onAccept={handleChangeDate}
											slotProps={{
												textField: {
													helperText: MMDate,
													size: 'small',
													fullWidth: true,
												}
											}}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12}>
									<TextField
										multiline
										label="မှတ်ချက်"
										name='description'
										rows={4}
										fullWidth
										onChange={handleChangeFormData}
									/>
								</Grid>
								<Grid item xs={12}>
									<LoadingButton variant='contained' sx={{ mr: 1 }} type='submit'>save</LoadingButton>
								</Grid>
							</Grid>
						</form>
					</>
				)
			}
		</>
	)
}
