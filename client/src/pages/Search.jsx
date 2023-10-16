import { Autocomplete, Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GetMMDate from '../helper/GetMMDate';
import NumChangeEngToMM from '../helper/NumChangeEngToMM';
import { green, grey } from '@mui/material/colors';
import CustomBadge from '../components/CustomBudge';
import CustomDialog from '../components/CustomDialog';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function Search() {
	const [openFilterDialog, setOpenFilterDialog] = useState(false);
	const [villages, setVillages] = useState([{id: 1, name: "စလေ"}, {id: 2, name: "မြို့မ"}, {id: 2, name: "ကျော်ဖြိုးသူ"}]);

	const navigate = useNavigate();

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

	return (
		<>
			<Stack direction={"row"} spacing={1} sx={{ display: "flex", mb: 1 }}>
				<TextField
					label="အမည် (သို့) code"
					size='small'
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
			<Button variant='contained' fullWidth>search</Button>

			{/* search result */}
			<Grid container spacing={3} mt={2}>
				<Grid item xs={12}>
					<Stack
						sx={{ cursor: "pointer" }}
						onClick={() => navigate("/detail/1")}>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem", textDecoration: "underline" }}>အောင်အောင်မင်း</Typography>
						<Typography variant='subtitle1'>မင်းဂံရွာ</Typography>
						<Typography variant='subtitle1'>နားကပ် ဆွဲကြိုးအပြာ နားဆွဲ</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())}</Typography>
						<span>
							<CustomBadge>စန်းစန်းထွေး</CustomBadge>
							<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
						</span>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Stack
						sx={{ cursor: "pointer" }}
						onClick={() => console.log("helo")}>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem", textDecoration: "underline" }}>အောင်အောင်မင်း</Typography>
						<Typography variant='subtitle1'>မင်းဂံရွာ</Typography>
						<Typography variant='subtitle1'>နားကပ် ဆွဲကြိုးအပြာ နားဆွဲ</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())}</Typography>
						<span>
							<CustomBadge>စန်းစန်းထွေး</CustomBadge>
							<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
						</span>
					</Stack>
				</Grid>
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
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<MobileDatePicker
								label="မှ"
								defaultValue={dayjs(new Date())}
								helper
								slotProps={{
									textField: {
										size: 'small',
										fullWidth: true,
										helperText: "text"
									}
								}}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={6}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<MobileDatePicker
								label="ထိ"
								defaultValue={dayjs(new Date())}
								helper
								slotProps={{
									textField: {
										size: 'small',
										fullWidth: true,
										helperText: "text"
									}
								}}
							/>
						</LocalizationProvider>
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
