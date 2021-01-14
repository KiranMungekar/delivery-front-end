import React, { useEffect, useState } from 'react';
import {getAllProductMovements} from '../services/productService';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MoveProduct from './MoveProducts'

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      marginTop:20,
      marginInline:20
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
      marginBottom: 5,
    },
  });

const TransportProduct = () => {
    
    const [productMovements, setProductMovements] = useState([]);

    const loadMovements = async()=>{
        const response= await getAllProductMovements();
        console.log(response);
        if(response.status === 200 && response.data['status'] === 'success'){
            setProductMovements(response.data['products']);
            console.log(response.data['products'])
        }
    }

    useEffect(()=>{
        loadMovements();
    }, [])

    return(
        <div>
            <h1>Transport Information</h1>
            <MoveProduct />
            <div style={{display:'flex', justifyContent:'space-between',flexWrap:'wrap'}}>
                {productMovements.length > 0 ? productMovements.map(move=><TransportMovementDisplay {...move}/> ) : null}
            </div>
        
        </div>
    )    
}


const TransportMovementDisplay = (props)=>{
    const classes = useStyles();
    console.log(props);
    return(
            <Card className={classes.root}>
                <CardContent style={{textAlign:'center'}}>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                    </Typography> */}
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                        <div>
                            <Typography variant="body2" component="p">
                                {"From"}
                            </Typography>
                            
                            <Typography variant="h6" component="h6">
                                {props.from_location !== undefined && props.from_location !== null ? props.from_location.locationName : "-"}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" component="p">
                                {"To"}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                {props.to_location.locationName}
                            </Typography>
                        </div>
                    </div>
                    <div style={{paddingTop:10,paddingInline:30}}>
                    <Typography className={classes.pos} color="textSecondary">
                        Product: {props.product.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                   
                    <br />
                    Qty: {props.qty}
                    </Typography>
                    </div>
                </CardContent>
                <CardActions style={{display:'flex', justifyContent:'end'}}>
                    <Button >Delete</Button>
                </CardActions>
            </Card>
                
        
    )
}

export default TransportProduct;

