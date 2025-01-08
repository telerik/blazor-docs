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

This article showcases the available events in the Telerik Chip component, together with a complete [example](#example).

* [OnClick](#onclick)
* [OnRemove](#onremove)
* [SeletedChanged](#selectedchanged)

## OnClick

The `OnClick` event fires when the user clicks or taps on the Chip component. The event handler receives a `ChipClickEventArgs` object, which provides the value of the `Text` parameter of the clicked Chip.

## OnRemove

The `OnRemove` event fires when the user clicks the remove icon of the Chip. The event handler receives a `ChipRemoveEventArgs` object which provides the value of the [`Text` parameter](slug://chip-overview#chip-parameters) of the clicked Chip. You can cancel the event by setting the `IsCancelled` property to `true`.

## SelectedChanged

The `SelectedChanged` event fires when the `Selectable` parameter is `true` and the user clicks or taps the Chip to select/deselect it.

## Example

>caption Handle the Chip events

````RAZOR
<TelerikChip Selected="@IsChipSelected"
             SelectedChanged="@((bool value) => OnChipSelectedChanged(value))"
             OnClick="@OnChipClick"
             OnRemove="@OnChipRemove"
             Removable="true"
             Text="Audio">
</TelerikChip>

@(new MarkupString(Logger))

@code {
    private bool IsChipSelected { get; set; }
    private string Logger { get; set; }

    private void OnChipSelectedChanged(bool value)
    {
        IsChipSelected = value;
    }

    private void OnChipClick(ChipClickEventArgs args)
    {
        Logger += $"The User click on {args.Text} <br />";
    }

    private void OnChipRemove(ChipRemoveEventArgs args)
    {
        Logger += $"The User removed {args.Text} <br />";

        args.IsCancelled = false; //set to true to cancel the event
    }
}
````

## See Also

* [Live Demo: Chip Events](https://demos.telerik.com/blazor-ui/chip/events)
* [Chip OverView](slug://chip-overview)
