import React, { useEffect } from 'react';
import {
        BrowserRouter as Router,
        Routes,
        Route
      } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import SignIn from './SignIn';
import ViewInterestedProperties from './ViewInterestedProperties'
import AboutUS from './AboutUS';
import AddProperty from './AddProperty';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {

    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
        console.log("THE USER IS >>> ", authUser);

        if (authUser) {
          dispatch({
            type: "SET_USER",
            user: authUser,
          });
        } else {
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      });
    }, []);

  return (
    <Router>
        <div className="app">
            <Routes>
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/viewinterested" element={<><Header /><ViewInterestedProperties /></>} />
                <Route exact path="/aboutus" element={<><Header /><AboutUS /></>} />
                <Route exact path="/addproperty" element={<><Header /><AddProperty /></>} />
                <Route exact path="/" element={<><Header /><Home /></>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
