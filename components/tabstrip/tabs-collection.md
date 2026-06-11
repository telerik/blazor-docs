---
title: Dynamic Tabs
page_title: TabStrip - Dynamic Tabs
description: Learn how to use the ActiveTabId parameter in the Telerik TabStrip for Blazor to manage dynamic tabs.
slug: tabstrip-tabs-collection
tags: telerik,blazor,tabstrip,dynamic tabs
published: True
position: 60
components: ["tabstrip"]
previous_url: /components/tabstrip/tabs-configuration
---

# TabStrip Dynamic Tabs

*Dynamic tabs* signify the ability to add and remove tabs at runtime, or change their configuration. The Telerik Blazor TabStrip allows you to define tabs by iterating a collection of objects. This article describes the implementation milestones of such scenarios.

## Hiding and Showing Tabs

The TabStrip tabs can be hidden or shown by setting their `Visible` boolean parameter. Setting `Visible` to `false` hides the tab from the tab list, but keeps it in the tab collection. Changing the tab visibility at runtime preserves the tab order. This is in contrast to adding a new tab at runtime, which adds it at the last position.

The `TabStripTab` component has a `Closeable` parameter with a `false` default value. When `Closeable` is enabled, the tab renders a built-in Close button. Closing a tab sets its `Visible` parameter to `false`. In this case, you must either use the `Visible` parameter with two-way binding (`@bind-Visible="..."`), or handle the [`VisibleChanged` event](slug:tabstrip-events#visiblechanged) that fires when a tab is closed. Either approach ensures that the tab state matches the app state. You can use the `VisibleChanged` event to intercept close actions, for example, show a [confirmation dialog](slug:dialog-predefined).

Showing hidden tabs is possible with custom UI.

Also see the [more comprehensive example](#example) below.

>caption Using the tab Closeable and Visible parameters, and the VisibleChanged event

````RAZOR
<TelerikTabStrip>
    <TabStripTab Id="tab1"
                 Closeable="true"
                 Title="First"
                 @bind-Visible="@FirstTabVisible">
        <p>First tab content. This tab can be closed immediately.</p>
        <p>Closing the second tab requires a user confirmation.</p>
        <p>The third tab cannot be closed.</p>
    </TabStripTab>
    <TabStripTab Id="tab2"
                 Closeable="true"
                 Title="Second"
                 Visible="@SecondTabVisible"
                 VisibleChanged="@SecondTabVisibleChanged">
        <p>Second tab content. Closing this tab requires a user confirmation.</p>
    </TabStripTab>
    <TabStripTab Id="tab3"
                 Title="Third">
        <p>Third tab content. This tab cannot be closed.</p>
    </TabStripTab>
</TelerikTabStrip>

<TelerikButton OnClick="@(() => FirstTabVisible = SecondTabVisible = true)">Show Closed Tabs</TelerikButton>

@code {
    private bool FirstTabVisible { get; set; } = true;
    private bool SecondTabVisible { get; set; } = true;

    [CascadingParameter]
    public DialogFactory? TelerikDialogs { get; set; }

    private async Task SecondTabVisibleChanged(bool newVisible)
    {
        if (await TelerikDialogs!.ConfirmAsync("Are you sure you want to close the second tab?"))
        {
            SecondTabVisible = newVisible;
        }
    }
}
````

## Adding and Removing Tabs

The TabStrip uses declarative tab definitions and is not a databound component. To change the actual number of tab objects in the component (no matter their visibility), you need to:

* Render the tabs in a loop, based on a collection of objects. Always set a [`@key` attribute](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships) to the `<TabStripTab>` tags.
* Change the number of members in the looped collection through custom UI and application logic.

Also see the [runnable example](#example) below.

>caption Rendering TabStrip tabs in a loop

````RAZOR.skip-repl
<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId">
    @foreach (TabDescriptor tab in TabDescriptors)
    {
        <TabStripTab @key="@tab"
                     Id="@tab.Id"
                     Title="@tab.Title">
            <p>Content of Tab @tab.Title</p>
        </TabStripTab>
    }
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = string.Empty;

    private List<TabDescriptor> TabDescriptors { get; set; } = new();

    public class TabDescriptor
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = "Tab Title";
    }
}
````

## Changing Tab Settings

The app can change the `TabStripTab` parameter values at any time.

Some [`TabStripTab` parameters](slug:telerik.blazor.components.tabstriptab) support two-way binding, for example, [`Visible`](#hiding-and-showing-tabs) and [`Pinned`](slug:tabstrip-tab-reorder). If users can change these tab properties at runtime, you must use two-way parameter binding or the respective [`Changed` event](slug:tabstrip-events). Otherwise the TabStrip state may become invalid and reset unexpectedly when the UI refreshes.

## Example

The following sample shows how to:

* Define the TabStrip tab configuration through a collection of custom descriptors. Some tabs are closed, pinned, disabled or not closable.
* Use a `@key` when rendering Blazor components in a loop, which is a [standard Blazor requirement](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships).
* Synchronize the `Pinned` and `Visible` state of the tabs with the underlying tab descriptor collection.
* [Display scroll buttons automatically](slug:tabstrip-scroll-tabs) when the tabs no longer fit the available space.
* Use a [`TabStripSuffixTemplate`](slug:tabstrip-templates) to add custom buttons in the tab row.
* Use the [`VisibleChanged` event](slug:tabstrip-events#visiblechanged) to hide closed tabs (default) or completely remove them from the tab collection. Tab removal can also be implemented through the [`OnStateChanged` event](slug:tabstrip-events#onstatechanged).
* Add more tabs at runtime.
* Show closed (hidden) tabs.

````RAZOR
<p><label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ShouldRemoveClosedTabs" /> Remove Closed Tabs</label></p>

<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 EnableTabReorder="true"
                 Height="300px"
                 OverflowMode="@TabStripOverflowMode.Scroll"
                 ScrollButtonsPosition="@TabStripScrollButtonsPosition.Split"
                 ScrollButtonsVisibility="@TabStripScrollButtonsVisibility.Auto"
                 Width="800px">
    <TabStripSuffixTemplate>
        <TelerikButton Icon="@SvgIcon.Plus"
                       OnClick="@OnAddTabButtonClick"
                       Title="Add New Tab"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Success" />
        <TelerikButton Icon="@SvgIcon.Eye"
                       OnClick="@OnShowTabButtonClick"
                       Title="Reopen Closed Tabs"
                       Enabled="@(TabDescriptors.Any(tab => !tab.Visible))" />
        <TelerikButton Icon="@SvgIcon.Trash"
                       OnClick="@OnRemoveTabButtonClick"
                       Title="Remove All Tabs"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Error" />
    </TabStripSuffixTemplate>
    <ChildContent>
        @foreach (TabDescriptor tab in TabDescriptors)
        {
            <TabStripTab @key="@tab"
                         Closeable="@tab.Closeable"
                         Disabled="@tab.Disabled"
                         Id="@tab.Id"
                         Pinnable="@tab.Pinnable"
                         @bind-Pinned="@tab.Pinned"
                         Title="@tab.Title"
                         Visible="@tab.Visible"
                         VisibleChanged="@((bool newVisible) => TabStripTabVisibleChanged(tab, newVisible))">
                <p>Content of tab with <code>Id</code> <strong>@tab.Id</strong> and <code>Title</code> <strong>@tab.Title</strong></p>
                <ul>
                    <li>Total Tabs: <strong>@TabDescriptors.Count</strong></li>
                    <li>Visible Tabs: <strong>@TabDescriptors.Count(tab => tab.Visible)</strong></li>
                    <li>Hidden Tabs: <strong>@TabDescriptors.Count(tab => !tab.Visible)</strong></li>
                    <li>Pinned Tabs: <strong>@TabDescriptors.Count(tab => tab.Pinned)</strong></li>
                    <li>Disabled Tabs: <strong>@TabDescriptors.Count(tab => tab.Disabled)</strong></li>
                </ul>
            </TabStripTab>
        }
    </ChildContent>
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = string.Empty;
    private int LastId { get; set; }

    private bool ShouldRemoveClosedTabs { get; set; }

    private List<TabDescriptor> TabDescriptors { get; set; } = new();

    private void OnAddTabButtonClick()
    {
        TabDescriptors.Add(new TabDescriptor
        {
            Id = $"tab{++LastId}",
            Title = $"Tab {LastId}",
            Closeable = true,
            Pinnable = true,
        });
    }

    private void OnShowTabButtonClick()
    {
        TabDescriptors.ForEach(tab => tab.Visible = true);
    }

    private void OnRemoveTabButtonClick()
    {
        TabDescriptors.Clear();
    }

    private void TabStripTabVisibleChanged(TabDescriptor tabDescriptor, bool newVisible)
    {
        tabDescriptor.Visible = newVisible;

        if (ShouldRemoveClosedTabs && !newVisible)
        {
            TabDescriptors.Remove(tabDescriptor);
        }
    }

    protected override void OnInitialized()
    {
        TabDescriptors = Enumerable.Range(1, 7).Select(x => new TabDescriptor
        {
            Id = $"tab{++LastId}",
            Title = $"Tab {LastId}",
            Closeable = LastId != 4,
            Disabled = LastId == 3,
            Pinnable = true,
            Pinned = LastId == 5,
            Visible = LastId != 2,
        }).ToList();

        TabStripActiveTabId = TabDescriptors.First().Id;
    }

    public class TabDescriptor
    {
        public bool Closeable { get; set; }
        public bool Disabled { get; set; }
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public bool Pinnable { get; set; }
        public bool Pinned { get; set; }
        public string Title { get; set; } = "Tab Title";
        public bool Visible { get; set; } = true;
    }
}
````

## See Also

* [TabStrip Events](slug:tabstrip-events)
