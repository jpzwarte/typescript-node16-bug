import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html, LitElement } from "lit";
export class Foo extends ScopedElementsMixin(LitElement) {
    render() {
        return html `HOHOHO`;
    }
}
