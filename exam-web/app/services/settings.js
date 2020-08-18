import { computed, get } from '@ember/object';

import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service(),

  ENV: computed(function () {
    return getOwner(this).resolveRegistration('config:environment');
  }),

  getConfig() {
    return get(this, 'ENV');
  },

  getApiConfig() {
    return this.getConfig().apiSettings;
  },

  getAppSettings() {
    return this.getConfig().appSettings;
  },

  getApiHost() {
    return this.getApiConfig().host;
  },

  getApiNamespace() {
    return this.getApiConfig().namespace;
  },

  getApiVersion() {
    return this.getApiConfig().version;
  },

  getAbsoluteApiNamespace() {
    const apiConfig = this.getApiConfig();
    return `${apiConfig.host}/${this.getApiNamespace()}/${this.getApiVersion()}`;
  },

  getRelativeApiNamespace() {
    return `${this.getApiNamespace()}/${this.getApiVersion()}`;
  },

  getPollingInterval() {
    return this.getConfig()['POLL'].interval;
  },

  getEnvironment() {
    return this.getConfig().environment;
  },

});
