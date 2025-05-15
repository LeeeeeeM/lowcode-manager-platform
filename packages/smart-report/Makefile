bin=build

BUILD_TIME=$$(date "+%FT%T%z")

OUTPUT-PATH=./dist 
SERVICE_NAME=ss-datacenter-fe/smart-report
IMAGES_NAME=hub.smartsteps.com/${SERVICE_NAME}

TAG?=v1.0.0
MESSAGE?=update

.PHONY:build

all: $(bin)
default: $(bin)

install:
	pnpm install

build:
	rm -rf $(OUTPUT-PATH)
	npm run build

publish:
	make build
	docker build -t ${IMAGES_NAME}:${TAG} --platform=linux/amd64 -f Dockerfile .
	docker push ${IMAGES_NAME}:${TAG}
	docker rmi ${IMAGES_NAME}:${TAG}
	git tag -a ${SERVICE_NAME}-${TAG} -m ${TAG}-${MESSAGE}
	git push origin ${SERVICE_NAME}-${TAG}