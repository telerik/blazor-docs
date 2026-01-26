---
title: Implement Interactive Onboarding Tour UI
description: Learn how to implement an interactive step-by-step tutorial for adoption and on-boarding with Telerik components for Blazor. It should highlight parts of the web page and provide additional information.
type: how-to
page_title: How to Implement Interactive Onboarding Tutorial with Telerik UI for Blazor
slug: popover-kb-tutorial
tags: blazor, popover, loadercontainer, button
ticketid: 1703553, 1706064
res_type: kb
components: ["popover"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Popover for Blazor, <br />
                LoaderContainer for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to highlight parts of the page and display additional related information in a popup?
* How to create an interactive application UI tour using Telerik UI for Blazor?
* How to make a digital adoption platform (DAP) or a user on-boarding service with Telerik Blazor components?
* How to implement an interactive tutorial UX that is similar to Shepherd.js or STGTour.GTour?

## Solution

1. Use the Telerik [Popover](slug:popover-overview) and [LoaderContainer](slug:loadercontainer-overview) components.
1. Increase the Popover `z-index` style, so that it shows over the LoaderContainer.
1. The Popover closes when the user clicks outside it. Thus, wrap the LoaderContainer in a container with an `@onclick` event handler that hides the LoaderContainer.
1. Use a `keydown` handler on the web document to close the Popover and hide the LoaderContainer when the user presses **Escape**.
1. Show the Popover with a small delay in `OnAfterRenderAsync` if you changed its `AnchorSelector` value.
1. Increase the delays in the `await Task.Delay()` calls if necessary, for example, if the Popovers don't show or don't point to the correct anchor.

>caption Interactive Blazor tour UX

```RAZOR
@implements IAsyncDisposable

@inject IJSRuntime JS

<h1>Hello, world!</h1>

<p>Welcome to your tutorial powered by Telerik UI for Blazor!</p>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary" OnClick="@(() => ShowPopover(1))">Start</TelerikButton>

<div @onclick="@HidePopover">
    <TelerikLoaderContainer Visible="@LoaderContainerVisible">
        <Template></Template>
    </TelerikLoaderContainer>
</div>

@if (ElementIndexToHighlight != 0)
{
    <TelerikPopover @ref="@PopoverRef"
                    ActionsLayout="@PopoverActionsLayoutAlign.Center"
                    AnchorSelector="@($"#{GetElementId(ElementIndexToHighlight)}")"
                    ShowOn="@PopoverShowOn.Click"
                    Position="@PopoverPosition.Top"
                    Offset="20"
                    Class="over-loader">
        <PopoverHeader>
            Telerik Popover for Blazor
        </PopoverHeader>
        <PopoverContent>
            <p>Additional information about element <strong>@ElementIndexToHighlight</strong></p>
        </PopoverContent>
        <PopoverActions>
            <TelerikButton OnClick="@ShowNextPopover"
                           Icon="@SvgIcon.CaretAltRight"
                           Visible="@(ElementIndexToHighlight != ElementCount)">Next</TelerikButton>
            <TelerikButton OnClick="@HidePopover"
                           Icon="@SvgIcon.X">Close</TelerikButton>
        </PopoverActions>
    </TelerikPopover>
}

@for (int i = 1; i <= ElementCount; i++)
{
    int idx = i;

    <h2>Heading @idx</h2>

    <TelerikButton OnClick="@(async () => await ShowPopover(idx))">Show Info @idx</TelerikButton>

    if (idx % 2 == 0)
    {
        <div class="nohl-element">Paragraph that contains <span id="@GetElementId(idx)" class="@GetElementClass(idx)" @onclick="@HidePopover">span @idx</span> that can be highlighted.</div>
    }
    else
    {
        <div id="@GetElementId(idx)" class="@GetElementClass(idx)" @onclick="@HidePopover">Paragraph @idx that can be highlighted.</div>
    }
}

<style>
    .hl-element,
    .nohl-element {
        padding: .4em 0;
        border: 2px solid transparent;
    }

    span.hl-element {
        display: inline-block;
        padding: .2em 0;
    }

    .hl-active {
        position: relative;
        z-index: 21000;
        border-color: var(--kendo-color-primary);
        background: var(--kendo-color-surface);
    }

    .k-animation-container:has(.over-loader) {
        z-index: 21000 !important;
    }

    /* Needed to expand the LoaderContainer vertically on a scrollable page. */
    html, body {
        min-height: 100%;
        height: auto;
    }
</style>

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    var dotNet;

    function saveDotNetRef(dotNetRef) {
        dotNet = dotNetRef;

        window.addEventListener("resize", onWindowResize);
        document.addEventListener("keydown", onDocumentKeyDown);
    }

    function onWindowResize() {
        dotNet.invokeMethodAsync("JavaScriptToDotNet");
    }

    function onDocumentKeyDown(e) {
        if (e.key == "Escape") {
            dotNet.invokeMethodAsync("JavaScriptToDotNet");
        }
    }

    function scrollToElement(id) {
        let element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    function dispose() {
        dotNet = null;

        window.removeEventListener("resize", onWindowResize);
        document.removeEventListener("keydown", onDocumentKeyDown);
    }
</script>

@code {
    #nullable enable

    // Replace __Main with your actual Razor component type
    private DotNetObjectReference<__Main>? DotNetRef { get; set; }

    private TelerikPopover? PopoverRef { get; set; }
    private bool LoaderContainerVisible { get; set; }
    private const string DefaultClass = "hl-element";
    private const string HighlightedClass = "hl-active";
    private int ElementIndexToHighlight { get; set; }
    private bool ShouldShowPopover { get; set; }

    private const int ElementCount = 5;

    private async Task ShowPopover(int index)
    {
        ElementIndexToHighlight = index;
        LoaderContainerVisible = true;
        await JS.InvokeVoidAsync("scrollToElement", GetElementId(index));
        ShouldShowPopover = true;
    }

    private async Task HidePopover()
    {
        PopoverRef?.Hide();
        await Task.Delay(1);
        ElementIndexToHighlight = default;
        LoaderContainerVisible = false;
    }

    private async Task ShowNextPopover()
    {
        int nextIndex = ++ElementIndexToHighlight;

        await HidePopover();

        if (nextIndex <= ElementCount)
        {
            await ShowPopover(nextIndex);
        }
    }

    [JSInvokable("JavaScriptToDotNet")]
    public async Task JavaScriptToDotNet()
    {
        await HidePopover();
        StateHasChanged();
    }

    private string GetElementId(int index)
    {
        return $"el{index}";
    }

    private string GetElementClass(int index)
    {
        string result = DefaultClass;

        if (ElementIndexToHighlight == index)
        {
            result = string.Concat(DefaultClass, " ", HighlightedClass);
        }

        return result;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1); // ensure HTML is ready
            await JS.InvokeVoidAsync("saveDotNetRef", DotNetRef);
        }

        if (ShouldShowPopover)
        {
            await Task.Delay(50);
            ShouldShowPopover = false;
            PopoverRef?.Show();
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        DotNetRef = DotNetObjectReference.Create(this);
    }

    public async ValueTask DisposeAsync()
    {
        await JS.InvokeVoidAsync("dispose");
        DotNetRef?.Dispose();
    }
}
```

## See Also

* [Popover Overview](slug:popover-overview)
* [LoaderContainer Overview](slug:loadercontainer-overview)
