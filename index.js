
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('body', function getBody (req) {
  return JSON.stringify( req.body )
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },    
    {
      "name": "Jiihu",
      "number": "39-23-6456722",
      "id": 5
    }

  ]

  app.get('/', (req, res) => {
    res.send('<a href="/api/persons">try this</a>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find(person => {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id)
        return person.id === id
      })

      if (person){
    res.json(person)
      }
      else{
        res.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (req, res) =>{

      const id = Number(req.params.id)
      persons = persons.filter(persons => {
        return persons.id !== id
    })
    res.status(204).end()
  })

const generateId = () => {
  
    return Math.floor(Math.random() * Math.floor(9999999));

}


  app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(persons.map(p => p.name).indexOf(body.name))
    console.log(persons.map(p => p.name.indexOf(body.name)))

    if (!body.name || !body.number){
      
      return res.status(400).json({
        error: "missing name or number"
      })
    }
    
    else if (persons.map(p => p.name).indexOf(body.name) >= 0 ){

        return res.status(400).json({
          error: "name must be unique"
        })
    }
    else{
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    persons = persons.concat(person)
    res.json(person)
    
    }
  })

    app.get('/info', (req, res) => {
        const d = new Date()
    res.send(`<div>Phonebook has info for ${persons.length} people</div><br></br><div>${d} (Eastern European Standard Time)</div>`)
  })  


const port = 3001
app.listen(port, () => {
console.log(`server running on port ${port}`)

})

