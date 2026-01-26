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
components: ["tabstrip"]
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

1. Use the [HeaderTemplate](slug:tabstrip-header-template) of the tabs to add the desired close button

1. Have conditional logic to display only the tab you want (for example, loop over a collection of tab descriptor classes, see an example in <a href="https://github.com/telerik/blazor-ui/tree/master/tabstrip/DynamicTabs" target="_blank">this sample project</a>).

1. Stop the propagation of the `@onclick` event on the custom button. 

1. Handle the [`ActiveTabIndexChanged` event](slug:tabstrip-events) explicitly to update the selected tab index

1. In the Close button click handler use the [`Visible` parameter](slug:tabstrip-tabs-configuration#visible) to hide the tab.

>caption Close button on a tab

````RAZOR
Currently active tab index: @ActiveTabIndex

<TelerikTabStrip ActiveTabIndex="@ActiveTabIndex" ActiveTabIndexChanged="@TabIndexChangedHandler">
    <TabStripTab Title="static one">
        The static tab
    </TabStripTab>
    @{
        foreach (TabModel tab in Tabs)
        {
            <TabStripTab Title="@tab.Title" Visible="@tab.isVisibleTab" @key="@tab">
                <HeaderTemplate>
                    <strong>@tab.Title</strong>
                    <button type="button"
                    class="close ml-1"
                    aria-label="Close"
                        @onclick:stopPropagation
                        @onclick="@( () => CloseTab(tab))">
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

@code {
    int ActiveTabIndex { get; set; } // we use it to set the new index we want active

    // sample collection of tab descriptors
    List<TabModel> Tabs = new List<TabModel>()
    {
        new TabModel { Title = "One", isVisibleTab = true },
        new TabModel { Title = "Two", isVisibleTab = true },
        new TabModel { Title = "Three", isVisibleTab = true }
    };

    protected void CloseTab(TabModel tab)
    {
        // update the active tab index only if needed - closing tabs to the right will not affect the current index
        if (Tabs.IndexOf(tab) <= ActiveTabIndex)
        {
            ActiveTabIndex = ActiveTabIndex > 0 ? ActiveTabIndex - 1 : 0;
        }

        tab.isVisibleTab = false;
    }

    void TabIndexChangedHandler(int currIndex)
    {
        ActiveTabIndex = currIndex;
    }

    public class TabModel
    {
        public string Title { get; set; }
        public bool isVisibleTab { get; set; }
    }
}
````
