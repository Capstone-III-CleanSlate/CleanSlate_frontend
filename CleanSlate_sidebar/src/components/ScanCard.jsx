function ScanCard({ scanStatus, onScan }) {
  return (
    <section
      className={`scan-card ${
        scanStatus === "scanning" ? "scan-card--scanning" : ""
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
        <div role="status" aria-live="polite">
          <p>Scanning emails...</p>
        </div>
      )}

      {scanStatus === "completed" && (
        <div role="status">
          <p className="scan-complete">Scan complete</p>
          <p>25 emails scanned</p>

          <button type="button" className="summary-btn">
            Show scan summary
          </button>
        </div>
      )}
    </section>
  );
}

export default ScanCard;