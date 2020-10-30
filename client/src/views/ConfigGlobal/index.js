import React, {useEffect, useState} from 'react'
import { useIntl} from 'react-intl'
import { size, get } from 'lodash'
import { Form } from 'react-final-form'

import {Button, Chip, Container, Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import FormApp from './FormApp'
import {appConfigGet, appConfigSet} from '../../service/appConfigService'
import {useThemeContext} from '../../context/theme'
import {useLangContext} from '../../context/lang'
import {
  workspaceGetCurrent,
  workspaceOpenCurrent,
  workspaceSelectNew, workspaceSwitch
} from '../../service/workspaceService'
import {
  listenWebServerStatusChange,
  unlistenWebServerStatusChange,
  webServerGetStatus
} from '../../service/webServerService'

import M from '../../context/lang/messages/constants'

function Config() {
  const intl = useIntl()
  const { theme, setTheme } = useThemeContext()
  const { locale, setLocale } = useLangContext()
  const [ appConfig, setAppConfig ] = useState({ host: "", port: "", password: "" })
  const [ currentWorkspace, setCurrentWorkspace ] = useState("")
  const [ webServerStatus, setWebServerStatus ] = useState(false)

  useEffect(() => {
    appConfigGet().then((data) => {
      setAppConfig(data)
    })

    workspaceGetCurrent().then((workspace) => {
      setCurrentWorkspace(workspace)
    })

    webServerGetStatus().then((data) => {
      setWebServerStatus(data)
    })

    listenWebServerStatusChange((evt, data) => {
      setWebServerStatus(data)
    })

    return () => {
      unlistenWebServerStatusChange()
    }
  }, [])

  const onOpenCurrentWorkspace = () => {
    workspaceOpenCurrent()
  }

  const onChangeWorkspace = () => {
    workspaceSelectNew().then(({ canceled, filePaths }) => {
      if (!canceled && size(filePaths) > 0) {
        const newWorkspace = get(filePaths, 0)
        if (newWorkspace) {
          workspaceSwitch(newWorkspace).then((workspace) => {
            setCurrentWorkspace(workspace)
          })
        }
      }
    })
  }

  const handleSubmit = async (data) => {
    const result = await appConfigSet(data)
    setAppConfig(result)
  }

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant='h6' color='primary'>{intl.formatMessage({ id: M.AppSettingsLanguage })}</Typography>
              <Select
                label={<div>Rea</div>}
                variant='filled'
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
              >
                <MenuItem value='fr'>{intl.formatMessage({ id: M.AppSettingsLanguageFR })}</MenuItem>
                <MenuItem value='en'>{intl.formatMessage({ id: M.AppSettingsLanguageEN })}</MenuItem>
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
                onChange={(e) => setTheme(e.target.value)}
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
                    {currentWorkspace && currentWorkspace.path}
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
                onSubmit={handleSubmit}
                initialValues={appConfig}
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
