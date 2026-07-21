import { useState } from "react"
import api from "../../utilities/api"
import toast from "react-hot-toast"
export default function CreateOrderModel(props){
    const cart=props.cart
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [firstname,setFirstName] = useState("")
    const [lastname,setLastName] = useState("")
    const [addressLine1,setAddressLine1] = useState("")
    const [addressLine2,setAddressLine2] = useState("")
    const [city,setCity] = useState("")
    const [province,setProvince] = useState("")
    const [postalCode,setPostalCode] = useState("")
    const [phone,setPhone] = useState("")
    const [isSubmitting,setIsSubmitting] = useState(false)

    
    async function createOrder(){

        if ( !addressLine1 || !city || !province || !postalCode || !phone) {
             toast.error("Please fill in all required fields")
             return
        }
        setIsSubmitting(true)
            try{
                const token=localStorage.getItem("token")
    
                const data={
                    firstname,
                    lastname,
                    addressLine1,
                    addressLine2,
                    city,
                    province,
                    postalCode,
                    phone,
                    items:[]
                }
    
                for (let i=0;i<cart.length;i++){
                    data.items.push({
                        productId:cart[i].product.productId,
                        quantity:cart[i].quantity
                    })
                }
    
                await api.post("/order",data,{
                    headers:{
                        Authorization:"Bearer "+token
                    }
                })
                
                toast.success("placed order successfully")
                setIsModalOpen(false)
    
            }
            catch(err){
                toast.error(err?.response?.data?.message||"Error placing order")
            }
        setIsSubmitting(false)
        }   

    return(
        <>
    
        <button className="bg-accent text-white p-2.5 rounded-2xl" onClick={() => setIsModalOpen(true)}>Order now</button>
        {
            isModalOpen && <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/35">
                <div className="flex w-9/10 fixed top-4 lg:static lg:w-96 flex-col gap-5 bg-white p-5 rounded-2xl ">
                    <h2 className="text-xl font-bold">Checkout</h2>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="Address Line 1"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="Address Line 2"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="Province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border border-gray-300 p-2 rounded-2xl"
                        />
                    </div>
                    <div className="flex justify-between gap-3">
                        <button className="bg-gray-300 p-2.5 rounded-2xl" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="bg-accent text-white p-2.5 rounded-2xl" onClick={()=>{createOrder()}} disabled={isSubmitting}>
                            {isSubmitting ? "Placing Order..." : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>
        }

        </>
    )
}