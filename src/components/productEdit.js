import React,{useEffect,useReducer,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {
    useHistory,
    useLocation
  } from "react-router-dom";

const ProductEdit =(props)=>{
    const [isProductPresent, setProductPresent]=  useState(null);

    const [productName, setProductName]= useState('');
    const [productPrice, setProductPrice]= useState(0);

    const location = useLocation();
    const history= useHistory();

    const checkForProductId=async ()=>{
        const searchParams = new URLSearchParams(location.search);
        if(searchParams.has('id')){
            const prodId= searchParams.get('id');
            const response= await axios(`http://localhost:5000/api/products/getProduct/${prodId}`)
            const data = response.data;
            if(data['status'] === 'success'){
                setProductPresent(data['product']['_id'])
                setProductName(data['product']['name']);
                setProductPrice(data['product']['price']);
                
            }
        }

       
    }

    useEffect(()=>{
        checkForProductId()
    },[location]);


    const goBackToProducts =()=>{
        history.push('/productList')
    }

    const handleProductName= (event)=>{
        setProductName(event.target.value);
    }
    
    const handleProductPrice= (event)=>{
        setProductPrice(event.target.value);
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        const formData= new FormData(e.target);

        const response=await addProduct(formData)
        const data= response.data;
        if(data.status === 'success'){
            alert('Product successfully');
            goBackToProducts();
        }else{
            alert(data.reason);
        }

    }

    const addProduct= async (formData)=>{
        const data= {
            "id":isProductPresent,
            "name":formData.get('productName'),
            "price":formData.get('productPrice'),
        }
        if(isProductPresent){
            return await axios.put('http://localhost:5000/api/products/updateProduct', {...data});
        }else{
            return await fetch('http://localhost:5000/api/products/addProduct', {
                method: 'POST',
                body: {data},
            });
        }
        
    }

    

    return(
        <div style={{textAlign:'center'}}>
           <h1> {isProductPresent ? <span>Edit</span> :  <span>Add</span>} Product</h1>
           <div className="">
                <form name="productForm"  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                    <div>
                        <div>
                            <TextField id="product-name" name="productName" value={productName} required placeholder="Product Name" label="Enter product Name" onChange={ handleProductName}/>  
                        </div>
                        <div>
                            <TextField id="product-price" type="number" required name="productPrice"   value={productPrice}  placeholder="Enter Product price"  label="Product price" onChange={handleProductPrice} />
                        </div>
                    </div>  
                    <div>
                        <Button type="submit">Submit</Button>
                    </div> 
                </form>
           </div>
        </div>
    )
}

export default ProductEdit;