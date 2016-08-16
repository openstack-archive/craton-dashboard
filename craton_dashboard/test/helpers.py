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


import mock

from cratonclient.v1 import client as craton_client

from openstack_dashboard.test import helpers

from craton_dashboard import api
from craton_dashboard.test.test_data import utils


def create_stubs(stubs_to_create={}):
    return helpers.create_stubs(stubs_to_create)


class CratonTestsMixin(object):
    def _setup_test_data(self):
        super(CratonTestsMixin, self)._setup_test_data()
        utils.load_test_data(self)
        self.policy_patcher = mock.patch(
            'openstack_auth.policy.check', lambda action, request: True)
        self._policy_check = self.policy_patcher.start()


class TestCase(CratonTestsMixin, helpers.TestCase):
    pass


class BaseAdminViewTests(CratonTestsMixin, helpers.TestCase):
    pass


class CratonAPITestCase(CratonTestsMixin, helpers.APITestCase):
    def setUp(self):
        super(CratonAPITestCase, self).setUp()

        self._original_craton_client = api.craton.cratonclient
        api.craton.cratonclient = lambda request: self.stub_cratonclient()

    def tearDown(self):
        super(CratonAPITestCase, self).tearDown()

        api.craton.cratonclient = self._original_craton_client

    def stub_cratonclient(self):
        if not hasattr(self, "cratonclient"):
            self.mox.StubOutWithMock(craton_client, 'Client')
            self.cratonclient = self.mox.CreateMock(craton_client.Client)
        return self.cratonclient
