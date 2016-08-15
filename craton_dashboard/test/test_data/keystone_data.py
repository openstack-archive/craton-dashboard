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


def data(TEST):

    # Add craton to the keystone data
    TEST.service_catalog.append(
        {"type": "fleetmanagement",
         "name": "craton",
         "endpoints_links": [],
         "endpoints": [
             {"region": "RegionOne",
              "adminURL": "http://admin.craton.example.com:8080/v1.1",
              "publicURL": "http://public.craton.example.com:8080/v1.1",
              "internalURL": "http://int.craton.example.com:8080/v1.1"}]}
    )
