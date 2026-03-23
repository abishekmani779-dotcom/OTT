import { useState, useEffect } from 'react';

// A simple global state so that both Navbar and LoginModal share the same mock session
let globalAuthenticated = false;
const globalListeners = new Set<(auth: boolean) => void>();

const notifyListeners = () => {
    globalListeners.forEach(l => l(globalAuthenticated));
};

export function useMockPrivy() {
    const [authenticated, setAuthenticated] = useState(globalAuthenticated);
    const [user, setUser] = useState<{
        email?: { address: string };
        wallet?: { address: string };
        phone?: { number: string };
    } | null>(null);

    useEffect(() => {
        const handler = (auth: boolean) => {
            setAuthenticated(auth);
            if (auth) {
                setUser({
                    email: { address: 'peppynova@example.com' },
                    wallet: { address: '4roTnDJXyY28ajD' },
                    phone: { number: '' },
                });
            } else {
                setUser(null);
            }
        };
        globalListeners.add(handler);
        return () => {
            globalListeners.delete(handler);
        };
    }, []);

    const login = () => {
        // Mock the async login delay
        setTimeout(() => {
            globalAuthenticated = true;
            notifyListeners();
        }, 1500);
    };

    const logout = () => {
        globalAuthenticated = false;
        notifyListeners();
    };

    const connectWallet = () => login();

    const unlinkMethod = (method: string) => {
        console.log(`Unlinking ${method}...`);
    };

    const linkMethod = (method: string) => {
        console.log(`Linking ${method}...`);
    };

    return {
        login,
        logout,
        authenticated,
        user,
        connectWallet,
        linkMethod,
        unlinkMethod,
    };
}
