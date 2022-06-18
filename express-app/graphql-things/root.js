const jwt = require('jsonwebtoken');
const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');
const AuthSession = require('../models/auth-session-model');


// HELPERS

// const tokenCreate = (user_id) => {
//   // create jsonwebtoken token
//   const token = jwt.sign(
//     { user_id: user_id },
//     config.JWT_SECRET
//   );
//   return token;
// };

const JWT_SECRET = 'TAJNI_TOKEN';

const tokenCreate = (user_id) => {
  const token = jwt.sign(
    { user_id: user_id },
    JWT_SECRET
  );
  return token;
};

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
    console.log('args');
    console.log(args);
    const token = args.token;
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
    const token = req.headers['x-hiking-token'];

    // const token = args.token;
    console.log(token);
    const session = await AuthSession.findOne({
      token: token
    });
    console.log(session);
    if (session.user_id) {
      const user_id = session.user_id;
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
};

module.exports = root;

