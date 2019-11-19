import React, { useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

export interface Auth0Context {
    isAuthenticated: boolean;
    user?: any;
    isLoggingIn: boolean;
    isPopupOpen: boolean;
    loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
    getIdTokenClaims: (options?: getIdTokenClaimsOptions) => Promise<IdToken>;
    loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
    getTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<any>;
    getTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;
    logout: (options?: LogoutOptions) => void;
    handleRedirectCallback: () => Promise<void>
}

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<Auth0Context>({} as Auth0Context);

export const useAuth0 = () => React.useContext(Auth0Context);

interface Auth0ProviderProps extends Auth0ClientOptions {
    children: any;
}

export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    domain,
    client_id,
    redirect_uri
}: Auth0ProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any>();
    const [auth0Client, setAuth0Client] = useState<Auth0Client>()
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client({domain, client_id, redirect_uri});
            setAuth0Client(auth0FromHook);

            if (window.location.search.includes("code=")) {
                const { appState } = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();
            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setIsLoggingIn(false);
        }
        initAuth0();
    }, [])

    const loginWithPopup = async (params = {}) => {
        setIsPopupOpen(true);
        try {
            await auth0Client!.loginWithPopup();
        } catch (error) {
            console.log(error)
        } finally {
            setIsPopupOpen(false)
        }

        const user = await auth0Client!.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setIsLoggingIn(true);
        await auth0Client!.handleRedirectCallback();
        const user = await auth0Client!.getUser();
        setIsLoggingIn(false);
        setIsAuthenticated(true);
        setUser(user);
    }

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                isLoggingIn,
                isPopupOpen,
                loginWithPopup,
                getIdTokenClaims: (...p) => auth0Client!.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client!.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client!.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client!.getTokenWithPopup(...p),
                logout: (...p) => auth0Client!.logout(...p),
                handleRedirectCallback
            }}
        >
            {children}
        </Auth0Context.Provider>
    )
}