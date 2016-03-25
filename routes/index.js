var express = require('express')

var router = module.exports = express.Router()

router.get('/api', function (req, res, next) {
  return res.status(200).json({
    'message': 'Hello World!'
  })
})

router.get('/', function (req, res, next) {
  return res.render('index', {
    title: 'hyper'
  })
})

router.route('/next')
  .all(function (req, res, next) {
    if (!req.session.step) {
      req.session.step = 1
    } else {
      req.session.step += 1
      console.log('step #', req.session.step)
    }
    req.numb = req.session.step
    next()
  })
  .get(function (req, res, next) {
    //This object is hard coded to avoid database population.
    var steps = [
      {title: 'start'},
      {
        title: 'Authentication',
        desc: 'Do you need authentication in your api?',
        form: 'authForm'
      }
    ]
    steps[req.numb].number = req.numb
    return res.render('step', {
      title: steps[req.numb].title,
      step: steps[req.numb]
    })
  })
  .post(function (req, res, next) {
    if (!req.session.api) {
      req.session.api = {}
    }
    for (var prop in req.body) {
      if (req.body.hasOwnProperty(prop)) {
        req.session.api[prop] = prop
      }
    }
    console.log('api:', req.session.api)
    return res.redirect('/next')
  })