from django.contrib import admin

# Register your models here.
from .models import MainData,Experience,Skill,Education,Project,Post

@admin.register(MainData)
class MainDataAdmin(admin.ModelAdmin):
    list_display=('name', 'last_name', 'telephone', 'profile_picture','linkedin','intro')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display=('title', 'company', 'startdate', 'enddate','description','company_photo')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display=('name', 'logo', 'hard')
    filter_horizontal = ('experiences', 'projects')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display=('name', 'institucion', 'certificade', 'description', 'startdate','enddate' )

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display=('name', 'description', 'image', 'github', 'web')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=('title', 'description', 'linkedin', 'image')
