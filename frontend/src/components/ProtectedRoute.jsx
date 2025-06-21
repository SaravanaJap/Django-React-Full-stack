 import {Navigate} from 'react-router-dom';
 import api from '../api';
 import {ACCESS_TOKEN,REFRESH_TOKEN} from '../constants';
 import { useEffect, useState } from 'react';
 import {jwtDecode} from 'jwt-decode';

 function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);


    //Here we check if the user is authorized by mounting the component
    //and calling the auth function. If token is valid, we set isAuthorized to true,
    //if token is expired we call refreshToken function to get a new token
    //If both fail, we set isAuthorized to false and redirect to login page


    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

     const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

     const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);  // Decode the JWT token to get the expiration time
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;    //divide_by_1000_to_convert_milliseconds_to_seconds

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
 }


 export default ProtectedRoute;
