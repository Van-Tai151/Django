from pages.models import Post, Page, Tag, Lesson, User, Comment
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class BaseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    tags = TagSerializer(many=True)
    def get_image(self, page):
        if page.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % page.image.name)
            return '/static/%s' % page.image.name


class PageSerializer(BaseSerializer):
    class Meta:
        model = Page
        fields = '__all__'


class LessonSerializer(BaseSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'image', 'tags', 'content', 'created_date', 'updated_date']


class LessonDetailsSerializer(LessonSerializer):
    liked = serializers.SerializerMethodField()

    def get_liked(self, lesson):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return lesson.like_set.filter(active=True).exists()

    class Meta:
        model = LessonSerializer.Meta.model
        fields = LessonSerializer.Meta.fields + ['liked']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password', 'email', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()
        user = User(**data)
        user.set_password(data['password'])
        user.save()

        return user


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'user']