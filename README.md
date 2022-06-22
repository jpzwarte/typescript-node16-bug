# typescript-node16-bug

Run `npm install` and `tsc`. This uses `"moduleResolution": "node"`.

The output in `index.d.ts` will be:

```
declare const Foo_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost>;
```

The reference to the `ScopedElementsHost` type is correct and clicking on it in an IDE works.

Change `tsconfig.json` to `"moduleResolution": "node16"` and run `tsc` again.

Suddenly we get 3 errors:

```
index.ts:2:50 - error TS1471: Module 'lit' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

2 import { html, LitElement, TemplateResult } from "lit";
                                                   ~~~~~

index.ts:4:14 - error TS2742: The inferred type of 'Foo' cannot be named without a reference to './node_modules/@open-wc/scoped-elements/types/src/types'. This is likely not portable. A type annotation is necessary.

4 export class Foo extends ScopedElementsMixin(LitElement) {
               ~~~

index.ts:4:14 - error TS2841: The type of this expression cannot be named without a 'resolution-mode' assertion, which is an unstable feature. Use nightly TypeScript to silence this error. Try updating with 'npm install -D typescript@next'.

4 export class Foo extends ScopedElementsMixin(LitElement) {
               ~~~
```

In a different project, i wasn't getting these errors. In the other project (not this reproduction), i got the following in `index.d.ts`:

```
declare const Foo_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("node_modules/@open-wc/scoped-elements/types/src/types.js").ScopedElementsHost>;
```

Notice the extra `node_modules/` folder in the second import. This breaks other code, because it can no longer find the file (`types.d.ts`).
