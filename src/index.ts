import iconInfo from './svg/info.svg';
import iconWarn from './svg/warning.svg';
import iconLoading from './svg/loading.svg';
import iconSuccess from './svg/success.svg';
import iconClose from './svg/close.svg';
import css from './index.css';
import { ToastTime, ToastType, Toast, ToastTypeFn } from './type';

const rootId = 'thinke-toast';
const defaultDuration = 2500;
/** toast icon map */
const iconsMap: { [key in ToastType]: string } = {
  success: iconSuccess,
  loading: iconLoading,
  info: iconInfo,
  warn: iconWarn,
  error: iconWarn,
  default: '',
};
/** 展示`普通`Toast */
function show(msg: string, type: ToastType = 'default', duration: ToastTime = defaultDuration): () => void {
  // ssr
  if (typeof document === 'undefined') {
    return () => {};
  }
  const rootEl = getRootElement();
  let el = document.createElement('span');
  el.className = `${rootId}-${type}`;
  el.innerHTML = iconsMap[type];
  el.appendChild(document.createTextNode(msg));

  let timer: number;
  function close() {
    timer && clearTimeout(timer);
    el.classList.add('hide');
    setTimeout(() => {
      rootEl.removeChild(el);
      el = null as any;
    }, 300);
  }
  if (duration > 0) {
    timer = setTimeout(close, duration);
  } else {
    let tem = document.createElement('span');
    tem.innerHTML = iconClose;
    const svg = tem.firstChild as HTMLElement;
    svg.addEventListener('click', close);
    svg.style.fontSize = '1em';
    el.appendChild(svg);
    tem = null as any;
  }
  rootEl.appendChild(el);
  return close;
}

function getRootElement() {
  let rootEl = document.querySelector(`#${rootId}`);
  if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = rootId;
    document.body.appendChild(rootEl);
    let style = document.createElement('style');
    style.innerHTML = css as string;
    document.head.insertBefore(style, document.head.firstChild);
  }
  return rootEl;
}

/** 显示`成功`toast */
const success: ToastTypeFn = (msg, duration = defaultDuration) => show(msg, 'success', duration);
/** 显示`失败`toast */
const error: ToastTypeFn = (msg, duration = defaultDuration) => show(msg, 'error', duration);
/** 显示`警告`toast */
const warn: ToastTypeFn = (msg, duration = defaultDuration) => show(msg, 'warn', duration);
/** 显示`提醒`toast */
const info: ToastTypeFn = (msg, duration = defaultDuration) => show(msg, 'info', duration);
/** 显示  `加载中`toast，默认不自动关闭 */
const loading: ToastTypeFn = (msg, duration = -1) => show(msg, 'loading', duration);

/** 展示`普通`Toast */
const toast: Toast = (msg, duration = defaultDuration) => show(msg, 'default', duration);
toast.show = show;
toast.success = success;
toast.error = error;
toast.info = info;
toast.warn = warn;
toast.loading = loading;

export { toast as default, toast, show, success, warn, error, info, loading, iconsMap };
