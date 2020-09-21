// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// export default {
//     login : user =>{
//         console.log(user);
//         return fetch('/user/login',{
//             method : "post",
//            // credentials : "include",
//             body : JSON.stringify(user),
//             headers : {
//                 'Content-Type' : 'application/json'
//             }
//         }).then(async res => {
//             if(res.status !== 401)
//             {

//                 // return res.json().then((data) =>{
//                 //     document.cookie = `token=${datatoken}`

//                 //      data
//                 const data = await res.json();
//                 //document.cookie = `email=${data.user};
//                 cookies.set('access_token', data.token, { path: '/' });

//                 return data;
//                 //});
//             }
//             else
//                 return { isAuthenticated : false, user : {username : "",role : ""}};
//         })
//     },
//     register : user =>{
//         console.log(user);
//         return fetch('http://127.0.0.1:5000/user/register',{
//             method : "post",
//             body : JSON.stringify(user),
//             headers : {
//                 'Content-Type' : 'application/json'
//             }
//         }).then(res => res.json())
//           .then(data => data);

//     },
//     addMerchant : data =>{
//         console.log(data);
//         //data['id'] = document.cookie;
//         console.log(cookies.get('email'));

//         return fetch('http://127.0.0.1:5000/merchant/add',{
//                     method : "post",
//                     body : JSON.stringify(data),
//                     headers : {
//                         'Content-Type' : 'application/json'
//                        // 'email'        :  cookies.get('email')
//                     },
//                     credentials : "include",

//                 }).then(res => res.json())
//                   .then(data => console.log(data))
//                   .catch(err => console.log(err));
//     },
//     logout : ()=>{
//         return fetch('http://127.0.0.1:5000/user/logout')
//                 .then(res => res.json())
//                 .then(data => data);
//     },
//     isAuthenticated : ()=>{
//         return fetch('/user/authenticated')
//                 .then(res=>{
//                     if(res.status !== 401)
//                         return res.json().then(data => data);
//                     else
//                         return { isAuthenticated : false, user : {username : "",role : ""}};
//                 });
//     },

//     generateKey : ()=>{
//         console.log(cookies.get('email'));
//         return fetch('http://127.0.0.1:5000/merchant/generateApiKey')
//                 .then(response=>{
//                     if(response.status !== 401){
//                         // response.json().then((data) =>{
//                         //     console.log('hook');
//                         //     console.log(data);
//                         //     return data //response.json().then(data => data);

//                         // })

//                         return response.json().then(data => data);
//                     }
//                     else
//                         return {message : {msgBody : "UnAuthorized",msgError : true}};
//                 });
//     },

//     getKey : ()=>{
//         return fetch('http://127.0.0.1:5000/merchant/getApiKey')
//                 .then(response=>{
//                     if(response.status !== 401){
//                         // response.json().then((data) =>{
//                         //     console.log('hook');
//                         //     console.log(data);
//                         //     return data //response.json().then(data => data);

//                         // })

//                         return response.json().then(data => data);
//                     }
//                     else
//                         return {message : {msgBody : "UnAuthorized",msgError : true}};
//                 });
//     },

//     getProfile :()=>{
//         return fetch('http://127.0.0.1:5000/merchant/profile?email='+cookies.get('email'),{
//             method : "get",
//             credentials : "include"

//         })
//         .then((response)=>{
//             if(response.status !== 401){
//                 // response.json().then((data) =>{
//                 //     console.log('hook');
//                 //     console.log(data.profile);
//                 //     return data.profile //response.json().then(data => data);

//                 // })

//                return response.json().then(data => data);
//             }
//             else
//                 return {message : {msgBody : "The profile does not exist",msgError : true}};
//         }).catch((err) => {
//             return {message : {msgBody : "There was an error finding your profile",msgError : true}}
//         });
//     }

// }
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
 //http://127.0.0.1:5000
 export default {
    login : user =>{
        console.log(user);
        return fetch('/user/login',{
            method : "post",
            //credentials : "include",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(async res => {
            if(res.status !== 401)
            {

                return res.json().then(data => data);
                //     document.cookie = `token=${datatoken}`

                //      data
                //const data = await res.json();
                //document.cookie = `email=${data.user};
                //cookies.set('token', data.token, { path: '/' });

            }
            else
                return { isAuthenticated : false, user : {username : "",role : "nope"}};
        })
    },
    register : user =>{
        console.log(user);
        return fetch('/user/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);

    },
    addMerchant : data =>{
        //console.log(data);
        //data['id'] = document.cookie;
        //console.log(cookies.get('email'));
      console.log(data);
        return fetch('/merchant/add',{
                    method : "post",
                    body : JSON.stringify(data),
                    headers : {
                        'Content-Type' : 'application/json'
                       // 'email'        :  cookies.get('email')
                    },
                    credentials : "include",

                }).then(res => res.json())
                  .then(data => console.log(data))
                  .catch(err => console.log(err));
    },
    logout : ()=>{
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : ()=>{
        return fetch('/user/authenticated')
                .then(res=>{
                    //console.log(res);
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {username : "",role : ""}};
                });
    },

    generateKey : ()=>{
        //console.log(cookies.get('email'));
        return fetch('/merchant/generateApiKey')
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
    },

    getKey : ()=>{
        return fetch('/merchant/getApiKey')
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
    },

    getProfile :()=>{
        return fetch('/merchant/profile',{
            method : "get",
            credentials : "include"

        })
        .then((response)=>{
            if(response.status !== 401){
                // response.json().then((data) =>{
                //     console.log('hook');
                //     console.log(data.profile);
                //     return data.profile //response.json().then(data => data);

                // })

               return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "The profile does not exist",msgError : true}};
        }).catch((err) => {
            return {message : {msgBody : "There was an error finding your profile",msgError : true}}
        });
    }

}
