let aj = require('ajlearnjs');

aj.serve.appStartNUseAllMware(6707); 

const path = aj.serve.path;
const fs = aj.serve.fs;
const multer = aj.serve.multer;
const sha256 = aj.serve.sha256;
const jwt = aj.serve.jwt;

// console.log({ sha256: sha256(aj.serve.SERVER_SALT), jwt: jwt.encode('Andrew Tan', '123'), decode: jwt.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IkFuZHJldyBUYW4i.K3cyWNEw8Us-WaIugh79rtx7p2NCdu1V6Uj5tRGqLUs', '123') });
// console.log({ token: aj.f_genIssueToken(aj.f_rotajF('Andrew Tan Choon Yew'), aj.f_strEncDec('NaiShan667'), 'rw_', 260000) });

const admin = require('firebase-admin');
// var serviceAccount = require('./property-apptreme-firebase-adminsdk-dxwdd-689613fb57.json');
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "cloud-firestore-test-2320f",
        "private_key_id": "42bb5452965734bb2581e03a66fe295cd0526eea",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHJLzj1Nb7Csow\nd1RjAO5vfE8cGwASgNpcuEj14z3bND6O7iwHD5NBuukoZ/741xwq90x/s5jcL7dh\nQ/QpJMBhAXTHJwsRGCS/3MOyMBfb8mQz88zence4RZaAlfGv4Ag4RcMMgjlXAWgm\nXXUJ3JZUHfIJKmGIC/MqOUYmBiU26Fv0j6Q5ua5SNkDC/KbJlHE83OdRJhmqDcVm\nm6AFNQHBYvUC/CrCtv9vSKxNByjELseo0/PBIlnAzhsfzx8TF04ASLg0Mo7ikAuh\nUyUeATlEDtjQeam4zvCK068yvywnwE464eJiyQGiwaFReL9h3JdomdzEMz3QHPiR\nPeJ9s0oBAgMBAAECggEACqbFuPnoCxgR+x2m1H927AeeGPFow5SYxAonUjThWMQm\nmcaAxwU86cXG4B5lM4dt6O5pQmX8xb+CSMrgWFha4dVjcEjU/V5pOMnkvbciJOWG\nGTFFF/MgfOlb72zAYe59rLougJDGjbIe5qPBCtH9nb+Bnp6MW5Z9XxjJI7zYaLiq\nBal2+SR5L+sE9MGK12pYN4HMElmJ6cGzakMcmb6utKHWsV+H/Oox7+r3ysCpk4nQ\noNBUNJk/DGUGWBkOKRyU99M0VijDDrCrBvzQ36C7qs6JCGd36ispRehJhuV8Ro5i\nNFpxYg8kRRO6UoTCr4CrZNQQ2pd3ZYgnHPqrhGK2MQKBgQDyslTM/TbCJsX5pHka\nSfBk6RCKiJF3xbl2CG/0GSTDfo3IHFOMY/2Usx6JSRcQaYxGlv99tpxRlTlIqN9l\nEPJeBSPFwUFo53nfI3hjG0HQtLrlCb08y4AERpo182ofXe2rWIf/jYy4kSXkgPZe\nFgf8Cp6EsPwHkMYX1sBUSA63YwKBgQDSDz4a6qi6k7Zr8YnoWd6x7NKgDyhU615Z\n/AbAgM7fE/SUXwwJc05KWXUKKAftl3EGegySgR5BZ48rSU+r0/uYghgU6uz4QR6e\nDnfuk4Zl3fGdYmcZ8OGccB/OzXmgTyFbgLvQ+gFM8qSkgFbD6xYfsDTFIt6mWdu/\nicUXF0swSwKBgAkFX+mOr+5fipRQ7L9xaCIYF6lOkjmle9NLVP35wUgS+CosA18A\niHhyf/wSX20Yv0IQcsa1dvIBXfO5czRKgPfFsSK0oD3J/Nmyc9MbPEMJtLi2t/X+\nim+eQDUpKxSnZSItVEDHfieOHZ50vLOalglkS6ga/AM7+mEAdn2rgACJAoGBALw1\nrA+x8Tw63VgaMtZcr4v8BTwkWJ69xOwbRHF29+QonRvTjZVqGtvDC3ruIyxeZIbJ\nFDqwNcukXkMKjLgIV4VuCuWzGF/W+PflPtAknmbnVXUOlhJIId1pGRbSRAe+3sR9\ns8qqNkAbqCk8VIF2QXxjBOUdOSETojEb39uwo03BAoGAKN6ByhZwTIHHIMbGWUgL\nn0z7aAnn7sZgd2dXuY07d0BNOO4/XGYkLuXgDtT8nWSpM0liceU1GHLPQ3GAOPk7\nVnJha+tQtb84uSt/MNsC+M/eHMo7M1xLZevRKBWwQb03pEe1jHfYbmtbIl7Av75l\nQHbYq3kfC6FfGQdtI3EviI0=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-prdig@cloud-firestore-test-2320f.iam.gserviceaccount.com",
        "client_id": "109287739800408928794",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-prdig%40cloud-firestore-test-2320f.iam.gserviceaccount.com"
    }),
    databaseURL: "https://cloud-firestore-test-2320f.firebaseio.com"
});
var db = admin.firestore();

