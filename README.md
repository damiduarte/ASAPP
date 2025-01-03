# ASAPP - QA Automation Challenge

## Pre-requisites

*Docker*

If you haven't used it before, [this quickstart guide](https://docs.docker.com/get-started/) should help.


## How to run the APP

- Build the Images for API and UI:

    `docker build ./src/api -t asapp-qa-challenge-api`
    
    `docker build ./src/ui -t asapp-qa-challenge-ui`

- Start them through docker-compose:

    `docker-compose up -d`

- Browse to `localhost:3000` to access the challenge UI.
- Browse to `localhost:5000/api/docs/` for the API spec.
- Command above will run the containers in background, but you can always follow logs with `docker-compose logs -f`.
- To stop containers you can run `docker-compose stop`.

Note that currently data such as users and stock will not persist after the containers are stopped.

## How to run the test after starting the APP
- If you only need to run the tests after starting the APP then you need to execute:
    `npm run cypress:tests`
- When the tests finish an html report will be generated at `mochawesome-reporter/mochawesome.html`

## Hot to start the APP and then run the tests
- If you need to build the APP and then run the tests in a single command:
    `npm run app:build_and_test`
- This will build the Images for API and UI, then start them through docker-compose and finally execute all the tests and generate a report