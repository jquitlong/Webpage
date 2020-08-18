import { computed, get } from '@ember/object';

import ESASession from "ember-simple-auth/services/session";
import { isEmpty } from '@ember/utils';

export default ESASession.extend({

  currentUser: computed('isAuthenticated', function () {
    let user = get(this, 'data.authenticated.user');
    if (get(this, 'isAuthenticated') && !isEmpty(user)) {
      return user;
    } else {
      this.invalidate();
      return null;
    }
  }),

  currentUserGroups: computed('isAuthenticated', function () {
    return get(this, 'data.authenticated.groups');
  }),

  hasPerm(relatedModels, relatedActions) {
    // Return true immediately if relatedModels is empty
    if (isEmpty(relatedModels) || isEmpty(relatedActions)) return true;

    let permissions = get(this, 'data.authenticated.permissions');
    let user = get(this, 'data.authenticated.user');

    // Return true immediately if super user
    if (user.is_superuser) {
      return true;
    }

    let ret = false;
    let models = relatedModels.split(',');
    let actions = relatedActions.split(',');
    models.forEach(m => {
      if (permissions[m]) {
        let model_permissions = permissions[m];
        actions.forEach(a => {
          if (model_permissions.includes(a)) {
            ret = true;
            return;
          }
        });
      }
    });

    return ret;
  }
});

