import Service from '@ember/service';

export default Service.extend({

  validateEmail(email) {
    // See: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = email.split(",");

    for (var i = 0; i < email.length; i++) {
      let result = re.test(email[i].trim());

      if (!result) {
        return false;
      }
    }

    return true;
  },
});
