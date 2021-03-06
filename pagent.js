const aj = require('./_core/ajExpressMWareEncAlphaNumNHashSalt_AJBase');
const jwt = require('./_core/ajExpressMWareEncAlphaNumNHashSalt_AJBase').jwt;
const multer = require('./_core/ajExpressMWareEncAlphaNumNHashSalt_AJBase').multer;
const path = require('path');

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

var docRef = db.collection('property-master-base');
var batch = db.batch();

aj.appStartNUseAllMware(6707); // *** confirmed can 'load balance' required daemons across all ports listened to here. *** // 
wfi = aj.appStartNUseAllMware(6701);
maybe = aj.appStartNUseAllMware(6702);
fartry = aj.appStartNUseAllMware(7700);

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
const upload = multer({ storage: storage });
// const upload = multer({ storage });


// instance of filesys.
const fs = require('fs');
// require('./_guardHelper/testEncNHash')   // tested encryptions F and G and Hash256.  Also node ./_guardHelper/testEncNHash.js
// require('./_guardHelper/testMyJWT')      // tested my JWT req-res protocol.  Also node ./_guardHelper/testMyJWT.js
const authToken = require('./_guardHelper/authToken'); // stuck here exporting the two functions authToken & genIssueToken.

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',                       // 'yahoo', 'ajtestacct@yahoo.com', 'apptreme1234'
    auth: {
        user: 'ajphonehome@gmail.com',
        pass: 'NaiShanajtest612345'
    }
});
const SERVERNPORT = 'ajafsnode.serveo.net'; // from: 'ajtestacct@yahoo.com',
var vURL = ''; // to: subscriber/signup email,
var mailOptions = { // subject: 'Sending Email using Node.js',
    from: 'ajphonehome@gmail.com', // html: '<h1>Welcome</h1><p>That was easy!</p>'
    to: 'ajmindsoffire@gmail.com',
    subject: 'Please confirm account',
    html: `Please click on the following link to confirm your account:<p>${vURL}</p>` /* text: `Please confirm your account by clicking the following link: ${vURL}` */
}
transporter.sendMail(mailOptions, function (error, info) { // test emailer.
    if (error) console.log(error);
    else console.log('TestEmail sent: ' + info.response);
});
var oldHshPW = '';
var masterIndexHeadTableJSONdB = {};
var doneOnce = false;
// const searchAllItems = JSON.parse(fs.readFileSync(`./propylist-master.json`, 'utf8'));
var searchAllItems;
const clntKYC = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', 'utf8'));
const tempReg = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json', 'utf8'));

