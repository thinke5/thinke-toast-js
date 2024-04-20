import iconInfo from './svg/info.svg';
import iconWarn from './svg/warning.svg';
import iconLoading from './svg/loading.svg';
import iconSuccess from './svg/success.svg';
import iconClose from './svg/close.svg';
import css from './index.css';
import { ToastTime, ToastType } from './type';

const rootId = 'thinke-toast';
const defaultDuration = 2500;

const iconsMap: { [key in ToastType]: string } = {
  success: iconSuccess,
  loading: iconLoading,
  info: iconInfo,
  warn: iconWarn,
  error: iconWarn,
  default: '',
};

function show(msg: string): () => void;
function show(msg: string, duration: ToastTime): () => void;
function show(msg: string, type: ToastType): () => void;
function show(msg: string, type: ToastType, duration: ToastTime): () => void;
function show(msg: string, type: ToastType | ToastTime = 'default', duration: ToastTime = defaultDuration): () => void {
  if (typeof type === 'number') {
    duration = type;
    type = 'default';
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
const success = (msg: string, duration: ToastTime = defaultDuration) => show(msg, 'success', duration);
const error = (msg: string, duration: ToastTime = defaultDuration) => show(msg, 'error', duration);
const warn = (msg: string, duration: ToastTime = defaultDuration) => show(msg, 'warn', duration);
const info = (msg: string, duration: ToastTime = defaultDuration) => show(msg, 'info', duration);
const loading = (msg: string, duration: ToastTime = -1) => show(msg, 'loading', duration);

export { show as default, show, success, warn, error, info, loading };
