import * as express from 'express';

import { historyGet } from '../../EventHistoryService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(historyGet());
});
export default router;
