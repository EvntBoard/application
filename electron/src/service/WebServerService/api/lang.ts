import * as express from 'express';

import { langGet } from '../../LangService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(langGet());
});

export default router;
