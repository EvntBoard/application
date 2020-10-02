@Echo Off
REG DELETE "HKEY_CURRENT_USER\Software\Elgato Systems GmbH\StreamDeck" /v html_remote_debugging_enabled
REG ADD "HKEY_CURRENT_USER\Software\Elgato Systems GmbH\StreamDeck" /v html_remote_debugging_enabled /t REG_DWORD /d 1 /f