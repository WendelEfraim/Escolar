const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
  express.urlencoded({
    extended:true,
  }),
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//CADASTRAR LIVRO

app.get('/postar', (req,res) => {
    res.render('postar')
})

app.post('/books/insertbooks',(req,res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`
  
  conn.query(sql, function(err){
    if(err) {
      console.log(err)
    }
    
    res.redirect('/postar')
  })
})

//MOSTRAR NA TELA LIVROS CADASTRADOS

app.get('/books',(req,res) =>{
  const sql = 'SELECT * FROM books'

  conn.query(sql, function(err, data){

    if(err) {
      console.log(err)
      return
    }

    const books = data
    console.log(books)
    
    res.render('books', { books })
  })
})


app.get('/books/:id', (req,res) => {

  const id =req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`

  conn.query(sql, function(err, data) {
    if(err) {
      console.log(err)
      return
    }
    
    const lista = data[0]

    res.render('lista', { lista })
  })

})

//ENTRAR NO MYSQL

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Escola'
})

conn.connect(function(err){

  if(err) {
    console.log(err)
  }

  console.log('Conectou ao MYSQL!')

  app.listen(3000)
})