// 세트 수 입력 모달 UI
// window.prompt()가 iframe에서 동작하지 않을 수 있어 페이지 내 모달로 대체

import { showToast } from './wait.js';

/**
 * PDF 세트 수 입력 모달 표시
 * @returns {Promise<number|null>} 확인 시 1 이상 정수, 취소 시 null
 */
export function showSetCountModal() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'gemini-sat-modal-overlay';
    overlay.id = 'gemini-sat-set-count-modal';

    const box = document.createElement('div');
    box.className = 'gemini-sat-modal-box';

    const title = document.createElement('h3');
    title.className = 'gemini-sat-modal-title';
    title.textContent = 'PDF 세트 수 입력';

    const desc = document.createElement('p');
    desc.className = 'gemini-sat-modal-desc';
    desc.textContent = '문제지/해설지 세트를 몇 개 생성할까요? (1 이상의 정수)';

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'gemini-sat-modal-input';
    input.min = '1';
    input.max = '99';
    input.value = '1';
    input.autofocus = true;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'gemini-sat-modal-btns';

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'gemini-sat-modal-btn gemini-sat-modal-btn-confirm';
    confirmBtn.textContent = '확인';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'gemini-sat-modal-btn gemini-sat-modal-btn-cancel';
    cancelBtn.textContent = '취소';

    const cleanup = () => {
      overlay.remove();
      document.removeEventListener('keydown', onEsc);
    };

    const resolveAndCleanup = (value) => {
      cleanup();
      resolve(value);
    };

    const onEsc = (ev) => {
      if (ev.key === 'Escape') {
        resolveAndCleanup(null);
      }
    };

    const handleConfirm = () => {
      const raw = input.value?.trim() ?? '';
      const count = parseInt(raw, 10);

      if (!Number.isInteger(count) || count < 1) {
        showToast('생성 개수는 1 이상의 정수여야 합니다.', 'error');
        input.focus();
        input.select();
        return;
      }

      if (count > 99) {
        showToast('최대 99세트까지 입력할 수 있습니다.', 'error');
        input.focus();
        input.select();
        return;
      }

      resolveAndCleanup(count);
    };

    confirmBtn.addEventListener('click', handleConfirm);

    cancelBtn.addEventListener('click', () => {
      resolveAndCleanup(null);
    });

    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay) {
        resolveAndCleanup(null);
      }
    });

    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        handleConfirm();
      }
    });

    btnGroup.appendChild(confirmBtn);
    btnGroup.appendChild(cancelBtn);

    box.appendChild(title);
    box.appendChild(desc);
    box.appendChild(input);
    box.appendChild(btnGroup);

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.addEventListener('keydown', onEsc);

    requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
  });
}
