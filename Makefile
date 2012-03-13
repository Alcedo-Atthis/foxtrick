APP_NAME = foxtrick

# Distribution type:
# Firefox, Chrome, Opera: nightly, release, hosting
# Safari: nightly, release
DIST_TYPE = nightly

# Subversion revision, this is only available with git-svn
REVISION := $(shell git svn find-rev HEAD)
MAJOR_VERSION := $(shell ./version.sh)
REV_VERSION := $(MAJOR_VERSION).$(REVISION)

# URL prefix of update manifest
UPDATE_URL = https://www.foxtrick.org/nightly/

BUILD_DIR = build
SAFARI_TARGET = foxtrick.safariextension
SAFARI_BUILD_DIR = build/$(SAFARI_TARGET)

# cf safari: xar needs to have sign capabilities ie xar --help shows --sign as option.
# see http://code.google.com/p/xar/issues/detail?id=76 for an howto
ZIP = zip -q
XAR = xar

ROOT_FILES_FIREFOX = chrome.manifest install.rdf icon.png COPYING HACKING
ROOT_FILES_CHROME = manifest.json
ROOT_FILES_OPERA = config.xml content/background.html content/preferences.html
ROOT_FILES_SAFARI = Info.plist Settings.plist skin/icon.png
ROOT_FOLDERS_FIREFOX = defaults/
ROOT_FOLDERS_CHROME = defaults/ skin/
ROOT_FOLDERS_OPERA = defaults/ skin/
ROOT_FOLDERS_SAFARI = defaults/ skin/
SCRIPT_FOLDERS = alert/ \
	forum/ \
	information-aggregation/ \
	lib/ \
	links/ \
	matches/ \
	pages/ \
	presentation/ \
	shortcuts-and-tweaks/ \
	util/
RESOURCE_FOLDERS = data/ \
	locale/ \
	resources/ \
	foxtrick.properties \
	foxtrick.screenshots \
	release-notes.xml \
	faq.xml
CONTENT_FILES = add-class.js \
	core.js \
	entry.js \
	env.js \
	forum-stage.js \
	l10n.js \
	pages.js \
	preferences.js \
	prefs.js \
	read-ht-prefs.js \
	redirections.js \
	ui.js \
	xml-load.js
CONTENT_FILES_FIREFOX = $(CONTENT_FILES) overlay.xul \
	overlay-fennec.xul \
	preferences.html \
	options-fennec.xul \
	env-fennec.js \
	scripts-fennec.js \
	background.js \
	loader-gecko.js 
CONTENT_FILES_CHROME = $(CONTENT_FILES) background.html \
	preferences.html \
	background.js \
	loader-chrome.js
CONTENT_FILES_OPERA = $(CONTENT_FILES) background.js \
	loader-chrome.js
CONTENT_FILES_SAFARI = $(CONTENT_FILES) background.html \
	preferences.html \
	background.js \
	loader-chrome.js
	
all: firefox chrome opera safari

firefox:
	########### make firefox ############
	make clean-firefox clean-build
	mkdir $(BUILD_DIR)
	# copy root files
	cp -r $(ROOT_FILES_FIREFOX) $(ROOT_FOLDERS_FIREFOX) $(BUILD_DIR)
	# content/
	mkdir -p $(BUILD_DIR)/chrome/content
	cd content/; \
	cp -r $(SCRIPT_FOLDERS) $(RESOURCE_FOLDERS) $(CONTENT_FILES_FIREFOX) \
		../$(BUILD_DIR)/chrome/content
	mkdir -p $(BUILD_DIR)/chrome/content
	# skin/
	cp -r skin $(BUILD_DIR)/chrome
	# remove ignore modules from files
	perl module-update.pl modules ignored-modules-$(DIST_TYPE) $(BUILD_DIR)/chrome/
	# build jar
	cd $(BUILD_DIR)/chrome; \
	$(ZIP) -0 -r $(APP_NAME).jar `find . \( -path '*CVS*' -o -path \
		'*.svn*' \) -prune -o -type f -print | grep -v \~ `; \
	rm -rf content skin
	# process manifest
	cd $(BUILD_DIR); \
	if test -f chrome.manifest; \
		then \
		sed -i -r 's|^(content\s+\S*\s+)(\S*/)(.*)$$|\1jar:chrome/'$(APP_NAME)'.jar!/\2\3|' chrome.manifest; \
		sed -i -r 's|^(skin\|locale)(\s+\S*\s+\S*\s+)(.*/)$$|\1\2jar:chrome/'$(APP_NAME)'.jar!/\3|' chrome.manifest; \
	fi
	# modify according to distribution type
