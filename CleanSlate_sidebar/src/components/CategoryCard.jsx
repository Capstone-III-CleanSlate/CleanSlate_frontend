function CategoryCard({
    category,
    onAccept,
    onReview,
    onTrash,
}) {
    return (
        <article
            className={`category-card category-card--${category.id}`}
        >
            <div className="category-card__heading">
                <span className="category-card__label">
                    {category.label}
                </span>

                <span className="category-card__count">
                    <strong>{category.count}</strong> emails
                </span>
            </div>

            <h3>{category.label}</h3>
            <p>{category.description}</p>

            <div className="category-card__actions">
                <button
                    type="button"
                    className="accept-btn"
                    onClick={() => onAccept(category.id)}
                >
                    Accept
                </button>

                <button
                    type="button"
                    className="review-btn"
                    onClick={() => onReview(category.id)}
                >
                    Review
                </button>

                <button
                    type="button"
                    className="trash-btn"
                    onClick={() => onTrash(category.id)}
                >
                    Trash all
                </button>
            </div>
        </article>
    )
}
export default CategoryCard;
