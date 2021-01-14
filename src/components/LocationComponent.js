import React, {useState, useEffect,useLayoutEffect} from 'react';
import {gellAllLocations} from '../services/locationService';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      textAlign:'center'
    },
}));

const LocationsComponent = () => {
    const [locations, setLocations] = useState([]);
    const classes = useStyles();
    const loadLocations=async ()=>{
        const response= await gellAllLocations();
        if(response.status == 200 && response.data['status'] === 'success'){
            setLocations(response.data['locations']);
        }
    }

    useEffect(()=>{
        loadLocations();
    },[])

    return (
        <div >
            <div style={{display:'flex',justifyContent:'center'}}>
                <h1>All Locations</h1>
            </div>
            <div className="" style={{display:'flex',justifyContent:'center'}}>
                <div className={classes.root}>
                    <List> 
                        {locations !== undefined && locations.length > 0 ? locations.map(location=> <LocationDisplayComponent  key={location._id} location={location}/>)  :null}
                    </List>
                       
                </div>
                 
            </div>
            <div style={{'display':'flex',justifyContent:'center'}}>
                <Button variant="contained" color="primary">Add Location</Button>
            </div>


        </div>
    )    
}




const LocationDisplayComponent =({location})=>{
    
    return(
        
            <div>
                <ListItem>
                    <ListItemText
                    primary={location.locationName}/>
                    <ListItemSecondaryAction>
                        <Button >Edit</Button>
                        <Button >Delete</Button>
                  </ListItemSecondaryAction>
                </ListItem>
                
            </div>
        
            
        
    )
}

export default LocationsComponent;