ifeq ($(DIST_TYPE),nightly)
	cd $(BUILD_DIR); \
	../version.sh $(REV_VERSION); \
	sed -i -r 's|(<em:updateURL>).+(</em:updateURL>)|\1'$(UPDATE_URL)'/update.rdf\2|' install.rdf
else ifeq ($(DIST_TYPE),release)
	cd $(BUILD_DIR); \
	sed -i -r 's|(<em:updateURL>).+(</em:updateURL>)|\1'$(UPDATE_URL)'/update.rdf\2|' install.rdf
else ifeq ($(DIST_TYPE),hosting)
	# used on addons.mozilla.org, with no update URL
	cd $(BUILD_DIR); \
	sed -i '/<em:updateURL>/d' install.rdf
endif
	# make xpi
	cd $(BUILD_DIR); \
	$(ZIP) -r ../$(APP_NAME).xpi *
	# clean up
	make clean-build

chrome:
	############ make chrome ############
	make clean-chrome clean-build
	mkdir $(BUILD_DIR)
	# copy root files
	cp -r $(ROOT_FILES_CHROME) $(ROOT_FOLDERS_CHROME) $(BUILD_DIR)
	# content/
	mkdir $(BUILD_DIR)/content
	cd content/; \
	cp -r $(SCRIPT_FOLDERS) $(RESOURCE_FOLDERS) $(CONTENT_FILES_CHROME) \
		../$(BUILD_DIR)/content
	# remove ignore modules from files
	perl module-update.pl modules ignored-modules-$(DIST_TYPE) $(BUILD_DIR)/
# modify according to distribution type
ifeq ($(DIST_TYPE),nightly)
	cd $(BUILD_DIR); \
	../version.sh $(REV_VERSION); \
	sed -i -r 's|("update_url" : ").+(")|\1'$(UPDATE_URL)'/chrome/update.xml\2|' manifest.json
	# make crx
	./maintainer/crxmake.sh $(BUILD_DIR) maintainer/chrome.pem
	mv $(BUILD_DIR).crx $(APP_NAME).crx
else ifeq ($(DIST_TYPE),release)
	cd $(BUILD_DIR); \
	sed -i -r 's|("update_url" : ").+(")|\1'$(UPDATE_URL)'/chrome/update.xml\2|' manifest.json; \
	sed -i -r '/\/\/<!--/d' manifest.json
	# make crx
	./maintainer/crxmake.sh $(BUILD_DIR) maintainer/chrome.pem
	mv $(BUILD_DIR).crx $(APP_NAME).crx
else ifeq ($(DIST_TYPE),hosting)
	cd $(BUILD_DIR); \
	sed -i -r '/update_url/d' manifest.json; \
	sed -i -r '/\/\/<!--/d' manifest.json; \
	$(ZIP) -r ../$(APP_NAME).zip *
endif
	# clean up
	make clean-build

opera:
	############ make opera ############
	make clean-opera clean-build
	mkdir $(BUILD_DIR)
	# copy root files
	cp -r $(ROOT_FILES_OPERA) $(ROOT_FOLDERS_OPERA) $(BUILD_DIR)
	# content/
	mkdir $(BUILD_DIR)/includes
	cd content/; \
	cp -r $(subst /,/.,$(SCRIPT_FOLDERS)) $(CONTENT_FILES_OPERA) \
		../$(BUILD_DIR)/includes
	# remove ignore modules from files
	mkdir $(BUILD_DIR)/content
	cd content/; \
	cp -r $(RESOURCE_FOLDERS) \
		../$(BUILD_DIR)/content
	# remove ignore modules from files
	perl module-update.pl modules ignored-modules-$(DIST_TYPE) $(BUILD_DIR)/
	## change files to opera naming
	mv $(BUILD_DIR)/preferences.html $(BUILD_DIR)/options.html
	mv $(BUILD_DIR)/includes/env.js $(BUILD_DIR)/includes/aa00_env.js
	mv $(BUILD_DIR)/includes/module.js $(BUILD_DIR)/includes/aa10_module.js
	mv $(BUILD_DIR)/includes/loader-chrome.js $(BUILD_DIR)/includes/zz99_loader-chrome.js
	cd $(BUILD_DIR); sed -i -r 's|(href=\"\./)|href=\"./content/|' background.html options.html
	cd $(BUILD_DIR); sed -i -r 's|(src=\"\./[a-zA-Z0-9_-]+/)|src=\"./|' background.html options.html
	cd $(BUILD_DIR); sed -i -r 's|(src=\"\./)|src=\"./includes/|' background.html options.html
	cd $(BUILD_DIR); sed -i -r 's|(/includes/env.js)|/includes/aa00_env.js|' background.html options.html
	cd $(BUILD_DIR); sed -i -r 's|(/includes/module.js)|/includes/aa10_module.js|' background.html options.html
	cd $(BUILD_DIR); sed -i -r 's|(/includes/loader-chrome.js)|/includes/zz99_loader-chrome.js|' background.html options.html
	# modify according to distribution type
