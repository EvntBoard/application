import M from './constants'

const messagesEN = {
  // MENU
  [M.AppMenuHome]: 'Home',
  [M.AppMenuBoard]: 'Board',
  [M.AppMenuTrigger]: 'Trigger',
  [M.AppMenuDebug]: 'Debug',
  [M.AppMenuHelp]: 'Help',
  [M.AppMenuSettings]: 'Settings',
  [M.AppMenuBugs]: 'Issues',

  // FIELD
  [M.FieldDropzoneDropHere]: 'Drop the files here ...',
  [M.FieldDropzoneDragOrClick]: 'Drag \'n\' drop some files here, or click to select files',

  // SETTINGS
  [M.AppMenuPlugin]: 'Plugin',
  [M.AppSettingsMenuGlobal]: 'Global',

  [M.AppSettingsLanguage]: 'Language',
  [M.AppSettingsLanguageFR]: 'π«π· French',
  [M.AppSettingsLanguageEN]: 'πΊπΈ English',
  [M.AppSettingsLanguagePTBR]: 'π§π· Portuguese (Brazil)',

  [M.AppSettingsTheme]: 'Theme',
  [M.AppSettingsThemeLight]: 'βοΈ Light',
  [M.AppSettingsThemeDark]: 'π Dark',

  [M.AppSettingsGlobal]: 'Application',
  [M.AppSettingsGlobalOnline]: 'Online',
  [M.AppSettingsGlobalOffline]: 'Offline',
  [M.AppSettingsGlobalAdvice]: 'β οΈ Only if you know what you\'re doing ... β οΈ',
  [M.AppSettingsGlobalHost]: 'Host',
  [M.AppSettingsGlobalPort]: 'Port',
  [M.AppSettingsGlobalPassword]: 'Password',
  [M.AppSettingsGlobalButtonCancel]: 'Cancel',
  [M.AppSettingsGlobalButtonSave]: 'Save',

  [M.AppSettingsWorkspace]: 'Workspace',
  [M.AppSettingsWorkspaceCurrent]: 'Current',
  [M.AppSettingsWorkspaceChange]: 'Change',

  // MODAL - BOARD
  [M.ModalBoardCreate]: 'Create a board',
  [M.ModalBoardUpdate]: 'Update a board',

  [M.ModalBoardNameLabel]: 'Name',
  [M.ModalBoardNamePlaceholder]: 'Example: Manage OBS scenes',

  [M.ModalBoardDescriptionLabel]: 'Description',
  [M.ModalBoardDescriptionPlaceholder]: 'Example: Switch scene BRB and Just chatting',

  [M.ModalBoardWidthLabel]: 'Width',
  [M.ModalBoardWidthPlaceholder]: 'Example: 5',

  [M.ModalBoardHeightLabel]: 'Height',
  [M.ModalBoardHeightPlaceholder]: 'Example: 5',

  [M.ModalBoardColorLabel]: 'Color',
  [M.ModalBoardColorPlaceholder]: 'Example: #fff',

  [M.ModalBoardImageLabel]: 'Image',
  [M.ModalBoardImagePlaceholder]: 'Example: workspace://test.png',

  [M.ModalBoardButtonCancel]: 'Cancel',
  [M.ModalBoardButtonSave]: 'Save',

  // MODAL - BOARD DELETE
  [M.ModalBoardDeleteTitle]: 'Delete a board',
  [M.ModalBoardDeleteInfo]: '...',
  [M.ModalBoardDeleteButtonCancel]: 'Cancel',
  [M.ModalBoardDeleteButtonSave]: 'Delete',


  // MODAL - BUTTON
  [M.ModalButtonCreate]: 'Create a button',
  [M.ModalButtonUpdate]: 'Update a button',

  [M.ModalButtonTextLabel]: 'Text',
  [M.ModalButtonTextPlaceholder]: 'Example: Mute\nMic',

  [M.ModalButtonColorLabel]: 'Color',

  [M.ModalButtonImageInternalLabel]: 'Image',

  [M.ModalButtonImageExternalLabel]: 'Image URL',

  [M.ModalButtonTriggerLabel]: 'Linked Trigger',

  [M.ModalButtonButtonCancel]: 'Cancel',
  [M.ModalButtonButtonSave]: 'Save',

  // MODAL - BUTTON DELETE
  [M.ModalButtonDeleteTitle]: 'Delete a button',
  [M.ModalButtonDeleteInfo]: '...',
  [M.ModalButtonDeleteButtonCancel]: 'Cancel',
  [M.ModalButtonDeleteButtonSave]: 'Delete',

  // BOARD
  [M.AppBoardTitle]: 'Board : ',
  [M.AppBoardActionCreate]: 'New board',
  [M.AppBoardActionUpdate]: 'Edit',
  [M.AppBoardActionDelete]: 'Delete',
  [M.AppBoardActionSetDefault]: 'Set as default',

  // TRIGGER
  [M.AppTriggerSearch]: 'Search',
  [M.AppTriggerButtonCreate]: 'New trigger',

  [M.AppTriggerOptionsClassic]: 'Classic',
  [M.AppTriggerOptionsThrottle]: 'Throttle',
  [M.AppTriggerOptionsQueue]: 'Queue',
  [M.AppTriggerOptionsQueueLock]: 'Queue Lock',

  [M.AppTriggerMenuDupplicate]: 'Duplicate',
  [M.AppTriggerMenuEdit]: 'Edit',
  [M.AppTriggerMenuDelete]: 'Delete',
  [M.AppTriggerMenuEditFile]: 'Edit file',
  [M.AppTriggerMenuReload]: 'Reload',

  [M.AppTriggerCreate]: 'Create a trigger',
  [M.AppTriggerUpdate]: 'Update a trigger',

  [M.AppTriggerNameLabel]: 'Name',
  [M.AppTriggerNamePlaceholder]: 'Example: a sample name',
  [M.AppTriggerTypeLabel]: 'Type',
  [M.AppTriggerTypePlaceholder]: 'Example: Classic',
  [M.AppTriggerLockerLabel]: 'Locker',
  [M.AppTriggerLockerPlaceholder]: 'Example: channel-twitch',
  [M.AppTriggerDescriptionLabel]: 'Description',
  [M.AppTriggerDescriptionPlaceholder]: 'Example: manage twitch follow',
  [M.AppTriggerButtonEditFile]: 'Edit trigger file',
  [M.AppTriggerButtonCancel]: 'Cancel',
  [M.AppTriggerButtonSave]: 'Save',

  // MAIN
  [M.AppMainQrCode]: 'QR Code',
  [M.AppMainOr]: 'OR',
  [M.AppMainURL]: 'Link',

  // CONFIG PLUGIN
  [M.AppSettingsPluginTitle]: 'Plugins list',
  [M.AppSettingsPluginButtonAdd]: 'Add a plugin',
  [M.AppSettingsPluginPath]: 'Path',
  [M.AppSettingsPluginName]: 'Name',
  [M.AppSettingsPluginDescription]: 'Description',
  [M.AppSettingsPluginRepo]: 'Repository',
  [M.AppSettingsPluginType]: 'Type',

  [M.AppSettingsPluginModalAddTitle]: 'Add a plugin',
  [M.AppSettingsPluginModalAddInfos]: 'Github link',
  [M.AppSettingsPluginModalAddRepoLabel]: 'Repository',
  [M.AppSettingsPluginModalAddRepoPlaceholder]: 'EvntBoard/module-obs',
  [M.AppSettingsPluginModalAddButtonCancel]: 'Cancel',
  [M.AppSettingsPluginModalAddButtonSave]: 'Add',
  [M.AppSettingsPluginModalAddSchemaLoading]: 'Loading plugin schema ...',

  [M.AppSettingsPluginModalDeleteTitle]: 'Delete a plugin',
  [M.AppSettingsPluginModalDeleteInfo]: '...',
  [M.AppSettingsPluginModalDeleteButtonCancel]: 'Cancel',
  [M.AppSettingsPluginModalDeleteButtonSave]: 'Delete',

  // DEBUG
  [M.AppDebugTableTriggerLabel]: 'Trigger',
  [M.AppDebugTableTriggerStartDate]: 'Start date',
  [M.AppDebugTableTriggerEndDate]: 'End date',
  [M.AppDebugTableTriggerErrorDate]: 'Error date',
  [M.AppDebugTableTriggerError]: 'Error',
  [M.AppDebugTableTriggerNoData]: 'Any trigger process this event',
  [M.AppDebugTableTriggerEmittedAt]: 'Emitted At',
  [M.AppDebugTableTriggerEvent]: 'Event',
  [M.AppDebugTableTriggerAction]: 'Action',
  [M.AppDebugFilterEvent]: 'Event',
  [M.AppDebugFilterStartDate]: 'Start Date',
  [M.AppDebugFilterEndDate]: 'End Date',
}

export default messagesEN
