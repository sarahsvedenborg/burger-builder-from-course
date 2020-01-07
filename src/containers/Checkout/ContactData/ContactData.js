import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'

const ContactData = (props) => {

    const [formIsValid, setFormIsValid] = useState(false)

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
    })

    const orderHandler = (event) => {
        event.preventDefault()
        const formData = {}

        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
      
      const order = {
          ingredients: props.ings,
          price: props.total, //In reality, recalculate price on server
          orderData: formData,
          userId: props.userId
      }

        props.onOrderBurger(order, props.token)
    }

    const formElementsArray = []

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    const inputChangedHandler = (event, elementIdentifier) => {
        let updatedOrderForm = {
            ...orderForm
        }

        //Could move utility.js into a shared forlder and use updateObject() method to update the form state as such:
        /**
         *    const updatedFormElement = updateObject(updatedOrderForm[elementIdentifier], {
         *      value: event.target.value,
         *      valid: checkValidity(updatedFormElement.value, updatedFormElement.validation),
         *      touched: true 
         * })
         */

        const updatedFormElement = {
            ...updatedOrderForm[elementIdentifier]
        }

        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[elementIdentifier] = updatedFormElement

        let formIsValid = true

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
    }


    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    change={(event) => inputChangedHandler(event, formElement.id)}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid} />
            ))}
            <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>ORDER</Button>
        </form>);
    if (props.loading) {
        form = <Spinner />
    }


    return (
        <div className={classes.ContactData}>
            <h4>Enter contact details</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))