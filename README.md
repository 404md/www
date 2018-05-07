# www
This repository stores the code and data for www.404.md

## Back-end maintenance

404.md's back-end functionality is running in AWS.Lambda

### Contact Form

Checks user input data and sends email if there is no invalid data.

* Protected by Google reCaptcha;
* Sends emails through AWS.SES.

### Instagram feed

Fetches data from Instagram feed and stores them to domain related bucket.

* Used official Instagram API (api.instagram.com/v1);
* Fetch latest 20 posts.

### Facebook Events

Fetches Facebook events list and stores them as json.

## Deployment

### Pre-requisites

- Amazon Web Services (AWS) [account][1]
- AWS Command Line Interface (CLI) [configured][2]

### Prepare

Make sure you have all requirements installed

```bash
cd bin/travis && npm install && cd ../../
```

### Build & deploy

Run the deploy command:

```bash
bash bin/deploy.sh <env> <region> <aws-profile>
```

Available `dev`, `test` and `master` environments for deploy.

>Defaults:
>- `<env> => dev`
>- `<region> => eu-central-1`
>- `<profile> => default`

[1]: https://www.youtube.com/watch?v=WviHsoz8yHk
[2]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
