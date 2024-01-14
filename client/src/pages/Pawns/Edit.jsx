import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, LinearProgress, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import GetMMDate from '../../helper/GetMMDate';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { createPawn, getAllAcceptors, getAllAlbums, getAllvillages, getPawnById, updatePawn } from '../../apiCalls';
import { AppContext } from '../../AppContextProvider';
import { format, parse } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, lighten, darken } from '@mui/system';
import { green, grey, orange } from '@mui/material/colors';
import CustomBadge from '../../components/CustomBudge';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import NumChangeEngToMM from '../../helper/NumChangeEngToMM';

export default function Edit() {
	const { id } = useParams()
	const { snackNoti } = useContext(AppContext);

	const [order_id, setOrder_id] = useState(null);
	const [villages, setVillages] = useState([]);
	const [acceptors, setAcceptors] = useState([]);
	const [saveType, setSaveType] = useState("save");
	const [formData, setFormData] = useState({name: "", village: null, phone: "", gold: "", weight: 0, price: 0, date: "", acceptor_id: 1, description: ""})
	const [error, setError] = useState({name: 0, village_id: 0, gold: 0, weight: 0, price: 0, date: 0})
	const [MMdate, setMMDate] = useState(GetMMDate(new Date()));
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);
	const [isFetchingData, setIsFetchingData] = useState(true);
	const [isOpenVerifyDialog, setIsOpenVerifyDialog] = useState(false);

	const kRef = useRef("");	//ကျပ်
	const pRef = useRef(null);	//ပဲ
	const rRef = useRef("");	//ရွေး
	const dateRef = useRef("");	//date

	const navigate = useNavigate();

	const villageOptions = villages.map((option) => {
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
		// console.log(newVal)
		if(!newVal) {
			setFormData(prev => ({...prev, village: null}))
			return;
		};
		setFormData(prev => ({...prev, village: newVal}))
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

	const handleVerify = () => {
		setIsOpenVerifyDialog(true);
	}

	const handleSubmit = async () => {
		const data = {...formData};
		data.village_id = data.village.id;
		delete data.village;
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

		setIsLoadingBtn(true);

		const res = await updatePawn(order_id, data);
		if(res.ok){
			snackNoti({type: "success", msg: res.msg});
			localStorage.setItem("acceptor_id", data.acceptor_id);

			navigate(`/detail/${res.id}`, {replace: true});
		} else {
			if(res.err === "validation"){
				Object.keys(res.validation).map((i) => setError(prev => ({...prev, [i]: 1})));
			}

			snackNoti({type: "error", msg: res.err})
		}

		setIsLoadingBtn(false);

	}

	useEffect(() => {
		const fetchData = async () => {
			// fetch acceptors
			const acceptorResults = await getAllAcceptors();
			if(!acceptorResults.ok) return;
			setAcceptors(acceptorResults);

			// fetch village
			const villageResults = await getAllvillages();
			if(!villageResults.ok) return;
			setVillages(villageResults);

			// fetch pawn
			const pawnResult = await getPawnById(id);
			setOrder_id(pawnResult.id);
			const villageOption = villageResults.filter(i => i.id===pawnResult.village_id).map((option) => {
				const firstLetter = option.name[0].toUpperCase();
				return {
					firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
					...option,
				};
			});
			// console.log(pawnResult);
			if(!pawnResult.ok) return;
			setFormData((prev) => ({
				...prev,
				name: pawnResult.name,
				village: villageOption[0],
				date: pawnResult.date,
				phone: pawnResult.phone,
				gold: pawnResult.gold,
				weight: pawnResult.weight,
				price: pawnResult.price,
				acceptor_id: pawnResult.acceptor_id,
				description: pawnResult.description
			}))
			setMMDate(GetMMDate(new Date(pawnResult.date)))

			setIsFetchingData(false);
		}

		fetchData();
		setFormData(prev => ({...prev, acceptor_id: +localStorage.getItem("acceptor_id") || 1}))
	}, [])

	return (
		<>
			<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
				<IconButton onClick={() => history.back()}>
					<ArrowBackRoundedIcon />
				</IconButton>
				<Typography>ပြင်ဆင်(အပေါင်ထား)</Typography>
				<span></span>
			</Box>

			{
				isFetchingData ? (
					<>
						<LinearProgress />
					</>
				):(
					<form onSubmit={(e) => {
						e.preventDefault();

						handleVerify();
						}}>

						<Grid container spacing={2} pb={4}>
							<Grid item xs={12}>
								<TextField
									label="ပေါင်သူ အမည်"
									size="small"
									name='name'
									fullWidth
									required
									value={formData.name}
									onChange={handleChangeFormData}
									// error={Boolean(error.name)}
									helperText={error.name ? "required" : ""}
								/>
							</Grid>
							<Grid item xs={12}>
								<Autocomplete
									options={villageOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
									groupBy={(option) => option.firstLetter}
									getOptionLabel={(option) => option.name}
									fullWidth
									value={formData.village}
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
									value={formData.phone}
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
									value={formData.gold}
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
									defaultValue={Math.floor(formData.weight/128)}
									inputRef={kRef}
									// error={Boolean(error.weight)}
									helperText={error.weight ? "required" : ""}
								/>
								<TextField
									label="ပဲ"
									size="small"
									type='number'
									defaultValue={Math.floor( (formData.weight%128)/8 )}
									sx={{ maxWidth: "30%" }}
									inputRef={pRef}
								/>
								<TextField
									label="ရွေး"
									size="small"
									type='number'
									defaultValue={Math.floor( (formData.weight%128)%8 )}
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
									value={formData.price}
									onChange={handleChangeFormData}
									// error={Boolean(error.price)}
									helperText={error.price ? "required" : ""}
								/>
							</Grid>
							<Grid item xs={12}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<MobileDatePicker
										label={"နေ့ရက်"}
										defaultValue={dayjs(new Date(formData.date))}
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
									value={formData.description}
									name='description'
									onChange={handleChangeFormData}
								/>
							</Grid>
							<Grid item xs={12}>
								<LoadingButton loading={isLoadingBtn} variant='contained' type='submit'>save & print</LoadingButton>
							</Grid>
						</Grid>
					</form>
				)
			}

			{/* verify dialog */}
			<Dialog open={isOpenVerifyDialog} maxWidth="xs" fullWidth onClose={() => setIsOpenVerifyDialog(false)}>
				<DialogTitle alignItems={"center"} display={"flex"}>
					<Typography component={"p"} mr={1}>အတည်ပြုပါ</Typography>
					<TaskAltRoundedIcon color="success" />
				</DialogTitle>
				<DialogContent>
					<div>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>{formData.name} (အပေါင်ထား)</Typography>
						<Typography variant='subtitle1'>{formData.village?.name}</Typography>
						<Typography variant='subtitle1'>{formData.phone}</Typography>
						<Typography variant='subtitle1'>{formData.gold}</Typography>
 						<Typography variant='subtitle1' color={orange[500]}>{kRef.current?.value > 0 && NumChangeEngToMM(kRef.current.value)+"ကျပ် "} {pRef.current?.value > 0 && NumChangeEngToMM(pRef.current.value)+"ပဲ "} {rRef.current?.value > 0 && NumChangeEngToMM(rRef.current.value)+"ရွေး"}</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(formData.price || 0, true)} ကျပ်တိတိ</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(parse(dateRef.current?.value, "dd/MM/yyyy", new Date()))}</Typography>
						<Typography variant='subtitle1' color={grey[500]}>--{formData.description}--</Typography>
						<CustomBadge>{acceptors.filter(i => i.id===formData.acceptor_id)[0]?.name}</CustomBadge>
					</div>
				</DialogContent>
				<DialogActions>
					<LoadingButton loading={isLoadingBtn} onClick={() => setIsOpenVerifyDialog(false)}>cancle</LoadingButton>
					<LoadingButton variant='contained' loading={isLoadingBtn} onClick={handleSubmit}>သေချာသည်</LoadingButton>
				</DialogActions>
			</Dialog>
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