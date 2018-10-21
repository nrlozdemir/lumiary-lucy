####1. Generate a RSA-2048 key and save it to a file locally rootCA.key
`openssl genrsa -des3 -out rootCA.key 2048`

Note: Use a passkey you will remember.

Note: save file outside project, e.g., `~/.ssh`

####2. Create a new root ssl cert
`openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem`

Note: save file outside project, e.g. `~/.ssh`

####3. Trust the root ssl
Note: Mac only!

1. Open Keychain
2. Go to "Certificates" category in System keychain
3. File > Import Items
4. Import rootCA.pem
5. Double click imported cert
6. "When using this certificate": **Always Trust**

####4. Create server.csr.cnf file for convenience
  [req]
  default_bits = 2048
  prompt = no
  default_md = sha256
  distinguished_name = dn

  [dn]
  C=US
  ST=RandomState
  L=RandomCity
  O=RandomOrganization
  OU=RandomOrganizationUnit
  emailAddress=development@quickframe.com
  CN = *.quickframe.com

####5. Create v3.ext file
  authorityKeyIdentifier=keyid,issuer
  basicConstraints=CA:FALSE
  keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
  subjectAltName = @alt_names

  [alt_names]
  DNS.1 = *.quickframe.com
  
Note: save file outside project, e.g., `~/.ssh`

####6. Create cert
`openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat ~/.ssh/server.csr.cnf )`

Outputs `server.key`

`openssl x509 -req -in server.csr -CA ~/.ssh/rootCA.pem -CAkey ~/.ssh/rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile ~/.ssh/v3.ext`

Outputs `server.crt`

####7. Use cert in Monolith
1. `docker-compose down` if running
2. copy `server.key` and `server.crt` files into `./conf/ssl` folder
3. `docker-compose build`
4. `docker-compose up -d`

Apache container vhost is preset to use above file paths.

####8. Use cert in Express
1. `docker-compose down` if running
2. copy `server.key` and `server.crt` files into `./src/server/ssl` folder
3. `docker-compose up`

Express is configured to use certs at those paths by default.

####9. Use cert in WDS
1. Stop running Webpack
2. Edit `./src/webpack/server.js`
3. Uncomment `https`, `key`, and `cert` keys in WebpackDevServer settings.
4. Ensure the paths for `key` and `cert` are correct
5. `npm run local` or `npm run monolith-local`
