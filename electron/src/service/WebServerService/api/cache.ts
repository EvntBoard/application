import * as express from 'express';

import { getCache } from '../../CacheService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(getCache());
});

export default router;
