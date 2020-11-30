import M from './constants'

const messagesPTBR = {
  // MENU
  [M.AppMenuHome]: 'Início',
  [M.AppMenuBoard]: 'Quadro',
  [M.AppMenuTrigger]: 'Gatilho',
  [M.AppMenuDebug]: 'Debug',
  [M.AppMenuHelp]: 'Ajuda',
  [M.AppMenuSettings]: 'Ajustes',
  [M.AppMenuBugs]: 'Problemas',

  // FIELD
  [M.FieldDropzoneDropHere]: 'Arraste os arquivos aqui ...',
  [M.FieldDropzoneDragOrClick]: 'Arraste e solte alguns arquivos aqui, ou clique em selecionar arquivos',

  // SETTINGS
  [M.AppMenuPlugin]: 'Extensões',
  [M.AppSettingsMenuGlobal]: 'Global',

  [M.AppSettingsLanguage]: 'Idioma',
  [M.AppSettingsLanguageFR]: '🇫🇷 Francês',
  [M.AppSettingsLanguageEN]: '🇺🇸 Inglês',
  [M.AppSettingsLanguagePTBR]: '🇧🇷 Português',

  [M.AppSettingsTheme]: 'Tema',
  [M.AppSettingsThemeLight]: '☀️ Claro',
  [M.AppSettingsThemeDark]: '🌙 Escuro',

  [M.AppSettingsGlobal]: 'Aplicação',
  [M.AppSettingsGlobalOnline]: 'Online',
  [M.AppSettingsGlobalOffline]: 'Offline',
  [M.AppSettingsGlobalAdvice]: '⚠️ Cuidado, só altere essas informações se você souber o que está fazendo ... ⚠️',
  [M.AppSettingsGlobalHost]: 'Endereço',
  [M.AppSettingsGlobalPort]: 'Porta',
  [M.AppSettingsGlobalPassword]: 'Senha',
  [M.AppSettingsGlobalButtonCancel]: 'Cancelar',
  [M.AppSettingsGlobalButtonSave]: 'Salvar',

  [M.AppSettingsWorkspace]: 'Área de trabalho',
  [M.AppSettingsWorkspaceCurrent]: 'Atual',
  [M.AppSettingsWorkspaceChange]: 'Alterar',

  // MODAL - BOARD
  [M.ModalBoardCreate]: 'Criar um quadro',
  [M.ModalBoardUpdate]: 'Alterar um quadro',

  [M.ModalBoardNameLabel]: 'Nome',
  [M.ModalBoardNamePlaceholder]: 'Exemplo: Gerenciar cenas do OBS',

  [M.ModalBoardDescriptionLabel]: 'Descrição',
  [M.ModalBoardDescriptionPlaceholder]: 'Exemplo: Mudar cena BRB para Só na conversa',

  [M.ModalBoardWidthLabel]: 'Largura',
  [M.ModalBoardWidthPlaceholder]: 'Exemplo: 5',

  [M.ModalBoardHeightLabel]: 'Altura',
  [M.ModalBoardHeightPlaceholder]: 'Exemplo: 5',

  [M.ModalBoardColorLabel]: 'Cor',
  [M.ModalBoardColorPlaceholder]: 'Exemplo: #fff',

  [M.ModalBoardImageLabel]: 'Imagem',
  [M.ModalBoardImagePlaceholder]: 'Exemplo: workspace://teste.png',

  [M.ModalBoardButtonCancel]: 'Cancelar',
  [M.ModalBoardButtonSave]: 'Salvar',

  // MODAL - BOARD DELETE
  [M.ModalBoardDeleteTitle]: 'Apagar um quadro',
  [M.ModalBoardDeleteInfo]: '...',
  [M.ModalBoardDeleteButtonCancel]: 'Cancelar',
  [M.ModalBoardDeleteButtonSave]: 'Excluir',


  // MODAL - BUTTON
  [M.ModalButtonCreate]: 'Criar um botão',
  [M.ModalButtonUpdate]: 'Atualizar um botão',

  [M.ModalButtonTextLabel]: 'Texto',
  [M.ModalButtonTextPlaceholder]: 'Exemplo: Silenciar\nMicrofone',

  [M.ModalButtonColorLabel]: 'Cor',

  [M.ModalButtonImageInternalLabel]: 'Imagem',

  [M.ModalButtonImageExternalLabel]: 'URL da imagem',

  [M.ModalButtonTriggerLabel]: 'Gatilho linkado',

  [M.ModalButtonButtonCancel]: 'Cancelar',
  [M.ModalButtonButtonSave]: 'Salvar',

  // MODAL - BUTTON DELETE
  [M.ModalButtonDeleteTitle]: 'Apagar um botão',
  [M.ModalButtonDeleteInfo]: '...',
  [M.ModalButtonDeleteButtonCancel]: 'Cancelar',
  [M.ModalButtonDeleteButtonSave]: 'Apagar',

  // BOARD
  [M.AppBoardTitle]: 'Quadro : ',
  [M.AppBoardActionCreate]: 'Novo quadro',
  [M.AppBoardActionUpdate]: 'Editar',
  [M.AppBoardActionDelete]: 'Apagar',
  [M.AppBoardActionSetDefault]: 'Tornar padrão',

  // TRIGGER
  [M.AppTriggerSearch]: 'Buscar',
  [M.AppTriggerButtonCreate]: 'Novo gatilho',

  [M.AppTriggerOptionsClassic]: 'Clássico',
  [M.AppTriggerOptionsThrottle]: 'Regulado',
  [M.AppTriggerOptionsQueue]: 'Fila',
  [M.AppTriggerOptionsQueueLock]: 'Fila travada',

  [M.AppTriggerMenuDupplicate]: 'Duplicar',
  [M.AppTriggerMenuEdit]: 'Editar',
  [M.AppTriggerMenuDelete]: 'Apagar',
  [M.AppTriggerMenuEditFile]: 'Editar arquivo',
  [M.AppTriggerMenuReload]: 'Recarregar',

  [M.AppTriggerCreate]: 'Criar um gatilho',
  [M.AppTriggerUpdate]: 'Atualizar um gatilho',

  [M.AppTriggerNameLabel]: 'Nome',
  [M.AppTriggerNamePlaceholder]: 'Exemplo: um nome de exemplo',
  [M.AppTriggerTypeLabel]: 'Tipo',
  [M.AppTriggerTypePlaceholder]: 'Exemplo: Clássico',
  [M.AppTriggerLockerLabel]: 'Locker',
  [M.AppTriggerLockerPlaceholder]: 'Exemplo: channel-twitch',
  [M.AppTriggerDescriptionLabel]: 'Descrição',
  [M.AppTriggerDescriptionPlaceholder]: 'Exemplo: gerenciar seguidores da twitch',
  [M.AppTriggerButtonEditFile]: 'Alterar arquivo de gatilho',
  [M.AppTriggerButtonCancel]: 'Cancelar',
  [M.AppTriggerButtonSave]: 'Salvar',

  // MAIN
  [M.AppMainQrCode]: 'Código QR',
  [M.AppMainOr]: 'OU',
  [M.AppMainURL]: 'Link',

  // CONFIG PLUGIN
  [M.AppSettingsPluginTitle]: 'Lista de extensões',
  [M.AppSettingsPluginButtonAdd]: 'Adicionar uma extensão',
  [M.AppSettingsPluginPath]: 'Endereço / Caminho',
  [M.AppSettingsPluginName]: 'Nome',
  [M.AppSettingsPluginDescription]: 'Descrição',
  [M.AppSettingsPluginRepo]: 'Repositório',
  [M.AppSettingsPluginType]: 'Tipo',

  [M.AppSettingsPluginModalAddTitle]: 'Adicionar um extensão',
  [M.AppSettingsPluginModalAddInfos]: 'Link do Github',
  [M.AppSettingsPluginModalAddRepoLabel]: 'Repositório',
  [M.AppSettingsPluginModalAddRepoPlaceholder]: 'EvntBoard/module-obs',
  [M.AppSettingsPluginModalAddButtonCancel]: 'Cancelar',
  [M.AppSettingsPluginModalAddButtonSave]: 'Adicionar',

  // DEBUG
  [M.AppDebugTableTriggerLabel]: 'Gatilho',
  [M.AppDebugTableTriggerStartDate]: 'Data inicial',
  [M.AppDebugTableTriggerEndDate]: 'Data final',
  [M.AppDebugTableTriggerErrorDate]: 'Data do erro',
  [M.AppDebugTableTriggerError]: 'Erro',
  [M.AppDebugTableTriggerNoData]: 'Qualquer gatilho processou esse evento',
  [M.AppDebugTableTriggerEmittedAt]: 'Emitido há',
  [M.AppDebugTableTriggerEvent]: 'Evento',
  [M.AppDebugTableTriggerAction]: 'Ação',
}

export default messagesPTBR
