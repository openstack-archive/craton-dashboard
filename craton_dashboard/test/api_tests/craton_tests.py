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

from craton_dashboard import api
from craton_dashboard.test import helpers as test


class CratonApiTests(test.CratonAPITestCase):

    def test_regions_list(self):
        regions = self.craton_regions.list()
        cratonclient = self.stub_cratonclient()
        cratonclient.regions = self.mox.CreateMockAnything()
        cratonclient.regions.list(project_id=regions[0].project_id)\
            .AndReturn(regions)
        self.mox.ReplayAll()
        result = api.craton.region_list(self.request,
                                        project_id=regions[0].project_id)

        self.assertEqual(len(regions), len(result))
