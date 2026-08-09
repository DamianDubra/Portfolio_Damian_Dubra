from django.shortcuts import render
from .models import MainData,Experience,Skill,Education, Project,Post

# Create your views here.
def home(request):
    maindata=MainData.objects.first()
    experience=Experience.objects.all()
    skill=Skill.objects.all()
    education = Education.objects.all()
    project=Project.objects.all()
    post=Post.objects.all()

    context = {
        'maindata': maindata,
        'experience': experience,
        'skill': skill,
        'education': education,
        'project':project,
        'post':post

    }
    return render(request, 'main/home.html', context)