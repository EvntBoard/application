import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { workspaceGetCurrent } from '../../WorkspaceService';

const router = express.Router();

router.get('*', (req, res) => {
  const currentWorkspace = workspaceGetCurrent();
  fs.createReadStream(path.join(currentWorkspace.path, req.path)).pipe(res);
});

export default router;
