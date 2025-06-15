import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verify_token';

const router = express.Router();

// PRIVATE ROUTE
router.use(verifyToken);
router.get('/', controllers.getCurrentUser);

module.exports = router;
