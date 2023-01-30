const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

require('dotenv').config()


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {

    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    if (error.message.includes('unique')) {
      return response.status(400).json({ error:error.name })
    } else {
      
      response.status(400).send(error.message)
      console.log(response.data)
     
    }
  }

  next(error)
}


app.post('/api/persons', (request, response, next) => { //lisätään henkilö puhelinluetteloon
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
    .catch(error => next(error))
})

app.use(errorHandler)

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
    .then(response.status(204).end())
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true , runValidators: true, next })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

//Vanhaa backendia
/*let persons =
[
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  },
  {
    'name': 'asf',
    'number': '123',
    'id': 5
  }
]*/

const Person = require('./models/person')

//Vanhaa backendia
/*const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1

}*/

/*function makeNumber(length) {
  var result           = ''
  var characters       = '0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}*/

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})


app.get('/info', (req, res) => {
  Person.countDocuments().
    then(myCount => {
      res.send(('Phonebook has info for ' + myCount + ' persons' + '</br>' + new Date))
    })

})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `)
})



