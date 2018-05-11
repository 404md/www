# www

This repository stores the code and data for [www.404.md][1]

## Frontend

404.md's frontend is build on top of [Web-boost][2] static site generator.

## Backend

404.md's backend is build on top of [Serverless Framework][3] (AWS provider).

## Deployment

### Prerequisites

- Amazon Web Services (AWS) [account][4]
- AWS Command Line Interface (CLI) [configured][5]
- Serverless Framework [installed][6]

### Build & deploy

* To deploy, just run:

```bash
bash bin/deploy.sh [env] (aws-profile)
```
> [env] required, default `dev`, available `dev` and `master` \
(aws-profile) optional, default `none`

* In case you'd like to deploy backend part only, switch to `backend` directory and run:

> (env) optional, available to be specified: \
default empty value or any value not listed in the documentation equals `dev` \
`master` value deploys into production 

```bash
serverless deploy
```
>or
```bash
serverless deploy --dev
```
>or
```bash
serverless deploy --master
```

[1]: https://www.404.md
[2]: https://github.com/ddimitrioglo/web-boost
[3]: https://github.com/serverless/serverless
[4]: https://www.youtube.com/watch?v=WviHsoz8yHk
[5]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
[6]: https://github.com/serverless/serverless#quick-start
