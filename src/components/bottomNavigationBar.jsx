import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import MobileUserData from "./mobileUserData";

export default function BottomNavigationBar(){
    return(
        <div className="flex lg:hidden w-full h-18 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] fixed bottom-0 left-0  justify-around items-center bg-primary">
            <Link to="/products" className="flex h-12 aspect-square justify-center items-center text-2xl  shadow-2xl rounded-2xl text-accent border-2 "><IoSearchSharp /></Link>
            <Link to="/" className="flex h-12 aspect-square justify-center items-center text-2xl  shadow-2xl rounded-2xl text-accent border-2"><FiHome /></Link>
            <Link to="/cart" className="flex h-12 aspect-square justify-center items-center text-2xl  shadow-2xl rounded-2xl text-accent border-2 "><LuShoppingCart /></Link>
            <MobileUserData  />

        </div>
    )
}