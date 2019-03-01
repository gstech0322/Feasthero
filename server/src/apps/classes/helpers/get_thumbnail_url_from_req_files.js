function getThumbnailUrlFromReqFiles(files) {
    if (!files)
        return;
    for (let i = 0; i < files.length; i++) {
        if (files[i].fieldname === 'thumbnail')
            return files[i].path;
    }
}

module.exports = getThumbnailUrlFromReqFiles;