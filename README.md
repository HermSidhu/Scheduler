# Scheduler 📅

Scheduler is a single page application (SPA) that allows the user to make appointments with interviewers in a quick and easy way. You can add, edit, & delete appointments with ease. Built with a fully interactive interface and immersive user experience.

I built this app using React, Webpack, Babel, Axios, Storybook, Webpack Dev Server. I used Jest and Cypress for testing.

Main Page
!['Main page'](https://github.com/HermSidhu/Scheduler/blob/master/docs/Main-Page.png?raw=true)

Appointment View
!['Appointment view'](https://github.com/HermSidhu/Scheduler/blob/master/docs/Appointment-View.png?raw=true)

Save View
!['Save view'](https://github.com/HermSidhu/Scheduler/blob/master/docs/Save-View.png?raw=true)

Confirm before Delete
!['Confirm before delete'](https://github.com/HermSidhu/Scheduler/blob/master/docs/Delete-Confirm.png?raw=true)

## How to Use

1) Fork this repository, then clone your fork of this repository.
2) Install dependencies using the npm install command.
3) Start the web server using the npm start command. The app will be served at http://localhost:8000/.
4) Both servers run concurrently; requests are proxied from the Webpack development server to the API server.
5) Go to http://localhost:8000/ in your browser.
6)Select a day of the week and add your appointment where a time slot is available.
7) If you're unhappy with your appointment, you can edit your appointment or delete it.
8) Have fun scheduling!

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
