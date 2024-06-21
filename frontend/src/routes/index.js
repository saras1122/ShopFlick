import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import OrderPage from "../pages/OrderPage";
import HistoryOrders from "../pages/HistoryOrders";
import ProductStatus from "../components/ProductStatus";
import Visits from "../components/Visits";
import AnalysisDelivery from "../components/AnalysisDelivery";
import Sales from "../components/Sales";
import Profit from "../components/Profit";
import SHipping from "../components/SHipping";

const router=createBrowserRouter(
    [
        {
            path:"/",
            element :<App></App>,
            children:[
                {
                    path:"",
                    element:<Home/>
                },
                {
                    path:"login",
                    element:<Login/>
                },
                {
                    path:"forgot-password",
                    element:<ForgetPassword/>
                },
                {
                    path:"sign-up",
                    element:<SignUp/>
                },
                {
                    path : "product-category",
                    element : <CategoryProduct/>
                },
                {
                    path : "product/:id",
                    element : <ProductDetails/>
                },
                {
                    path : 'cart',
                    element : <Cart/>
                },
                {
                    path : "search",
                    element : <SearchProduct/>
                },
                {
                    path : "booking",
                    element :<OrderPage/>
                },
                {
                    path : "history",
                    element : <HistoryOrders/>,
                    children:[
                        {
                            path:"shipped",
                            element:<SHipping/>
                        },
                        {
                            path:"delivered",
                            element:<SHipping/>
                        },
                        {
                            path:"cancelled",
                            element:<SHipping/>
                        }
                    ]
                },
                
                {
                    path : "admin-panel",
                    element : <AdminPanel/>,
                    children : [
                        {
                            path : "all-users",
                            element : <AllUsers/>
                        },
                        {
                            path : "all-products",
                            element : <AllProducts/>
                        },
                        {
                            path: "edit-productStatus",
                            element:<ProductStatus/>
                        },
                        {
                            path: "charts",
                            element:<Visits/>
                        },
                        {
                            path:"delivery-analysis",
                            element:<AnalysisDelivery/>
                        },
                        {
                            path:"category-analysis",
                            element:<Sales/>
                        },
                        {
                            path:"profit",
                            element:<Profit/>
                        }
                    ]
                },
            ]
        }
    ]
)
export default router