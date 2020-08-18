import { computed, get } from '@ember/object';

import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  settings: service(),
  toast: service(),

  productName: computed(function() {
    return this.get('settings').getAppSettings().productName;
  }),

  info(msg, timeOut = null) {
    this._toast('info', msg, timeOut);
  },

  warning(msg, timeOut) {
    this._toast('warning', msg, timeOut);
  },

  success(msg, timeOut) {
    this._toast('success', msg, timeOut);
  },

  error(msg, timeOut) {
    this._toast('error', msg, timeOut);
  },

  setStatus(action, value) {
    localStorage.setItem('__' + action.toUpperCase() + '__', value);
  },

  getStatus(action) {
    let status = localStorage.getItem('__' + action.toUpperCase() + '__');
    return status === 'true';
  },

  _toast(type, msg, timeOut) {
    const productName = get(this, 'productName');
    let toast = get(this, 'toast');
    switch(type) {
      case 'info':
        if (timeOut) {
          toast.info(msg, productName, {timeOut: timeOut});
        } else {
          toast.info(msg, productName);
        }
        break;
      case 'warning':
        if (timeOut) {
          toast.warning(msg, productName, {timeOut: timeOut});
        } else {
          toast.warning(msg, productName);
        }
        break;
      case 'success':
        if (timeOut) {
          toast.success(msg, productName, {timeOut: timeOut});
        } else {
          toast.success(msg, productName);
        }
        break;
      case 'error':
        if (timeOut) {
          toast.error(msg, productName, {timeOut: timeOut});
        } else {
          toast.error(msg, productName);
        }
        break;
    }
  }
});
