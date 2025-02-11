---
title: ListBox Selection with CheckBoxes
description: How to implement support for checkbox selection in the Telerik Blazor ListBox component.
type: how-to
page_title: How to Select ListBox Items with CheckBoxes
slug: listbox-kb-checkbox-selection
position: 
tags: telerik, blazor, listbox, selection, checkbox
ticketid: 
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ListBox for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to select ListBox items with checkboxes?
* Does the ListBox support single and multiple checkbox selection?
* How to implement a checkbox multi select demo with the Blazor ListBox?


## Solution

1. Define a [ListBox item template](slug:listbox-templates#item-template).
1. In the `<ItemTemplate>`, add a [CheckBox component](slug:checkbox-overview) with a [`Value` parameter](slug:checkbox-overview#checkbox-parameters) and a [`ValueChanged` event handler](slug:checkbox-events#valuechanged).
1. The CheckBox `Value` must be `true` if the current item (`ItemTemplate` `context`) is a member of the ListBox `SelectedItems` collection.
1. The CheckBox `ValueChanged` handler must add or remove the current ListBox item from the `SelectedItems` collection.
1. Wrap the CheckBox component in a `<span @onclick:stopPropagation>`, so that the checkbox clicks do not interfere with the built-in ListBox selection feature.
1. (optional) Apply some padding on the `<span>` element, so that if the user clicks near the checkbox, but outside it, the ListBox `SelectedItems` collection doesn't reset to a single item.

>caption Using checkboxes for ListBox selection

````RAZOR
ListBox <code>SelectionMode</code>:

<TelerikRadioGroup Data="@RadioGroupData"
                   @bind-Value="@RadioGroupValue" />

<br />

<TelerikListBox @ref="@ListBoxRef"
                Data="@ListBoxData"
                TextField="@nameof(ListBoxModel.Name)"
                SelectionMode="@RadioGroupValue"
                @bind-SelectedItems="@ListBoxSelectedItems"
                OnReorder="@( (ListBoxReorderEventArgs<ListBoxModel> args) => OnListBoxReorder(args) )"
                Width="190px"
                Height="auto">
    <ListBoxToolBarSettings>
        <ListBoxToolBar>
            <ListBoxToolBarMoveUpTool />
            <ListBoxToolBarMoveDownTool />
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
    <ItemTemplate>
        <span @onclick:stopPropagation class="checkbox-wrapper">
            <TelerikCheckBox Value="@( ListBoxSelectedItems.Contains(context) )"
                             ValueChanged="@( (bool newValue) => OnCheckBoxValueChanged(newValue, context) )" />
        </span>
        @context.Name
    </ItemTemplate>
</TelerikListBox>

<style>
    .checkbox-wrapper {
        padding: 0 .4em;
    }
</style>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef { get; set; } = null!;

    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems { get; set; } = new List<ListBoxModel>();

    private List<ListBoxSelectionMode> RadioGroupData { get; set; } = new List<ListBoxSelectionMode>() {
        ListBoxSelectionMode.Single,
        ListBoxSelectionMode.Multiple
    };

    private ListBoxSelectionMode RadioGroupValue { get; set; } = ListBoxSelectionMode.Multiple;

    private void OnCheckBoxValueChanged(bool newValue, ListBoxModel item)
    {
        var currentSelection = new List<ListBoxModel>(ListBoxSelectedItems);

        if (newValue)
        {
            if (RadioGroupValue == ListBoxSelectionMode.Multiple)
            {
                currentSelection.Add(item);
            }

            else
            {
                currentSelection = new List<ListBoxModel>() { item };
            }
        }
        else
        {
            currentSelection.Remove(item);
        }

        ListBoxSelectedItems = currentSelection;
    }

    private void OnListBoxReorder(ListBoxReorderEventArgs<ListBoxModel> args)
    {
        ListBoxData.RemoveAll(x => args.Items.Contains(x));
        ListBoxData.InsertRange(args.ToIndex, args.Items);

        ListBoxRef.Rebind();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 7; i++)
        {
            ListBoxData.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"ListBox Item {i}",
            });
        }
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````


## See Also

* [ListBox Templates](slug:listbox-templates)
* [ListBox Selection](slug:listbox-selection)
