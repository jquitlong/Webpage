'use strict';

module.exports = function(environment) {
  let ENV = {
    host: 'http://localhost:4200',
    modulePrefix: 'exam-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    apiSettings: {
      host: 'http://localhost:8000',
      namespace: 'api',
      version: 'v1'
    },

    appSettings: {
      name: 'Exam',
      version: '1.0.0',
      productName: 'Exam',
      developer: 'Me',
      companyFullName: 'Take Home Exam',
      year: '2020',
      timeZone: 'Asia/Manila'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.host = 'http://127.0.0.1';
  }

  ENV['simple-auth'] = {
    store: 'simple-auth-session-store:local-storage',
    authorizer: 'authorizer:custom',
    crossOriginWhitelist: ['http://localhost:8000/'],
    routeAfterAuthentication: '/protected'
  };

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
