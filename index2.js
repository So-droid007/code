const connectToMongo = require('./database/db')

const express = require('express')
const app = express()
const port = 3000

connectToMongo()

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Serve static files from the 'views' folder
// app.use(express.static('views'));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views/ejs'); // Specify the views directory

// Import your routes
const shadowRouter = require('./routes/shadowRouter');
const auth = require('./routes/auth')



// Use the routes
app.use(shadowRouter);

// routes for models 
app.use('/api/auth',auth);


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})