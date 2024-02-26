# truy van du lieu
from .models import Post, Page
from django.db.models import Count

def laod_pages(params={}):
    q = Page.objects.filter(active=True)
    kw = params.get('kw')
    if kw:
        q = q.filter(title__incontains=kw)
    pos_id = params.get('pag_id')
    if pos_id:
        q = q.filter(post_id=pos_id)

    return q


def count_pages_by_pag():
    return Post.objects.annotate(count=Count('pages__id')).values("id", "name", "count").order_by('count')