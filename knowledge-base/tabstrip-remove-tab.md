---
title: Remove Tab
description: How to add a close button to remove tabs
type: how-to
page_title: How to Remove a Tab
slug: tabstrip-kb-remove-tab
position: 
tags: 
ticketid: 1508419
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
I want a close button on my tabs so the use can remove (close) them. When that happens, I want to have the previous tab selected instead of no tab.

## Solution

1. Use the [HeaderTemplate]({%slug tabstrip-header-template%}) of the tabs to add the desired close button

1. Have conditional logic to display only the tab you want (for example, loop over a collection of tab descriptor classes, see an example in <a href="https://github.com/telerik/blazor-ui/tree/master/tabstrip/DynamicTabs" target="_blank">this sample project</a>).

1. Handle the [`ActiveTabIndexChanged` event]({%slug tabstrip-events%}) explicitly to update the selected tab index

1. In the Close button click handler, raise a flag to suppress the view-model update by the `ActiveTabIndexChanged` event handler - the TabStrip component will raise this event with an index of `-1` when you remove a tab because it will no longer have a selected tab

>caption Close button on a tab

````CSHTML
Currently active tab index: @ActiveTabIndex

<TelerikTabStrip ActiveTabIndex="@ActiveTabIndex" ActiveTabIndexChanged="@TabIndexChangedHandler">
    <TabStripTab Title="static one">
        The static tab
    </TabStripTab>
    @{
        foreach (TabModel tab in Tabs)
        {
            <TabStripTab Title="@tab.Title">
                <HeaderTemplate>
                    <strong>@tab.Title</strong>
                    <button type="button" class="close ml-1" aria-label="Close" @onclick="@( () => CloseTab(tab))">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </HeaderTemplate>
                <Content>
                    Content for tab @tab.Title
                </Content>
            </TabStripTab>
        }
    }
</TelerikTabStrip>

@code{
    int ActiveTabIndex { get; set; } // we use it to set the new index we want active
    bool suppressActiveIndexChange { get; set; } // the flag to suppress the view-model update
    
    // sample collection of tab descriptors
    List<TabModel> Tabs = new List<TabModel>()
    {
        new TabModel { Title = "One" },
        new TabModel { Title = "Two" },
        new TabModel { Title = "Three" }
    };

    protected void CloseTab(TabModel tab)
    {
        // use a flag to avoid the automatic change that will happen
        suppressActiveIndexChange = true;
        
        // update the active tab index only if needed - closing tabs to the right will not affect the current index
        if (Tabs.IndexOf(tab) <= ActiveTabIndex)
        {
            ActiveTabIndex = ActiveTabIndex > 0 ? ActiveTabIndex - 1 : 0;
        }

        Tabs.Remove(tab);
    }

    void TabIndexChangedHandler(int currIndex)
    {
        if (!suppressActiveIndexChange)
        {
            ActiveTabIndex = currIndex;
        }
        suppressActiveIndexChange = false;
    }

    public class TabModel
    {
        public string Title { get; set; }
        // add more fields here to use in a more complex layout and child components
    }
}
````
