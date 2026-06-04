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

1. In the Close button click handler use the [`Visible` parameter](slug:tabstrip-tabs-configuration#visible) to hide the tab.

>caption Close button on a tab

````RAZOR
Currently active tab ID: @ActiveTabId

<TelerikTabStrip ActiveTabId="@ActiveTabId" 
                 ActiveTabIdChanged="@((string newId) => ActiveTabId = newId)">
    <TabStripTab Title="static one" Id="static">
        The static tab
    </TabStripTab>
    @{
        foreach (TabModel tab in Tabs)
        {
            <TabStripTab Title="@tab.Title" 
                         Id="@tab.Id" 
                         Visible="@tab.isVisibleTab" 
                         @key="@tab">
                <HeaderTemplate>
                    <strong>@tab.Title</strong>
                    <button type="button"
                            class="telerik-blazor k-button k-button-xs k-button-flat "
                            aria-label="Close"
                            @onclick:stopPropagation
                            @onclick="@(() => CloseTab(tab))">
                            <span class="k-icon k-i-x"><b>X</b></span>
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
    private string ActiveTabId { get; set; } = "static";
    private List<TabModel> Tabs = new List<TabModel>()
    {
        new TabModel { Id = "tab1", Title = "One", isVisibleTab = true },
        new TabModel { Id = "tab2", Title = "Two", isVisibleTab = true },
        new TabModel { Id = "tab3", Title = "Three", isVisibleTab = true }
    };

    protected void CloseTab(TabModel tab)
    {
        // 1. If we are closing the currently active tab, switch to another
        if (ActiveTabId == tab.Id)
        {
            // Logic to find an alternative:
            // Try to find the previous visible tab in the list
            int idx = Tabs.IndexOf(tab);
            
            if (idx > 0 && Tabs[idx - 1].isVisibleTab)
            {
                ActiveTabId = Tabs[idx - 1].Id;
            }
            else
            {
                // Fallback to "static" tab if no previous tab is available
                ActiveTabId = "static";
            }
        }

        // 2. Hide the tab
        tab.isVisibleTab = false;
    }

    public class TabModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool isVisibleTab { get; set; }
    }
}
````
