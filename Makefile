.PHONY: build
build: clean_dest node_modules dest/js/dice_notation.bundle.js

node_modules:
	npm install

dest/js/dice_notation.bundle.js:
	./node_modules/.bin/webpack

.PHONY: eslint
eslint:
	find src/js -name '*.js' | xargs ./node_modules/.bin/eslint

.PHONY: check
check: eslint

.PHONY: clean_dest
clean_dest:
	rm -rf dest

.PHONY: clean
clean: clean_dest
	rm -rf node_modules
