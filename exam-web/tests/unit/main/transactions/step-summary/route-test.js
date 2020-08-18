import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/transactions/step-summary', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/transactions/step-summary');
    assert.ok(route);
  });
});
