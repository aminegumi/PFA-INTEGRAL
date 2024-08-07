from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.db.models import Count

# Create your views here.

class DepartementViewSet(viewsets.ModelViewSet):
    queryset = Departement.objects.all()
    serializer_class = DepartementSerializer

    '''
        this create automatically (list, create, retrieve,update,destroy).
        While ViewSets provide a lot of functionality out of the box, you might need to customize their behavior. You can override action methods like create(), update(), or destroy() to add custom logic.
        We can also add some custom Action, here's the steriotype :

                @action(detail=True, methods=['post'])
	            def like(self, request, pk=None):
    	            blogpost = self.get_object()
    	            # Add logic to like the blog post
    	            return Response({'status': 'blog post liked'})
                    
    '''

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def perform_update(self, serializer):
        instance = serializer.save()
        if instance.responsable and instance.responsable.job_categorie.label != "Department Chief":
            raise ValidationError("Only employees with the job category 'Department Chief' can be assigned as department heads.")
        instance.save()

    @action(detail=False, methods=['get'])
    def list_department_employees(self, request):
        departments = Departement.objects.prefetch_related('employee_set')
        serializer = DepartementWithEmployeesSerializer(departments, many=True)
        return Response(serializer.data)

class JobCategoriesViewSet(viewsets.ModelViewSet) :
    queryset = JobCategories.objects.all()
    serializer_class = JobCategoriesSerializer

class ExperienceViewSet(viewsets.ModelViewSet) :
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def perform_create(self, serializer):  # sourcery skip: class-extract-method
        instance = serializer.save()
        instance.clean()
        instance.save()

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.clean()
        instance.save()
    # @action(detail=True, methods=['get'])
    # def detailed_list(self, request):
    #     employees = Employee.objects.prefetch_related('experiences', 'diplomes').order_by('id', 'experiences__id', 'diplomes__id')
    #     serializer = self.get_serializer(employees, many=True)
    #     return Response(serializer.data)

    


class AcademicCurriculumViewSet(viewsets.ModelViewSet):
    queryset = AcademicCurriculum.objects.all()
    serializer_class = AcademicCurriculumSerializer