aj.app.post('/api/register', (req, res) => {

    
    let nexToken, authSIMToken, found = false;
    console.log('/api/register:');
    console.log({ 'req.body.encEmailID': req.body.encEmailID, 'req.body.hshPW': req.body.hshPW, 'req.body.rstPW': req.body.rstPW });
    (req.body.rstPW) ? req.body.hshPW = req.body.rstPW : req.body.hshPW;
    for (let [index, c] of clntKYC.entries()) {
        if (req.body.encEmailID == c.encEmailID) {
            found = true;
            console.log({ found, indexKYC: index });
            if (req.body.hshPW) {
                if (req.body.hshPW == c.hshPW) {
                    try {
                        nexToken = aj.genIssueToken(req.body.encEmailID, req.body.hshPW, 'rw_');
                        authSIMToken = aj.genIssueToken(req.body.encEmailID, req.body.hshPW, 'rw_', 260000);
                    } catch (error) {
                        res.status(400).json({
                            status: '..oops something broke, please try again.'
                        });
                    }
                    res.status(200).json({
                        nexToken,
                        authSIMToken,
                        status: '..you have already signed up, logging you in.',
                        clntKYC: c
                    });
                } else if (c.hshPW != null && !req.body.rstPW) {
                    res.status(200).json({
                        status: '..you have already signed up, please log in with the right password.'
                    });
                } else if (c.hshPW != null && req.body.rstPW) {
                    res.status(200).json({
                        status: '..please verify your email to effect new password.'
                    });

                    let foundInTemp = false;

                    //create random 16 character token https://www.quora.com/profile/AJ-Funk
                    // let chars = JSON.parse(fs.readFileSync('./specGCodes.json', 'utf8'));
                    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    let token = '';
                    for (let i = 23; i > 0; --i) { // mine is 23.
                        token += chars[Math.round(Math.random() * (chars.length - 1))];
                    }
                    let myExpire = Date.now() / 1000 + 6 * 3600; // create expiration date /* var expires = new Date();  expires.setHours(expires.getHours() + 6); */

                    let newUC = false;
                    for (let [index, uc] of tempReg.entries()) {
                        if (req.body.encEmailID == uc.encEmailID && uc.emailVerified == true && !uc.isDeleted) {
                            uc.isDeleted = true; newUC = true;
                            oldHshPW = uc.hshPW;
                            if (newUC) {
                                let rstClntUser = {};
                                rstClntUser.encEmailID = req.body.encEmailID;
                                rstClntUser.hshPW = req.body.rstPW ? req.body.rstPW : null;
                                rstClntUser.emailVerified = false;
                                rstClntUser.linkToken = { // save this in your DB https://www.quora.com/profile/AJ-Funk
                                    vEmailLinkToken: token,
                                    expires: myExpire
                                };
                                rstClntUser.emailConfirmSends = 1;
                                rstClntUser.emailConfirmTries = 0;
                                vURL = SERVERNPORT + `/api/verilink/?iD=${rstClntUser.encEmailID}&vE=${rstClntUser.linkToken.vEmailLinkToken}&eX=${rstClntUser.linkToken.expires}&rsT=true`;
                                tempReg.push(rstClntUser);
                            }
                        } else if (req.body.encEmailID == uc.encEmailID && uc.emailVerified == false && !uc.isDeleted) {
                            uc.emailConfirmSends++;
                        }
                    }



                    mailOptions.to = aj.rotjaF(req.body.encEmailID);
                    let registerType = req.body.hshPW ? 'signup' : 'free subscription';
                    /* mailOptions.text = `Please confirm your account by clicking the following link: ${vURL}`; */
                    mailOptions.html = `<h2>Please click on the following link to confirm your <strong>${registerType}</strong>:</h2><p>${vURL}</p>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="full" object="drag-module" bgcolor="#303030" c-style="not3BG">
                <tbody><tr mc:repeatable="">
                    <td align="center" style="background-image: url('ajafsnode.serveo.net/images/Rachela_Asciified.png'); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; background-position: center center; background-repeat: no-repeat; background-color: #303030;" c-style="not3BG" id="not3">
                        
                    </td>
                </tr>
                </tbody></table>`;

                    console.log({
                        mailOptionsTo: mailOptions.to,
                        vURL: vURL
                    }); // console.log({ mailOptions: mailOptions, vURL: vURL });
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            fs.writeFile("./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json", JSON.stringify(tempReg), 'utf8', (err) => {
                                if (err) {
                                    console.log("::eror:: writing to temp newClntUser register jsonDB.");
                                    return res.status(500).json({
                                        status: '..it appears we have newClntUser service write fault, please try again later.'
                                    });
                                }
                                console.log("::good:: wrote to temp newClntUser register jsonDB.");
                            });
                        }
                    });




                } else if (c.hshPW == null) {
                    try {
                        nexToken = aj.genIssueToken(req.body.encEmailID, req.body.hshPW, 'rw_');
                        authSIMToken = aj.genIssueToken(req.body.encEmailID, req.body.hshPW, 'rw_', 260000);
                    } catch (error) {
                        res.status(400).json({
                            status: '..oops something broke, please try again.'
                        });
                    }
                    c.hshPW = req.body.hshPW;
                    if (!req.body.rstPW) c.clntCreatDate = new Date();
                    fs.writeFile('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', JSON.stringify(clntKYC), 'utf8', (err) => {
                        if (err) {
                            console.log("::eror:: writing to new clntKYC masterIndexHeadTable jsonDB.");
                            return res.status(500).json({
                                status: '..it appears we have veriClntUser service write fault, please try again later.'
                            });
                        }
                        console.log("::good:: wrote to new clntKYC masterIndexHeadTable jsonDB.");
                        res.status(200).json({
                            nexToken: nexToken,
                            authSIMToken: authSIMToken,
                            status: '..you have already subscribed for free, but now you have just signed up! Thank you for that.'
                        });
                    });

                }
            } else if (req.body.hshPW === undefined) {
                if (c.hshPW == null) {
                    try {
                        nexToken = aj.genIssueToken(req.body.encEmailID, 'null', 'r__');
                        authSIMToken = aj.genIssueToken(req.body.encEmailID, 'null', 'r__', 260000);

                        req.astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.body.encEmailID) + '==' + aj.sha256('null')));
                        console.log(req.astFK); // subscribe A1.
                        /* let clntUserAsset = require(`./${req.astFK}.json`); res.ast = aj.rotajF(JSON.stringify(clntUserAsset)); */
                        let clntUserAsset = JSON.parse(fs.readFileSync(`./${req.astFK}.json`, 'utf8'));
                        res.ast = aj.rotajF(JSON.stringify(clntUserAsset));
                        let testObj = JSON.parse(aj.rotjaF(res.ast));
                        // console.log(testObj);
                        console.log(typeof (testObj));
                        console.log(testObj[10]);
                        console.log(testObj[10].Volume);
                        console.log(testObj[10].Name);
                    } catch (error) {
                        res.status(400).json({
                            status: '..oops something broke, please try again.'
                        });
                    }
                    res.status(200).json({
                        nexToken: nexToken,
                        authSIMToken: authSIMToken,
                        status: '..you have already subscribed for free, logging you in.',
                        clntUserAsset: res.ast,
                        resAstDecrypted: aj.rotjaF(res.ast)
                    });
                } else {
                    res.status(200).json({
                        status: '..our records show you are signed up, please log in with the right password.'
                    });
                }
            }
        } else { }
    }
    if (!found) {
        // send mailto and update b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json
        if (req.body.encEmailID) {
            let foundInTemp = false;
            //create random 16 character token https://www.quora.com/profile/AJ-Funk
            // let chars = JSON.parse(fs.readFileSync('./specGCodes.json', 'utf8'));
            let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let token = '';
            for (let i = 23; i > 0; --i) { // mine is 23.
                token += chars[Math.round(Math.random() * (chars.length - 1))];
            }
            let myExpire = Date.now() / 1000 + 6 * 3600; // create expiration date /* var expires = new Date();  expires.setHours(expires.getHours() + 6); */

            for (let [index, uc] of tempReg.entries()) {
                if (req.body.encEmailID == uc.encEmailID) {
                    foundInTemp = true;
                    uc.hshPW = req.body.hshPW ? req.body.hshPW : null;
                    uc.linkToken = {
                        vEmailLinkToken: token,
                        expires: myExpire
                    };
                    uc.emailConfirmSends++;
                    vURL = SERVERNPORT + `/api/verilink/?iD=${uc.encEmailID}&vE=${uc.linkToken.vEmailLinkToken}&eX=${uc.linkToken.expires}`;
                }
            }

            if (!foundInTemp) {
                let newClntUser = {};
                /* console.log(tempReg); */
                newClntUser.encEmailID = req.body.encEmailID;
                newClntUser.hshPW = req.body.hshPW ? req.body.hshPW : null;
                newClntUser.emailVerified = false;
                newClntUser.linkToken = { // save this in your DB https://www.quora.com/profile/AJ-Funk
                    vEmailLinkToken: token,
                    expires: myExpire
                };
                newClntUser.emailConfirmSends = 1;
                newClntUser.emailConfirmTries = 0;
                vURL = SERVERNPORT + `/api/verilink/?iD=${newClntUser.encEmailID}&vE=${newClntUser.linkToken.vEmailLinkToken}&eX=${newClntUser.linkToken.expires}`;
                tempReg.push(newClntUser);
            }

            mailOptions.to = aj.rotjaF(req.body.encEmailID);
            let registerType = req.body.hshPW ? 'signup' : 'free subscription';
            /* mailOptions.text = `Please confirm your account by clicking the following link: ${vURL}`; */
            mailOptions.html = `<h2>Please click on the following link to confirm your <strong>${registerType}</strong>:</h2><p>${vURL}</p>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="full" object="drag-module" bgcolor="#303030" c-style="not3BG">
            <tbody><tr mc:repeatable="">
                <td align="center" style="background-image: url('ajafsnode.serveo.net/images/Rachela_Asciified.png'); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; background-position: center center; background-repeat: no-repeat; background-color: #303030;" c-style="not3BG" id="not3">
                    <div mc:hideable="">

                        
                    </div>
                </td>
            </tr>
            </tbody></table>`;

            console.log({
                mailOptionsTo: mailOptions.to,
                vURL: vURL
            }); // console.log({ mailOptions: mailOptions, vURL: vURL });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    fs.writeFile("./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json", JSON.stringify(tempReg), 'utf8', (err) => {
                        if (err) {
                            console.log("::eror:: writing to temp newClntUser register jsonDB.");
                            return res.status(500).json({
                                status: '..it appears we have newClntUser service write fault, please try again later.'
                            });
                        }
                        console.log("::good:: wrote to temp newClntUser register jsonDB.");
                    });
                }
            });

            if (req.body.hshPW) {
                res.status(200).json({
                    status: '..thank you for signing up - please check your email to verify within 6 hours.'
                });
            } else {
                res.status(200).json({
                    status: '..thank you for subscribing to our agency automated butler service - please check your email to verify within 6 hours..'
                });
            }
        }
    }
});

