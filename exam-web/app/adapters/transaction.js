import { computed, get } from '@ember/object';

import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  headers: computed('session.data.authenticated.token', function() {
    let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + get(this, 'session.data.authenticated.token')
    }

    return headers;
  }),

  urlForQuery(params, modelName) { // eslint-disable-line no-unused-vars
    let url = this._super(...arguments);
    url = url + '/users/' + params.userId + '/';

    delete params.userId;
    return url
  },

  urlForCreateRecord(modelName, snapshot) {   // eslint-disable-line no-unused-vars
    let url = this._super(...arguments);
    return url + '/users/';
  }

});
