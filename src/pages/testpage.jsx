
import { useState } from "react"
import uploadMedia from "../../utilities/mediaUpload"
export default function TestPage(){
    const [file,setFile] = useState(null)
   
    
    async function handleUpload(){
       
        try{    
                console.log("uafafrl")
                const url = await uploadMedia(file)
                console.log(url)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        
        <>
            <input type="file"
                onChange={
                    (e)=>{
                       setFile(e.target.files[0])
                    }
                }
            ></input>

            <button className="rounded-md bg-blue-500 text-white px-4 py-2"
                onClick={handleUpload}
            >Upload</button>

        </>
    )
}