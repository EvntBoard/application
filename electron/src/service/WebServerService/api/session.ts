import * as express from 'express';

import { getSession } from '../../SessionService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(getSession(<string>req.query.id));
});

export default router;
