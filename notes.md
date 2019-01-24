-starting of project-

npm init -y
yarn add nodemon --dev
yarn add express knex sqlite3 bcryptjs jsonwebtoken
yarn add dotenv

package.json => add to scripts "server": "nodemon index.js"

knex init

knexfile.js => got rid of all but development,
added: useNullAsDefault: true
edit desired DB name and folder structure
can add migrations: { directory: './data/migrations' }

knex migrate:make users
migrationfile => set up table

knex migrate:latest

---

-----lecture notes below:

dependencies

- express
- helmet
- knex
- sqlite3
- bcryptjs
- express-session
- connect-session-knex

--nodemon --dev

client > orders (decide cascade strategy)

.onUpdate('CASCADE')
.onDelete('RESTRICT')

workflow

- user logs in
- server provides a cookie with session info
- subsequent requests the client sends the cookie
- server checks the cookie, finds the session, and provides/denies access

--TOKENS

OAuth2: authorization framework
Open ID Connect: authentication protocol

Tokens:

- authentication/id token, who are you?
- access/authorization token. what can you do?
- refresh token,

working with JWTs

Server's Responsibility

- producing the token
- sending the toekn to the client
- reading the token from the request
- verifying the token is valid
- providing data (payload) on the token to the rest of the app

Client's Responsibility

- store the token and hold onto it
- send the token on every request
- on logout, destroy the token

users _---_ roles
roles _---_ permissions
users _---_ permissions

in OAuth2, permissions are called scopes ('read:salary', 'edit:salary')
