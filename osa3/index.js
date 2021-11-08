const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

require('dotenv').config()


app.post('/api/persons', (request, response) => { //lisätään henkilö puhelinluetteloon
  const body = request.body

  if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    const person = new Person({
        name: body.name,
        number:body.number
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

})


  const errorHandler = (error, request, response, next) => {
    console.error(error.name)
   if (error.name === 'CastError') {
   
      return response.status(400).send({ error: 'malformatted id' })
   }
  
    next(error)
  }


  app.get('/api/persons/:id', (request, response, next) => { //get yksittäinen puhelinnumero + virheet
   
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()   
      }
      })
      .catch(error =>  next(error))
  })

   app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result=> {
      response.status(204).end()
    })
     .catch(error=> next(error))
  })


  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.use(errorHandler)


let persons = 
[
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
    "name": "asf",
    "number": "123",
    "id": 5
  }
]

const Person = require('./models/person')
     

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
        Person.find({}).then(person => {
        res.json(person)
      })
    })

      

      var amount = persons.length
      var phrase= 'Phonebook has info for ' + amount + ' persons' + '</br>' + '</br>' 

      app.get('/info', (req, res) => {
       res.send(phrase + new Date)
      })



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT} `)
})