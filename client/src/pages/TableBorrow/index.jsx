import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

export default function TableBorrow() {
	const [isCreateStage, setIsCreateStage] = useState(false);
	const [formFields, setFormFields] = useState([{ id: 1, name: '', count: 0 }]);
	const [pay, setPay] = useState("no_paid")

	const addFormField = () => {
		const newField = {
		  id: formFields.length + 1,
		  name: '',
		  count: 0,
		};
		setFormFields([...formFields, newField]);
	};
	const removeFormField = (id) => {
		setFormFields(formFields.filter(ff => ff.id!==id));
	};

	const handleNameChange = (id, value) => {
		const updatedFields = formFields.map(field =>
			field.id === id ? { ...field, name: value } : field
		);
		setFormFields(updatedFields);
	};
	const handleCountChange = (id, value) => {
		const updatedFields = formFields.map(field =>
			field.id === id ? { ...field, count: value } : field
		);
		setFormFields(updatedFields);
	};

	const handlePlusCount = (id) => {
		const updatedFields = formFields.map(field =>
			field.id === id ? { ...field, count: +field.count+1 } : field
		);
		setFormFields(updatedFields);
	}
	const handleMinusCount = (id) => {
		const updatedFields = formFields.map(field =>
			field.id === id ? ( +field.count>=1 ? { ...field, count: +field.count-1 } : field ) : field
		);
		setFormFields(updatedFields);
	}

	const handlePayChange = (e) => {
		setPay(e.target.value);
	}

	return (
		<>
			{
				isCreateStage ? (
					<>
						<Grid container spacing={1}>
							<Grid item xs={9}>
								<TextField
									label="ပွဲရံ"
									size='small'
									defaultValue={10}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Button variant='contained' fullWidth>create</Button>
							</Grid>
							<Grid item xs={12} mt={2}>
								<Button variant='contained' color='secondary' fullWidth>+Blank</Button>
							</Grid>
						</Grid>
					</>
				):(
					<>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									label="အမည်"
									size='small'
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<MobileDatePicker
										label={"နေ့ရက်"}
										defaultValue={dayjs(new Date())}
										format={"DD/MM/YYYY"}
										// inputRef={dateRef}
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
									label="ကျသင့်ငွေ"
									size='small'
									type='number'
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
										defaultValue={"no_paid"}
										onChange={handlePayChange}
									>
										<FormControlLabel value="paid" control={<Radio />} label="ရှင်းပြီး" />
										<FormControlLabel value="half_paid" control={<Radio />} label="စရံ" />
										<FormControlLabel value="no_paid" control={<Radio />} label="မရှင်းရသေး" />
									</RadioGroup>
								</FormControl>
							</Grid>
							{
								pay==="half_paid" && (
									<Grid item xs={12}>
										<TextField
											label="စရံပမာဏ"
											type='number'
											size='small'
											fullWidth
										/>
									</Grid>
								)
							}
							{formFields.map(field => (
								<Grid item xs={12} key={field.id} display={"flex"}>
									<Box sx={{ width: "52%" }} display={"flex"} mr={2}>
										<IconButton color='error' onClick={() => removeFormField(field.id)}><RemoveCircleIcon /></IconButton>
										<TextField
											type="text"
											size='small'
											defaultValue={field.name}
											onChange={(e) => handleNameChange(field.id, e.target.value)}
											sx={{ flex:1 }}
										/>
									</Box>
									<Box sx={{ width: "46%" }} display={"flex"}>
										<IconButton color='error' onClick={() => handleMinusCount(field.id)}><IndeterminateCheckBoxIcon /></IconButton>
										<TextField
											type='number'
											size='small'
											// defaultValue={field.count}
											value={field.count}
											onChange={(e) => handleCountChange(field.id, e.target.value)}
											sx={{ flex:1 }}
										/>
										<IconButton color='success' onClick={() => handlePlusCount(field.id)}><AddBoxIcon /></IconButton>
									</Box>
								</Grid>
							))}
							<Grid item xs={12}>
								<Button variant='outlined' fullWidth onClick={addFormField}><AddIcon /></Button>
							</Grid>
							<Grid item xs={12} mt={2}>
								<Button variant='contained' fullWidth><LocalPrintshopIcon /></Button>
							</Grid>
						</Grid>
					</>
				)
			}
		</>
	)
}
