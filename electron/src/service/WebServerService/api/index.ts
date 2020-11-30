import * as express from 'express';

import boardRouter from './board';
import buttonRouter from './button';
import themeRouter from './theme';
import langRouter from './lang';
import workspaceRouter from './workspace';
import cacheRouter from './cache';
import sessionRouter from './session';
import eventhistoryRouter from './eventhistory';
import processhistoryRouter from './processhistory';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('EvntBoard API :D');
});

router.use('/board', boardRouter);
router.use('/button', buttonRouter);
router.use('/theme', themeRouter);
router.use('/lang', langRouter);
router.use('/workspace', workspaceRouter);
router.use('/cache', cacheRouter);
router.use('/session', sessionRouter);
router.use('/eventhistory', eventhistoryRouter);
router.use('/processhistory', processhistoryRouter);

export default router;
