export enum MODE {
  regular = 'regular',
  error = 'error',
  success = 'success',
  warning = 'warning',
  light = 'light',
  dark = 'dark',
  outlined = 'outlined'
}

export interface MeBasicAlertI {
  mode: MODE;
  title: string;
  content: string;
  linkText?: string;
  internalLink?: string;
  externalLink?: string;
}

export enum MeBasicAlertEventsTypes {
  EXIT = 'exit'
}
