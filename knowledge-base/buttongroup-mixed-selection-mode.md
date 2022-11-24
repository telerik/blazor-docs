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

How to create a third selection mode that is a mix between `Single` and `Multiple`?

Currently, there are two possible options for the `SelectionMode` in the ButtonGroup. The third mode needs to allow multiple selections and not allow deselecting the last standing selected item. At least one button needs to stay always selected.

## Solution

Handle the `SelectedChanged` event of each `ButtonGroupToggleButton`, and when you deselect a button, check if it was the last selected.

````CSHTML
<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Multiple">
    <ButtonGroupToggleButton Selected="@FirstSelected" SelectedChanged="@FirstSelectedChangedHandler">First</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@SecondSelected" SelectedChanged="@SecondSelectedChangedHandler">Second</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@ThirdSelected" SelectedChanged="@ThirdSelectedChangedHandler">Third</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code {
    List<string> selectedButtons { get; set; } = new List<string>();

    bool FirstSelected { get; set; }
    bool SecondSelected { get; set; }
    bool ThirdSelected { get; set; }

    void FirstSelectedChangedHandler(bool currState)
    {
        if (currState && !(selectedButtons.Contains("first")))
        {
            FirstSelected = currState;
            selectedButtons.Add("first");
        }
        else if (!currState && selectedButtons.Count > 1)
        {
            FirstSelected = currState;
            selectedButtons.Remove("first");
        }
    }

    void SecondSelectedChangedHandler(bool currState)
    {
        if (currState && !(selectedButtons.Contains("second")))
        {
            SecondSelected = currState;
            selectedButtons.Add("second");
        }
        else if (!currState && selectedButtons.Count > 1)
        {
            SecondSelected = currState;
            selectedButtons.Remove("second");
        }
    }
    
    void ThirdSelectedChangedHandler(bool currState)
    {
        if (currState && !(selectedButtons.Contains("third")))
        {
            ThirdSelected = currState;
            selectedButtons.Add("third");
        }
        else if (!currState && selectedButtons.Count > 1)
        {
            ThirdSelected = currState;
            selectedButtons.Remove("third");
        }
    }
}
````
