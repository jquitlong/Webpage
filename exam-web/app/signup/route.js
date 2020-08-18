import Route from '@ember/routing/route';

export default Route.extend({

    actions: {
        refreshModel() {
          // Update the model
          this.refresh();
        }
    },

});
