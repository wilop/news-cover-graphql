# News Cover GraphQL API

## Getting Started

Configure NodeJS with version 18 lts.

``` bash
nvm install --lts
nvm use --lts
```
### Clone repository
To clone this repository just copy and run this command in your terminal.
``` bash
git clone https://github.com/wilop/news-cover-graphql.git
```

### Install dependencies
Add a list of dependencies used in project here.  
* @apollo/server  
* dotenv  
* graphql  
* jasonwebtoken  
* mongoose  
* nodemon  

#### Install NodeJS packages
To install dependencies just copy and run this command in your terminal.

```bash
npm install
```
To install additional dependencies just run `npm install` __package__ in your terminal and add it to previous list.

#### Create enviroment variables  
After installing dotenv, create a file name .env and add the following variables with respective information, this is an example and the '* *' should be ignore:
  
```
DB_CONNECTION = mongodb://127.0.0.1:27017/mynewscover *mongo db string conection*
PORT = 4000  *port to be listeng in the app*
URL = http://locahost
```

## WorkTree 
Add directories and a short description here.

> **models:**  
This directory contains data models.
        
> **controllers:**  
This directory contains controller.

## TODO
Add a checklist of things to do in this section.  

- [ ] GraphQL queries
- [x] Get all news
- [x] Search news by keyword
- [ ] Filter news by tag names
- [ ] Implement JWT authentication
