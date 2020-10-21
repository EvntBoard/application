import triggerBuilder from './TriggerRunnerBuilder';
import { triggerFindAll } from '../TriggerService';
import { ITriggerRunner } from './types';
import { ITrigger } from '../../database/types';

import logger from '../LoggerService';

let triggersRunning: Map<string, ITriggerRunner>;

export const init = () => {
  logger.debug('Trigger manager init');
  const data: Array<ITrigger> = triggerFindAll();
  triggersRunning = new Map<string, ITriggerRunner>();
  data.map((trigger) => {
    load(trigger);
  });
};

export const load = (trigger: ITrigger) => {
  try {
    const runner = triggerBuilder(trigger);
    triggersRunning.set(trigger.id, runner);
    logger.info(`Load trigger [${trigger.id}]`);
  } catch (e) {
    logger.error(`No module found for ${trigger.id}`);
    logger.error(e);
  }
};

export const unload = (trigger: Partial<ITrigger>) => {
  logger.debug(`Unload trigger [${trigger.id}]`);
  const runner = triggersRunning.get(trigger.id);
  if (runner) {
    runner.unload();
    triggersRunning.delete(trigger.id);
  } else {
    logger.debug(`Unable to unload trigger [${trigger.id}]`);
  }
};

export const reload = (trigger: ITrigger) => {
  unload(trigger);
  load(trigger);
};

export const unloadAll = () => {
  triggersRunning.forEach((i) => {
    unload({ id: i.id });
  });
  triggersRunning = new Map();
};
