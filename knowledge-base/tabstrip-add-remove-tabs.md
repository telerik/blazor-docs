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

I have a collection of items representing separate tabs. I am iterating through that collection to render a tab for each item as shown in the [Tabs Collection article](slug:tabstrip-tabs-collection). I want to allow the user to add and remove tabs. How to achieve that?

This KB article also answers the following questions:

* How to implement add and remove tab functionality with the Telerik TabStrip component.
* How to remove a tab using an "X" button in the tab header.
* How to add a new tab with a "+" button, similar to browser tab controls.
* How to position the add ("+") button next to the last tab header.

## Solution

* Use a [`HeaderTemplate`](slug:tabstrip-header-template) for the tab to add an "X" button.
* Display the "X" button only when there is more than one tab.
* Declare a "+" button for adding tabs.
* Use custom styling and JavaScript to position the "+" button next to the last tab header.

````RAZOR
@inject IJSRuntime JS

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

    // Assure button is never positioned outside the boundaries of the wrapper
    if (totalWidth + addTabButtonWidth > tabStripWrapperWidth) {
    totalWidth = tabStripWrapperWidth - addTabButtonWidth;
    }

    addTabButton.style.left = `${totalWidth}px`;
    };
</script>

@code {
    private string ActiveTabId { get; set; } = string.Empty;

    private List<Tab> Tabs = new List<Tab>
    {
        new Tab { Id = Guid.NewGuid().ToString(), Title = "Tab 1" },
        new Tab { Id = Guid.NewGuid().ToString(), Title = "Tab 2" },
        new Tab { Id = Guid.NewGuid().ToString(), Title = "Tab 3" }
    };

    private void AddTab()
    {
        var tabToAdd = new Tab { Id = Guid.NewGuid().ToString(), Title = "New Tab" };
        Tabs.Add(tabToAdd);

        // Activate the newly added tab
        ActiveTabId = tabToAdd.Id;
    }

    private void RemoveTab(Tab tab)
    {
        if (Tabs.Count <= 1)
        {
            return;
        }

        Tabs.Remove(tab);

        // Activate the first tab after removal
        ActiveTabId = Tabs[0].Id;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await JS.InvokeVoidAsync("positionAddTabButton");
        await base.OnAfterRenderAsync(firstRender);
    }

    public class Tab
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}
````

## See Also

* [Dynamic Tabs](slug:tabstrip-tabs-collection)