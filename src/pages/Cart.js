import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";
import "../design/Cart.css";
import { useOutletContext } from 'react-router-dom';
import axios from "axios";


const Cart = () => {
    const { cartItems, setCartItems } = useOutletContext();

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

    const handleSubmit = async (values, {resetForm, setSubmitting}) => {
        try {
            console.log('Cart Items:', cartItems);
            console.log('Total Price:', totalPrice);
            // Prepare the order data
            const orderData = {
                customerInfo: {
                    fullName: values.fullName,
                    address: values.address,
                    city: values.city,
                    zip: values.zip,
                    email: values.email,
                    phone: values.phone
                },
                products: cartItems.map(item => ({
                    productId: item._id ? item._id.toString() : '',
                    name: item.name,
                    quantity: item.quantity,
                    pricePerKg: item.pricePerKg
                })),
                totalPrice: parseFloat(totalPrice)
            };
            console.log('Order data being sent:', JSON.stringify(orderData, null, 2));


            // Send the order data to the server
            const response = await axios.post('http://localhost:3002/api/orders', orderData);

            // If the order was successful, show a success message and clear the cart
            if (response.data.success) {
                toast.success(
                    `Order submitted successfully!\n
                Order ID: ${response.data.orderId}\n
                Full Name: ${values.fullName}
                Email: ${values.email}\n
                Total: ₪${totalPrice}`,
                    {autoClose: 10000}
                );

                // Clear the cart
                setCartItems([]);

                // Reset the form
                resetForm();
            } else {
                toast.error('Failed to submit order. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                toast.error(`Server error: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                toast.error('No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                toast.error('An error occurred while submitting the order. Please try again.');
            }
            toast.error('An error occurred while submitting the order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="cart">
            <div className="items-in-cart">
                <b className="title">Shopping Cart</b>
                <Link to="/shop" style={{ textDecoration: 'none' }}>
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
                                key={item._id}
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
                {({ errors, touched , isSubmitting }) => (
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
                                <ErrorMessage name="fullName" component="div" className="error-message" />
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
                                <ErrorMessage name="address" component="div" className="error-message" />
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
                                <ErrorMessage name="city" component="div" className="error-message" />
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
                                <ErrorMessage name="zip" component="div" className="error-message" />
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
                                <ErrorMessage name="email" component="div" className="error-message" />
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
                                <ErrorMessage name="phone" component="div" className="error-message" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary d-flex align-items-center justify-content-center button"
                            style={{ margin: "50px" }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Order'}
                        </button>
                    </Form>
                )}
            </Formik>

            <ToastContainer
                position="bottom-right"
                autoClose={10000}
                style={{ width: "400px" }}
            />
        </div>
    );
};

export default Cart;
