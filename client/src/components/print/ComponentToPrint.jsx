import React, { forwardRef } from 'react'
import "./style.css"
import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import FormatCode from '../../helper/FormetCode';
import CalculateWeight from '../../helper/CalculateWeight';
import GetMMDate from '../../helper/GetMMDate';
import CustomBadge from '../CustomBudge';
import NumChangeEngToMM from '../../helper/NumChangeEngToMM';
import { red } from '@mui/material/colors';

const ComponentToPrint = forwardRef((props, ref) => {
	const { order, histories } = props;

	return (
		<div ref={ref} style={styles.main}>
			<div style={{ textAlign: "center" }}>
				<Typography variant='subtitle1' sx={{ fontWeight: "600" }}>သျှီ အပေါင်ဆိုင်</Typography>
			</div>

			<Stack>
				<Typography variant='subtitle1'>{order.name}</Typography>
				<Typography variant='body2'>{FormatCode(order.code)}</Typography>
				<Typography variant='body2'>{order.village}</Typography>
				<Typography variant='body2'>{order.phone}</Typography>
				<Typography variant='body2'>{order.gold}</Typography>
				<Typography variant='body2'>{CalculateWeight(order.weight)}</Typography>
				<Typography variant='body2'>{GetMMDate(new Date(order.date))}</Typography>
				<span>
					<CustomBadge>{order.acceptor === 'အိမ်' ? 'h' :
						order.acceptor === 'အေးအေးခိုင်' ? 'kk' :
						order.acceptor === 'စန်စန်းထွေး' ? 'ss' :
						order.acceptor === 'ဥမ္မာဝင်း' ? 'ww' :
						order.acceptor}
					</CustomBadge>
					{
						Boolean(order.redeem) && (
							<CustomBadge color='error'>ရွေးပြီး</CustomBadge>
						)
					}
				</span>
			</Stack>


			<Grid container spacing={3} mb={3}>
				<Grid item xs={12}>
					<Divider sx={{ color: "red" }}>
						<Chip color='primary' label="မှတ်တမ်းများ" />
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
											<Typography variant='subtitle1'>
												{history.name}
												<Typography variant='body' sx={{ fontSize: "1rem" }}>(အပေါင်ထား)</Typography>
											</Typography>
											<Typography variant='body2'>{history.gold}</Typography>
											<Typography variant='body2'>{CalculateWeight(history.weight)}</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
											<Typography variant='body2'>{GetMMDate(new Date(history.date))}</Typography>
											<Typography variant='body2'>--{history.description}--</Typography>
										</Stack>
									</Grid>
								) : null}

								{/* ထပ်ယူ */}
								{history.status === "htet_yu" ? (
									<Grid item xs={12}>
										<Stack>
											<Typography variant='subtitle1'>
												{history.name}
												<Typography variant='body' sx={{ fontSize: "1rem" }}>(ထပ်ယူ)</Typography>
											</Typography>
											<Typography variant='body2'>{history.gold}</Typography>
											<Typography variant='body2'>{CalculateWeight(history.weight)}</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
											<Typography variant='body2'>{GetMMDate(new Date(history.date))}</Typography>
											<Typography variant='body2'>--{history.description}--</Typography>
										</Stack>
									</Grid>
								) : null}

								{/* အတိုးဆပ် */}
								{history.status === "pay_interest" ? (
									<Grid item xs={12}>
										<Stack>
											<Typography variant='subtitle1'>
												{history.name}
												<Typography variant='body' sx={{ fontSize: "1rem" }}>(အတိုးဆပ်)</Typography>
											</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.pay_price, true)} ကျပ်တိတိ (ဆပ်)</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.left_price, true)} ကျပ်တိတိ (ကျန်)</Typography>
											<Typography variant='body2'>{GetMMDate(new Date(history.pay_date))} (ဆပ်)</Typography>
											<Typography variant='body2'>{GetMMDate(new Date(history.change_date))} (ပြောင်း)</Typography>
											<Typography variant='body2'>--{history.description}--</Typography>
										</Stack>
									</Grid>
								) : null}

								{/* ခွဲရွေး */}
								{history.status === "half_redeem" ? (
									<Grid item xs={12}>
										<Stack>
											<Typography variant='subtitle1'>
												{history.name}
												<Typography variant='body' sx={{ fontSize: "1rem" }}>(ခွဲရွေး)</Typography>
											</Typography>
											<Typography variant='body2'>{history.take_gold} (ရွေး)</Typography>
											<Typography variant='body2'>{history.left_gold} (ကျန်)</Typography>
											<Typography variant='body2'>{CalculateWeight(history.weight)}</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.pay_price, true)} ကျပ်တိတိ (သွင်း)</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.left_price, true)} ကျပ်တိတိ (ကျန်)</Typography>
											<Typography variant='body2'>{GetMMDate(new Date(history.date))}</Typography>
											{/* <Typography variant='body2'>{GetMMDate(new Date(history.change_date))} (ပြောင်း)</Typography> */}
											<Typography variant='body2'>--{history.description}--</Typography>
										</Stack>
									</Grid>
								) : null}

								{/* ရွေး */}
								{history.status === "redeem" ? (
									<Grid item xs={12}>
										<Stack>
											<Typography variant='subtitle1'>
												{history.name}
												<Typography variant='body' sx={{ fontSize: "1rem" }}>(ရွေး)</Typography>
											</Typography>
											<Typography variant='body2'>{NumChangeEngToMM(history.price, true)} ကျပ်တိတိ</Typography>
											<Typography variant='body2'>{GetMMDate(new Date(history.date))}</Typography>
											<Typography variant='body2'>--{history.description}--</Typography>
										</Stack>
									</Grid>
								) : null}
							</React.Fragment>
						)
					})
				}
			</Grid>
		</div>
	)
})

const styles = {
	main: {
		fontSize: "12px",
		backgroundColor: "#fff",
		color: "#181818",
		fontWeight: "lighter"
	}
}

export default ComponentToPrint;