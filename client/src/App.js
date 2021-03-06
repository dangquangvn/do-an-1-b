import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserHome from "./pages/userHome/UserHome";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Landing from "./pages/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect } from "react";
//css
import "./styles/globalStyle.css";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import store from "./store";
import History from "./pages/history";
//route
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import { LoadActivityUserData, loadActivityUserWeek } from "./actions/activity";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTimeTable from "./pages/userTimeTable/UserTimeTable";
import Report from "./pages/report/Report";

const App = () => {
  const { res } = LoadActivityUserData();
  useEffect(() => {
    //
    console.log("run useEffect in app.js");
    // check for token in LS

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    // load data
    store.dispatch(LoadActivityUserData());
    // load user worked in week
    // store.dispatch(loadActivityUserWeek());
  }, [res]);
  return (
    <div class="app">
      <Router>
        {/* <ToastContainer /> */}
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <>
            <div className="container-udm">
              <Alert />
              <ToastContainer />
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/history">
                  <History />
                </Route>
              </Switch>
            </div>
            {/* <div className="container-udm"></div> */}
            <div className="container admin-layout">
              <Switch>
                {/* <Sidebar /> */}

                {/* <Route exact path="/register" component={Register} /> */}
                {/* <Route exact path="/login" component={Login} /> */}
                <AdminRoute exact path="/dashboard">
                  <Sidebar />
                  <Home />
                </AdminRoute>
                <AdminRoute exact path="/report">
                  <Sidebar />
                  <Report />
                </AdminRoute>

                <UserRoute path="/user/:userQuery">
                  <Sidebar />
                  <User />
                </UserRoute>
                {/* <AdminRoute exact path="/user/:userId" component={User} /> */}

                {/* <UserRoute exact path="/dashboard">
                <Sidebar />
                <Home />
              </UserRoute> */}
                <UserRoute exact path="/users">
                  <Sidebar />
                  <UserList />
                </UserRoute>
                <UserRoute exact path="/dashboardUser">
                  <Sidebar />
                  <UserHome />
                </UserRoute>
                <UserRoute exact path="/time-table">
                  <Sidebar />
                  <UserTimeTable />
                </UserRoute>
              </Switch>
            </div>
          </>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
