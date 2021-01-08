import M from './constants'

const messagesFR = {
  // Menu
  [M.AppMenuHome]: 'Accueil',
  [M.AppMenuBoard]: 'Board',
  [M.AppMenuTrigger]: 'Trigger',
  [M.AppMenuDebug]: 'Debug',
  [M.AppMenuHelp]: 'Aide',
  [M.AppMenuSettings]: 'Configuration',
  [M.AppMenuBugs]: 'Issues',

  // FIELD
  [M.FieldDropzoneDropHere]: 'Drop ton fichier ici ...',
  [M.FieldDropzoneDragOrClick]: 'Drag \'n\' drop des fichiers ici, ou clique pour selectionner tes fichiers',

  // SETTINGS
  [M.AppMenuPlugin]: 'Plugin',
  [M.AppSettingsMenuGlobal]: 'Globale',

  [M.AppSettingsLanguage]: 'Langue',
  [M.AppSettingsLanguageFR]: '🇫🇷 Francais',
  [M.AppSettingsLanguageEN]: '🇺🇸 Anglais',
  [M.AppSettingsLanguagePTBR]: '🇧🇷 Portugais (Brésil)',

  [M.AppSettingsTheme]: 'Theme',
  [M.AppSettingsThemeLight]: '☀️ Clair',
  [M.AppSettingsThemeDark]: '🌙 Sombre',

  [M.AppSettingsGlobal]: 'Application',
  [M.AppSettingsGlobalOnline]: 'En ligne',
  [M.AppSettingsGlobalOffline]: 'Hors ligne',
  [M.AppSettingsGlobalAdvice]: '⚠️ Uniquement si tu sais ce que tu fais ... ⚠️',
  [M.AppSettingsGlobalHost]: 'Hôte',
  [M.AppSettingsGlobalPort]: 'Port',
  [M.AppSettingsGlobalPassword]: 'Mot de passe',
  [M.AppSettingsGlobalButtonCancel]: 'Annuler',
  [M.AppSettingsGlobalButtonSave]: 'Sauvegarder',

  [M.AppSettingsWorkspace]: 'Espace de travail',
  [M.AppSettingsWorkspaceCurrent]: 'Actuel',
  [M.AppSettingsWorkspaceChange]: 'Changer',

  // MODAL SETTINGS
  [M.ModalBoardCreate]: 'Créer une board',
  [M.ModalBoardUpdate]: 'Modifier une board',

  [M.ModalBoardNameLabel]: 'Nom',
  [M.ModalBoardNamePlaceholder]: 'Exemple: Gestion de mes scenes OBS',

  [M.ModalBoardDescriptionLabel]: 'Description',
  [M.ModalBoardDescriptionPlaceholder]: 'Exemple: Changement scene OBS BRB et just chatting',

  [M.ModalBoardWidthLabel]: 'Largeur',
  [M.ModalBoardWidthPlaceholder]: 'Exemple: 5',

  [M.ModalBoardHeightLabel]: 'Hauteur',
  [M.ModalBoardHeightPlaceholder]: 'Exemple: 5',

  [M.ModalBoardColorLabel]: 'Couleur',
  [M.ModalBoardColorPlaceholder]: 'Exemple: #fff',

  [M.ModalBoardImageLabel]: 'Image',
  [M.ModalBoardImagePlaceholder]: 'Exemple: workspace://test.png',

  [M.ModalBoardButtonCancel]: 'Annuler',
  [M.ModalBoardButtonSave]: 'Sauvegarder',

  // MODAL - BOARD DELETE
  [M.ModalBoardDeleteTitle]: 'Delete a board',
  [M.ModalBoardDeleteInfo]: '...',
  [M.ModalBoardDeleteButtonCancel]: 'Cancel',
  [M.ModalBoardDeleteButtonSave]: 'Delete',

  // MODAL - BUTTON SETTINGS
  [M.ModalButtonCreate]: 'Créer un button',
  [M.ModalButtonUpdate]: 'Modifier un button',

  [M.ModalButtonTextLabel]: 'Texte',
  [M.ModalButtonTextPlaceholder]: 'Exemple: Mute\nMic',

  [M.ModalButtonColorLabel]: 'Couleur',

  [M.ModalButtonImageInternalLabel]: 'Image',

  [M.ModalButtonImageExternalLabel]: 'Image URL',

  [M.ModalButtonTriggerLabel]: 'Trigger lié',

  [M.ModalButtonButtonCancel]: 'Annuler',
  [M.ModalButtonButtonSave]: 'Sauvegarder',

  // MODAL - BUTTON DELETE
  [M.ModalButtonDeleteTitle]: 'Delete a button',
  [M.ModalButtonDeleteInfo]: '...',
  [M.ModalButtonDeleteButtonCancel]: 'Cancel',
  [M.ModalButtonDeleteButtonSave]: 'Delete',

  // BOARD
  [M.AppBoardTitle]: 'Board : ',
  [M.AppBoardActionCreate]: 'Nouvelle board',
  [M.AppBoardActionUpdate]: 'Modifier',
  [M.AppBoardActionDelete]: 'Supprimer',
  [M.AppBoardActionSetDefault]: 'Définir comme par défaut',

  // TRIGGER
  [M.AppTriggerSearch]: 'Recherche',
  [M.AppTriggerButtonCreate]: 'Nouveau trigger',

  [M.AppTriggerOptionsClassic]: 'Classique',
  [M.AppTriggerOptionsThrottle]: 'Throttle',
  [M.AppTriggerOptionsQueue]: 'File d\'attente',
  [M.AppTriggerOptionsQueueLock]: 'File d\'attente partagé',

  [M.AppTriggerMenuDupplicate]: 'Dupliquer',
  [M.AppTriggerMenuEdit]: 'Modifier',
  [M.AppTriggerMenuDelete]: 'Supprimer',
  [M.AppTriggerMenuEditFile]: 'Modifier le fichier',
  [M.AppTriggerMenuReload]: 'Recharger',

  [M.AppTriggerCreate]: 'Creation d\'un trigger',
  [M.AppTriggerUpdate]: 'Modification d\'un trigger',

  [M.AppTriggerNameLabel]: 'Nom',
  [M.AppTriggerNamePlaceholder]: 'Exemple: un nom au hasard',
  [M.AppTriggerTypeLabel]: 'Type',
  [M.AppTriggerTypePlaceholder]: 'Exemple: Classique',
  [M.AppTriggerLockerLabel]: 'Nom de la file partagé',
  [M.AppTriggerLockerPlaceholder]: 'Exemple: channel-twitch',
  [M.AppTriggerDescriptionLabel]: 'Description',
  [M.AppTriggerDescriptionPlaceholder]: 'Exemple: Gestion des follows twitch',
  [M.AppTriggerButtonEditFile]: 'Modifier le fichier du trigger',
  [M.AppTriggerButtonCancel]: 'Annuler',
  [M.AppTriggerButtonSave]: 'Enregistrer',

  // MAIN
  [M.AppMainQrCode]: 'QR Code',
  [M.AppMainOr]: 'OU',
  [M.AppMainURL]: 'Lien',

  // CONFIG PLUGIN
  [M.AppSettingsPluginTitle]: 'Liste des plugins',
  [M.AppSettingsPluginButtonAdd]: 'Ajouter',
  [M.AppSettingsPluginPath]: 'Path',
  [M.AppSettingsPluginName]: 'Nom',
  [M.AppSettingsPluginDescription]: 'Description',
  [M.AppSettingsPluginRepo]: 'Repository',
  [M.AppSettingsPluginType]: 'Type',

  [M.AppSettingsPluginModalAddTitle]: 'Ajouter un plugin',
  [M.AppSettingsPluginModalAddInfos]: 'Lien Github',
  [M.AppSettingsPluginModalAddRepoLabel]: 'Repository',
  [M.AppSettingsPluginModalAddRepoPlaceholder]: 'EvntBoard/module-obs',
  [M.AppSettingsPluginModalAddButtonCancel]: 'Annuler',
  [M.AppSettingsPluginModalAddButtonSave]: 'Ajouter',
  [M.AppSettingsPluginModalAddSchemaLoading]: 'Chargement du schema du plugin ...',

  [M.AppSettingsPluginModalDeleteTitle]: 'Suppression d\'un plugin',
  [M.AppSettingsPluginModalDeleteInfo]: '...',
  [M.AppSettingsPluginModalDeleteButtonCancel]: 'Annuler',
  [M.AppSettingsPluginModalDeleteButtonSave]: 'Supprimer',

  // DEBUG
  [M.AppDebugTableTriggerLabel]: 'Trigger',
  [M.AppDebugTableTriggerStartDate]: 'Date de début',
  [M.AppDebugTableTriggerEndDate]: 'Date de fin',
  [M.AppDebugTableTriggerErrorDate]: 'Date de l\'erreur',
  [M.AppDebugTableTriggerError]: 'Erreur',
  [M.AppDebugTableTriggerNoData]: 'Aucun trigger n\'a traiter cet event',
  [M.AppDebugTableTriggerEmittedAt]: 'Date d\'émission',
  [M.AppDebugTableTriggerEvent]: 'Événement',
  [M.AppDebugTableTriggerAction]: 'Action',
  [M.AppDebugFilterEvent]: 'Événement',
  [M.AppDebugFilterStartDate]: 'Date de début',
  [M.AppDebugFilterEndDate]: 'Date de fin',
}

export default messagesFR
