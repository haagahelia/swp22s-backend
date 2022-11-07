# SSH Tunneling to VM

This guide is created and tested on Windows system (Windows 10) AND not tested on Windows 11

### Needed Tools
- [Putty](https://www.putty.org/)
- [MySQL Workbench](https://dev.mysql.com/downloads/installer/) / [HeidiSQL](https://www.heidisql.com/) / [DBeaver](https://dbeaver.io/) 
- [Git Bash](https://git-scm.com/downloads)

## Establishing The Tunnel

Complete one of the following step and move on to the **Testing The Connection** step

### 1.  Using Putty

- Host name: **SECRET_IP_WOULD_BE_HERE**
- Port: **22**
- Connection type: **SSH**
- Add a name to the Saved Sessions input box -> Click **Save**
- On the left side, under Category, expand the Connection category
- Expand the SSH sub-category
- Click **Tunnels**
- On the right side, type **&lt;db-port&gt;** in the Source port input
- Type **127.0.0.1:3306** in the Destination input
- Click **Add**
- On the left side, click **Session** to go back
- Before doing anything else, click **Save**
- Click **Open** to start
- You will be prompted for login as, type **&lt;db-username&gt;**
- You will be prompted for password, type the according **&lt;db-username&gt;** -> press Enter
- You are now inside the tunnel

- To make sure the MySQL service is run inside the tunnel, type:

        sudo service mysql start

Don't close the terminal, keep it open and move on to the Testing The Connection step

### 2. Using Command

The command can be different on MacOS, this command was tested on Windows

- Open git Bash, type:

        ssh <db-username>@SECRET_IP_WOULD_BE_HERE -L <db-port>:localhost:3306

- You will be prompted for password, type the according &lt;db-user-password&gt;
- You are now inside the tunnel
- To make sure the MySQL service is run inside the tunnel, type:

        sudo service mysql start

Don't close the terminal, keep it open and move on to the Testing The Connection step

### 2. Using a software such as HeidiSQL

These steps are really similar in MySQL Workbench and DBeaver, so by using the right credentials and ports the instructions should be helpful even if using another software. You can name and save the connection and it will be easy and quick to connect the next time.

1. Set the correct network type MariaDB or MySQL (SSH tunnel) and fill linux username and password. 
![Settings](/Documentation\HeidiSQL_tunneling_guide\HeidiSQL_connection_settings.PNG)

2. Add the correct IP address and database username + password  (port: 22 stays the same) in SSH tunnel settings and your local db port used
![SSH tunnel settings](/Documentation\HeidiSQL_tunneling_guide\HeidiSQL_SSH_tunnel_settings.PNG)

## Testing the connection

### Testing The Connection with MySQL Workbench

- After completed either one of the above step, open MySQL Workbench
- Press the **Plus** button next to the MySQL Connections header
- Hostname **remains the same**
- Change the port to **&lt;db-port&gt;**
- Change the username to **&lt;db-username&gt;**
- Click **Store in Vault...**
- Type **&lt;db-user-password&gt;** in the Password input
- Click **Ok**
- Click **Test Connection**
- There will be a popup, click **Continue Anyway**
- You will see that you have a successful connection
- Click **OK**
- Click **OK** again, the new connection will appear in the home interface

### Testing the connection with HeidiSQL

- Choose the correct session and open the connection
- You should see the database and its contents on the left side of the screen. 