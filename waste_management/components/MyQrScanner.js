
// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import styles from "@/components/Qrscanner.module.css";
import { useEffect } from "react";


function MyQrScanner({ handleScan }) {

    useEffect(() => {

        //initialize html5QrCode
        const html5QrCode = new Html5Qrcode("scanner");


        //hadle success
        const qrCodeSuccessCallback = (decodedText) => {
            console.log("decodedText", decodedText);

            //handle scan function
            handleScan(decodedText);

            //stopping the scanning
            html5QrCode.stop().then((ignore) => {
                // QR Code scanning is stopped.
                console.log("scanning stopped and printing ignore var::", ignore);
            }).catch((err) => {
                console.log("Error stoping scanning : ", err);
            });
        };

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        // If you want to prefer back camera
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

    }, [])




    return (
        <div className={styles.qrCodeScanner}>
            <h2>QR Code Scanner</h2>
            <div id="scanner" className={styles.scannerClass}></div>
        </div>
    );

}

export default MyQrScanner;
