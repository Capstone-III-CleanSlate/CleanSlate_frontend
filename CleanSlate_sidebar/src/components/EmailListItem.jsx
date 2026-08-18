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

            </div>
        </li>
    )
}
export default EmailListItem;
