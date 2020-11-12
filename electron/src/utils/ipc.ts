export enum BOARD {
  CREATE = `BOARD_CREATE`,
  FIND_ALL = `BOARD_FIND_ALL`,
  FIND_ONE = `BOARD_FIND_ONE`,
  UPDATE = `BOARD_UPDATE`,
  SET_DEFAULT = `BOARD_SET_DEFAULT`,
  DELETE = `BOARD_DELETE`,
}

export enum BUTTON {
  CREATE = `BUTTON_CREATE`,
  FIND_ALL = `BUTTON_FIND_ALL`,
  FIND_ALL_BOARD_ID = `BUTTON_FIND_ALL_BOARD_ID`,
  FIND_ONE = `BUTTON_FIND_ONE`,
  UPDATE = `BUTTON_UPDATE`,
  DELETE = `BUTTON_DELETE`,
}

export enum TRIGGER {
  CREATE = `TRIGGER_CREATE`,
  FIND_ALL = `TRIGGER_FIND_ALL`,
  FIND_ONE = `TRIGGER_FIND_ONE`,
  UPDATE = `TRIGGER_UPDATE`,
  DELETE = `TRIGGER_DELETE`,
  EDIT_FILE = `TRIGGER_EDIT_FILE`,
  RELOAD = `TRIGGER_RELOAD`,
}

export enum PLUGIN {
  ADD = `PLUGIN_ADD`,
  GET = `PLUGIN_GET`,
  REMOVE = `PLUGIN_REMOVE`,
}

export enum PLUGIN_MANAGER {
  INFO = `PLUGIN_MANAGER_INFO`,
  RELOAD = `PLUGIN_MANAGER_RELOAD`,
}

export enum PLUGIN_INSTANCE {
  CREATE = `PLUGIN_INSTANCE_CREATE`,
  FIND_ALL = `PLUGIN_INSTANCE_FIND_ALL`,
  FIND_ONE = `PLUGIN_INSTANCE_FIND_ONE`,
  UPDATE = `PLUGIN_INSTANCE_UPDATE`,
  DELETE = `PLUGIN_INSTANCE_DELETE`,
}

export enum PLUGIN_INSTANCE_MANAGER {
  RELOAD = `PLUGIN_INSTANCE_MANAGER_RELOAD`,
}

export enum MENU {
  GET = `MENU_GET`,
  SET = `MENU_SET`,
}

export enum THEME {
  GET = `THEME_GET`,
  SET = `THEME_SET`,
}

export enum LANG {
  GET = `LANG_GET`,
  SET = `LANG_SET`,
}

export enum APP {
  GET = `APP_GET`,
  SET = `APP_SET`,
}

export enum WEB_SERVER {
  GET_STATUS = `WEB_SERVER_GET_STATUS`,
  GET_URL = `WEB_SERVER_GET_URL`,
  OPEN = `WEB_SERVER_OPEN`,
  ON_CLOSE = `WEB_SERVER_ON_CLOSE`,
  ON_OPEN = `WEB_SERVER_ON_OPEN`,
  ON_ERROR = `WEB_SERVER_ON_ERROR`,
}

export enum WORKSPACE {
  GET_CURRENT = `WORKSPACE_GET_CURRENT`,
  GET_ALL = `WORKSPACE_GET_ALL`,
  SWITCH = `WORKSPACE_SWITCH`,
  OPEN_CURENT = `WORKSPACE_OPEN_CURENT`,
  SELECT_NEW = `WORKSPACE_SELECT_NEW`,
  ON_CHANGE = `WORKSPACE_ON_CHANGE`,
}

export enum TRIGGER_MANAGER {
  NEW_EVENT = `TRIGGER_MANAGER_NEW_EVENT`,
  ON_NEW = `TRIGGER_MANAGER_ON_NEW`,
  ON_START = `TRIGGER_MANAGER_ON_START`,
  ON_END = `TRIGGER_MANAGER_ON_END`,
  ON_ERROR = `TRIGGER_MANAGER_ON_ERROR`,
}

export enum MEDIA {
  PLAY = `MEDIA_PLAY`,
  TTS = `MEDIA_TTS`,
}
