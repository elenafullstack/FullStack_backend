const express = require('express')
const app = express()

app.use(express.json())
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

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
          "number": "12-43-234355",
          "id": 3
        },
        {
          "name": "Mary Poppendieck",
          "number": "39-23-6423122",
          "id": 4
        },
        {
            "name": "Maria Poppendieck",
            "number": "39-23-6423122",
            "id": 5
          }

      ]

     
      //morgan.token('body', (req, res) => JSON.stringify(res.body));
      //app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));
      app.use(morgan('tiny'))

      const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }

      function makeNumber(length) {
        var result           = '';
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
     
      app.get('/api/persons', (req, res) => {
        res.json(persons)
      })

      app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
        
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })

      app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
      })

      app.post('/api/persons', (request, response) => {
        const body = request.body

       
        

        if (!body.name) {
            return response.status(400).json({ 
              error: 'name missing' 
            })
    
       }  else if (persons.map(x=>x.name).includes(body.name)) {
        return response.status(400).json({ 
            error: 'Name is already in the phonebook' 
          })
      }

          const person = {
              name: body.name,
              number: makeNumber(8),
              id: generateId()
          }
        
        persons = persons.concat(person)
        response.json(person)


      })

      var amount = persons.length
      var phrase= 'Phonebook has info for ' + amount + ' persons' + '</br>' + '</br>' 

      app.get('/info', (req, res) => {
       res.send(phrase + new Date)
      })


const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})