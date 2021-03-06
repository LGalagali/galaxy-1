import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'copy-to-clipboard',
    templateUrl: './clipboard.component.html',
    styleUrls: ['./clipboard.component.less'],
})
export class ClipboardComponent implements OnInit {
    // Used to track which component is being loaded
    componentName = 'ClipboardComponent';

    constructor() {}

    _copyText: string;
    guid: string;

    @Input()
    set copyText(data: string) {
        this._copyText = data;
    }
    get copyText(): string {
        return this._copyText;
    }

    ngOnInit() {
        this.guid = this.calcGuid();
    }

    s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    calcGuid(): string {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    copyToClipboard() {
        const element = document.getElementById(this.guid);
        const val = element.textContent;
        const txtArea = document.createElement('textarea');
        txtArea.setAttribute('readonly', '');
        txtArea.style.position = 'absolute';
        txtArea.style.left = '-9999px';
        document.body.appendChild(txtArea);
        txtArea.value = val;
        txtArea.select();
        document.execCommand('copy');
        document.body.removeChild(txtArea);
    }
}
