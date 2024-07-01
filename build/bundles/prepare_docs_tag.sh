#!/usr/bin/env bash

version=$(cat temp/dist/VERSION_SHORT | cut -d'-' -f 1)
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ $BRANCH != "production" ]; then
    git checkout production
fi

echo Add docs tag

git fetch
git reset --hard origin/production
git tag -a $version -m "$version" origin/production

echo Pushing tag 
git push origin $version
git tag -d $version
