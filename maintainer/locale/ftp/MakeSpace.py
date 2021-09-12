from ftplib import FTP
import Credentials
import re


def getFiles(ftp):
    # callback for each file, directory
    def display(line):
        file = {}
        info = line.split(';')
        for i in info:
            values = i.split('=')
            if len(values) == 2:
                file[values[0]] = values[1]
            elif len(values) == 1:
                file['name'] = values[0].rstrip().lstrip()
            else:
                raise Exception('Bullshit')

        files[dir].append(file)

    dirs = ['beta', 'nightly', 'beta/chrome', 'beta/safari', 'beta/opera', 'nightly/chrome', 'nightly/safari', 'nightly/opera']

    # collect files
    files = {}
    for dir in dirs:
        ftp.cwd("/htdocs/%s" % dir)
        list = ftp.retrlines('MLSD', display)
        files[dir] = list

    # sort by midify date
    for f in files:
        files[f] = sorted(files[f], key=lambda x: x["modify"])

    # reduce to filename and modify date
    for f in files:
        for idx, value in enumerate(files[f]):
            wanted_keys = ['name', 'modify']
            files[f][idx] = {k: value[k] for k in set(wanted_keys) & set(value.keys())}

    # filter to interresting files
    for f in files:
        files[f] = [a for a in files[f] if re.search(r'.xpi$|.safariextz$|.oex$|.crx$', a['name'])]

    return files


def deleteFiles(keep=15):
    ftp = FTP(Credentials.IP)
    ftp.login(Credentials.USER, Credentials.PW)
    files = getFiles(ftp)

    # show them
    for dir in files:
        ftp.cwd("/htdocs/%s" % dir)
        for idx, value in enumerate(files[dir]):
            if idx < len(files[dir]) - keep:
                files[dir][idx]['status'] = 'deleted'
                res = ftp.delete(value['name'])
                files[dir][idx]['srvmsg'] = res
            else:
                files[dir][idx]['status'] = 'kept'

    ftp.quit()
    return files


def getQuota():
    ftp = FTP(Credentials.IP)
    ftp.login(Credentials.USER, Credentials.PW)
    res = ftp.sendcmd("site quota")
    return res.split('\n')
