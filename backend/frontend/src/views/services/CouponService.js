import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
console.log(cookies)
export default {
    getCoupons : ()=>{
        return fetch('/merchant/getCoupons')
                .then(response=>{
                    if(response.status !== 401){
                        // response.json().then((data) =>{
                        //     console.log('hook');
                        //     console.log(data);
                        //     return data //response.json().then(data => data);

                        // })

                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    }
}