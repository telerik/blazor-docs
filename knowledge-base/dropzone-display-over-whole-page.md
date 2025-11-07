---
title: Display DropZone Over the Whole Page
description: Learn how to show and expand a Telerik DropZone for Blazor over the whole page, so that the user can drag and drop a file from their device anywhere on the screen.
type: how-to
page_title: How To Display DropZone Over the Whole Page
slug: dropzone-kb-display-over-whole-page
tags: telerik, blazor, dropzone, fileselect, upload
ticketid: 1703123
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>DropZone for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This article answers the following questions:

* How to display a Telerik Blazor DropZone over the whole web page?
* How to expand a DropZone component, so that it occupies the full width and height of the browser viewport? This should happen when the user drags a file from their device over the web page.

## Solution

To display a Telerik DropZone over the whole web page, use the component [`Class` parameter](slug:dropzone-overview#styling-and-appearance) to apply styles that expand the DropZone to cover (overlay) all the other content.

To show the DropZone only while the user is dragging a file over the page, use the [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event) and [`dragleave`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave_event) JavaScript events of the `document` or another suitable element. [Call a .NET method with JSInterop](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript) that renders the DropZone conditionally.

The following example can use either the Telerik FileSelect or Upload component for Blazor. The image preview is optional and its purpose is to demonstrate successful file handling by the DropZone. When using the FileSelect in a Blazor Server app, make sure to [increase the maximum SignalR message size](slug:common-kb-increase-signalr-max-message-size).

Make sure to rename the `__Main` type in the `DotNetObjectReference` to the actual Razor component that you are using.

>caption Display DropZone over the whole page during file drag

````RAZOR
@using System.IO

@implements IDisposable

@inject IJSRuntime js

@if (ShouldRenderDropZone)
{
    <TelerikDropZone Id="@DropZoneId" Height="100%" Class="full-page-dropzone" />
}

<style>
    .full-page-dropzone {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 11000; /* Telerik Window z-indexes start from 10,000. LoaderContainer z-index is 20,000. */
    }

    .full-page-dropzone .k-dropzone-inner {
        background-color: #fafafa88;
    }
</style>

<TelerikForm Model="@Employee"
             Width="600px">
    <FormItems>
        <FormItem Field="@nameof(Person.FirstName)" LabelText="First Name"></FormItem>
        <FormItem Field="@nameof(Person.LastName)" LabelText="Last Name"></FormItem>
        <FormItem Field="@nameof(Person.BirthDate)" LabelText="Birth Date"></FormItem>
        <FormItem Field="@nameof(Person.Photo)">
            <Template>
                <label for="photo" class="k-label k-form-label">Photo</label>
                <div class="k-form-field-wrap">
                    @if (!string.IsNullOrEmpty(Employee.Photo))
                    {
                        <img src="@Employee.Photo" style="max-width:100px;max-height:100px;" />
                    }
                    <TelerikFileSelect AllowedExtensions="@ImageFileExtensions"
                                       DropZoneId="@DropZoneId"
                                       Id="photo"
                                       MaxFileSize="@MaxImageSize"
                                       Multiple="false"
                                       OnSelect="@OnFileSelect"
                                       OnRemove="@((FileSelectEventArgs args) => Employee.Photo = string.Empty)"/>
                </div>
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    var dotNet;
    var dragTimer;

    function saveDotNetRef(dotNetRef) {
        dotNet = dotNetRef;
        document.addEventListener("dragover", onDragOver);
        document.addEventListener("dragleave", onDragLeave);
    }

    function toggleDropZone(flag) {
        dotNet.invokeMethodAsync("ToggleDropZone", flag);
    }

    function onDragOver(e) {
        var dt = e.dataTransfer;
        if (dt && dt.types && (dt.types.indexOf ? dt.types.indexOf("Files") != -1 : dt.types.contains("Files"))) {
            toggleDropZone(true);
            window.clearTimeout(dragTimer);
        }
    }

    function onDragLeave(e) {
        dragTimer = window.setTimeout(function() {
            toggleDropZone(false);
        }, 200);
    }

    function detachDragEvents() {
        document.removeEventListener("dragover", onDragOver);
        document.removeEventListener("dragleave", onDragLeave);
    }
</script>

@code {
    // Replace __Main with your Razor component type
    private DotNetObjectReference<__Main>? DotNetRef { get; set; }

    private string DropZoneId => "my-dropzone";

    private bool ShouldRenderDropZone { get; set; }

    private List<string> ImageFileExtensions { get; set; } = new List<string>() { ".jpg", ".jpeg", ".png", ".gif" };
    private long? MaxImageSize { get; set; } = 16 * 1024 * 1024;

    private async Task OnFileSelect(FileSelectEventArgs args)
    {
        FileSelectFileInfo file = args.Files.First();

        if (!file.InvalidExtension && !file.InvalidMaxFileSize)
        {
            var imageBytes = new byte[file.Size];
            await using MemoryStream ms = new MemoryStream(imageBytes);
            await file.Stream.CopyToAsync(ms);

            Employee.Photo = $"data:image/{file.Extension};base64,{Convert.ToBase64String(ms.ToArray())}";
        }

        ShouldRenderDropZone = false;
    }

    [JSInvokable("ToggleDropZone")]
    public void ToggleDropZone(bool shouldRender)
    {
        ShouldRenderDropZone = shouldRender;

        StateHasChanged();
    }

    protected override void OnInitialized()
    {
        DotNetRef = DotNetObjectReference.Create(this);
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1); // ensure HTML is ready
            await js.InvokeVoidAsync("saveDotNetRef", DotNetRef);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public void Dispose()
    {
        DotNetRef?.Dispose();

        _ = js.InvokeVoidAsync("detachDragEvents");
    }

    private Person Employee { get; set; } = new();

    public class Person
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }

        public string Photo { get; set; } = string.Empty;
    }
}
````

## See Also

* [DropZone Overview](slug:dropzone-overview)
* [Preview Selected or Uploaded Files](slug:upload-kb-preview-image)
* [Form Item Template](slug:form-formitems-template)
