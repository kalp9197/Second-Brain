import express from 'express';
import { signin, signup } from '../controlllers/userController.js';
const router = express.Router();
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/content').get()
router.route('/content').delete()
router.route('/content').post()

export default router;