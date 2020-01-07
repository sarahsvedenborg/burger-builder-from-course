import React, { useEffect } from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {

const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientKey => {
        return (
            <li key={ingredientKey}>
                <span style={{textTranform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
            </li>
        )
    })

    return(
        <React.Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.total.toFixed(2)} </strong></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
    )
}

export default OrderSummary