import * as path from 'path';
import * as fs from 'fs';

import { workspaceGetCurrent } from '../service/WorkspaceService';
import logger from '../service/LoggerService';
import { getMimeType } from '../utils/mimeType';

export const config = {
  scheme: 'workspace',
  privileges: {
    secure: true,
    standard: true,
  },
};

export const requestHandler = (
  request: { url: string },
  callback: (arg0: { data: fs.ReadStream }) => void
) => {
  let url = request.url.substr(12);
  if (url[url.length - 1] === '/') {
    url = url.slice(0, -1);
  }

  const mimeType = getMimeType(url);

  if (!mimeType) {
    return logger.error(`Unsupported mimetype for '${url}'.`);
  }

  const workspaceDir = workspaceGetCurrent();

  const newFilePath = path.join(workspaceDir.path, url);
  const normalize = decodeURI(path.normalize(newFilePath));

  callback({
    data: fs.createReadStream(normalize),
  });
};
