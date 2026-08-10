from django.db import models

class MainData(models.Model):
    name= models.CharField("Nombre del autor de porftolio",max_length=50, default="Damian")
    last_name=models.CharField("Apellido autor de porftolio",max_length=50, default="Dubra")
    telephone= models.CharField("numero de telefono", max_length=50, default="+54 11 2537-2402")
    profile_picture= models.ImageField("imagen de perfil", upload_to="about_images/")
    linkedin=models.URLField("url linkedin")
    intro=models.TextField("introduccion")

    class Meta:
        verbose_name= "Personal Data"
        verbose_name_plural="Personal datas"

    def __str__(self):
        return f"{self.name}, {self.last_name}"
    
class Experience(models.Model):
    title= models.CharField("titulo del puesto", max_length=200)
    company= models.CharField("Empresa empleadora", max_length=50)
    startdate= models.DateField("fecha de inicio")
    enddate= models.DateField("fecha de final", blank=True, null= True)
    description= models.TextField("descripcion del puesto")
    company_photo= models.ImageField("logo de empresa", upload_to="about_images/",blank=True, null=True)

    class Meta:
        verbose_name= "Expirience"
        verbose_name_plural = "Experiencies"

    def __str__(self):
        return f"{self.title}, {self.company}"

class Project(models.Model):
    name=models.CharField("nombre del proyecto", max_length=50)
    description=models.TextField("descripcion de proyecto")
    image=models.ImageField("imagen del proyecto",upload_to="about_images/",null=True, blank=True)
    github=models.URLField("enlace github")
    web=models.URLField("web activa", null=True, blank=True)

    class Meta:
        verbose_name="Project"
        verbose_name_plural="Projects"

    def __str__(self):
        return f"{self.name}"

class Skill(models.Model):
    name= models.CharField("nombre de la habilidad", max_length=50)
    logo= models.ImageField("logo de la tecnologia", upload_to="about_images/",blank=True, null=True)
    hard= models.BooleanField("si es hard skill")
    experiences = models.ManyToManyField(Experience, blank=True, related_name="skills")
    projects = models.ManyToManyField(Project, blank=True, related_name="skills")
    class Meta:
        verbose_name = "Skill"
        verbose_name_plural= "Skills"

    def __str__(self):
        return f"{self.name}"

class Education(models.Model):
    name= models.CharField("Nombre de la carrera", max_length=50)
    institucion= models.CharField("nombre de la institucion", max_length=50)
    certificade = models.FileField("certificado de final", upload_to='certificates/', blank=True, null=True)
    description= models.TextField("descripcion de la carrera")
    startdate= models.DateField("fecha de inicio")
    enddate= models.DateField("fecha de final",blank=True, null=True)

    class Meta:
        verbose_name= "Education"
        verbose_name_plural= "Educations"

    def __str__(self):
        return f"{self.name}"

class Post(models.Model):
    title=models.CharField("titulo", max_length=50)
    description= models.TextField("texto de la publicacion")
    linkedin= models.URLField("link de la publicacion", null=True, blank=True)
    image= models.ImageField("imagen de la publi", null=True,blank=True)

    class Meta:
        verbose_name= "Post"
        verbose_name_plural= "Posts"
