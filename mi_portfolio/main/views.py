from django.shortcuts import render
from .models import MainData,Experience,Skill,Education, Project,Post

# Create your views here.
def home(request):
    maindata=MainData.objects.first()
    experiences=Experience.objects.all()
    skills=Skill.objects.all()
    educations = Education.objects.all()
    projects=Project.objects.all()
    posts=Post.objects.all()

    context = {
        'maindata': maindata,
        'experiences': experiences,
        'skills': skills,
        'educations': educations,
        'projects':projects,
        'posts':posts

    }
    return render(request, 'main/home.html', context)