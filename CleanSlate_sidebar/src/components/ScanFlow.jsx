import { useEffect, useState } from "react";
import HeroIntro from "./HeroIntro";
import ScanCard from "./ScanCard";
import ScanSummary from "./ScanSummary";
import mockScanResults from "../data/mockScanResults";
import CategoryDetails from "./CategoryDetails";
import { getMockEmailsByCategory } from "../data/mockClassifiedEmails";


function ScanFlow() {
    const [scanStatus, setScanStatus] = useState("idle");
    const [currentView, setCurrentView] = useState("scanner")
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
    function handleReviewCategory(categoryId) {
        setSelectedCategoryId(categoryId);
        setCurrentView("details");
    }
    function handleBackToSummary() {
        setCurrentView("summary");
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

    const selectedCategory = mockScanResults.categories.find(
        (category) => category.id === selectedCategoryId
    );

    const selectedEmails =
        getMockEmailsByCategory(selectedCategoryId)

    return (
        <>
            {currentView === "scanner" && (
                <>
                    <HeroIntro scanStatus={scanStatus} />

                    <ScanCard
                        scanStatus={scanStatus}
                        onScan={handleScan}
                        onShowSummary={handleShowSummary}
                    />
                </>
            )}

            {currentView === "summary" && (
                <ScanSummary
                    summary={mockScanResults}
                    onBack={handleBackToScanner}
                    onAcceptCategory={handleAcceptCategory}
                    onReviewCategory={handleReviewCategory}
                    onTrashCategory={handleTrashCategory}
                />
            )}

            {currentView === "details" && (
                <CategoryDetails
                    category={selectedCategory}
                    emails={selectedEmails}
                    onBack={handleBackToSummary}
                />
            )}
        </>
    );
}

export default ScanFlow;
