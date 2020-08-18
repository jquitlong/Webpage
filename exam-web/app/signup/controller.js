import { computed, get, set } from '@ember/object';

import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import WithRootMixin from 'exam-web/mixins/with-root';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Controller.extend(WithRootMixin, {

  auth: service('session'),
  settings: service(),
  notify: service(),
  ajax: service(),
  session: service(),

  appSettings: computed(function() {
    return get(this, 'settings').getAppSettings();
  }),

  credentials: EmberObject.create({
    username: '',
    password: '',
  }),

  init() {
    this._super(...arguments);

    let notify = get(this, 'notify');

    if (notify.getStatus('logout')) {
      notify.info('You have been successfully logged out.');
      notify.setStatus('logout', false);
    }
  },

  actions: {
    signup(model) {
        let username = get(model, 'username').trim();
        let password = get(model, 'password').trim();

        if(!isEmpty(username) && !isEmpty(password)) {
            let url = '/transactions/users/';
            get(this, 'ajax').request(url, {
              method: 'POST',
              data: {
                  username: username,
                  password: password,
              }
            }).then((response) => {
                if(response !== undefined) {
                    this.send('refreshModel');
                    let credentials = get(this, 'credentials');

                    this.get('auth').authenticate('authenticator:custom', 
                      get(credentials, 'username'), get(credentials, 'password'))
                      .then((response) => {
                        get(this, 'notify').success('User has been successfully created.');
                        get(this, 'notify').success('You have successfully logged in.');
                        this.setErrorMessage();
                        this.setSuccessMessage();
                    }).catch((response) => {
                        const errors = JSON.parse(response).errors;
                        this.setErrorMessage(errors.data);
                    });

                    set(credentials, 'username', '');
                    set(credentials, 'password', '');
                } else {
                    get(this, 'notify').error('Username must be unique.');
                }

            });
        } else {
            get(this, 'notify').error('All fields are required');
        }
    },
    
    login(){
      let credentials = get(this, 'credentials');
      set(credentials, 'username', '');
      set(credentials, 'password', '');
      this.transitionToRoute('login');
    }
  },

});