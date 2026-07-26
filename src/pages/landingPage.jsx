import { Link } from "react-router-dom";

export default function LandingPage(){
    return(<>
         <div className="fixed lg:top-52 lg:left-16 z-10 p-6 lg:p-0 flex w-full flex-col lg:flex-row">
            <div className="flex flex-col gap-2 lg:gap-5 w-full lg:w-3/4">
                <h1 className=" lg:text-7xl text-3xl text-white font-bold">Build Your Dream Setup</h1>
            <h1 className="lg:text-5xl text-2xl text-white font-bold">With The Best Gear</h1>
            <p className=" text-white text-[12px]  lg:text-[20px] font-semibold">Explore premium computer parts, accessories and
            gaming essentials - all in one place.</p>
            <div className="flex lg:w-1/3 justify-between">
                <Link to="/products" className="bg-blue-500 text-white px-5 py-2 rounded-sm">Shop Now</Link>
                <Link to="/contact-us" className="bg-white  px-5 py-2 rounded-sm">Contact-us</Link>
            </div>
            </div>
            <div className="lg:w-1/2 w-full flex justify-between items-center lg:pt-4 pt-10 ml-5 lg:ml-0">
                <img src="land.png" className="w-full"></img>
            </div>
            </div>
        <div className="w-full h-full relative flex justify-center">
            <video className="w-full h-full object-cover" autoPlay loop muted >
                <source src="landingpage.mp4" type="video/mp4" ></source>
            </video>
        </div>
        </>
    )
}