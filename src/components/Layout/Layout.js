import React, { useState } from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false)
    /*     const [] = useState()
        const [] = useState()
     */
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prevState) => !prevState)
    }
    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout