const ftp = require("basic-ftp")

module.exports = async function ({ uploadFrom, uploadTo }) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: process.env.ftpHost,
            user: process.env.ftpUser,
            password: process.env.ftpPass,
            secure: false
        })
        const fileList = await client.list();
        /* {
    name: 'clients.html',
    type: 1,
    size: 16257,
    rawModifiedAt: '2018-05-13T12:57:01.000Z',
    modifiedAt: 2018-05-13T12:57:01.000Z,
    permissions: { user: 6, group: 4, world: 4 },
    hardLinkCount: undefined,
    link: undefined,
    group: 'o39931961',
    user: 'u512706157',
    uniqueID: '811U19E0234'
    }*/
        const isFileExist = fileList.some(fileInfo => fileInfo.name === uploadTo);
        if (isFileExist) await client.remove(uploadTo);
        await client.uploadFrom('./' + uploadFrom, uploadTo);
    }
    catch (err) {
        console.log(err)
    }
    return client.close()
}