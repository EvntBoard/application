import * as path from 'path';
import * as fs from 'fs';

import { workspaceGetCurrent } from '../service/WorkspaceService';

export const moveFileToWorkspace = (file: string, type: string) => {
  const workspace = workspaceGetCurrent();

  if (file && !file.startsWith('workspace') && !file.startsWith('http')) {
    if (file.includes(workspace.path)) {
      return `workspace://${file.replace(workspace.path, '')}`;
    } else {
      const fileName = path.basename(file);
      const dir = path.join(workspace.path, type);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      const newFilePath = path.join(dir, fileName);
      fs.copyFileSync(file, newFilePath);
      return `workspace://${type}/${fileName}`;
    }
  }
  return file;
};
