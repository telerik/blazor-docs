---
title: Events
page_title: ChipList - Events
description: Events in the ChipList for Blazor.
slug: chiplist-events
tags: telerik,blazor,chiplist,events
published: true
position: 20
---

# Events

This article describes the Blazor ChipList events and provides a runnable example with sample event handler implementations.

* [OnRemove](#onremove)
* [SelectedItemsChanged](#selecteditemschanged)

## OnRemove

The `OnRemove` event fires when the user clicks the remove icon on any chip in the ChipList. The event handler receives a `ChipListRemoveEventArgs` object which provides the removed chip in the `Item` field that you can cast to your model type. You can cancel the event by setting the `IsCancelled` field to `true`.

## SelectedItemsChanged

The `SelectedItemsChanged` fires when the user selects a chip from the ChipList. [Read the Selection article for more information on the SelectedItemsChanged event...](slug:chiplist-selection#one-way-binding)

## Example

>caption Handle the Blazor ChipList Events

````RAZOR
<TelerikChipList Data="@ChipListSource"
                 SelectionMode="@ChipListSelectionMode.Multiple"
                 SelectedItems="@ChipListSelectedItems"
                 SelectedItemsChanged="@( (IEnumerable<ChipModel> selectedItems) => OnChipListSelectedItemsChanged(selectedItems) )"
                 OnRemove="@OnChipRemove"
                 TextField="@nameof(ChipModel.ChipText)"
                 IconField="@nameof(ChipModel.ChipIcon)"
                 RemovableField="@nameof(ChipModel.isChipRemovable)">
</TelerikChipList>

@code {
    private IEnumerable<ChipModel> ChipListSelectedItems { get; set; } = new List<ChipModel>();

    private void OnChipListSelectedItemsChanged(IEnumerable<ChipModel> items)
    {
        ChipListSelectedItems = items;
    }

    private void OnChipRemove(ChipListRemoveEventArgs args)
    {
        ChipModel removedChip = args.Item as ChipModel;

        args.IsCancelled = false; //set this to true to cancel the removal of the chip
    }

    private List<ChipModel> ChipListSource { get; set; } = new List<ChipModel>()
    {
        new ChipModel()
        {
            ChipText = "Audio",
            ChipIcon = SvgIcon.FileAudio,
            isChipRemovable = true
        },
        new ChipModel()
        {
            ChipText = "Video",
            ChipIcon = SvgIcon.FileVideo,
            isChipRemovable = true
        }
    };

    public class ChipModel
    {
        public string ChipText { get; set; }
        public ISvgIcon ChipIcon { get; set; }
        public bool isChipRemovable { get; set; }
    }
}
````


## See Also

* [ChipList Overview](slug:chiplist-overview)
* [ChipList Selection](slug:chiplist-selection)
