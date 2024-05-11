import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styles from "@/components/Qrscanner.module.css";

function QRCodeScanner({ handleScan }) {


    useEffect(() => {



        const onScanSuccess = (result) => {
            handleScan(result);
            qrCodeScanner.clear();
        };

        const onScanFailure = (error) => {
            console.warn(`QR code scan error: ${error}`);
        };



        const qrCodeScanner = new Html5QrcodeScanner(
            'scanner', // Element ID for the scanner container
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false // verbose

        );

        qrCodeScanner.render(onScanSuccess, onScanFailure);


        // Cleanup
        return () => {
            qrCodeScanner.clear();
        };

    }, [handleScan]);


    return (
        <div className={styles.qrCodeScanner}>
            <h2>QR Code Scanner</h2>
            <div id="scanner" className={styles.scannerClass}></div>
        </div>
    );
}

export default QRCodeScanner;
