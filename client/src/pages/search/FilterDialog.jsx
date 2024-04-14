import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import CustomDialog from '../../components/CustomDialog';

export default function FilterDialog(params) {
	const { openFilterDialog, handleCloseFilterDialog, VillageOptions, handleApplyFilter } = params;

	const [searchParams, setSearchParams] = useSearchParams({})

	const [filter, setFilter] = useState({village: VillageOptions.filter(v => v.id === +searchParams.get("village"))[0] || null, amountFrom: +searchParams.get("amount_from") || null, amountTo: +searchParams.get("amount_to") || null})
	console.log(filter.village)

	const filterDialogActionBtns = () => {
		return (
			<>
				<Button variant='outlined' onClick={handleCloseFilterDialog}>cancle</Button>
				<Button
					variant='contained'
					onClick={() => {
						handleApplyFilter({...filter, village: filter.village || VillageOptions.filter(v => v.id === +searchParams.get("village"))[0] || null});
					}}>
					apply
				</Button>
			</>
		);
	}

	const handleChangeVillage = (e, newVal) => {
		if(!newVal){
			setFilter((prev) => ({...prev, village: null}));
			return;
		}
		setFilter((prev) => ({...prev, village: newVal}));
	}
	const handleChange = (e) => {
		setFilter(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	return (
		<>
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
							// value={VillageOptions.filter(v => v.id === +searchParams.get("village"))[0]}
							value={filter.village}
							onChange={handleChangeVillage}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							fullWidth
							size='small'
							name="village"
							renderInput={(params) => <TextField {...params} label="နေရပ်" />}
						/>
					</Grid>
					{/* <Grid item xs={6}>
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
					</Grid> */}
					<Grid item xs={6}>
						<TextField
							label="ယူငွေ - မှ"
							size='small'
							name='amountFrom'
							type='number'
							value={filter.amountFrom}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="ယူငွေ - ထိ"
							size='small'
							name='amountTo'
							type='number'
							value={filter.amountTo}
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			</CustomDialog>
		</>
	)
}
