
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
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact-us">Contact Us</Link>
            


        </div>

        <div className="text-white hidden lg:flex absolute right-20 ">
            <UserData/>
        </div>

        <div className="hidden lg:flex justify-center items-center h-full ">
            <Link to="/cart" className="text-white absolute right-6 text-3xl"><BiCart/></Link>
        </div>

            
        </header>

    )
}