import express from 'express'
import { getSharedContent, shareContent } from '../controlllers/shareController.js'
const router = express.Router()

router.route('/').post(shareContent)
router.route('/:').get(getSharedContent)

export default router
