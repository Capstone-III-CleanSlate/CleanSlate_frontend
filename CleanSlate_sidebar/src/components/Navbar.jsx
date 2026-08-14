

function Navbar({ isAuthenticated }) {
    return (
        <nav className="navbar" aria-label="CleanSlate navigation">
            <span className="navbar-brand">CleanSlate</span>

            {isAuthenticated && (
                <button type="button" className="nav-btn">
                    Protected Senders
                </button>
            )}
        </nav>
    );
}

export default Navbar;