var docRef = db.collection('teacher-student-master');
var batch = db.batch();
// aj.trace('{db, docRef, atch}')({ db, docRef, batch });

global.__basedir = __dirname;
// require('./_core/upload.multipartfile.js')(app);
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, __basedir + '/public/images/')
    },
    filename: (req, file, next) => {
        console.log(file); const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + "-" + file.originalname + "-" + Date.now() + '.' + ext)
    },
    //A means of ensuring only images are uploaded. 
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if (image) {
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported");
            //TODO:  A better message response to user on failure.
            return next();
        }
    }
});
const upload = multer({ storage });

// const authToken = require('./node_modules/ajlearnjs/lib/_guardHelper/authToken'); // stuck here exporting the two functions authToken & f_genIssueToken.

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',                       // 'yahoo', 'ajtestacct@yahoo.com', 'apptreme1234'
    auth: {
        user: 'ajphonehome@gmail.com',
        pass: 'NaiShanajtest612345'
    }
});
const SERVERNPORT = 'https://ajafsnode.serveo.net'; /* 'ajafsnode1.serveo.net'; */ 
var vURL = ''; // to: subscriber/signup email,
var mailOptions = { // subject: 'Sending Email using Node.js',
    from: 'ajphonehome@gmail.com', // html: '<h1>Welcome</h1><p>That was easy!</p>'
    to: 'ajmindsoffire@gmail.com',
    subject: 'Please confirm account',
    html: `Please click on the following link to confirm your account:<p>${vURL}</p>` /* text: `Please confirm your account by clicking the following link: ${vURL}` */
}
transporter.sendMail(mailOptions, (error, info) => console.log({ sendMailError: error, testEmailSent: info.response }));     // test emailer.

var oldHshPW = '';
var doneOnce = false;
// const searchAllItems = JSON.parse(fs.readFileSync(`./propylist-master.json`, 'utf8'));
var searchAllItems;
const mastrKYCFile = './b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json';
const tmpRegstryFile = './b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tmpReg.json';
const usrKYC = JSON.parse(fs.readFileSync(`${mastrKYCFile}`, 'utf8'));
const tmpReg = JSON.parse(fs.readFileSync(`${tmpRegstryFile}`, 'utf8'));

