from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    avatar = CloudinaryField('avatar', null=True)


class BaseModel(models.Model):
    created_date = models.DateField(auto_now_add=True, null=True)
    updated_date = models.DateField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


# Create your models here.
class Post(BaseModel):
    name = models.CharField(max_length=50, null=False)

    def __str__(self):
        return self.name


class Page(BaseModel):
    title = models.CharField(max_length=255, null=False)
    description = RichTextField()
    image = models.ImageField(upload_to='pages/%Y/%m')
    post = models.ForeignKey(Post, on_delete=models.RESTRICT, related_query_name='pages')
    tags = models.ManyToManyField('Tag')

    def __str__(self):
        return  self.title

    class Meta:
        unique_together = ('title', 'post')


class Lesson(BaseModel):
    title = models.CharField(max_length=255, null=False)
    content = RichTextField()
    image = models.ImageField(upload_to='lessons/%Y/%m')
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')

    class Meta:
        unique_together = ('title', 'page')


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def  __str__(self):
        return self.name


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, null=False)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=255, null=False)


class Like(Interaction):
    active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'lesson')


class Rating(Interaction):
    rate = models.SmallIntegerField(default=0)