aj.app.post('/api/register-update', (req, res) => {
    let found = false;
    // let clntKYC = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', 'utf8'));
    console.log('/api/register-update:');
    console.log(JSON.stringify(req.body));
    for (let [index, c] of clntKYC.entries()) {
        if (req.body.encEmailID == c.encEmailID && req.body.hshPW == c.hshPW) {
            found = true;
            console.log({ found, indexKYC: index });
            // c = req.body;    cannot force req.body to replace c log-stock-barrel
            c.encLegalNameID = req.body.encLegalNameID;
            c.gender = req.body.gender;
            c.encDOB = req.body.encDOB;
            c.encMobileNumID = req.body.encMobileNumID;
            console.log({ cGender: c.gender, reqBodyEncDOB: req.body.encDOB, c })
            if (found) {
                fs.writeFile('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', JSON.stringify(clntKYC), 'utf8', (err) => {
                    if (err) {
                        console.log("::eror:: writing to new clntKYC masterIndexHeadTable jsonDB."); // console.log(err); console.log(data);
                        return res.status(500).json({
                            status: '..it appears we have veriClntUser service write fault, please try again later.'
                        });
                    }
                    let updateClntUser_astFK = aj.sha256(aj.rotjaG(aj.rotajG(c.encEmailID) + '==' + aj.sha256(c.hshPW)));
                    let agentUpdateClntUser = JSON.parse(fs.readFileSync(`./${updateClntUser_astFK}_agentFile.json`, 'utf8'));
                    if (req.body.encLegalNameID) {
                        let names = req.body.encLegalNameID.split(/[@ ,]+/);
                        for (let i = 1; i < names.length; i++) {
                            names[0] = names[0] + ' ' + aj.rotjaF(names[i]);
                        }
                        agentUpdateClntUser[0].agent.legalNameID = names[0];
                    }
                    agentUpdateClntUser[0].agent.mobileNumID = aj.rotjaF(req.body.encMobileNumID);

                    for (let [idx, us] of searchAllItems.entries()) {
                        if (us.clntAgentCode == agentUpdateClntUser[0].agent.clntAgentCode) {
                            us.legalNameID = agentUpdateClntUser[0].agent.legalNameID;
                            us.mobileNumID = agentUpdateClntUser[0].agent.mobileNumID;
                            fs.writeFile(`./propylist-master.json`, JSON.stringify(searchAllItems), 'utf8', (err) => {
                                if (err) {
                                    console.log("::eror:: writing to propertyList-master jsonDB file."); // console.log(err); console.log(data);
                                }
                                console.log("::good:: updated propertyList-master jsonDB file.");
                            });
                        }
                    }


                    fs.writeFile(`./${updateClntUser_astFK}_agentFile.json`, JSON.stringify(agentUpdateClntUser), 'utf8', (err) => {
                        if (err) {
                            console.log("::eror:: writing to new distributed agent-cms jsonDB file."); // console.log(err); console.log(data);
                            return res.status(500).json({
                                status: '..it appears we have a distributed-cms service write fault, please try again later.'
                            });
                        }
                        console.log("::good:: wrote to new distributed agent-cms jsonDB file.");
                    });

                    console.log("::good:: wrote to new clntKYC masterIndexHeadTable jsonDB.");
                    res.status(202).json({
                        status: '..your profile records have been updated.',
                        clntKYC: c
                    });
                });

            }
        }

    }
});

