import axios from 'axios';


export const addProduct = async ({name, price})=>{
    //const response = await axios.post('http://localhost:5000/api/products/addProduct');
    

}


//product movement apis
export const getAllProductMovements= async ()=>{
    return await axios(`http://localhost:5000/api/transport/getAllMovements`)
}