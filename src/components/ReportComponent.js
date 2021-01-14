import React, { useState,useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import {generateReport} from '../services/locationService';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    paperDark: {
        padding: theme.spacing(2),
        textAlign: 'center',
        fontWeight:600,
        backgroundColor:'#777D7C',
      }
  }));


const ReportComponent = ()=>{
    const [report, setReport]= useState([]);
    const classes = useStyles();

    const loadReport=async ()=>{
        const response= await generateReport();
        if(response.status === 200 && response.data['status']=== 'success'){
            const transformedReport= response.data['report'].map(item=>{
                return{
                    "location":item.location,
                    "products":transformToGrid(item.inventory),
                    "balance":item.totalBalance
                }
            });
            console.log(transformedReport);
            setReport(transformedReport); 
        }
    }

    const transformToGrid= (products)=>{

        if(products != null && products.length > 0){
           return products.map(product=>{
                return(
                    <div key={product.productName} style={{display:'flex', justifyContent:'space-around'}}>
                        <Typography variant="span" component="span">
                            {"Product Name"}: {product.productName}
                        </Typography>
                        <Typography variant="span" component="span">
                            {"Qty"}: {product.qty}
                        </Typography>
                    </div>
                )
            })
            
        }else{
            return null;
        }
        
    }

    const columns = [
        { field: 'Location' },
        { field: 'Products', width: 150 },
        { field: 'Balance Qty', width: 80, type: 'number' },
    ];

    useEffect(()=>{
        loadReport();
    },[])


    

    return(
        <div>
            <div style={{textAlign:'center'}}>
                <h1>Warehouse Report</h1>
            </div>
            <div className="container">
                <div className={classes.root}>
                    
                    <Grid   container  
                            direction="row"
                            justify="center"
                            alignItems="center" spacing={0}>
                        {columns.map(col=> {return(<Grid key={col.field} item xs={4}><Paper className={classes.paperDark}>{col.field}</Paper></Grid>)})}  
                    </Grid>
                  
                    {report.length > 0 ?
                        <div> 
                            {report.map((item,index)=><CreateGridLayout key={index} item={item} index={index}/>)}
                        </div>
                    :null}
                         
                    
                </div>
            </div>

        </div>
    )
}


const CreateGridLayout=({item}, index)=>{
    const classes = useStyles();
    return(
        <Grid  container  
                                direction="row"
                                justify="center"
                                alignItems="center" spacing={0}>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>{item.location}</Paper>
                                </Grid>
                                <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    { item.products !=null ? item.products.map((prod,index)=><div key={index} >{prod}</div>) : (<div>No Products available</div>)}
                                    </Paper>
                                </Grid>
                            
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>{item.balance}</Paper>
                                </Grid>
        </Grid>
    )
}

export default ReportComponent;



{/* <Paper className={classes.paper}>
{ item.products !=null ? item.products.map((prod,index)=><div key={index} >prod</div>) : (<div>No Products available</div>)}
</Paper> */}