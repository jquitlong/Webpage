import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import HttpErrorHandler from 'exam-web/mixins/http-error-handler';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, HttpErrorHandler, {
  moment: service(),
  settings: service(),
  session: service(),
  notify: service(),

  routeAfterAuthentication: 'main.transactions',

  beforeModel() {
    // Globally set timezone
    let timeZone = this.get('settings').getAppSettings().timeZone;
    this.get('moment').setTimeZone(timeZone);
  },

  redirect(model, transition) {
    if (transition.to && transition.to.name && transition.to.name !== 'index' && transition.to.name !== 'main') {
      this.transitionTo(transition.to.name);
    } else {
      this.transitionTo('main.transactions');
    }
  },

  sessionInvalidated() {
    this.transitionTo('login');
  },

  actions: {
    error(error, transition) {
      this.handleHttpErrorResponse(error.status, error);
    }
  }
});
