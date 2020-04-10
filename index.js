const http = require('http')
const url = require('url')


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
    }
  ]

const handleReq = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })

    let path = url.parse(req.url).pathname

    if(path === '/api/persons') {
        res.end(JSON.stringify(persons))
    }
    else {
        res.writeHead(404)
        res.write('please try path /api/persons', res)
        res.end()
    }
}

const app = http.createServer(handleReq)    

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)