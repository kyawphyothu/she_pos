import { Autocomplete, Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { unstable_HistoryRouter, useNavigate, useSearchParams } from 'react-router-dom'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GetMMDate from '../helper/GetMMDate';
import NumChangeEngToMM from '../helper/NumChangeEngToMM';
import { green, grey, orange, teal } from '@mui/material/colors';
import CustomBadge from '../components/CustomBudge';
import CustomDialog from '../components/CustomDialog';
import CustomDateInput from '../components/CustomDateInput';
import { getAllvillages, getTodayOrder, searchOrder } from '../apiCalls';
import { LoadingButton } from '@mui/lab';
import CalculateWeight from '../helper/CalculateWeight';

export default function Search() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams()

	const [openFilterDialog, setOpenFilterDialog] = useState(false);
	const [villages, setVillages] = useState([]);
	const [isLoadingBtn, setIsLoadingBtn] = useState(false);
	const [orders, setOrders] = useState([]);
	const [searchText, setSearchText] = useState(searchParams.get("q"));

	const handleCloseFilterDialog = () => {
		setOpenFilterDialog(false);
	};

	const filterDialogActionBtns = () => {
		return (
			<>
				<Button variant='outlined' onClick={handleCloseFilterDialog}>cancle</Button>
				<Button
					variant='contained'
					onClick={() => {
						handleCloseFilterDialog()
					}}>
					apply
				</Button>
			</>
		);
	}

	const VillageOptions = villages.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});

	const handleSearch = async () => {
		const nameOrCode = searchText;
		if(!nameOrCode) return;
		setIsLoadingBtn(true);


		const res = await searchOrder(nameOrCode);
		setIsLoadingBtn(false);
		if(res.ok){
			setOrders(res);
		}
	}

	const handleClickDetail = (id) => {
		localStorage.setItem("q", searchText);
		navigate(`/detail/${id}`);
	}

	useEffect(() => {
		const fetchVillages = async () => {
			const result = await getAllvillages();
			if(!result.ok) return;
			setVillages(result);
		}
		const fetchTodayOrder = async () => {
			if(searchText) return;
			const result = await getTodayOrder();
			setOrders(result)
		}

		fetchVillages();
		handleSearch();
		fetchTodayOrder();
	}, [])

	useEffect(() => {
		handleSearch();
	}, [searchParams])

	return (
		<>
			<Stack direction={"row"} spacing={1} sx={{ display: "flex", mb: 1 }}>
				<TextField
					label="အမည် (သို့) code"
					size='small'
					defaultValue={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					sx={{
						flexGrow: 1,
					}}
				/>
				<Button
					variant='outlined'
					onClick={() => {
						setOpenFilterDialog(true);
					}}>
					<TuneRoundedIcon />
				</Button>
			</Stack>
			<LoadingButton loading={isLoadingBtn} variant='contained' fullWidth onClick={() => setSearchParams({q: searchText})}>search</LoadingButton>

			{/* search result */}
			<Grid container spacing={3} mt={2}>
				{
					orders.length ? (
						orders.map((order) => {
							return (
								<Grid item xs={12}>
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
					):(
						!isLoadingBtn &&
						<Grid item xs={12}>
							<Typography variant='subtitle1' color={grey[500]}>ရလဒ်မရှိပါ</Typography>
						</Grid>
					)
				}
			</Grid>

			{/* filter dialog */}
			<CustomDialog
				open={openFilterDialog}
				handleClose={handleCloseFilterDialog}
				title="စစ်ထုတ်မည်"
				ActionButtons={filterDialogActionBtns}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Autocomplete
							id="grouped-demo"
							options={VillageOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
							groupBy={(option) => option.firstLetter}
							getOptionLabel={(option) => option.name}
							fullWidth
							size='small'
							renderInput={(params) => <TextField {...params} label="နေရပ်" />}
						/>
					</Grid>
					<Grid item xs={6}>
						<CustomDateInput
							label="မှ"
							defaultValue={new Date()}
						/>
					</Grid>
					<Grid item xs={6}>
						<CustomDateInput
							label="ထိ"
							defaultValue={new Date()}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="ယူငွေ - မှ"
							size='small'
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="ယူငွေ - ထိ"
							size='small'
						/>
					</Grid>
				</Grid>
			</CustomDialog>
		</>
	)
}
