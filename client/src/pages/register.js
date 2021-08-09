import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);
  const initUserData = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initUserData);
  const { username, email, fullname, password, cf_password } = userData;
  const [typePass, setTypePass] = useState(false);
  const [cfTypePass, setCfTypePass] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  useEffect(() => {
    if (auth.token) {
      console.log(auth.token);
      history.push("/");
    }
  }, [auth.token, history]);

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h4 className="text-uppercase text-center mb-4">Social - Network</h4>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            className={`form-control ${alert.username ? "is-invalid" : ""}`}
            id="username"
            name="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            value={username}
            onChange={handleChangeInput}
          />
          <small className="invalid-feedback">{alert.username}</small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={`form-control ${alert.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={handleChangeInput}
          />
          <small className="invalid-feedback">{alert.email}</small>
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full name</label>
          <input
            type="text"
            className={`form-control ${alert.fullname ? "is-invalid" : ""}`}
            id="fullname"
            name="fullname"
            aria-describedby="fullnameHelp"
            placeholder="Enter fullname"
            value={fullname}
            onChange={handleChangeInput}
          />
          <small className="invalid-feedback">{alert.fullname}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="pass position-relative">
            <input
              type={typePass ? "text" : "password"}
              className={`form-control ${alert.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChangeInput}
            />
            <small
              className="hide-pass form-text position-absolute"
              onClick={() => setTypePass(!typePass)}
            >
              {typePass ? "Hide" : "Show"}
            </small>
            <small className="invalid-feedback">{alert.password}</small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>
          <div className="pass position-relative">
            <input
              type={cfTypePass ? "text" : "password"}
              className={`form-control ${
                alert.cf_password ? "is-invalid" : ""
              }`}
              id="cf_password"
              name="cf_password"
              placeholder="Confirm password"
              value={cf_password}
              onChange={handleChangeInput}
            />
            <small
              className="hide-pass form-text position-absolute"
              onClick={() => setCfTypePass(!cfTypePass)}
            >
              {cfTypePass ? "Hide" : "Show"}
            </small>
            <small className="invalid-feedback">{alert.cf_password}</small>
          </div>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="gender d-flex justify-content-between">
            <label htmlFor="gender_male">
              Male
              <input
                type="radio"
                name="gender"
                id="gender_male"
                className="m-2"
                value="male"
                defaultChecked
                onChange={handleChangeInput}
              />
            </label>
            <label htmlFor="gender_female">
              Female
              <input
                type="radio"
                name="gender"
                id="gender_female"
                className="m-2"
                value="female"
                onChange={handleChangeInput}
              />
            </label>
            <label htmlFor="gender_other">
              Other
              <input
                type="radio"
                name="gender"
                id="gender_other"
                className="m-2"
                value="other"
                onChange={handleChangeInput}
              />
            </label>
          </div>
        </div>

        <p className="my-2">
          Already an user account? <Link to="/">Login Now</Link>
        </p>
        <button type="submit" className="btn btn-dark btn-block">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
