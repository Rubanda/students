# Gunsel Fullstack code Challenge
![gunsel](https://user-images.githubusercontent.com/18490994/131701107-666d62a9-f1f5-46c7-868e-f2a8e9218b1f.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![gunsel2](https://user-images.githubusercontent.com/18490994/131703469-0a250bbb-a8e7-43f4-9181-86dc1d03a960.png)

## Available Scripts

In the project directory, you can run:
you can browser in the frontend folder and run 
### yarn install 
and after installing you can run the project 
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Server 

in the project server directory you will have to install sequelize 
## Available Script  

### npm install --save-dev sequelize-cli


for the server 
you have to go to config file and update the database connection 
#### config file
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "database name",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  },
  
  after you need to run db:migrate command.
  ### npx sequelize-cli db:migrate
and run the server by 
### npm run dev 
