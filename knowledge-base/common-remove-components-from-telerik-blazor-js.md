---
title: Remove Components from telerik-blazor.js
description: Learn 
type: how-to
page_title: How to Build the telerik-blazor.js File Without Some Components
slug: common-kb-remove-components-from-telerik-blazor-js
position: 
tags: telerik, blazor
ticketid: 1652093, 1632300
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                UI for Blazor, <br />
                PDF Viewert for Blazor, <br />
                Spreadsheet for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to build the `telerik-blazor.js` file without some of the components?
* How to exclude components from the Telerik Blazor JSInterop file and rebuild `telerik-blazor.js`?
* How to remove components from the client-side code of Telerik UI for Blazor?
* How to remove the Spreadsheet component from `telerik-blazor.js` in order to achieve [strict Content Security Policy compliance](slug:troubleshooting-csp)?
* How to remove the PDF Viewer component from `telerik-blazor.js` in order to avoid conflicts with other third-party tools that depend on PDF.js?
* How to reduce the file size of the Telerik Blazor JavaScript asset?


## Solution

Here are the required steps to exclude Telerik UI for Blazor components from `telerik-blazor.js` and rebuild the Telerik JSInterop file.

1. Login to your [Telerik account](https://www.telerik.com/account/).
1. [Download the source code of Telerik UI for Blazor](https://www.telerik.com/account/downloads/product-download?product=BLAZOR).
1. Read the `Readme.txt` in the root folder of the downloaded ZIP archive. It provides information about JavaScript build pre-requisites and where to find the newly built file.
1. Delete the unwanted component folder from `/javascript/src/`, for example:
    * `pdf-viewer` for the PDF Viewer
    * `spreadsheet` for the Spreadsheet
1. Remove the `export` statement for the unwanted component from `/javascript/src/main.ts`, for example:
    * `export * from './pdf-viewer/main';` for the PDF Viewer
    * `export * from './spreadsheet/main';` for the Spreadsheet
1. Remove any existing dependencies for the unwanted component from `/javascript/package.json`, for example:
    * `@progress/kendo-pdfviewer-common` for the PDF Viewer
    * `@progress/kendo-spreadsheet-common` for the Spreadsheet
1. Delete `/javascript/package-lock.json`
1. Run `npm install` in the `javascript` folder.
1. Run `gulp build-cdn` in the `javascript` folder.
1. Copy the generated `telerik-blazor.js` file to the `wwwroot` folder or your Blazor app.
1. Remove the existing `telerik-blazor.js` file registration as a [static asset](slug:getting-started/what-you-need#javascript-file) or [CDN URL](slug:common-features-cdn#javascript-urls). Register the custom `telerik-blazor.js` from `wwwroot`.

> Repeat the above steps and rebuild `telerik-blazor.js` after every [version update of Telerik UI for Blazor](slug:upgrade-tutorial).

## See Also

* [Adding Telerik UI for Blazor to a Blazor app](slug:getting-started/what-you-need)
