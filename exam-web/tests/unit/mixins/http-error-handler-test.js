import EmberObject from '@ember/object';
import HttpErrorHandlerMixin from 'exam-web/mixins/http-error-handler';
import { module, test } from 'qunit';

module('Unit | Mixin | http-error-handler', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let HttpErrorHandlerObject = EmberObject.extend(HttpErrorHandlerMixin);
    let subject = HttpErrorHandlerObject.create();
    assert.ok(subject);
  });
});
