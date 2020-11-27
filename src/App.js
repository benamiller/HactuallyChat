import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { auth } from './features/firebase';
import { selectUser, login, logout } from "./features/userSlice";
import HactuallyChat from "./HactuallyChat";
import Login from "./Login";


function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // logged in
        dispatch(login({
          uid: authUser.photoURL,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        // logged out
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">
      {user ? (
        <HactuallyChat />
      ): (
        <Login />
      )}
      
    </div>
  );
}

export default App;
