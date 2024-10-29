bin=build

BUILD_TIME=$$(date "+%FT%T%z")

OUTPUT-PATH=./publish 
SERVICE_NAME=ss_middle_platform/lowcode_platform_center
IMAGES_NAME=hub.smartsteps.com/${SERVICE_NAME}

TAG:=test
MESSAGE:=update

.PHONY:build

all: $(bin)
default: $(bin)

install:
	pnpm install
build:
	rm -rf build
	pnpm build

publish:
	make build
	docker build -t ${IMAGES_NAME}:${TAG} -f Dockerfile .
	docker push ${IMAGES_NAME}:${TAG}
	docker rmi ${IMAGES_NAME}:${TAG}
	git tag -a ${TAG} -m ${TAG}-${MESSAGE}
	git push origin ${TAG}
clean:
	rm -fr $(OUTPUT-PATH)/*