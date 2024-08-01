from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Departement(models.Model):
    label = models.CharField(max_length=255)

    def __str__(self):
        return self.label

class JobCategories(models.Model):
    label = models.CharField(max_length=255)
    main_mission = models.TextField(blank=True)


    def __str__(self):
        return self.label
    

class Employee(models.Model):
    marital_status_choices = {
        'S' : 'Single',
        'M' : 'Married',
        'D' : 'Divorced',
        'W' : 'Widowed',
    }
    GENDER_CHOICES = {
        'M' : 'Male',
        'F' : 'Female',
    }
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    image = models.ImageField( upload_to='EmployeesPictures/', blank=True)
    marital_status = models.CharField(max_length=10, choices=marital_status_choices)
    date_of_birth = models.DateField(blank=True)
    address = models.CharField(max_length=100, null=True)
    insurance_number = models.CharField(max_length=254)
    nbr_of_children = models.IntegerField(blank=True, default=0)
    email = models.EmailField(max_length=254,unique=True)
    phone_number = models.CharField(max_length=255)
    salary = models.FloatField()
    RIB = models.CharField(max_length=50, blank=True)
    job_categorie = models.ForeignKey(JobCategories, on_delete=models.SET_NULL,null=True)
    departement = models.ForeignKey(Departement, on_delete=models.SET_NULL,null=True)
    hired_at = models.DateField(auto_now=True)
    emp_responsable = models.ForeignKey('self',on_delete=models.DO_NOTHING,null=True,blank=True)


    def clean(self):
        super().clean()
        if self.emp_responsable == self:
            raise ValidationError("Parent cannot be the same as the current object.")
    

    def save(self, *args, **kwargs):
        if self.marital_status == 'S' :
            self.nbr_of_children = 0
        self.full_clean()
        super().save(*args, **kwargs)
    
    
    def __str__(self):
        return f"{self.firstname} {self.lastname}"
    

class Experience(models.Model):
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"
    

class AcademicCurriculum(models.Model):
    diplome = models.CharField(max_length=50)
    school = models.CharField(max_length=150)
    date_of_obtaining = models.DateField()
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    def __str__(self):
        return self.diplome

    

