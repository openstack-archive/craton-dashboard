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


from cratonclient import session as craton_session
from cratonclient.v1 import client as craton_client

from horizon.utils.memoized import memoized  # noqa
from horizon.utils.memoized import memoized_with_request  # noqa

from openstack_dashboard.api import base


def get_auth_params_from_request(request):
    return(
        request.user.username,
        request.user.token.id,
        request.user.tenant_id,
        base.url_for(request, 'craton')
    )


@memoized_with_request(get_auth_params_from_request)
def cratonclient(request_auth_params):
    username, token, project_id, url = request_auth_params
    session = craton_session.Session(username=username, token=token)
    c = craton_client.Client(session=session, url=url)
    return c


def project_create(request, **kwargs):
    pass


def project_delete(request, **kwargs):
    pass


def project_list(request, **kwargs):
    pass


def project_show(request, **kwargs):
    pass


def project_update(request, **kwargs):
    pass


def region_create(request, **kwargs):
    pass


def region_delete(request, **kwargs):
    pass


@memoized
def region_list(request, **kwargs):
    return cratonclient(request).regions.list(**kwargs)


def region_show(request, **kwargs):
    pass


def region_update(request, **kwargs):
    pass


def cell_create(request, **kwargs):
    pass


def cell_delete(request, **kwargs):
    pass


def cell_list(request, **kwargs):
    pass


def cell_show(request, **kwargs):
    pass


def cell_update(request, **kwargs):
    pass


def device_create(request, **kwargs):
    pass


def device_delete(request, **kwargs):
    pass


def device_list(request, **kwargs):
    pass


def device_show(request, **kwargs):
    pass


def host_create(request, **kwargs):
    pass


def host_delete(request, **kwargs):
    pass


def host_list(request, **kwargs):
    pass


def host_show(request, **kwargs):
    pass


def host_update(request, **kwargs):
    pass


def user_list(request, **kwargs):
    pass
