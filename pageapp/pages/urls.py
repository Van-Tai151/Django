
from django.urls import path, re_path, include
from rest_framework import routers
from pages import views

router = routers.DefaultRouter()
router.register('posts', views.PostViewSet, basename='posts')
router.register('pages', views.PageViewSet, basename='pages')
router.register('lessons', views.LessonViewSet, basename='lessons')
router.register('users', views.UserViewSet, basename='users')
router.register('comments', views.CommentViewSet, basename='comments')

urlpatterns = [
    path('', include(router.urls)),

]
