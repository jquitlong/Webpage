import { computed, get, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    ajax: service(),
    notify: service(),
    validator: service('validator'),

    actions: {
        onSave(model) {
            try {
                if(!isEmpty(model.email_address.trim()) && 
                    get(this, 'validator').validateEmail(model.email_address.trim())) {
                    let url = 'transactions/users/' + model.id + '/';
                    get(this, 'ajax').request(url, {
                    method: 'PATCH',
                    data: {
                        email_address: model.email_address,
                    }
                    }).then(() => {
                        get(this, 'notify').success('Contact Information has been successfully updated.');
                        this.send('refreshModel');
                        this.transitionToRoute('main.transactions.step-three');
                    }); 
                } else {
                    get(this, 'notify').error('Please enter a valid input.');
                }
            } catch (err) {
                get(this, 'notify').error('Please enter a valid input.');
            }

        },

        onBack() {
            this.transitionToRoute('main.transactions.step-one');
        }
    }
});