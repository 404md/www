#!/usr/bin/env bash

echo "Uploading index.html"
aws s3 cp index.html s3://www.404.md/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing css/"
aws s3 sync --delete css/ s3://www.404.md/css/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing images/"
aws s3 sync --delete images/ s3://www.404.md/images/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing js/"
aws s3 sync --delete js/ s3://www.404.md/js/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing amenities/"
aws s3 sync --delete amenities/ s3://www.404.md/amenities/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing contact/"
aws s3 sync --delete contact/ s3://www.404.md/contact/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing members/"
aws s3 sync --delete members/ s3://www.404.md/members/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing plans-prices/"
aws s3 sync --delete plans-prices/ s3://www.404.md/plans-prices/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing privacy/"
aws s3 sync --delete privacy/ s3://www.404.md/privacy/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

echo "Synchronizing terms/"
aws s3 sync --delete terms/ s3://www.404.md/terms/ --region eu-central-1 --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=600

