import { useEffect, useState } from "react";
import HeroIntro from "./HeroIntro";
import ScanCard from "./ScanCard";
import ScanSummary from "./ScanSummary";
import mockScanResults from "../data/mockScanResults";


function ScanFlow() {
    const [scanStatus, setScanStatus] = useState("idle");
    const [currentView, setCurrentView] = useState("scanner")


    function handleScan() {
        setCurrentView("scanner");
        setScanStatus("scanning");
    }
    function handleShowSummary() {
        setCurrentView("summary");
    }
    function handleBackToScanner() {
        setCurrentView("scanner");
    }
    //Temp until category details are added
    function handleReviewCategory(categoryId) {
        console.log("Review category:", categoryId);
    }
    function handleAcceptCategory(categoryId) {
        console.log("Accept category:", categoryId);
    }
    function handleTrashCategory(categoryId) {
        console.log("Trash category:", categoryId);
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
            {currentView === "scanner" && (
                <HeroIntro scanStatus={scanStatus} />
            )}
            {currentView === "summary" ? (
                <ScanSummary
                    summary={mockScanResults}
                    onBack={handleBackToScanner}
                    onAcceptCategory={handleAcceptCategory}
                    onReviewCategory={handleReviewCategory}
                    onTrashCategory={handleTrashCategory}
                />
            ) : (
                <ScanCard
                    scanStatus={scanStatus}
                    onScan={handleScan}
                    onShowSummary={handleShowSummary}
                />
            )}
        </>
    );
}

export default ScanFlow;
