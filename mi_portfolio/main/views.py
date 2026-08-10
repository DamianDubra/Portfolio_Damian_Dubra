from django.shortcuts import render,redirect
from .models import MainData,Experience,Skill,Education, Project,Post,ContactMessage

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

def contact(request):
    if request.method == "POST":
        email = request.POST.get("email")
        message = request.POST.get("message")

        ContactMessage.objects.create(
            email=email,
            message=message,
        )

        return redirect("/")

    return redirect("/")