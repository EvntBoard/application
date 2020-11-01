import * as express from 'express';

import { buttonFindAll, buttonFindOne, buttonFindAllByBoardId } from '../../ButtonService'

const router = express.Router();

router.get('/', (req, res) => {
  res.send(buttonFindAll());
});

router.get('/:id', (req, res) => {
  res.send(buttonFindOne(req.params.id));
});

router.get('/board/:id', (req, res) => {
  res.send(buttonFindAllByBoardId(req.params.id));
});

export default router
