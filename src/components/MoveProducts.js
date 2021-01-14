import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {gellAllLocations} from '../services/locationService';
 
const MoveProduct=()=>{
    const [showAddBtn, setShowAddBtn]= useState(true);



    return(
        <div >
            {showAddBtn ?
             <div style={{display:'flex', justifyContent:'end'}}> <Button variant="contained" color="primary">Move Product</Button> </div> 
             : null}
        </div>
    )
}

const SelectProduct= (location)=>{
    return(
        <div style={{}}>

        </div>
    )
}

export default MoveProduct;