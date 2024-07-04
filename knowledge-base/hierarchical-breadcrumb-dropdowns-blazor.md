---
title: Hierarchical Breadcrumb in Blazor
description: Learn how to customize the Breadcrumb for Blazor by embedding dropdowns within Breadcrumb items to optimize user interaction and functionality.
type: how-to
page_title: Hierarchical Breadcrumb in Blazor
slug: hierarchical-breadcrumb-dropdowns-blazor
tags: breadcrumb, blazor, customization, dropdown, itemtemplate, hierarchical
res_type: kb
ticketid: 1652751
---

## Environment

| Product |
| --- |
| Breadcrumb for Blazor |

## Description

Incorporating custom components, such as dropdowns, within certain Breadcrumb "crumbs" can significantly enhance user interaction and functionality.

This KB article also answers the following questions:
- Is it possible to achieve a Breadcrumb hierarchical structure?
- Is it possible to embed custom components within Breadcrumb crumbs?
- How to use the `ItemTemplate` for adding dropdowns to Breadcrumb items?

## Solution

To embed dropdowns within the Breadcrumb "crumbs", utilize the `ItemTemplate`. This template allows for the customization of Breadcrumb items, enabling the inclusion of complex components such as dropdowns.

````CSHTML
@*The dropdown's appearance is customized to blend with the Breadcrumb by adjusting the border color and preventing text decoration changes on hover.*@

<TelerikBreadcrumb Data="@Items">
    <ItemTemplate>
        @if (context.Items != null && context.Items.Any())
        {
            var values = new List<string> { context.Text }.Concat(context.Items.Select(x => x.Text));
            var value = context.SelectedChildren?.Text ?? context.Text;
            <TelerikDropDownList FillMode="@ThemeConstants.DropDownList.FillMode.Flat" 
                                 Data="@values" 
                                 Class="breadcrumb-ddl"
                                 Value="@value"
                                 ValueChanged="@((string value) => OnValueChanged(context, value))">
                <DropDownListSettings>
                    <DropDownListPopupSettings Height="auto" />
                </DropDownListSettings>
            </TelerikDropDownList>
        }
        else
        {
            <span>@context.Text</span>
        }
    </ItemTemplate>
</TelerikBreadcrumb>

<style>
    .breadcrumb-ddl {
        border-color: transparent !important;
    }

    .k-breadcrumb-link:hover:has(.k-dropdownlist) {
        text-decoration: none;
    }
</style>

@code {
    private IEnumerable<BreadcrumbItem> Items = new List<BreadcrumbItem>();

    private void OnValueChanged(BreadcrumbItem item, string value)
    {
        item.SelectedChildren = item.Items.FirstOrDefault(x => x.Text == value);
    }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Text = "Telerik UI for Blazor" },
            new BreadcrumbItem { Text = "Components", Items = new List<BreadcrumbItem> { new BreadcrumbItem { Text = "AutoComplete" }, new BreadcrumbItem { Text = "Calendar" }, new BreadcrumbItem { Text = "Grid" } } },
            new BreadcrumbItem { Text = "Templates" },
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public List<BreadcrumbItem> Items { get; set; }
        public BreadcrumbItem SelectedChildren { get; set; }
    }
}
````

## See Also

- [Breadcrumb Templates Documentation](https://docs.telerik.com/blazor-ui/components/breadcrumb/templates#itemtemplate)
- [DropDownList Documentation](https://docs.telerik.com/blazor-ui/components/dropdownlist/overview)
