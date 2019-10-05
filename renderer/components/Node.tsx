export enum CheckStatus {
  ALL = "+",
  PARTIAL = "|",
  NONE = "-"
}

export default class Node<T> {
  data: T;
  children: Node<T>[] = [];
  label: string;
  private parent?: Node<T>;
  checkStatus: CheckStatus = CheckStatus.NONE;
  fn: (cs: CheckStatus) => void | null;

  constructor(d: T, l: string) {
    this.data = d;
    this.label = l;
  }

  addChild(n: Node<T>): Node<T> {
    n.parent = this;
    this.children.push(n);
    return this;
  }
  bindOnChange(fn: (cs: CheckStatus) => void) {
    this.fn = fn;
    return () => {
      this.fn = null;
    };
  }
  toggle() {
    switch (this.checkStatus) {
      case CheckStatus.ALL:
        this.uncheck();
        break;
      case CheckStatus.PARTIAL:
      case CheckStatus.NONE:
        this.check();
        break;
    }
    this.cascadeThroughRoot(p => p.determineState());
  }

  isIndeterminate = () => this.checkStatus == CheckStatus.PARTIAL;
  isChecked = () => this.checkStatus == CheckStatus.ALL;

  printTree(str: string = "", indent: number = 0): string {
    let r =
      " ".repeat(indent) + this.checkStatus + " " + this.data.toString() + "\n";
    return this.children.reduce((a, b) => a + b.printTree(a, indent + 2), r);
  }

  private cascadeThroughRoot(f: (p: Node<T>) => void) {
    if (this.parent) {
      f(this.parent);
      this.parent.cascadeThroughRoot(f);
    }
  }

  private determineState() {
    let partial = false;
    let all = true;
    for (const c of this.children) {
      switch (c.checkStatus) {
        case CheckStatus.ALL:
          partial = true;
          break;
        case CheckStatus.PARTIAL:
          partial = true;
          all = false;
          break;
        case CheckStatus.NONE:
          all = false;
      }
    }
    if (all) this.checkStatus = CheckStatus.ALL;
    else if (partial) this.checkStatus = CheckStatus.PARTIAL;
    else this.checkStatus = CheckStatus.NONE;
    this.fn && this.fn(this.checkStatus);
  }

  private check() {
    this.checkStatus = CheckStatus.ALL;
    this.children.forEach(c => c.check());
    this.fn && this.fn(this.checkStatus);
  }

  private uncheck() {
    this.checkStatus = CheckStatus.NONE;
    this.children.forEach(c => c.uncheck());
    this.fn && this.fn(this.checkStatus);
  }
}
