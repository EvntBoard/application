import * as express from 'express';

import { themeGet } from '../../ThemeService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(themeGet());
});

export default router;