if (!doneOnce) {
    doneOnce = true; totalCurrentListCount = 0; searchAllItems = [];

    for (let [KYCIndex, scc] of usrKYC.entries()) {
        if (scc.encEmailID && scc.hshPW && scc.isDeleted === null && KYCIndex !== 0) {
            let agentDistributedCMSJSONdB_FK = sha256(aj.f_rotjaG(aj.f_rotajG(scc.encEmailID) + '==' + sha256(scc.hshPW)));
            let agentDistributedCMSJSONdB = JSON.parse(fs.readFileSync(`./${agentDistributedCMSJSONdB_FK}_agentFile.json`, 'utf8'));
            console.log({ KYCIndex, agentDistributedCMSJSONdB_FK, agtCode: agentDistributedCMSJSONdB[0].usr.usrCode, totalCurrentListCount })
            for (let [indx, propAndusr] of agentDistributedCMSJSONdB.entries()) {
                if (propAndusr.is_deleted !== true && indx !== 0 && propAndusr.id !== 0) {
                    let fillPropertyMasterList = {};
                    fillPropertyMasterList.id = propAndusr.id;
                    // fillPropertyMasterList.offerType = propAndusr.offerType;
                    // fillPropertyMasterList.proptyType = propAndusr.proptyType;
                    // fillPropertyMasterList.district = +propAndusr.district;
                    // fillPropertyMasterList.numBedRms = +propAndusr.numBedRms;
                    // fillPropertyMasterList.price = +propAndusr.price;
                    // fillPropertyMasterList.landSize = +propAndusr.landSize;
                    // fillPropertyMasterList.BUA = +propAndusr.BUA;
                    fillPropertyMasterList.stName = propAndusr.stName;
                    fillPropertyMasterList.listPhotoIcon = propAndusr.listPhotoIcon;
                    fillPropertyMasterList.is_deleted = propAndusr.is_deleted;
                    fillPropertyMasterList.legalNameID = agentDistributedCMSJSONdB[0].usr.legalNameID;
                    fillPropertyMasterList.mobileNumID = agentDistributedCMSJSONdB[0].usr.mobileNumID;
                    fillPropertyMasterList.usrCode = agentDistributedCMSJSONdB[0].usr.usrCode;
                    searchAllItems.push(fillPropertyMasterList);
                    totalCurrentListCount++;
                }
            }
        }
    }

    searchAllItems.map(prop => batch.set(docRef.doc(prop.usrCode + prop.id), prop));
    batch.commit().then(() => console.log('Written to firestore')).catch(err => console.log('Fail', err));

    // console.log({ docRef });
    // for (let [idx, prop] of searchAllItems.entries()) {

    //     docRef.add(prop);
    // }
    // console.log('docRef', JSON.stringify({ docRef }));

    // var setAda = searchAllItems.forEach(element => {
    //     docRef.add({
    //         ...element
    //     });
    // });
    // console.log({ setAda });
    // console.log({ searchAllItems, totalCurrentListCount });
    fs.writeFile(`./propylist-master.json`, JSON.stringify(searchAllItems), 'utf8', (err) => {
        if (err) console.log("::eror:: writing to propertyList-master jsonDB file."); // console.log(err); console.log(data);
        console.log("::good:: updated propertyList-master jsonDB file.");
        console.log({ doneOnce, status: '..sync-ed all distributed files into master list.' });
    });
}

aj.serve.app.post('/api/plugin', (req, res) => {
    aj.trace('/api/plugin[POST]: req.body')(req.body);

    [oldHshPW, vURL] = aj.f_plugin(req, res, usrKYC, tmpReg, oldHshPW,
        nodemailer.createTransport({
            service: 'gmail',                       // 'yahoo', 'ajtestacct@yahoo.com', 'apptreme1234'
            auth: {
                user: 'ajphonehome@gmail.com',
                pass: 'NaiShanajtest612345'
            }
        }), mailOptions, SERVERNPORT, vURL, tmpRegstryFile);
});

aj.serve.app.get('/api/verilink', (req, res) => {
    aj.trace('/api/verilink[GET]: req.query')(req.query);

    [oldHshPW, vURL] = aj.f_verilink(req, res, usrKYC, tmpReg, oldHshPW,
        nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ajphonehome@gmail.com',
                pass: 'NaiShanajtest612345'
            }
        }), mailOptions, SERVERNPORT, vURL, tmpRegstryFile, mastrKYCFile,
        'AJSchool',
        {
            "id": 0,
            // "offerType": "",
            // "proptyType": "",
            // "district": "",
            // "numBedRms": "",
            // "price": "",
            // "landSize": "",
            // "BUA": "",
            "stName": "",
            "listPhotoIcon": "",
            "teacherName": "ADD NEW",
            "teacherMobile": "",
            "teacherEmail": "",
            // "propyFullAddr": "",
            // "postCode": "",
            "is_deleted": false
        });
});


