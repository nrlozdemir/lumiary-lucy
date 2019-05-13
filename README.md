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

- Open `docker-compose.yml`
- Uncomment [this line](docker-compose.yml#L9) and save.
- run `docker-compose build` to build the bundle.
- in `docker-compose.yml`, re-comment [that line from before](docker-compose.yml#L9) and save.

## Run the webapp

Run with

```
docker-compose up
```

Navigate to https://lumiary-local.quickframe.com:4000.

If you see the QF logo spinner, you're good to go!

## Testing

- Uncomment any of [these lines](docker-compose.yml#L12-L16) and save
- Re-comment and save before committing `docker-compose.yml`

## Quickframe Passwords:

# blackstar (main QF webapp)

- QA - qa.quickframe.com (user: quickframe, password: 7mjxa#vc1Z9Y8mdL)
- Staging - staging.quickframe.com (user: quickframe, password: a1Bj79Kn^nC4@JIW)
- Production - beta.quickframe.com (user: quickframe, password: AOcK@HM6\$L4^Bk%s)

# qapi

- QA - api.qa.quickframe.com
- Staging - api.staging.quickframe.com
- Production - api.beta.quickframe.com

# qontrol

- QA - qontrol.qa.quickframe.com (user: quickframe, password: 7mjxa#vc1Z9Y8mdL)
- Staging - qontrol.staging.quickframe.com (user: quickframe, password: a1Bj79Kn^nC4@JIW)
- Production - qontrol.beta.quickframe.com (user: quickframe, password: AOcK@HM6\$L4^Bk%s)

# lumiere

- QA - lumiere.qa.quickframe.com (user: quickframe, password: 7mjxa#vc1Z9Y8mdL)
- Staging - lumiere.staging.quickframe.com (user: quickframe, password: a1Bj79Kn^nC4@JIW)
- Production - lumiere.beta.quickframe.com (user: quickframe, password: AOcK@HM6\$L4^Bk%s)
