from rest_framework.pagination import PageNumberPagination


class PagePaginator(PageNumberPagination):
    page_size = 2