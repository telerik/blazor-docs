---
title: Close AnimationContainer on Outside Click
description: How to close the Telerik Blazor AnimationContainer when the user clicks outside it
type: how-to
page_title: Close Animation Container When Clicking Outside it
slug: animationcontainer-kb-close-on-outside-click
position: 
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

If I click outside of the Animation Container, the control doesn't collapse like other popup components. You have to manually click to on the toggle button. How to close the Animation Container with a user click outside of it?


## Solution

1. Set a custom `Class` for the AnimationContainer to distinguish its HTML element in JavaScript code.
1. When you open the AnimationContainer with `ShowAsync()`, [call a JavaScript function](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet) and [subscribe](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the `click` event of the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement).
1. In the JavaScript `click` handler, get the [event `target`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) and check if it is [inside or outside](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) the AnimationContainer. Use the CSS Class from step 1.
1. If the target is outside, [call a .NET method from the JavaScript code](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript) that will close the AnimationContainer.
1. When closing the AnimationContainer from JavaScript, [detach](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) the `click` handler from step 2.

>caption Close AnimationContainer on outside click

````CSHTML
@inject IJSRuntime js

@implements IDisposable

<TelerikButton OnClick="@ShowTAC">Show Animation Container</TelerikButton>

<TelerikAnimationContainer @ref="@TAC" Class="tac">
    <div style="border:1px solid red;width:400px;height:200px;">animation container</div>
</TelerikAnimationContainer>

@* suppress-error allows script tags in Razor files. Move this script to a separate file *@
<script suppress-error="BL9992">//
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

If the AnimationContainer is opened as a result of a button click, take this into account in the opening and closing logic. The above example uses a `bool` flag for the AnimatioContainer state.

All Telerik Blazor popup and dropdown components are rendered at the root of the app, and not at place of declaration. For example, if the AnimationContainer contains a ComboBox, its dropdown will render outside the AnimationContainer. This affects the check in [step 3](#solution) above. Use [another Class for the nested popup]({%slug components/combobox/overview%}#popup-settings) to distinguish it.

The AnimationContainer should reside outside elements with an `overflow` style. Otherwise, it may be clipped or overlapped by other scrollable containers. This limitation will not exist for the [future `Popup` component](https://feedback.telerik.com/blazor/1506370-dropdown-container-popup-component-tied-to-an-anchor-for-positioning).


## See Also

* [Animation Container Documentation]({%slug components/animationcontainer/overview%})
* [Telerik Blazor Popup feature request tracking](https://feedback.telerik.com/blazor/1506370-dropdown-container-popup-component-tied-to-an-anchor-for-positioning)
