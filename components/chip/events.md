---
title: Events
page_title: Chip - Events
description: Events in the Chip for Blazor.
slug: chip-events
tags: telerik,blazor,chip,events
published: true
position: 20
---

# Events

This article showcases the available events in the Telerik Chip component:

* [SeletedChanged](#selectedchanged)
* [OnClick](#onclick)
* [OnRemove](#onremove)

## ValueChanged

The `SelectedChanged` event fires every time the `Selected` parameter changes.

## OnClick

The `OnClick` event fires when the user clicks on the Chip component. The event handler receives a `ChipClickEventArgs` object which provides the value of the `Text` parameter of the clicked Chip.

## OnRemove

The `OnRemove` event fires when the user clicks the remove icon of the Chip. The event handler receives a `ChipRemoveEventArgs` object which provides the value of the `Text` parameter of the clicked Chip. You can cancel the event by setting the `IsCancelled` field to `true`.

## Example

>caption Handle the Chip events

````CSHTML
<TelerikChip Selected="@IsChipSelected"
             SelectedChanged="@((bool value) => OnChipSelectedChanged(value))"
             OnClick="@OnChipClick"
             OnRemove="@OnChipRemove"
             Removable="true"
             Text="Audio">
</TelerikChip>

@(new MarkupString(logger))

@code {
    private bool IsChipSelected { get; set; }
    private string logger { get; set; }

    private void OnChipSelectedChanged(bool value)
    {
        IsChipSelected = value;
    }

    private void OnChipClick(ChipClickEventArgs args)
    {
        logger += $"The User click on {args.Text} <br />";
    }

    private void OnChipRemove(ChipRemoveEventArgs args)
    {
        logger += $"The User removed {args.Text} <br />";

        args.IsCancelled = false; //set this to true to cancel the event
    }
}
````

## See Also

* [Chip OverView]({%slug chip-overview%})

