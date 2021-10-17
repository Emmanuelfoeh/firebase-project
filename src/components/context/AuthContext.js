import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../Firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // signup logic
  const signIn = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // login logic
  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // logout logic
  const logOut = () => {
    return auth.signOut();
  };

  // forget password logic
  const forgetpassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  // update email
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  // update password
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    logIn,
    logOut,
    forgetpassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
