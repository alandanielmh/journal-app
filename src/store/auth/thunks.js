import {
  logInWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/provider";
import { checkingCredentials, logOut, login } from "./";

export const startCheckingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logOut(result));
    dispatch(login( result ));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const {ok, uid, photoURL,errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
    if (!ok) return dispatch( logOut({errorMessage}));
    dispatch(login({ email,displayName,uid, photoURL }));
  };
};

export const startLoginWithEmailPassword = ( { email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const {ok, uid, photoURL, displayName ,errorMessage} = await logInWithEmailAndPassword({ email, password})
    if (!ok) return dispatch( logOut({errorMessage}));
    dispatch(login({ email,displayName,uid, photoURL }));
  }
}

export const startLogout = () => {
  return async (dispatch) => {

    await logoutFirebase()

    dispatch(logOut())

  }
}