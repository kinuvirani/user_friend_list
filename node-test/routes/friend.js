const {Router} = require('express');
const route =Router();

const {sendFriendRequest, updateFriendRequest, getFriendList, getPendingRequest} = require('../controller/friend');
const { userAuthorization } = require('../helper/authorization');

route.post('/', userAuthorization(), (req, res) => {
   return sendFriendRequest(req, (err, result) => {
      if(err) {
          return res.status(400).send({message: err});
      }
       return res.status(200).send(result);
   });
});

route.put('/:id', userAuthorization(), (req, res) => {
    return updateFriendRequest(req.body, req.params.id, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.get('/', userAuthorization(), (req, res) => {
    return getFriendList(req, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.get('/requests', userAuthorization(), (req, res) => {
    return getPendingRequest(req, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});


module.exports = route;
