import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../../store/cart";
import { ReduxState } from "../../types";
import EmptyCart from "../../assets/EmptyCart.png";
import classes from "./Cart.module.css";
import useInputValidate from "../../components/hooks/useInput";

const Cart = () => {
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [cartTax, setCartTax] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(false);
  const cart = useSelector((state: ReduxState) => state.cart.cart);
  const isLogged = useSelector((state: ReduxState) => state.auth.isLogged);
  const uid = useSelector((state: ReduxState) => state.auth.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    isValid: enteredFirstNameIsValid,
    reset: resetFirstNameInput,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    submitHandler: firstNameSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredLastName,
    hasError: lastNameInputHasError,
    isValid: enteredLastNameIsValid,
    reset: resetLastNameInput,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    submitHandler: lastNameSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredCompanyName,
    reset: resetCompanyNameInput,
    valueChangeHandler: companyNameChangeHandler,
    inputBlurHandler: companyNameBlurHandler,
    submitHandler: companyNameSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredAddress,
    hasError: addressInputHasError,
    isValid: enteredAddressIsValid,
    reset: resetAddressInput,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    submitHandler: addressSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredUnit,
    reset: resetUnitInput,
    valueChangeHandler: unitChangeHandler,
    inputBlurHandler: unitBlurHandler,
    submitHandler: unitSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredCity,
    hasError: cityInputHasError,
    isValid: enteredCityIsValid,
    reset: resetCityInput,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    submitHandler: citySubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredProvinceOrState,
    hasError: provinceOrStateInputHasError,
    isValid: enteredProvinceOrStateIsValid,
    reset: resetProvinceOrStateInput,
    valueChangeHandler: provinceOrStateChangeHandler,
    inputBlurHandler: provinceOrStateBlurHandler,
    submitHandler: provinceOrStateSubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredPostalOrZip,
    hasError: postalOrZipInputHasError,
    isValid: enteredPostalOrZipIsValid,
    reset: resetPostalOrZipInput,
    valueChangeHandler: postalOrZipChangeHandler,
    inputBlurHandler: postalOrZipBlurHandler,
    submitHandler: postalOrZipSubmitHandler,
  } = useInputValidate(
    (value) =>
      value.trim() !== "" &&
      value.trim().length <= 7 &&
      value.trim().length >= 5,
  );

  const {
    value: enteredCountry,
    hasError: countryInputHasError,
    isValid: enteredCountryIsValid,
    reset: resetCountryInput,
    valueChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
    submitHandler: countrySubmitHandler,
  } = useInputValidate((value) => {
    return value.trim() !== "";
  });

  const clickHandler = () => {
    setCheckoutInitiated((prev) => !prev);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(cart, cartSubtotal, cartTotal);

    //Set inputs as touched to validate inputs on submit
    emailSubmitHandler();
    firstNameSubmitHandler();
    lastNameSubmitHandler();
    companyNameSubmitHandler();
    postalOrZipSubmitHandler();
    citySubmitHandler();
    provinceOrStateSubmitHandler();
    countrySubmitHandler();
    addressSubmitHandler();
    unitSubmitHandler();

    //If a field is invalid, cancel submission
    if (
      !enteredEmailIsValid ||
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredPostalOrZipIsValid ||
      !enteredCityIsValid ||
      !enteredCountryIsValid ||
      !enteredProvinceOrStateIsValid ||
      !enteredAddressIsValid
    ) {
      return;
    }

    //If valid, continue

    //Loading State for Checkout button
    setProcessingPayment(true);

    let timestamp = new Date().toDateString();
    let deliveryDateSeconds = new Date().getTime() + 1209600000;
    let deliveryDate = new Date(deliveryDateSeconds).toDateString();

    let order = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      companyName: enteredCompanyName || null,
      address: enteredAddress,
      unit: enteredUnit || null,
      city: enteredCity,
      postalOrZip: enteredPostalOrZip,
      provinceOrState: enteredProvinceOrState,
      country: enteredCountry,
      subtotal: cartSubtotal,
      total: cartTotal,
      timestamp: new Date(new Date()).getTime(),
      orderDate: timestamp,
      deliveryDate: new Date(deliveryDate).toDateString(),
      uid,
      items: cart,
    };

    //Save order to firebase db then add orderId property that is the the id tthat firebase autogenerated
    const savedOrder = await db
      .collection("orders")
      .add(order)
      .then(async (docRef) => {
        await docRef.set({ ...order, orderId: docRef.id });
        return (await docRef.get()).data();
      });

    //End loading state
    setProcessingPayment(false);

    //Render payment cobfirmed notification to user
    setPaymentReceived(true);

    //Show notification for 2 seconds before resetting cart and navigating to the order confirmed page
    setTimeout(() => {
      dispatch(cartActions.resetCart());
      setPaymentReceived(false);
      resetFirstNameInput();
      resetLastNameInput();
      resetEmailInput();
      resetCompanyNameInput();
      resetAddressInput();
      resetUnitInput();
      resetPostalOrZipInput();
      resetCityInput();
      resetProvinceOrStateInput();
      resetCountryInput();

      navigate("/order-confirmation", { state: { order: savedOrder } });
    }, 2000);
  };

  //Adjust total whenever cart changes
  useEffect(() => {
    const tax = () => {
      const total: number = subtotal() * 1.13;
      const tax = total - subtotal();
      return tax.toFixed(2);
    };

    const subtotal = (): number => {
      let price = 0;
      cart.forEach((item) => {
        price += +((item.salePrice || item.originalPrice) * +item.quantity);
      });
      return Number(price.toFixed(2));
    };

    setCartSubtotal(subtotal());
    setCartTax(Number(tax()));
    setCartTotal(Number((+subtotal() + +tax()).toFixed(2)));
  }, [cart]);

  //Render error input whenever user types an invalid input (State )
  const firstNameInputClasses = !firstNameInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const lastNameInputClasses = !lastNameInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const emailInputClasses = !emailInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const addressInputClasses = !addressInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const cityInputClasses = !cityInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const provinceOrStateInputClasses = !provinceOrStateInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const postalOrZipInputClasses = !postalOrZipInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const countryInputClasses = !countryInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const notificationTextClasses = !paymentReceived
    ? classes.paymentReceived
    : `${classes.paymentReceived} ${classes.paymentReceivedActive}`;

  return (
    <>
      <div id="vinyls_body">
        <main id="vinyls__main">
          <div className={classes.container}>
            <div className={classes.row}>
              <div className={classes.cartTitle}>
                <h2 className={classes.title}>Cart</h2>
              </div>
              <div>
                <div className={classes.cartHeader}>
                  <div className={classes.cartVinyl}>Vinyl</div>
                  <div className={classes.cartQuantity}>Quantity</div>
                  <div className={classes.cartTotal}>Total</div>
                </div>
                <div>
                  {cart.map((vinyl) => {
                    return (
                      <div className={classes.cartItem} key={vinyl.id}>
                        <div className={classes.cartVinyl}>
                          <img
                            src={vinyl.url}
                            alt={`${vinyl.title} Vinyl Cover`}
                            className={classes.cartVinylImg}
                          />
                          <div className={classes.cartVinylInfo}>
                            <p className={classes.cartVinylTitle}>
                              {vinyl.title}
                            </p>
                            <p className={classes.cartVinylArtist}>
                              {vinyl.artist}
                            </p>
                            <p className={classes.cartVinylPrice}>
                              $
                              {(vinyl.salePrice || vinyl.originalPrice).toFixed(
                                2,
                              )}
                            </p>
                            <button
                              className={classes.cartVinylRemove}
                              onClick={() =>
                                dispatch(cartActions.removeVinyl(vinyl))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className={classes.cartQuantity}>
                          <input
                            type="number"
                            min={1}
                            max={99}
                            className={classes.cartInput}
                            value={vinyl.quantity}
                            onChange={(e) =>
                              dispatch(
                                cartActions.changeQuantity({
                                  id: vinyl.id,
                                  newQuantity: e.target.value,
                                }),
                              )
                            }
                          />
                        </div>
                        <div className={classes.cartTotal}>
                          $
                          {(
                            (vinyl.salePrice || vinyl.originalPrice) *
                            vinyl.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {cart.length === 0 && (
                  <div className={classes.cartEmpty}>
                    <img
                      src={EmptyCart}
                      alt=""
                      className={classes.cartEmptyImg}
                    />
                    <h2>You don't have any items in your cart!</h2>
                    <Link to="/vinyls">
                      <button className={classes.button}>Browse Vinyls</button>
                    </Link>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className={classes.checkout}>
                  {isLogged && checkoutInitiated && (
                    <form
                      className={classes.checkoutForm}
                      onSubmit={submitHandler}
                    >
                      <h3>Contact Information</h3>

                      <div className={classes.formRow}>
                        <div className={emailInputClasses}>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={emailChangeHandler}
                            onBlur={() => {
                              emailBlurHandler();
                            }}
                            value={enteredEmail}
                          />
                          {emailInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a valid email
                            </p>
                          )}
                        </div>
                      </div>

                      <div className={classes.formRow}>
                        <div className={firstNameInputClasses}>
                          <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            placeholder="Enter first name"
                            onChange={firstNameChangeHandler}
                            onBlur={() => {
                              firstNameBlurHandler();
                            }}
                            value={enteredFirstName}
                          />
                          {firstNameInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a first name
                            </p>
                          )}
                        </div>
                        <div className={lastNameInputClasses}>
                          <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            placeholder="Enter last name"
                            onChange={lastNameChangeHandler}
                            onBlur={() => {
                              lastNameBlurHandler();
                            }}
                            value={enteredLastName}
                          />
                          {lastNameInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a last name
                            </p>
                          )}
                        </div>
                      </div>

                      <h3 className={classes.shipping}>Shipping Information</h3>

                      <div className={classes.formRow}>
                        <div>
                          <input
                            type="text"
                            id="company-name"
                            name="company-name"
                            placeholder="Enter company name (optional)"
                            onChange={companyNameChangeHandler}
                            onBlur={() => {
                              companyNameBlurHandler();
                            }}
                            value={enteredCompanyName}
                          />
                        </div>
                      </div>

                      <div className={classes.formRow}>
                        <div className={countryInputClasses}>
                          <select
                            id="country"
                            name="country"
                            onBlur={countryBlurHandler}
                            onChange={countryChangeHandler}
                            value={enteredCountry}
                          >
                            <option value="" disabled>
                              Country
                            </option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">
                              British Indian Ocean Territory
                            </option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos (Keeling) Islands">
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, The Democratic Republic of The">
                              Congo, The Democratic Republic of The
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">
                              Falkland Islands (Malvinas)
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Territories">
                              French Southern Territories
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">
                              Heard Island and Mcdonald Islands
                            </option>
                            <option value="Holy See (Vatican City State)">
                              Holy See (Vatican City State)
                            </option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">
                              Iran, Islamic Republic of
                            </option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">
                              Korea, Democratic People's Republic of
                            </option>
                            <option value="Korea, Republic of">
                              Korea, Republic of
                            </option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">
                              Lao People's Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">
                              Libyan Arab Jamahiriya
                            </option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, The Former Yugoslav Republic of">
                              Macedonia, The Former Yugoslav Republic of
                            </option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">
                              Micronesia, Federated States of
                            </option>
                            <option value="Moldova, Republic of">
                              Moldova, Republic of
                            </option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">
                              Palestinian Territory, Occupied
                            </option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">
                              Russian Federation
                            </option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">
                              Saint Pierre and Miquelon
                            </option>
                            <option value="Saint Vincent and The Grenadines">
                              Saint Vincent and The Grenadines
                            </option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and The South Sandwich Islands">
                              South Georgia and The South Sandwich Islands
                            </option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">
                              Svalbard and Jan Mayen
                            </option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">
                              Syrian Arab Republic
                            </option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">
                              Tanzania, United Republic of
                            </option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">
                              Virgin Islands, British
                            </option>
                            <option value="Virgin Islands, U.S.">
                              Virgin Islands, U.S.
                            </option>
                            <option value="Wallis and Futuna">
                              Wallis and Futuna
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                      </div>

                      <div className={classes.formRow}>
                        <div className={addressInputClasses}>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            onChange={addressChangeHandler}
                            onBlur={() => {
                              addressBlurHandler();
                            }}
                            value={enteredAddress}
                          />
                          {addressInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a valid address
                            </p>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            id="unit"
                            name="unit"
                            placeholder="Enter unit (optional)"
                            onChange={unitChangeHandler}
                            onBlur={() => {
                              unitBlurHandler();
                            }}
                            value={enteredUnit}
                          />
                        </div>
                      </div>

                      <div className={classes.formRow}>
                        <div className={cityInputClasses}>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            onChange={cityChangeHandler}
                            onBlur={() => {
                              cityBlurHandler();
                            }}
                            value={enteredCity}
                          />
                          {cityInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a valid city
                            </p>
                          )}
                        </div>
                        <div className={provinceOrStateInputClasses}>
                          <input
                            type="text"
                            id="province-state"
                            name="province-state"
                            placeholder="Province/state"
                            onChange={provinceOrStateChangeHandler}
                            onBlur={() => {
                              provinceOrStateBlurHandler();
                            }}
                            value={enteredProvinceOrState}
                          />
                          {provinceOrStateInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a province/state
                            </p>
                          )}
                        </div>

                        <div className={postalOrZipInputClasses}>
                          <input
                            type="text"
                            id="postal-zip"
                            name="postal-zip"
                            placeholder="Postal/ZIP"
                            onChange={postalOrZipChangeHandler}
                            onBlur={() => {
                              postalOrZipBlurHandler();
                            }}
                            value={enteredPostalOrZip}
                          />
                          {postalOrZipInputHasError && (
                            <p className={classes.errorText}>
                              Please enter a valid Postal/ZIP Code
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={classes.checkoutButtonWrapper}>
                        <button>
                          {processingPayment ? (
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className={classes.spinner}
                            />
                          ) : (
                            `Confirm Checkout`
                          )}
                        </button>
                        <p className={notificationTextClasses}>
                          $$$ Payment Received! :)
                        </p>
                      </div>
                    </form>
                  )}

                  <div className={classes.checkoutTotal}>
                    <div className={classes.subTotal}>
                      <span>Subtotal:</span>
                      <span>${cartSubtotal}</span>
                    </div>
                    <div className={classes.totalTax}>
                      <span>Tax: (13%)</span>
                      <span>${cartTax}</span>
                    </div>
                    <div className={classes.totalPrice}>
                      <span>Total:</span>
                      <span>${cartTotal}</span>
                    </div>
                    <button
                      className={
                        isLogged
                          ? classes.checkoutButton
                          : classes.checkoutButtonBlocked
                      }
                      onClick={clickHandler}
                    >
                      {isLogged
                        ? `Proceed to checkout`
                        : `Plese Login to checkout`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
