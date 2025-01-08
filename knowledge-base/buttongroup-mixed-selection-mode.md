---
title: Creating a Mixed Selection Mode in the ButtonGroup
description: Learn how to create a mix between the single and multiple selection modes in the Telerik UI for Blazor ButtonGroup.
type: how-to
page_title: Implementing a Mixed ButtonGroup Selection Mode
slug: buttongroup-kb-mixed-selection-mode
tags: buttongroup, mixed, button, selection, mode, third, single, multiple
ticketid: 1585768
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ButtonGroup for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How can I create a third selection mode that is a mix between the `Single` and `Multiple` option? How can I force at least one selected ButtonGroup button?

## Solution

Currently, the ButtonGroup [`SelectionMode`](slug://buttongroup-selection) supports the two `Single` and `Multiple` options.

To create a third, multiple selection mode, prevent the deselection of the last selected item, and enable at least one button to always stay selected, handle the [`SelectedChanged`](slug://buttongroup-events#selectedchanged) event of each [`ButtonGroupToggleButton`](/blazor-ui/api/Telerik.Blazor.Components.ButtonGroupToggleButton). When you deselect a button, check if it was the last selected.

````RAZOR
<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Multiple">
    <ButtonGroupToggleButton Selected="@FirstSelected" SelectedChanged="@((bool currState) => SelectedChangedHandler(currState, 1))">First</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@SecondSelected" SelectedChanged="@((bool currState) => SelectedChangedHandler(currState, 2))">Second</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@ThirdSelected" SelectedChanged="@((bool currState) => SelectedChangedHandler(currState, 3))">Third</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code {
    List<int> selectedButtons { get; set; } = new List<int>();

    bool FirstSelected { get; set; }
    bool SecondSelected { get; set; }
    bool ThirdSelected { get; set; }

    void SelectedChangedHandler(bool currState, int btnIndex)
    {
        if (currState && !(selectedButtons.Contains(btnIndex)))
        {
            selectedButtons.Add(btnIndex);
        }
        else if (!currState && selectedButtons.Count > 1)
        {
            selectedButtons.Remove(btnIndex);
        }

        FirstSelected = selectedButtons.Contains(1);
        SecondSelected = selectedButtons.Contains(2);
        ThirdSelected = selectedButtons.Contains(3);
    }
}
````

## See Also

* [Exploring the Built-In Selection Modes of the ButtonGroup](slug://buttongroup-selection)
* [Rendering Vertical Telerik UI for Blazor ButtonGroups](slug://buttongroup-kb-vertical)
