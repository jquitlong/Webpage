import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    address: DS.attr('string'),
    emailAddress: DS.attr('string')
});