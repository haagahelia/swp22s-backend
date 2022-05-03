# swp22k-backend

The URLs were (temporarily or possibly finally) changed so that they are of these patterns:

http://IP_ADDRESS_HERE:PORT_HERE/

http://IP_ADDRESS_HERE:PORT_HERE/api/report/ 

http://IP_ADDRESS_HERE:PORT_HERE/api/task/324852348sdfsaf8qwe57erf 

## Database commands needed 

> mariadb -h localhost -u db_admin_username_here -p

(and give the password later, after hitting Enter, with right-click + Enter again)

> USE db22k;

at least these are needed while testing:       (Possibly also drop tables, create tables,)
...

> SOURCE ./Database/SQL_Scripts/03_insert_tech_test_data.sql;

> SOURCE ./Database/SQL_Scripts/06_delete_all_tasks.dsql;

> SOURCE ./Database/SQL_Scripts/03_insert_tech_test_data.sql;
