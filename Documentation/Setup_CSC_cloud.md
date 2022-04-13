# Setting Up the CSC Cloud server

For all of the steps below, please connect to the VM using the ssh command from this [guide](/Documentation/SSH_tunneling_guide.md)

## Installing MariaDB

The MariaDB version that is used for this tutorial is v10.3.34. So far there is no issue.

Run

        sudo apt update

        sudo apt install mariadb-server

If you want to connect MariaDB to your server, you should also create another user with password besides **root** and grant all permissions to that user

## Starting the Project

1. Create a folder that you want your backend to be inside. Let's call it **project** in this example
2. Run

        cd project

        // Clone your remote project
        git clone https://github.com/<user>/<yourremoteproject>.git

        // Install node_modules
        npm install

    We use HTTP clone link for this because we don't want to bother setting up the SSH key etc.

3. If you start the server right now it might not work. First, check your node version inside the VM. If it's version below version 12 and your project is using ES6, you should update your nodejs by running


        sudo apt-get update

        sudo apt-get install -y nodejs 

    If at this point, your nodejs doesn't get updated, you should start fresh by running these commands (WARNING: this removes your current nodejs and freshly install a new one)

        sudo apt-get purge nodejs

        curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - 

        sudo apt-get install -y nodejs 

    You could change the second command if you want to install a newer version. Version 12 already works with ES6 so this is fine

4. Now you should change also your .env file. 

    Make sure you're inside right folder

        nano .env

    Then edit the .env file like this

        PORT=<VM port number> 

        DB_PORT=3306

    The PORT variable could be any port according to our excel file.
    DB_PORT should be exactly 3306.
    It's not mentioned here DB_HOST because this tutorial assumes that you DB_HOST is **localhost** 

    After that, press CTRL + X --> press y to save the .env file

5. Start mysql

        sudo service mysql start

6. Run the project

In order to keep the server running always, we have to use **screen** command for this. There are many ways to do this but I think screen command is the easiest way to make this work. 

First, you should cd to the root folder, this means outside of your cloned git repo and project folder

Run

        screen

        cd project/swp22k...

        npm run start


Please note: I've tried using command **npm run start &** here but it didn't work if I close the terminal

If the server doesn't throw any error and starts to log out "Server is running on....", depends on how your server is set up, then we're good to move on to the next step.

You could now close the terminal and make a GET request to, for example: http://<your_VM_IP_address>/api/signatures/all

If the mysql service has started and your server doesn't throw any error, making this request should return a 200 status code.

If you want to return to this screen later on, open a new terminal --> login using the ssh command and then run

        screen -r 

After this, you're in the screen where the server is running. 

This assumes that you have only 1 screen, if there're multiple screens, you have to pass the screen code after the above command.

If you want to exit or stop the current screen, just type **exit** when you're inside of it. 


----
### Extra

There's one issue here that the mysql service will stop running at some points could be because of out of memory etc. If this happens, you should go back into the terminal to restart it. 

What I did was setting up a script to automatically restart the server every time it stops and then add a cron job for this to work on schedule so that I don't have to manually restart it myself. I leave the details for the audience to explore themselves. 

If you use the same VM user as I do, probably you don't have to worry about this because I've already set it all up.