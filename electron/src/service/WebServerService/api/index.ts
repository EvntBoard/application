import * as express from 'express';

import boardRouter from './board';
import buttonRouter from './button';
import themeRouter from './theme';
import langRouter from './lang';
import workspaceRouter from './workspace';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('EvntBoard API :D');
});

router.use('/board', boardRouter);
router.use('/button', buttonRouter);
router.use('/theme', themeRouter);
router.use('/lang', langRouter);
router.use('/workspace', workspaceRouter);

export default router;
