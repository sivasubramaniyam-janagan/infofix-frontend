export function getCart(){
    const cartString = localStorage.getItem("cart")

    if (cartString==null){
        localStorage.setItem("cart","[]")
        return []
    }
    else{
        const cart = JSON.parse(cartString)
        return cart
    }
}


export function addToCart(product , quantity ){

    const cart = getCart()
    const existingProductIndex = cart.findIndex(cartItem=> product.productId==cartItem.product.productId)

    if(existingProductIndex==-1){
        if(quantity>0){
            cart.push({
            product:{
                productId:product.productId,
                image:product.images[0],
                name:product.name,
                labelledPrice:product.labelledPrice,
                price:product.price         
            },
            quantity:quantity
             })
        }
    }
    else{
        const newQty = cart[existingProductIndex].quantity + quantity
        if (newQty > 0){
            cart[existingProductIndex].quantity=newQty
        }else{
            cart.splice(existingProductIndex,1)
        }
    }

    localStorage.setItem("cart",JSON.stringify(cart))


}

export function getTotal(cart){

    let total = 0;

    for(let i=0 ; i<cart.length;i++ ){
        total+=cart[i].product.price * cart[i].quantity
    }

    return total

}