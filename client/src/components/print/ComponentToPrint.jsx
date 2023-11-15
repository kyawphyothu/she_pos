import React, { forwardRef } from 'react'
import "./style.css"
import { Stack, Typography } from '@mui/material';
import FormatCode from '../../helper/FormetCode';
import CalculateWeight from '../../helper/CalculateWeight';
import GetMMDate from '../../helper/GetMMDate';

const ComponentToPrint = forwardRef((props, ref) => {
	const { order, histories } = props;

	return (
		<div ref={ref} style={styles.main}>
			<div style={{ color: "red", textAlign: "center" }}>
				<h6>သျှီ အပေါင်ဆိုင်6</h6>
				<h5>သျှီ အပေါင်ဆိုင်5</h5>
				<h4>သျှီ အပေါင်ဆိုင်4</h4>
				<h3>သျှီ အပေါင်ဆိုင်3</h3>
				<h2>သျှီ အပေါင်ဆိုင်2</h2>
				<h1>သျှီ အပေါင်ဆိုင်1</h1>
			</div>

			<Stack>
				<Typography variant='subtitle1'>subtitle1</Typography>
				<Typography variant='subtitle2'>subtitle2</Typography>
				<Typography variant='body1'>body1</Typography>
				<Typography variant='body2'>body2</Typography>
				<Typography variant='caption'>caption</Typography>
				<Typography variant='subtitle1' sx={{ fontWeight: "600" }}>{order.name}</Typography>
				<Typography variant='subtitle1'>{FormatCode(order.code)}</Typography>
				<Typography variant='subtitle1'>{order.village}</Typography>
				<Typography variant='subtitle1'>{order.phone}</Typography>
				<Typography variant='subtitle1'>{order.gold}</Typography>
				<Typography variant='subtitle1'>{CalculateWeight(order.weight)}</Typography>
				<Typography variant='subtitle1'>{GetMMDate(new Date(order.date))}</Typography>
				{/* <span>
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
				} */}
			</Stack>
		</div>
	)
})

const styles = {
	main: {
		fontSize: "12px",
		backgroundColor: "#fff",
		color: "#000",
		fontWeight: "lighter"
	}
}

export default ComponentToPrint;