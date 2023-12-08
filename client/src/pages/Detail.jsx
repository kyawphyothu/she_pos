import { Box, Button, ButtonGroup, Chip, Divider, Grid, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { amber, blue, cyan, green, grey, indigo, lightBlue, orange, pink, purple, red, teal } from '@mui/material/colors';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBadge from '../components/CustomBudge';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import GetMMDate from '../helper/GetMMDate';
import NumChangeEngToMM from '../helper/NumChangeEngToMM';
import ComponentToPrint from '../components/print/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { getHistoryByOrderId, getOrderById } from '../apiCalls';
import CalculateWeight from '../helper/CalculateWeight';
import FormatCode from '../helper/FormetCode';

export default function Detail() {
	const { id } = useParams();

	const [q, setQ] = useState("");
	const [order, setOrder] = useState({});
	const [histories, setHistories] = useState([]);
	const [isFetching, setIsFetching] = useState(true);

	const printRef = useRef();

	const navigate = useNavigate();

	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

	const handleClickBckBtn = () => {
		if(q===null || q==="null"){
			navigate(`/search`);
		}else{
			navigate(`/search?q=${q}`)
		}
	}

	useEffect(() => {
		const fetchOrder = async () => {
			const result = await getOrderById(id);
			if(result.ok){
				setOrder(result)
			}
			setIsFetching(false)
		}
		const fetchHIstory = async () => {
			const result = await getHistoryByOrderId(id);
			if(result.ok){
				setHistories(result)
			}
		}

		fetchOrder();
		fetchHIstory();
		setQ(localStorage.getItem("q") || "");
	}, [])

	return (
		<>
			{
				isFetching ? (
					<>
						<LinearProgress />
					</>
				):(
					<>
						<Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
							<IconButton onClick={handleClickBckBtn}>
								<ArrowBackRoundedIcon />
							</IconButton>
							<IconButton sx={{ color: orange[400] }} onClick={handlePrint}>
								<PrintRoundedIcon  />
							</IconButton>
							<div style={{ display: "none" }}>
								<ComponentToPrint ref={printRef} order={order} histories={histories} />
							</div>
							{/* <div ref={printRef}>hello</div> */}
						</Box>

						<Box className="floatingCard" sx={{ borderRadius: "0.1rem", mb: 2 }}>
							<Stack>
								<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>{order.name}</Typography>
								<Typography variant='subtitle1' color={teal[500]}>{FormatCode(order.code)}</Typography>
								<Typography variant='subtitle1'>{order.village}</Typography>
								<Typography variant='subtitle1'>{order.phone}</Typography>
								<Typography variant='subtitle1'>{order.gold}</Typography>
								<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(order.weight)}</Typography>
								<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(order.date))}</Typography>
								<span>
									<CustomBadge>{order.acceptor}</CustomBadge>
									{
										Boolean(order.redeem) && (
											<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
										)
									}
								</span>
								{
									!Boolean(order.redeem) && (
										<Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", mt: 1 }}>
											<Button size='small' variant='outlined' onClick={() => navigate(`/htetyu/${order.id}`) }>ထပ်ယူ</Button>
											<Button size='small' variant='outlined' onClick={() => navigate(`/payinterest/${order.id}`) }>အတိုးဆပ်</Button>
											<Button size='small' variant='contained' color='error' onClick={() => navigate(`/reextract/${order.id}`) }>ရွေး</Button>
										</Box>
									)
								}
							</Stack>
						</Box>

						{/* history */}
						<Grid container spacing={3} mb={3}>
							<Grid item xs={12}>
								<Divider>
									<Chip label="မှတ်တမ်းများ" />
								</Divider>
							</Grid>
							{histories.length &&
								histories.map((history) => {
									return (
										<React.Fragment key={history.created_at}>
											{/* ထား */}
											{history.status === "pawn" ? (
												<Grid item xs={12}>
													<Stack>
														<Typography variant='subtitle1' sx={{ fontWeight: "600", fontSize: "1.2rem" }}>{history.name}</Typography>
														<Typography variant='subtitle1'>{history.gold}</Typography>
														<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(history.weight)}</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
														<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.date))}</Typography>
														<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
													</Stack>
												</Grid>
											) : null}

											{/* ထပ်ယူ */}
											{history.status === "htet_yu" ? (
												<Grid item xs={12}>
													<Stack>
														<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
															{history.name}
															<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(ထပ်ယူ)</Typography>
														</Typography>
														<Typography variant='subtitle1'>{history.gold}</Typography>
														<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(history.weight)}</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
														<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.date))}</Typography>
														<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
													</Stack>
												</Grid>
											) : null}

											{/* အတိုးဆပ် */}
											{history.status === "pay_interest" ? (
												<Grid item xs={12}>
													<Stack>
														<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
															{history.name}
															<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(အတိုးဆပ်)</Typography>
														</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.pay_price, true)} ကျပ်တိတိ (ဆပ်)</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.left_price, true)} ကျပ်တိတိ (ကျန်)</Typography>
														<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.pay_date))} (ဆပ်)</Typography>
														<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.change_date))} (ပြောင်း)</Typography>
														<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
													</Stack>
												</Grid>
											) : null}

											{/* ခွဲရွေး */}
											{history.status === "half_redeem" ? (
												<Grid item xs={12}>
													<Stack>
														<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
															{history.name}
															<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(ခွဲရွေး)</Typography>
														</Typography>
														<Typography variant='subtitle1'>{history.take_gold} (ရွေး)</Typography>
														<Typography variant='subtitle1'>{history.left_gold} (ကျန်)</Typography>
														<Typography variant='subtitle1' color={orange[500]}>{CalculateWeight(history.weight)}</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.pay_price, true)} ကျပ်တိတိ (သွင်း)</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.left_price, true)} ကျပ်တိတိ (ကျန်)</Typography>
														<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.date))}</Typography>
														{/* <Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.change_date))} (ပြောင်း)</Typography> */}
														<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
													</Stack>
												</Grid>
											) : null}

											{/* ရွေး */}
											{history.status === "redeem" ? (
												<Grid item xs={12}>
													<Stack>
														<Typography variant='subtitle1' sx={{ display: "flex", alignItems: "center", fontWeight: "600", fontSize: "1.2rem" }}>
															{history.name}
															<Typography variant='body2' sx={{ fontWeight: "400", fontSize: "1rem" }} color={red[500]}>(ရွေး)</Typography>
														</Typography>
														<Typography variant='subtitle1' color={green[500]}>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
														<Typography variant='subtitle1' color={grey[500]}>{GetMMDate(new Date(history.date))}</Typography>
														<Typography variant='subtitle1' color={grey[500]}>--{history.description}--</Typography>
													</Stack>
												</Grid>
											) : null}
										</React.Fragment>
									)
								})
							}
						</Grid>
					</>
				)
			}
		</>
	)
}
