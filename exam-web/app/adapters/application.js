import { computed, get } from '@ember/object';

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import HttpErrorHandler from 'exam-web/mixins/http-error-handler';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, HttpErrorHandler, {

  settings: service(),
  notify: service(),

  host: computed(function () {
    return get(this, 'settings').getApiHost();
  }),

  apiNamespace: computed(function () {
    return get(this, 'settings').getApiNamespace();
  }),

  apiVersion: computed(function () {
    return get(this, 'settings').getApiVersion();
  }),

  namespace: computed(function () {
    let prefixes = [
      get(this, 'apiNamespace'),
      get(this, 'apiVersion')
    ];
    return prefixes.join('/');
  }),

  headers: Object.freeze({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }),

  authorizer: 'authorizer:application',

  handleResponse(status, headers, payload) {
    if (this.isInvalid(...arguments)) {
      payload.errors = DS.errorsHashToArray(payload.errors);
      return this._super(...arguments);
    }

    // Application route's action error hook will handle this
    // No need to catch errors here
    if (payload.errors) {
      this.handleHttpErrorResponse(status, payload.errors);
    }

    return payload;
  }
});
