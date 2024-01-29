import {jwtDecode} from 'jwt-decode';

import type { DecodedToken } from '@/types/token';

const KEY = '@token';

export const getTokenFromStorage = (): string => localStorage.getItem(KEY) || '';

export const setTokenToStorage = (value: string) => {
    localStorage.setItem(KEY, value);
    window.dispatchEvent(new Event('storage'));
};

export const removeTokenFromStorage = () => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event('storage'));
};

export const isValidToken = (token: string) => {
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (Date.now() >= decodedToken.exp * 1000) {
            return false;
        }
        if (!decodedToken.name || !decodedToken.email) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
};

export const isTokenExpired = (): boolean => {
    try {
        const token = getTokenFromStorage();
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp <= currentTime;
    } catch {
        return true;
    }
};


export const getTokenData = () => {
    try {
        const token = getTokenFromStorage();
        const decodedToken = jwtDecode<DecodedToken>(token);
        return {
            name: decodedToken.name,
            email: decodedToken.email,
        };
    } catch {
        return { name: '', email: '' };
    }
};
