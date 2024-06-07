const {default : UserLink }  = require("../commen/index")

const fetchChatagery = async(subject)=>{
    const respons = await fetch(UserLink.catgery.url,{
        method:UserLink.catgery.method,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({subject : subject}),
    })
    const dataResponse = await respons.json();
    return dataResponse
}

export default fetchChatagery