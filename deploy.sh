if [[ -n $(git status --porcelain) ]]; then echo "repo is not checked in fully. Try again."; exit 1; fi
rm -rf build/*
npm run build

aws s3 sync --profile=nescaum build/ s3://ny-datagrapher-nescaum-ccsc-dataservices/ --acl public-read

aws cloudfront create-invalidation --profile=nescaum --distribution-id E2Q0FE395YAO7D --paths "/*"
rm -rf build/*
