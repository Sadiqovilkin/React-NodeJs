const express=require("express")
const app=express()
const PORT=7070
const cors= require("cors")

const data = [
    {
        id:"1",
        title:"Phone"
    },
    {
        id:"2",
        title:"Computer"
    },
    {
        id:"3",
        title:"watch"
    },
    {
        id:"4",
        title:"neckles"
    },
]

app.get('/api/data', (req, res) => {
    const {title} = req.query
    if(title){
        let filteredData =  data.filter((x)=> x.title.toLowerCase().trim().includes(title.toLowerCase().trim()))
        res.send(filteredData)
    }
    else{
        res.send(data)

    }
  })
  app.get('/api/data/:id', (req, res) => {
    const {id}= req.params
    console.log(id)
    let found = data.find((x)=>x.id == id)

    res.send(found)
  })
app.listen(PORT,()=>{
    console.log(PORT)
})