# Generated by Django 4.2.10 on 2024-02-24 08:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_alter_lesson_content_alter_page_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_query_name='pages', to='pages.post'),
        ),
    ]