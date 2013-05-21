build: components index.js template.js
	@component build --dev

%.html: %.jade
	jade $<

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

test: build example/example.html

clean:
	rm -fr build components template.js template.html example/example.html

.PHONY: clean
