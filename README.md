# Gateway Manager

##### _By Vidura Umayanga Perera - vidura.umayanga@techventuras.com | laumayanga@gmail.com_

This project was created to demonstrate react and javascript best practices and how create, connect and CRUD operation using state management tools 

### Git hub repo : https://github.com/viduraperera/gateway-frontend

### To start directly clone the repo

```sh
git clone https://github.com/viduraperera/gateway-frontend.git
```

## Run the Project locally

install packages
```sh
yarn install
```
or 

```sh
yarn
```
next run the project

```sh
yarn start
```

## Run the project in docker

building the image

```sh
 docker build -t gateway-image .
```
running the container in a preferred port

```sh
docker run --rm -it -p 3000:3000 gateway-image
```

(make sure you have docker installed and up and running)

## Available key packages used  

- material UI version 4 nad 5
- axios
- zustand (for state management)
- material-react-table

