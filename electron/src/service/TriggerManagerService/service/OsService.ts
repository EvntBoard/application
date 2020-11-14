import { clipboard, shell, Notification } from 'electron';

export const toClipboard = (text: string) => {
  clipboard.writeText(text);
};

export const openExternal = async (url: string) => {
  await shell.openExternal(url);
};

export const beep = async () => {
  shell.beep();
};

export const notification = async (title: string, body: string) => {
  const notification = new Notification({
    title,
    body,
  });

  notification.show();
};
