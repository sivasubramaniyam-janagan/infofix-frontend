import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function(){
    return(
        <div className="p-4 w-full pb-5 min-h-screen ">
        <div className="border-b pb-2.5 border-secondary">
            <h1 className="text-3xl font-semibold text-secondary ">Get in touch</h1>
            <p className="text-[14px]">
                Questions about compatibility, stock, warranty, or an order — reach us directly through any of the channels below. No forms, no waiting on a ticket queue.
            </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-around flex-wrap lg:mt-15">
        <div className="w-full lg:p-8  lg:w-1/5 border p-3 rounded-2xl my-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:border-2">
            <div className="flex items-center">
                <MdEmail  className="text-accent"/>
                <h1 className="ml-2">EMAIL</h1>
            </div>
            <h1 className="font-semibold">Write to us</h1>
            <h1 className="text-accent">InfoFix@Gmailcomk</h1>
            <a href="mailto:infofix@gmail.com"><button className="bg-accent text-white p-1.5 rounded-sm pointer mt-1 hover:bg-secondary">Send an Email</button></a>
        </div>

        <div className="w-full lg:p-8 lg:w-1/5 border p-3 rounded-2xl my-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:border-2">
            <div className="flex items-center">
                <IoLogoWhatsapp  className="text-accent"/>
                <h1 className="ml-2">WHATSAPP</h1>
            </div>
            <h1 className="font-semibold">Chat with us</h1>
            <h1 className="text-accent">+94 7768 624</h1>
            <button className="bg-accent text-white p-1.5 rounded-sm pointer mt-1 hover:bg-secondary">Open WhatsApp</button>
        </div>

        <div className=" w-full lg:p-8 lg:w-1/5 border p-3 rounded-2xl my-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:border-2">
            <div className="flex items-center">
                <FaPhoneAlt  className="text-accent"/>
                <h1 className="ml-2">PHONE</h1>
            </div>
            <h1 className="font-semibold">Call the store</h1>
            <h1 className="text-accent">+94 5648 424</h1>
            <button className="bg-accent text-white p-1.5 rounded-sm pointer mt-1 hover:bg-secondary">Call now</button>
        </div>


        
        <div className="w-full lg:p-8 lg:w-1/5 border p-3 rounded-2xl my-3 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:border-2">
            <div className="flex items-center">
                <FaMapMarkerAlt  className="text-accent"/>
                <h1 className="ml-2">VISIT</h1>
            </div>
            <h1 className="font-semibold">Our store</h1>
            <h1 className="text-accent">No 50 , Bandarawela</h1>
            <button className="bg-accent text-white p-1.5 rounded-sm pointer mt-1 hover:bg-secondary">View on map</button>
        </div>
        </div>

        

        </div>

    )
}