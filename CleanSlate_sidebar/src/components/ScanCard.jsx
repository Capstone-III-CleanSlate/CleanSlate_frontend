import "../styles/ScanCard.css";

function ScanCard({
  scanStatus,
  scanStages,
  scanStageIndex,
  totalScanned,
  totalConversations,
  scanError,
  onScan,
  onShowSummary
}) {
  return (
    <section
      className={`scan-card ${scanStatus === "scanning" ? "scan-card--scanning" : ""
        }`}
    >
      {scanStatus === "idle" && (
        <button
          type="button"
          className="scan-btn"
          onClick={onScan}
        >
          Scan my inbox
        </button>
      )}

      {scanStatus === "scanning" && (
        <div
          className="scan-stage"
          role="status"
          aria-live="polite"
        >
          {scanStages.map((stage, index) => (
            <p
              key={stage}
              className={`scan-stage-message ${index === scanStageIndex
                ? "scan-stage-message--active"
                : ""
                }`}
              aria-hidden={index !== scanStageIndex}
            >
              {stage}
            </p>
          ))}
        </div>
      )}
      {scanStatus === "error" && (
        <div role="alert">
          <p className="scan-error">
            {scanError || "Could not scan the inbox."}
          </p>
          <button
            type="button"
            className="scan-btn"
            onClick={onScan}
          >
            Try again
          </button>
        </div>
      )}
      {scanStatus === "completed" && (
        <div role="status">
          <p className="scan-complete">Scan complete</p>
          <p>
            {totalScanned} emails scanned across{" "}
            {totalConversations}{" "}
            {totalConversations === 1
              ? "conversation"
              : "conversations"}
          </p>
          <button
            type="button"
            className="summary-btn"
            onClick={onShowSummary}
          >
            Show scan summary
          </button>
        </div>
      )}
    </section>
  );
}

export default ScanCard;
