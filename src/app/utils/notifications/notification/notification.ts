export class Notification{

  public static notify(message: string){
    this.generateElement(message)
  }

  public static notifyValid(message: string){
    this.generateElement(message).classList.add("notification-valid")
  }

  public static notifyInvalid(message: string){
    this.generateElement(message).classList.add("notification-invalid")
  }

  private static generateElement(message: string){
    const p = document.createElement('h3')
    p.innerText = message;
    p.className = "notification"

    this.deleteAll()

    setTimeout(() => {
      p.classList.add("notification-active")
    }, 100)

    setTimeout(() =>{
      p.remove()
    }, 4000)

    return document.body.appendChild(p)
  }

  private static deleteAll(){
    Array.from(document.getElementsByClassName("notifications")).forEach(notify =>{
      notify.remove()
    })
  }
}
