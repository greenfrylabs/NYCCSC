if [[ -n $(git status --porcelain) ]]; then echo "repo is not checked in fully. Try again."; exit 1; fi
echo "We can't build this yet, so using hard-coded... but soon I hope"
#rm -rf dist/*
#grunt

aws s3 sync --profile=nescaum dist/ s3://ny-datagrapher-nescaum-ccsc-dataservices/ --acl public-read

# rm -rf dist/*
