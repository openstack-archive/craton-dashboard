/**
 * Copyright 2016 Intel Corporation
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

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.dashboard.project
   *
   * @description
   * Dashboard module to host various backup panels.
   */
  angular
    .module('horizon.dashboard.project.fleet_management', [])
    .config(config);

  config.$inject = [
    '$provide',
    '$windowProvider',
    '$routeProvider'
  ];

  function config($provide, $windowProvider, $routeProvider) {
    var basePath = $windowProvider.$get().STATIC_URL + 'dashboard/project/fleet_management/';
    $provide.constant('horizon.dashboard.project.fleet_management.basePath', basePath);

    var regions = '/project/regions',
        taskflows = '/project/fleet/taskflows',
        alerts = '/project/fleet/alerts',
        auditor = '/project/fleet/auditor',
        reporting = '/project/fleet/reporting',
        inventory = '/project/fleet/inventory';

    $routeProvider
      .when(regions, {
        templateUrl: basePath + 'regions/index.html'
     }).
       when(taskflows, {
        templateUrl: basePath + 'taskflows/index.html'
     }).
       when(alerts, {
        templateUrl: basePath + 'alerts/index.html'
     }).
       when(auditor, {
        templateUrl: basePath + 'auditor/index.html'
     }).
       when(reporting, {
        templateUrl: basePath + 'reporting/index.html'
     }).
       when(inventory, {
        templateUrl: basePath + 'inventory/index.html'
     });
  }

})();
