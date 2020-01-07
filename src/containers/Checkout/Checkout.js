import React, { useState, useEffect } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

         useEffect(()=>{
        /*    const query = new URLSearchParams(props.location.search)
            const extractedIngredients = {}
            let price = 0;
            for (let param of query.entries()){
                if(param[0] === 'price'){
                    setPrice(param[1])
                    break
                }
                extractedIngredients[param[0]] = +param[1]
            }
            setIngredietns(extractedIngredients)*/
            props.onInitPurchase()
        },[]) 

    let summary = <Redirect to="/" />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null
        console.log("got here creating redirect", purchasedRedirect)
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }

    return summary
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)