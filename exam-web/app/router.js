import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login');
  this.route('main', function() {
    this.route('transactions', function() {
      this.route('step-one');
      this.route('step-two');
      this.route('step-three');
      this.route('step-summary');
    });
  });
  this.route('signup');
});
