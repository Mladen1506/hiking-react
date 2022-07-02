

const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');
const AuthSession = require('../models/auth-session-model');
const Tour = require('../models/tour-model');
const Review = require('../models/review-model');
const Participation = require('../models/participation-model');
const TourLike = require('../models/tour-like-model');


// HELPERS

// const tokenCreate = (user_id) => {
//   // create jsonwebtoken token
//   const token = jwt.sign(
//     { user_id: user_id },
//     config.JWT_SECRET
//   );
//   return token;
// };

// const JWT_SECRET = 'TAJNI_TOKEN'; 

const tokenCreate = (user_id) => {
  // create jsonwebtoken token
  const token = jwt.sign(
    { user_id: user_id },
    config.JWT_SECRET
  );
  return token;
};

const checkIsLoggedIn = async (token) => {
  console.log('checkIsLoggedIn helper');
  console.log(token);
  let is_logged_in = false;
  let user_id = null;

  const session = await AuthSession.findOne({
    token: token
  });
  console.log(session);
  if (session.user_id) {
    user_id = session.user_id;
    is_logged_in = true;
  }
  return {
    is_logged_in,
    user_id
  };
}
// GRAPPHQL RESOLVERS

var root = {
  hello: () => {
    return 'Hello world!';
  },
  random: () => {
    return Math.random();
  },
  testContext: (args, context) => {
    console.log('testContext(args, context) If context is not provided, the request object is passed as the context.');
    console.log('args');
    console.log(args);
    // If context is not provided, the request object is passed as the context.
    console.log('context');
    console.log(context);
    console.log('context.headers');
    console.log(context.headers);
    return 'We just tested arguments for resolver';
  },

  napraviGlupost: async () => {
    const results = await Glupost.create(
      {
        nesto: 'stagod',
        nesto2: 'stagod2'
      }
    );

    console.log(results)
    return 'Kreiranje u mongo Glupost uspjela';
  },
  authRegister: async (args, context) => {
    console.log('authRegister resolver');
    console.log('args');
    console.log(args);

    if (args.password === args.password2) {
      const results = await User.create(
        {
          username: args.username,
          password: args.password
        }
      );
      console.log(results);
      return 'Vracamo neki odgovor od authRegister'
    } else {
      return 'Error: Registracija nije uspjela'
    }
  },

  authLogin: async (args, context) => {
    console.log('authLogin resolver');
    console.log('args');
    console.log(args);

    const results = await User.findOne(
      {
        username: args.username,
        password: args.password
      }
    );
    console.log(results);
    if (results && results._id) {
      const user_id = results._id;
      console.log('user_id', user_id);
      const token = tokenCreate(user_id);
      console.log('token', token);

      await AuthSession.create(
        {
          user_id: user_id,
          token: token
        }
      );

      return token;
    } else {
      return 'Error: User with these credentials does not exist'
    }
  },

  authLogout: async (args, context) => {
    console.log('authLogout resolver');
    // console.log('args');
    // console.log(args);
    // const token = args.token;
    // console.log(token);
    const req = context;

    const token = req.headers[config.TOKEN_HEADER_KEY];
    // const token = args.token;
    console.log(token);


    // mora iz baze sesija da obrise onu sa ovim tokenom

    await AuthSession.findOneAndDelete({
      token: token
    });
    return true;
  },


  myUserData: async (args, context) => {
    console.log('myUserData resolver');
    console.log('args');
    console.log(args);
    // console.log('context');
    // console.log(context);

    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];

    // const token = args.token;
    console.log(token);
    /*
    const session = await AuthSession.findOne({
      token: token
    });
    console.log(session);
    */

    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      const user_id = auth.user_id;
      const user = await User.findOne(
        {
          _id: user_id,
        });
      console.log(user);

      if (user && user._id && user.username) {
        return {
          is_success: true,
          _id: user._id,
          username: user.username
        };
      }
    }
  },

  tourCreate: async (args, context) => {
    console.log('tourCreate resolver');
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      const user_id = auth.user_id;
      const results = await Tour.create({
        user_id: user_id,
        name: args.name,
        description: args.description,
        date: args.date,
        difficulty: args.difficulty,
        trail_length: args.trail_length,
        max_participants: args.max_participants
      });
      console.log(results);
      return true;
    } else {
      return false;
    }
  },

  tourUpdate: async (args, context) => {
    console.log('tourUpdate resolver');
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      const user_id = auth.user_id;
      const results = await Tour.findOneAndUpdate({
        _id: args.tour_id,
        user_id: user_id
      }, {
        // user_id: user_id,
        name: args.name,
        description: args.description,
        date: args.date,
        difficulty: args.difficulty,
        trail_length: args.trail_length,
        max_participants: args.max_participants
      });

      console.log(results);
      return true;
    } else {
      return false;
    }
  },

  tourDelete: async (args, context) => {
    console.log('tourDelete resolver');
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      const user_id = auth.user_id;
      const results = await Tour.findOneAndDelete({
        _id: args.tour_id,
        user_id: user_id
      }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted docs: ", docs);
        }
      });
      console.log(results);
      return true;
    } else {
      return false;
    }
  },

  tourGetAll: async (args, context) => {
    console.log('tourGetAll resolver')
    const results = await Tour.find({});
    return results;
  },

  tourJoin: async (args, context) => {
    console.log('tourJoin resolver');
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      const user_id = auth.user_id;

      // sad u bazi upisujemo joinovanje ture
      Participation.countDocuments({
        user_id: user_id,
        tour_id: args.tour_id,
      }, function (err, counted) {
        if (err) {
          console.log(err);
        } else {
          console.log("Conted docs: ", counted);
          if (counted > 0) {
            // ne upisujemo dupoliakte
          } else {
            const results = Participation.create({
              user_id: user_id,
              tour_id: args.tour_id,
            });
            console.log(results);
          }
        }
      });
      console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },

  tourLeave: async (args, context) => {
    console.log('tourLeave resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // sad u bazi brisemo participanta i tako radimo leave
      const results = await Participation.findOneAndDelete({
        tour_id: args.tour_id,
        user_id: user_id
      }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted docs: ", docs);
        }
      });
      // console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },

  tourLike: async (args, context) => {
    console.log('tourLike resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da
      const user_id = auth.user_id;
      // NE DOZVOLJAVAMO UPIS AKO JE KORISNIK VEC LAJKOVAO
      await TourLike.countDocuments({
        user_id: user_id,
        tour_id: args.tour_id,
      }, function (err, counted) {
        if (err) {
          console.log(err);
        } else {
          console.log("Conted docs: ", counted);
          if (counted > 0) {
            // ne upisujemo dupoliakte
          } else {
            // sad u bazi upisujumo like
            const results = TourLike.create({
              user_id: user_id,
              tour_id: args.tour_id,
            });
            console.log(results);
          }
        }
      });
      return true;
    } else {
      // ako nismo ulogvani necemo ni da odradimo
      return false;
    }
  },

  tourUnlike: async (args, context) => {
    console.log('tourUnlike resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da
      const user_id = auth.user_id;
      // sad u bazi brisemo participanta i tako radimo leave
      const results = await TourLike.findOneAndDelete({
        tour_id: args.tour_id,
        user_id: user_id
      }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Deleted docs: ", docs);
        }
      });
      // console.log(results);
      return true;
    } else {
      // ako nismo ulogvani necemo ni da odradimo
      return false;
    }
  },


  tourParticipantsGet: async (args, context) => {
    console.log('tourParticipantsGet resolver');
    console.log('args');
    console.log(args);
    const results = await Participation.find({
      tour_id: args.tour_id
    });
    return results;
  },

  tourLikeListGet: async (args, context) => {
    console.log('tourParticipantsGet resolver');
    console.log('args');
    console.log(args);
    const results = await TourLike.find({
      tour_id: args.tour_id
    });
    return results;
  },

  // reviewCreate: async (args, context) => {
  //   console.log('reviewCreate resolver');
  //   console.log('args');
  //   console.log(args);
  //   const req = context;
  //   const token = req.headers[config.TOKEN_HEADER_KEY];
  //   console.log(token);
  //   const auth = await checkIsLoggedIn(token);
  //   if (auth.is_logged_in) {
  //     const user_id = auth.user_id;

  //     await TourLike.countDocuments({
  //       user_id: user_id,
  //       tour_id: args.tour_id,
  //     }, function (err, counted) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("Counted docs: ", counted);
  //         if (counted > 0) {
  //           // ne upisujemo duplikate
  //         } else {
  //           // sad u bazi kreiramo ture
  //           const results = Review.create({
  //             user_id: user_id,
  //             tour_id: args.tour_id,
  //             rating: args.rating,
  //             text: args.text
  //           });
  //           console.log(results);
  //         }
  //       }
  //     });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // },
  reviewCreate: async (args, context) => {
    console.log('reviewCreate resolver');
    // If context is not provided, the request object is passed as the context.
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      // ulogovani smo, sad mozemo da kreiramo turu
      const user_id = auth.user_id;
      // NE DOZVOLJAVAMO UPIS AKO JE KORISNIK VEC NAPRAVIO REVIEW ZA ISTU TURU
      const counted = await Review.countDocuments({
        user_id: user_id,
        tour_id: args.tour_id,
      }).exec();
      console.log('after exec');

      console.log("Counted docs: ", counted);
      if (counted > 0) {
        // ne upisujemo dupoliakte
        console.log('*** preskacemo jer vec ima raview tog korsnika za tu turu');
      } else {
        // sad u bazi kreiramo turu
        console.log('*** kreiramo jer je counted 0');
        const results = await Review.create({
          user_id: user_id,
          tour_id: args.tour_id,
          rating: args.rating,
          text: args.text
        });
        console.log(results);
      };
      return true;
    } else {
      // ako nismo ulogvani necemo ni da kreiramo turu
      return false;
    }
  },

  reviewUpdate: async (args, context) => {
    console.log('reviewCreate resolver');
    console.log('args');
    console.log(args);
    const req = context;
    const token = req.headers[config.TOKEN_HEADER_KEY];
    console.log(token);
    const auth = await checkIsLoggedIn(token);
    if (auth.is_logged_in) {
      const user_id = auth.user_id;
      const results = await Review.create({
        user_id: user_id,
        tour_id: args.tour_id,
        rating: args.rating,
        text: args.text
      });
      console.log(results);
      return true;

    } else {
      return false;
    }
  },

  reviewGetAll: async (args, context) => {
    console.log('reviewGetAll resolver')
    const results = await Review.find({});
    return results;
  },
};

module.exports = root;