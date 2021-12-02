---
title: Tabs Collection
page_title: Tabs Collection
description: Overview of the TabStrip for Blazor.
slug: tabstrip-tabs-collection
tags: telerik,blazor,tab,strip,tabstrip,collection
published: True
position: 17
---

# Tabs Collection

The TabStrip allows you to render its tabs by iterating a collection of configurable objects.

This is an alternative approach for configuring the component instead of manually declaring each tab as a separate `TabStripTab` instance inside the `TabStrip` tag.

>tip If you render components in the tabs created in a `foreach` loop, you may want to set their `@key` parameter to unique values, in order to ensure they will re-render. If you do not, the framework will render one instance of your custom component for all tabs and will only set its parameters, it will not initialize anew (`OnInitialized` will not fire a second time, only `OnParametersSet` will).

>caption Extract information for the currently selected tab from your model. Alter the model to affect the TabStrip. Create tabs dynamically based on external data.

You can find another example with some more details in the following sample project: [Dynamic Tabs](https://github.com/telerik/blazor-ui/tree/master/tabstrip/DynamicTabs).

````CSHTML
@result

<TelerikTabStrip ActiveTabIndexChanged="@TabChangedHandler">
    @{
        foreach (MyTabModel item in tabs)
        {
            <TabStripTab Title="@item.Title" Disabled="@item.Disabled">
                Content for tab @item.Title
            </TabStripTab>
        }
    }
</TelerikTabStrip>

<TelerikButton OnClick="@( () => tabs[1].Disabled = !tabs[1].Disabled )">Toggle the Disabled state of the second tab</TelerikButton>

@code {
    MarkupString result { get; set; }
    void TabChangedHandler(int newIndex)
    {
        string tempResult = $"current tab {newIndex} selected on {DateTime.Now}";
        MyTabModel currTab = tabs[newIndex];
        tempResult += $"<br />the new tab has a title {currTab.Title}";
        result = new MarkupString(tempResult);
    }

    List<MyTabModel> tabs = new List<MyTabModel>()
    {
        new MyTabModel { Title = "One" },
        new MyTabModel { Title = "Two", Disabled = true },
        new MyTabModel { Title = "Three" }
    };

    public class MyTabModel
    {
        public string Title { get; set; }
        public bool Disabled { get; set; }
    }
}
````

## See Also

  * [Live Demo: TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/index)