aj.app.post('/api/login', (req, res) => {

    // for me to admin 'allSearchItems' in either register/login after ajmindsoffire account has been registered.
    if (!doneOnce && req.body.encEmailID == 'HNjskJIrKKswx@LjHsP.nrj' && req.body.hshPW == '288fc534f64a341b89fe789f576adcf06637e8762d86b0dbc2abd390eb974fd3') {
        doneOnce = true; totalCurrentListCount = 0; searchAllItems = [];
        masterIndexHeadTableJSONdB = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', 'utf8'));
        for (let [index, agent] of masterIndexHeadTableJSONdB.entries()) {
            if (agent.encEmailID && agent.hshPW && agent.isDeleted == null && index != 0) {
                agentDistributedCMSJSONdB_FK = aj.sha256(aj.rotjaG(aj.rotajG(agent.encEmailID) + '==' + aj.sha256(agent.hshPW)));
                let agentDistributedCMSJSONdB = JSON.parse(fs.readFileSync(`./${agentDistributedCMSJSONdB_FK}_agentFile.json`, 'utf8'));
                for (let [indx, propAndAgent] of agentDistributedCMSJSONdB.entries()) {
                    if (propAndAgent.is_deleted != true && indx != 0 && propAndAgent.id != 0) {
                        let fillPropertyMasterList = {};
                        fillPropertyMasterList.id = propAndAgent.id;
                        fillPropertyMasterList.offerType = propAndAgent.offerType;
                        fillPropertyMasterList.proptyType = propAndAgent.proptyType;
                        fillPropertyMasterList.district = +propAndAgent.district;
                        fillPropertyMasterList.numBedRms = +propAndAgent.numBedRms;
                        fillPropertyMasterList.price = +propAndAgent.price;
                        fillPropertyMasterList.landSize = +propAndAgent.landSize;
                        fillPropertyMasterList.BUA = +propAndAgent.BUA;
                        fillPropertyMasterList.stName = propAndAgent.stName;
                        fillPropertyMasterList.listPhotoIcon = propAndAgent.listPhotoIcon;
                        fillPropertyMasterList.is_deleted = propAndAgent.is_deleted;
                        fillPropertyMasterList.legalNameID = agentDistributedCMSJSONdB[0].agent.legalNameID;
                        fillPropertyMasterList.mobileNumID = agentDistributedCMSJSONdB[0].agent.mobileNumID;
                        fillPropertyMasterList.clntAgentCode = agentDistributedCMSJSONdB[0].agent.clntAgentCode;
                        searchAllItems.push(fillPropertyMasterList);
                        totalCurrentListCount++;
                    }
                }
            }
        }

        searchAllItems.map(prop => batch.set(docRef.doc(prop.clntAgentCode + prop.id), prop));
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
            if (err) {
                console.log("::eror:: writing to propertyList-master jsonDB file."); // console.log(err); console.log(data);
            }
            console.log("::good:: updated propertyList-master jsonDB file.");
            console.log({ doneOnce });
        });
        return res.status(200).json({
            status: '..sync-ed all distributed files into master list.  Please login again.'
        });
    }



    // let clntKYC = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', 'utf8'));
    let nexToken, authSIMToken, found = false;
    console.log('/api/login:');
    console.log({ 'req.body.encEmailID': req.body.encEmailID, 'req.body.hshPW': req.body.hshPW });

    for (let [index, c] of clntKYC.entries()) {
        if (req.body.encEmailID == c.encEmailID) {
            found = true;
            console.log({ found, indexKYC: index });
            if (req.body.hshPW !== undefined) {
                if (req.body.hshPW == c.hshPW) {
                    try {
                        nexToken = aj.genIssueToken(req.body.encEmailID, req.body.hshPW, 'rw_');
                        authSIMToken = aj.genIssueToken(req.body.encEmailID, req.body.hshPW, 'rw_', 260000);
                    } catch (error) {
                        res.status(400).json({
                            status: '..oops something broke, please try again.'
                        });
                    }
                    res.status(200).json({
                        nexToken: nexToken,
                        authSIMToken: authSIMToken,
                        status: '..welcome, you are now logged in.',
                        clntKYC: c
                    });
                } else if (c.hshPW != null) {
                    res.status(200).json({
                        status: '..please log in with the right password.'
                    });
                } else if (c.hshPW == null) {
                    try {
                        nexToken = aj.genIssueToken(req.body.encEmailID, 'null', 'r__');
                        authSIMToken = aj.genIssueToken(req.body.encEmailID, 'null', 'r__', 260000);

                        req.astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.body.encEmailID) + '==' + aj.sha256('null')));
                        console.log(req.astFK); // same as subscribe A1.
                        let clntUserAsset = JSON.parse(fs.readFileSync(`./${req.astFK}.json`, 'utf8'));
                        res.ast = aj.rotajF(JSON.stringify(clntUserAsset));
                    } catch (error) {
                        res.status(400).json({
                            status: '..oops something broke, please try again.'
                        });
                    }
                    res.status(200).json({
                        nexToken: nexToken,
                        authSIMToken: authSIMToken,
                        status: '..you have already subscribed for free, logging you in.',
                        clntUserAsset: res.ast,
                        resAstDecrypted: aj.rotjaF(res.ast)
                    });
                }
            } else if (req.body.hshPW === undefined) {
                if (c.hshPW == null) {
                    try {
                        nexToken = aj.genIssueToken(req.body.encEmailID, 'null', 'r__');
                        authSIMToken = aj.genIssueToken(req.body.encEmailID, 'null', 'r__', 260000);

                        req.astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.body.encEmailID) + '==' + aj.sha256('null')));
                        console.log(req.astFK);
                        let clntUserAsset = JSON.parse(fs.readFileSync(`./${req.astFK}.json`, 'utf8'));
                        res.ast = aj.rotajF(JSON.stringify(clntUserAsset));
                    } catch (error) {
                        res.status(400).json({
                            status: '..oops something broke, please try again.'
                        });
                    }
                    res.status(200).json({
                        nexToken: nexToken,
                        authSIMToken: authSIMToken,
                        status: '..welcome, you are now logged into your free wealthmore-meter test account.',
                        clntUserAsset: res.ast,
                        resAstDecrypted: aj.rotjaF(res.ast)
                    });
                } else {
                    res.status(200).json({
                        status: '..our records show you are signed up, please log in with the right password.'
                    });
                }
            }
        } else { }
    }
    if (!found) {
        res.status(200).json({
            status: '..please register by signing up to our agency automated butler service'
        });
    }
});

