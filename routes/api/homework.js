var express = require('express');
var router = express.Router();
let {auth, permit} = require('../../functions/authentication');
let Course = require('../../models/course.model');
let Homework = require('../../models/homework.model');


router.get('/', (req, res) => {

    Homework.find({}).then((homeworks) => {
        res.send({
            status: "success",
            data: {
                homeworks: homeworks
            }
        })
    }).catch(error => {
        res.send({
            status: "error",
            error: err
        })
    })

});
router.get('/:id', (req, res) => {

    Homework.findById(req.params.id, (err, homework) => {
        if (err)
            return res.send({
                status: "error",
                error: err
            });
        return res.send({
            status: "success",
            data: {
                homework: homework
            }
        })


    });

});
router.post('/', auth, permit('teacher'), (req, res) => {

    let homework = new Homework(req.body);
    homework.save(err => {
        if (err)
            res.send({
                status: "error",
                error: err
            });
        res.send({
            status: "success",
            data: {
                message: "homework added successfully"
            }
        })
    })


});
router.delete('/:id', auth, permit('teacher'), (req, res) => {
    Homework.findByIdAndRemove(req.params.id).then((homework) => {
        res.send({
            status: 'success',
            data: {
                homework: homework
            }
        })

    }).catch((error) => {
        res.send({
            status: 'error',
            error: error
        })
    })

});



module.exports = router;