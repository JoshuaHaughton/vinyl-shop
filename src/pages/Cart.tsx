import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../assets/EmptyCart.png";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";
import { useEffect } from "react";
import ErrorModal from "../components/ui/Modals/GeneralModalsModals/Modal";
import firebase from "firebase/compat/app";
import classes from './Cart.module.css'
import useInputValidate from "../components/hooks/useInput";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// console.log(new Date(new Date()).getTime());
type State = {
  cart: {
    cart: {
      id: number;
      title: string;
      artist: string;
      url: string;
      originalPrice: number;
      salePrice: number;
      rating: number;
      quantity: number;
      genres: string[]
    }[];
    quantity: number;
  };
  auth: {
    isLogged: boolean;
    full_name: string | null;
    uid: string | null;
  }
};

interface ErrorState {
  title: string;
  message: string;
}

const Cart = () => {
  const [error, setError] = useState<ErrorState | null>();
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [cartTax, setCartTax] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart.cart);
  const isLogged = useSelector((state: State) => state.auth.isLogged);
  const  navigate = useNavigate();
  const uid = useSelector((state: State) => state.auth.uid);

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
    hasError: companyNameInputHasError,
    isValid: enteredCompanyNameIsValid,
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
    hasError: unitInputHasError,
    isValid: enteredUnitIsValid,
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
  } = useInputValidate((value) => value.trim() !== '' && value.trim().length <= 7 && value.trim().length >= 5);

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
    // setError({
    //   title: "Not implemented",
    //   message: `Sorry, this feature hasn't been implemented yet :(`,
    // });
    setCheckoutInitiated(prev => !prev)
  };

  const errorHandler = (): void => {
    setError(null);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(cart, cartSubtotal, cartTotal);

    //Do validation using custom hook


    emailSubmitHandler()
    firstNameSubmitHandler()
    lastNameSubmitHandler()
    companyNameSubmitHandler()
    postalOrZipSubmitHandler()
    citySubmitHandler()
    provinceOrStateSubmitHandler()
    countrySubmitHandler()
    addressSubmitHandler()
    unitSubmitHandler()
    console.log('check');

     //If a field is invalid, cancel submission
     if (!enteredEmailIsValid || !enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredPostalOrZipIsValid || !enteredCityIsValid || !enteredCountryIsValid || !enteredProvinceOrStateIsValid || !enteredAddressIsValid) {
      return;
    }

    console.log('check');
    

    //If valid, continue

   


let timestamp = new Date().toDateString();
let deliveryDateSeconds = (new Date().getTime() + 1209600000);
let deliveryDate = new Date(deliveryDateSeconds).toDateString()
console.log(timestamp);
console.log(deliveryDate);


//Get delivery date to readable or mutatable 2 week format. I want to be able to render date in an apealing way

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
  items: cart
}
console.log(order);

// const docRef = await db.collection('cart').doc()
// console.log(docRef.id);
// const id = docRef.id



const savedOrder = await db.collection("orders").add(order)
  .then(async docRef => {
    console.log("Document written with ID: ", docRef.id);
    console.log("Document written with : ", docRef);
    console.log("Document written with ID: ", );
    docRef.set({...order, orderId: docRef.id})
    return (await docRef.get()).data();
    // console.log("You can now also access this. as expected: ", this.foo)
  })

  console.log(savedOrder);
  // console.log(docRef);
