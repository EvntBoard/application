import M from './constants'

const messagesFR = {
  // Menu
  [M.AppMenuHome]: 'Accueil',
  [M.AppMenuBoard]: 'Board',
  [M.AppMenuTrigger]: 'Trigger',
  [M.AppMenuSettings]: 'Configuration',

  // FIELD
  [M.FieldDropzoneDropHere]: 'Drop ton fichier ici ...',
  [M.FieldDropzoneDragOrClick]: 'Drag \'n\' drop des fichiers ici, ou clique pour selectionner tes fichiers',

  // SETTINGS
  [M.AppSettingsMenuModule]: 'Module',
  [M.AppSettingsMenuGlobal]: 'Globale',

  [M.AppSettingsLanguage]: 'Langue',
  [M.AppSettingsLanguageFR]: '🇫🇷 Francais',
  [M.AppSettingsLanguageEN]: '🇺🇸 Anglais',

  [M.AppSettingsTheme]: 'Theme',
  [M.AppSettingsThemeLight]: '☀️ Clair',
  [M.AppSettingsThemeDark]: '🌙 Sombre',

  [M.AppSettingsGlobal]: 'Application',
  [M.AppSettingsGlobalAdvice]: '⚠️ Uniquement si tu sais ce que tu fais ... ⚠️',
  [M.AppSettingsGlobalHost]: 'Hôte',
  [M.AppSettingsGlobalPort]: 'Port',
  [M.AppSettingsGlobalPassword]: 'Mot de passe',

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

}

export default messagesFR
