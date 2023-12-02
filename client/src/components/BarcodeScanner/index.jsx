import React, { useEffect } from 'react';
import Quagga from 'quagga';

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
	  console.log(result.codeResult.code)
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div id="barcode-scanner" />;
};

export default BarcodeScanner;
