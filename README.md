# Film Rate v2

## Table of content

- [Description](#description)
- [Tech stack](#tech-stack)
- [Database design and structure](#database-design-and-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)

## Description

Film Rate v2 is the application to rate films. The user can rate film, modify and remove the rate. The admin can also manage films. The application allows to login to existing account and register a new one.

The Film Rate v2 is built using JS frameworks. It's the project for course "Advanced technologies of web application development". Now it's developed further.

The application consists of:

- backend - NestJS
- frontend - React
- mobile - React Native

## Tech stack

- Git
- Docker
- JavaScript
- TypeScript
- Node.js
- React
- Redux
- Tailwind CSS
- Heroicons
- NestJS
- Swagger
- PostgreSQL
- Redis
- React Native
- Expo
- Expo Go

## Database design and structure

### ERD Diagram

![image](readme-files/db-erd-diagram.png)

## Installation

### Requirements

- Node.js
- NVM
- Docker
- Docker Compose
- Physical mobile phone or emulator with Android / iOS with installed Expo Go for SDK 57

### Download Repository

Clone repository.

```
git clone git@github.com:MikiWojak/film-rate-v2.git
```

Go to project directory.

```
cd film-rate-v2
```

### Backend

Go to backend directory.

```
cd backend
```

Set up proper Node.js version. Download proper one if necessary.

```
nvm use
```

Install packages.

```
npm i
```

Create `.env` file with env variables. You can leave default ones. However it is strongly recommended to adjust the env variables, espiecially `JWT_SECRET_KEY`.

```
cp .env.example .env
```

Generate JWT secret key for the `.env` file.

```
openssl rand -base64 32
```

Run Docker containers in the background.

```
docker compose up -d
```

Set up database - run migrations and seeders.

```
npm run dev-db-setup-fresh
```

Run backend in dev mode.

```
npm run start:dev
```

### Frontend

Go to frontend directory.

```
cd frontend
```

Set up proper Node.js version. Download proper one if necessary.

```
nvm use
```

Install packages.

```
npm i
```

Create `.env` file with env variables. You can leave default ones.

```
cp .env.example .env
```

Run frontend in dev mode.

```
npm run dev
```

### Mobile

Go to mobile directory.

```
cd mobile
```

Set up proper Node.js version. Download proper one if necessary.

```
nvm use
```

Install packages.

```
npm i
```

Create `.env` file with env variables.

```
cp .env.example .env
```

> [!IMPORTANT]
> You need to set up proper env variables to make the mobile application work!
>
> If your backend runs locally on `http://localhost:3001` or similar, then you need to set up the mobile env variables like below:
>
> ```
> EXPO_PUBLIC_API_URL=http://192.168.1.X:3001/api
> EXPO_PUBLIC_API_MEDIA_URL=http://192.168.1.X:3001/public
> ```
>
> Where `X` (last part of IPv4 address) depends on the backend host. The address might vary depending on IP class utilized in the (local) network and the host address.
>
> You also need to add React Native web address for preview to the env variable `FRONTEND_URLS` in `backend/.env` to see the preview in web browser. The React Native web address for preview will be visible in the console after launching the mobile application.

Run mobile in dev mode.

```
npm run start
```

Use Expo Go on the physical device or in the emulator to see the mobile application. More details [here](https://docs.expo.dev/get-started/set-up-your-environment/).

## Usage

### Run application

#### Backend

Go to backend directory.

```
cd backend
```

Set up proper Node.js version. Download proper one if necessary.

```
nvm use
```

Run Docker containers in the background.

```
docker compose up -d
```

Run backend in dev mode.

```
npm run start:dev
```

Clear cache if necessary (for default `REDIS_CACHE_PASS`).

```
npm run redis-cache-flush
```

#### Frontend

Go to frontend directory.

```
cd frontend
```

Set up proper Node.js version. Download proper one if necessary.

```
nvm use
```

Run frontend in dev mode.

```
npm run dev
```

#### Mobile

Go to mobile directory.

```
cd mobile
```

Set up proper Node.js version. Download proper one if necessary.

```
nvm use
```

Run mobile in dev mode.

```
npm run start
```

### Shut down application

#### Mobile

Stop running mobile by clicking `Ctrl + c` in terminal where mobile has been launched.

#### Frontend

Stop running frontend by clicking `Ctrl + c` in terminal where frontend has been launched.

#### Backend

Stop running backend by clicking `Ctrl + c` in terminal where backend has been launched.

Shut down Docker containers.

```
docker compose down
```

### Mobile application

Use Expo Go on the physical device or in the emulator to see the mobile application. More details [here](https://docs.expo.dev/get-started/set-up-your-environment/).

### Web application

- Go to location http://localhost:3000
- You can use application as unauthorized [Guest](#guest), however your possibilities will be significantly limited
- Click Login icon
- Login using one of these credentials:
  - User with role [Admin](#admin):
    - Email: **admin@filmrate.test**
    - Password: **Qwerty123!**
  - User with role [User](#user):
    - Email: **user@filmrate.test**
    - Password: **Qwerty123!**
- Now you can do actions permitted for specific role

### Database manager

- Use env variables for database specified in `backend/.env` to login to your database manager

### API documentation

- Go to location http://localhost:3001/api/docs
- Now you can browse the API documentation

## Features

### Mobile application

- View films
- Light and dark mode (dependent on the device settings)
- (To be developed) Login

### Web application

#### Guest

(unauthorized)

- View films
- View single film
- Login
- Register

#### User

- View films
- View single film
- Rate film, edit and remove rate
- Profile page

#### Admin

All User's features, also:

- See all films
- Add film

## Screenshots

### Mobile application

#### Films (dark)

![image](readme-files/react-native-films-dark.jpg)

#### Login (dark)

![image](readme-files/react-native-login-dark.jpg)

#### Films (light)

![image](readme-files/react-native-films-light.jpg)

### Web application (desktop view)

#### Films

![image](readme-files/desktop-films.png)

#### Single film

![image](readme-files/desktop-single-film.png)

#### Register

![image](readme-files/desktop-register.png)

#### Login

![image](readme-files/desktop-login.png)

#### Rate film

![image](readme-files/desktop-rate-film.png)

#### Profile

![image](readme-files/desktop-profile.png)

#### Admin films

![image](readme-files/desktop-admin-films.png)

#### Admin add film

![image](readme-files/desktop-admin-add-film.png)

### Web application (mobile view)

#### Films

![image](readme-files/mobile-films.png)

#### Single film

![image](readme-files/mobile-single-film.png)

#### Register

![image](readme-files/mobile-register.png)

#### Login

![image](readme-files/mobile-login.png)

#### Rate film

![image](readme-files/mobile-rate-film.png)

#### Profile

![image](readme-files/mobile-profile.png)

#### Admin films

![image](readme-files/mobile-admin-films.png)
![image](readme-files/mobile-admin-films-1.png)

#### Admin add film

![image](readme-files/mobile-admin-add-film.png)
