import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function withSpecialChar(control: FormControl) {
  let value = control.value;
  var pattern=/06([0-9]{8})/;
  
  return null;
}

@Directive({
  selector: '[WithSpecialChar]',
  providers :[
    {
      provide : NG_VALIDATORS,
      useValue : null,
      multi: true
    }
  ]
})
export class WithSpecialCharDirective {

  constructor() { }

  withSpecCahr(){

  }

}
