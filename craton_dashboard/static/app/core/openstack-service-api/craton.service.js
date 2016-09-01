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

  /**
   * @ngdoc service
   * @name cratonAPI
   * @param {Object} apiService
   * @param {Object} toastService
   * @description provides direct pass through craton with NO abstraction
   * @returns {Object} the service
   */

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.craton', cratonAPI);

  cratonAPI.$inject = [
    '$q',
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  function cratonAPI($q, apiService, toastService) {
    var service = {
      getRegions: getRegions,
      getHosts: getHosts,
      getRegion: getRegion
    };

    /**
     * @name getRegions
     * @description Gets a list of regions
     *
     * @returns {Object} an object with 'items'
     */
    function getRegions() {
      return apiService.get('api/craton/regions')
          .error(function error() {
            toastService.add('error', gettext("Unable to get the Craton regions listing"));
          });

    }

    /**
     * @name getRegion
     * @param identifier Region Id
     * @returns {Object} api call result
     */
    function getRegion(identifier) {
      return apiService.get('api/craton/regions/' + identifier + '/')
          .error(function error() {
            toastService.add('error', gettext("Unable to get the Craton Region"));
          });
    }

    /**
     * @name getHosts
     * @description Gets a list of hosts
     * @param params {Object} query filter params
     * @returns {Object} an object with 'items'
     */
    function getHosts(params) {
      var config = params ? {'params': params} : {};
      return apiService.get('api/craton/hosts', config)
        .error(function error() {
          toastService.add('error', gettext('Unable to retrieve the hosts'));
        });
    }

    return service;
  }

}());
