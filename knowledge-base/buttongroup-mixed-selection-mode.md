---
title: ButtonGroup Mixed Selection Mode
description: How to create a mix between Single and Multiple selection modes in Blazor ButtonGroup.
type: how-to
page_title: ButtonGroup Mixed Selection Mode
slug: buttongroup-kb-mixed-selection-mode
position: 
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

How to create a third selection mode that is a mix between `Single` and `Multiple`? How to force at least one selected ButtonGroup button?

Currently, there are two possible options for the [`SelectionMode`]({%slug buttongroup-selection%}) in the ButtonGroup. The third mode needs to allow multiple selections and not allow deselecting the last standing selected item. Minimum one button needs to stay always selected.

## Solution

Handle the [`SelectedChanged`]({%slug buttongroup-events%}#selectedchanged) event of each [`ButtonGroupToggleButton`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ButtonGroupToggleButton), and when you deselect a button, check if it was the last selected.

````CSHTML
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

* [Explore the built-in selection modes]({%slug buttongroup-selection%})
* [See vertical button group]({%slug buttongroup-kb-vertical%})