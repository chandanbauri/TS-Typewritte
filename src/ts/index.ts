type TST_CALL_BACK = () => Promise<void>
type TST_QUEUE = Array<TST_CALL_BACK>

class TsTypeWritter {
  private TSTQueue: TST_QUEUE = []
  private TSTElement: HTMLElement
  private TSTwrittingSpeed: number = 50
  private TSTdeletingSpeed: number = 50
  private loop: boolean = false
  constructor(element: HTMLElement, writtingSpeed = 50, deletingSpeed = 50, loop = false) {
    this.TSTElement = document.createElement("div")
    element.appendChild(this.TSTElement)
    this.TSTwrittingSpeed = writtingSpeed
    this.TSTdeletingSpeed = deletingSpeed
    this.loop = loop
  }
  private push(cb: TST_CALL_BACK) {
    this.TSTQueue.push(cb)
  }
  private async exec() {
    if (!this.TSTQueue.length) {
      this.write("") // Message If chaining is wrong
      return
    }
    let cb = this.TSTQueue.shift()
    while (cb) {
      await cb()
      if (this.loop) {
        this.TSTQueue.push(cb)
      }
      cb = this.TSTQueue.shift()
    }
  }
  write(sentence: string) {
    this.push(
      () =>
        new Promise((resolve, reject) => {
          let count = 0
          let writeId = setInterval(() => {
            this.TSTElement.innerText += sentence[count]
            count++
            if (sentence.length == count) {
              clearInterval(writeId)
              resolve()
            }
          }, this.TSTwrittingSpeed)
        }),
    )
    return this
  }
  pause(duration: number) {
    this.push(
      () =>
        new Promise((resolve, reject) => {
          let pauseId = setTimeout(() => {
            clearTimeout(pauseId)
            resolve()
          }, duration)
        }),
    )
    return this
  }
  delete(positions: number) {
    this.push(
      () =>
        new Promise((resolve, reject) => {
          let count = 0
          let deleteId = setInterval(() => {
            let existingText = this.TSTElement.innerText
            this.TSTElement.innerText = existingText.substring(0, existingText.length - 1)
            count++
            if (positions == count) {
              clearInterval(deleteId)
              resolve()
            }
          }, this.TSTdeletingSpeed)
        }),
    )
    return this
  }
  deleteAll(deletespeed: number = 0) {
    if (deletespeed) {
      this.TSTdeletingSpeed = deletespeed
    }
    this.push(
      () =>
        new Promise((resolve, reject) => {
          let count = 0
          let deleteId = setInterval(() => {
            let existingText = this.TSTElement.innerText
            this.TSTElement.innerText = existingText.substring(0, existingText.length - 1)
            if (!existingText.length) {
              clearInterval(deleteId)
              resolve()
            }
          }, this.TSTdeletingSpeed)
        }),
    )
    return this
  }
  start() {
    this.exec()
  }
}

let container = document.querySelector(".typewritter-container") as HTMLElement
const typewritter = new TsTypeWritter(container, 250, 100, true)
typewritter
  .write("Hello world")
  .pause(2000)
  .write("\n\nWellcome to TS typewritter")
  .delete(28)
  .write("\n\nDid you have fun ?")
  .pause(2900)
  .deleteAll()
  .start()
