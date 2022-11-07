# swp22k-backend

Note: Please do not use yarn for this project. When everybody uses npm
it's easier. (To my knowledge yarn also did not surpass npm in popularity and
people are turning back to npm?)

Debug with logs: either see terminal or Winston logger if trouble. You should see if you have the server running and if the connection to the database is established. 

# Installation steps

## Set up your local project

- (If you have an old installation, remove it, or remove at least node_modules and package-lock.json/yarn.lock etc.)
- git clone / git pull the repo
- npm install
- create an '.env' file to the root of the project folder and set the correct environmental variables needed. Model for the file located at Teams > DevOps, Linux > Files > .xlsx
- npm start
- See your project running HTTP:://LOCALHOST:PORT_HERE/ with a "Hello World!"

## Connect to the database using SSH tunnel

- Install your local MariaDB if you don't have it already. Step-by-step instructions located at folder [MariaDB_InstallationDocs_ForLocalDB](Documentation\MariaDB_InstallationDocs_ForLocalDB) 
- Set up SSH tunnel with [SSH tunneling guide](Documentation\SSH_tunneling_guide.md) either using
    * Putty 
    * Command line
    * DBMS software such as HeidiSQL, MySQL Workbench or DBeaver. 

## Test the connection 

A few examples to test the connection to the database:


http://IP_ADDRESS_HERE:PORT_HERE/api/report/ 

http://IP_ADDRESS_HERE:PORT_HERE/api/country/ 



## Commands needed for Linux and database

## Linux

    npm start &

The & at the end detaches the starting thread from the console thread. Thus
even if you close the console, the server continues to run. You can
also start to do other things with the console, don't need to wait for the server to close.

    lsof -i | grep '8777'

This will list all processes with e.g. listened port. And grep only takes lines with the value 8777 on it. => we get the PID of the running backend

    sudo kill -9 12345    

This would kill the process with PID 12345. Try without sudo if not in with sudo user.


## Database 

    mariadb -h localhost -u db_admin_username_here -p

(and give the password later, after hitting Enter, with right-click + Enter again)

    USE db22k;

at least these are needed while testing:       (Possibly also drop tables, create tables,)
...

    SOURCE ./Database/SQL_Scripts/03_insert_tech_test_data.sql;

    SOURCE ./Database/SQL_Scripts/06_delete_all_tasks.dsql;

    SOURCE ./Database/SQL_Scripts/03_insert_tech_test_data.sql;
