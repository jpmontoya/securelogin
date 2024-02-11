import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'protectXss'
})
export class ProtectXssPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(value: string | null): SafeHtml {
    if(value === null){
      return '';
    }
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
