import { auth } from "../../../../firebase";
import firebase from "firebase/compat/app";

// interface AuthState {
//   isLogged: boolean
//   full_name: string | null
//   uid: string | null
// }

// interface SignupProps {
//   full_name: string
//   email: string
//   password: string
//   setError: React.Dispatch<React.SetStateAction<null>>
//   resetEmailInput: () => void
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>
//   reduxLogin: (login: {full_name: string, uid: string}) => void
//   dispatch: () => void
// }

interface ResultType {
  then: () => Promise<ResultType>;
}

interface UserAuth {
  user?: {
    email: string;
    password: string;
    [key: string]: any;
    _delegate: number | string;
    uid: string;
    displayName: string;
    updateProfile: (updates: { displayName: string }) => Promise<ResultType>;
  };
  displayName?: string;
}


export const signup = async (
  full_name: string,
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<null>>,
  resetEmailInput: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  reduxLogin: (login: { full_name: string; uid: string }) => void,
  dispatch: (login: { full_name?: string; uid?: any } | void) => void,
): Promise<any> => {
  setLoading(true);

  const response = await auth
    .createUserWithEmailAndPassword(email, password)
    .then((userAuth: firebase.auth.UserCredential | UserAuth) => {
      userAuth
        .user!.updateProfile({
          displayName: full_name,
        })
        .then(() => {
          dispatch(
            reduxLogin({
              full_name,
              uid: userAuth.user!.uid,
            }),
          );
          setLoading(false);
          setError(null)
          return { status: 200 };
        });
        return { status: 200 };
    })
    .catch((err) => {
      if (err !== "TypeError: e.preventDefault is not a function") {
        console.log(err);
        console.log(err.message);
        setLoading(false);
        resetEmailInput();
        setError(err.message);
        return { status: 400 };
      }
      return { status: 400 };
    });

  return response;
};

export const login = async (enteredEmail: string, enteredPassword: string, setError: React.Dispatch<React.SetStateAction<null>>, emailSubmitHandler: () => void, passwordSubmitHandler: () => void, dispatch: (login: { full_name?: string; uid?: any } | void) => void, reduxLogin: (login: { full_name: string; uid: string }) => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<any>  => {
  setLoading(true)

  //Login only requires email and password
  emailSubmitHandler();
  passwordSubmitHandler();

  //If valid, continue
  const response = await auth
    .signInWithEmailAndPassword(enteredEmail, enteredPassword)
    .then((userAuth: firebase.auth.UserCredential | UserAuth) => {
      dispatch(
        reduxLogin({
          full_name: userAuth.user!.displayName!,
          uid: userAuth.user!.uid
        }),
      );
      console.log('LOGIN SUCCESSFUL', userAuth.user)
      setLoading(false)
      setError(null)
      return { status: 200 }
    })
    .catch((err) => {
      if (err !== "TypeError: e.preventDefault is not a function") {
        console.log(err);
        setLoading(false)
        setError(err.message)
        return { status: 400 }
      }
      return;
    });

    return response
};