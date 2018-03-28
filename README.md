# www

This repository stores the code and data for [www.404.md][1]

## Back-end maintenance

404.md's back-end functionality is running in AWS.Lambda

### Contact Form

Checks user input data and sends email if there is no invalid data.

* Sends emails through MailChimp

### Instagram feed

Fetches data from Instagram feed and stores them as json in static/json folder

* Used official Instagram API (api.instagram.com/v1);
* Fetch latest 20 posts.

### Facebook Events

Fetches Facebook events list and stores them as json in static/json folder

### Medium Feed

Fetches data from MediumFeed and stores them as json in static/json folder also
gets images and put them in static/img/medium folder

## Deployment

### Pre-requisites

- Amazon Web Services (AWS) [account][2]
- AWS Command Line Interface (CLI) [configured][3]

### Build & deploy

Run the deploy command:

```bash
bash bin/deploy.sh <env> <aws-profile>
```

Available `dev` and `master` environments for deploy.

>Defaults:
>- `<env> => dev`
>- `<profile> => default`


[1]: https://www.404.md
[2]: https://www.youtube.com/watch?v=WviHsoz8yHk
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
