import Dialog from '@/components/dialog';
import React, { ButtonHTMLAttributes, useState } from 'react';

interface ButtonWithDialogProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dialogTitle: string
  dialogBody: string
  dialogOkText: string
  shouldShowDialog?: boolean
}

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export default function ButtonWithDialog({
  children,
  dialogTitle,
  dialogBody,
  dialogOkText,
  shouldShowDialog,
  onClick,
  ...props
} : ButtonWithDialogProps) {
  const [onClickEvent, setOnClickEvent] = useState<ButtonClickEvent>();

  const onButtonClick = (event: ButtonClickEvent) => {
    if (shouldShowDialog) {
      setOnClickEvent(event);
    } else if (onClick) {
      onClick(event);
    }
  };

  const closeDialog = () => {
    if (onClickEvent && onClick) {
      onClick(onClickEvent);
    }
    setOnClickEvent(undefined);
  };

  return (
    <>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <button type="button" {...props} onClick={onButtonClick}>
        {children}
      </button>
      <Dialog
        title={dialogTitle}
        body={dialogBody}
        okText={dialogOkText}
        isOpen={!!onClickEvent}
        closeDialog={closeDialog}
      />
    </>
  );
}

ButtonWithDialog.defaultProps = {
  shouldShowDialog: true,
};
