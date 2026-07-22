import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../components/productCard"
import api from "../../utilities/api"

export function ProductsPage(){

    const [products,setProducts] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [query,setQuery] = useState("")

    useEffect(()=>{
        if(!isLoaded){
            axios.get(import.meta.env.VITE_API_URL+"/products").then((response)=>{
                setProducts(response.data)
                setIsLoaded(true)
            }).catch((error)=>{
                console.log(error)
                toast.error(error?.response?.data?.message || "Error fething products")
            })
        }
    },[isLoaded])

    async function handleSearch() {
        if(query==""){
            return
        }
        api.get("/products/search/"+query).then((response)=>{
            setProducts(response.data)
        }).catch((error)=>{
            toast.error(error?.response?.data?.message || "Error searching products" )
        })
    }

    return(
        <div className="w-full h-full flex justify-center flex-wrap ">
            <div className="w-full h-15  flex p-2.5 gap-2 justify-center">
                <input value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search" className="w-1/2 border border-gray-300 rounded-sm p-1 "></input>
                <button className="bg-accent px-1 lg:px-4 text-white rounded-sm hover:bg-secondary" onClick={handleSearch}>Search</button>
                <button className="bg-secondary px-1 lg:px-4 text-white rounded-sm hover:bg-accent" onClick={()=>{setIsLoaded(false)}}>All products</button>
                
            </div>
            {
                (isLoaded && products.length === 0) ? <div className="">No products found</div>:""
            }
            {
                products.map((product)=>{
                    return(
                        <ProductCard key={product.productId} product={product} ></ProductCard>
                    )
                }) 
            }

        </div>
    )
}