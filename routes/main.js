var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

router.get('/', function(req, res){
    res.render('main', {'data' : '' , 'folder' : ''});
 });

router.post('/', async function(req, res){
    var url= req.body.url;
    var branch=req.body.branch;
    const data = await fetchData(url,branch);
    var folder = url.split('/')[1];
    res.render('main', {'data' : JSON.stringify(data), 'folder':folder});
});

module.exports = router;

function fetchData(url, branch){
  return fetch(`https://api.github.com/repos/${url}/git/trees/${branch}?recursive=1`)
      .then(res => res.json())
}