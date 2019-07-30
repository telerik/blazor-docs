---
title: Set active tab by index
description: how to select or activate a tab by index
type: how-to
page_title: Select tab by index
slug: tabstrip-activate-by-index
position: 
tags: 
ticketid: 1422293
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>TabStrip for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description
I have a TabStrip that renders tabs dynamically based on a list. Is there a way to set the active tab based on an index or a key?

## Solution
The `SetActiveTab` method of the TabStrip requires a reference to the tab. So, you can have a list of references to the tabs and pass the desired item from the list to the method.

````CSHTML
@using Telerik.Blazor.Components.TabStrip
@using Telerik.Blazor.Components.Button
@using Telerik.Blazor.Components.NumericTextBox

<TelerikNumericTextBox @bind-Value="@tabToSelect" Min="0" Max="@tabsCount" Step="1"></TelerikNumericTextBox>
<TelerikButton OnClick="@ActivateChosenTab">Activate the tab with the chosen index</TelerikButton>

<TelerikTabStrip @ref="myTabStrip">
	@{
		foreach (int item in tabTitles)
		{
			<TelerikTab Title="@( "Tab " + item )" @ref="@theTabsRefs[item]">content for tab @item </TelerikTab>
		}
	}
</TelerikTabStrip>

@code {
	Telerik.Blazor.Components.TabStrip.TelerikTabStrip myTabStrip;

	void ActivateChosenTab()
	{
		if(tabToSelect > theTabsRefs.Count) { return; } // avoid errors in a preferred way, this is just an example
		
		myTabStrip.SetActiveTab(theTabsRefs[tabToSelect]);
	}

	int tabsCount = 5; // used for data generation and max for the numeric textbox

	int tabToSelect { get; set; } = 0; // used for binding the desired index in this example

	List<int> tabTitles = new List<int>(); // you may use your own model here, int is used for simplicity because we need an index for the tabs

	List<Telerik.Blazor.Components.TabStrip.TelerikTab> theTabsRefs = new List<Telerik.Blazor.Components.TabStrip.TelerikTab>();

	protected override void OnInit()
	{
		base.OnInit();

		for (int i = 0; i < tabsCount; i++)
		{
			theTabsRefs.Add(new TelerikTab()); // you must initialize the collection so references can be put in it
			tabTitles.Add(i); // populate the list that generates the tabs
		}
	}
}
````

