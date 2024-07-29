from rest_framework import serializers
from .models import *

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = ['id','label']

class JobCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategories
        fields = ['id','label','main_mission']



class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'job_title', 'company_name',
            'start_date', 'end_date', 'description',
            'employee_id'
        ]
        
class AcademicCurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCurriculum
        fields = [
            'id', 'diplome', 'school',
            'date_of_obtaining', 'employee_id'
        ]


class EmployeeSerializer(serializers.ModelSerializer):
    departement = DepartementSerializer(read_only=True)
    job_categorie = JobCategoriesSerializer(read_only=True)
    emp_responsable = serializers.PrimaryKeyRelatedField(read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    diplomes = AcademicCurriculumSerializer(many=True, read_only=True)
    class Meta:
        model = Employee
        fields = [
            'id', 'firstname', 'lastname', 'gender', 'image', 'marital_status', 
            'date_of_birth', 'address',
            'insurance_number', 'nbr_of_children',
            'email', 'phone_number', 'salary', 'RIB',
            'job_categorie', 'departement', 'hired_at', 'emp_responsable',
            'experiences', 'diplomes',
        ]
