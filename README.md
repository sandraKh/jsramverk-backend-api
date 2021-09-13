
 
 # rest-api

[![Build Status](https://app.travis-ci.com/sandraKh/jsramverk-backend-api.svg?branch=main)](https://app.travis-ci.com/sandraKh/jsramverk-backend-api)


This is an api for creating, updating and deleting documents in MongoDB database. It is made for the course JS-ramverk at BTH.

# Installation

1. Download repo from Github

2. Install all dependencies using


```
npm install
```

3. Create a config.json file and insert your username and password for you database.

4. Run

```
npm start
```

# Routes


All routes is in the file app.js. They are divided as GET, POST, PATCH, DELETE.

To get all items use get "/"

To get a specific item use get "/:id"

To delete an item use delete "/:id"
