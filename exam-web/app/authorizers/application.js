import Base from 'ember-simple-auth/authorizers/base';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Base.extend({
  session: service(),

  authorize(data, block) {
    block('Authorization', 'Token ' + data.asldgasg);
    if(this.get('session.isAuthenticated') && !isEmpty(data.token)) {
      block('Authorization', 'Token ' + data.token);
    }
  }
});
