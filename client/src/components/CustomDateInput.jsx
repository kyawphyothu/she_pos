import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React from 'react'

export default function CustomDateInput(props) {
	const {
		label="",
		defaultValue,
		format="DD/MM/YYYY",
		onChange,
	} = props;

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<MobileDatePicker
				label={label}
				defaultValue={defaultValue && dayjs(defaultValue)}
				helper
				format={format}
				onChange={onChange}
				slotProps={{
					textField: {
						size: 'small',
						fullWidth: true,
					}
				}}
			/>
		</LocalizationProvider>
	)
}
