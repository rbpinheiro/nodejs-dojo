import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser'

export const dojoDB = mongoose.connect('mongodb://dojo-rbs:rbs-dojo@ds019926.mlab.com:19926/dojo-rbs')

export const app = express();

function start() {
  app.listen(3001, () => {
    console.log('listennnnnnn....');
  });

  app.use(bodyParser.json()); // for parsing application/json

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/todos', (req, res) => {
    
    Todo.find(function (err, todos) {
      if (err) return res.status(500).send(err);
      res.send(todos);
    })

  });

  app.post('/todos', (req, res) => {
    var todo = new Todo(req.body);
    todo.save((err, todo) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(todo);
    });
    
  });

  // app.get('/todos/:id', (req, res) => {
  //   Todo.find({_id: req.params.id}, req.body, (err, todo) => {
  //     if (err) return res.status(500).send(err);
  //     return res.send(todo);
  //   });   
  // });

  app.put('/todos/:id', (req, res) => {  
    Todo.update({_id: req.params.id}, req.body, (err, todo) => {
      if (err) return res.status(500).send(err);
      return res.send(todo);
    });   
  });

};
var todoSchema = mongoose.Schema({
    text: String,
    completed: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

start();