import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import classes from "./AuthModal.module.css";
import useInputValidate from "../../../hooks/useInput";
import { login, signup } from "./authHelpers";
import { reduxLogin } from "../../../../store/auth";

interface Props {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  title: string;
  message: string;
  openSuccessModal: () => void;
}

const ModalOverlay = (props: Props): JSX.Element => {
  const [error, setError] = useState(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSignUp, setIsSignUp } = props;
  const dispatch = useDispatch();

  //First and Last name
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    submitHandler: nameSubmitHandler,
  } = useInputValidate((value) => {
    let current = value.split(" ");
    if ((!current.includes("") && current.length < 2) && nameTouched) {
      return false;
    } else {
      if (value.trim() !== value) {
        return false
      }
      return true;
    }
  });

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    submitHandler: emailSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "" && value.includes("@") && value.includes(".");
  });

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    reset: resetPasswordInput,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    submitHandler: passwordSubmitHandler,
  } = useInputValidate((value) => value.trim().length >= 6);

  const {
    value: enteredPasswordConfirm,
    hasError: passwordConfirmInputHasError,
    isValid: enteredPasswordConfirmIsValid,
    reset: resetPasswordConfirmInput,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    submitHandler: passwordConfirmSubmitHandler,
  } = useInputValidate(
    (value) => value.trim().length >= 5 && value === enteredPassword,
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //If Signup Form is enabled
    if (isSignUp) {
      // Sets all input fields to touched on submission so an error comes up if it is invalid
      nameSubmitHandler();
      emailSubmitHandler();
      passwordSubmitHandler();
      passwordConfirmSubmitHandler();

      //If a field is invalid, cancel submission
      if (
        !enteredNameIsValid ||
        !enteredEmailIsValid ||
        !enteredPasswordIsValid ||
        !enteredPasswordConfirmIsValid
      ) {
        return;
      }

      //Else if Login form is enabled
    } else {
      //Login only requires email and password
      emailSubmitHandler();
      passwordSubmitHandler();

      //If a field is invalid, cancel submission
      if (!enteredEmailIsValid || !enteredPasswordIsValid) {
        return;
      }
    }

    //If everything passes validation and works, attempt to submit

    if (isSignUp) {
      //If signup form, attempt to signup

      const response = await signup(
        enteredName,
        enteredEmail,
        enteredPassword,
        setError,
        resetEmailInput,
        setLoading,
        reduxLogin,
        dispatch,
      );

      const success = response?.status === 200;

      //If successfull reset form inputs and render a success message to user
      if (success) {
        resetNameInput();
        resetEmailInput();
        resetPasswordInput();
        resetPasswordConfirmInput();

        props.openSuccessModal();
        props.closeModal();

        //Signed Up!
      }
    } else {
      //else If Login form instead of signup form, attempt to Login

      const response = await login(
        enteredEmail,
        enteredPassword,
        setError,
        emailSubmitHandler,
        passwordSubmitHandler,
        dispatch,
        reduxLogin,
        setLoading,
      );

      const success = response?.status === 200;

      //If successfull reset form inputs
      if (success) {
        resetNameInput();
        resetEmailInput();
        resetPasswordInput();
        resetPasswordConfirmInput();

        props.openSuccessModal();
        props.closeModal();

        //Logged In!
      }
    }
  };

  //Toggle form between Signup and Login
  const toggleOption = () => {
    setIsSignUp((prev) => !prev);
  };

  // Change classes of input field if error has been set by custom hook
  const nameInputClasses = !nameInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const emailInputClasses = !emailInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const passwordInputClasses = !passwordInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const passwordConfirmInputClasses = !passwordConfirmInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  // Reset overall form error when email is changed (for invalid credentials on login)
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [enteredEmail, enteredPassword, enteredName]);

  return (
    <div className={`${classes.modal} ${classes.card}`}>
      <header className={classes.header}>
        <h2 className={classes.title}>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <div className={classes.exit} onClick={props.closeModal}>
          <FontAwesomeIcon icon={faTimes} className={classes.exitIcon} />
        </div>
      </header>

      <div className={classes.content}>
        <div className={classes.row}>
          <form className={classes.form} onSubmit={submitHandler}>
            {isSignUp && (
              <div className={nameInputClasses}>
                <input
                  type="full-name"
                  id="full-name"
                  name="full-name"
                  placeholder="Enter first and last name"
                  onChange={nameChangeHandler}
                  onBlur={() => {
                    setNameTouched(true);
                    nameBlurHandler();
                  }}
                  value={enteredName}
                />
                {nameInputHasError && (
                  <p className={classes.errorText}>
                    Please enter a first and last name (1 space between)
                  </p>
                )}
              </div>
            )}
            <div className={emailInputClasses}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
              />
              {emailInputHasError && (
                <p className={classes.errorText}>
                  Please enter a valid Email Address
                </p>
              )}
            </div>
            <div className={passwordInputClasses}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
              />
              {passwordInputHasError && (
                <p className={classes.errorText}>
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
            {isSignUp && (
              <div className={passwordConfirmInputClasses}>
                <input
                  type="password"
                  id="password-confirmation"
                  name="password-confirmation"
                  placeholder="Confirm your Password"
                  onChange={passwordConfirmChangeHandler}
                  onBlur={passwordConfirmBlurHandler}
                  value={enteredPasswordConfirm}
                />
                {passwordConfirmInputHasError && (
                  <p className={classes.errorText}>
                    Passwords must be valid and match
                  </p>
                )}
              </div>
            )}

            {loading ? (
              <button className={classes.loadingButton}>
                <FontAwesomeIcon icon={faSpinner} className={classes.spinner} />
              </button>
            ) : (
              <button className={classes.button}>
                {isSignUp ? `Sign Up` : `Log In`}
              </button>
            )}
            {error && <p className={classes.formError}>{error}</p>}
          </form>
        </div>
        <div className={classes.option}>
          <p>{isSignUp ? `Not signing up?` : `Not logging in?`} </p>
          <div className={classes.toggle} onClick={toggleOption}>
            {isSignUp ? `Log In` : `Sign Up`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;
