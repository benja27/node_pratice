const express = require("express")
const app  = express()
const session = require('express-session')
const bodyparser = require('body-parser')
const path = require('path')

app.use(session({
  secret: 'hola'
}))

app.use(bodyparser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
  req.session.usuario = 'benja';
  req.session.rol = 'admin';   
  
  const filepath = path.join(__dirname, 'vistas', 'index.html');
  // console.log(filepath)  
  res.sendFile(  filepath)
})

app.post('/login', (req, res) => {
  const { username } = req.body;
  
  // Establece la sesión con el nombre de usuario proporcionado
  req.session.usuario = username;
  req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
  
  // Redirige a una página diferente
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  // Verifica si el usuario ha iniciado sesión
  if (!req.session.usuario) {
    res.redirect('/');
  } else {
    // Renderiza la página de panel de control
    res.sendFile(path.join(__dirname, 'vistas', 'dashboard.html'));
  }
});


app.listen(3000,(req, res) =>{
  console.log('server up')
})


