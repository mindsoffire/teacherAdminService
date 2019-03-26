// load libraries needed.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

// instance of filesys.
/* const fs = require('fs'); */

const sha256 = require('js-sha256').sha256;
const dotenv = require('dotenv').config();
console.log(dotenv);
console.log(process.env.AJ_HASH_SALT); // To learn how to write to process.env.AJ_HASH_SALT.
const SERVER_SALT = `propertyAgents&Users+NONCE:OrangeTee_version_0.99_byAndrewJTan with team at apptreme.sg`;
const SERVER_SALT1 = (process.env.AJ_HASH_SALT !== undefined) ? SERVER_SALT + process.env.AJ_HASH_SALT : SERVER_SALT;
console.log(sha256(SERVER_SALT));
console.log(sha256(SERVER_SALT1));

const jwt = require('jwt-simple');
/* const jwt = require('jsonwebtoken'); */

const AJ_EXPRESS_ALLMIDWARE_ENC_SALT = module.exports = {

    appStartNUseAllMware(myPort) {
        app.use(cors());
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        app.use(bodyParser.json({ limit: '50mb' }));
        // various starts: npm run main.js 6000 ; nodemon main.js 5000 ; node main.js 4000
        app.set('port', process.argv[2] || process.env.PORT || myPort || 6805);
        var server = app.listen(app.get('port'), () => {
            console.log('Express server listening at http://(' + server.address().family + ')127.0.0.1:' + server.address().address + server.address().port);
        });

        /*        app.use(express.static(__dirname + '/public')); */

    },

    express, app, sha256, dotenv, jwt,
    SERVER_SALT, multer,

    rotajF : str => str.replace(/[A-Za-z0-9]/g, (ch) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".charAt(
        "MNBVCXZasdfghjklPOIUYTREWQASDFGHJKLmnbvcxzpoiuytrewq6172839405".indexOf(ch))),

    rotjaF : str => str.replace(/[A-Za-z0-9]/g, (ch) => "MNBVCXZasdfghjklPOIUYTREWQASDFGHJKLmnbvcxzpoiuytrewq6172839405".charAt(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".indexOf(ch))),

    rotajG : str => str.replace(/[A-Za-z0-9]/g, (ch) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".charAt(
        "HJKLmnbvcxzpoiuytrewq6172839405MNBVCXZasdfghjklPOIUYTREWQASDFG".indexOf(ch))),

    rotjaG : str => str.replace(/[A-Za-z0-9]/g, (ch) => "HJKLmnbvcxzpoiuytrewq6172839405MNBVCXZasdfghjklPOIUYTREWQASDFG".charAt(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".indexOf(ch))),

    sanitizeStr : str => str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '').trim(),

    sanitizeString(str) {
        str = str.replace(/[^a-z0-9áéíóúñü .-]/gim, "");  /* str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,""); */
        return str.trim();
    },

    genIssueToken(encID, hshPW, perms, defMin = 15, hshPIN = 'AJ6707') {
        let iat = Date.now() / 1000;
        let jwtPayload = {
            sub: encID + '##' + hshPW,
            iat: iat,
            exp: iat + 60 * defMin + 60 * Math.floor(Math.random() * 15),
            acl: perms,
            rnd: this.sha256(Math.floor(Math.random() * 6000000).toString())
        }
        console.log('new jwtPayload: ', jwtPayload);

        let secret = '';
        secret = encID ? this.rotajG(encID) : secret;
        secret = hshPW ? secret + '==' + this.sha256(hshPW) : secret + '==' + this.sha256('null');
        console.log('secret: ', secret);


        try {
            var token = jwt.encode(jwtPayload, secret);
            if (hshPIN != 'AJ6707') {
                let jwtPayload = {
                    sub: token,
                    pra: hshPIN
                }
                secret = hshPIN != 'AJ6707' ? secret + '==' + this.sha256(hshPIN) : secret + '==' + this.sha256('AJ6707');
                console.log('secretsecret: ', secret);
                token = jwt.encode(jwtPayload, secret);
            }
            console.log('newly issued token: ', token);
            return token;
        } catch (error) {
            console.error('return this error with: res.status(401).json(\'tokenization failed, pls login again\')');
        }
    }

}
