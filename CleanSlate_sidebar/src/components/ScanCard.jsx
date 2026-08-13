import { useEffect, useState } from "react";


function ScanCard() {
    const [scanStatus, setScanStatus] = useState("idle")

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
        <section
            className={`scan-card ${scanStatus === "scanning" ? "scan-card--scanning" : ""
                }`}
        >
            {scanStatus === "idle" && (
                <button className="scan-btn" onClick={handleScan}>
                    Scan my inbox
                </button>
            )}

            {scanStatus === "scanning" && (
                <div role="status" aria-live="polite">
                    <p>Scanning emails...</p>
                </div>
            )}
            {scanStatus === "completed" && (
                <div role="status">
                    <p className="scan-complete">Scan complete</p>
                    <p>25 emails scanned</p>

                    <button className="summary-btn">
                        Show scan summary
                    </button>
                </div>
            )}
        </section>
    );
}

export default ScanCard;