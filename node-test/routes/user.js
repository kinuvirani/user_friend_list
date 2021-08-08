const {Router} = require('express');
const route =Router();

const {signUp, signIn, getUserList} = require('../controller/user');
const { userAuthorization } = require('../helper/authorization');

route.post('/sign-up', (req, res) => {
   return signUp(req.body, (err, result) => {
      if(err) {
          return res.status(400).send({message: err});
      }
       return res.status(200).send(result);
   });
});

route.post('/sign-in', (req, res) => {
    return signIn(req.body, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.get('/', userAuthorization(), (req, res) => {
    return getUserList(req, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

module.exports = route;
