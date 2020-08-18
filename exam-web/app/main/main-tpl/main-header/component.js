import Component from '@ember/component';
import WithRootMixin from 'exam-web/mixins/with-root';

export default Component.extend(WithRootMixin, {
  elementId: 'page-header',
  tagName: 'header',

  actions: {
    logout() {
      this.get('onLogout')();
    }
  }
});