---
title: Add and Remove Tabs
description: Learn how to dynamically add and remove tabs
type: how-to
page_title: Add and Remove Tabs
slug: tabstrip-kb-add-remove-tabs
tags: telerik,blazor,tabstrip,add tabs,remove tabs
ticketid: 
res_type: kb
previous_url: /knowledge-base/tabstrip-dynamic-tabs
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

I have a collection of items representing separate tabs. I am iterating through that collection to render a tab for each item as shown [here](slug:tabstrip-tabs-collection). I want to allow the user to add and remove tabs, how to achieve that?

This KB article answers the following questions:

* How to remove a tab with a "X" button in the tab header?
* How to use a button to add tabs and position this button next to the last tab header (similar to the "+" button in the browser)?

## Solution

The example below shows how to:
* Use a [`HeaderTemplate`](slug:tabstrip-header-template) for the tab to add a button that removes the tab.
* Conditionally display the "X" button based on the tabs' count.
* Declare a button for adding tabs.
* Use custom styling and JavaScript to position the "+" button next to the last tab header.

````RAZOR
@inject IJSRuntime JS

<style>
    .dynamic-tabstrip-wrapper {
        --add-tab-button-size: 32.8px;
    }

        .dynamic-tabstrip-wrapper .k-tabstrip-items {
            max-width: calc(100% - var(--add-tab-button-size));
        }

        .dynamic-tabstrip-wrapper .add-tab-button {
            width: var(--add-tab-button-size);
            padding-block: 6px;
            z-index: 10000;
        }

    .remove-tab-button {
        padding: 0 !important;
    }
</style>

<div class="dynamic-tabstrip-wrapper k-relative">
    <TelerikButton OnClick="@AddTab"
                   Class="add-tab-button !k-absolute k-z-10 k-ratio-1"
                   Icon="@SvgIcon.Plus"
                   FillMode="@ThemeConstants.Button.FillMode.Flat"
                   ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                   Rounded="@ThemeConstants.Button.Rounded.Full" />
    <TelerikTabStrip @bind-ActiveTabId="@ActiveTabId" PersistTabContent="true">
        @foreach (Tab tab in Tabs)
        {
            <TabStripTab @key="tab.Id" Id="@tab.Id">
                <HeaderTemplate>
                    <div class="k-flex-layout k-gap-2">
                        @tab.Title
                        @if (Tabs.Count > 1)
                        {
                            <TelerikButton OnClick="@(() => RemoveTab(tab))"
                                           Class="remove-tab-button"
                                           Icon="@SvgIcon.X"
                                           FillMode="@ThemeConstants.Button.FillMode.Flat"
                                           ThemeColor="@ThemeConstants.Button.ThemeColor.Primary" />
                        }
                    </div>
                </HeaderTemplate>
                <Content>
                    Content for @tab.Title
                </Content>
            </TabStripTab>
        }
    </TelerikTabStrip>
</div>

@code {
    private string ActiveTabId { get; set; }

    private List<Tab> Tabs = new List<Tab>()
    {
        new Tab { Id = Guid.NewGuid().ToString(), Title = "Tab 1" },
        new Tab { Id = Guid.NewGuid().ToString(), Title = "Tab 2" },
        new Tab { Id = Guid.NewGuid().ToString(), Title = "Tab 3" }
    };

    private void AddTab()
    {
        Tab tabToAdd = new Tab { Id = Guid.NewGuid().ToString(), Title = $"New Tab" };

        Tabs.Add(tabToAdd);

        //In this example, we are always activating the newly added tab. Adjust the logic to activate a different tab if needed.
        ActiveTabId = tabToAdd.Id;
    }

    private void RemoveTab(Tab tab)
    {
        if (Tabs.Count <= 1)
        {
            return;
        }             
       
        Tabs.Remove(tab);

        //In this example, we are always activating the first tab. Adjust the logic to determine which tab to activate after removal.
        ActiveTabId = Tabs[0].Id;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await JS.InvokeVoidAsync("positionAddTabButton");

        await base.OnAfterRenderAsync(firstRender);
    }

    public class Tab
    {
        public string Id { get; set; }

        public string Title { get; set; }
    }

}

<script suppress-error="BL9992">
    window.positionAddTabButton = () => {
        const tabStripItems = Array.from(document.querySelectorAll(".dynamic-tabstrip-wrapper .k-tabstrip-item"));
        const tabStripWrapperWidth = document.querySelector(".dynamic-tabstrip-wrapper").scrollWidth;

        let totalWidth = !tabStripItems ? 0 : tabStripItems.reduce(
            (accumulator, currentItem) => accumulator + parseFloat(currentItem.getBoundingClientRect().width),
            0,
        );

        const addTabButton = document.querySelector(".add-tab-button");
        const addTabButtonWidth = addTabButton.getBoundingClientRect().width;

        // assure button is never positioned outside the boundaries of the wrapper
        if (totalWidth + addTabButtonWidth > tabStripWrapperWidth) {
            totalWidth = tabStripWrapperWidth - addTabButtonWidth;
        }

        addTabButton.style.left = `${totalWidth}px`;
    };
</script>
````

## See Also

* [Dynamic Tabs](slug:tabstrip-tabs-collection)