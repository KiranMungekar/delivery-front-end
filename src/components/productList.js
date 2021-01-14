import React,{useEffect,useState} from 'react';
import {
   useHistory,
   useLocation
  } from "react-router-dom";
import {addProduct, getAllProducts} from '../services/productService';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const ProductList = ()=>{
    const [allProducts, setProducts] =new useState([]);
    const history= useHistory();
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async ()=>{
        const response= await getAllProducts();
        const data = response.data;
        console.log(data);
        if(data['status'] === 'success')
            setProducts(data['products']);
    }   

    const goToAddProduct= (id)=>{
        if(id != undefined && id != null){
            history.push(`product?id=${id}`)
           
        }else{
            history.push('/product')
        }
        
    }

    return (
        <div className="product-list">

            <div className="container">
                <div><h1>Product List</h1></div>
                <div style={{'display':'flex',justifyContent:'end'}}>
                    <Button variant="contained" color="primary" onClick={()=>goToAddProduct(null)} >Add Product</Button>
                </div>
                <div style={{'display':'flex',justifyContent:'flex-start',flexWrap:'wrap',}}>
                    {allProducts !== undefined ? allProducts.map((product, index)=> <ProductDisplay key={product._id} index={index} product={product} goToAddProduct={goToAddProduct} /> ): null}
                </div>
                
            </div>
        </div>
    )
}

//Product display;

const useStyles = makeStyles({
    root: {
      minWidth: 200,
      padding:30,
      marginTop:20,
      marginInline:30
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

  
const ProductDisplay = (props)=>{
    const classes = useStyles();
    

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Product {props.index+1}
                </Typography>
                <Typography variant="h5" component="h2">
                   {props.product.name}
                </Typography>
               
                <Typography variant="body2" component="p">
                    INR {props.product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>props.goToAddProduct(props.product._id)}>Edit</Button> <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    )
}

export default ProductList;