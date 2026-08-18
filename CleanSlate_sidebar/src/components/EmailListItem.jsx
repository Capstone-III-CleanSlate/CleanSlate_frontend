function formatEmailDate(receivedAt) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(new Date(receivedAt));
}

function EmailListItem({
    conversation,
    isSelected,
    onToggleSelected,
    onTrash,
}) {
    return (
        <li className="email-list__item">
            <div className="email-list__row">
                <input
                    type="checkbox"
                    className="email-select-checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelected(conversation.id)}
                    aria-label={`Select ${conversation.subject || "conversation"}`}
                />

                <details
                    className="email-details"
                    name="email-preview"
                >
                    <summary className="email-details__summary">
                        <span className="email-list__heading">
                            <strong>{conversation.senderName}</strong>

                            <time dateTime={conversation.receivedAt}>
                                {formatEmailDate(conversation.receivedAt)}
                            </time>
                        </span>

                        <span className="email-list__subject">
                            {conversation.subject || "(No subject)"}
                        </span>

                        <span className="conversation-message-count">
                            {conversation.messageCount}{" "}
                            {conversation.messageCount === 1
                                ? "message"
                                : "messages"}
                        </span>
                    </summary>
                    <p className="email-list__snippet">
                        {conversation.snippet || "No message preview available."}
                    </p>
                </details>

                <button
                    type="button"
                    className="email-trash-btn"
                    aria-label={`Move ${conversation.subject || "conversation"} to trash`}
                    title="Move to trash"
                    onClick={() => onTrash?.(conversation.id)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M4 7h16" />
                        <path d="M9 7V4h6v3" />
                        <path d="M6.5 7 8 20h8l1.5-13" />
                        <path d="M10 11v5M14 11v5" />
                    </svg>
                </button>
            </div>
        </li>
    )
}
export default EmailListItem;
