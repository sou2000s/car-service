import Main from "../MainLayout/Main";
import CheckOut from "../pages/CheckOut/CheckOut";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders/Orders";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";




const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {path:"/",
    element:<Main></Main>,
    children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/signup',
            element:<SignUp/>
        },
        {
            path:'/checkout/:id',
            loader: ({params})=> {
                return fetch(`http://localhost:5000/services/${params.id}`)
            },
            element:<PrivateRoute><CheckOut/></PrivateRoute>
        },
        {
            path:"/orders",
            element:<PrivateRoute><Orders></Orders></PrivateRoute>
        }
    ]
 }
  ])

export default router