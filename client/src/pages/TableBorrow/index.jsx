import { Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { tableChairSet, plates } from './data';
import PrintTableBorrow from '../../components/PrintTableBorrow';
import { useReactToPrint } from 'react-to-print';

export default function TableBorrow() {
	const currentDate = new Date();
	const initialFormData = {
		name: "",
		date: currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear(),
		paidPrice: ""
	};

	const [stage, setStage] = useState(1);
	const [formFields, setFormFields] = useState([{ id: 1, name: '', count: 0, rate: 0 }]);
	const [pay, setPay] = useState("no_paid") //paid, no_paid, half_paid, none
	const [formData, setFormData] = useState(initialFormData);

	const tablesRef = useRef();
	const platesRef = useRef();
	const printRef = useRef();

	const handleCreate = (value, VoucherType) => {
		if (value === "blank") {
			setStage(2);
			return;
		}

		const data = VoucherType === "table" ? tableChairSet : VoucherType === "plate" ? plates : [];

		let j = 2;
		data.forEach((i) => {
			const count = typeof i.count === 'number' ? Math.ceil(i.count * value) : i.count;
			addFormField({ id: j, name: i.mmname, count, rate: i.rate });
			j++;
		});

		setStage(2);
	};

	const addFormField = ({id=formFields[formFields.length - 1].id + 1 ,name="", count=0, rate=0}) => {
		const newField = {
			id,
			name,
			count,
			rate,
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
	const handleRateChange = (id, value) => {
		const updatedFields = formFields.map(field =>
			field.id === id ? { ...field, rate: value } : field
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

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

	return (
		<>
			{
				stage===1 ? (
					<>
						<Grid container spacing={1}>
							<Grid item xs={9}>
								<TextField
									label="ကျသင့်ငွေ ဘောင်ချာ"
									size='small'
									defaultValue={10}
									inputRef={tablesRef}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Button variant='contained' fullWidth onClick={() => handleCreate(+tablesRef.current.value, 'table')}>create</Button>
							</Grid>
							<Grid item xs={12}>
								<Divider variant="middle">OR</Divider>
							</Grid>
							<Grid item xs={9}>
								<TextField
									label="ပန်းကန် ပွဲရံ"
									size='small'
									defaultValue={50}
									inputRef={platesRef}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								<Button variant='contained' fullWidth onClick={() => handleCreate(+platesRef.current.value, 'plate')}>create</Button>
							</Grid>
							<Grid item xs={12} mt={2}>
								<Button variant='outlined' color='secondary' fullWidth onClick={() => handleCreate("blank")}>+Blank</Button>
							</Grid>
						</Grid>
					</>
				) : stage===2 ? (
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
										<FormControlLabel value="none" control={<Radio />} label="n" color='success' />
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
										<Box sx={{ width: "55%", alignItems: "flex-start" }} display={"flex"} mr={2}>
											<IconButton color='error' onClick={() => removeFormField(field.id)}><RemoveCircleIcon /></IconButton>
											<TextField
												type="text"
												size='small'
												value={field.name}
												onChange={(e) => handleNameChange(field.id, e.target.value)}
												sx={{ flex:1 }}
											/>
										</Box>
										<Box sx={{ width: "43%" }} display={"flex"}>
											<Stack
												direction="column"
												justifyContent="center"
												alignItems="center"
												spacing={2}
											>
												<div style={{ display: "flex" }}>
													<IconButton color='error' onClick={() => handleMinusCount(field.id)} sx={{ alignItems: "flex-start" }}><IndeterminateCheckBoxIcon /></IconButton>
													<TextField
														type='number'
														size='small'
														value={field.count}
														onChange={(e) => handleCountChange(field.id, e.target.value)}
														sx={{
															flex:1,
														}}
													/>
													<IconButton color='success' onClick={() => handlePlusCount(field.id)} sx={{ alignItems: "flex-start" }}><AddBoxIcon /></IconButton>
												</div>
												<div style={{ display: "flex" }}>
													{/* <IconButton color='error' onClick={() => handleMinusCount(field.id)} sx={{ alignItems: "flex-start" }}><IndeterminateCheckBoxIcon /></IconButton> */}
													<TextField
														type='number'
														size='small'
														variant="standard"
														value={field.rate}
														onChange={(e) => handleRateChange(field.id, e.target.value)}
														sx={{
															flex:1,
														}}
													/>
													{/* <IconButton color='success' onClick={() => handlePlusCount(field.id)} sx={{ alignItems: "flex-start" }}><AddBoxIcon /></IconButton> */}
												</div>
											</Stack>
										</Box>
									</Grid>
								))
							}
							<Grid item xs={12}>
								<Button variant='outlined' fullWidth onClick={addFormField}><AddIcon /></Button>
							</Grid>
							<Grid item xs={12} my={3}>
								<Button variant='contained' fullWidth onClick={handlePrint}><LocalPrintshopIcon /></Button>
							</Grid>
						</Grid>
					</>
				) : (
					<></>
				)
			}
		</>
	)
}
