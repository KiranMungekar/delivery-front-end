import axios from 'axios';


export const addProduct = async ({name, price})=>{
    //const response = await axios.post('http://localhost:5000/api/products/addProduct');
}

export const getAllProducts= async ()=>{
    return await axios.get('http://localhost:5000/api/products/getAllProduct');
}


//product movement apis
export const getAllProductMovements= async ()=>{
    return await axios.get(`http://localhost:5000/api/transport/getAllMovements`)
}

export const createMovement= async (fromLocation, toLocation, productId,qty)=>{
    const data={
        "fromLocationId":fromLocation,
        "toLocationId":toLocation,
        "productId":productId,
        "qty":qty
    }
    return await axios.post(`http://localhost:5000/api/transport/movementFromXToY`,{...data} );
}