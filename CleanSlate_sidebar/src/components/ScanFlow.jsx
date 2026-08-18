import { useEffect, useState } from "react";
import HeroIntro from "./HeroIntro";
import ScanCard from "./ScanCard";
import ScanSummary from "./ScanSummary";
import scanInbox from "../services/scanInbox";
import CategoryDetails from "./CategoryDetails";

const scanStages = [
    "Preparing your inbox...",
    "Skipping protected senders...",
    "Applying cleanup filters...",
    "Classifying emails...",
    "Building your summary...",
];
function ScanFlow() {
    const [scanStatus, setScanStatus] = useState("idle");
    const [currentView, setCurrentView] = useState("scanner")
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [scanStageIndex, setScanStageIndex] = useState(0);
    const [scanResults, setScanResults] = useState(null);
    const [scanError, setScanError] = useState("");

    async function handleScan() {
        setCurrentView("scanner");
        setSelectedCategoryId(null);
        setScanStageIndex(0);
        setScanResults(null);
        setScanError("");
        setScanStatus("scanning");

        try {
            const nextScanResults = await scanInbox();

            setScanResults(nextScanResults);
            setScanStatus("completed");
        } catch (error) {
            console.error("Could not scan inbox:", error);
            setScanError(
                error instanceof Error
                    ? error.message
                    : "Could not scan the inbox."
            );
            setScanStatus("error");
        }
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
        if (
            scanStatus !== "scanning" ||
            scanStageIndex === scanStages.length - 1
        ) {
            return;
        }

        const scanTimer = setTimeout(() => {
            setScanStageIndex(
                (currentIndex) => currentIndex + 1
            );
        }, 2000);

        return () => clearTimeout(scanTimer);
    }, [scanStatus, scanStageIndex]);

    const selectedCategory = scanResults?.categories.find(
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
                        totalScanned={scanResults?.emailCount ?? 0}
                        totalConversations={scanResults?.conversationCount ?? 0}
                        scanError={scanError}
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