aj.serve.app.post('/api/KYCupdate', (req, res) => {
    aj.trace('/api/KYCupdate[POST]: req.body')(req.body);

    let foundInKYC = false;

    for (let [KYCIndex, kyc] of usrKYC.entries()) {
        if (req.body.encEmailID == kyc.encEmailID && req.body.hshPW == kyc.hshPW) {
            foundInKYC = true; console.log({ foundInKYC, KYCIndex });

            kyc.encLegalNameID = req.body.encLegalNameID;
            kyc.gender = req.body.gender;
            kyc.encDOB = req.body.encDOB;
            kyc.encMobileNumID = req.body.encMobileNumID;
            console.log({ kyc });

            fs.writeFile(`${mastrKYCFile}`, JSON.stringify(usrKYC), 'utf8', (err) => {
                if (err) {
                    console.log("::eror:: writing to usrKYC masterIndexHeadTable jsonDB.");
                    return res.status(500).json({
                        status: '..it appears we have veriUsr service write fault, please try again later.'
                    });
                }
                console.log("::good:: wrote to usrKYC masterIndexHeadTable jsonDB.");

                let updateUsrAst_astFK = sha256(aj.f_rotjaG(aj.f_rotajG(kyc.encEmailID) + '==' + sha256(kyc.hshPW)));
                let updateUsrAst = JSON.parse(fs.readFileSync(`./${updateUsrAst_astFK}_agentFile.json`, 'utf8'));
                if (req.body.encLegalNameID)
                    updateUsrAst[0].usr.legalNameID = aj.f_encDecUsrName(req.body.encLegalNameID, -1).fullName;
                updateUsrAst[0].usr.mobileNumID = aj.f_rotjaF(req.body.encMobileNumID);
               
                for (let [AllIndex, astItem] of searchAllItems.entries()) {
                    if (astItem.usrCode == updateUsrAst[0].usr.usrCode) {
                        astItem.legalNameID = updateUsrAst[0].usr.legalNameID;
                        astItem.mobileNumID = updateUsrAst[0].usr.mobileNumID;
                        fs.writeFile(`./propylist-master.json`, JSON.stringify(searchAllItems), 'utf8', (err) => {
                            if (err) {
                                console.log("::eror:: writing to propertyList-master jsonDB file.");
                            }
                            console.log("::good:: updated propertyList-master jsonDB file.");
                        });
                    }
                }

                fs.writeFile(`./${updateUsrAst_astFK}_agentFile.json`, JSON.stringify(updateUsrAst), 'utf8', (err) => {
                    if (err) {
                        console.log("::eror:: writing to distributed agent-cms jsonDB file.");
                        return res.status(500).json({
                            status: '..it appears we have a distributed-cms service write fault, please try again later.'
                        });
                    }
                    console.log("::good:: wrote to distributed agent-cms jsonDB file.");
                });

                res.status(202).json({
                    status: '..your profile records have been updated.',
                    usrKYC: kyc
                });
            });
        }
    }
});


aj.serve.app.get('/api/search-list', (req, res) => {
    aj.trace('/api/search-list[GET]: req.query')(req.query);

    let listCount = 0; let list = 'propylist-master'; let usrAstList = [];

    if (req.query.key1 != 'null' && req.query.key2 != 'null' && req.query.crud != 'getAll') {
        usrAstList = []; listCount = 0;

        let listUsr_astFK = sha256(aj.f_rotjaG(aj.f_rotajG(req.query.key1) + '==' + sha256(req.query.key2)));
        let listUsr = JSON.parse(fs.readFileSync(`./${listUsr_astFK}_agentFile.json`, 'utf8'));
        let foundInKYC = false; let list = false;
        for (let [KYCIndex, scc] of usrKYC.entries()) {
            if (req.query.key1 == scc.encEmailID && req.query.key2 == scc.hshPW) {
                foundInKYC = true; console.log({ foundInKYC, KYCIndex });

                let myuserlist_owners = []; let ownerDet = {};
                // console.log({ listUsr_astFK, listUsr });
                for (let [idx, l] of listUsr.entries()) {
                    ownerDet = {};
                    if (req.query.crud == l.teacherName && !l.is_deleted && req.query.searchPrice === undefined) {
                        list = listUsr_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        usrAstList.push(l);

                    }
                    if (req.query.searchType == l.offerType &&
                        req.query.typeOfProptySelected == l.proptyType &&
                        req.query.districtSelected == l.district &&
                        req.query.bedrmsSelected == l.numBedRms &&
                        req.query.searchPrice >= +l.price &&
                        !l.is_deleted && req.query.crud === undefined) {
                        list = listUsr_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        listUsr[idx].usrCode = listUsr[0].usr.usrCode;
                        listUsr[idx].legalNameID = listUsr[0].usr.legalNameID;
                        listUsr[idx].mobileNumID = listUsr[0].usr.mobileNumID;
                        usrAstList.push(listUsr[idx]);
                    }
                    if (l.teacherName && !l.is_deleted && req.query.crud === undefined) {
                        ownerDet.teacherName = l.teacherName;
                        ownerDet.teacherMobile = l.teacherMobile;
                        ownerDet.teacherEmail = l.teacherEmail;
                        // ownerDet.propyFullAddr = l.propyFullAddr;
                        // ownerDet.postCode = l.postCode;
                        myuserlist_owners.push(ownerDet);
                    }

                }
                console.log(`${list}>> agentList found items:`, listCount);
                return res.status(200).json({
                    status: `..your agent search returned with ${listCount} items.`,
                    usrAstList,
                    listCount,
                    myuserlist_owners
                });
            }
        }
    } else if (req.query.crud == 'getAll') {
        usrAstList = []; listCount = 0;
        for (let [idx, l] of searchAllItems.entries()) {
            if (l.is_deleted != true) {
                listCount++;
                usrAstList.push(l);
            }
        }
        console.log(`propylist-master>> userList found items:`, listCount);
        return res.status(200).json({
            status: `..your user browseAll returned with ${listCount} items.`,
            usrAstList,
            listCount
        });
    } else if (req.query.key1 == 'null' && req.query.key2 == 'null') {
        usrAstList = []; listCount = 0;
        // let searchAllItems = JSON.parse(fs.readFileSync(`./${list}.json`, 'utf8'));
        for (let [idx, l] of searchAllItems.entries()) {
            if (req.query.searchType == l.offerType &&
                req.query.typeOfProptySelected == l.proptyType &&
                req.query.districtSelected == l.district &&
                req.query.bedrmsSelected == l.numBedRms &&
                req.query.searchPrice >= +l.price &&
                !l.is_deleted) {
                listCount++;
                console.log({ list, idxList: idx, listCount });
                usrAstList.push(l);
            }
        }
        console.log(`${list}>> userList found items:`, listCount);
        return res.status(200).json({
            status: `..your user search returned with ${listCount} items.`,
            usrAstList,
            listCount
        });
    }
});


