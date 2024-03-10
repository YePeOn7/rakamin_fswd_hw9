# rakamin_fswd_hw9
## Prerequisite
### Restore PostgreSQL db from the provided SQL file by the homework
```bash
sudo -i -u postgres
psql   # enter PostgreSQL CLI

#after entering PostgreSQL CLI please create db using the following command
CREATE DATABASE movies_db;
\l     #to check if the db has been created,

#if the db has been successfully created you can CTRL+D or \q to quit CLI
# use the following command to restore the provided sql file
pg_restore -U <username in postgres> -d movies_db <path to movies-database.sql in this repo>
```

Otherwise, you can use pgadmin to create a **movies_db** database and restore the SQL file
![image](https://github.com/YePeOn7/rakamin_fswd_hw9/assets/12985183/411dfd98-68b2-41e5-a840-331009470425)
![image](https://github.com/YePeOn7/rakamin_fswd_hw9/assets/12985183/23781986-8f36-436c-b8bd-904d20605e9f)

### Init Project
From root of the repo
```bash
cd project
npm install
```
## Run the Project
From the root of the repo
```bash
cd project
npm run dev
```

## Postman
This repo provides a postman collection to test the API inside the **postman** folder. Here are the step-by-step instructions to export it.
* Press **Import**
![image](https://github.com/YePeOn7/rakamin_fswd_hw9/assets/12985183/3d940e5e-ada9-49db-b87e-0a74dc6d06b8)
* Chose **files**, then select the file **week9.postman_collection.json** inside the **postman** folder
![image](https://github.com/YePeOn7/rakamin_fswd_hw9/assets/12985183/9ed4f36b-e3a9-4477-9890-fe6223ef6254)
* **week9** collection should appear on you collection bar  
  ![image](https://github.com/YePeOn7/rakamin_fswd_hw9/assets/12985183/68b5bec5-9ca2-4770-a334-d8a0efa63015)




