import { Grid, Typography } from '@mui/material';
import React, { forwardRef } from 'react'
import logo from '../../assets/she1.png'
import { grey } from '@mui/material/colors';
import "./style.css"

const PrintTableBorrow = forwardRef((props, ref) => {
	// const { name, date, price, paidPrice, pay, formFields } = props;
	const { formData, pay, formFields } = props;

	return (
		<div ref={ref} style={styles.main}>
			<div style={{ textAlign: "center" }}>
				<img src={logo} style={{ borderRadius: "50%", width: "50px" }} />
				<Typography variant='subtitle1' sx={{ fontWeight: "600" }}>သျှီ မိသားစု</Typography>
			</div>

			<Typography variant='subtitle2'>အမည်: {formData.name}</Typography>
			<Typography variant='subtitle2'>နေ့ရက်: {formData.date}</Typography>
			<Typography variant='subtitle2'>ကျသင့်ငွေ: {formData.price}</Typography>
			<Typography variant='subtitle2' fontWeight={pay === "half_paid" ? 400 : 600}>
				{pay === "half_paid" ? `စရံငွေ: ${formData.paidPrice}` : pay === "paid" ? "ရှင်းပြီး" : "မရှင်းရသေး"}
			</Typography>

			<br/>

			<Grid container>
				<Grid item xs={6}>
					<Typography variant='subtitle1' fontWeight={600}>ပစ္စည်း</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='subtitle1' fontWeight={600} textAlign={"right"}>ဦးရေ</Typography>
				</Grid>
				{
					formFields.filter((i) => i.name !== "").map((i) => {
						return (
							<React.Fragment key={i.id}>
								<Grid item xs={6} className='fill-with-dashes'>
									<Typography variant='subtitle2'>{i.name}</Typography>
									<div className="filler"></div>
								</Grid>
								<Grid item xs={6} className='fill-with-dashes'>
									<div className="filler"></div>
									<Typography variant='subtitle2' textAlign={"right"}>{i.count}</Typography>
								</Grid>
							</React.Fragment>
						)
					})
				}
			</Grid>
		</div>
	)
})

export default PrintTableBorrow;

const styles = {
	main: {
		margin: 0,
		marginTop: "8px",
		marginBottom: "8px",
		padding: 0,
		fontSize: "12px",
		backgroundColor: "#fff",
		color: "#181818",
		fontWeight: "lighter",
	},
}