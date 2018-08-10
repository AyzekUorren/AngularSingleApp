const Flickr = require('flickr-sdk');
const queryString = require( "querystring" );
const urlOAuth = 'http://localhost:8010/api/OAuth/success';
const urlRedirect = 'http://localhost:4200';
const express = require ('express');
const router = express.Router();

//All authorized users
let AccessData = {};

let tempoToken;

//Get
const urlGetUserInfo = '/OAuth/userInfo';
const urlGetPhotoSets = '/User/PhotoSets';

//app.post('/OAuth',require(path.resolve(__dirname+publicDir+'/controllers_services/OAuth')));
let oauth = new Flickr.OAuth(
    process.env.FLICKR_CONSUMER_KEY,
    process.env.FLICKR_CONSUMER_SECRET
);

router.get('/OAuth/request', function (req, res) {
  let data = oauth.request(urlOAuth).then(function (res) {
    let url = oauth.authorizeUrl(res.body.oauth_token, 'write');
    url += '&oauth_callback='+urlOAuth;
    let oauth_token = res.body.oauth_token;
    let oauth_token_secret = res.body.oauth_token_secret;
    return {url, oauth_token, oauth_token_secret};
  }).catch(function (err) {
    console.error('authorization false: ', err);
    return err;
  });

  data.then(function(result){
    tempoToken = result;
    console.log('First Step: \n',tempoToken);
    res.status(200).send(result);
  }).catch(function(err){
    return err;
  });
});

router.get('/OAuth/success', function (req, res) {
  let qeuryParams = queryString.parse(req._parsedUrl.query);
  let user = {};
  oauth.verify(qeuryParams.oauth_token,qeuryParams.oauth_verifier, tempoToken["oauth_token_secret"]).then(function (res) {
    console.log('Second Step:');
    user['oauth_token'] = res.body.oauth_token;
    user['oauth_token_secret'] = res.body.oauth_token_secret;
    user['status'] = true;
    AccessData[0] = user;
    console.log('Authorized done!');
    console.log(AccessData);
  }).catch(function (err) {
    console.log('bonk', err);
  });
  res.redirect(urlRedirect);
});

let ApiFlickr;


//GetUserInfo
router.get(urlGetUserInfo, function (req, res) {
  if(AccessData.hasOwnProperty(0)) {
    if (ApiFlickr === undefined)
      ApiFlickr = new Flickr(Flickr.OAuth.createPlugin(
        process.env.FLICKR_CONSUMER_KEY,
        process.env.FLICKR_CONSUMER_SECRET,
        AccessData[0].oauth_token,
        AccessData[0].oauth_token_secret));
    let result = ApiFlickr.test.login().then(function (res) {
      console.log('yay!', res.body);
      AccessData[0]['id'] = JSON.stringify(res.body.user.id);
      console.log(AccessData[0]);
      return res.body;
    }).catch(function (err) {
      console.error('bonk', err);
      return err;
    });

    result.then(function (result) {
      res.send(result);
    });
  } else {
    res.sendStatus(401);
  }
});


//Get PhotoSets
router.get(urlGetPhotoSets, function (req, res) {
  if(AccessData.hasOwnProperty(0)) {
    if (ApiFlickr === undefined)
      ApiFlickr = new Flickr(Flickr.OAuth.createPlugin(
        process.env.FLICKR_CONSUMER_KEY,
        process.env.FLICKR_CONSUMER_SECRET,
        AccessData[0].oauth_token,
        AccessData[0].oauth_token_secret));
    let param = {
      user_id: AccessData[0].id,
      page: null,
      per_page: null,
      pages:null,
      format: 'json',
      nojsoncallback: '1'
    };
    let result = ApiFlickr.photosets.getList(param.user_id, param.nojsoncallback, param.format).then(function (res) {
      console.log('yay!', res.body);
      return res.body;
    }).catch(function (err) {
      console.error('bonk', err);
      return err;
    });

    result.then(function (result) {
      res.send(result);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
