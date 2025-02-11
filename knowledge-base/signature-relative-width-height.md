---
title: Resize Signature with the Browser
description: How to use flexible width and height for the Telerik Blazor Signature, and resize the component together with the browser window viewport.
type: how-to
page_title: How to Resize the Signature Relative to the Browser Window
slug: signature-kb-relative-width-height
position: 
tags: telerik, blazor, signature, size
ticketid: 1587696, 1589578, 1632130
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Signature for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to use percentage value for the Signature `Width` and `Height`?
* How to resize the Signature component together with the browser window viewport?
* How to change the Signature dimensions relative to the screen size?
* How to use flexible Signature size, instead of hard-coded pixel values?

## Solution

The Signature component uses a drawing `<canvas>`. Relative sizes with automatic HTML element resizing are not supported and that's why the component requires pixel dimensions.

A possible workaround is to change the component `Width` and `Height` at runtime, depending on the size of browser window viewport.

1. [Use `JSInterop`](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/) to obtain the user screen size.
1. Calculate and set the desired Signature `Width` and `Height`.
1. If you need to resize the Signature on browser window resize, [use debouncing in the JavaScript event handler for better Blazor app performance](https://learn.microsoft.com/en-us/aspnet/core/blazor/performance?view=aspnetcore-8.0#dont-trigger-events-too-rapidly).
1. [Remove the Signature from the page temporarily while changing its size](https://feedback.telerik.com/blazor/1588545).

>caption Resize Signature with the browser viewport

````RAZOR
@inject IJSRuntime js

@implements IDisposable

@if (ShowSignature)
{
    <TelerikSignature @bind-Value="@SignatureValue"
                      Width="@SignatureWidth"
                      Height="@SignatureHeight"
                      Maximizable="false">
    </TelerikSignature>
}

@* Move JavaScript code to a separate JS file in production! *@
<script suppress-error="BL9992">//
    var dotNet;

    var timeoutId;
    var resizeDebounceDelay = 300;

    function saveDotNetRef(dotNetRef) {
        dotNet = dotNetRef;

        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
        clearTimeout(timeoutId);

        timeoutId = window.setTimeout(function() {
            dotNet.invokeMethodAsync("RecreateSignature", window.innerWidth, window.innerHeight);
        }, resizeDebounceDelay);
    }

    function getViewportSize() {
        return { Width: window.innerWidth, Height: window.innerHeight };
    }
//</script>

@code {
    private string SignatureValue { get; set; } = string.Empty;

    private string SignatureWidth { get; set; } = "600px";
    private string SignatureHeight { get; set; } = "400px";

    private bool ShowSignature { get; set; } = true;

    // Replace <__Main> with your Razor class name.
    private DotNetObjectReference<__Main>? DotNetRef { get; set; }

    [JSInvokable("RecreateSignature")]
    public void RecreateSignature(int viewportWidth, int viewportHeight)
    {
        // Signature bug related to Width and Height changes
        // https://feedback.telerik.com/blazor/1588545
        ShowSignature = false;

        // StateHasChanged is necessary, because this is not an EventCallback.
        StateHasChanged();

        // Optionally reset the Signature Value.
        //SignatureValue = string.Empty;

        SignatureWidth = $"{viewportWidth - 60}px";
        SignatureHeight = $"{viewportHeight - 60}px";

        ShowSignature = true;
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
            // Ensure the HTML is ready.
            await Task.Delay(1);

            await js.InvokeVoidAsync("saveDotNetRef", DotNetRef);
            var viewportSize = await js.InvokeAsync<ViewportSize>("getViewportSize");

            RecreateSignature(viewportSize.Width, viewportSize.Height);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public void Dispose()
    {
        DotNetRef?.Dispose();
    }

    public class ViewportSize
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
````

## See Also

* [Signature Overview](slug:signature-overview)
* [Resize Signature without hiding it](https://feedback.telerik.com/blazor/1588545)
