---
title: TypeScript Exports error breaks Telerik Blazor
description: TypeScript Exports can cause Could not find 'TelerikBlazor' in 'window' - see how to solve it
type: troubleshooting
page_title: TypeScript Exports error breaks Telerik Blazor
slug: common-kb-typescript-exports
position: 
tags: 
ticketid: 1483634
res_type: kb
---

## Description

Using TypeScript to write (and generate) JavaScript code used in the Blazor application can cause two types of errors - one where the default compiled result throws exceptions, an if a common workaround for that is added - it can lead to issues with the Telerik JS Interop file.

This article explains the errors, their origin and how you can avoid them.


## Steps to Reproduce

To reproduce the basic error, just add a TypeScript file, `export` a function from it, and reference the resulting JS file:

>caption Sample TypeScript file - `wwwroot/js/MyScript.ts`

````TypeScript
export function test() {
    alert("test");
}
````

>caption Referencing the resulting JS file in the index file

````CSHTML
    . . .
    <script src="js/MyScript.js"></script>
    <script>
        test();
    </script>
</body>
````

>caption Resulting output in the JS file (generated through the `Microsoft.TypeScript.MSBuild` package Visual Studio offers to install for you to build TS, other compilers often have similar default output)

````MyScript.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
function test() {
    alert("test");
}
exports.test = test;
//# sourceMappingURL=MyScript.js.map
````

## Error Message

If you run this as-is, the error will be something like

>caution `Uncaught ReferenceError: exports is not defined`

Then, if you add a workaround that is commonly offered on the Internet for that, namely:

>caption Commonly shared workaround for the error above

````JavaScript
    <script>
        var exports = {}; // defining an empty exports object is that common workaround
    </script>
    
    <script src="js/MyScript.js"></script>
    <script>
        test();
    </script>
</body>
````

you will get an error similar to

>warning `Microsoft.JSInterop.JSException: Could not find 'TelerikBlazor' in 'window'.`

## Cause\Possible Cause(s)

The cause for the first error is that TypeScript, by default, produces JavaScript code that is designed for use through various package managers that cater to the `exports` and `modules`. Such tools are usully `Node.js` or `WebPack`. Thus, the very first meaninful line of code (`Object.defineProperty(exports, "__esModule", { value: true });`) relies on the presence of the `exports` object in the current (or global) scope. By default, that's not available in Blazor.

The cause for the second error is that the override of the commonly used `exports` object affects the JS Interop code used by the Telerik components and can also harm other code that relies on this object - its name is used by convention and can impact various packages.

## Solution

To ensure that the Telerik components continue to function, you must avoid overriding the `exports` object.

To get scripts running from TypeScript files, you may want to look into using tooling that will not produce code that breaks and requires hacks. Perhaps the simplest way is to add a `tsconfig.json` file next to the TypeScript files and disable exports (then, of course, don't use `exports` in the TypeScript code):

>caption Sample `tsconfig.json` to disable generation of exports so you don't get the first error

````JSON
{
  "compilerOptions": {
    "module": "none"
  }
}
````

>caption Updated `MyScript.ts` file without exports

````TypeScript
function test() {
    alert("test");
}
````

>caption Result from the compiled TypeScript

````JavaScript
function test() {
    alert("test");
}
````

## Notes

There can be other reasons for getting errors related to the Telerik JS Interop files, and you can read more about them in the [JavaScript Errors]({%slug troubleshooting-js-errors%}) article.

