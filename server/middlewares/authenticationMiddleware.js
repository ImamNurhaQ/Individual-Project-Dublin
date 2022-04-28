const { User } = require('../models');
const { verify } = require('../helpers/jwt');

async function authenticationMiddleware(req, res, next) {
  try {
    if (!req.headers.access_token) throw { name: 'MissingAccsesToken' };
    const payload = verify(req.headers.access_token);
    const { email } = payload;
    const user = await User.findOne({
      where: { email }
    });
    if (!user) throw { name: 'Unauthorized' };
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    console.log(req.user);
    next();
  }
  catch (error) {
    next(error)
  }
}



module.exports = authenticationMiddleware;