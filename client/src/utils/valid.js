const valid = (data) => {
  const { username, email, fullname, password, cf_password } = data;
  const err = {};
  if (!username) {
    err.username = "Please add your username.";
  } else if (username.toLowerCase().replace(/ /g, "").length > 25) {
    err.username = "Username is up to 25 characters.";
  }

  if (!email) {
    err.email = "Please add your email.";
  } else if (!validateEmail(email)) {
    err.email = "Email is invalid.";
  }

  if (!fullname) {
    err.fullname = "Please add your fullname.";
  } else if (fullname.length > 25) {
    err.fullname = "Fullname is up to 25 characters.";
  }

  if (!password) {
    err.password = "Please add your password.";
  } else if (password.length < 6) {
    err.password = "Password must be at least 6 characters.";
  }
  if (cf_password !== password) {
    err.cf_password = "Confirm password does not match.";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default valid;
