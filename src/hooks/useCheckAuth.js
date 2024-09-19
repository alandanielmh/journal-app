import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logOut, starLoadingNotes  } from "../store";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logOut());
      const { photoURL, email, displayName, uid } = user;
      dispatch(login({ photoURL, email, displayName, uid }));
      dispatch(starLoadingNotes())
    });
  }, []);

  return {
    status,
  };
};
