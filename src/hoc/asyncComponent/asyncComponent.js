import React, { useState, useEffect } from 'react'

 const AsyncComponent = (importComponent) => {
    const [component, setComponent] = useState(null)
    useEffect(() => {
        importComponent()
        .then(cmp => {
            setComponent(cmp.default)
        })
    })

  return <Component component={component}/>
} 

const Component = (props) => {


        const C = props.component

        return C ? <C {...props}/> : null
}

export default AsyncComponent