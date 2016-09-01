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

  angular.module('horizon.dashboard.project.fleet_management.regions')
    .controller('horizon.dashboard.project.fleet_management.regions.RegionDrawerController',
      RegionDrawerController);

  RegionDrawerController.$inject = [
    'horizon.dashboard.project.fleet_management.regions.resourceType',
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.craton',
    '$scope'
  ];

  function RegionDrawerController(regionResourceType, registry, cratonApi, $scope) {
    var ctrl = this;

    ctrl.region = $scope.item || {};
    ctrl.region.hosts = [];
    ctrl.resourceType = registry.getResourceType(regionResourceType);

    getHosts();

    function getHosts() {
      cratonApi.getHosts({region_id: ctrl.region.id }).then(function resolve(data) {
        ctrl.region.hosts = data.data.items;
      });
    }
  }

})();
