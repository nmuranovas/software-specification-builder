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
    GetTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;
    logout: (options?: LogoutOptions) => void;
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
    ...initOptions
}: Auth0ProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any>();
    const [auth0Client, setAuth0Client] = useState<Auth0Client>()
    const [loading, setLoading] = useState(true)
    const [popupOpen, setPopupOpen] = useState(false)

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
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

            setLoading(false);
        }
        initAuth0();
    }, [])

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup();
        } catch (error) {
            
        }
    }
}