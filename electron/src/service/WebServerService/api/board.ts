import * as express from 'express';

import { boardFindAll, boardFindOne } from '../../BoardService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(boardFindAll());
});

router.get('/:id', (req, res) => {
  res.send(boardFindOne(req.params.id));
});

export default router;
