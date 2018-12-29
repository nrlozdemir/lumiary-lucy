# Lucy

Lucy webapp. 

React/client source is in [src/client](src/client).

## Getting Started

Make sure you [set up your development environment](https://app.tettra.co/teams/quickframe/pages/setting-up-your-development-environment) first. 

Clone the project
```
git clone git@github.com:quickframe/lucy.git
cd lucy
```

Install dev dependencies 
```
npm install --only=dev
```

Build the Webpack vendor bundle:

* Open `docker-compose.yml`
* Uncomment [this line](docker-compose.yml#L9) and save.
* run `docker-compose build` to build the bundle.  
* in `docker-compose.yml`, re-comment [that line from before](docker-compose.yml#L9) and save. 

## Run the webapp

Run with

```
docker-compose up
```

Navigate to https://lumiary-local.quickframe.com:4000.

If you see the QF logo spinner, you're good to go!

## Testing

* Uncomment any of [these lines](docker-compose.yml#L12-L16) and save
* Re-comment and save before committing `docker-compose.yml`