aj.app.get('/api/verilink', (req, res) => {
    // let tempReg = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json', 'utf8'));
    let newClntUser = {};
    let tocFound = false;
    let chkNowForExpires = Date.now() / 1000;
    console.log('/api/verilink:');
    console.log({ iD: req.query.iD, vE: req.query.vE, eX: req.query.eX, rsT: req.query.rsT });
    for (let [index, toc] of tempReg.entries()) {
        if (req.query.iD == toc.encEmailID) {
            console.log({ toc });
            if (req.query.vE == toc.linkToken.vEmailLinkToken && req.query.eX == toc.linkToken.expires && !toc.emailVerified && toc.isDeleted != true) {
                console.log({
                    chkNowForExpires: chkNowForExpires,
                    linkTokenExpires: toc.linkToken.expires
                });
                if (chkNowForExpires < toc.linkToken.expires) {
                    // let clntKYC = JSON.parse(fs.readFileSync('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', 'utf8'));
                    let veriClntUser = {
                        "encEmailID": toc.encEmailID,
                        "hshPW": toc.hshPW,
                        "subDate": null,
                        "clntCreatDate": null,
                        "clntValKYCDate": null,
                        "encLegalNameID": null,
                        "encLegalIDCred": null,
                        "photo": {
                            "photoIDFrontURL": null,
                            "photoIDBackURL": null,
                            "photoIDsURLsDated": null,
                            "recentFaceVerifiedIDURL": null,
                            "recentFaceVerifiedIDURLDated": null
                        },
                        "gender": null,
                        "encDOB": null,
                        "nationality": null,
                        "address": {
                            "postCode": null,
                            "encPostStreet": null,
                            "postBlock": null,
                            "encPostUnit": null
                        },
                        "encMobileNumID": null,
                        "bank": {
                            "encBankName": null,
                            "bankScanStatemtURL": null,
                            "bankScanStatemtURLDated": null,
                            "encBankScanStatemtBal": null,
                            "encBankAcct": null
                        },
                        "textAnnotNotaryOthers": null,
                        "clntNotes": null,
                        "isDeleted": null,
                        "clntAgentCode": `${aj.rotjaF(toc.encEmailID)}@JScorp`
                    };
                    console.log({ 'req.query.rsT': req.query.rsT });
                    console.log(req.query.rsT != 'true');
                    if (req.query.rsT != 'true') {
                        toc.hshPW == null ? veriClntUser.subDate = new Date() : veriClntUser.clntCreatDate = new Date();
                        clntKYC.push(veriClntUser);
                    } else if (req.query.rsT == 'true') {
                        for (let [index, c] of clntKYC.entries()) {
                            let found = false;
                            if (req.query.iD == c.encEmailID) {
                                found = true;
                                console.log({ found, indexKYC: index });
                                c.hshPW = toc.hshPW
                            }
                        }
                    }

                    fs.writeFile('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json', JSON.stringify(clntKYC), 'utf8', (err) => {
                        if (err) {
                            console.log("::eror:: writing to new clntKYC masterIndexHeadTable jsonDB."); // console.log(err); console.log(data);
                            return res.status(500).json({
                                status: '..it appears we have veriClntUser service write fault, please try again later.'
                            });
                        }
                        console.log("::good:: wrote to new clntKYC masterIndexHeadTable jsonDB.");
                        toc.emailVerified = true;
                        toc.emailConfirmTries++;
                        fs.writeFile('./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json', JSON.stringify(tempReg), 'utf8', (err) => {
                            if (err) {
                                console.log("::eror:: writing to temp newClntUser register jsonDB."); // console.log(err); console.log(data);
                                return res.status(500).json({
                                    status: '..it appears we have veriClntUser service write fault, please try again later.'
                                });
                            }
                            console.log("::good:: wrote to temp newClntUser register jsonDB.");
                        });


                        if (req.query.rsT != 'true') {
                            let agentClntUser = [{
                                agent: {
                                    "encEmailID": toc.encEmailID,
                                    "hshPW": toc.hshPW,
                                    "clntCreatDate": veriClntUser.clntCreatDate,
                                    "clntAgentCode": `${aj.rotjaF(toc.encEmailID)}@JScorp`,
                                    "legalNameID": null,
                                    "mobileNumID": null
                                }
                            }, {
                                "id": 0,
                                "offerType": "",
                                "proptyType": "",
                                "district": "",
                                "numBedRms": "",
                                "price": "",
                                "landSize": "",
                                "BUA": "",
                                "stName": "",
                                "listPhotoIcon": "",
                                "ownerName": "ADD NEW",
                                "ownerMobile": "",
                                "ownerEmail": "",
                                "propyFullAddr": "",
                                "postCode": "",
                                "is_deleted": false
                            }];
                            veriClntUser.astFK = aj.sha256(aj.rotjaG(aj.rotajG(toc.encEmailID) + '==' + aj.sha256(toc.hshPW)));
                            fs.writeFile(`./${veriClntUser.astFK}_agentFile.json`, JSON.stringify(agentClntUser), 'utf8', (err) => {
                                if (err) {
                                    console.log("::eror:: writing to new distributed agent-cms jsonDB file."); // console.log(err); console.log(data);
                                    return res.status(500).json({
                                        status: '..it appears we have a distributed-cms service write fault, please try again later.'
                                    });
                                }
                                console.log("::good:: wrote to new distributed agent-cms jsonDB file.");
                            });

                        } else if (req.query.rsT == 'true') {       // copy contents of old file into new with reset of hshPW
                            console.log({ oldHshPW });
                            veriClntUser.astFK = aj.sha256(aj.rotjaG(aj.rotajG(toc.encEmailID) + '==' + aj.sha256(oldHshPW)));
                            let agentRstClntUser = JSON.parse(fs.readFileSync(`./${veriClntUser.astFK}_agentFile.json`, 'utf8'));
                            agentRstClntUser[0].agent.hshPW = toc.hshPW;               // change hshPW in the new agent file.
                            veriClntUser.astFK = aj.sha256(aj.rotjaG(aj.rotajG(toc.encEmailID) + '==' + aj.sha256(toc.hshPW)));
                            fs.writeFile(`./${veriClntUser.astFK}_agentFile.json`, JSON.stringify(agentRstClntUser), 'utf8', (err) => {
                                if (err) {
                                    console.log("::eror:: writing to new, replaced distributed agent-cms jsonDB file."); // console.log(err); console.log(data);
                                    return res.status(500).json({
                                        status: '..it appears we have a distributed-cms service write fault, please try again later.'
                                    });
                                }
                                console.log("::good:: wrote to new, replaced distributed agent-cms jsonDB file.");
                            });
                        }

                        tocFound = true;
                        res.status(200).json({
                            status: 'Hi, I\'m Jane:..thank you for signing up / resetting your password - you can now log in.'
                        });
                        // res.status(200).sendFile(__dirname + '/public' + '/images/ascii' + '.html');
                    });



                }
            } else if (req.query.eX < chkNowForExpires && !toc.emailVerified && toc.isDeleted != true) {
                let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // let chars = JSON.parse(fs.readFileSync('./specGCodes.json', 'utf8'));
                let token = '';
                for (let i = 23; i > 0; --i) {
                    token += chars[Math.round(Math.random() * (chars.length - 1))];
                }
                let myExpire = Date.now() / 1000 + 6 * 3600;

                toc.linkToken = {
                    vEmailLinkToken: token,
                    expires: myExpire
                };
                vURL = SERVERNPORT + `/api/verilink/?iD=${toc.encEmailID}&vE=${toc.linkToken.vEmailLinkToken}&eX=${toc.linkToken.expires}`;

                mailOptions.to = aj.rotjaF(toc.encEmailID);
                let registerType = req.body.hshPW ? 'signup' : 'free subscription';
                /* mailOptions.text = `Please confirm your account by clicking the following link: ${vURL}`; */
                mailOptions.html = `<h2>Please click on the following link to confirm your <strong>${registerType}</strong>:</h2><p>${vURL}</p>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="full" object="drag-module" bgcolor="#303030" c-style="not3BG">
                <tbody><tr mc:repeatable="">
                    <td align="center" style="background-image: url('ajafsnode.serveo.net/images/Rachela_Asciified.png'); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; background-position: center center; background-repeat: no-repeat; background-color: #303030;" c-style="not3BG" id="not3">
                        <div mc:hideable="">
    
                                
                        </div>
                    </td>
                </tr>
                </tbody></table>`;

                console.log({
                    mailOptionsTo: mailOptions.to,
                    vURL: vURL,
                    status: '..sent fresh email verification link since last try has already expired after 6 hours.' // status not sent to client browser, for server info only.
                }); // console.log({ mailOptions: mailOptions, vURL: vURL });
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        toc.emailConfirmSends++;
                        toc.emailConfirmTries++;
                        fs.writeFile("./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json", JSON.stringify(tempReg), 'utf8', (err) => {
                            if (err) {
                                console.log("::eror:: writing to temp newClntUser register jsonDB."); // console.log(err); console.log(data);
                                return res.status(500).json({
                                    status: '..it appears we have newClntUser service write fault, please try again later.'
                                });
                            }
                            console.log("::good:: wrote to temp newClntUser register jsonDB.");
                        });
                    }
                });
            } else if (req.query.eX > chkNowForExpires && !toc.emailVerified && toc.isDeleted != true) {
                toc.emailConfirmTries++;
                fs.writeFile("./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d_tempReg.json", JSON.stringify(tempReg), 'utf8', (err) => {
                    if (err) {
                        console.log("::eror:: writing to temp newClntUser register jsonDB."); // console.log(err); console.log(data);
                        return res.status(500).json({
                            status: '..it appears we have newClntUser service write fault, please try again later.'
                        });
                    }
                    console.log("::good:: wrote to temp newClntUser register jsonDB.");
                });
                return res.status(202).json({
                    status: '..please verify on the latest email sent out, or click on \'signup\' again to get a latest email verification request.'
                });

            } else if (toc.emailVerified && toc.isDeleted != true) {
                return res.status(201).json({
                    status: '..your email have already been verified.'
                });
            }

        }
    }
});

