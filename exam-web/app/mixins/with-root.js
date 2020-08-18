import ENV from '../config/environment';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  rootURL: ENV.rootURL
});