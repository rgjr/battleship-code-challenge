## Battleship Code Challenge

Goal is to build a 2-player, client-server battleship game, with each player playing from their own browser window.

- [ ] The frontend must be written in React
- [ ] Gameplay must be asynchronous.  Once a player loads the page, all further gameplay should take place without the page reloading.
- [x] The state of the game must be persisted in a SQL-based database (Postgres, MySQL, SQLite, etc) on the server end.
- [x] The server must be in Ruby, Javascript, Golang or Python (frameworks within these langauges are fine)

* No need to worry about user authentication on the server.  That is, if your client-side code tells your server that it's player 1, it's fine for the server to just trust it.
* Don't bother with replay-ability.  If you can only play one game with this system, and have to wipe the database to start over, that's fine.
* Don't worry about security at all - all information at the API level can be public.
* Ships should be placed randomly by your code, as opposed to the players being able to place them manually.

- 2 players, 5 ships each.
- Must include win detection

### Start React App and Express Server
`npm run dev`

### Start MySQL Docker Container
`docker-compose up -d`