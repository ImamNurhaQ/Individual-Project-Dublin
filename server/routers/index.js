const router = require('express').Router();
const Controller = require('../Controllers/index')
const errorHandlerMiddleware = require('../middlewares/errorHandler-Middleware')
const authentication = require('../middlewares/authenticationMiddleware');

router.post('/register', Controller.register);
router.post('/login', Controller.signIn);
router.post('/google-Sign-In', Controller.googleSignIn);
router.get('/liga', Controller.show);
router.get('/liga/:id', Controller.getBypk);

router.use(authentication); 

router.post("/liga/:id/addBookmark", Controller.addBookmark);
router.get("/bookmark", Controller.myBookmark);

router.use(errorHandlerMiddleware);


module.exports = router