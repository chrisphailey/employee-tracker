INSERT INTO departments (name)
VALUES
    ('Service'),
    ('Finance'),
    ('Sales'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Customer Service', 80000, 1),
    ('Human Resources', 75000, 1),
    ('Wealth Manager', 90000, 2),
    ('Accountant', 85000, 2),
    ('Sales Rep', 105000, 3),
    ('Outside Sales', 98000, 3),
    ('Mechanic', 65000, 4),
    ('Software Engineer', 120000, 4);

INSERT INTO employees (name, role_id, manager_id)
VALUES
    ('Jane Clide', 1, 1),
    ('Larry Stevens', 2, 1),
    ('Johnny Denver', 3, 2),
    ('Jimmy Hendrix', 4, 2),
    ('Stevie Nicks', 5, 3),
    ('Dolly Parton', 6, 3),
    ('Jack Black', 7, 4),
    ('Lucile Ball', 8, 4);


