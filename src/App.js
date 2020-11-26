import React, { Suspense, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import userApi from "./api/userApi";
//layouts
import LayoutAdmin from "@Containers/layoust/LayoutAdmin";
import LayoutMain from "@Containers/layoust/LayoutMain";

//container view
import HomePage from "@Containers/views/Main/HomePage";
import DoctorPage from "@Containers/views/Main/DoctorPage";
import LoginPage from "@Containers/views/Main/LoginPage";
import SignUpPage from "@Containers/views/Main/SignUpPage";
import EditPassWordPage from "@Containers/views/Main/EditPassWordPage";

//admin
import HomeAdmin from "@Containers/views/Admin/HomeAdmin";

// Containers

//component
import PrivateRoute from "@Components/Main/PrivateRoute";
import AddDoctor from "./components/Main/Doctor/AddDoctor";
import Profile from "./components/Main/Doctor/Profile";
import EditDoctor from "./components/Main/Doctor/EditDoctor";
import EmployeesDoctor from "./components/Main/Doctor/Employees";
import EmployeesNurse from "./components/Main/Nurse/Employees";
import ListAppointment from "./components/Main/Appoinment/ListAppointment";
import Detail from "./components/Main/Appoinment/Detail";
import ConfirmBooking from "./components/Main/ConfirmBooking";




function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/admin/:path?/:path?" exact>
            <LayoutAdmin>
              <Switch>
                {" "}
                <Route path="/admin" exact component={HomeAdmin}></Route>
              </Switch>
            </LayoutAdmin>
          </Route>

          {/* users */}
          <Route exact path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/editPassWord" component={EditPassWordPage} />

          {/* view */}
          <Route>
            <LayoutMain>
              <Switch>
                <PrivateRoute path="/" exact component={HomePage} />
                <PrivateRoute path="/doctor" component={DoctorPage} />
                <PrivateRoute path="/appointment" component={ListAppointment} />
                <PrivateRoute path="/confirmBooking" component={ConfirmBooking} />
                <PrivateRoute path="/detailAppointment/:id" component={Detail} />
                <PrivateRoute path="/addDoctor" component={AddDoctor} />
                <PrivateRoute path="/profileDoctor" component={Profile} />
                <PrivateRoute path="/employessDoctor" component={EmployeesDoctor} />
                <PrivateRoute path="/employessNurse" component={EmployeesNurse} />
                <PrivateRoute path="/updateDoctors/:id" component={EditDoctor} />
              </Switch>
            </LayoutMain>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
