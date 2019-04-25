// tslint:disable:variable-name
// tslint:disable:object-literal-sort-keys

import { ITaskInternal } from './index';

export interface IPopupOptions {
    target_element: SVGGraphicsElement;
    position: string;
    task: ITaskInternal;
    title: string;
    subtitle: string;
}

export default class Popup {
    private parent: Element & ElementCSSInlineStyle;
    private custom_html: (task: ITaskInternal) => string;
    private title: Element;
    private subtitle: Element;
    private pointer: Element & ElementCSSInlineStyle;

    constructor(parent: Element & ElementCSSInlineStyle, custom_html: (task: ITaskInternal) => string) {
        this.parent = parent;
        this.custom_html = custom_html;
        this.make();
    }

    public make() {
        this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

        this.hide();

        this.title = this.parent.querySelector('.title');
        this.subtitle = this.parent.querySelector('.subtitle');
        this.pointer = this.parent.querySelector('.pointer');
    }

    public show(options: Partial<IPopupOptions>) {
        if (!options.target_element) {
            throw new Error('target_element is required to show popup');
        }
        if (!options.position) {
            options.position = 'left';
        }
        const target_element = options.target_element;

        if (this.custom_html) {
            let html = this.custom_html(options.task);
            html += '<div class="pointer"></div>';
            this.parent.innerHTML = html;
            this.pointer = this.parent.querySelector('.pointer');
        } else {
            // set data
            this.title.innerHTML = options.title;
            this.subtitle.innerHTML = options.subtitle;
            this.parent.style.width = this.parent.clientWidth + 'px';
        }

        // set position
        let position_meta;
        if (target_element instanceof HTMLElement) {
            position_meta = target_element.getBoundingClientRect() as DOMRect;
        } else if (target_element instanceof SVGElement) {
            position_meta = options.target_element.getBBox();
        }

        if (options.position === 'left') {
            const parentHeight = this.parent.clientHeight + 10;
            this.parent.style.left = position_meta.x + 'px';
            if (position_meta.y < parentHeight) {
                this.parent.style.top = position_meta.y + 50 + 'px';
            } else {
                this.parent.style.top = position_meta.y - parentHeight + 'px';
            }

            this.pointer.style.transform = 'rotateZ(90deg)';
            this.pointer.style.left = '-7px';
            this.pointer.style.top = '2px';
        }

        // show
        this.parent.style.opacity = 1 as any;
    }

    public hide() {
        this.parent.style.opacity = 0 as any;
    }
}
