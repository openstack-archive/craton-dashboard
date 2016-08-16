from django.conf.urls import url

from craton_dashboard.content.fleet_management.taskflows import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
]
