---
title: OpenSelectFilesDialog Doesn't Work in Safari
description: Why the FileSelect and Upload OpenSelectFilesDialog method doesn't work in Safari due to browser security restrictions.
type: troubleshooting
page_title: FileSelect and Upload OpenSelectFilesDialog Method Doesn't Work in Safari
slug: upload-kb-openselectfilesdialog-safari
position: 
tags: telerik, blazor, fileselect, upload
ticketid:
res_type: kb
components: ["upload"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                FileSelect for Blazor, <br />
                Upload for Blazor
            </td>
        </tr>
        <tr>
            <td>Browser</td>
            <td>Safari</td>
        </tr>
    </tbody>
</table>


## Description

The `OpenSelectFilesDialog` method of the FileSelect and Upload components doesn't work in Safari. Normally, the browser should pop its native file selection dialog. In Safari, this browser dialog doesn't show when the application tries to open it programmatically via C#.

## Possible Cause

The `OpenSelectFilesDialog` method is pretty simple. It uses `JSInterop` to call the `click` JavaScript method of the `<input type="file" />` element inside the component HTML output.

Safari requires the file input dialog to open programmatically as a direct result of a user action. If the file input is clicked programmatically, this must happen in JavaScript code, which handles a user event.

JSInterop cannot be directly associated with a user action, due to its nature. A .NET method itself is not directly triggered by user action. For example, an `@onclick` Blazor handler will react to the `click` user event and call a .NET handler. However, the subsequent server-client JSInterop call that executes JavaScript code will no longer have relationship with the user action that started the whole sequence.

The following example demonstrates the described phenomenon without Telerik UI for Blazor components.

>caption File Input Security in Safari

````RAZOR
@inject IJSRuntime js

<p><input type="file" id="fileInput" /></p>

<p>
    <button onclick="openFileSelect()">Open File Dialog (JavaScript)</button>
    <button @onclick="@OpenFileSelectCS">Open File Dialog (JSInterop)</button>
</p>

@* Move JavaScript code to separate JS files in production apps *@
<script suppress-error="BL9992">//
function openFileSelect() {
    var input = document.querySelector("#fileInput");
    input.focus();
    input.click();
}
//</script>

@code {
    private async Task OpenFileSelectCS()
    {
        await js.InvokeVoidAsync("openFileSelect");
    }
}
````


## Suggested Workarounds

The only possible way to open a FileSelect or Upload dialog programmatically is to use pure JavaScript and a user (client-side) event. The dialog opening call must have direct relationship to a user action, for example a button click. So, [attach the event handler with JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), instead of a Blazor directive such as `@onclick`.

>caption Open FileSelect or Upload programmatically in Safari

````RAZOR
@inject IJSRuntime js

<p>
    <TelerikButton Id="@ButtonId">Open File Dialog</TelerikButton>
</p>

<TelerikFileSelect Id="@FileSelectId" />

@* Move JavaScript code to separate JS files in production apps *@
<script suppress-error="BL9992">//
    function attachClickHandler(buttonId, fileInputId) {
        var button = document.getElementById(buttonId);
        var fileInput = document.getElementById(fileInputId);
        if (button && fileInput) {
            button.addEventListener("click", function(e) {
                fileInput.click();
            });
        }
    }
//</script>

@code {
    private string ButtonId { get; set; } = "button-id";

    private string FileSelectId { get; set; } = "fileselect-id";

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await js.InvokeVoidAsync("attachClickHandler", ButtonId, FileSelectId);
        }
        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## See Also

* [FileSelect Component](slug:fileselect-overview)
* [Upload Component](slug:upload-overview)
