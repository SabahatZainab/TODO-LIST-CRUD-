const express = require('express'); // require package
const app = express(); // express.js minimal setup/container
const bodyParser = require('body-parser'); // add body parser //included in express js


//parse application/json
app.use(bodyParser.json()); //middleware = Postman/frontend data convert in json

// In Database we have a data (todos) which is array
let db = {
  todos:[{
    id: 0,
    name: 'TODO LIST NAME',
    List: ['item1','item2'],
    delete: false
  }]
}

// GET API - Send response to browser/frontend (get)
app.get('/', function (req, res) {
  const body = req.body;
  if(db.todos[body.id].delete){
    res.status(400).json({
      success: false,
      message: 'user not found'
    })
  }else{
  res.status(200).json({
    success: true,
    message: 'user found',
    todos: db.todos[body.id]
  })
}
})

// POST API - Send data from frontend to backend (create) (new data or field updated send to frontend from backend)
app.post('/', (req,res) => {
  const body = req.body;
  db.todos.push(body); //for array we use push method
  res.status(200).json({
    success:true,
    message: 'Data Added',
    todos: db.todos
  })
})

// PUT API - Send data from frontend to backend (update - whole data)
app.put('/', (req,res) => {
  const body = req.body;
  db.todos[0] = body;
    res.status(200).json({
    success:true,
    message: 'Successfully Updated',
    todos: db.todos[0]
  })
})

// PATCH API - Send data from frontend to backend (update - only few fields)
app.patch('/', (req,res) => {
  const body = req.body;
  db.todos[body.id].name = body.name;
  res.status(200).json({
    success:true,
    message: 'List Name Updated',
    todos: db.todos[body.id]
  })
})

// DELETE API - Send data from frontend to backend (delete - whole data)
app.delete('/', (req,res) => {
  const body = req.body;
  if(db.todos[body.id].id === body.id){
    db.todos[body.id].delete = 'true';
  res.status(200).json({
    success: true,
    message: 'User deleted',
   
  })
}else{
  res.status(400).json({
    success: 'false',
    message: 'data not deleted',
    
  })
}
})


app.listen(3000, (err) =>{
  if(err) console.log(err);
  else console.log("Server is Running on PORT 3000");
}); 


//API - Application Programming Interface
//API (GET, POST, PATCH, PUT , DELETE)

//semicolon is optional

//GET API - Send response to browser/frontend

