const axios = require('axios')
const http = require('http')
const url = require('url')
const fs = require('fs')

//creando JSON con el nombre y la imagen 
let pokeData = [] 
getData().then((data) => {
    data.forEach(e => {
        getImg(e.name).then((r) => {
            let pokeInfo = new Object()
            pokeInfo.nombre = e.name
            pokeInfo.img = r
            pokeData.push(pokeInfo)

         
            fs.writeFile("poke.json", JSON.stringify(pokeData), "utf-8", () => {
                
            })

        })
        
    })
})

//Obteniendo el nombre 
async function getData(){
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon-form?offset=0&limit=150')
    return data.results
}
//Obteniendo Imagen
async function getImg(name){
    const imagen = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${name}`)
        let img = imagen.data.sprites.front_default
    return img
}

//Creando servidor 
http.createServer ((req, res) =>{
    if (req.url.includes("/pokemones")) {
        res.writeHead(200, {"content-type" : "text/html"})
        fs.readFile("poke.json", "utf-8", (err, data) => {
            res.end(data)
        })
        
    if (req.url.includes('/')) {
        res.writeHead(200, {"content-type" : "text/html"})
        fs.readFile("index.html", "utf-8", (err, data) => {
        res.end(data)
     })
    }
    //Habilitando ruta /Pokemones 
     
 }  
   
}).listen(3000, () => console.log("Server ON"))


