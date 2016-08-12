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

from cratonclient.v1 import regions

from openstack_dashboard.test.test_data import utils

def data(TEST):
    URL = 'http://localhost/'
    TEST.craton_regions = utils.TestDataContainer()

    # Regions

    region_1 = regions.Region(regions.RegionManager(None, URL), {
        'id': 1,
        'name': 'Region1',
        'note': 'TestNote',
        'project_id': 1
    })
    region_2 = regions.Region(regions.RegionManager(None, URL), {
        'id': 2,
        'name': 'Region2',
        'note': 'TestNote',
        'project_id': 1
    })
    region_3 = regions.Region(regions.RegionManager(None, URL), {
        'id': 3,
        'name': 'Region3',
        'note': 'TestNote',
        'project_id': 1
    })
    TEST.craton_regions.add(region_1)
    TEST.craton_regions.add(region_2)
    TEST.craton_regions.add(region_3)
