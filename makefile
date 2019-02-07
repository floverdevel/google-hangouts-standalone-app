help: ## display command list
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## install all the dependencies, without dev dependencies
	yarn install

run: ## execute the application
	yarn start

debug: ## execute the application in debug mode
	yarn debug
