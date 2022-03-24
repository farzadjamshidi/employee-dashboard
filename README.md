# employee-dashboard

## Dashboard

This is the first page that the admin will see once inside of the application. The
dashboard is a page where we will display general employee information and this
information summary. The dashboard is split into few sections:
General information on the dashboard
● Show the total number of employees
● Their total Clocked in time
● The total amount paid for regular hours
● The total overtime amount paid for overtime hours
● The table with employees detail
● Bulk edit button
Employees detail table should have a list of all employees with the next fields
● Select (Checkbox to select a row)
● Name
● Email
● Total Clocked in a time
● The total amount paid for regular hours
● The total overtime amount paid for overtime hours

## Bulk edit
You can click and select employees and when you click on “bulk edit” a popup will
appear where you can change for all selected employees
- Employee name
- Employee hourly rate
- Employee overtime hourly rate
- Shifts information (clock in/out time)
In general, this should look like a popup where for every employee you will have a
small form to edit basic information and a small table with information about his shifts
and the ability to select the days for an easier edit and one Save button for all pieces of
information.

## Tasks

### Task1
Make employee and shift routes for APIs. Just return list of them.

### Task2
Make a service to transform employee and shift list to the data used in dashboard and table.
Show summary section. Show employee table with check box for each one.

### Task3
Show bulk edit dialog with actual data of today.

### Task4
Change data in bulk edit dialog based on calendar.

### Task5
Save the changes of bulk edit dialog.

### Task6 (Additional Features)
Add shared library
Add loading component to shared library
Add Docker

## Development server

A. With out docker
1) Switch to back-end folder and run 'npm install' then run 'npm start' in command line
2) Switch to front-end folder and run 'npm run publish:local' then run 'npm start' in command line

B. With docker
1) Run 'docker compose up' in command line