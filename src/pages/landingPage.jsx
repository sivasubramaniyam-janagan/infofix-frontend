export default function LandingPage(){
    return(
        <div className="w-full h-full relative flex justify-center">
            <div className="fixed top-1/4   text-center  backdrop-blur-lg rounded-2xl ">
            <h1 className=" lg:text-5xl text-3xl text-white font-bold p-5 pb-0">Welcome to InfoFix</h1>
            <h1 className="  text-white pb-5">Fastest IT solutions</h1>
            </div>
            <video className="w-full h-full object-cover" autoPlay loop muted >
                <source src="landingpage.mp4" type="video/mp4" ></source>
            </video>
        </div>
    )
}