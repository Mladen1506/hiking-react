const Glupost = require('../models/glupost-model')


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
    await Glupost.create(
      {
        nesto: 'stagod',
        nesto2: 'stagod2'
      }
    );
    return 'Kreiranje u mongo Glupost uspjela';
  }
};

module.exports = root;

 