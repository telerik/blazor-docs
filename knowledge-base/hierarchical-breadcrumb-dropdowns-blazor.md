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

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Breadcrumb for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

Adding custom components like dropdowns to Breadcrumb crumbs can improve user interaction.

This KB article answers the following questions:
* Is it possible to achieve a hierarchical structure in the Breadcrumb component?
* Is it possible to embed custom components inside Breadcrumb crumbs?
* How to use the `ItemTemplate` to add dropdowns to Breadcrumb items?

## Solution

To embed dropdowns in the Breadcrumb "crumbs", use an [`ItemTemplate`](slug://breadcrumb-templates#itemtemplate). This template allows you to customize the Breadcrumb items, and include other components such as dropdowns.

````RAZOR
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
    private IEnumerable<BreadcrumbItem> Items { get; set; } = new List<BreadcrumbItem>();

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

* [Breadcrumb Templates](https://docs.telerik.com/blazor-ui/components/breadcrumb/templates#itemtemplate)
* [DropDownList Overview](https://docs.telerik.com/blazor-ui/components/dropdownlist/overview)
