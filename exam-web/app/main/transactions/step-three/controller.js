import { computed, get, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
    ajax: service(),
    notify: service(),

    actions: {
        onSave(model) {
            try {
                if(!isEmpty(model.address.trim())) {
                    let url = 'transactions/users/' + model.id + '/';
                    get(this, 'ajax').request(url, {
                    method: 'PATCH',
                    data: {
                        address: model.address,
                    }
                    }).then(() => {
                        get(this, 'notify').success('Location Information has been successfully updated.');
                        this.send('refreshModel');
                        this.transitionToRoute('main.transactions.step-summary');
                    }); 
                } else {
                    get(this, 'notify').error('Please enter a valid input.');
                }
            } catch (err) {
                get(this, 'notify').error('Please enter a valid input.');
            }

        },

        onBack() {
            this.transitionToRoute('main.transactions.step-two');
        }
    }
});