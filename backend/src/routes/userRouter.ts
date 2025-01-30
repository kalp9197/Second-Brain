import express from 'express';
import { logout, signin, signup } from '../controlllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { addContent, deleteContent, getContent } from '../controlllers/contentController.js';
const router = express.Router();
router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/logout').post(logout)
router.route('/content').post(isAuthenticated,addContent)
router.route('/content').get(isAuthenticated,getContent)
router.route('/content').delete(isAuthenticated,deleteContent)
export default router;
