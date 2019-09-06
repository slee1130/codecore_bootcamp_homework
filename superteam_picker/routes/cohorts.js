const express = require('express')
const router = express.Router()
const knex = require('../db/client')

router.get('/', (req, res) => {
    knex
        .select('*')
        .from('cohorts')
        .then((data) => {
            res.render('home', {
                data: data
            });
        });
})

router.get('/new', (req, res) => {
    res.render('new');
})

router.post('/new', (req, res) => {
    const createCohorts = {
        name: req.body.name,
        logoUrl: req.body.logoUrl,
        members: req.body.members
    };
    console.log(req.body);
    knex
        .insert(createCohorts)
        .into('cohorts')
        .returning('*')
        .then((data) => {
            console.log(data);

            const cohort = data[0]
           //res.redirect(`/cohorts/${data[0].id}`)
           res.render('show', {
               cohort: {
                   id: req.params.id,
                   name: req.body.name,
                   members: req.body.members
               },
               teams: data[0]
           })
        })

})


// router.get("/:id", (req, res) => {
//     let id = parseInt(req.params.id)
//    console.log(`id-1 is here: ${id}`)
//     knex("cohorts")
//         .select("*")
//         .where({
//             id
//         })
//         .then((data) => {
//             console.log(`id-2 is here: ${id}`)
//            console.log(data[0]);
//             //let teamsArr = teamsDivided(data[0].members);
//             console.log(teamsArr);

//             res.render('show', {
//                                cohort: {
//                                    id: req.params.id,
//                                    name: req.body.name,
//                                    members: req.body.members
//                                },
//                                teams: teamsArr
//                            })
//         })
// })

function shuffle (array) {
    let currentIndex = array.length;
    let tempValue, randomIndex;
    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}
function assignTeamByTeamCount(arr,val) {
    let result = [];
    let x = Math.floor(arr.length / val);
    let y = arr.length % val;
    for (let j = 0; j < val; j++) {
        let temp = [];
        for (let i = 0; i < x; i++) {
            temp.push(arr[(i + j * x)]);
        }
        result.push(temp);
    }
    if (y!=0) {
        for (let i = 0; i < y; i++) {
            result[i].push(arr[(x*val+i)]);
        }
    }
    return result;
}

function assignTeamByMembersCount(arr, val) {
    let result = [];
    let x = Math.floor(arr.length / val);
    let y = arr.length % val;
    for (let j = 0; j < x; j++) {
        let temp = [];
        for (let i = 0; i < val; i++) {
            temp.push(arr[(i + j * val)]);
        }
        result.push(temp);
    }
    if (y != 0) {
        result.push(arr.slice(val * x));
    }
    return result;
}

// function teamsDivided (value) {
//     let teams = [];
//     for (let i=0; i < value; i++){
//         teams.push([])
//     }
//     return teams;
// }



router.get('/:id',(req,res)=> {
    const id = req.params.id
    const {method, quantity} = req.query
    knex('cohorts')
        .where({id: req.params.id})
        .then((data)=> {
            if(req.query.method && req.query.quantity) {
                const dividedMembers = data[0].members.split(',');
                const shuffleMembers = shuffle(dividedMembers);
                let teams;
                if (method === 'teamCount') {
                    teams = assignTeamByTeamCount(shuffleMembers, quantity);
                } else if (method === 'numberPerTeam') {
                    teams = assignTeamByMembersCount(shuffleMembers, quantity)
                }
                res.render('show', {cohort: data[0],
                    shuffleMembers: shuffleMembers,
                    method:method,
                    quantity:quantity,
                    teams: teams})

            } else {
                res.render('show', {
                    cohort: data[0],
                    shuffleMembers: null,
                    method: null,
                    quantity: null,
                    teams: []
                })
        }})


})


router.delete('/:id', (req, res) => {
    knex('cohorts')
        .where({
            id: req.params.id
        })
        .delete()
        .then(() => {
            res.redirect('/')
        })
})

router.get('/:id/edit', (req, res) => {
    knex('cohorts')
        .where({
            id: req.params.id
        })
        .first()
        .then((data) => {
            res.render('edit', {
                cohort: data
            })
        })
})

router.patch('/:id', (req, res) => {
    knex('cohorts')
        .where({
            id: req.params.id
        })
        .first()
        .update({
            logoUrl: req.body.logoUrl,
            name: req.body.name,
            members: req.body.members
        })
        .then(() => {

            res.redirect(`/cohorts/${req.params.id}`)
        })
})

module.exports = router