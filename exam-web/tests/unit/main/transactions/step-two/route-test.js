import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/transactions/step-two', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/transactions/step-two');
    assert.ok(route);
  });
});
