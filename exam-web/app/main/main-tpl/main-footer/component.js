import { computed, get } from '@ember/object';

import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  elementId: 'page-footer',
  tagName: 'footer',
  classNames: ['bg-body-light'],

  settings: service(),

  appSettings: computed(function () {
    return get(this, 'settings').getAppSettings();
  })
});
