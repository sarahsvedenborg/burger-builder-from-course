import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

//This is not a container component and should therefore NOT connect to the state, but this is a quickfix in this example
import { connect } from 'react-redux'

//Using export here for testing purposes. Then this component can be exported (without connect) and tested without having to be linked to a store.
export const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">BurgerBuilder</NavigationItem>
        {props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
        {props.isAuthenticated ? 
            <NavigationItem link="/logout">Logout</NavigationItem> :
            <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
    </ul>
)

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(NavigationItems)