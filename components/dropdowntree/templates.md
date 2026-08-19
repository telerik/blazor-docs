---
title: Templates
page_title: DropDownTree - Templates
description: Use templates in the Telerik DropDownTree for Blazor to customize the component and items' rendering and appearance.
slug: dropdowntree-templates
tags: telerik,blazor,dropdowntree,templates
published: True
components: ["dropdowntree"]
position: 40
---

# DropDownTree Templates

The DropDownTree allows you to define templates to customize the component styling and appearance. This article lists all available templates and shows how to use them.

* [Footer template](#footertemplate)
* [Header template](#headertemplate)
* [Item template](#itemtemplate)
* [No data template](#nodatatemplate)
* [Value template](#valuetemplate)
* [Complete runnable example](#example)

## FooterTemplate

The DropDownTree `FooterTemplate` renders optional custom content below the data items in the popup.

>caption Using DropDownTree FooterTemplate

````RAZOR.skip-repl
<TelerikDropDownTree>
    <FooterTemplate>
        <div style="text-align: center;">
            <strong>DropDownTree Footer</strong>
        </div>
    </FooterTemplate>
</TelerikDropDownTree>
````

See the [runnable example below](#example).

## HeaderTemplate

The DropDownTree `HeaderTemplate` renders optional custom content above the data items in the popup. When filtering is enabled, the header template displays between the filtering textbox and the data items.

>caption Using DropDownTree HeaderTemplate

````RAZOR.skip-repl
<TelerikDropDownTree>
    <HeaderTemplate>
        <div style="text-align: center;">
            <strong>DropDownTree Header</strong>
        </div>
    </HeaderTemplate>
</TelerikDropDownTree>
````

See the [runnable example below](#example).

## ItemTemplate

The DropDownTree `ItemTemplate` customizes the content and appearance of the TreeView items in the popup. The template receives a `context` of type `object` that you need to cast to your model type.

Unlike the other DropDownTree templates, the `<ItemTemplate>` tag is a child of the `<DropDownTreeBinding>` tag. This allows you to have different item templates for different TreeView levels.

>caption Using the same DropDownTree ItemTemplate for all levels

````RAZOR.skip-repl
<TelerikDropDownTree>
    <DropDownTreeBindings>
        <DropDownTreeBinding>
            <ItemTemplate>
                @{ TreeItem dataItem = (TreeItem)context; }
                @dataItem.Text
            </ItemTemplate>
        </DropDownTreeBinding>
    </DropDownTreeBindings>
</TelerikDropDownTree>
````

>caption Using DropDownTree ItemTemplate per level

````RAZOR.skip-repl
<TelerikDropDownTree>
    <DropDownTreeBindings>
        <DropDownTreeBinding Level="0">
            <ItemTemplate>
                @{ Category category = (Category)context; }
                @category.Text
            </ItemTemplate>
        </DropDownTreeBinding>
        <DropDownTreeBinding Level="1">
            <ItemTemplate>
                @{ Product product = (Product)context; }
                @product.Text
            </ItemTemplate>
        </DropDownTreeBinding>
    </DropDownTreeBindings>
</TelerikDropDownTree>
````

See the [runnable example below](#example).

## NoDataTemplate

The DropDownTree `NoDataTemplate` allows you to customize the data area of the dropdown when the `Data` parameter is `null` or contains no items.

>caption Using DropDownTree NoDataTemplate

````RAZOR.skip-repl
<TelerikDropDownTree Data="@DropDownTreeData">
    <NoDataTemplate>
        No Data
    </NoDataTemplate>
</TelerikDropDownTree>
````

See the [runnable example below](#example).

## ValueTemplate

The DropDownTree `ValueTemplate` controls the display of the current `Value` when the component is closed. The template receives a `context` of type `object` that you need to cast to the actual model type. Note the type can vary when using [hierarchical data with multiple data item types](slug:dropdowntree-data-binding-hierarchical-data#different-type-at-each-level).

>caption Using DropDownTree ValueTemplate

````RAZOR.skip-repl
<TelerikDropDownTree>
    <ValueTemplate>
        @{ TreeItem dataItem = (TreeItem)context; }
        @dataItem.Text
    </ValueTemplate>
</TelerikDropDownTree>
````

## Example

>caption Using DropDownTree templates

<demo metaUrl="client/dropdowntree/templates/" height="650"></demo>

## See Also

* [Live Demo: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
