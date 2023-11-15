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

	const divs = [];

	// Using a loop to create 20 div elements
	for (let i = 1; i <= 100; i++) {
		divs.push(<div key={i} style={{ color: "red" }}>Div {i}</div>);
	}

	return (
		<div ref={ref}>
			{divs}
		</div>
	)
})

const styles = {
	main: {
		margin: 0,
		padding: 0,
		fontSize: "12px",
		backgroundColor: "#fff",
		color: "#181818",
		fontWeight: "lighter",
	}
}

export default ComponentToPrint;