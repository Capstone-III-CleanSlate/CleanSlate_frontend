import { useState } from "react";
import Pagination from "./Pagination";
import EmailListItem from "./EmailListItem";
import "../styles/CategoryDetails.css";
import getCategoryColor from "../utils/getCategoryColor";


const conversationsPerPage = 20;



function CategoryDetails({
    category,
    conversations,
    onBack,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedConversationIds, setSelectedConversationIds] = useState(new Set());

    if (!category) {
        return null;
    }

    const totalPages = Math.ceil(
        conversations.length / conversationsPerPage
    );

    const firstConversationIndex =
        (currentPage - 1) * conversationsPerPage;

    const lastConversationIndex =
        firstConversationIndex + conversationsPerPage;

    const visibleConversations = conversations.slice(
        firstConversationIndex,
        lastConversationIndex
    );

    const firstDisplayedConversation =
        conversations.length === 0
            ? 0
            : firstConversationIndex + 1;

    const lastDisplayedConversation = Math.min(
        lastConversationIndex,
        conversations.length
    );


    function handleToggleConversation(conversationId) {
        setSelectedConversationIds((currentIds) => {
            const updatedIds = new Set(currentIds);

            if (updatedIds.has(conversationId)) {
                updatedIds.delete(conversationId);
            } else {
                updatedIds.add(conversationId);
            }

            return updatedIds;
        });
    }
    const allConversationsSelected =
        conversations.length > 0 &&
        conversations.every((conversation) =>
            selectedConversationIds.has(conversation.id)
        );

    function handleSelectAll() {
        if (allConversationsSelected) {
            setSelectedConversationIds(new Set());
        } else {
            setSelectedConversationIds(
                new Set(
                    conversations.map(
                        (conversation) => conversation.id
                    )
                )
            );
        }
    }
    function handleAcceptSelected() {
        const selectedIds = Array.from(selectedConversationIds);

        console.log("Accept selected conversations:", selectedIds);
        setSelectedConversationIds(new Set());
    }

    function handleTrashSelected() {
        const selectedIds = Array.from(selectedConversationIds);

        console.log("Trash selected conversations:", selectedIds);
        setSelectedConversationIds(new Set());
    }


    return (
        <section
            className={`category-details category-theme category-theme--${category.id}`}
            style={{
                "--category-color": getCategoryColor(category.label),
            }}
            aria-labelledby="category-details-title"
        >
            <div className="category-details__actions">

                <button
                    type="button"
                    className="back-btn"
                    onClick={onBack}
                >
                    Back to summary
                </button>

                <div className="selected-actions">
                    <button
                        type="button"
                        className="accept-selected-btn"
                        disabled={selectedConversationIds.size === 0}
                        onClick={handleAcceptSelected}
                    >
                        Accept
                    </button>

                    <button
                        type="button"
                        className="trash-selected-btn"
                        disabled={selectedConversationIds.size === 0}
                        onClick={handleTrashSelected}
                    >
                        Trash
                    </button>
                </div>
            </div>

            <header className="category-details__header">
                <h2 id="category-details-title">
                    {category.label}
                </h2>

                <strong>
                    Showing {firstDisplayedConversation}-
                    {lastDisplayedConversation} of{" "}
                    {conversations.length}{" "}
                    {conversations.length === 1
                        ? "conversation"
                        : "conversations"}
                </strong>

                <p className="category-details__email-total">
                    {category.emailCount}{" "}
                    {category.emailCount === 1 ? "email" : "emails"}
                    {" "}in this category
                </p>
            </header>


            <div className="selection-toolbar">
                <label>
                    <input
                        type="checkbox"
                        checked={allConversationsSelected}
                        onChange={handleSelectAll}
                    />
                    Select all conversations
                </label>

                <span>
                    {selectedConversationIds.size}{" "}
                    {selectedConversationIds.size === 1
                        ? "conversation"
                        : "conversations"}{" "}
                    selected
                </span>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <ul className="email-list">
                {visibleConversations.map((conversation) => (
                    <EmailListItem
                        key={conversation.id}
                        conversation={conversation}
                        isSelected={selectedConversationIds.has(
                            conversation.id
                        )}
                        onToggleSelected={handleToggleConversation}
                    />
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </section>
    );
}

export default CategoryDetails;
