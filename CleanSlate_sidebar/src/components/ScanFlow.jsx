import { useEffect, useState } from "react";
import HeroIntro from "./HeroIntro";
import ScanCard from "./ScanCard";
import ScanSummary from "./ScanSummary";
import normalizeScanResponse from "../services/normalizeScanResponse";
import sampleBackendScanResponse from "../data/sampleBackendScanResponse";
import CategoryDetails from "./CategoryDetails";

const scanStages = [
    "Preparing your inbox...",
    "Skipping protected senders...",
    "Applying cleanup filters...",
    "Classifying emails...",
    "Building your summary...",
];
const scanResults = normalizeScanResponse(
    sampleBackendScanResponse
);

function ScanFlow() {
    const [scanStatus, setScanStatus] = useState("idle");
    const [currentView, setCurrentView] = useState("scanner")
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [scanStageIndex, setScanStageIndex] = useState(0);

    function handleScan() {
        setCurrentView("scanner");
        setScanStageIndex(0);
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

        const isLastStage =
            scanStageIndex === scanStages.length - 1;

        const scanTimer = setTimeout(() => {
            if (isLastStage) {
                setScanStatus("completed");
            } else {
                setScanStageIndex(
                    (currentIndex) => currentIndex + 1
                );
            }
        }, 2000);

        return () => clearTimeout(scanTimer);
    }, [scanStatus, scanStageIndex]);

    const selectedCategory = scanResults.categories.find(
        (category) => category.id === selectedCategoryId
    );

    const selectedConversations =
        selectedCategory?.conversations ?? [];

    return (
        <>
            {currentView === "scanner" && (
                <>
                    <HeroIntro scanStatus={scanStatus} />

                    <ScanCard
                        scanStatus={scanStatus}
                        scanStages={scanStages}
                        scanStageIndex={scanStageIndex}
                        totalScanned={scanResults.emailCount}
                        totalConversations={scanResults.conversationCount}
                        onScan={handleScan}
                        onShowSummary={handleShowSummary}
                    />
                </>
            )}

            {currentView === "summary" && (
                <ScanSummary
                    summary={scanResults}
                    onBack={handleBackToScanner}
                    onAcceptCategory={handleAcceptCategory}
                    onReviewCategory={handleReviewCategory}
                    onTrashCategory={handleTrashCategory}
                />
            )}

            {currentView === "details" && (
                <CategoryDetails
                    category={selectedCategory}
                    conversations={selectedConversations}
                    onBack={handleBackToSummary}
                />
            )}
        </>
    );
}

export default ScanFlow;
