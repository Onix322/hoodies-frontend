import {Injectable, Input, Predicate} from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class FormValidator {

  public invalidBorderValue = "1px solid red"
  public validBorderValue = "1px solid green"


  public validate(nameForm: string, exceptNames?: Array<string>){

    let validArrays = 0;

    if(nameForm.trim() == "") {
      console.error("Form's name invalid: " + nameForm)
    }

    const form: HTMLFormElement | null = document.forms.namedItem(nameForm)

    if(!form) {
      console.error(nameForm + " form not found")
      return
    }

    const inputs: HTMLCollectionOf<HTMLInputElement> = form.getElementsByTagName('input')
    const selects: HTMLCollectionOf<HTMLSelectElement> = form.getElementsByTagName('select')
    const textAreas: HTMLCollectionOf<HTMLTextAreaElement> = form.getElementsByTagName('textarea')

    if(this.checkArray(inputs, exceptNames)){
      validArrays++
    }
    if(this.checkArray(selects, exceptNames)){
      validArrays++
    }
    if(this.checkArray(textAreas, exceptNames)){
      validArrays++
    }

    return validArrays == 3;
  }

  public checkArray(array: HTMLCollectionOf<HTMLInputElement> | HTMLCollectionOf<HTMLSelectElement> | HTMLCollectionOf<HTMLFormElement> | HTMLCollectionOf<HTMLTextAreaElement>, exceptNames?: Array<string>){

    let validElementCounter = 0;

    if(!array) {
      console.error(array + " is undefined")
      return
    }

    for (const element of array) {
      if(!element) continue
      if(exceptNames?.some(name => name == element.name)){
        validElementCounter++
        continue
      }
      if(this.checkElement(element)){
        validElementCounter++
      }
    }

    console.log('validatorArray', validElementCounter == array.length, validElementCounter)
    return validElementCounter == array.length;
  }

  public checkElement(element: HTMLInputElement | HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement): boolean{

    element.addEventListener('input', () => {
      this.elementChangeStyle(element)
    })

    element.addEventListener("focus", () =>{
      this.elementChangeStyle(element)
    })

    return element.checkValidity();
  }

  public validateElementIf(elementName: string, callback: Predicate<boolean>): boolean{

    let element: HTMLElement | null = document.getElementById(elementName)

    if(!element){
      throw Error("Invalid element id")
    }

    let message: HTMLParagraphElement = this.getMessageFromElement(element)

    if (callback(true)) {
      this.deleteAllInvalidMessages()
      element.style.border = this.validBorderValue;
      return true
    } else {
      this.deleteAllInvalidMessages()
      element.parentElement?.appendChild(message)
      element.style.border = this.invalidBorderValue;
      return false
    }
  }

  private getMessageFromElement(element: HTMLInputElement | HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement | HTMLElement): HTMLParagraphElement{
    const message: HTMLParagraphElement = document.createElement('p')
    message.innerHTML = <string>element.dataset['invalidMessage']
    message.className = "invalid-message"
    message.style.color = "red"
    message.style.margin = "0"

    return message
  }

  private elementChangeStyle(element: HTMLInputElement | HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement){

    let message: HTMLParagraphElement = this.getMessageFromElement(element)

    if (element.checkValidity()) {
      this.deleteAllInvalidMessages()
      element.style.border = this.validBorderValue;
    } else {
      this.deleteAllInvalidMessages()
      element.parentElement?.appendChild(message)
      element.style.border = this.invalidBorderValue;
    }
  }

  private deleteAllInvalidMessages(){
    document.querySelectorAll(".invalid-message").forEach(mess => {
      mess.remove()
    })
  }
}
