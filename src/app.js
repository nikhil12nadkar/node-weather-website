const geocode   =   require('./utils/geocode')
const forecast  =   require('./utils/forecast')
const path      =   require('path')
const express   =   require('express')
const hbs       =   require('hbs')
const app       =   express()

console.log(__dirname)
console.log(__filename)

//define path for Express config
const staticDirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//set up handlebars engine  and locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(staticDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Nikhil Nadkar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Nikhil Nadkar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'welcome to the help page!!',
        title:'Help',
        name:'Nikhil Nadkar'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide Address!!'
        })
    }
    var searchterm=req.query.address
    geocode(searchterm,(error,{latitude,longitude,location}={})=>{
        if(error){
            return  res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }   
            res.send({
                forecast:forecastdata,
                location:location,
                address:req.query.address
            })
        })
    })

})

app.get('/product',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'Please provide search!!'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nikhil Nadkar',
        errorMessage:'Help Article Not Found!!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nikhil Nadkar',
        errorMessage:'Page Not Found!!'
    })
})

app.listen(3000,()=>{
    console.log('server running on port 3000')
})