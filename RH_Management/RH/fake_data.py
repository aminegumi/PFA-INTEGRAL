import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "RH.settings")
import django
django.setup()

import random
from faker import Faker
from Employees.models import *


# Initialize the Faker object
fake = Faker()

# Define custom department names
department_names = [
    "Human Resources", "Research & Development", "Engineering",
    "Technical Means", "General Resources", "Administration",
    "Finance", "Marketing", "Sales", "Customer Support"
]

# Generate departments
departments = []
for name in department_names:
    department = Departement.objects.create(label=name)
    departments.append(department)

# Define custom job categories
job_categories_data = [
    {"label": "CEO", "main_mission": "Oversee all operations and business activities."},
    {"label": "CTO", "main_mission": "Lead technology strategy and innovation."},
    {"label": "Department Chief", "main_mission": "Manage department operations and team performance."},
    {"label": "Team Leader", "main_mission": "Coordinate and guide team members."},
    {"label": "Engineer", "main_mission": "Design, develop, and test engineering solutions."},
    {"label": "Technician", "main_mission": "Maintain and troubleshoot technical equipment."},
    {"label": "Accountant", "main_mission": "Manage financial records and transactions."},
    {"label": "RH_Recruitment Officer", "main_mission": "Handle recruitment and hiring processes."},
    {"label": "RH_Social Auditor", "main_mission": "Audit social policies and compliance."},
    {"label": "RH_Training Officer", "main_mission": "Organize and oversee employee training programs."},
    {"label": "RH_Former", "main_mission": "Conduct training sessions and workshops."},
    {"label": "RH_Compensation & Benefits Specialist", "main_mission": "Manage employee compensation and benefits."},
    {"label": "Project Manager", "main_mission": "Plan and oversee project execution."},
    {"label": "Product Manager", "main_mission": "Manage product development and lifecycle."},
    {"label": "Marketing Specialist", "main_mission": "Develop and implement marketing strategies."}
]

# Generate job categories
job_categories = []
for category in job_categories_data:
    job_category = JobCategories.objects.create(
        label=category["label"], 
        main_mission=category["main_mission"]
    )
    job_categories.append(job_category)

# Generate employees
employees = []
for _ in range(50):
    employee = Employee.objects.create(
        firstname = fake.first_name(),
        lastname = fake.last_name(),
        gender = random.choice(['Male', 'Female']),
        image = fake.file_path(),
        marital_status = random.choice(['Single', 'Married', 'Divorced', 'Widowed']),
        date_of_birth = fake.date_of_birth(minimum_age=22, maximum_age=65),
        address = fake.address(),
        insurance_number = fake.sentence(),
        nbr_of_children = random.randint(0, 5),
        email = fake.email(),
        phone_number = fake.phone_number(),
        salary = round(random.uniform(30000, 120000), 2),
        RIB = fake.bban(),
        job_categorie = random.choice(job_categories),
        departement = random.choice(departments),
        hired_at = fake.date_this_decade(),
        emp_responsable = random.choice(employees) if employees else None,
        
    )
    employees.append(employee)

# Assign responsible employees to departments
for department in departments:
    responsible_employee = random.choice(employees)
    department.responsable = responsible_employee
    department.save()

# #Generate Experiences
# experiences = []
# for _ in range(100):
#     experience = Experience.objects.create(
#         job_title=fake.job(),
#         company_name=fake.company(),
#         start_date=fake.date_between(start_date='-10y', end_date='-1y'),
#         end_date=fake.date_between(start_date='-1y', end_date='today'),
#         description=fake.text(),
#         employee_id=random.choice(employees)
#     )
#     experiences.append(experience)

# academicCurriculums = []
# for _ in range(70):
#     academicCurriculum = AcademicCurriculum.objects.create(
#         diplome = fake.sentence(),
#         school = fake.sentence(),
#         date_of_obtaining = fake.date(),
#         employee_id = random.choice(employees)
#     )
#     academicCurriculums.append(academicCurriculum)

print(f"Created {len(departments)} departments, {len(job_categories)} job categories, {len(employees)} employees, {len(employees)} academic ,and {len(employees)}.")