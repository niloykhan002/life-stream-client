import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (updateInfo) => {
    return updateProfile(auth.currentUser, updateInfo);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // if (currentUser) {
      //   const user = { email: currentUser.email };

      //   axios
      //     .post("https://study-circle-server-five.vercel.app/jwt", user, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //       setLoading(false);
      //     });
      // } else {
      //   axios
      //     .post(
      //       "https://study-circle-server-five.vercel.app/logout",
      //       {},
      //       { withCredentials: true }
      //     )
      //     .then((res) => {
      //       console.log(res.data);
      //       setLoading(false);
      //     });
      // }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    createUser,
    updateUser,
    signInUser,
    user,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
