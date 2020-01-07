import React, { useState, useEffect } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from 'axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { tsPropertySignature } from '@babel/types'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
const BurgerBuilder = (props) => {

    const [purchased, setPurchased] = useState(false)
    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        props.onInitIngredients()
    },[])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, el) => {
                return sum + el; //Read more about this syntax to master it!
            }, 0);

        return sum > 0
    }

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
       
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        /* setLoading(true)
        const order = {
            ingredients: ingredients,
            price: total, //In reality, recalculate price on server
            customer: {
                name: 'Ola Nordmann',
                address: {
                    street: 'Teststreet 1',
                    zipCode: 'dd',
                    country: 'Norway'
                },
                email: 'dd@dd.no'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order) //.json is used for firebase (nodename of your choice + .json)
            .then(response => {
                setLoading(false)
                setPurchasing(false)
            })
            .catch(error => {
                setLoading(false)
                setPurchasing(false)
            }) */
            props.onInitPurchase()
            props.history.push('/checkout') 
    }

    const disabledInfo = {
        ...props.ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (props.ings) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings}></Burger>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.price} />
            </React.Fragment>)
        orderSummary = <OrderSummary
            ingredients={props.ings}
            total={props.price}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }
/*     if (loading) {
        orderSummary = <Spinner />
    } */

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))