import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/authSlice";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Navbar className="header-navbar shadow-sm">
      <Container fluid className="header-container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h1 className="header-logo" onClick={() => navigate('/home')}>
            ThreadHive
          </h1>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {token ? (
            <>
              <Button
                variant="link"
                className="user-profile-btn"
                onClick={handleProfileClick}
                aria-label={`Open profile for ${user?.name || 'User'}`}
              >
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="user-name">
                  {user?.name || 'User'}
                </span>
              </Button>
              <Button className="btn-header btn-primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="btn-header btn-outline me-2" onClick={handleLogin}>
                Login
              </Button>
              <Button className="btn-header btn-primary" onClick={handleSignup}>
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
