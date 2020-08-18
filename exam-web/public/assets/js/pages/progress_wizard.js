/*
 *  Document   : progress_wizard.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Forms Wizard Page
 *  Notes:     : Revised by Cyrus <cyrus.gabilla@arcana.ph>, removed un-needed initialization for validation
 */

// Form Wizard, for more examples you can check out https://github.com/VinceG/twitter-bootstrap-wizard

class pageFormsWizard {

  /*
    * Init Wizard Defaults
    *
    */
  static initWizardDefaults() {
    jQuery.fn.bootstrapWizard.defaults.tabClass         = 'nav nav-tabs';
    jQuery.fn.bootstrapWizard.defaults.nextSelector     = '[data-wizard="next"]';
    jQuery.fn.bootstrapWizard.defaults.previousSelector = '[data-wizard="prev"]';
    jQuery.fn.bootstrapWizard.defaults.firstSelector    = '[data-wizard="first"]';
    jQuery.fn.bootstrapWizard.defaults.lastSelector     = '[data-wizard="lsat"]';
    jQuery.fn.bootstrapWizard.defaults.finishSelector   = '[data-wizard="finish"]';
    jQuery.fn.bootstrapWizard.defaults.backSelector     = '[data-wizard="back"]';
  }

  /*
    * Init Simple Wizard functionality
    *
    */
  static initWizardSimple() {
    jQuery('.js-wizard-simple').bootstrapWizard({
      onTabShow: (tab, nav, index) => {
        let percent = ((index + 1) / nav.find('li').length) * 100;

        // Get progress bar
        let progress = nav.parents('.block').find('[data-wizard="progress"] > .progress-bar');

        // Update progress bar if there is one
        if (progress.length) {
          progress.css({ width: percent + 1 + '%' });
        }
      }
    });
  }


  /*
    * Init functionality
    *
    */
  static init() {
    this.initWizardDefaults();
    // this.initWizardSimple();
  }
}

// Initialize when page loads
jQuery(() => { pageFormsWizard.init(); });
