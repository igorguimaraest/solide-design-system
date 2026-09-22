export type ToastTone = 'success' | 'warning' | 'error' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  /**
   * The unique identifier for the toast
   */
  id: string;
  /**
   * The semantic tone of the toast
   * @default 'info'
   */
  tone?: ToastTone;
  /**
   * The main title of the toast
   */
  title: string;
  /**
   * The descriptive text of the toast
   */
  description?: string;
  /**
   * Optional action button to be displayed inside the toast
   */
  action?: ToastAction;
  /**
   * Callback fired when the toast is dismissed
   */
  onDismiss: (id: string) => void;
  /**
   * Optional icon override. If not provided, a default icon for the tone will be used.
   */
  icon?: string;
  /**
   * Duration in milliseconds before the toast auto-dismisses. Set to Infinity to disable auto-dismiss.
   * @default 4000
   */
  duration?: number;
}

export interface ToastState extends Omit<ToastProps, 'onDismiss' | 'id'> {
  id: string;
}
