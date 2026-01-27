---
title: Add and Remove TabStrip Tabs
description: Learn how to dynamically add and remove tabs
type: how-to
page_title: How to Add and Remove TabStrip Tabs
slug: tabstrip-kb-add-remove-tabs
tags: telerik,blazor,tabstrip,add tabs,remove tabs
ticketid:
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

I have a collection of items representing separate tabs. I am iterating through that collection to render a tab for each item as shown in the [Tabs Collection article](slug:tabstrip-tabs-collection). I want to allow the user to add and remove tabs. How to achieve that?

This KB article also answers the following questions:

* How to implement add and remove tab functionality with the Telerik TabStrip component.
* How to remove a tab using an "X" button in the tab header.
* How to add a new tab with a "+" button, similar to browser tab controls.
* How to position the add ("+") button next to the last tab header.

## Solution

1. [Render the TabStrip tabs in a loop](slug:tabstrip-tabs-collection).
1. Use a [`HeaderTemplate`](slug:tabstrip-header-template) for the tabs to add Remove buttons. You can display the buttons conditionally based on the tab count.
1. Declare a button for adding new tabs.
1. Use custom styling and JavaScript to position the Add button next to the last tab header.

>caption Adding and removing TabStrip tabs at runtime

````RAZOR
@inject IJSRuntime JS

<div class="dynamic-tabstrip-wrapper k-relative">
    <TelerikButton OnClick="@AddTab"
                   Class="add-tab-button !k-absolute k-z-10 k-ratio-1"
                   FillMode="@ThemeConstants.Button.FillMode.Flat"
                   Icon="@SvgIcon.Plus"
                   ThemeColor="@ThemeConstants.Button.ThemeColor.Primary" />

    <TelerikTabStrip @bind-ActiveTabId="@ActiveTabId" PersistTabContent="true">
        @foreach (Tab tab in Tabs)
        {
            <TabStripTab @key="tab.Id" Id="@tab.Id">
                <HeaderTemplate>
                    <div class="k-flex-layout k-gap-2">
                        <span>@tab.Title</span>
                        @if (Tabs.Count > 1)
                        {
                            <TelerikButton OnClick="@(() => RemoveTab(tab))"
                                           Class="remove-tab-button"
                                           FillMode="@ThemeConstants.Button.FillMode.Flat"
                                           Icon="@SvgIcon.X"
                                           Size="@ThemeConstants.Button.Size.Small"
                                           ThemeColor="@ThemeConstants.Button.ThemeColor.Primary" />
                        }
                    </div>
                </HeaderTemplate>
                <Content>
                    Content for <strong>@tab.Title</strong>
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

@* Move JavaScript code to a JS file *@
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


@code {
    private List<Tab> Tabs = new List<Tab>()
    {
        new Tab { Title = "Tab 1" },
        new Tab { Title = "Tab 2" },
        new Tab { Title = "Tab 3" }
    };

    private string ActiveTabId { get; set; } = string.Empty;

    private bool ShouldPositionAddButton { get; set; }

    private int LastTabNumber { get; set; } = 3;

    private void AddTab()
    {
        Tab tabToAdd = new Tab { Id = Guid.NewGuid().ToString(), Title = $"New Tab {++LastTabNumber}" };

        Tabs.Add(tabToAdd);

        //In this example, we are always activating the newly added tab. Adjust the logic to activate a different tab if needed.
        ActiveTabId = tabToAdd.Id;

        ShouldPositionAddButton = true;
    }

    private void RemoveTab(Tab tab)
    {
        if (Tabs.Count <= 1)
        {
            return;
        }

        // Activate the tab after or before the removed one if it's active
        if (ActiveTabId == tab.Id)
        {
            int removedTabIndex = Tabs.FindIndex(x => x.Id == tab.Id);
            if (removedTabIndex == Tabs.Count - 1)
            {
                ActiveTabId = Tabs.ElementAt(removedTabIndex - 1).Id;
            }
            else
            {
                ActiveTabId = Tabs.ElementAt(removedTabIndex + 1).Id;
            }
        }

        Tabs.Remove(tab);

        ShouldPositionAddButton = true;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender || ShouldPositionAddButton)
        {
            ShouldPositionAddButton = false;
            await JS.InvokeVoidAsync("positionAddTabButton");
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public class Tab
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Title { get; set; } = string.Empty;
    }

}
````

## See Also

* [Dynamic Tab Collection](slug:tabstrip-tabs-collection)
* [TabStrip Tab `HeaderTemplate`](slug:tabstrip-header-template)
