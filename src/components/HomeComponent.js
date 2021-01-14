import React,{useEffect,useReducer,useState} from 'react';

import ProductList from './productList';

const HomeComponent= ()=>{
    return(
        <div>
            <div>
                <ProductList />
            </div>
        </div>
    )
}

export default HomeComponent;