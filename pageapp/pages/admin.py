from django.contrib import admin
from django.template.response import TemplateResponse

from .models import Post, Page, Lesson, Tag
from django.utils.html import mark_safe
# Register your models here.
from django import forms
from django.urls import path
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from pages import dao


class PageAppAdminSite(admin.AdminSite):
    site_header = 'iSuccess'

    def get_urls(self):
        return [
            path('page-stats/', self.stats_view)
        ] + super().get_urls()

    def stats_view(self, request):
        return TemplateResponse(request, 'admin/stats.html',{
            'stats': dao.count_pages_by_pag()
        })


admin_site = PageAppAdminSite(name='Socialapp')


class PageForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Page
        fields = '__all__'


class TagInlineAdmin(admin.StackedInline):
    model = Page.tags.through


class PostAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name']
    search_fields = ['name']
    list_filter = ['id', 'name']


class PageAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'created_date', 'updated_date', 'post', 'active']
    readonly_fields = ['img']
    inlines = [TagInlineAdmin]
    form = PageForm

    def img(self, page):
        if page:
            return mark_safe(
                '<img src="/static/{url}" width="120" />' \
                    .format(url=page.image.name)
            )

    class Media:
        css = {
            'all': ('/static/css/style.css',)
        }


admin_site.register(Post, PostAdmin)
admin_site.register(Page, PageAdmin)
admin_site.register(Lesson)
admin_site.register(Tag)