// aj.serve.app.get('/api/wealthmore-meter', authToken, (req, res) => {

//     try {
//         let usrAst = JSON.parse(fs.readFileSync(`./${req.astFK}.json`, 'utf8'));
//         res.ast = aj.f_rotajF(JSON.stringify(usrAst));
//         console.log(JSON.stringify(usrAst));
//         console.log({
//             nexToken: res.nexToken,
//             usrAst: res.ast
//         });
//         res.status(200).json({
//             nexToken: res.nexToken,
//             usrAst: res.ast
//         });

//     } catch (error) {
//         res.status(400).json({
//             status: '..please try again later..our servers may be overwhelmed.'
//         });
//     }
// });

aj.serve.app.post('/images', upload.single("proptyPic"), (req, res) => {
    console.log('/images:[POST]');
    console.log('req.body:', JSON.stringify(req.body));
    console.log('req.file:', req.file);
    if (req.body.encEmailID && req.body.hshPW) {
        usrAstList = []; listCount = 0;
        // let usrKYC = JSON.parse(fs.readFileSync(`${mastrKYCFile}`, 'utf8'));
        let updateUsrAst_astFK = sha256(aj.f_rotjaG(aj.f_rotajG(req.body.encEmailID) + '==' + sha256(req.body.hshPW)));
        let updateUsrAst = JSON.parse(fs.readFileSync(`./${updateUsrAst_astFK}_agentFile.json`, 'utf8'));
        let foundInKYC = false; let list = false;
        for (let [KYCIndex, scc] of usrKYC.entries()) {
            if (req.body.encEmailID == scc.encEmailID && req.body.hshPW == scc.hshPW) {
                foundInKYC = true; console.log({ foundInKYC, KYCIndex });

                let myuserlist_owners = []; let ownerDet = {};
                // console.log({ listUsr_astFK, listUsr });
                for (let [idx, l] of updateUsrAst.entries()) {
                    ownerDet = {};
                    if (req.body.crud == l.teacherName) {

                        if (req.body.propID == l.id && l.id != 0) {
                            l.listPhotoIcon = req.file.filename;
                            for (let [idx1, all] of searchAllItems.entries()) {
                                if (l.id == all.id && updateUsrAst[0].usr.usrCode == searchAllItems[idx1].usrCode) {
                                    all.listPhotoIcon = l.listPhotoIcon;
                                    docRef.doc(searchAllItems[idx1].usrCode + searchAllItems[idx1].id).set(searchAllItems[idx1]);
                                    fs.writeFile(`./propylist-master.json`, JSON.stringify(searchAllItems), 'utf8', (err) => {
                                        if (err) {
                                            console.log("::eror:: writing to propertyList-master jsonDB file."); // console.log(err); console.log(data);
                                        }
                                        console.log("::good:: updated propertyList-master jsonDB file.");
                                    });
                                }
                            }
                        }

                        list = updateUsrAst_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        usrAstList.push(l);
                    }
                }
                fs.writeFile(`./${updateUsrAst_astFK}_agentFile.json`, JSON.stringify(updateUsrAst), 'utf8', (err) => {
                    if (err) {
                        console.log("::eror:: writing to new distributed agent-cms jsonDB file."); // console.log(err); console.log(data);
                        return res.status(500).json({
                            status: '..it appears we have a distributed-cms service write fault, please try again later.'
                        });
                    }
                    console.log("::good:: wrote to new distributed agent-cms jsonDB file.");
                });
                console.log(`${list}>> agentList found items:`, listCount);
                return res.status(200).json({
                    status: `..your property image was uploaded and updated successfully!`,
                    usrAstList,
                    listCount
                });
            }
        }
    }
    res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
});

