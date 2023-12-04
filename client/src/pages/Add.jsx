import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import GetMMDate from '../helper/GetMMDate';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { createPawn, getAllAcceptors, getAllvillages } from '../apiCalls';
import { AppContext } from '../AppContextProvider';
import { format, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { styled, lighten, darken } from '@mui/system';

export default function Add() {
	const { snackNoti } = useContext(AppContext);

	const [villages, setVillages] = useState([]);
	const [acceptors, setAcceptors] = useState([]);
	const [formData, setFormData] = useState({name: "", village_id: 0, phone: "", gold: "", weight: 0, price: 0, date: "", acceptor_id: 1, description: ""})
	const [error, setError] = useState({name: 0, village_id: 0, gold: 0, weight: 0, price: 0, date: 0})
	const [MMdate, setMMDate] = useState(GetMMDate(new Date()));

	const kRef = useRef();	//ကျပ်
	const pRef = useRef();	//ပဲ
	const rRef = useRef();	//ရွေး
	const dateRef = useRef();	//date

	const navigate = useNavigate();

	const options = villages.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});

	const handleChangeAcceptor = (id) => {
		setFormData(prev => ({...prev, acceptor_id: id}));
	}
	const handleChangeVillage = (event, newVal) => {
		if(!newVal) {
			setFormData(prev => ({...prev, village_id: 0}))
			return;
		};
		setFormData(prev => ({...prev, village_id: newVal.id}))
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

	const handelChangeDate = (newVal) => {
		setMMDate(GetMMDate(newVal.$d));
	}

	const handleSubmit = async () => {
		const data = formData;
		data.weight = +rRef.current.value + (pRef.current.value*8) + (kRef.current.value*128);
		data.redeem = 0;

		// Input date string in "DD/MM/YYYY" format
		const inputDate = dateRef.current.value;
		// Parse the input date string into a Date object
		const parsedDate = parse(inputDate, 'dd/MM/yyyy', new Date());
		// Format the parsed date as "YYYY-MM-DD" string
		const outputDate = format(parsedDate, 'yyyy-MM-dd');
		// Create a new date string in "YYYY-MM-DD" format
		data.date = outputDate;

		if(!data.name || !data.village_id || !data.gold || !data.weight || !data.price){
			snackNoti({type: "warning", msg: "အချက်အလက်များမပြည့်စုံပါ"})
			return;
		}

		const res = await createPawn(data);
		if(res.ok){
			snackNoti({type: "success", msg: res.msg});
			localStorage.setItem("acceptor_id", data.acceptor_id);
			navigate("/");
		} else {
			if(res.err === "validation"){
				Object.keys(res.validation).map((i) => setError(prev => ({...prev, [i]: 1})));
			}

			snackNoti({type: "error", msg: res.err})
		}

	}

	useEffect(() => {
		const fetchAcceptors = async () => {
			const result = await getAllAcceptors();
			if(!result.ok) return;
			setAcceptors(result);
		}
		const fetchVillages = async () => {
			const result = await getAllvillages();
			if(!result.ok) return;
			setVillages(result);
		}

		fetchAcceptors();
		fetchVillages();
		setFormData(prev => ({...prev, acceptor_id: +localStorage.getItem("acceptor_id") || 1}))
	}, [])

	return (
		<>
			<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
				<IconButton onClick={() => history.back()}>
					<ArrowBackRoundedIcon />
				</IconButton>
				<Typography>အပေါင်ခံ</Typography>
				<span></span>
			</Box>

			<form onSubmit={(e) => {
				e.preventDefault();

				handleSubmit();
			}}>

				<Grid container spacing={2} pb={4}>
					<Grid item xs={12}>
						<TextField
							label="ပေါင်သူ အမည်"
							size="small"
							name='name'
							fullWidth
							required
							onChange={handleChangeFormData}
							// error={Boolean(error.name)}
							helperText={error.name ? "required" : ""}
						/>
					</Grid>
					<Grid item xs={12}>
						<Autocomplete
							id="grouped-demo"
							options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
							groupBy={(option) => option.firstLetter}
							getOptionLabel={(option) => option.name}
							fullWidth
							size='small'
							// error={Boolean(error.village_id)}
							renderInput={(params) => <TextField {...params} helperText={error.village_id ? "required" : ""} label="နေရပ်" />}
							name="village"
							isOptionEqualToValue={(option, value) => option.id === value.id}
							onChange={handleChangeVillage}
							renderGroup={(params) => (
								<li key={params.key}>
									<GroupHeader>{params.group}</GroupHeader>
									<GroupItems>{params.children}</GroupItems>
								</li>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="ဖုန်းနံပါတ်"
							size="small"
							type='number'
							name='phone'
							fullWidth
							onChange={handleChangeFormData}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="အပေါင် ပစ္စည်း"
							required
							size="small"
							name='gold'
							fullWidth
							onChange={handleChangeFormData}
							// error={Boolean(error.gold)}
							helperText={error.gold ? "required" : ""}
						/>
					</Grid>
					<Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
						<TextField
							label="ကျပ်"
							size="small"
							type='number'
							sx={{ maxWidth: "30%" }}
							inputRef={kRef}
							// error={Boolean(error.weight)}
							helperText={error.weight ? "required" : ""}
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
					<Grid item xs={12}>
						<TextField
							label="ယူငွေ"
							required
							type='number'
							size="small"
							name='price'
							fullWidth
							onChange={handleChangeFormData}
							// error={Boolean(error.price)}
							helperText={error.price ? "required" : ""}
						/>
					</Grid>
					<Grid item xs={12}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<MobileDatePicker
								label={"နေ့ရက်"}
								defaultValue={dayjs(new Date())}
								format={"DD/MM/YYYY"}
								inputRef={dateRef}
								onAccept={handelChangeDate}
								slotProps={{
									textField: {
										helperText: MMdate,
										size: 'small',
										fullWidth: true,
									}
								}}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
						{acceptors.map((a) => {
							return (
								<Button
									key={a.id}
									variant={formData.acceptor_id===a.id ? "contained": "outlined"}
									size='small'
									color={formData.acceptor_id===a.id ? "warning": "info"}
									onClick={() => handleChangeAcceptor(a.id)}>
									{a.short_name}
								</Button>
							)
						})}
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="မှတ်ချက်"
							multiline
							rows={4}
							fullWidth
							name='description'
							onChange={handleChangeFormData}
						/>
					</Grid>
					<Grid item xs={12}>
						<LoadingButton variant='outlined' sx={{ mr:2 }} type='submit'>save</LoadingButton>
						<LoadingButton variant='contained'>save & print</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</>
	)
}

const GroupHeader = styled('div')(({ theme }) => ({
	position: 'sticky',
	top: '-8px',
	padding: '4px 10px',
	color: theme.palette.primary.main,
	backgroundColor:
	  theme.palette.mode === 'light'
		? lighten(theme.palette.primary.light, 0.85)
		: darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
	padding: 0,
});