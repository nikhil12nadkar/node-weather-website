const request   =   require('request')

const forecast=(latitude,longitude,callback)=>{
    const url= "https://api.darksky.net/forecast/157dbc09a22bd4b3d4b4c5e697a421c2/"+latitude+","+longitude+""

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("something went wrong!!",undefined)
        }else if(body.error){
            callback("Unable to find forecast!!",undefined)
        }else{
            const data=body.currently
            const str="It is Currently "+data.temperature+" degree out. There is a "+data.precipProbability+"% chance of rain."
            callback(undefined,str) 
        }
    })
}

module.exports=forecast