const express = require('express')
const app = express()
const validate = require('validator')

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.
app.get('/greetings/:name', (req,res)=>{
    res.send(`Hello there, ${req.params.name}`)
})

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
app.get('/roll/:rollNumber',(req,res)=>{
    //const rollNumber = (req.params.rollNumber)
    if (validate.isNumeric(req.params.rollNumber)){
        const roll = Math.floor(Math.random() * req.params.rollNumber)
        res.send(`you rolled a ${roll}`)
    }
    else {
    res.send("you must specify a number")
    }
})

// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index' , (req,res)=>{
    const index = parseInt(req.params.index)
    
    if ( index > 0 && index < collectibles.length){
        const item = collectibles[index]
       
        res.send(`So you want the ${item.name}? For ${item.price}, it can be yours!`)

    }else{

        res.send("This item is not yet in stock. Check back soon!")
    }
    
  })


//   4. Filter Shoes by Query Parameters
// Use the following array of shoes in this challenge:
// 
// Task: Create a route /shoes that filters the list of shoes based on query parameters.

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

  app.get ('/shoes', (req, res) => {
    let AllShoes = shoes
    const minPrice = Number(req.query.minPrice)
    const maxPrice = Number(req.query.maxPrice)
    const type =  req.query.type
    if (minPrice){
        AllShoes = AllShoes.filter((shoe)=> shoe.price >= minPrice)
    }
    if (maxPrice){
        AllShoes = AllShoes.filter((shoe)=> shoe.price <= maxPrice)
    }
    if (type){
        AllShoes = AllShoes.filter((shoe)=> shoe.type === type)
    }
    res.send(AllShoes)

  })



app.listen(3000,()=>{
    console.log('listening on port 3000');
    
})
