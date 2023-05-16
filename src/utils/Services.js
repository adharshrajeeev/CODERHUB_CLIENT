import jwtDecode from "jwt-decode";



export default function decodeToken(){
    try{
        const token=localStorage.getItem('token');
        if(!token) return window.location.href('https://www.coderhub.cloud');
        const {id}=jwtDecode(token);
        return id
        
    }catch(err){
        return  window.location.href('https://www.coderhub.cloud');
    }
}


const adminToken=localStorage.getItem('adminToken');




export const adminConfig={
    headers:{
        Authorization:`Bearer ${adminToken}`,
    }
}
