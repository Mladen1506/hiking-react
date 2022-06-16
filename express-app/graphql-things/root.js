const Glupost = require('../models/glupost-model');
const User = require('../models/user-model');


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
  }
};

module.exports = root;

