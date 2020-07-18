let jwt = require('jsonwebtoken');

let validateToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        let secret = process.env.SECRET;
        jwt.verify(token, secret, (error, decode) => {
            if (error) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decode;
                next();
            }
        })
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

export default validateToken;