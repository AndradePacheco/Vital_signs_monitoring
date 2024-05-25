import { Outlet, Navigate } from "react-router-dom";

const privateRoute = () => {
    return localStorage.getItem('user')? <Outlet/> : <Navigate replace to={{pathname: '/login'}}/>
}

export default privateRoute;