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

(function () {
  'use strict';

  describe('horizon.dashboard.project.fleet_management.regions RegionsDrawerController',
    function () {
      beforeEach(module('horizon.app.core.openstack-service-api'));
      beforeEach(module('horizon.framework'));
      beforeEach(module('horizon.dashboard.project'));
      beforeEach(module('horizon.dashboard.project.fleet_management'));

      var /*$q, $rootScope,*/ scope, cratonAPI, controller;

      beforeEach(inject( function ($injector, _$q_, _$rootScope_) {
        controller = $injector.get('$controller');
        // $q = _$q_;
        // $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        cratonAPI = $injector.get('horizon.app.core.openstack-service-api.craton');
      }));

      function createController() {
        return controller(
          'horizon.dashboard.project.fleet_management.regions.RegionDrawerController',
          {$scope: scope});
      }

      it('should call api getHosts when created', function test() {
        spyOn(cratonAPI, 'getHosts').and.callThrough();
        createController();
        expect(cratonAPI.getHosts).toHaveBeenCalled();
      });
    });

})();
