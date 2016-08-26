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
   * @ngdoc Craton Regions module for fleet managament
   *
   * @name horizon.dashboard.project.fleet_management.regions
   *
   * @description
   * Provides services and widgets required to support and display
   * fleet management regions content
   */

  angular
    .module('horizon.dashboard.project.fleet_management.regions', ['ngRoute'])
    .constant('horizon.dashboard.project.fleet_management.resourceType', 'OS::Craton::Region')
    .run(run)
    .config(config);

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.craton',
    'horizon.dashboard.project.fleet_management.basePath',
    'horizon.dashboard.project.fleet_management.resourceType'
  ];

  function run(registry, craton, basePath, cratonResourceType) {
    registry.getResourceType(cratonResourceType)
      .setNames(gettext('Region'), gettext('Regions'))
      .setSummaryTemplateUrl(basePath + 'inventory/details/drawer.html')
      .setProperty('name', {label: gettext('Name')})
      .setProperty('id', {label: gettext('ID')})
      .setProperty('note', {label: gettext('Note')})
      .setProperty('project_id', {label:gettext('Project ID')})
      .setListFunction(listFunction)
      .tableColumns
      .append({
        id: 'name',
        priority: 1,
        sortDefault: true
      })
      .append({
        id: 'id',
        priority: 1
      })
      .append({
        id: 'note',
        priority: 2
      })
      .append({
        id: 'project_id',
        priority: 3
      });

    function listFunction() {
      return craton.getRegions();
    }
  }

  config.$inject = [
    '$provide',
    '$windowProvider',
    '$routeProvider'
  ];

  function config($provide, $windowProvider, $routeProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/project/fleet_management/inventory/';
    $provide.constant('horizon.dashboard.project.fleet_management.regions.basePath', path);

    $routeProvider.when('/fleet_management/', {
      templateUrl: path + 'panel.html'
    });
  }
})();
