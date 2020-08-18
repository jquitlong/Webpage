import { computed, get, set } from '@ember/object';

import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import LoginValidation from './login-validation';
import WithRootMixin from 'exam-web/mixins/with-root';
import { inject as service } from '@ember/service';

export default Controller.extend(WithRootMixin, {

  auth: service('session'),
  settings: service(),
  notify: service(),
  session: service(),

  LoginValidation,

  appSettings: computed(function() {
    return get(this, 'settings').getAppSettings();
  }),

  credentials: EmberObject.create({
    username: '',
    password: ''
  }),

  errorMessage: '',
  successMessage: '',

  init() {
    this._super(...arguments);

    let notify = get(this, 'notify');

    if (notify.getStatus('logout')) {
      notify.info('You have been successfully logged out.');
      notify.setStatus('logout', false);
    }
  },

  actions: {
    login(changeset) {
      changeset.validate().then(() => {
        if(changeset.get('isValid')) {
            const { username, password } = changeset.getProperties('username', 'password');
            this.get('auth').authenticate('authenticator:custom', username, password).then((response) => {
                get(this, 'notify').success('You have successfully logged in.');
                this.setErrorMessage();
                this.setSuccessMessage();
            }).catch((response) => {
                const errors = JSON.parse(response).errors;
                this.setErrorMessage(errors.data);
            });
        }
      });
    },
    sign_up(){
      this.setErrorMessage();
      this.setSuccessMessage();
      this.transitionToRoute('signup');
    }
  },

  setErrorMessage(msg = '') {
    set(this, 'errorMessage', msg);
  },

  setSuccessMessage(msg = '') {
    set(this, 'successMessage', msg);
  }
});