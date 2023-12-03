import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import data from './data';
import PrintTableBorrow from '../../components/PrintTableBorrow';
import { useReactToPrint } from 'react-to-print';

export default function TableBorrow() {
	const currentDate = new Date();
	const initialFormData = {
		name: "",
		date: currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear(),
		price: "",
		paidPrice: ""
	};

	const [isCreateStage, setIsCreateStage] = useState(true);
	const [formFields, setFormFields] = useState([{ id: 1, name: '', count: 0 }]);
	const [pay, setPay] = useState("no_paid") //paid, no_paid, half_paid
	const [formData, setFormData] = useState(initialFormData);

	const tablesRef = useRef();
	const printRef = useRef();

	const handleCreate = (value) => {
		if(value === "blank"){
			setIsCreateStage(false);
		}else{
			let j = 2;
			Object.keys(data).map((i) => {
				addFormField({ id: j, name: i, count: Math.ceil(data[i]*value) });
				j++;
			});

			setIsCreateStage(false);
		}
	}

	const addFormField = ({id=formFields[formFields.length - 1].id + 1 ,name="", count=0}) => {
		const newField = {
			id,
			name,
			count,
		};
		setFormFields((prev) => [...prev, newField]);
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

	// const handlePrint = () => {
	// 	const name = nameRef.current.value;
	// 	const date = dateRef.current.value;
	// 	const price = priceRef.current.value;
	// 	const paidPrice = paidPriceRef.current.value;

	// 	const data = {
	// 		name,
	// 		date,
	// 		price,
	// 		paidPrice,
	// 		pay,
	// 		formFields
	// 	}

	// 	console.log(data)
	// }

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

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
									inputRef={tablesRef}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Button variant='contained' fullWidth onClick={() => handleCreate(+tablesRef.current.value)}>create</Button>
							</Grid>
							<Grid item xs={12} mt={2}>
								<Button variant='outlined' color='secondary' fullWidth onClick={() => handleCreate("blank")}>+Blank</Button>
							</Grid>
						</Grid>
					</>
				):(
					<>
						<div style={{ display: "none" }}>
							<PrintTableBorrow
								ref={printRef}
								formData={formData}
								pay={pay}
								formFields={formFields}
							/>
						</div>

						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									label="အမည်"
									size='small'
									fullWidth
									onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
								/>
							</Grid>
							<Grid item xs={12}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<MobileDatePicker
										label={"နေ့ရက်"}
										defaultValue={dayjs(new Date())}
										format={"DD/MM/YYYY"}
										// inputRef={dateRef}
										onAccept={(nVal) => setFormData((prev) => ({...prev, date: `${nVal.$D}-${nVal.$M + 1}-${nVal.$y}`}))}
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
									onChange={(e) => setFormData((prev) => ({...prev, price: e.target.value}))}
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
							<Grid item xs={12} display={pay!== "half_paid"?"none": ""}>
								<TextField
									label="စရံပမာဏ"
									type='number'
									size='small'
									fullWidth
									onChange={(e) => setFormData((prev) => ({...prev, paidPrice: e.target.value}))}
								/>
							</Grid>
							{
								formFields.map(field => (
									<Grid item xs={12} key={field.id} display={"flex"}>
										<Box sx={{ width: "52%" }} display={"flex"} mr={2}>
											<IconButton color='error' onClick={() => removeFormField(field.id)}><RemoveCircleIcon /></IconButton>
											<TextField
												type="text"
												size='small'
												value={field.name}
												onChange={(e) => handleNameChange(field.id, e.target.value)}
												sx={{ flex:1 }}
											/>
										</Box>
										<Box sx={{ width: "46%" }} display={"flex"}>
											<IconButton color='error' onClick={() => handleMinusCount(field.id)}><IndeterminateCheckBoxIcon /></IconButton>
											<TextField
												type='number'
												size='small'
												value={field.count}
												onChange={(e) => handleCountChange(field.id, e.target.value)}
												sx={{ flex:1 }}
											/>
											<IconButton color='success' onClick={() => handlePlusCount(field.id)}><AddBoxIcon /></IconButton>
										</Box>
									</Grid>
								))
							}
							<Grid item xs={12}>
								<Button variant='outlined' fullWidth onClick={addFormField}><AddIcon /></Button>
							</Grid>
							<Grid item xs={12} mt={2}>
								<Button variant='contained' fullWidth onClick={handlePrint}><LocalPrintshopIcon /></Button>
							</Grid>
						</Grid>
					</>
				)
			}
		</>
	)
}
