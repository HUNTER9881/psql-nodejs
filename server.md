# Serverga yuklash
```

ssh root@159.203.191.0
12345678Aa

---------------------   "Node.js" ni serverga o'rnatish
sudo apt update
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
nano nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs


---------------------    "Nginx" ni serverga o'rnatish (saytda fayllani ishga tushirish  imkoniyatini beradi)
sudo apt update
sudo apt install nginx
nano /etc/nginx/sites-available/default
server {
    root /var/www/html;
    server_name 159.203.191.0 ;
    location / {
    proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
systemctl restart nginx


---------------------   "PostgreSQL" ni serverga o'rnatish

sudo apt update 
sudo apt -y install gnupg2 wget vim
sudo apt-cache search postgresql | grep postgresql
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt -y update
sudo apt -y install postgresql-14

systemctl status postgresql
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Mon 2021-10-25 16:15:55 CEST; 5s ago
  Process: 32506 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
 Main PID: 32506 (code=exited, status=0/SUCCESS)


sudo -u postgres psql -c "SELECT version();"
                                                             version                                                             
---------------------------------------------------------------------------------------------------------------------------------
 PostgreSQL 14.0 (Ubuntu 14.0-1.pgdg18.04+1) on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0, 64-bit
(1 row)


sudo -i -u postgres
psql			  - serverga kirish
postgres=# \q        	  - serverdan chiqish
postgres=# \du      	  - serverdagi rolni korish
postgres=# \d       	  - serverdagi databaseni royhatini olish


sudo sed -i '/^host/s/ident/md5/' /etc/postgresql/14/main/pg_hba.conf
sudo sed -i '/^local/s/peer/trust/' /etc/postgresql/14/main/pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf

Shunday qikib edit qilish kerak => 

# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             0.0.0.0/0                md5

# IPv6 local connections:
host    all             all             ::1/128                 scram-sha-256
host    all             all             0.0.0.0/0                md5



sudo nano /etc/postgresql/14/main/postgresql.conf

Shunday qikib edit qilish kerak =>

#------------------------------------------------------------------------------
# CONNECTIONS AND AUTHENTICATION
#-----------------------------------------------------------------------------
.......
listen_addresses='*'



sudo systemctl restart postgresql
sudo systemctl enable postgresql

sudo -u postgres psql

CREATE ROLE <role name> WITH LOGIN SUPERUSER CREATEDB CREATEROLE PASSWORD '<password>';
create database <database name>
create user <role name> with encrypted password '<password>';
grant all privileges on database <database name> to <role name>;


ss -tunelp | grep 5432

Natija: 
tcp    LISTEN   0        244               0.0.0.0:5432           0.0.0.0:*      uid:123 ino:292971 sk:a <->                                                    
tcp    LISTEN   0        244                  [::]:5432              [::]:*      uid:123 ino:292972 sk:d v6only:1 <-> 

sudo ufw allow 5432/tcp

psql 'postgres://<user role>:<password>@127.0.0.1:5432/<database name>?sslmode=disable'

sudo -u postgres psql 			- serverga kirish
postgres=# \c <database name>           - tanlanganazaga ulanish
postgres=# \dt           - datazaga tegishli jadvallarni olish [agar mavjud bolmasa yaratish]

postgres=# CREATE TABLE Users(
postgres(#     id BIGSERIAL NOT NULL PRIMARY KEY,
postgres(#     name VARCHAR(80) NOT NULL,
postgres(#     phone VARCHAR(80) NOT NULL,
postgres(#     email VARCHAR(80) NOT NULL,
postgres(#     isAdmin VARCHAR(80) NOT NULL
postgres(# );
Natija: TABLE CREATED


postgres=# \dt

 	List of relations
 Schema |  Name  | Type  |  Owner
--------+--------+-------+----------
 public | users  | table | postgres
(2 rows)


---------------------    "pm2" ni serverga o'rnatish (server doim yoniq turishi uchun o'rnatish)

cd ../home
git pull https://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:x-oauth-basic@github.com/gargamelNodejs/psql-nodejs.git
git clone https://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:x-oauth-basic@github.com/gargamelNodejs/psql-nodejs.git
cd psql-nodejs
npm install

npm install -g pm2
npm i pm2
pm2 start app.js
pm2 startup
pm2 save
pm2 monit


```