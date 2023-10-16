import { Box, Button, ButtonGroup, Chip, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { amber, blue, cyan, green, grey, indigo, lightBlue, orange, pink, purple, red, teal } from '@mui/material/colors';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBadge from '../components/CustomBudge';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import GetMMDate from '../helper/GetMMDate';
import NumChangeEngToMM from '../helper/NumChangeEngToMM';
import ReactToPrint from 'react-to-print';
import PrintVoucher from '../components/PrintVoucher';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

export default function HtetYu() {
	const { id } = useParams();

	const printRef = useRef();

	const navigate = useNavigate();

	const handlePrintVoucher = () => {
		// printRef.current.print();
		// window.print();
	}

	return (
		<>
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
					<CustomBadge>စန်းစန်းထွေး</CustomBadge>
					<CustomBadge color='success'>{NumChangeEngToMM(123000, true)} ကျပ်</CustomBadge>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="အမည်"
						size='small'
						fullWidth
						defaultValue={"အောင်အောင်"}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ထပ်တိုးပစ္စည်း"
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label="ကျပ်"
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label="ပဲ"
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label="ရွေး"
						size='small'
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ယူငွေ"
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
						label="မှတ်ချက်"
						multiline
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
