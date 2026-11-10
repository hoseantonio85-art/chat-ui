import React from 'react';
import './MessageSecondaryAction.css';

export function MessageSecondaryAction({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <button type="button" className="message-secondary-action" onClick={onClick}>{children}</button>;
}
