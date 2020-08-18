import HttpErrorCodes from 'exam-web/constants/http-error-codes';
import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

const { HttpError } = HttpErrorCodes;


export default Mixin.create({
  notify: service(),
  session: service(),
  router: service(),

  HttpError,

  handleHttpErrorResponse(responseStatus, errors) {
    // Reference to error messages: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

    let notify = get(this, 'notify');

    const timeOut = 3000;
    switch(responseStatus) {
      case HttpError.BadRequest: // HTTP_400_BAD_REQUEST | BadRequestError (400)
        if(errors) {
          errors.data.forEach(element => {
            if(element.source && element.source != 'non_field_errors') {
              notify.error(element.source + ': ' + element.detail);
            } else {
              notify.error(element.detail);
            }
          });
          break;
        }
        notify.error('Invalid parameters. Please try again.', timeOut);
        break;
      case HttpError.Forbidden: // HTTP_403_FORBIDDEN | ForbiddenError(403)
        notify.error('Insufficient privileges. Please contact administrator.', timeOut);
        break;
      case HttpError.NotFound: // NotFoundError (404)
        notify.error('The requested resource could not be found.', timeOut);
        break;
      case HttpError.Invalid: // InvalidError(422)
        notify.error('The request is invalid due to semantic errors.', timeOut);
        break;
      case HttpError.Unauthorized: // HTTP_401_UNAUTHORIZED | UnauthorizedError(401)
        get(this, 'session').invalidate();

        // To skip the application route error bubbling-up again, re-route to login automatically
        get(this, 'router').transitionTo('login');

        notify.error('Unauthorized user. Please re-login.', timeOut);
        break;
      case HttpError.InternalServer: default: // HTTP_500_INTERNAL_SERVER_ERROR | ServerError (5XX)
        break;
      }
  }
});