aj.serve.app.post('/api/register', (req, res) => {
    aj.trace('/api/register[POST]: req.body')(req.body);

    var updatePropyMasterList = {};
    if (req.body.encEmailID && req.body.hshPW) {
        usrAstList = []; listCount = 0; myuserlist_owners_length = 0;

        let updateUsrAst_astFK = sha256(aj.f_rotjaG(aj.f_rotajG(req.body.encEmailID) + '==' + sha256(req.body.hshPW)));
        let updateUsrAst = JSON.parse(fs.readFileSync(`./${updateUsrAst_astFK}_agentFile.json`, 'utf8'));
        let foundInKYC = false; let list = false;
        for (let [KYCIndex, scc] of usrKYC.entries()) {
            if (req.body.encEmailID == scc.encEmailID && req.body.hshPW == scc.hshPW) {
                foundInKYC = true; console.log({ foundInKYC, KYCIndex });

                let myuserlist_owners = []; let ownerDet = {};
                // console.log({ listUsr_astFK, listUsr });
                for (let [idx, l] of updateUsrAst.entries()) {
                    myuserlist_owners_length++;
                    if (req.body.teacherName == l.teacherName && l.id != 0) {

                        for (let [idex, ul] of req.body.myUsrUpdateList.entries()) {
                            if (ul.id == l.id) {
                                ul.teacherName = req.body.myUsrUpdateList[0].teacherName.toUpperCase();
                                ul.teacherMobile = req.body.myUsrUpdateList[0].teacherMobile;
                                ul.teacherEmail = req.body.myUsrUpdateList[0].teacherEmail;
                                updateUsrAst[idx] = ul;
                                console.log({ updateUsrAst, ul });
                            }
                        }
                        for (let [idx1, all] of searchAllItems.entries()) { // l and all are internal counters.
                            if (l.id == all.id && updateUsrAst[0].usr.usrCode == searchAllItems[idx1].usrCode) {
                                searchAllItems[idx1].id = updateUsrAst[idx].id;
                                // searchAllItems[idx1].offerType = updateUsrAst[idx].offerType;
                                // searchAllItems[idx1].proptyType = updateUsrAst[idx].proptyType;
                                // searchAllItems[idx1].district = +updateUsrAst[idx].district;
                                // searchAllItems[idx1].numBedRms = +updateUsrAst[idx].numBedRms;
                                // searchAllItems[idx1].price = +updateUsrAst[idx].price;
                                // searchAllItems[idx1].landSize = +updateUsrAst[idx].landSize;
                                // searchAllItems[idx1].BUA = +updateUsrAst[idx].BUA;
                                searchAllItems[idx1].stName = updateUsrAst[idx].stName;
                                searchAllItems[idx1].listPhotoIcon = updateUsrAst[idx].listPhotoIcon;
                                searchAllItems[idx1].is_deleted = updateUsrAst[idx].is_deleted;
                                searchAllItems[idx1].legalNameID = updateUsrAst[0].usr.legalNameID;
                                searchAllItems[idx1].mobileNumID = updateUsrAst[0].usr.mobileNumID;
                                searchAllItems[idx1].usrCode = updateUsrAst[0].usr.usrCode;

                                docRef.doc(searchAllItems[idx1].usrCode + searchAllItems[idx1].id).set(searchAllItems[idx1]);
                            }
                        }
                        list = updateUsrAst_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        // usrAstList.push(l);
                    }
                }

                if (req.body.teacherName == 'ADD NEW') {
                    req.body.myUsrUpdateList[0].teacherName = req.body.myUsrUpdateList[0].teacherName.toUpperCase();
                    req.body.myUsrUpdateList[0].id = myuserlist_owners_length - 1;
                    updateUsrAst.push(req.body.myUsrUpdateList[0]);

                    updatePropyMasterList.id = req.body.myUsrUpdateList[0].id;
                    // updatePropyMasterList.offerType = req.body.myUsrUpdateList[0].offerType;
                    // updatePropyMasterList.proptyType = req.body.myUsrUpdateList[0].proptyType;
                    // updatePropyMasterList.district = +req.body.myUsrUpdateList[0].district;
                    // updatePropyMasterList.numBedRms = +req.body.myUsrUpdateList[0].numBedRms;
                    // updatePropyMasterList.price = +req.body.myUsrUpdateList[0].price;
                    // updatePropyMasterList.landSize = +req.body.myUsrUpdateList[0].landSize;
                    // updatePropyMasterList.BUA = +req.body.myUsrUpdateList[0].BUA;
                    updatePropyMasterList.stName = req.body.myUsrUpdateList[0].stName;
                    updatePropyMasterList.listPhotoIcon = req.body.myUsrUpdateList[0].listPhotoIcon;
                    updatePropyMasterList.is_deleted = req.body.myUsrUpdateList[0].is_deleted;
                    updatePropyMasterList.legalNameID = updateUsrAst[0].usr.legalNameID;
                    updatePropyMasterList.mobileNumID = updateUsrAst[0].usr.mobileNumID;
                    updatePropyMasterList.usrCode = updateUsrAst[0].usr.usrCode;
                    searchAllItems.push(updatePropyMasterList);
                    docRef.doc(updatePropyMasterList.usrCode + updatePropyMasterList.id).set(updatePropyMasterList);
                }

                fs.writeFile(`./${updateUsrAst_astFK}_agentFile.json`, JSON.stringify(updateUsrAst), 'utf8', (err) => {
                    if (err) {
                        console.log("::eror:: writing to new distributed agent-cms jsonDB file."); // console.log(err); console.log(data);
                        return res.status(500).json({
                            status: '..it appears we have a distributed-cms service write fault, please try again later.'
                        });
                    }
                    console.log("::good:: wrote to new distributed agent-cms jsonDB file.");
                    fs.writeFile(`./propylist-master.json`, JSON.stringify(searchAllItems), 'utf8', (err) => {
                        if (err) {
                            console.log("::eror:: writing to propertyList-master jsonDB file."); // console.log(err); console.log(data);
                        }
                        console.log("::good:: updated propertyList-master jsonDB file.");
                    });
                });
                console.log(`${list}>> agentList found items:`, listCount);
                return res.status(200).json({
                    status: `..your new teacher-student or teacher-students-saveAll was uploaded and updated successfully!`/* ,
                    myUsrUpdateList: req.body.myUsrUpdateList */
                });
            }
        }
    }
});

// console.log(aj.f_genIssueToken('jskJIrKKswx@LjHsP.nrj', '3cc98b78aabdbb22273c4679870ad2e05c8672707675734f0ea2fbef6618d651', 'rw_'));
console.log(aj.f_genIssueToken('jskJIrKKswx@LjHsP.nrj', null, 'rw_'));
console.log(aj.f_genIssueToken('jskJIrKKswx@LjHsP.nrj', null, 'rw_', 260000));
// console.log(aj.f_genIssueToken('jskJIrKKswx@LjHsP.nrj', '', 'rw_'));
console.log(sha256(aj.f_rotjaG(aj.f_rotajG('jskJIrKKswx2@LjHsP.nrj') + '==' + sha256('null'))));
console.log(sha256(aj.f_rotjaG(aj.f_rotajG('HkJwxyvHk@Hqqvwxjx.IL') + '==' + sha256('null'))));


// aj.serve.app.use(aj.serve.express.static(__dirname + '/dist'));

aj.serve.app.use(aj.serve.express.static(__dirname + '/public'));
// index must come after /public for images to be seen from /public/images
// aj.serve.app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
// });
// aj.serve.app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

aj.serve.app.use((req, res, next) => {
    res.redirect('/error.html');
});