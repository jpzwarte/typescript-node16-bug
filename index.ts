import { ScopedElementsMixin } from "@open-wc/scoped-elements"
import { html, LitElement, TemplateResult } from "lit";

export class Foo extends ScopedElementsMixin(LitElement) {
  render(): TemplateResult {
    return html`HOHOHO`;
  }
}
