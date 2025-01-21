import {Injectable, Input, Predicate} from '@angular/core';


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
///////////////////////////////////////////////////
// TO MAKE IT WORK YOU NEED TO:
//
//1. Implement in the component (!where the form is located!) AfterViewInit interface
//2. you need to add attribute validators in your from elements (ex: input has minlength)
//3. Add required attribute if you want to be mandatory
//4. add 'data-invalid-message' for custom invalid messages
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



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

    //added *.length == 0 because some of them may not exist so the list is empty

    if(inputs.length == 0 || this.checkArray(inputs, exceptNames)){
      validArrays++
    }
    if(selects.length == 0 || this.checkArray(selects, exceptNames)){
      validArrays++
    }
    if(textAreas.length == 0 || this.checkArray(textAreas, exceptNames)){
      validArrays++
    }

    console.log(validArrays)
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
      this.deleteAllInvalidMessages(element)
      element.style.border = this.validBorderValue;
      return true
    } else {
      if(!this.invalidMessageExist(element)){
        element.parentElement?.appendChild(message)
      }
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
      this.deleteAllInvalidMessages(element)
      element.style.border = this.validBorderValue;
    } else {
      if(!this.invalidMessageExist(element)){
        element.parentElement?.appendChild(message)
      }
      element.style.border = this.invalidBorderValue;
    }
  }

  private invalidMessageExist(element: HTMLInputElement | HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement | HTMLElement){

    const children = element.parentElement?.children
    if(!children) return false
    return Array.from(children)
      .some(child => child.classList.contains("invalid-message"))
  }

  private deleteAllInvalidMessages(element: HTMLInputElement | HTMLFormElement | HTMLSelectElement | HTMLTextAreaElement | HTMLElement){
    const children = element.parentElement?.children
    if(!children) return
    Array.from(children)
      .some(child => {
        if(child.classList.contains("invalid-message")){
          child.remove()
        }
      })
  }
}
