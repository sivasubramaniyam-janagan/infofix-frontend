export default function LandingPage(){
    return(
        <div className="w-full h-full relative flex justify-center">
            <div className="fixed top-1/4 text-5xl text-white  font-bold p-5 text-center  backdrop-blur-lg rounded-2xl ">Welcome to InfoFix</div>
            <video className="w-full h-full object-cover" autoPlay loop muted >
                <source src="landingpage.mp4" type="video/mp4" ></source>
            </video>
        </div>
    )
}