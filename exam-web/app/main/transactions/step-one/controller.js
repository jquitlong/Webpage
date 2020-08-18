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
                if(!isEmpty(model.first_name.trim()) && !isEmpty(model.last_name.trim())) {
                    let url = 'transactions/users/' + model.id + '/';
                    get(this, 'ajax').request(url, {
                    method: 'PATCH',
                    data: {
                        first_name: model.first_name,
                        last_name: model.last_name
                    }
                    }).then(() => {
                        get(this, 'notify').success('Personal Information has been successfully updated.');
                        this.send('refreshModel');
                        this.transitionToRoute('main.transactions.step-two');
                    }); 
                } else {
                    get(this, 'notify').error('Please enter a valid input.');
                }
            } catch (err) {
                get(this, 'notify').error('Please enter a valid input.');
            }

        },
    }
});