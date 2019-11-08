import React, { useEffect } from 'react'
import { useAuth0 } from '../../services/react-auth0-spa'
import { Route } from 'react-router-dom';

type PrivateRouteProps = {
    Component: React.ElementType,
    path: string
}

const PrivateRoute = ({ Component, path, ...rest }: PrivateRouteProps) => {
    const { isLoggingIn, isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (isLoggingIn || isAuthenticated) {
            return;
        }

        const fn = async () => {
            await loginWithRedirect();
        }

        fn();
    }, [isLoggingIn, isAuthenticated, loginWithRedirect, path])

    const render = (props: any) => isAuthenticated === true ? <Component {...props}/> : null;

    return (
        <Route path={path} render={render} {...rest} />
    )
}

export default PrivateRoute
