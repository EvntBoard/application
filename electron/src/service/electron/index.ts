import { clipboard, shell, Notification } from 'electron'

export const toClipboard = (text) => {
    clipboard.writeText(text)
}

export const openExternal = async (url) => {
    await shell.openExternal(url)
}

export const beep = async () => {
    shell.beep()
}

export const notification = async (title, body) => {
    const notification = new Notification({
        title,
        body
    })

    notification.show()
}