
import { BiCart } from "react-icons/bi"
import { Link } from "react-router-dom"
import UserData from "./userData"


export default function Header(){
    return (
        <header className="bg-accent text-white p-4 flex w-full h-28 items-center justify-center relative">

        <Link to="/">
            <div className="absolute left-9 top-0  h-full lg:w-[250px] flex items-center justify-center">
                <img src="logo.jpg" className="h-20 rounded-full "></img>
            </div>
        </Link>

         <div className="absolute right-9 top-0  h-full  flex items-center justify-center lg:hidden"> 
                <h1 className="text-2xl font-semibold ">Infofix</h1>
            </div>

        <div className="h-full hidden lg:flex justify-center items-center gap-10 ">
            <Link to="/" className="font-semibold hover:text-gray-100 hover:font-light ">Home</Link>
            <Link to="/products" className="font-semibold hover:text-gray-100 hover:font-light ">Products</Link>
            <Link to="/contact-us" className="font-semibold hover:text-gray-100 hover:font-light ">Contact Us</Link>
            


        </div>

        <div className="text-white hidden lg:flex absolute right-20 ">
            <UserData/>
        </div>

        <div className="hidden lg:flex justify-center items-center h-full ">
            <Link to="/cart" className="text-white absolute right-6 text-3xl hover:text-gray-300 pointer"><BiCart/></Link>
        </div>

            
        </header>

    )
}