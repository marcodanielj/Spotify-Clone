import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit {

  // This button component acts exactly as a SwiftUI view, you can call it inside another component's html
  // and pass its arguments, the view (this button) will show its html contents using its css properties and behave
  // using its typescript logic inside whatever component calls it. 

  // this is how you declare a parameter in angular and its default value
  // the button name can now be passed as an argument when something calls it

  @Input()
  buttonName = 'Botão';

  @Input()
  buttonType = 'none';

  @Input()
  isSelected = false;

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.click.emit();
  }

}
