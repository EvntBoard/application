import * as path from 'path';
import * as fs from 'fs';

import { workspaceGetCurrent } from '../../WorkspaceService';

const normalizePath = (file: string) => {
  const currentWorkspace = workspaceGetCurrent();

  if (file.startsWith('workspace://')) {
    return path.resolve(currentWorkspace.path, file.replace('workspace://', ''));
  } else {
    return path.resolve(currentWorkspace.path, 'tmp', file);
  }
};

export const read = (file: string) => {
  try {
    const filePath = normalizePath(file);
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
};

export const write = (file: string, data: any) => {
  try {
    const filePath = normalizePath(file);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(filePath, data, { mode: 0o755 });
    return true;
  } catch (err) {
    return false;
  }
};

export const append = (file: string, data: any) => {
  try {
    const filePath = normalizePath(file);

    if (!fs.existsSync(filePath)) {
      return write(filePath, data);
    } else {
      fs.appendFileSync(filePath, data);
    }
    return true;
  } catch (e) {
    return false;
  }
};
