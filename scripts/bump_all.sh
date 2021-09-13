#!/bin/sh

# Bumps the Zendesk app version,
# sets the npm package version to match,
# then makes a version commit.

read -r -d '' usage << EOM
USAGE
  $ bump_all.sh [OPTION]

OPTIONS
  -M, --major  Increments the major version by 1
  -m, --minor  Increments the minor version by 1
  -p, --patch  Increments the patch version by 1
EOM

# Bump the Zendesk app version in the manifest file
if [ -n "$1" ]; then
  zcli apps:bump "$1" dist || { echo "$usage"; exit 1; };
else
  zcli apps:bump dist || exit 1;
fi

zd_version=$(node scripts/zcli_version.js)

# Update the package.json version to match the Zendesk version and make a version commit
yarn version --new-version "$zd_version"

# Add the Zendesk manifest file to the commit that yarn just made
git add dist/manifest.json
git commit --amend --no-edit
