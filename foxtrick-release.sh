#!/bin/bash
echo 'upload release'

DIR=$(cd $(dirname $0); pwd)
. "$DIR"/include.sh || (echo "==============ERROR=========== include.sh" && exit -1)
. "$DIR"/cron-config.sh || (echo "==============ERROR=========== cron-config.sh" && exit -1)
cd "$DIR/../$RELEASE" || log "Cannot cd to $RELEASE"

git stash
git pull --rebase origin || log "Cannot git pull rebase"
./version.sh 0.16.1.1
./version.sh
cd maintainer || log "Cannot cd to maintainer"
#./crowdin-upload.sh || echo "Cannot upload external translations"
#./crowdin-download.sh || echo "Cannot download external translations"
#./commit.locale.sh || echo "Cannot commit locale"
echo "--- foxtrick.org release---"
./upload-nightly.sh -c upload.release.conf.sh BRANCH=release XAR=/usr/local/bin/xar || log "Cannot upload foxtrick.org release"
#echo "--- ixweb release ---"
#./upload-nightly.sh -c upload.ixweb.release.conf.sh BRANCH=release XAR=/usr/local/bin/xar || log "Cannot upload ixweb release"
echo "--- foxtrick.org hosted ---"
./upload-nightly.sh -c upload.hosting.conf.sh BRANCH=hosted XAR=/usr/local/bin/xar clean chrome || log "Cannot upload foxtrick.org hosted"
cd ..
git stash
log "Success release upload."
