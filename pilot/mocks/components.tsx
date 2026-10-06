import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
export const ClickStreamProvider = ({children}: {children: ReactNode; [key: string]: unknown}) => children;
export const Portal = ({visible, children}: {visible: boolean; children: ReactNode; id?: string}) => visible ? createPortal(children, document.body) : null;
const trackEvent = () => {};
export const useTracking = () => ({trackEvent});
export const validatorsSchema = {
  fileMaxSize: (value: number, limit: number) => ({valid: value < limit, message: 'Размер файла превышает 15 МБ'}),
  fileNameMaxLength: (value: string, limit: number) => ({valid: value.length < limit, message: 'Слишком длинное имя файла'}),
  fileAcceptExtensions: (value: string, extensions: string[]) => ({valid: extensions.some(ext => value.toLowerCase().endsWith(ext)), message: 'Этот тип файла не поддерживается'}),
};
