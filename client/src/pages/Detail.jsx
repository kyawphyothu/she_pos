import { Box, Button, ButtonGroup, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
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

export default function Detail() {
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
				<IconButton sx={{ color: orange[400] }} onClick={handlePrintVoucher}>
					<PrintRoundedIcon  />
				</IconButton>
				{/* <ReactToPrint
					ref={printRef}
					content={() => <PrintVoucher />}
				/> */}
			</Box>

			<Box className="floatingCard" sx={{ borderRadius: "0.1rem", mb: 2 }}>
				<Stack>
					<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>အောင်အောင်မင်း</Typography>
					<Typography variant='subtitle1'>မင်းဂံရွာ</Typography>
					<Typography variant='subtitle1'>နားကပ် ဆွဲကြိုးအပြာ နားဆွဲ</Typography>
					<Typography variant='subtitle1' color={orange[500]}>၁၂ကျပ် ၇ပဲ ၄ရွေး</Typography>
					<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())}</Typography>
					<Typography variant='subtitle1' color={grey[500]}>--မှတ်ချက်များဖြစ်ပါသည်--</Typography>
					<span>
						<CustomBadge>စန်းစန်းထွေး</CustomBadge>
						<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
					</span>
					<Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", mt: 1 }}>
						<Button size='small' variant='outlined' onClick={() => navigate("/htetyu/1") }>ထပ်ယူ</Button>
						<Button size='small' variant='outlined' onClick={() => navigate("/payinterest/1") }>အတိုးဆပ်</Button>
						<Button size='small' variant='contained' color='error' onClick={() => navigate("/reextract/1") }>ရွေး</Button>
					</Box>
				</Stack>
			</Box>

			{/* history */}
			<Grid container spacing={3} mb={3}>
				<Grid item xs={12}>
					<Divider>
						<Chip label="မှတ်တမ်းများ" />
					</Divider>
				</Grid>
				{/* ထား */}
				<Grid item xs={12}>
					<Stack>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>အောင်အောင်မင်း</Typography>
						<Typography variant='subtitle1'>နားကပ် ဆွဲကြိုးအပြာ နားဆွဲ</Typography>
						<Typography variant='subtitle1' color={orange[500]}>၁၂ကျပ် ၇ပဲ ၄ရွေး</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())}</Typography>
						<Typography variant='subtitle1' color={grey[500]}>--မှတ်ချက်များဖြစ်ပါသည်--</Typography>
					</Stack>
				</Grid>
				{/* ထပ်ယူ */}
				<Grid item xs={12}>
					<Stack>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
							အောင်အောင်မင်း
							<Typography variant='body' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(ထပ်ယူ)</Typography>
						</Typography>
						<Typography variant='subtitle1'>နားကပ် နားဆွဲ || -</Typography>
						<Typography variant='subtitle1' color={orange[500]}>၁ပဲ ၄ရွေး || -</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())}</Typography>
						<Typography variant='subtitle1' color={grey[500]}>--မှတ်ချက်များဖြစ်ပါသည်--</Typography>
					</Stack>
				</Grid>
				{/* အတိုးဆပ် */}
				<Grid item xs={12}>
					<Stack>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
							အောင်အောင်မင်း
							<Typography variant='body' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(အတိုးဆပ်)</Typography>
						</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ (ဆပ်)</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ (ကျန်)</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())} (ဆပ်)</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date())} (ပြောင်း)</Typography>
						<Typography variant='subtitle1' color={grey[500]}>--မှတ်ချက်များဖြစ်ပါသည်--</Typography>
					</Stack>
				</Grid>
				{/* ရွေး */}
				<Grid item xs={12}>
					<Stack>
						<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
							အောင်အောင်မင်း
							<Typography variant='body' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(ရွေး)</Typography>
						</Typography>
						<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(123000, true)} ကျပ်တိတိ</Typography>
						<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(2023, 10, 11))}</Typography>
						<Typography variant='subtitle1' color={grey[500]}>--မှတ်ချက်များဖြစ်ပါသည်--</Typography>
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}
