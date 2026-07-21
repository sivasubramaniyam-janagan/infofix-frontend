import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <div className="flex w-full h-full flex-col justify-center items-center">
            <h1 className="text-8xl font-bold text-secondary">404</h1>
            <h1 className="text-[20px] font-semibold">Page Not Found</h1>
            <Link to="/" className="mt-2 bg-accent w-30 text-white text-center font-semibold rounded-lg pt-3 pb-3">Home</Link>
        </div>
    )
}