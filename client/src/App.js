import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { refreshToken } from "./redux/actions/authAction";
import PageRender from "./PageRender";
import Home from "./components/Home";
import Alert from "./components/alert/Alert";
import Login from "./pages/login";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Alert />
          <Route exact path="/:page/:id" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/" component={auth.access_token ? Home : Login} />
        </div>
      </div>
    </Router>
  );
}

export default App;
