# Copyright 2016 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.conf import settings
from django.views import generic

from craton_dashboard.api import craton


from openstack_dashboard import api
from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils

from six.moves.urllib import request

@urls.register
class Regions(generic.View):
    """API for craton"""

    url_regex = r'craton/regions/$'

    @rest_utils.ajax()
    def get(self, request, **kwargs):
        """Gets all Regions"""
        regions = craton.region_list(request)
        return {'items': regions}

    @rest_utils.ajax()
    def post(self, request, **kwargs):
        """Creates a new Region"""
        return craton.region_create(request)

    @rest_utils.ajax()
    def put(self, request, **kwargs):
        """Updates a Region"""
        return craton.region_update(request)

    @rest_utils.ajax()
    def delete(self, request, **kwargs):
        """Deletes a Region"""
        return craton.region_delete(request)


@urls.register
class Cells(generic.View):
    """API for craton"""

    url_regex = r'craton/cells/$'

    @rest_utils.ajax()
    def get(self, request, **kwargs):
        """Gets all Cells"""
        return craton.cell_list(request)

    @rest_utils.ajax()
    def post(self, request, **kwargs):
        """Creates a new Cell"""
        return craton.cell_create(request)

    @rest_utils.ajax()
    def put(self, request, **kwargs):
        """Updates a Cell"""
        return craton.cell_update(request)

    @rest_utils.ajax()
    def delete(self, request, **kwargs):
        """Deletes a Cell"""
        return craton.cell_delete(request)

@urls.register
class Hosts(generic.View):
    """API for craton"""

    url_regex = r'craton/hosts/$'

    @rest_utils.ajax()
    def get(self, request, **kwargs):
        """Gets all Hosts"""
        return craton.host_list(request)

    @rest_utils.ajax()
    def post(self, request, **kwargs):
        """Creates a new Host"""
        return craton.hosts_create(request)

    @rest_utils.ajax()
    def put(self, request, **kwargs):
        """Updates a Host"""
        return craton.hosts_update(request)

    @rest_utils.ajax()
    def delete(self, request, **kwargs):
        """Deletes a Host"""
        return craton.hosts_delete(request)

