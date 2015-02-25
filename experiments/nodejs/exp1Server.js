/**
 * Created by hhwang on 2/25/15.
 */

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname + '/public'))

var developers = [
{firstName: 'Alice', lastName: 'Wonderland', application: {name: ['aa', 'bb']}},
{firstName: 'Bob', lastName: 'J', application: {name: ['cc', 'dd']}}
]

// web service endpoints
app.get('/developers/:id/application', function (req, res) {
    // req.params.index or req.params['index']
    // /entityType/ID
    // /entityTyp
    var id = req.params.id
    res.json(developers[id].application)
})

app.delete('/developer/:id', function(req, res) {
    var id = req.params.id
    developers.splice(id, 1)
    res.json(developers)
})

app.post('/developer', function(req, res) {
    var obj = req.body
    developers.push(obj)
    res.json(developers)
})

app.listen(3000)