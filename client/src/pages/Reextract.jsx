import { Box, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CustomBadge from '../components/CustomBudge';
import { LoadingButton } from '@mui/lab';

export default function Reextract() {
	return (
		<>
			<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
				<IconButton onClick={() => history.back()}>
					<ArrowBackRoundedIcon />
				</IconButton>
				<Typography>ရွေး</Typography>
				<span></span>
			</Box>

			{/* ရွေး */}
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Stack direction={"row"} flexWrap={"wrap"}>
						<CustomBadge>စန်းစန်းထွေး</CustomBadge>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="အမည်"
						size='small'
						defaultValue={"အောင်အောင်"}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ကျသင့်ငွေ"
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker
							label="နေ့ရက်"
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
