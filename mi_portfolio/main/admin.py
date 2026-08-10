from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import MainData,Experience,Skill,Education,Project,Post

@admin.register(MainData)
class MainDataAdmin(ImportExportModelAdmin):
    list_display=('name', 'last_name', 'telephone', 'profile_picture','linkedin','intro')

@admin.register(Experience)
class ExperienceAdmin(ImportExportModelAdmin):
    list_display=('title', 'company', 'startdate', 'enddate','description','company_photo')

@admin.register(Project)
class ProjectAdmin(ImportExportModelAdmin):
    list_display=('name', 'description', 'image', 'github', 'web')
    
@admin.register(Skill)
class SkillAdmin(ImportExportModelAdmin):
    list_display=('name', 'logo', 'hard')
    filter_horizontal = ('experiences', 'projects')

@admin.register(Education)
class EducationAdmin(ImportExportModelAdmin):
    list_display=('name', 'institucion', 'certificade', 'description', 'startdate','enddate' )

@admin.register(Post)
class PostAdmin(ImportExportModelAdmin):
    list_display=('title', 'description', 'linkedin', 'image')
