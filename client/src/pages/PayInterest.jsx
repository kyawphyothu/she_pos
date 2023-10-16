import { Box, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CustomBadge from '../components/CustomBudge';
import { LoadingButton } from '@mui/lab';

export default function PayInterest() {
	return (
		<>
			<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
				<IconButton onClick={() => history.back()}>
					<ArrowBackRoundedIcon />
				</IconButton>
				<Typography>အတိုးဆပ်</Typography>
				<span></span>
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<CustomBadge>စန်းစန်းထွေး</CustomBadge>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="အမည်"
						size="small"
						fullWidth
						defaultValue={"မောင်မောင်"}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ဆပ်ငွေ"
						size="small"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ကျန်ငွေ"
						size="small"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker
							label="ဆပ် နေ့ရက်"
							defaultValue={dayjs(new Date())}
							helper
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
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker
							label="ပြောင်း နေ့ရက်"
							// defaultValue={dayjs(new Date())}
							helper
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
						multiline
						label="မှတ်ချက်"
						rows={4}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<LoadingButton variant='outlined' sx={{ mr: 1 }}>save</LoadingButton>
					<LoadingButton variant='contained'>save & print</LoadingButton>
				</Grid>
			</Grid>
		</>
	)
}
