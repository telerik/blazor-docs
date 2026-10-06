---
title: Positioning
page_title: Floating Toolbar Positioning
description: Position the Blazor Floating Toolbar next to an anchor element or at a free viewport location.
slug: floatingtoolbar-positioning
tags: telerik,blazor,floating toolbar,positioning
published: True
position: 10
components: ["floatingtoolbar"]
---

# Floating Toolbar Positioning

The Floating Toolbar supports anchored and free-position modes. The `AnchorSelector` parameter determines the effective mode.

## Anchoring to an Element

Set `AnchorSelector` to a CSS selector for the target element. Set `Position` to choose the preferred side of the anchor. The component can change the final position when collision handling is required.

````RAZOR
<span id="product-image">Product image</span>

<TelerikFloatingToolBar Visible="@true"
                        AnchorSelector="#product-image"
                        Position="@PopoverPosition.Right"
                        HorizontalOffset="20"
                        AriaLabel="Image tools">
    <ToolBarButton>Crop</ToolBarButton>
    <ToolBarButton>Rotate</ToolBarButton>
</TelerikFloatingToolBar>
````

An invalid or unmatched `AnchorSelector` prevents the show operation. Clear the anchor before switching to a free position.

## Using Free-Position Mode

Omit `AnchorSelector` to position the Floating Toolbar inside its containing element. Configure the initial location with the following parameters:

* `HorizontalAlign` - Aligns the component to the left, center, or right edge of its containing element.
* `VerticalAlign` - Aligns the component to the top, center, or bottom edge of its containing element.
* `HorizontalOffset` - Sets the horizontal distance in pixels from the aligned edge.
* `VerticalOffset` - Sets the vertical distance in pixels from the aligned edge.

````RAZOR
<span class="container">Container
    <TelerikFloatingToolBar Visible="@true"
                            HorizontalAlign="@FloatingToolBarHorizontalAlign.Center"
                            VerticalAlign="@FloatingToolBarVerticalAlign.Top"
                            HorizontalOffset="16"
                            VerticalOffset="24"
                            AriaLabel="Report tools">
        <ToolBarButton>Export</ToolBarButton>
        <ToolBarButton>Print</ToolBarButton>
    </TelerikFloatingToolBar>
</span>
````

Use the `FloatingToolBarHorizontalAlign` values `Left`, `Center`, and `Right` for `HorizontalAlign`. Use the `FloatingToolBarVerticalAlign` values `Top`, `Center`, and `Bottom` for `VerticalAlign`.

## Sticky Behavior

Anchor the Floating Toolbar to an element with `position: sticky` to keep the toolbar visible while the user scrolls its container.

````RAZOR
<div class="floating-toolbar-sticky-container">
    <div id="sticky-toolbar-anchor" class="floating-toolbar-sticky-anchor">Review notes</div>
    <div class="floating-toolbar-sticky-content">
        <h3>Contract review</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus eget neque interdum facilisis.</p>
        <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Donec sed odio dui.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
        <p>Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum.</p>
        <p>Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.</p>
        <p>Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus.</p>
        <p>Donec ullamcorper nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac.</p>
        <p>Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.</p>
        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus.</p>
    </div>
</div>

<TelerikFloatingToolBar Visible="@true"
                        AnchorSelector="#sticky-toolbar-anchor"
                        Position="@PopoverPosition.Bottom"
                        OverflowMode="@ToolBarOverflowMode.None"
                        AriaLabel="Review actions">
    <ToolBarButton Icon="@SvgIcon.Comment">Comment</ToolBarButton>
    <ToolBarButton Icon="@SvgIcon.Check">Approve</ToolBarButton>
    <ToolBarButton Icon="@SvgIcon.X">Reject</ToolBarButton>
</TelerikFloatingToolBar>

<style>
    .floating-toolbar-sticky-container {
        border: var(--kendo-border-width-thin) solid var(--kendo-color-border);
        border-radius: var(--kendo-border-radius-md);
        height: 360px;
        overflow: auto;
    }

    .floating-toolbar-sticky-anchor {
        background-color: var(--kendo-color-surface);
        padding: var(--kendo-spacing-3) var(--kendo-spacing-4);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .floating-toolbar-sticky-content {
        padding: var(--kendo-spacing-8) var(--kendo-spacing-4);
    }
</style>
````

## Positioning with Methods

Use a component reference to position the Floating Toolbar programmatically. All methods are asynchronous so the app can observe DOM positioning and JavaScript errors.

````RAZOR
<TelerikButton OnClick="@ShowAtSelection">Show tools</TelerikButton>

<TelerikFloatingToolBar @ref="@FloatingToolBarRef"
                        AriaLabel="Selection tools">
    <ToolBarButton>Copy</ToolBarButton>
    <ToolBarButton>Comment</ToolBarButton>
</TelerikFloatingToolBar>

@code {
    private TelerikFloatingToolBar FloatingToolBarRef;

    private async Task ShowAtSelection()
    {
        await FloatingToolBarRef!.ShowAsync(240, 160);
    }
}
````

Refer to the [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar) for all available methods.

Calling `ShowAsync()` while the component is visible updates its position without changing `Visible` or raising `VisibleChanged`.

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [Enable Floating Toolbar Drag Support](slug:floatingtoolbar-drag-and-drop)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)