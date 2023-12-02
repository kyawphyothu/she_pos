import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Modal } from '@mui/material';
import "./style.css"

const BarcodeScanner = ({ onDetected }) => {

	useEffect(() => {
		Quagga.init(
		{
			inputStream: {
				name: 'Live',
				type: 'LiveStream',
				target: document.querySelector('#barcode-scanner'),
			},
			decoder: {
				readers: ['code_128_reader'],
			//   readers: ['ean_reader'],
			},
		},
		(err) => {
			if (err) {
				console.error('Error initializing Quagga:', err);
				return;
			}
			Quagga.start();
		}
		);

		Quagga.onDetected((result) => {
			onDetected(result.codeResult.code);
			Quagga.stop();
		});

		return () => {
			Quagga.stop();
		};
	}, [onDetected]);

	return (
		<div id="barcode-scanner" style={{ width: "100%" }} />
	);
};

export default BarcodeScanner;
