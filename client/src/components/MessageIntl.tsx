import React from 'react';
import { useIntl } from "react-intl";

interface IMessageIntlProps {
  message: string;
  values?: Record<string, string>
}

const MessageIntl = ({ message, values }: IMessageIntlProps) => {
  const intl = useIntl()
  return <>{intl.formatMessage({ id: message }, values)}</>;
}

export default MessageIntl;
