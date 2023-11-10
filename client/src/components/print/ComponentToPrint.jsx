import React, { forwardRef } from 'react'
import "./style.css"

const MyComponent = () => {
	const elements = [];

	for (let i = 0; i < 100; i++) {
	  elements.push(<h5 key={i}>Hello</h5>);
	}

	return <div>{elements}</div>;
};

const ComponentToPrint = forwardRef((props, ref) => {
	return (
		<div ref={ref}>
			<div style={{ color: "red" }}>
				<h3>Print Text Example</h3>
			</div>
			<MyComponent />
		</div>
	)
})

export default ComponentToPrint;