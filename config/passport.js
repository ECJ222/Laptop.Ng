const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const model = require('../model');
const axios = require('axios');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "https://laptopng.herokuapp.com/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    model.UserDb.findOne( { name : profile.displayName })
    .then((res) => {
      if(!res){
        console.log('user does not exist')
        //
        let new_user = new model.UserDb({
          name : profile.displayName,
          email : profile.email
        })

        .save()
        .then(() => {
          return done(null, new_user);
        });
        //
      }else{
          return done(null, res);
      }
    })
    .catch((err) => console.log(err))

  }
));