// console.log(docRef);
// console.log(docRef.id);



    dispatch(cartActions.resetCart())

    

    navigate('/order-confirmation', { state: {order: savedOrder}  });



  }

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

  const firstNameInputClasses = !firstNameInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;
    
    const lastNameInputClasses = !lastNameInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  const emailInputClasses = !emailInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  // const companyNameInputClasses = !companyNameInputHasError
  //   ? classes.control
  //   : `${classes.control} ${classes.invalid}`;

  const addressInputClasses = !addressInputHasError
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  // const unitInputClasses = !unitInputHasError
  // ? classes.control
  // : `${classes.control} ${classes.invalid}`;

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


  return (
    <>
      {/* {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )} */}
      <div id="vinyls_body">
        <main id="vinyls__main">
          <div className="vinyls__container">
            <div className="row">
              <div className="vinyl__selected--top">
                <h2 className="cart__title">Cart</h2>
              </div>
              <div className="cart">
                <div className="cart__header">
                  <div className="cart__vinyl">Vinyl</div>
                  <div className="cart__quantity">Quantity</div>
                  <div className="cart__total">Total</div>
                </div>
                <div className="cart__body">
                  {cart.map((vinyl) => {
                    return (
                      <div className="cart__item" key={vinyl.id}>
                        <div className="cart__vinyl">
                          <img
                            src={vinyl.url}
                            alt=""
                            className="cart__vinyl--img"
                          />
                          <div className="cart__vinyl--info">
                            <span className="cart__vinyl--title">
                              {vinyl.title}
                            </span>
                            <span className="cart__vinyl--price">
                              $
                              {(vinyl.salePrice || vinyl.originalPrice).toFixed(
                                2,
                              )}
                            </span>
                            <button
                              className="cart__vinyl--remove"
                              onClick={() =>
                                dispatch(cartActions.removeVinyl(vinyl))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="cart__quantity">
                          <input
                            type="number"
                            min={1}
                            max={99}
                            className="cart__input"
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
                        <div className="cart__total">
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
                  <div className="cart__empty">
                    <img src={EmptyCart} alt="" className="cart__empty--img" />
                    <h2>You don't have any items in your cart!</h2>
                    <Link to="/vinyls">
                      <button className="btn">Browse Vinyls</button>
                    </Link>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className={classes.checkout}>
                  {(isLogged && checkoutInitiated) && <form className={classes.checkoutForm} onSubmit={submitHandler}>
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
                              emailBlurHandler()
                            }}
                            value={enteredEmail}
                          />
                          {emailInputHasError && (
                            <p className={classes.errorText}>Please enter a valid email</p>
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
                            firstNameBlurHandler()
                          }}
                          value={enteredFirstName}
                        />
                        {firstNameInputHasError && (
                          <p className={classes.errorText}>Please enter a first name</p>
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
                            lastNameBlurHandler()
                          }}
                          value={enteredLastName}
                        />
                        {lastNameInputHasError && (
                          <p className={classes.errorText}>Please enter a last name</p>
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
                                companyNameBlurHandler()
                              }}
                              value={enteredCompanyName}
                            />
                            {/* {companyNameInputHasError && (
                              <p className={classes.errorText}>Please enter a first and last name (1 space between)</p>
                            )} */}
                          </div>
                    </div>


                    <div className={classes.formRow}>

                    <div className={countryInputClasses}>
                        <select id="country" name="country" onBlur={countryBlurHandler} onChange={countryChangeHandler} value={enteredCountry}>
                            <option value="" disabled>Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
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
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
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
                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
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
                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
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
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
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
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
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
                                addressBlurHandler()
                              }}
                              value={enteredAddress}
                            />
                            {addressInputHasError && (
                              <p className={classes.errorText}>Please enter a valid address</p>
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
                                unitBlurHandler()
                              }}
                              value={enteredUnit}
                            />
                            {/* {unitInputHasError && (
                              <p className={classes.errorText}>Please enter a first and last name (1 space between)</p>
                            )} */}
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
                                  cityBlurHandler()
                                }}
                                value={enteredCity}
                              />
                              {cityInputHasError && (
                                <p className={classes.errorText}>Please enter a valid city</p>
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
                                provinceOrStateBlurHandler()
                              }}
                              value={enteredProvinceOrState}
                            />
                            {provinceOrStateInputHasError && (
                              <p className={classes.errorText}>Please enter a province/state</p>
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
                                postalOrZipBlurHandler()
                              }}
                              value={enteredPostalOrZip}
                            />
                            {postalOrZipInputHasError && (
                              <p className={classes.errorText}>Please enter a valid Postal/ZIP Code</p>
                            )}
                          </div>
                    </div>

                    {/* <div className={classes.formRow}>
                      <div className={classes.phoneInputClasses}>
                                <input
                                  type="text"
                                  id="phone"
                                  name="phone"
                                  placeholder="Phone-number"
                                  onChange={phoneChangeHandler}
                                  onBlur={() => {
                                    phoneBlurHandler()
                                  }}
                                  value={enteredPhone}
                                />
                                {phoneInputHasError && (
                                  <p className={classes.errorText}>Please enter a valid Phone Number</p>
                                )}
                              </div>
                    </div> */}
                    <div className={classes.checkoutButtonWrapper}>
                      <button>{processingPayment ? <FontAwesomeIcon icon={faSpinner} className={classes.spinner} /> : `Confirm Checkout`}</button>
                      
                    </div>
                  </form>}

                  <div className={classes.total}>
                    <div className="total__item total__sub-total">
                      <span>Subtotal:</span>
                      <span>${cartSubtotal}</span>
                    </div>
                    <div className="total__item total__tax">
                      <span>Tax: (13%)</span>
                      <span>${cartTax}</span>
                    </div>
                    <div className="total__item total__price">
                      <span>Total:</span>
                      <span>${cartTotal}</span>
                    </div>
                    <button className="btn btn__checkout" onClick={clickHandler}>
                      Proceed to checkout
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
