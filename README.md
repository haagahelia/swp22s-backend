# swp22k-backend

Note: Please do not use yarn for this project. When everybody uses npm
it's easier. (To my knowledge yarn also did not surpass npm in popularity and
people are turning back to npm?)

## Installation steps
0. (If you have an old installation, remove it, or remove at least node_modules and package-lock.json/yarn.lock etc.)
1. git clone / git pull
1. npm install
1. create an '.env' file to the root of the project folder. Model for the file found in Teams > DevOps, Linux > Files > .xlsx

4. npm start

# backend URL patterns for testing
The URLs were (temporarily or possibly finally) changed so that they are of these patterns:

http://IP_ADDRESS_HERE:PORT_HERE/

http://IP_ADDRESS_HERE:PORT_HERE/api/report/ 

http://IP_ADDRESS_HERE:PORT_HERE/api/task/324852348sdfsaf8qwe57erf 

## Linux commands needed

> npm start &

The & at the end detaches the starting thread from the console thread. Thus
even if you close the console, the server continues to run. You can
also start to do other things with the console, don't need to wait for the server to close.

> lsof -i | grep '8777'

This will list all processes with e.g. listened port. And grep only takes lines with the value 8777 on it. => we get the PID of the running backend

> sudo kill -9 12345    

This would kill the process with PID 12345. Try without sudo if not in with sudo user.


## Database commands needed 

> mariadb -h localhost -u db_admin_username_here -p

(and give the password later, after hitting Enter, with right-click + Enter again)

> USE db22k;

at least these are needed while testing:       (Possibly also drop tables, create tables,)
...

> SOURCE ./Database/SQL_Scripts/03_insert_tech_test_data.sql;

> SOURCE ./Database/SQL_Scripts/06_delete_all_tasks.dsql;

> SOURCE ./Database/SQL_Scripts/03_insert_tech_test_data.sql;
