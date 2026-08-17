import { useState } from "react";
import Pagination from "./Pagination";
import EmailListItem from "./EmailListItem";
import "../styles/CategoryDetails.css";


const emailsPerPage = 20;



function CategoryDetails({
    category,
    emails,
    onBack,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmailIds, setSelectedEmailIds] = useState(new Set());

    if (!category) {
        return null;
    }

    const totalPages = Math.ceil(emails.length / emailsPerPage);

    const firstEmailIndex =
        (currentPage - 1) * emailsPerPage;

    const lastEmailIndex =
        firstEmailIndex + emailsPerPage;

    const visibleEmails = emails.slice(
        firstEmailIndex,
        lastEmailIndex
    );

    const firstDisplayedEmail =
        emails.length === 0 ? 0 : firstEmailIndex + 1;

    const lastDisplayedEmail = Math.min(lastEmailIndex, emails.length);


    function handleToggleEmail(emailId) {
        setSelectedEmailIds((currentIds) => {
            const updatedIds = new Set(currentIds);

            if (updatedIds.has(emailId)) {
                updatedIds.delete(emailId);
            } else {
                updatedIds.add(emailId);
            }

            return updatedIds;
        });
    }
    const allEmailsSelected =
        emails.length > 0 &&
        emails.every((email) => selectedEmailIds.has(email.id));

    function handleSelectAll() {
        if (allEmailsSelected) {
            setSelectedEmailIds(new Set());
        } else {
            setSelectedEmailIds(
                new Set(emails.map((email) => email.id))
            );
        }
    }
    function handleAcceptSelected() {
        const selectedIds = Array.from(selectedEmailIds);

        console.log("Accept selected emails:", selectedIds);
        setSelectedEmailIds(new Set());
    }

    function handleTrashSelected() {
        const selectedIds = Array.from(selectedEmailIds);

        console.log("Trash selected emails:", selectedIds);
        setSelectedEmailIds(new Set());
    }


    return (
        <section
            className={`category-details category-theme category-theme--${category.id}`}
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
                        disabled={selectedEmailIds.size === 0}
                        onClick={handleAcceptSelected}
                    >
                        Accept
                    </button>

                    <button
                        type="button"
                        className="trash-selected-btn"
                        disabled={selectedEmailIds.size === 0}
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
                    Showing {firstDisplayedEmail}-{lastDisplayedEmail} of{" "}
                    {emails.length} emails
                </strong>
            </header>


            <div className="selection-toolbar">
                <label>
                    <input
                        type="checkbox"
                        checked={allEmailsSelected}
                        onChange={handleSelectAll}
                    />
                    Select all
                </label>

                <span>{selectedEmailIds.size} selected</span>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <ul className="email-list">
                {visibleEmails.map((email) => (
                    <EmailListItem
                        key={email.id}
                        email={email}
                        isSelected={selectedEmailIds.has(email.id)}
                        onToggleSelected={handleToggleEmail}
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
