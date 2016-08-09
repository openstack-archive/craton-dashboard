===============================
Craton UI for Horizon Dashboard
===============================


Install
-------

From http://docs.openstack.org/developer/horizon/tutorials/plugin.html

* plugin is the location of your plugin
* horizon is the location of horizon
* package is the complete name of your packaged plugin

1. Run “cd plugin & python setup.py sdist”
2. Run “cp -rv enabled horizon/openstack_dashboard/local/”
3. Run “horizon/tools/with_venv.sh pip install dist/package.tar.gz”
4. Restart Apache or your Django test server

