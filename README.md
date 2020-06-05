## React-Express-Passport-Mongoose Boilerplate

### Easy setup

Clone the repo and then `node ./setup.js 'My App Name'`

### Demo
https://react-express-mongoose-demo.herokuapp.com/

### About this boilerplate
This is a boilerplate based on `react-scripts`.

It's a mix of `React Hooks`, `Express`, `Mongoose` and `Passport`. It uses `cookie based authentication` and stores some user data in local storage.


 * client-side `react hooks` app
    * routing
    * session management + authentication
    * private routes based on auth and roles
    * styling with `sass`
    * `Input Text` and `Button` components
    
    
 * server-side `express` with 
    * `mongo` connection via `mongoose`
    * authentication via `passport`
    * page routes and API routes based on auth
    * `brypt` password encryption
    
### Configuring it

1. Change `.env` values for `APP_SECRET` and `MONGODB_URI`
2. Change the default users to be inserted in the DB from `server/database/_insertDefaultUsers` - this is just for the ability to test the auth mechanism - remove it afterwards and insert your own users.
3. Remove `setup.js`

### Running locally
* `npm run client` - for client (hot reload)
* `npm start` - for server (no hot reload - you can install nodemon and run `nodemon ./server/index` instead)

The has 2 roles by default (ADMIN & USER), a login/auth mechanism and protected routes based on roles.

It inserts 1 user for each role:
 * email: `user@test.com` / password: `password`
 * email: `admin@test.com` / password: `password`
