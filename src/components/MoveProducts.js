import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {gellAllLocations} from '../services/locationService';
import {getAllProducts,createMovement} from '../services/productService';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';

const MoveProduct=()=>{
    const [showAddBtn, setShowAddBtn]= useState(true);
    const [products, setProducts]= useState([]);
    const [locations, setLocations]= useState([]);


    const getProducts = async ()=>{
        const response= await getAllProducts();
        const data = response.data;
        console.log(data);
        if(data['status'] === 'success')
            setProducts(data['products']);
    }

    const loadLocations=async ()=>{
        const response= await gellAllLocations();
        if(response.status == 200 && response.data['status'] === 'success'){
            setLocations(response.data['locations']);
        }
    }

    const handleShowBtn =()=>{
        setShowAddBtn(false);   
    }

    useEffect(()=>{
        getProducts();
        loadLocations()
    },[])

    return(
        <div >
            {showAddBtn ?
             <div style={{display:'flex', justifyContent:'end'}}> <Button variant="contained" color="primary" onClick={handleShowBtn}>Move Product</Button> </div> 
             : <MoveProductForm  locations={locations} products={products}/>}
        </div>
    )
}

const MoveProductForm= ({locations,products})=>{
    
    const [fromLocation, setFromLocation]= useState("");
    const [toLocation, setToLocation]= useState("");
    const [productId, setProductId]= useState("");
    const [productQty, setProductQty]= useState(0);

    const handleFromLocationChange= (e)=>{
        console.log(e.target.value);
        setFromLocation(e.target.value)
    }

    const handleToLocationChange= (e)=>{
        console.log(e.target.value);
        setToLocation(e.target.value)
    }

    const handleProductChange = (e)=>{
        console.log(e.target.value);
        setProductId(e.target.value)
    }

    const handleProductQty= (e)=>{
        setProductQty(e.target.value)
    }

    const handleSendProduct= async (e)=>{
       
        if(fromLocation === toLocation){
            alert('Both from and to destinations are same');
            return
        }
        if(toLocation == null || toLocation === ''){
            alert('To destinations cannot be empty');
            return
        }
        console.log(fromLocation,toLocation,productId,productQty);

        const response= await createMovement(fromLocation,toLocation,productId,productQty);
        if(response.status === 201 && response.data['status']=== 'success'){
            alert('Product moved!!')
            window.location.reload();
        }else{
            alert(response.data['reason'])
        }

    }

    return(
        <div>
            <div>
                <h5> Move product </h5>
            </div>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                
                <div>
                    <FormControl style={{minWidth: 200}}>
                        <InputLabel id="demo-simple-select-label">{"From Location"}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fromLocation}
                                onChange={handleFromLocationChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {locations.map((location,index)=> <MenuItem key={index} value={location._id}>{location.locationName}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                
                <div>
                    <FormControl style={{minWidth: 200}}>
                            <InputLabel id="demo-simple-select-label">{"To Location"}</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleToLocationChange}
                            value={toLocation}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {locations.map((location,index)=> <MenuItem key={index} value={location._id}>{location.locationName}</MenuItem>)}
                            </Select>
                    </FormControl>
                </div>
               
                <div>
                    <FormControl style={{minWidth: 200}}>
                            <InputLabel id="demo-simple-select-label">{'Select Product'}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productId}
                                onChange={handleProductChange}
                            >
                            {products.map((location,index)=> <MenuItem key={index} value={location._id}>{location.name}</MenuItem>)}
                            </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField id="product-qty" type="number" required name="productQty"   value={productQty}  placeholder="Enter Product Qty"  label="Product Qty" onChange={handleProductQty}/>
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={handleSendProduct} >Send</Button>
                </div>

            </div>
        </div>
    )
}

const SelectLocation = ({locations,label,handleChange})=>{
   
    return (
        <FormControl style={{minWidth: 200}}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={()=>handleChange}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {locations.map((location,index)=> <MenuItem key={index} value={location._id}>{location.locationName}</MenuItem>)}
            </Select>
      </FormControl>
    )
}

const SelectProduct = ({products,handleProductChange})=>{
    return (
        <FormControl style={{minWidth: 200}}>
            <InputLabel id="demo-simple-select-label">{'Select Product'}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={()=>handleProductChange}
            >
            {products.map((location,index)=> <MenuItem key={index} value={location._id}>{location.name}</MenuItem>)}
            </Select>
      </FormControl>
    )
}

export default MoveProduct;