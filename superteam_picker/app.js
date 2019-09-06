const express = require('express');
const logger = require('morgan');
const app = express();
const path = require('path');

const knex = require('./db/client');
const cohortRouter = require('./routes/cohorts');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')))


app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        return method;
    }
}))


app.get('/', (req, res)=> {
    res.redirect('cohorts/new')
})

// app.post('/new', (req, res)=> {
//   const createCohorts = {
//       name: req.body.name,
//       logoUrl: req.body.url,
//       members: req.body.members
//   };
//   knex
//       .insert(createCohorts)
//       .into('cohorts')
//       .returning('*')
//       .then((data) => {
//           const cohort = data[0]
//           res.redirect(`/cohorts/${cohort.id}`)
//       })

// })

// app.get('/cohorts/:id', (req, res)=>{
//     knex
//         .select('*')
//         .from('cohorts')
//         .where({
//             id: req.params.id
//         }).then((data) => {
//             console.log(data)
//             res.render('show', {
//                 cohort: data[0]
//             });
//         });
// })

// app.delete('/cohorts/:id', (req, res) => {
//     knex('cohorts')
//         .where({id: req.params.id})
//         .delete()
//         .then(() => {
//             res.redirect('/')
//         })
// })

// app.get('/cohorts/:id/edit', (req, res) => {
//     knex('cohorts')
//         .where({
//             id: req.params.id
//         })
//         .first()
//         .then((data) => {
//             res.render('edit', {
//                 cohort: data
//             })
//         })
// })




// app.patch('/cohorts/:id', (req, res) => {

//     knex('cohorts')
//         .where({
//             id: req.params.id
//         })
//         .first()
//         .update({
//             logoUrl: req.body.url,
//             name: req.body.name,
//             members: req.body.members
//         })
//         .then(() => {
//             res.redirect(`/cohorts/${req.params.id}`)
//         })
// })


app.use("/cohorts", cohortRouter)
const PORT = 8000
const ADDRESS = 'localhost'
app.listen(PORT, ADDRESS, () => {
    console.log(`listening to http://${ADDRESS}:${PORT}`)
})