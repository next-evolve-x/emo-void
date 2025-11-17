import {Component, ElementRef, ViewChild} from '@angular/core';
import {gsap} from 'gsap';
import SplitType from 'split-type';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-void-animator',
  templateUrl: './void-animator.component.html',
  styleUrls: ['./void-animator.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class VoidAnimatorComponent {
  inputText = '';

  @ViewChild('animationContainer', { static: true })
  animationContainer!: ElementRef<HTMLDivElement>;
  triggerVoid() {
    const text = this.inputText.trim();
    if (!text) return;

    const container = this.animationContainer.nativeElement;
    container.innerHTML = '';

    // ✅ 安全拆分：保留空格和换行
    const chars = text.split('').map(c =>
      c === ' ' ? '\u00A0' :   // &nbsp;
        c === '\n' ? '↵' :       // 可视化换行
          c
    );

    const charElements: HTMLElement[] = [];

    chars.forEach(char => {
      const el = document.createElement('span');
      el.textContent = char;
      el.className = 'char';
      el.style.position = 'absolute';
      el.style.left = Math.random() * container.offsetWidth + 'px';
      el.style.top = Math.random() * container.offsetHeight + 'px';
      el.style.opacity = '1';
      container.appendChild(el);
      charElements.push(el); // ✅ 确保推入的是 HTMLElement
    });

    // 🔒 关键：检查是否真的有元素
    if (charElements.length === 0) {
      console.warn('No characters created');
      return;
    }

    // ✅ 使用 validTargets
    gsap.to(charElements, {
      duration: 1.8,
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        return (contRect.width / 2) - (rect.left - contRect.left + rect.width / 2);
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        return (contRect.height / 2) - (rect.top - contRect.top + rect.height / 2);
      },
      scale: 0,
      opacity: 0,
      ease: 'power2.in',
      stagger: 0.015,
      onComplete: () => {
        charElements.forEach(el => el.remove());
        this.inputText = '';
        console.log('[EmoVoid] Successfully voided');
      }
    });
  }
}
