rm -rf build/*
npm run build

aws s3 sync --profile=nescaum build/ s3://ma-datagrapher-nescaum-ccsc-dataservices/phase2/ --acl public-read

rm -rf build/*
