from rest_framework import serializers
from .models import *

class SimpleEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'firstname', 'lastname', 'email', 'phone_number', 'image']

class DepartementSerializer(serializers.ModelSerializer):
    responsable = SimpleEmployeeSerializer(read_only=True)
    nbr_emps = serializers.SerializerMethodField()

    class Meta:
        model = Departement
        fields = ['id', 'label', 'responsable', 'nbr_emps']
    
    def get_nbr_emps(self, obj):
        return obj.get_employee_count()

class DepartementWithEmployeesSerializer(serializers.ModelSerializer):
    responsable = SimpleEmployeeSerializer(read_only=True)
    nbr_emps = serializers.SerializerMethodField()
    employees = SimpleEmployeeSerializer(source='employee_set', many=True, read_only=True)

    class Meta:
        model = Departement
        fields = ['id', 'label', 'responsable', 'nbr_emps', 'employees']
    
    def get_nbr_emps(self, obj):
        return obj.get_employee_count()

class JobCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategories
        fields = ['id', 'label', 'main_mission']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'job_title', 'company_name',
            'start_date', 'end_date', 'description',
            'employee'
        ]
        
class AcademicCurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCurriculum
        fields = [
            'id', 'diplome', 'school',
            'date_of_obtaining', 'employee'
        ]

class EmployeeSerializer(serializers.ModelSerializer):
    departement = serializers.PrimaryKeyRelatedField(queryset=Departement.objects.all(), allow_null=True)
    job_categorie = serializers.PrimaryKeyRelatedField(queryset=JobCategories.objects.all(), allow_null=True)
    emp_responsable = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True)

    class Meta:
        model = Employee
        fields = [
            'id', 'firstname', 'lastname', 'gender', 'image', 'marital_status', 
            'date_of_birth', 'address', 'insurance_number', 'nbr_of_children',
            'email', 'phone_number', 'salary', 'RIB', 'job_categorie', 
            'departement', 'hired_at', 'emp_responsable', 'experiences', 'diplomes',
        ]
