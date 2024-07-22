import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import Autocomplete from 'react-google-autocomplete';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";
import "../design/Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const handleIncrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 0.5 } : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 0.5
                    ? { ...item, quantity: item.quantity - 0.5 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.quantity * item.pricePerKg,
        0
    ).toFixed(2);

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        zip: Yup.string()
            .matches(/^\d+$/, 'Zip Code must contain only numbers')
            .required('Zip Code is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string()
            .matches(/^05\d\d{7}$/, 'Phone number must be in the format 05x-xxxxxxx')
            .required('Phone number is required')
    });

    const handleSubmit = (values, { resetForm }) => {
        // Create a string with shoe information
        const shoeInfo = cartItems.map(item =>
            `${item.name}: ${item.quantity} kg - ₪${(item.quantity * item.pricePerKg).toFixed(2)}`
        ).join('\n');

        // Show toast with user info and shoe details
        toast.success(
            `Order submitted!\n
        Full Name: ${values.fullName}
        Email: ${values.email}\n
        Total: ₪${totalPrice}`,
            { autoClose: 10000 } // Increase autoClose time to 10 seconds
        );

        // Reset the form
        resetForm();
    };
    return (
        <div className="cart">
            <div className="items-in-cart">
                <b className="title">Shopping Cart</b>
                <Link to="/shop" style={{textDecoration: 'none'}}>
                    <button className="button">
                        <div className="start-shopping">Continue Shopping</div>
                    </button>
                </Link>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                                onRemove={handleRemove}
                            />
                        ))}
                        <div className="cart-total">
                            <span>Total Price: ₪{totalPrice}</span>
                        </div>
                    </div>
                )}
            </div>
            <Formik
                initialValues={{
                    fullName: '',
                    address: '',
                    city: '',
                    zip: '',
                    email: '',
                    phone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="client-info-form">
                        <h2>Enter your name and address:</h2>
                        <div className="form-group">
                            <label htmlFor="fullName" className="input-label">Full Name:</label>
                            <Field
                                type="text"
                                id="fullName"
                                name="fullName"
                                className={`input ${touched.fullName && errors.fullName ? 'input-error' : ''}`}
                            />
                            <div className="error-container">
                                <ErrorMessage name="fullName" component="div" className="error-message"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="input-label">Address:</label>
                            <Field
                                type="text"
                                id="address"
                                name="address"
                                className={`input ${touched.address && errors.address ? 'input-error' : ''}`}
                            />
                            <div className="error-container">
                                <ErrorMessage name="address" component="div" className="error-message"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city" className="input-label">City:</label>
                            <Field
                                type="text"
                                id="city"
                                name="city"
                                className={`input ${touched.city && errors.city ? 'input-error' : ''}`}
                            />
                            <div className="error-container">
                                <ErrorMessage name="city" component="div" className="error-message"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip" className="input-label">Zip Code:</label>
                            <Field
                                type="text"
                                id="zip"
                                name="zip"
                                className={`input ${touched.zip && errors.zip ? 'input-error' : ''}`}
                            />
                            <div className="error-container">
                                <ErrorMessage name="zip" component="div" className="error-message"/>
                            </div>
                        </div>
                        <h2>What's your contact information?</h2>
                        <div className="form-group">
                            <label htmlFor="email" className="input-label">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className={`input ${touched.email && errors.email ? 'input-error' : ''}`}
                            />
                            <div className="error-container">
                                <ErrorMessage name="email" component="div" className="error-message"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="input-label">Phone:</label>
                            <Field
                                type="tel"
                                id="phone"
                                name="phone"
                                className={`input ${touched.phone && errors.phone ? 'input-error' : ''}`}
                            />
                            <div className="error-container">
                                <ErrorMessage name="phone" component="div" className="error-message"/>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary d-flex align-items-center justify-content-center button"
                            style={{ margin: "50px" }}
                        >
                            Submit Order
                        </button>
                    </Form>
                )}
            </Formik>

            <ToastContainer
                position="bottom-right"
                autoClose={10000}
                style={{width: "400px"}}
            />
        </div>
    );
};

export default Cart;
