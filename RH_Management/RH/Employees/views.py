from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import JsonResponse

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

class JobCategoriesViewSet(viewsets.ModelViewSet) :
    queryset = JobCategories.objects.all()
    serializer_class = JobCategoriesSerializer

class ExperienceViewSet(viewsets.ModelViewSet) :
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    # @action(detail=False, methods=['get'])
    # def detailed_list(self, request):
    #     employees = Employee.objects.prefetch_related('experiences', 'diplomes').order_by('id', 'experiences__id', 'diplomes__id')
    #     serializer = self.get_serializer(employees, many=True)
    #     return Response(serializer.data)


class AcademicCurriculumViewSet(viewsets.ModelViewSet):
    queryset = AcademicCurriculum.objects.all()
    serializer_class = AcademicCurriculumSerializer



