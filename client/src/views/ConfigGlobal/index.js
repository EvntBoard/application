import React, { useEffect } from 'react'
import { useIntl} from 'react-intl'
import { size, get } from 'lodash'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Chip, Container, Grid } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import FormApp from './FormApp'
import { workspaceOpenCurrent, workspaceSelectNew } from '../../service/workspaceService'
import { themeGet, themeSet, selectors as themeSelectors } from '../../store/theme'
import { langGet, langSet, selectors as langSelectors } from '../../store/lang'
import { configGet, configSet, selectors as configSelectors } from '../../store/config'
import { workspaceGet, workspaceSet, selectors as workspaceSelectors } from '../../store/workspace'
import { webserverGet, selectors as webserverSelectors } from '../../store/webserver'
import M from '../../messages/constants'

function Config() {
  const intl = useIntl()
  const dispatch = useDispatch()
  const theme = useSelector(themeSelectors.theme)
  const lang = useSelector(langSelectors.lang)
  const config = useSelector(configSelectors.config)
  const workspace = useSelector(workspaceSelectors.workspace)
  const webServerStatus = useSelector(webserverSelectors.webserverIsConnectedSelector)

  useEffect(() => {
    dispatch(langGet())
    dispatch(themeGet())
    dispatch(configGet())
    dispatch(workspaceGet())
    dispatch(webserverGet())
  }, [dispatch])

  const onOpenCurrentWorkspace = () => {
    workspaceOpenCurrent()
  }

  const onChangeWorkspace = () => {
    workspaceSelectNew().then(({ canceled, filePaths }) => {
      if (!canceled && size(filePaths) > 0) {
        const newWorkspace = get(filePaths, 0)
        if (newWorkspace) {
          dispatch(workspaceSet(newWorkspace))
        }
      }
    })
  }

  const onChangeTheme = (theme) => {
    dispatch(themeSet(theme))
  }

  const onChangeLang = (lang) => {
    dispatch(langSet(lang))
  }

  const onChangeConfig = (data) => {
    dispatch(configSet(data))
  }

  return (
    <Container maxWidth='sm' style={{ marginTop: 8 }} >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant='h6' color='primary'>{intl.formatMessage({ id: M.AppSettingsLanguage })}</Typography>
              <Select
                variant='filled'
                value={lang}
                onChange={(e) => onChangeLang(e.target.value)}
              >
                <MenuItem value='fr'>{intl.formatMessage({ id: M.AppSettingsLanguageFR })}</MenuItem>
                <MenuItem value='en'>{intl.formatMessage({ id: M.AppSettingsLanguageEN })}</MenuItem>
                <MenuItem value='pt_br'>{intl.formatMessage({ id: M.AppSettingsLanguage })}</MenuItem>
              </Select>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent  style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant='h6' color='primary'>{intl.formatMessage({ id: M.AppSettingsTheme })}</Typography>
              <Select
                label='current'
                variant='filled'
                value={theme}
                onChange={(e) => onChangeTheme(e.target.value)}
              >
                <MenuItem value='dark'>{intl.formatMessage({ id: M.AppSettingsThemeDark })}</MenuItem>
                <MenuItem value='light'>{intl.formatMessage({ id: M.AppSettingsThemeLight })}</MenuItem>
              </Select>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent  style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant='h6' color='primary'>{intl.formatMessage({ id: M.AppSettingsWorkspace })}</Typography>
              <div style={{ display: "flex" }}>
                <Typography style={{ flexGrow: 1, alignSelf: 'center' }}>
                  {intl.formatMessage({ id: M.AppSettingsWorkspaceCurrent })} :
                  <code style={{ cursor: 'pointer' }} onClick={onOpenCurrentWorkspace}>
                    {workspace && workspace.path}
                  </code>
                </Typography>
                <Button  variant='contained' onClick={onChangeWorkspace} >{intl.formatMessage({ id: M.AppSettingsWorkspaceChange })}</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Grid container spacing={2}>
                <Grid container item xs={12}>
                  <Typography style={{ flexGrow: 1 }} variant='h6' color='primary'>{intl.formatMessage({ id: M.AppSettingsGlobal })}</Typography>
                  {
                    webServerStatus ? (
                      <Chip label={intl.formatMessage({ id: M.AppSettingsGlobalOnline })} color='primary' />
                    ) : (
                      <Chip label={intl.formatMessage({ id: M.AppSettingsGlobalOffline })} />
                    )
                  }
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle2' color='error'>{intl.formatMessage({ id: M.AppSettingsGlobalAdvice })}</Typography>
                </Grid>
              </Grid>
              <Form
                onSubmit={onChangeConfig}
                initialValues={config}
                component={FormApp}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Config;
