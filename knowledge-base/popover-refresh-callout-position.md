---
title: Align Popover with Anchor After Content and Size Change
description: Learn how to align the Telerik Popover for Blazor to its anchor after the component content and size change dynamically at runtime.
type: troubleshooting
page_title: How to Align Popover with Anchor After Content and Size Change
slug: popover-kb-refresh-callout-position
tags: blazor, popover
ticketid: 1703828
res_type: kb
components: ["popover"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Popover for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I have a Popover that may change its content and size at runtime. In these cases, the callout does not line up with the anchor anymore. How to dynamically align the Popover with its anchor after the content shrinks or expands?

## Cause

The Popover component does not track changes to its content or size for performance reasons.

## Solution

Use the [Popover `Refresh` method](slug:popover-overview#popover-reference-and-methods) to recalculate the component and callout position with regard to the anchor. If the Popover content change depends on C# code, you may need to wait for the next Blazor re-render or trigger it immediately with `await Task.Delay(1)`.

>caption Refresh Popover position and callout when the dimensions change

```RAZOR
<TelerikPopover @ref="@PopoverRef"
                AnchorSelector=".popover-target"
                ShowOn="@PopoverShowOn.Click"
                Position="@PopoverPosition.Right"
                Offset="20">
    <PopoverContent>
        Telerik Popover for Blazor
        <br />
        <TelerikButton OnClick="@ToggleContent">Toggle Content</TelerikButton>
        @if (ContentVisible)
        {
            <div style="height: 100px; padding: 1em; border: 1px solid var(--kendo-color-border);">
                Some dynamic content...
            </div>
        }
    </PopoverContent>
    <PopoverActions>
        <TelerikButton OnClick="@( () => PopoverRef?.Hide() )"
                       Icon="@SvgIcon.X">Close</TelerikButton>
    </PopoverActions>
</TelerikPopover>

<br /><br /><br /><br /><br /><br /><br />

<TelerikButton Class="popover-target">Toggle Popover</TelerikButton>

@code{
    #nullable enable

    private TelerikPopover? PopoverRef { get; set; }

    private bool ContentVisible { get; set; } = true;

    private async Task ToggleContent()
    {
        ContentVisible = !ContentVisible;
        await Task.Delay(1);

        PopoverRef?.Refresh();
    }
}
```

## See Also

* [Popover Position and Collision](slug:popover-position-collision)
