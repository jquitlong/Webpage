import { computed, get } from '@ember/object';

import $ from 'jquery';
import AjaxService from 'ember-ajax/services/ajax';
import HttpErrorCodes from 'exam-web/constants/http-error-codes';
import HttpErrorHandler from 'exam-web/mixins/http-error-handler';
import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';

const { HttpError } = HttpErrorCodes;

export default AjaxService.extend(HttpErrorHandler, {
  session: service(),
  settings: service(),
  notify: service(),
  store: service(),

  HttpError,

  contentType: 'application/json',

  host: computed(function() {
    return get(this, 'settings').getApiHost();
  }),

  namespace: computed(function() {
    return get(this, 'settings').getApiNamespace() + '/' + get(this, 'settings').getApiVersion();
  }),

  headers: computed('session.data.authenticated.token', {
    get() {
      let headers = {};
      const token = get(this, 'session.data.authenticated.token');
      if (token) {
        headers['Authorization'] = 'Token ' + token;
      }
      return headers;
    }
  }),

  login(username, password) {
    let that = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.get('settings').getAbsoluteApiNamespace() + '/login/',
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json;charset=utf8',
        dataType: 'json'
      }).then((response) => {

        run(function() {
          resolve({
            token: response.token,
            user: response.user,
          });
        });
      }, (xhr) => {
        const response = xhr.responseText;
        run(function() {
          that.handleHttpErrorResponse(xhr.status);
          reject(response);
        });
      })
    });
  },

  logout() {
    return this.request('/logout/', {
      method: 'POST',
      data: {}
    });
  },

  request() {
    return this._super(...arguments).catch(({payload}) => {
      this.handleHttpErrorResponse(payload.status, payload.errors);
    });
  }
});
