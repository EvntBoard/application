import * as fs from 'fs';
import * as pathNode from 'path';
import { has, isFunction, isObject } from 'lodash';

import { workspaceGetCurrent } from '../WorkspaceService';
import { ITrigger } from '../../types';
import { ITriggerFile } from '../../otherTypes';

export const evalCodeFromFile = (triggerEntity: ITrigger): ITriggerFile => {
  const workspace = workspaceGetCurrent();
  const filename = pathNode.join(workspace.path, 'trigger', `${triggerEntity.id}.js`);
  const code: string = fs.readFileSync(filename).toString('utf8');
  const trigger: ITriggerFile = eval(code);

  if (
    !has(trigger, 'conditions') ||
    !has(trigger, 'reaction') ||
    !isFunction(trigger.reaction) ||
    !isObject(trigger.conditions)
  ) {
    throw new Error('File has not right exported ...');
  }

  return <ITriggerFile>trigger;
};
