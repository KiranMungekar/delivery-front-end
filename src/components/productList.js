import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {
   useHistory,
   useLocation
  } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const ProductList = ()=>{
    const [allProducts, setProducts] =new useState([]);
    
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async ()=>{
        const response= await axios.get('http://localhost:5000/api/products/getAllProduct');
        const data = response.data;
        console.log(data);
        if(data['status'] === 'success')
            setProducts(data['products']);
    }   

    return (
        <div className="product-list">
            {allProducts !== undefined ? allProducts.map((product, index)=> <ProductDisplay key={product._id} index={index} product={product} /> ): null}
        </div>
    )
}

//Product display;

const useStyles = makeStyles({
    root: {
      minWidth: 200,
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
    const history= useHistory();
    const openProductDetails=(id)=>{
        history.push(`product?id=${id}`)
    }

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
                <Button size="small" onClick={()=>openProductDetails(props.product._id)}>Edit</Button> <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    )
}

export default ProductList;