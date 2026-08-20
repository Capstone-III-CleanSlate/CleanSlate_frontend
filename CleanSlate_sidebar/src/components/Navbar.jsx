

function Navbar({ isAuthenticated, onProtectedSenders }) {
    return (
        <nav className="navbar" aria-label="CleanSlate navigation">
            <span className="navbar-brand">CleanSlate</span>

            {isAuthenticated && (
                <button type="button" className="nav-btn" onClick={onProtectedSenders}>
                    Protected Senders
                </button>
            )}
        </nav>
    );
}

export default Navbar;
