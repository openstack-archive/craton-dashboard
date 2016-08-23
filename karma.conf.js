/**
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */


'use-strict';

var fs = require('fs');
var path = require('path');

module.exports = function(config) {
  var xstaticPath;
  var horizonPath;
  var openstackDashboardPath;
  var horizonRoot;
  var basePaths = [
    './.venv',
    './.tox/py27'
  ];

  for (var i = 0; i < basePaths.length; i++) {
    var basePath = path.resolve(basePaths[i]);

    if (fs.existsSync(basePath)) {
      xstaticPath = basePath + '/lib/python2.7/site-packages/xstatic/pkg/';
      horizonRoot = basePath + '/src/horizon/';
      horizonPath = basePath + '/src/horizon/horizon/';
      openstackDashboardPath =  basePath + '/src/horizon/openstack_dashboard/';
      break;
    }
  }

  if (!xstaticPath) {
    console.error('xStatic libraries not found, please set up venv');
    process.exit(1);
  }

  config.set({
    preprocessors: {
      // Used to collect templates for preprocessing.
      // NOTE: the templates must also be listed in the files section below.
      './**/*.html': ['ng-html2js'],
      // Used to indicate files requiring coverage reports.
      './craton_dashboard/static/**/!(*.spec).js': ['coverage']
    },

    // Sets up module to process templates.
    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      cacheIdFromPath: function(filepath) {
        // This function takes the raw provided path from the file searches
        // below (in the files: pattern list), applies the filter from the
        // preprocessor above (basically, finds the html files), then uses
        // this function to translate the relative file path into a path
        // that matches what would actually be called in production.
        //
        // e.g.
        // dashboards/project/static/dashboard/project/workflow/launch-instance/configuration/load-edit.html
        // becomes:
        // /static/dashboard/project/workflow/launch-instance/configuration/load-edit.html
        // We can't just use stripPrefix because there are a couple of
        // prefixes that need to be altered (and may be more).
        return filepath.replace(/^dashboards\/[^\/]+/, '')
          .replace(/^static\/app/, '/static/app');
      },
    },

    // This establishes the base for most referenced paths as being relative
    // to this file, i.e. ./craton_dashboard.
    basePath: '.',

    // Contains both source and test files.
    files: [

      // from jasmine.html
      xstaticPath + 'jquery/data/jquery.js',
      xstaticPath + 'angular/data/angular.js',
      xstaticPath + 'angular/data/angular-route.js',
      xstaticPath + 'angular/data/angular-mocks.js',
      xstaticPath + 'angular/data/angular-cookies.js',
      xstaticPath + 'angular_bootstrap/data/angular-bootstrap.js',
      xstaticPath + 'angular_gettext/data/angular-gettext.js',
      xstaticPath + 'angular_fileupload/data/ng-file-upload-all.js',
      xstaticPath + 'angular/data/angular-sanitize.js',
      xstaticPath + 'd3/data/d3.js',
      xstaticPath + 'rickshaw/data/rickshaw.js',
      xstaticPath + 'angular_smart_table/data/smart-table.js',
      xstaticPath + 'angular_lrdragndrop/data/lrdragndrop.js',
      xstaticPath + 'spin/data/spin.js',
      xstaticPath + 'spin/data/spin.jquery.js',
      xstaticPath + 'tv4/data/tv4.js',
      xstaticPath + 'objectpath/data/ObjectPath.js',
      xstaticPath + 'angular_schema_form/data/schema-form.js',

       /**
       * Include framework source code from horizon and openstack_dashboard
       * that we need.
       * Otherwise, karma will not be able to find them when testing.
       * These files should be mocked in the foreseeable future.
       * These are located within the project's ./.venv/horizon directory.
       */

       // Getting horizon's test-shim.js for gettext modules and others
       horizonRoot + 'test-shim.js',

       horizonPath + 'static/horizon/js/horizon.js',
       horizonPath + 'static/framework/**/*.module.js',
       horizonPath + 'static/framework/**/!(*.spec|*.mock).js',
       openstackDashboardPath + 'static/app/**/*.module.js',
       openstackDashboardPath + 'static/app/**/!(*.spec|*.mock).js',
       openstackDashboardPath + 'static/app/**/*.mock.js',
       openstackDashboardPath + 'dashboards/**/static/**/**/*.module.js',

      /**
       * First, list all the files that defines application's angular modules.
       * Those files have extension of `.module.js`. The order among them is
       * not significant.
       */
      './craton_dashboard/static/app/core/**/*.module.js',

      /**
       * Followed by other JavaScript files that defines angular providers
       * on the modules defined in files listed above. And they are not mock
       * files or spec files defined below. The order among them is not
       * significant.
       */
      './craton_dashboard/static/app/core/**/!(*.spec|*.mock).js',

      /**
       * Then, list files for mocks with `mock.js` extension. The order
       * among them should not be significant.
       */
      './craton_dashboard/static/app/core/**/*.mock.js',

      /**
       * Finally, list files for spec with `spec.js` extension. The order
       * among them should not be significant.
       */
      './craton_dashboard/static/app/core/**/*.spec.js',

      /**
       * Angular external templates
       */
      './craton_dashboard/static/app/core/**/*.html'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    browserNoActivityTimeout: 60000,

    reporters: ['progress', 'coverage', 'threshold'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'karma-threshold-reporter'
    ],

    // Places coverage report in HTML format in the subdirectory below.
    coverageReporter: {
      type: 'html',
      dir: '../cover/craton_dashboard'
    },

    // Coverage threshold values.
    thresholdReporter: {
      statements: 1, // target 100
      branches: 1, // target 100
      functions: 1, // target 100
      lines: 1 // target 100
    }
  });
};