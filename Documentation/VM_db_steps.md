# Checkout the Database Using VM (not working at the moment with these credentals)

Please notice that this is a guide for you to check the database out, not the guide to connect to it.

1. Open Putty
2. In the Host Name input box, add **195.148.22.114**. Keep the port as **22**
3. Click **Open**
4. A console will be open with the line "login as:", type **&lt;db-username&gt;**
5. The console will then ask for password, type the provided password in Teams accordingly 
6. Type

        sudo mysql

7. You will be prompted for password once again, type the password in
8. You're now using MariaDB, select the database by typing

        use <db-name>;

The database name can be different, in our case it's swp22k_102image

9. You can check the available tables by typing

        show tables;

10. If at some points, you get an error "ERROR 2002 (HY000)...", exit the database if you're inside it 

        exit

11. Start MySQL server 

        sudo service mysql start

11. After that press Ctrl + C and return to step 6