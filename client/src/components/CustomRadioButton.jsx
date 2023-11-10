import React from 'react';

const CustomRadioButton = ({ value, checked, onChange }) => {
	return (
		<div>
		<input
			type="radio"
			name="radio-group"
			value={value}
			checked={checked}
			onChange={onChange}
		/>
		<label htmlFor={value}>{value}</label>
		</div>
	);
};

export default CustomRadioButton;
