gendiff:
	node bin/gendiff.js
lint:
	npx eslint .

publish:
	npm publish
test:
	NODE_OPTIONS=--experimental-vm-modules npm test
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8