ifeq ($(DIST_TYPE),nightly)
	cd $(BUILD_DIR); \
	../version.sh $(REV_VERSION); \
	sed -i -r 's|(<update-description href=").+("/>)|\1'$(UPDATE_URL)'/opera/update.xml\2|' config.xml
else ifeq ($(DIST_TYPE),release)
	cd $(BUILD_DIR); \
	sed -i -r 's|(<update-description href=").+("/>)|\1'$(UPDATE_URL)'/opera/update.xml\2|' config.xml
else ifeq ($(DIST_TYPE),hosting)
	cd $(BUILD_DIR); \
	sed -i -r '/update-description/d' config.xml
endif
	# make oex
	cd $(BUILD_DIR); \
	$(ZIP) -r ../$(APP_NAME).oex *
	# clean up
	make clean-build

safari:
	############ make safari ############
	make clean-safari clean-build
	mkdir -p $(SAFARI_BUILD_DIR)
	# copy root files
	cp -r $(ROOT_FILES_SAFARI) $(ROOT_FOLDERS_SAFARI) $(SAFARI_BUILD_DIR)
	# content/
	mkdir $(SAFARI_BUILD_DIR)/content
	cd content/; \
	cp -r $(SCRIPT_FOLDERS) $(RESOURCE_FOLDERS) $(CONTENT_FILES_SAFARI) \
		../$(SAFARI_BUILD_DIR)/content
	# remove ignore modules from files
	perl module-update.pl modules ignored-modules-$(DIST_TYPE) $(SAFARI_BUILD_DIR)/
	# modify according to distribution type
ifeq ($(DIST_TYPE),nightly)
	# version bump for nightly
	cd $(SAFARI_BUILD_DIR); \
	../../version.sh $(REV_VERSION); \
	sed -i -r 's|(<string>).+(</string><!--updateurl-->)|\1'$(UPDATE_URL)'/safari/update.plist\2|' Info.plist
else ifeq ($(DIST_TYPE),release)
	cd $(SAFARI_BUILD_DIR); \
	sed -i -r 's|(<string>).+(</string><!--updateurl-->)|\1'$(UPDATE_URL)'/safari/update.plist\2|' Info.plist
endif
	#remove comments
	cd $(SAFARI_BUILD_DIR); \
	sed -i -r 's|(.+)(<!.+-->)|\1|' Info.plist
	# make safariextz
	cd $(BUILD_DIR); \
	$(XAR) -cf ../foxtrick.safariextz $(SAFARI_TARGET)
	# inject signature
	$(XAR) --sign -f foxtrick.safariextz --data-to-sign sha1-hash.dat \
		--sig-size `: | openssl dgst -sign maintainer/safari.pem -binary | wc -c` \
		--cert-loc maintainer/safari.der \
		--cert-loc maintainer/safari-cert/cert01 \
		--cert-loc maintainer/safari-cert/cert02 > xar.log
	(echo "3021300906052B0E03021A05000414" | xxd -r -p; cat sha1-hash.dat) \
		| openssl rsautl -sign -inkey maintainer/safari.pem > signature.dat
	$(XAR) --inject-sig signature.dat -f foxtrick.safariextz
	# clean up
	make clean-build

clean-firefox:
	rm -rf *.xpi

clean-chrome:
	rm -rf *.crx
	rm -rf *.zip

clean-opera:
	rm -rf *.oex

clean-safari:
	rm -rf *.safariextz

clean-build:
	rm -rf $(BUILD_DIR)
	rm -f sha1-hash.dat
	rm -f signature.dat

clean: clean-firefox clean-chrome clean-opera clean-safari clean-build
