const express = require('express');
const logger = require('morgan');
const app = express();
const path = require('path');

 const knex = require('./db/client');
//const rootRouter = require('./routes/root');
const cohortRouter = require('./routes/cohorts');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        return method;
    }
}))

//app.use('/', rootRouter);
app.use('/cohorts', cohortRouter);



app.get('/cohorts/new', (req, res) => {
    res.render('new');
})

// app.post('/cohorts',(req, res)=> {
//     knex('cohorts')
//     .insert({
//         logoURL: req.body.logoURL,
//         name:req.body.name,
//         members:req.body.members,
//     })
//     .orderBy('createdAt','desc')
//     .returning('*')
//     .then(data => {
//         res.redirect('/cohorts')
//     })
// })


// app.get('/cohorts',(req,res)=> {
//     knex('cohorts')
//     .orderBy('createdAt','desc')
//     .returning('*')
//     .then(data=> {
//         const cohorts = data
//         res.render('cohorts', {cohorts})
//     })
// })






const PORT = 4000
const ADDRESS = 'localhost'
app.listen(PORT, ADDRESS, () => {
    console.log(`listening to http://${ADDRESS}:${PORT}`)
})