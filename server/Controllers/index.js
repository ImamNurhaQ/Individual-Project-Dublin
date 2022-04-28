const { User, Category, Liga, MyBookmark } = require('../models');
const { sigIn } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { comparePassword } = require('../helpers/encryptPass');

class mainController {

  static async register(req, res, next) {
    try {
      const newUser = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        role: 'customer'
      })
      res.status(201).json({
        id: newUser.id, email: newUser.email
      })
    }
    catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const { email, password } = req.body
    try {
      let user = await User.findOne({
        attributes: { email, password },
        where: { email }
      })
      if (!user) throw ({ name: 'Unauthorized' })
      else if (!comparePassword(password, user.password)) throw ({ name: 'InvalidPassword' })
      const access_token = sigIn({ id: user.id, email })
      res.status(200).json({ access_token })
    }
    catch (error) {
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      });
      const { email } = ticket.getPayload();

      const user = await User.findOrCreate({
        where: { email },
        defaults: {
          userName: 'user',
          password: "shduweugdubffbkshdkhhshdhw",
          role: 'customer',
          address: 'Sumbawa'
        }
      });
      let status;
      if (user[1]) status = 201
      else status = 200
      res.status(status).json({ access_token: sigIn({ id: user[0].id, email: user[0].email }) });
    }
    catch (error) {
      next(error);
    }
  }

  static async show(req, res, next) {
    let { page, size, name, category } = req.query;
    // console.log(req.query)

    const paginate = (page, size) => {
      const limit = size ? + size : 8;
      // const offset = page ? page * limit : 0;
      const offset = page - 1
      return {
        limit,
        offset,
      };
    };

    const { limit, offset } = paginate(page, size);

    let option = {
      order: [["id", "asc"]],
      where: {},
      limit, offset,
    };
    
    if (name) {
      option.where.name = { [Op.iLike]: `%${name}%` };
    }

    if (category) {
      option.include = [ { model: Category, where: { name: category }} ]
    } else {
      option.include = [{model: Category}]
    }

    try {
      const response = await Liga.findAndCountAll(option);
      res.status(200).json({
        Ligas: response.rows,
        page: page,
        totalPage: Math.floor(response.count / 4),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static getBypk(req, res, next) {
    Liga.findByPk(+req.params.id)

      .then((data) => {
        if (!data) throw { name: "NotFound" }
        else res.status(200).json({
          Liga: data
        });
      })
      .catch((error) => {
        next(error);
      });
  }


  // Bookmark 
  static addBookmark(req, res, next) {

    Liga.findByPk(+req.params.id)
      .then((data) => {
        if (req.user.role !== 'customer') throw { name: "Unauthorized" }
        if (!data) throw { name: "NotFound" }

        return MyBookmark.findOne({
          where: {
            ligaId: req.params.id,
            userId: req.user.id
          },
        })
      })
      .then((data) => {
        if(data) throw { name: 'telahTerbooking' }
        return MyBookmark.create({
          ligaId: req.params.id,
          userId: req.user.id
        })
      })
      .then((data) => {
        res.status(201).json({
            data,
            role: req.user.role
        })
      })
      .catch((error) => {
        next(error)
      })
  }

  static myBookmark(req, res, next) {
    MyBookmark.findAll({
      include: [Liga, User],
      where: { userId: req.user.id }
    })
      .then((data) => {
        if (req.user.role === 'customer') {
          res.status(200).json(data)
        } else {
          res.status(401).json({ message: "Unauthorized" })
        }
      })
      .catch((error) => {
        next(error)
      })
  }

}


module.exports = mainController;