aj.app.get('/api/search-list', (req, res) => {
    let listCount = 0; let list = 'propylist-master'; let clntAssetList = [];
    console.log('/api/search-list:[GET]');
    console.log('req.query:', JSON.stringify(req.query));
    console.log('req.query.crud:', req.query.crud);
    console.log('req.query.searchPrice:', req.query.searchPrice);

    if (req.query.key1 != 'null' && req.query.key2 != 'null' && req.query.crud != 'getAll') {
        clntAssetList = []; listCount = 0;
        let clntKYC = JSON.parse(fs.readFileSync(`./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json`, 'utf8'));
        let listClntUser_astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.query.key1) + '==' + aj.sha256(req.query.key2)));
        let agentListClntUser = JSON.parse(fs.readFileSync(`./${listClntUser_astFK}_agentFile.json`, 'utf8'));
        let found = false; let list = false;
        for (let [index, c] of clntKYC.entries()) {
            if (req.query.key1 == c.encEmailID && req.query.key2 == c.hshPW) {
                found = true; let ownerList = []; let ownerDet = {};
                console.log({ found, indexKYC: index });

                // console.log({ listClntUser_astFK, agentListClntUser });
                for (let [idx, l] of agentListClntUser.entries()) {
                    ownerDet = {};
                    if (req.query.crud == l.ownerName && !l.is_deleted && req.query.searchPrice === undefined) {
                        list = listClntUser_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        clntAssetList.push(l);

                    }
                    if (req.query.searchType == l.offerType &&
                        req.query.typeOfProptySelected == l.proptyType &&
                        req.query.districtSelected == l.district &&
                        req.query.bedrmsSelected == l.numBedRms &&
                        req.query.searchPrice >= +l.price &&
                        !l.is_deleted && req.query.crud === undefined) {
                        list = listClntUser_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        agentListClntUser[idx].clntAgentCode = agentListClntUser[0].agent.clntAgentCode;
                        agentListClntUser[idx].legalNameID = agentListClntUser[0].agent.legalNameID;
                        agentListClntUser[idx].mobileNumID = agentListClntUser[0].agent.mobileNumID;
                        clntAssetList.push(agentListClntUser[idx]);
                    }
                    if (l.ownerName && !l.is_deleted && req.query.crud === undefined) {
                        ownerDet.ownerName = l.ownerName;
                        ownerDet.ownerMobile = l.ownerMobile;
                        ownerDet.ownerEmail = l.ownerEmail;
                        ownerDet.propyFullAddr = l.propyFullAddr;
                        ownerDet.postCode = l.postCode;
                        ownerList.push(ownerDet);
                    }

                }
                console.log(`${list}>> agentList found items:`, listCount);
                return res.status(200).json({
                    status: `..your agent search returned with ${listCount} items.`,
                    clntAssetList,
                    listCount,
                    ownerList
                });
            }
        }
    } else if (req.query.crud == 'getAll') {
        clntAssetList = []; listCount = 0;
        for (let [idx, l] of searchAllItems.entries()) {
            if (l.is_deleted != true) {
                listCount++;
                clntAssetList.push(l);
            }
        }
        console.log(`propylist-master>> userList found items:`, listCount);
        return res.status(200).json({
            status: `..your user browseAll returned with ${listCount} items.`,
            clntAssetList,
            listCount
        });
    } else if (req.query.key1 == 'null' && req.query.key2 == 'null') {
        clntAssetList = []; listCount = 0;
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
                clntAssetList.push(l);
            }
        }
        console.log(`${list}>> userList found items:`, listCount);
        return res.status(200).json({
            status: `..your user search returned with ${listCount} items.`,
            clntAssetList,
            listCount
        });
    }
});

