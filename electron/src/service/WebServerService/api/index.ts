import * as express from 'express';

import boardRouter from './board';
import buttonRouter from './button';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('EvntBoard API :D');
});

router.use('/board', boardRouter);
router.use('/button', buttonRouter);

export default router;
