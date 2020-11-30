import * as express from 'express';

import { historyProcessGet } from '../../EventHistoryService';

const router = express.Router();

router.get('/', (req, res) => {
  const data =  historyProcessGet()
  res.send(data);
});

export default router;
