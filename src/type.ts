export type ToastType = 'default' | 'warn' | 'error' | 'info' | 'success' | 'loading';
export type ToastTime = number;

export interface Toast {
  /** 展示`普通`Toast */
  (msg: string, duration?: ToastTime): () => void;
  /** 展示`普通`Toast */
  show: ToastShow;
  /** 显示`成功`toast */
  success: ToastTypeFn;
  /** 显示`警告`toast */
  warn: ToastTypeFn;
  /** 显示`失败`toast */
  error: ToastTypeFn;
  /** 显示`提醒`toast */
  info: ToastTypeFn;
  /** 显示  `加载中`toast，默认不自动关闭 */
  loading: ToastTypeFn;
}

export type ToastTypeFn = (msg: string, duration?: ToastTime) => () => void;

type ToastShow = (msg: string, type?: ToastType, duration?: ToastTime) => () => void;
