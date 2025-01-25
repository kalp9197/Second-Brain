import express from 'express'
import { getSharedContent, shareContent } from '../controlllers/shareController.js'
const router = express.Router()

router.route('/Shared').post(shareContent)
router.route('/:SharedLink').get(getSharedContent)

export default router
