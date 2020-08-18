import { computed, get } from '@ember/object';

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  settings: service(),

  ajax: service(),
  notify: service(),
  session: service(),

  appSettings: computed(function() {
    return get(this, 'settings').getAppSettings();
  }),

  actions: {    
    logout() {
      get(this, 'notify').setStatus('logout', true);
      get(this, 'ajax').logout().then(() => {
        get(this, 'session').invalidate();
      });
    }
  }
});