aj.app.post('/api/search-list', (req, res) => {
    let listCount = 0; let list = 'propylist-master'; let clntAssetList = [];
    console.log('/api/search-list:');
    console.log('req.body:', JSON.stringify(req.body));
    if (req.body.encEmailID && req.body.hshPW) {
        clntAssetList = []; listCount = 0;
        let clntKYC = JSON.parse(fs.readFileSync(`./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json`, 'utf8'));
        let listClntUser_astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.body.encEmailID) + '==' + aj.sha256(req.body.hshPW)));
        let agentListClntUser = JSON.parse(fs.readFileSync(`./${listClntUser_astFK}_agentFile.json`, 'utf8'));
        let found = false; let list = false;
        for (let [index, c] of clntKYC.entries()) {
            if (req.body.encEmailID == c.encEmailID && req.body.hshPW == c.hshPW) {
                found = true; let ownerList = []; let ownerDet = {};
                console.log({ found, indexKYC: index });

                // console.log({ listClntUser_astFK, agentListClntUser });
                for (let [idx, l] of agentListClntUser.entries()) {
                    ownerDet = {};
                    if (req.body.clntUserSearch.searchType == l.offerType &&
                        req.body.clntUserSearch.typeOfProptySelected == l.proptyType &&
                        req.body.clntUserSearch.districtSelected == l.district &&
                        req.body.clntUserSearch.bedrmsSelected == l.numBedRms &&
                        req.body.clntUserSearch.searchPrice >= +l.price &&
                        !l.is_deleted) {
                        list = listClntUser_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        l.clntAgentCode = agentListClntUser[0].agent.clntAgentCode;
                        l.legalNameID = agentListClntUser[0].agent.legalNameID;
                        l.mobileNumID = agentListClntUser[0].agent.mobileNumID;
                        clntAssetList.push(l);
                    }
                    if (l.ownerName && !l.is_deleted) {
                        ownerDet.ownerName = l.ownerName;
                        ownerDet.ownerMobile = l.ownerMobile;
                        ownerDet.ownerEmail = l.ownerEmail;
                        ownerDet.propyFullAddr = l.propyFullAddr;
                        ownerDet.postCode = l.postCode;
                        ownerList.push(ownerDet);
                    }

                }
                console.log(`${list}>> agentList found items:`, listCount);
                return res.status(200).json({
                    status: `..your agent search returned with ${listCount} items.`,
                    clntAssetList,
                    listCount,
                    ownerList
                });
            }
        }
    } else {
        clntAssetList = []; listCount = 0;
        // let searchAllItems = JSON.parse(fs.readFileSync(`./${list}.json`, 'utf8'));
        for (let [idx, l] of searchAllItems.entries()) {
            if (req.body.clntUserSearch.searchType == l.offerType &&
                req.body.clntUserSearch.typeOfProptySelected == l.proptyType &&
                req.body.clntUserSearch.districtSelected == l.district &&
                req.body.clntUserSearch.bedrmsSelected == l.numBedRms &&
                req.body.clntUserSearch.searchPrice >= +l.price &&
                !l.is_deleted) {
                listCount++;
                console.log({ list, idxList: idx, listCount });
                clntAssetList.push(l);
            }
        }
        console.log(`${list}>> userList found items:`, listCount);
        return res.status(200).json({
            status: `..your user search returned with ${listCount} items.`,
            clntAssetList,
            listCount
        });
    }

});

aj.app.get('/api/wealthmore-meter', authToken, (req, res) => {

    try {
        let clntUserAsset = JSON.parse(fs.readFileSync(`./${req.astFK}.json`, 'utf8'));
        res.ast = aj.rotajF(JSON.stringify(clntUserAsset));
        console.log(JSON.stringify(clntUserAsset));
        console.log({
            nexToken: res.nexToken,
            clntUserAsset: res.ast
        });
        res.status(200).json({
            nexToken: res.nexToken,
            clntUserAsset: res.ast
        });

    } catch (error) {
        res.status(400).json({
            status: '..please try again later..our servers may be overwhelmed.'
        });
    }
});

aj.app.post('/images', upload.single("proptyPic"), (req, res) => {
    console.log('/images:[POST]');
    console.log('req.body:', JSON.stringify(req.body));
    console.log('req.file:', req.file);
    if (req.body.encEmailID && req.body.hshPW) {
        clntAssetList = []; listCount = 0;
        let clntKYC = JSON.parse(fs.readFileSync(`./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json`, 'utf8'));
        let updateClntUser_astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.body.encEmailID) + '==' + aj.sha256(req.body.hshPW)));
        let agentUpdateClntUser = JSON.parse(fs.readFileSync(`./${updateClntUser_astFK}_agentFile.json`, 'utf8'));
        let found = false; let list = false;
        for (let [index, c] of clntKYC.entries()) {
            if (req.body.encEmailID == c.encEmailID && req.body.hshPW == c.hshPW) {
                found = true; let ownerList = []; let ownerDet = {};
                console.log({ found, indexKYC: index });

                // console.log({ listClntUser_astFK, agentListClntUser });
                for (let [idx, l] of agentUpdateClntUser.entries()) {
                    ownerDet = {};
                    if (req.body.crud == l.ownerName) {

                        if (req.body.propID == l.id && l.id != 0) {
                            l.listPhotoIcon = req.file.filename;
                            for (let [idx1, all] of searchAllItems.entries()) {
                                if (l.id == all.id && agentUpdateClntUser[0].agent.clntAgentCode == searchAllItems[idx1].clntAgentCode) {
                                    all.listPhotoIcon = l.listPhotoIcon;
                                    docRef.doc(searchAllItems[idx1].clntAgentCode + searchAllItems[idx1].id).set(searchAllItems[idx1]);
                                    fs.writeFile(`./propylist-master.json`, JSON.stringify(searchAllItems), 'utf8', (err) => {
                                        if (err) {
                                            console.log("::eror:: writing to propertyList-master jsonDB file."); // console.log(err); console.log(data);
                                        }
                                        console.log("::good:: updated propertyList-master jsonDB file.");
                                    });
                                }
                            }
                        }

                        list = updateClntUser_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        clntAssetList.push(l);
                    }
                }
                fs.writeFile(`./${updateClntUser_astFK}_agentFile.json`, JSON.stringify(agentUpdateClntUser), 'utf8', (err) => {
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
                    clntAssetList,
                    listCount
                });
            }
        }
    }
    res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
});

