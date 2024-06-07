const localhost = "http://localhost:5000"
const UserLink = {
     siginUp:{
        url : `${localhost}/api/userSignUp`,
        method : "post"
     },
     login:{
        url : `${localhost}/api/userLogin`,
        method : "post"
     },
      userData:{
       url : `${localhost}/api/user-details`,
       method : "get"
     },
     logout : {
      url : `${localhost}/api/logout`,
       method : "get" 
     },
      allUser: {
      url : `${localhost}/api/userUser`,
      method : "get"
     },
     upadateRole:{
      url : `${localhost}/api/upadateRole`,
      method : "post"
     },
     uplaodePaper : {
      url : `${localhost}/api/uplaodePaper`,
      method : "post"
     },
     getPaper  :{
      url : `${localhost}/api/getPaper`,
      method : "get"
     },
     DeletePaper:{
      url : `${localhost}/api/DeletePaper`,
      method : "delete"
     },
     updatePaper:{
      url : `${localhost}/api/updatePaper`,
      method : "post"
     },
     catgery:{
      url : `${localhost}/api/catgery`,
      method : "post"
     }

}

export default UserLink;