import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/transactions/step-one', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/transactions/step-one');
    assert.ok(route);
  });
});
