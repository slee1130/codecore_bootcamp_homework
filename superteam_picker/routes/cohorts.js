const express = require('express')
const router = express.Router()
const knex = require('../db/client')


router.get('/new', (req, res) => {
    res.render('new')
})




router.post('/', (req, res) => {
    // const logoUrl = req.body.logoUrl;
    // const name = req.body.name;
    // const members = req.body.members;
    const newCohort = {
        logoUrl: logoUrl,
        name: name,
        members: members
    }
    knex("cohorts").insert(newCohort).returning("*")
        .then((cohorts) => {
            res.redirect(`/cohorts/${cohort.id}`);
        })
})

router.get('/:id/form', (req,res)=> {
    const id= req.params.id
    knex('cohorts')
    .where({id:id})
    .first()
    .then((cohort)=> {
        res.render('show', {
            cohort:cohort,
            method:method,
            quantity:quantity,
            members:members,
        })
    })
})

router.get('/:id', (req,res)=> {
    const id=req.params.id
    knex('cohorts')
    .where({id:id})
    .first()
    .then((cohort)=> {
        const method = req.body.method
        const quantity = req.body.quantity
        const members = cohort.members;
        const setTeams = []
        res.render('show', {
            cohort:cohort,
            method:method,
            quantity:quantity,
            members:members,
            setTeams:setTeams
        })
    })
})



router.get('/', (req, res) => {
    knex('cohorts')
        .orderBy('createdAt', 'desc')
        .then((cohorts) => {
            res.render('cohorts', {cohorts})
        });
});



router.delete('/:id', (req,res)=> {
    const id=req.params.id
    knex('cohorts')
    .where({id:id})
    .delete()
    .then(()=> {
        res.redirect('/cohorts')
    })
})


router.get('/:id/edit',(req,res)=> {
    const id=req.params.id
    knex('cohorts')
    .where({id:id})
    .first()
    .then((cohort)=> {
        res.render('edit',{cohort})
    })
})

router.patch('/:id',(req,res)=> {
    const id =req.params.id
    knex('cohorts')
    .where({id:id})
    .update({
        logoUrl:req.body.logoUrl,
        name:req.body.name,
        members:req.body.members
    })
    .then (()=> {
        res.redirect(`/cohorts/${req.params.id}`)
    })
})


module.exports = router