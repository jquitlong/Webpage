import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import WithRootMixin from 'exam-web/mixins/with-root';

export default Route.extend(UnauthenticatedRouteMixin, WithRootMixin);