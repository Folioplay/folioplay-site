CURRENT_REF := $(shell git rev-parse --abbrev-ref HEAD)

all: deploy

checkout_main:
	git checkout main

.PHONY: run_build
run_build:
	npm run build

.PHONY: deploy
deploy: checkout_main run_build
	scp -r build root@ssrivastava.tech:/var/www/folioplay/
	git checkout $(CURRENT_REF)
	

