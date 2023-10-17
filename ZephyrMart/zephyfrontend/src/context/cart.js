import {createContext,useContext, useEffect, useState} from 'react';

const cartContext = createContext();

const CartProvider = ({children})=>{
    const [cart,setCart] = useState([]);
    
    useEffect(()=>{
        const existingdata = localStorage.getItem("cart");
        if(existingdata) setCart(JSON.parse(existingdata));
        
    },[])
    return (
        <cartContext.Provider value = {[cart,setCart]}>
            {children}
        </cartContext.Provider>
    )
}
const useCart = () =>useContext(cartContext)
export {useCart,CartProvider}