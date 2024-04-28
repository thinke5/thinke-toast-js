import { show, toast } from '../dist/index.mjs';
import './index.css';
// import '../src/index.css';

const types = ['default', 'warn', 'error', 'success', 'info', 'loading'];

document.querySelector('#app')!.innerHTML = `
<main>
<h1>npm i @thinke/toast</h1>
<p>5KB 零依赖的Toast提示，支持黑暗模式。</p>
<div class='btns'>
  ${types.map((type) => `<button id="${type}-toast">${type}</button>`).join('')}
  <button id="xss-toast">xss</button>
  <button id="notclose-toast">notclose</button>
  <button id="long-toast">long</button>
</div>
<div class='btns'>
<button id="light">light theme</button>
<button id="dark">dark theme</button>
</div>
</main>
`;
types.forEach((type: any) => {
  document.querySelector(`#${type}-toast`)?.addEventListener('click', () => {
    show(`Hello, ${type}!`, type);
  });
});

document.querySelector(`#xss-toast`)?.addEventListener('click', () => {
  show(`Hello, <a>XSS</a>!`);
});

document.querySelector(`#notclose-toast`)?.addEventListener('click', () => {
  show(`Hello, notclose!`, 'loading', -1);
});
document.querySelector(`#long-toast`)?.addEventListener('click', () => {
  toast.info(`Hello, long!long!long!long!long!long!long!l!long!long!long!long!long!long!`, -1);
});
document.querySelector(`#light`)?.addEventListener('click', () => {
  const html = document.querySelector('html')!;
  html.style.colorScheme = 'light';
  html.classList.add('light');
  html.classList.remove('dark');
});
document.querySelector(`#dark`)?.addEventListener('click', () => {
  const html = document.querySelector('html')!;
  html.style.colorScheme = 'dark';
  html.classList.add('dark');
  html.classList.remove('light');
});
