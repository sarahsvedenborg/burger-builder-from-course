import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {

        const [error, setError] = useState(null)
        let requestInterceptor = null
        let responeInterceptor = null

        useEffect(() => {
            requestInterceptor = axios.interceptors.request.use(request => {
                setError(null)
                return request
            })
            responeInterceptor = axios.interceptors.response.use(res => res, error => {
                setError(error)
            })

            return () => {
                axios.interceptors.request.eject(requestInterceptor)
                axios.interceptors.response.eject(responeInterceptor)
            }
        })

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <React.Fragment>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        )
    }
}

export default withErrorHandler