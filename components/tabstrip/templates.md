---
title: Templates
page_title: TabStrip Templates
description: Templates for the Blazor TabStrip component
slug: tabstrip-templates
tags: telerik,blazor, tabstrip, header, template
published: True
position: 50
components: ["tabstrip"]
previous_url: /components/tabstrip/header-template
---

# TabStrip Templates

The TabStrip templates allow you to customize the HTML output and styling of some component elements. This article describes the available TabStrip templates and how to use them.

## Header Template

The TabStrip `HeaderTemplate` allows you to define custom content instead of plain text `Title` for each tab. The template can include HTML markup, components, [icons](slug:common-features-icons) or [badges](slug:badge-overview).

If both the `Title` parameter and the `HeaderTemplate` are defined for a `TabStripTab`, then the `HeaderTemplate` takes precedence.

Using a `HeaderTemplate` requires you to define the tab content inside a `<Content>` child tag of `<TabStripTab>`. Otherwise, the `<Content>` tag is optional and you can insert the tab content directly between the opening and closing tag of the tab.

>caption Using TabStrip HeaderTemplate

<demo metaUrl="client/tabstrip/headertemplate/" height="420"></demo>

>tip For styling customizations on the tab headers, you can use the `TabStripTab` `Class` parameter instead of a `HeaderTemplate`, or use both at the same time.

## Suffix Template

The `TabStripSuffixTemplate` allows you to render custom content after the last tab header, for example labels or buttons.

When using a Suffix Template, you must wrap the `<TabStripTab>` tags by a `<ChildContent>` tag.

The Suffix Template disables the rendering of the built-in [Overflow Menu](slug:tabstrip-scrolling-overflow). When you need both features, [add a `TabStripOverflowMenu` component to the `TabStripSuffixTemplate`](slug:tabstrip-scrolling-overflow#tabstripoverflowmenu-component) explicitly.

>caption Using TabStrip SuffixTemplate

````RAZOR
<TelerikTabStrip @bind-ActiveTabId="@TabStripActiveTabId"
                 Height="300px">
    <TabStripSuffixTemplate>
        <TelerikButton Icon="@SvgIcon.ArrowLeft"
                       OnClick="@OnPreviousClick"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       Title="Previous Tab" />
        <TelerikButton Icon="@SvgIcon.ArrowRight"
                       OnClick="@OnNextClick"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       Title="Next Tab" />
    </TabStripSuffixTemplate>
    <ChildContent>
        @for (int i = 1; i <= 5; i++)
        {
            string tabId = i.ToString();
            string tabTitle = $"Tab {i}";
            <TabStripTab @key="@tabId"
                         Id="@tabId"
                         Title="@tabTitle">
                <p>Content of @tabTitle</p>
            </TabStripTab>
        }
    </ChildContent>
</TelerikTabStrip>

@code {
    private string TabStripActiveTabId { get; set; } = "1";
    private const int TabCount = 5;

    private TabStripTabAlignment TabStripTabAlignment { get; set; } = TabStripTabAlignment.Start;
    private TabPosition TabStripTabPosition { get; set; } = TabPosition.Top;
    private readonly TabStripTabAlignment[] TabStripTabAlignments = new[]
    {
        TabStripTabAlignment.Center,
        TabStripTabAlignment.End,
        TabStripTabAlignment.Justify,
        TabStripTabAlignment.Start,
        TabStripTabAlignment.Stretched
    };

    private readonly TabPosition[] TabPositions = new[]
    {
        TabPosition.Bottom,
        TabPosition.Left,
        TabPosition.Right,
        TabPosition.Top
    };

    private void OnPreviousClick()
    {
        int currentTabId = GetActiveTabId();
        int previousTabId = Math.Max(currentTabId - 1, 1);
        TabStripActiveTabId = previousTabId.ToString();
    }

    private void OnNextClick()
    {
        int currentTabId = GetActiveTabId();
        int nextTabId = Math.Min(currentTabId + 1, TabCount);
        TabStripActiveTabId = nextTabId.ToString();
    }

    private int GetActiveTabId()
    {
        return int.Parse(TabStripActiveTabId);
    }
}
````

## Next Steps

* [Handle TabStrip Events](slug:tabstrip-events)

## See Also

* [Live Demo: TabStrip Header Template](https://demos.telerik.com/blazor-ui/tabstrip/header-template)
