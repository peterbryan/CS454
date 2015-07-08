var config = require('../config');
var superagent = require('superagent');

module.exports = function (app) {
  
  app.get('/character/search', function(req, res) {
    superagent
      .get(config.api.base + '/characters')
      .query({api_key: config.api.key})
      .query({filter:"name:" + req.query.name})
      .query({limit: 5})
      .query({format: "json"})
      .end(function(err, result) {
        if (err || result.statusCode !== 200) {
          res.send(err);
        }
        else {
          console.log('///// comic search');
          console.log(result.body.results);
          res.json(result.body.results);
        }
      });
  });

  
  app.get('/character/details', function(req, res) {

    superagent
      .get(config.api.base + '/character/4005-' +req.query.id)
      .query({api_key: config.api.key})
      .query({format: 'json'})
      .query({field_list:"character_friends,character_enemies,powers,name,deck,origin,publisher,image"})
      .end(function(err, result) {
        if (err || result.statusCode !== 200) {
          res.send(err);
        }
        else {
          console.log('///// movies detail');
          console.log(result.body.results);
          res.json(result.body.results);
        }
      });
  });


  // app.get('/movies/boxoffice', function(req, res) {

  //   superagent
  //     .get(config.api.base + '/lists/dvds/top_rentals.json')
  //     .query({apikey: config.api.key})
  //     .query({limit: 16})
  //     .end(function(err, result) {
  //       if (err || result.statusCode !== 200) {
  //         res.send(err);
  //       }
  //       else {
  //         console.log(JSON.parse(result.text).movies[0]);
  //         res.json(JSON.parse(result.text));
  //       }
  //     });
  // });


};