import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../../reducers/authSlice";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user was redirected due to expired token
    if (location.state?.expired) {
      setInfo("Your session has expired. Please log in again.");
    }
  }, [location]);

  useEffect(() => {
    if (success) {
      dispatch(clearAuthState());
      alert("Login successful!");
      navigate("/");
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  const errorMessage = error?.error || error?.message || (typeof error === 'string' ? error : null);

  return (
    <Container
      fluid
      className="auth-container d-flex align-items-center justify-content-center"
    >
      <Card className="auth-card shadow-lg border-0 rounded-4 p-4 p-md-5">
        <h2 className="auth-title">Login</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Floating className="mb-4">
            <Form.Control
              id="floatingEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="auth-form-control"
            />
            <label htmlFor="floatingEmail" className="auth-form-label">
              Email
            </label>
          </Form.Floating>

          <Form.Floating className="mb-4">
            <Form.Control
              id="floatingPassword"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
              required
              className="auth-form-control"
            />
            <label htmlFor="floatingPassword" className="auth-form-label">
              Password
            </label>
          </Form.Floating>

          {info && <div className="auth-info">{info}</div>}
          {errorMessage && <div className="auth-error">{errorMessage}</div>}

          <Button
            type="submit"
            variant="primary"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" />
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </>
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
