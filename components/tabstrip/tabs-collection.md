---
title: Dynamic Tabs
page_title: TabStrip - Dynamic Tabs
description: Learn how to use the ActiveTabId parameter in the Telerik TabStrip for Blazor to manage dynamic tabs.
slug: tabstrip-tabs-collection
tags: telerik,blazor,tabstrip,dynamic tabs
published: True
position: 3
---

# Dynamic Tabs in TabStrip

In some cases, you might need to declare tabs for objects in a collection. The Telerik TabStrip allows you to render its tabs by iterating that collection. 

The Telerik Tabstrip supports effective management of dynamic tabs through the `ActiveTabId` parameter and the [`ActiveTabIdChanged`](slug:tabstrip-events#activetabidchanged) event. These features allow users to specify or track the active tab using its unique ID, making it easier to work with dynamic tab scenarios.

## ActiveTabId Parameter

The `ActiveTabId` parameter allows you to manage the active tab by its ID. It supports two-way binding, allowing seamless updates between the component and the application state.

To deactivate all tabs, set the ActiveTabId parameter to `string.Empty`.

>caption Using the `ActiveTabId` parameter to manage dynamic tabs

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@ActiveTabId">
    @{
        foreach (var tab in Tabs)
        {
            <TabStripTab @key="tab.Id" Id="@tab.Id" Title="@tab.Title" Visible="@tab.Visible" Disabled="@tab.Disabled">
                <HeaderTemplate>
                    <span>@tab.Title</span>
                </HeaderTemplate>
                <Content>
                    @if (tab.Id == "home")
                    {
                        <p>Welcome back! Check out the latest updates and news here.</p>
                    }
                    else if (tab.Id == "profile")
                    {
                        <p>Update your personal information and preferences in this section.</p>
                    }
                    else if (tab.Id == "settings")
                    {
                        <p>Customize your experience by adjusting your settings here.</p>
                    }
                </Content>
            </TabStripTab>
        }
    }
</TelerikTabStrip>

@code {
    private string ActiveTabId { get; set; }

    private List<Tab> Tabs { get; set; } = new List<Tab>
    {
        new Tab { Id = "home", Title = "🏠 Home", Visible = true, Disabled = false },
        new Tab { Id = "profile", Title = "👤 Profile", Visible = true, Disabled = false },
        new Tab { Id = "settings", Title = "⚙️ Settings", Visible = true, Disabled = false }
    };

    public class Tab
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool Visible { get; set; }
        public bool Disabled { get; set; }
    }
}
````

## Add and Remove Tabs

If you are iterating through a collection to render the tabs and you need to allow the users to add and remove tabs, you may use the `ActiveTabId` parameter to set the active tab after adding and removing tabs. See details and example in this article: [Add and Remove Tabs](slug:tabstrip-kb-add-remove-tabs).


## See Also

* [TabStrip Events](slug:tabstrip-events)
