import axios from 'axios';


export const gellAllLocations= async ()=>{
    return await  axios(`http://localhost:5000/api/locations/getAllLocations`);
}


export const generateReport= async ()=>{
    return await  axios(`http://localhost:5000/api/locations/generateReport`);
}