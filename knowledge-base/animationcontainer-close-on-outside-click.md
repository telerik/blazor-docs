---
title: Closing the AnimationContainer on Outside Click
description: Learn how to close the Telerik UI for Blazor AnimationContainer when the user clicks outside the component.
type: how-to
page_title: Closing the AnimationContainer When Users Click Outside It
slug: animationcontainer-kb-close-on-outside-click
tags: telerik, blazor, animationcontainer
ticketid: 1588069, 1593919
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>AnimationContainer for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

When I click outside of the AnimationContainer, the control doesn't collapse like other popup components and you have to manually click the **Toggle** button for the component to do so. How can I enable the AnimationContainer to close with a user clicks outside of it?


## Solution

To achieve the desired scenario:

1. Set a custom `Class` for the AnimationContainer to distinguish its HTML element in JavaScript code.
1. When you open the AnimationContainer with `ShowAsync()`, [call a JavaScript function](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet) and [subscribe](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the `click` event of the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement).
1. In the JavaScript `click` handler, get the [`target`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) event and check if it is [inside or outside](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) the AnimationContainer. Use the custom CSS `Class` from step 1.
1. If the target is outside, [call a .NET method from the JavaScript code](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript) that will close the AnimationContainer.
1. When closing the AnimationContainer from JavaScript, [detach](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) the `click` handler from step 2.

> Replace the `Index` type of the `DotNetObjectReference` in the example below with the type of the component that hosts this code.

>caption Close the AnimationContainer upon an outside click

<div class="skip-repl"></div>
````RAZOR
@inject IJSRuntime js

@implements IDisposable

<TelerikButton OnClick="@ShowTAC">Show Animation Container</TelerikButton>

<TelerikAnimationContainer @ref="@TAC" Class="tac">
    <div style="border:1px solid red;width:400px;height:200px;">animation container</div>
</TelerikAnimationContainer>

@* suppress-error allows script tags in Razor files. Move this script to a separate file *@
<script suppress-error="BL9992">
    //
    function attachCloseTAC(dotNetReference) {
        dotNet = dotNetReference;
        document.documentElement.addEventListener("click", checkHideTAC);
    }

    var dotNet;

    function checkHideTAC(e) {
        if (!e.target.closest(".tac")) {
            document.documentElement.removeEventListener("click", checkHideTAC);
            dotNet.invokeMethodAsync("HideTAC");
        }
    }
    //</script>

@code {
    private TelerikAnimationContainer TAC { get; set; }

    private bool TACOpen { get; set; }

    //Replace the Index type with the type of the component that hosts this code
    private DotNetObjectReference<Index>? DotNetRef;

    private async Task ShowTAC()
    {
        if (!TACOpen)
        {
            TACOpen = true;
            await TAC.ShowAsync();
            await js.InvokeVoidAsync("attachCloseTAC", DotNetRef);
        }
    }

    [JSInvokable("HideTAC")]
    public async Task HideTAC()
    {
        await TAC.HideAsync();
        TACOpen = false;
    }

    protected override void OnInitialized()
    {
        DotNetRef = DotNetObjectReference.Create(this);
    }

    public void Dispose()
    {
        DotNetRef?.Dispose();
    }
}
````

## Notes

* If the AnimationContainer is opened as a result of a button click, consider this in the opening and closing logic. The above example uses a `bool` flag for the AnimatioContainer state.
* All Telerik Blazor popup and drop-down components are rendered at the root of the app, and not at the place of declaration. For example, if the AnimationContainer contains a ComboBox, its drop-down will render outside the AnimationContainer. This behavior affects the check in [step 3](#solution) above. To distinguish it, use [another Class for the nested popup](slug://components/combobox/overview#popup-settings).
* The AnimationContainer must reside outside elements with an `overflow` style. Otherwise, it may be clipped or overlapped by other scrollable containers. This limitation does not exist in the [Popup component](slug://popup-overview).


## See Also

* [AnimationContainer Documentation](slug://components/animationcontainer/overview)
* [Popup Documentation](slug://popup-overview)
* [Comparison between All Popup Components](slug://common-kb-popup-component-comparison)
