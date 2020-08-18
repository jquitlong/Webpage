import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
    ajax: service(),
    session: service(),

    setupController(controller, model) {  // eslint-disable-line no-unused-vars
        this._super(...arguments);
        let userId = get(this, 'session').currentUser.id;

        let url = 'transactions/users/' + userId + '/';
        get(this, 'ajax').request(url, {
            method: 'GET',
            data: {}
        }).then((model) => {
            controller.set('userInfo', model);
        });  
    },

    actions: {
        refreshModel() {
          // Update the model
          this.refresh();
        }
    },

});
