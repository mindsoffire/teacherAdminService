const aj = require('../_core/ajExpMWareNgNativeFStorMaster');
const jwt = require('jwt-simple');

/* exports = module.exports = {} */

function authToken(req, res, next) {

    const tokenHdr = req.headers['authorization'];
    /* console.log(req.headers); */
    if (tokenHdr !== undefined) {
        let token = tokenHdr.split(' ');
        console.log(token);

        if (token[1]) {

            try {
                let decoded = jwt.decode(token[1], 'NoVerify', true);
                console.log('decoding...', decoded);
                let subParts = decoded.sub.split(/\#\#/);
                console.log(subParts);
                let testSecret = aj.rotajG(subParts[0]) + '==' + aj.sha256(subParts[1]);
                console.log(testSecret);

                try {
                    let verified = jwt.decode(token[1], testSecret);
                    console.log({ verified: verified, testSecret: testSecret });

                    res.nexToken = aj.genIssueToken(subParts[0], subParts[1], verified.acl);

                    req.encID = subParts[0];
                    req.hshPW = subParts[1];
                    req.acl = verified.acl;
                    req.astFK = aj.sha256(aj.rotjaG(testSecret));
                    console.log('req.astFK: ', req.astFK);

                    
                   
                } catch (error) {
                    res.status(401).json('..please log in again, authentication failed to verify.');
                    res.verified = false;
                    return;
                }

            } catch (error) {
                res.status(401).json('..please log in again, authentication decode failed.');
                return;
            }

        }
        else {
            res.status(401).json('..please log in again, no valid token.');
            return;
        }
    } else {
        res.status(401).json('..please log in, you are not authenticated.');
        return;
    } 
    next();
}

module.exports = authToken;

/* function genIssueToken(encID, hshPW, perms) {
    let iat = Date.now();
    let jwtPayload = {
        sub: encID + '##' + hshPW,
        iat: iat,
        exp: iat + 60 * 15 + 60 * Math.floor(Math.random() * 15),
        acl: perms
    }
    console.log('new jwtPayload: ', jwtPayload);

    let secret = '';
    encID ? secret = aj.rotajG(encID) : secret;
    hshPW ? secret = secret + '==' + aj.sha256(hshPW) : secret;
    console.log('secret: ', secret);

    try {
        var token = jwt.encode(jwtPayload, secret);
        console.log('newly issued token: ', token);
        return token;
    } catch (error) {
        console.error('return this error with: res.status(401).json(\'tokenization failed, pls login again\')');
    }
} s

console.log(genIssueToken('jskJIrKKswx@LjHsP.nrj', '3cc98b78aabdbb22273c4679870ad2e05c8672707675734f0ea2fbef6618d651', 'rw_'));
console.log(genIssueToken('jskJIrKKswx@LjHsP.nrj', null, 'rw_'));
console.log(genIssueToken('jskJIrKKswx@LjHsP.nrj', '', 'rw_')); */


/* console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', '3cc98b78aabdbb22273c4679870ad2e05c8672707675734f0ea2fbef6618d651', 'rw_'));
console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', null, 'rw_'));
console.log(aj.genIssueToken('jskJIrKKswx@LjHsP.nrj', '', 'rw_')); */

