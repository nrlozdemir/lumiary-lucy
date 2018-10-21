# Lumiary

####React/client source is at:
  src/client

####Hosts
1. Run `sudo nano /etc/hosts` in Terminal/Iterm
2. Add `127.0.0.1 lumiary-local.quickframe.com api-local.quickframe.com ` and save

####Commitzen:
  npm install commitizen -g

####Webpack:
1. first run: compile dependencies bundle
2. open `docker-compose.yml`
3. line 8 should be uncommented and look like this:
  `command: [ "npm", "run", "vendor" ]`
  
  note: `command` should line up with `build` key.
4. run `docker-compose up` to build the bundle
5. in docker-compose.yml, re-comment line 8
  `# command: [ "npm", "run", "vendor" ]`
6. run `docker-compose.yml` to run project

####Testing:
1. Uncomment one of lines 12-16 in `docker-compose.yml` and save
2. `command: ["npm", "run", "test:local"`
3. `command: ["npm", "run", "test" ]`
4. `command: ["npm", "run", "test:local" ]`
5. `command: ["npm", "run", "test:watch" ]`
6. `command: ["npm", "run", "test:coverage"]`
7. `command: ["npm", "run", "test:snapshot"]`
8. Re-comment and save before committing `docker-compose.yml`





