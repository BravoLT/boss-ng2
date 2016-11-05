build/gz_2010_us_050_00_20m.zip:
	mkdir -p $(dir $@)
	curl -o $@ http://www2.census.gov/geo/tiger/GENZ2010/$(notdir $@)

build/gz_2010_us_050_00_20m.shp: build/gz_2010_us_050_00_20m.zip
	unzip -od $(dir $@) $<
	touch $@

src/assets/counties.json: build/gz_2010_us_050_00_20m.shp
	node_modules/.bin/topojson -o $@ --projection='width = 960, height = 600, d3.geo.albersUsa().scale(1280).translate([width / 2, height / 2])' --simplify=.5 -- counties=$<

src/assets/states.json: src/assets/counties.json
	node_modules/.bin/topojson-merge \
		-o $@ \
		--in-object=counties \
		--out-object=states \
		--key='d.id.substring(0, 2)' \
		-- $<

src/assets/us-states.json:
	curl -o $@ https://raw.githubusercontent.com/alignedleft/d3-book/master/chapter_12/us-states.json

