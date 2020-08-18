import Base from 'ember-simple-auth/authenticators/base';
import { Promise } from 'rsvp';
import { get } from '@ember/object'
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Base.extend({
  settings: service(),
  ajax: service(),

  restore(data) {
    return new Promise((resolve, reject) => {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(username, password) {
    return get(this, 'ajax').login(username, password);
  }
  
});
