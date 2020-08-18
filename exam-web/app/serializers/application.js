import { camelize, decamelize } from '@ember/string';

import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  primaryKey: 'id',

  keyForAttribute(key, method) { // eslint-disable-line no-unused-vars
    return decamelize(key);
  },

  normalizeKey(keyName) {
    return camelize(keyName);
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {  // eslint-disable-line no-unused-vars
    let returnedResults = payload;
    if ('results' in payload) {
      returnedResults = payload.results;
    }
    
    let data = [];
    returnedResults.forEach((item) => {
      data.push(this.normalize(primaryModelClass, item));
    });

    return {
      data,
      meta: {
        count: payload.count,
        links: payload.links,
        total: payload.total_pages
      }
    };
  },

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {   // eslint-disable-line no-unused-vars
    let data = this.normalize(primaryModelClass, payload);

    return {
      data,
      meta: {}
    };
  },

  normalize(modelClass, resourceHash) {
    let id = this.extractId(modelClass, resourceHash);
    let type = modelClass.modelName;
    let attributes = {};

    for (let key of Object.keys(resourceHash)) {
      // Make empty value as null to avoid getting error upon update in the api service
      const val = resourceHash[key] === '' ? null : resourceHash[key];
      attributes[this.normalizeKey(key)] = (resourceHash[key] === '') ? null : val;
    }

    let relationships = {};
    let self = this;
    modelClass.eachRelationship(function(name, descriptor) {
      if (descriptor.kind === 'hasMany') {
        let innerModelClass = self.store.modelFor(descriptor.type);
        relationships[name] = self.normalizeArrayResponse(self.store, innerModelClass, resourceHash[decamelize(name)], '', '');
      }
    })

    this.applyTransforms(modelClass, attributes);

    return { id, type, attributes, relationships };
  },

  // NOTE: You can override this function if you need to remove extra key value from the data
  // serializeIntoHash(data, type, record, options) {
  //   delete data.attributes;
  // }

  serialize(snapshot) {
    let attrs = snapshot.attributes();
    let serializedAttrs = {};
    for (let key of Object.keys(attrs)) {
      serializedAttrs[decamelize(key)] = attrs[key];
    }
    return serializedAttrs;
  }
  
});
