---
title: Editor Focus Event
description: Learn how to subscribe to the Editor focus event.
type: how-to
page_title: How to Handle the Editor Focus Event
slug: editor-kb-focus-event
tags: telerik, blazor, editor, events
ticketid: 1695979
res_type: kb
components: ["editor"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Editor for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to detect when the user focuses the Editor content?
* How to handle the Editor focus event?
* Is it possible to do a Blazor action on Editor OnFocus?

## Solution

The required approach depends on the [Editor `EditMode`](slug:editor-edit-modes-overview), due to the different Editor HTML rendering:

* [Using `Div` edit mode](#div-editmode)
* [Using `Iframe` edit mode](#iframe-editmode)

### `Div` EditMode

1. Learn how to [call JavaScript code from C# code](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet).
1. Wrap the Editor in a container with an `@onfocusin` event.
1. Use JavaScript to check if the Editor content `<div class="k-content ProseMirror">` is focused.

>caption Detect Editor focus when using Div EditMode

````RAZOR
@using Telerik.Blazor.Components.Editor

@inject IJSRuntime js

<div @onfocusin="@OnDivEditorFocus">
    <TelerikEditor @bind-Value="@EditorValue"
                   Tools="@EditorToolSets.All"
                   EditMode="@EditorEditMode.Div"
                   Height="300px">
    </TelerikEditor>
</div>

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    function isEditorDivFocused() {
        return document.activeElement &&
            document.activeElement.classList.contains("k-content") &&
            document.activeElement.classList.contains("ProseMirror");
    }

</script>

@code {
    #nullable enable

    private string EditorValue { get; set; } = @"<p>foo 1</p><p>bar 1</p>";

    private async Task OnDivEditorFocus()
    {
        bool isEditorContentFocused = await js.InvokeAsync<bool>("isEditorDivFocused");

        if (isEditorContentFocused)
        {
            EditorValue = $"<p>Editor content DIV was focused at {DateTime.Now.ToLongTimeString()}.</p>";
        }
    }
}
````

### `Iframe` EditMode

1. Learn how to [call C# code from JavaScript code](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript) and [vice-versa](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet).
1. Use the first firing of `OnAfterRenderAsync` to:
    1. Obtain the `<body>` element inside the Editor content `iframe`.
    1. [Subscribe](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the `focusin` event to the `iframe` `body`.
1. In the JavaScript `focusin` handler, call a C# method.

>caption Detect Editor focus when using Iframe EditMode

````RAZOR
@using Telerik.Blazor.Components.Editor

@implements IDisposable

@inject IJSRuntime js

<TelerikEditor @bind-Value="@EditorValue"
               Tools="@EditorToolSets.All"
               Id="@EditorId"
               Height="300px">
</TelerikEditor>

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    var dotNet;

    function attachIframeFocusHandler(id, dotNetRef) {
        var editor = document.getElementById(id);
        if (editor) {
            dotNet = dotNetRef;
            editor.querySelector("iframe").contentWindow.document.body.addEventListener("focusin", OnEditorBodyFocus);
        }
    }

    function OnEditorBodyFocus(args) {
        dotNet.invokeMethodAsync("OnEditorFocus2");
    }

    function detachIframeFocusHandler(id) {
        var editor = document.getElementById(id);
        if (editor) {
            editor.querySelector("iframe").contentWindow.document.body.removeEventListener("focusin", OnEditorBodyFocus);
        }
    }
</script>

@code {
    #nullable enable

    private string EditorValue { get; set; } = @"<p>foo 2</p><p>bar 2</p>";

    private const string EditorId = "iframe-editor";

    // Replace __Main with your Razor component type
    private DotNetObjectReference<Home>? DotNetRef { get; set; }

    [JSInvokable("OnEditorFocus2")]
    public void OnEditorFocus2()
    {
        EditorValue = $"<p>Editor content IFRAME was focused at {DateTime.Now.ToLongTimeString()}.</p>";
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
            await Task.Delay(1); // wait for HTML to render

            await js.InvokeVoidAsync("attachIframeFocusHandler", EditorId, DotNetRef);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public void Dispose()
    {
        DotNetRef?.Dispose();
    }
}
````

## See Also

* [Editor Events](slug:editor-events)
