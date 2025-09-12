---
title: JavaScript Errors
page_title: JavaScript Errors
description: Troubleshooting JavaScript errors in the UI for Blazor suite.
slug: troubleshooting-js-errors
tags: js,errors,interop,missing
published: True
position: 2
---

# JavaScript Errors

This page provides solutions for JavaScript errors that you may encounter while working with Telerik UI for Blazor components.

* [`TelerikBlazor` was undefined](#telerikblazor-was-undefined)
* [`init[Component]` was undefined](#init-component-was-undefined) (also applies to errors about missing Telerik JavaScript functions)
* [Cannot read properties of null (reading `addEventListener`)](#cannot-read-properties-of-null-reading-addeventlistener)
* [SyntaxError: Unexpected token](#syntaxerror-unexpected-token)
* [KeyNotFoundException: The given key `inputElementValue` was not present](#keynotfoundexception-the-given-key-inputelementvalue-was-not-present)
* [Object doesn't support property or method `assign`](#object-doesn-t-support-property-or-method-assign)
* [Microsoft.JSInterop.JSException: Maximum call stack size exceeded](#maximum-call-stack-size-exceeded)

## TelerikBlazor was undefined

You may get runtime error messages in the browser console similar to the following:

* `Could not find 'TelerikBlazor.getLocationHost' ('TelerikBlazor' was undefined).`
* `Microsoft.JSInterop.JSException: Could not find 'TelerikBlazor' in 'window'.`

If you get such errors, the reason may be:

* [The `telerik-blazor.js` JS Interop file is missing or the URL is wrong](#missing-file)
* [The `defer` attribute causes the script to load and execute too late](#defer-attribute)
* [A required order of the HTML tags in the web page](#html-tags-order)
* [TypeScript `exports` workaround break Telerik Blazor](#typescript)
* [A result of a syntax error in old browser](#syntaxerror-unexpected-token)

### Missing File

You can verify if `telerik-blazor.js` is loaded successfully by inspecting the **Network** tab of your browser developer tools. The following list reveals some common causes for a missing JS Interop file. Most of the mentioned issues result in failing requests for non-Telerik static assets as well.

* The application is missing references to the [required assets](slug:getting-started/what-you-need#css-theme-and-javascript-files).
* The request for `telerik-blazor.js` fails due to incorrect or incompatible values in:
    * `<base href="..." />` in `App.razor`
    * `launchUrl` and `applicationUrl` in `launchSettings.json`
* [Static assets are not enabled](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/static-files). Starting from .NET 9, there are two different ways to enable them.
* Static assests are enabled, but the `ASPNETCORE_ENVIRONMENT` variable is not set to `Development` in `launchSettings.json`. In such cases, you can load [assets from CDN](slug:common-features-cdn) or enable [static assets for non-`Development` environments](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/static-files#static-files-in-non-development-environments).
* The network setup blocks access to remote URLs like a CDN. In such cases, you have two options:
    * Ask your network administrators to allow the remote host.
    * Load [static assets](slug:getting-started/what-you-need#css-theme-and-javascript-files) from the NuGet package or from the `wwwroot` app folder.
* A problem occurs during deployment. See the [Deployment Troubleshooting](slug:deployment-troubleshooting) article for more details.

### Defer Attribute

Sometimes, the JS Interop file is referenced correctly and returns successfully, but occasionally you get the error. This indicates a timing issue (for example, low machine performance or slow network) that causes the script to load and be parsed too late, after it is needed.

One solution is to remove the `defer` attribute of the `<script>` tag that registers `telerik-blazor.js`. On the other hand, `defer` improves the performance of your app by loading the script asynchronously. That's why a better option is to [keep the `defer` attribute and start the client-side Blazor framework manually](slug:getting-started/what-you-need#javascript-file).

### HTML Tags Order

You can get the error when the application is navigating from an interactive page. If this is the case, register the `telerik-blazor.js` after the `<base href="/" />` in the `<head>` of the web page:

<div class="skip-repl"></div>

```HTML
<head>
    ...
    <base href="/" />
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>
    ...
</head>
```

### TypeScript

By default, TypeScript results in compiled code that needs the `exports` object, and that is not available in Blazor by default, so it throws an error. A common workaround for that (defining an empty `exports` object) causes errors from the Telerik JS Interop files. You can read more about the errors and the solutions in the [TypeScript Exports error breaks Telerik Blazor](slug:common-kb-typescript-exports) Knowledge Base article.

## init[Component] was undefined

The error message may mention a component or feature initialization method, for example:

* `Microsoft.JSInterop.JSException: Could not find 'TelerikBlazor.initCard' ('initCard' was undefined)`.
* `Error: Microsoft.JSInterop.JSException: Could not find 'initGrid' in 'window.TelerikBlazor'.`
* `Error: Could not find 'TelerikBlazorPopup' in 'window'.`
* `Error: Could not find 'TelerikBlazor.columnResizableSetColumns' ('columnResizableSetColumns' was undefined).`
* Any error referring to a Telerik component or feature that cannot be found in the JS code.

Such an error means that the `telerik-blazor.js` script file version does not match the NuGet package version. As a result, the script does not include all components, features or correct method names.

If you use our CDN to load the script file, make sure the file URL matches the package version. If you load the script as a local file from the `wwwroot` folder, then replace the file. See the [Upgrade Process](slug:upgrade-tutorial#upgrade-process) article for details.

Another common reason is browser caching, if the file comes from the static NuGet assets or a local folder. Clear the browser cache or "hard refresh" the page to fix that. Consider a [cache buster for the Telerik CSS and JavaScript files](slug:common-kb-browser-cache-buster).

## Cannot read properties of null (reading 'addEventListener')

The error message may also mention `removeEventListener` instead of `addEventListener`.

There are two known reasons for this JavaScript error.

One is related to *UI for Blazor update in WebAssembly (WASM) projects*. See the article [`TypeError: Cannot read properties of null (reading 'addEventListener')`](slug:common-kb-cannot-read-properties-of-null-reading-addeventlistener).

Another possible cause is a *race condition* during fast multiple recreations of components, or fast navigation. If this happens, our JavaScript code may try to access a DOM element that no longer exists. The solution is to avoid fast duplicate UI refresh, for example:

* Do not call `StateHasChanged()` inside `EventCallback` methods (e.g. Button click handlers). Blazor executes `StateHasChanged()` automatically in such cases.
* Throttle the user behavior, so that rapid subsequent navigation is not possible.

## SyntaxError: Unexpected token

This section applies to JavaScript errors similar to `Unexpected token` or `Invalid character`. The exact token can vary, but it's usually a part of the modern JavaScript syntax, for example:

* `||=` ([logical OR assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment))
* `#` ([private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields))
* `?.` ([optional chaining](https://en.wikipedia.org/wiki/ECMAScript_version_history#ES2020))

Such errors indicate an outdated browser version, WebView, or emulator, which doesn't support recent ECMAScript standards.
[Microsoft Blazor supports only current browsers](https://learn.microsoft.com/en-us/aspnet/core/blazor/supported-platforms). The [browser support policy for Telerik UI for Blazor](slug:system-requirements) is the same.

A syntax error will cause the browser to discard the whole `telerik-blazor.js` file, which will also lead to error `Could not find 'TelerikBlazor.initMediaQuery' ('TelerikBlazor' was undefined)`.

## KeyNotFoundException: The given key inputElementValue was not present

The full exception message is `System.Collections.Generic.KeyNotFoundException: The given key 'inputElementValue' was not present in the dictionary.`

This error indicates that [the app is using an old or wrong version of the `telerik-blazor.js` file](slug:common-kb-keynotfoundexception-inputelementvalue), for example, after a component version upgrade.

## Object doesn't support property or method 'assign'

Under IE, you may get errors similar to `Object doesn't support property or method 'assign'` or errors that relate other modern JS features that are not supported under IE. The reason is that we use modern code that may not work under IE - it is not one of the [browsers we support](slug:system-requirements#browser-support), and WebAssembly does not work on it anyway, so modern Blazor apps won't run on IE regardless.

## Maximum call stack size exceeded

The error indicates that a [.NET 8 app is using a `telerik-blazor.js` file that is for version `4.5.0` or earlier](slug:common-kb-maximum-call-stack-exceeded). If the Telerik UI for Blazor package version is up-to-date, a possible cause for the error is browser cache and you may need to [add a cache buster for the Telerik CSS and JavaScript files](slug:common-kb-browser-cache-buster).

## See Also

* [Prevent browser caching during version upgrades](slug:common-kb-browser-cache-buster)
