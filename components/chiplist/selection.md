---
title: Selection
page_title: ChipList - Seletion
description: Item selection in the ChipList for Blazor.
slug: chiplist-selection
tags: telerik,blazor,chiplist,selection,chip,selected,items
published: True
position: 10
---

# ChipList Selection

The ChipList allows the application users to select one or more chips. This article explains how to enable the built-in selection feature.

## Selection Basics

You can configure the selection behavior by setting the `SelectionMode` parameter to a member of the `ChipListSelectionMode` enum:

* `None` - the default value. Use this to disable the chip selection.
* `Single`
* `Multiple`

The selected chips will be stored in the `SelectedItems` collection (`IEnumerable<TItem>`). You can use it with [one way binding](#one-way-binding) and [two way binding (the `@bind-SelectedItems` syntax)](#two way binding).

## One way Binding

Use the `SelectedItems` parameter together with the `SelectedItemsChanged` event when you need to respond to the user selection and add some additional application logic.

````RAZOR
<TelerikChipList Data="@ChipListSource"
                 SelectionMode="@ChipListSelectionMode.Multiple"
                 SelectedItems="@ChipListSelectedItems"
                 SelectedItemsChanged="@( (IEnumerable<ChipModel> selectedItems) => OnChipListSelectedItemsChanged(selectedItems) )">
</TelerikChipList>

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private void OnChipListSelectedItemsChanged(IEnumerable<ChipModel> items)
    {
        ChipListSelectedItems = items;

        //add the application logic
    }

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## Two way Binding

When you use the `@bind-SelectedItems` syntax, the ChipList will automatically update the `SelectedItems` collection when the user change the selection.

````RAZOR
<TelerikChipList Data="@ChipListSource"
                 SelectionMode="@ChipListSelectionMode.Single"
                 @bind-SelectedItems="@ChipListSelectedItems">
</TelerikChipList>

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            Text = "Audio",
            Icon = SvgIcon.FileAudio
        },
        new ChipModel()
        {
            Text = "Video",
            Icon = SvgIcon.FileVideo
        }
    };

    public class ChipModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````


## See Also

* [ChipList Events](slug:chiplist-events)
* [ChipList Data Binding](slug:chiplist-bound)

