import { useState } from "react"

export default function SlideShow(props){
    const [activeImage,setActiveImage] = useState(0)
    const images=props.images
    return (
        <div className="lg:w-100 w-90 lg:h-125 flex lg:flex-col p-1">
            <img src={images[activeImage]} className="object-cover aspect-square"></img>
            <div className="h-full w-full flex-col lg:flex-row flex justify-center gap-1">
                {
                    images.map((image,index)=>{
                        return (
                        <img src={image} className={"min-w-20 lg:w-22.5 p-1 cursor-pointer rounded-lg aspect-square"+(activeImage==index ? " border-accent border-2" : "")} key={index} onClick={()=>setActiveImage(index)}></img>
                        )
                    })
                }
            </div>
        </div>
    )
    
}