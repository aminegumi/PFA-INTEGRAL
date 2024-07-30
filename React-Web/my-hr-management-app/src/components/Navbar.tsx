import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Link } from '@nextui-org/react'; 


const AppNavbar: React.FC = () => {
  
  return (
    <Navbar isBordered maxWidth='full' className='bg-slate-50'>
      <NavbarBrand>
        <Link href="/" color='foreground' className='font-blod text-inherit' >
          HR Management
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                Employees
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Employee features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="list" description="View all employees">
              Employee List
            </DropdownItem>
            <DropdownItem key="attendance" description="Manage employee attendance">
              Attendance
            </DropdownItem>
            <DropdownItem key="leave" description="Handle leave requests">
              Leave Management
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                Base Data
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Base data features">
            <DropdownItem key="departments">Departments</DropdownItem>
            <DropdownItem key="job-categories">Job Categories</DropdownItem>
            <DropdownItem key="positions">Positions</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                Recruitment
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Recruitment features">
            <DropdownItem key="openings">Job Openings</DropdownItem>
            <DropdownItem key="applications">Applications</DropdownItem>
            <DropdownItem key="interviews">Interviews</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                Add
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="Add new items">
            <DropdownItem key="new-employee">New Employee</DropdownItem>
            <DropdownItem key="new-department">New Department</DropdownItem>
            <DropdownItem key="new-job-category">New Job Category</DropdownItem>
            <DropdownItem key="new-position">New Position</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

const ChevronDownIcon = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill="currentColor"
    />
  </svg>
);

export default AppNavbar;