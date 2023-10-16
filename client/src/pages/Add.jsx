import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import React, { useState } from 'react'
import GetMMDate from '../helper/GetMMDate';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function Add() {
	const [villages, setVillages] = useState([
		{id: 1, name: "စလေ"},
		{id: 2, name: "မြို့မ"},
		{id: 2, name: "မေမြို့"},
		{id: 2, name: "မင်းဘူး"},
		{id: 2, name: "ကျော်ဖြိုးသူ"},
	]);

	const options = villages.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});

	return (
		<>
			<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
				<IconButton onClick={() => history.back()}>
					<ArrowBackRoundedIcon />
				</IconButton>
				<Typography>အပေါင်ခံ</Typography>
				<span></span>
			</Box>

			<Stack spacing={2} direction={"row"} useFlexGap flexWrap="wrap" pb={4}>
				<TextField
					label="ပေါင်သူ အမည်"
					size="small"
					fullWidth
				/>
				<Autocomplete
					id="grouped-demo"
					options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
					groupBy={(option) => option.firstLetter}
					getOptionLabel={(option) => option.name}
					fullWidth
					size='small'
					renderInput={(params) => <TextField {...params} label="နေရပ်" />}
				/>
				<TextField
					label="အပေါင် ပစ္စည်း"
					size="small"
					fullWidth
				/>
				<TextField
					label="ကျပ်"
					size="small"
					sx={{ maxWidth: "30%" }}
				/>
				<TextField
					label="ပဲ"
					size="small"
					sx={{ maxWidth: "30%" }}
				/>
				<TextField
					label="ရွေး"
					size="small"
					sx={{ maxWidth: "30%" }}
				/>
				<TextField
					label="ယူငွေ"
					size="small"
					fullWidth
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<MobileDatePicker
						label="နေ့ရက်"
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
				<input type="radio" name='a' value={1} />
				<input type="radio" name='a' value={2} />
				<TextField
					label="မှတ်ချက်"
					multiline
					rows={4}
					fullWidth
				/>
				<LoadingButton variant='outlined'>save</LoadingButton>
				<LoadingButton variant='contained'>save & print</LoadingButton>
			</Stack>
		</>
	)
}
