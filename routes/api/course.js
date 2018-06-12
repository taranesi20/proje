var express = require('express');
var router = express.Router();
let {auth, permit} = require('../../functions/authentication');
let Course = require('../../models/course.model');

router.get('/', (req, res) => {

    Course.find({}).then((courses) => {
        res.send({
            status: "success",
            data: {
                courses: courses
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

    Course.findById(req.params.id, (err, course) => {
        if (err)
            return res.send({
                status: "error",
                error: err
            });
        return res.send({
            status: "success",
            data: {
                course: course
            }
        })


    });

});

router.post('/', auth, permit('teacher'), (req, res) => {

    let course = new Course(req.body);
    course.save(err => {
        if (err)
            res.send({
                status: "error",
                error: err
            });
        res.send({
            status: "success",
            data: {
                message: "course added successfully"
            }
        })
    })


});

router.delete('/:id', auth, permit('teacher'), (req, res) => {
    Course.findByIdAndRemove(req.params.id).then((course) => {
        res.send({
            status: 'success',
            data: {
                course: course
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