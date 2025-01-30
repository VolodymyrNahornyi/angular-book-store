import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') OnMouseEnter(){
    this.renderer.addClass(this.element.nativeElement, 'scale-on-hover');
  }

  @HostListener('mouseout') OnMouseOut(){
    this.renderer.removeClass(this.element.nativeElement, 'scale-on-hover');
  }
}