aj.app.post('/api/add-save', (req, res) => {
    console.log('/api/add-save:[POST]');
    console.log('req.body:', JSON.stringify(req.body));
    var updatePropyMasterList = {};
    if (req.body.encEmailID && req.body.hshPW) {
        clntAssetList = []; listCount = 0; ownerListLength = 0;
        let clntKYC = JSON.parse(fs.readFileSync(`./b776e3e931728e48078d3e4d92ae74b5697db7af809c7c70f8524404ea99b59d.json`, 'utf8'));
        let updateClntUser_astFK = aj.sha256(aj.rotjaG(aj.rotajG(req.body.encEmailID) + '==' + aj.sha256(req.body.hshPW)));
        let agentUpdateClntUser = JSON.parse(fs.readFileSync(`./${updateClntUser_astFK}_agentFile.json`, 'utf8'));
        let found = false; let list = false;
        for (let [index, c] of clntKYC.entries()) {
            if (req.body.encEmailID == c.encEmailID && req.body.hshPW == c.hshPW) {
                found = true; let ownerList = []; let ownerDet = {};
                console.log({ found, indexKYC: index });

                // console.log({ listClntUser_astFK, agentListClntUser });
                for (let [idx, l] of agentUpdateClntUser.entries()) {
                    ownerListLength++;
                    if (req.body.ownerName == l.ownerName && l.id != 0) {

                        for (let [idex, ul] of req.body.myclntUpdateList.entries()) {
                            if (ul.id == l.id) {
                                ul.ownerName = req.body.myclntUpdateList[0].ownerName.toUpperCase();
                                ul.ownerMobile = req.body.myclntUpdateList[0].ownerMobile;
                                ul.ownerEmail = req.body.myclntUpdateList[0].ownerEmail;
                                agentUpdateClntUser[idx] = ul;
                                console.log({ agentUpdateClntUser, ul });
                            }
                        }
                        for (let [idx1, all] of searchAllItems.entries()) { // l and all are internal counters.
                            if (l.id == all.id && agentUpdateClntUser[0].agent.clntAgentCode == searchAllItems[idx1].clntAgentCode) {
                                searchAllItems[idx1].id = agentUpdateClntUser[idx].id;
                                searchAllItems[idx1].offerType = agentUpdateClntUser[idx].offerType;
                                searchAllItems[idx1].proptyType = agentUpdateClntUser[idx].proptyType;
                                searchAllItems[idx1].district = +agentUpdateClntUser[idx].district;
                                searchAllItems[idx1].numBedRms = +agentUpdateClntUser[idx].numBedRms;
                                searchAllItems[idx1].price = +agentUpdateClntUser[idx].price;
                                searchAllItems[idx1].landSize = +agentUpdateClntUser[idx].landSize;
                                searchAllItems[idx1].BUA = +agentUpdateClntUser[idx].BUA;
                                searchAllItems[idx1].stName = agentUpdateClntUser[idx].stName;
                                searchAllItems[idx1].listPhotoIcon = agentUpdateClntUser[idx].listPhotoIcon;
                                searchAllItems[idx1].is_deleted = agentUpdateClntUser[idx].is_deleted;
                                searchAllItems[idx1].legalNameID = agentUpdateClntUser[0].agent.legalNameID;
                                searchAllItems[idx1].mobileNumID = agentUpdateClntUser[0].agent.mobileNumID;
                                searchAllItems[idx1].clntAgentCode = agentUpdateClntUser[0].agent.clntAgentCode;

                                docRef.doc(searchAllItems[idx1].clntAgentCode + searchAllItems[idx1].id).set(searchAllItems[idx1]);
                            }
                        }
                        list = updateClntUser_astFK; listCount++;
                        console.log({ list, idxList: idx, listCount });
                        // clntAssetList.push(l);
                    }
                }

                if (req.body.ownerName == 'ADD NEW') {
                    req.body.myclntUpdateList[0].ownerName = req.body.myclntUpdateList[0].ownerName.toUpperCase();
                    req.body.myclntUpdateList[0].id = ownerListLength - 1;
                    agentUpdateClntUser.push(req.body.myclntUpdateList[0]);

                    updatePropyMasterList.id = req.body.myclntUpdateList[0].id;
                    updatePropyMasterList.offerType = req.body.myclntUpdateList[0].offerType;
                    updatePropyMasterList.proptyType = req.body.myclntUpdateList[0].proptyType;
                    updatePropyMasterList.district = +req.body.myclntUpdateList[0].district;
                    updatePropyMasterList.numBedRms = +req.body.myclntUpdateList[0].numBedRms;
                    updatePropyMasterList.price = +req.body.myclntUpdateList[0].price;
                    updatePropyMasterList.landSize = +req.body.myclntUpdateList[0].landSize;
                    updatePropyMasterList.BUA = +req.body.myclntUpdateList[0].BUA;
                    updatePropyMasterList.stName = req.body.myclntUpdateList[0].stName;
                    updatePropyMasterList.listPhotoIcon = req.body.myclntUpdateList[0].listPhotoIcon;
                    updatePropyMasterList.is_deleted = req.body.myclntUpdateList[0].is_deleted;
                    updatePropyMasterList.legalNameID = agentUpdateClntUser[0].agent.legalNameID;
                    updatePropyMasterList.mobileNumID = agentUpdateClntUser[0].agent.mobileNumID;
                    updatePropyMasterList.clntAgentCode = agentUpdateClntUser[0].agent.clntAgentCode;
                    searchAllItems.push(updatePropyMasterList);
                    docRef.doc(updatePropyMasterList.clntAgentCode + updatePropyMasterList.id).set(updatePropyMasterList);
                }

                fs.writeFile(`./${updateClntUser_astFK}_agentFile.json`, JSON.stringify(agentUpdateClntUser), 'utf8', (err) => {
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
                    status: `..your new owner&property or properties-update-saveAll was uploaded and updated successfully!`
                    // myclntUpdateList: req.body.myclntUpdateList
                });
            }
        }
    }
});

// console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', '3cc98b78aabdbb22273c4679870ad2e05c8672707675734f0ea2fbef6618d651', 'rw_'));
console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', null, 'rw_'));
console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', null, 'rw_', 260000));
// console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', '', 'rw_'));
console.log(aj.sha256(aj.rotjaG(aj.rotajG('jskJIrKKswx2@LjHsP.nrj') + '==' + aj.sha256('null'))));
console.log(aj.sha256(aj.rotjaG(aj.rotajG('HkJwxyvHk@Hqqvwxjx.IL') + '==' + aj.sha256('null'))));


aj.app.use(aj.express.static(__dirname + '/dist'));

aj.app.use(aj.express.static(__dirname + '/public'));
// index must come after /public for images to be seen from /public/images
aj.app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
/* aj.app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
}); */

aj.app.use((req, res, next) => {
    res.redirect('/error.html');
});