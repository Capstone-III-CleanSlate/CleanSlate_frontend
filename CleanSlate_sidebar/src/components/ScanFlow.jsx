import { useEffect, useState } from "react";
import HeroIntro from "./HeroIntro";
import ScanCard from "./ScanCard";



function ScanFlow() {
    const [scanStatus, setScanStatus] = useState("idle");

    function handleScan() {
        setScanStatus("scanning");
    }

    useEffect(() => {
        if (scanStatus !== "scanning") {
            return;
        }

        const scanTimer = setTimeout(() => {
            setScanStatus("completed");
        }, 3000);

        return () => clearTimeout(scanTimer);
    }, [scanStatus]);

    return (
        <>
            <HeroIntro scanStatus={scanStatus} />

            <ScanCard
                scanStatus={scanStatus}
                onScan={handleScan}
            />
        </>
    );
}
export default ScanFlow;