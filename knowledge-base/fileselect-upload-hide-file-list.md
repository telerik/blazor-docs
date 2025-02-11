---
title: Hide the Upload File List
description: How to remove, hide or disable the selected files list below the FileSelect / Upload button? How to resize or remove the frame around the FileSelect / Upload button?
type: how-to
page_title: How to Hide the FileSelect / Upload Filename List
slug: fileselect-upload-kb-hide-file-list
position:
tags: fileselect, upload, hide, file list
ticketid: 1555847, 1558501
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                FileSelect for Blazor, <br />
                Upload for Blazor <br />
            </td>
        </tr>
    </tbody>
</table>


## Description

How to apply custom CSS styles to the FileSelect and Upload components?

How to hide the selected files list? How to remove, hide or disable the filename list below the "Select Files" button?

How to resize or remove the frame around the FileSelect and Upload button?


## Solution

Add a custom CSS class to the FileSelect / Upload and [override the theme styles](slug:themes-override).

1. Set the `Class` parameter. The custom class will render in the `<div class="k-upload">` element.
1. Implement custom styles, which remove the component border, padding, file names, status icon.

>caption Apply custom CSS styles to FileSelect and Upload

<div class="skip-repl"></div>

````CSS
FileSelect:
<TelerikFileSelect Class="button-only" />

Upload:
<TelerikUpload Class="button-only" />

<style>
    .k-upload.button-only {
        /* remove component border */
        border-width: 0;
        /* prevent expansion to 100% */
        display: inline-block;
    }

    .k-upload.button-only .k-dropzone {
        /* remove space around button */
        padding: 0;
        /* remove background around button */
        /* use if Upload status below is NOT hidden */
        background-color: transparent;
    }

    /* hide selected files */
    .k-upload.button-only .k-upload-files,
    /* hide Upload status */
    .k-upload.button-only .k-upload-status,
    /* hide drop hint */
    .k-upload.button-only .k-dropzone-hint{
        display: none;
    }
</style>
````
