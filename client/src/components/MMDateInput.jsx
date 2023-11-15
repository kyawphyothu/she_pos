import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React from 'react'
// import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function MMDateInput() {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<Stack direction="row" spacing={2}>
			<FormControl sx={{ m: 1, minWidth: "30%" }} size="small">
				<InputLabel id="demo-select-small-label">Age</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={age}
					label="Age"
					onChange={handleChange}
				>
					<MenuItem value="">
					<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
			<TextField
				sx={{ maxWidth: "30%" }}
				size='small'
				type='number'
			/>
			<TextField
				sx={{ maxWidth: "30%" }}
				size='small'
				type='number'
			/>
		</Stack>
	)
}
