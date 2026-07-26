import { Link, Route, Router, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/adminProducts";
import AdminAddProducts from "./admin/adminAddProducts";
import AdminEditProduct from "./admin/adminEditProduct";
import AdminOrdersPage from "./admin/adminOrders";
import AdminUsers  from "./admin/adminUsers";

export default function AdminPage(){
    return (
        <div className="bg-primary text-secondary flex w-full h-full">
            <div className="w-[20%] h-full bg-accent ">
                <div className="w-full flex justify-center ">
                    <Link to="/"><img src="logo.jpg" className="w-32 rounded-2xl my-7"></img></Link>
                </div>
                <Link to="/admin" className="block p-4 border-b border-secondary hover:bg-black text-amber-50">Orders</Link>
                <Link to="/admin/users" className="block p-4 border-b border-secondary hover:bg-black text-amber-50">Users</Link>
                <Link to="/admin/products" className="block p-4 border-b border-secondary hover:bg-black text-amber-50">Products</Link>
                <Link to="/admin/reviews" className="block p-4 border-b border-secondary hover:bg-black text-amber-50">Reviews</Link>

            </div>
            <div className="w-[80%] h-full bg-primary">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage/>}></Route>
                    <Route path="/users" element={<AdminUsers/>}></Route>
                    <Route path="/products" element={<AdminProductsPage />}></Route>
                    <Route path="/addproducts" element={<AdminAddProducts/>}></Route>
                    <Route path="/reviews" element={<h1>Reviews</h1>}></Route>
                    <Route path="/editproduct" element={<AdminEditProduct/>}></Route>
                </Routes>
            </div>
        </div>
    )
}