import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "RH.settings")
import django
django.setup()

import random
from faker import Faker
from Employees.models import *

fake = Faker()

# Generate departments
departments = []
for _ in range(10):
    department = Departement.objects.create(label=fake.company())
    departments.append(department)


# Generate job categories
job_categories = []
for _ in range(15):
    job_category = JobCategories.objects.create(label=fake.job(), main_mission=fake.text())
    job_categories.append(job_category)

# Generate employees
employees = []
for _ in range(50):
    employee = Employee.objects.create(
        firstname = fake.first_name(),
        lastname = fake.last_name(),
        gender = random.choice(['M', 'F']),
        image = fake.file_path(),
        marital_status = random.choice(['S', 'M', 'D', 'W']),
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