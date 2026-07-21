import { createClient } from "@supabase/supabase-js"

let url = "https://cncmqvtgxiktewvupqpp.supabase.co"
let key = "sb_publishable_iRCQdL_fKT3g_usWPowgyQ_LDcXWeLp"

const supabase = createClient(url , key)

export default function uploadMedia(file){
    return new Promise((resolve,reject)=>{
        if(file==null){
            reject("No file selected")
        }
        else{
            const timeStamp = new Date().getTime();
            const filename = timeStamp + " " + file.name

            supabase.storage.from("images").upload(filename,file,{
            upsert:false,
            cacheControl:"3600"
            }).then(
                ()=>{
                const publicURL = supabase.storage.from("images").getPublicUrl(filename).data.publicUrl
                    resolve(publicURL)
                 }
            ).catch((error)=>{
                reject(error)
        })

        }
    })
}