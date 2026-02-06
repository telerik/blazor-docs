---
title: Templates
page_title: DropDownTree - Templates
description: Use templates in the Telerik DropDownTree for Blazor to customize the component and items' rendering and appearance.
slug: dropdowntree-templates
tags: telerik,blazor,dropdowntree,templates
published: True
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

````RAZOR
<TelerikDropDownTree @ref="@DropDownTreeRef"
                     Data="@DropDownTreeData"
                     @bind-Value="@DropDownTreeValue"
                     @bind-ExpandedItems="@DropDownTreeExpandedItems"
                     TextField="@nameof(TreeItem.Text)"
                     ValueField="@nameof(TreeItem.Id)"
                     Width="300px">
    <DropDownTreeBindings>
        <DropDownTreeBinding Level="0">
            <ItemTemplate>
                @{ TreeItem dataItem = (TreeItem)context; }
                <strong style="color: var(--kendo-color-secondary)">@dataItem.Text</strong>
            </ItemTemplate>
        </DropDownTreeBinding>
        <DropDownTreeBinding>
            <ItemTemplate>
                @{ TreeItem dataItem = (TreeItem)context; }
                <span>@dataItem.Text (<strong>@dataItem.ItemCode</strong>)</span>
            </ItemTemplate>
        </DropDownTreeBinding>
    </DropDownTreeBindings>
    <FooterTemplate>
        @if (DropDownTreeData is not null && DropDownTreeData.Count > 0)
        {
            <div class="header-footer">
                Showing @DropDownTreeData.Count() Items
            </div>
        }
    </FooterTemplate>
    <HeaderTemplate>
        <div class="header-footer">
            <strong>DropDownTree Header</strong>
        </div>
    </HeaderTemplate>
    <NoDataTemplate>
        <TelerikButton OnClick="@OnLoadItemsClick">Load Items</TelerikButton>
    </NoDataTemplate>
    <ValueTemplate>
        @{ var dataItem = (TreeItem)context; }

        <TelerikSvgIcon Icon="@SvgIcon.Unlock" />
        <strong style="color: var(--kendo-color-primary)">@dataItem.Text</strong>
    </ValueTemplate>
</TelerikDropDownTree>

<TelerikButton OnClick="@OnRemoveItemsClick">Remove Data</TelerikButton>
<TelerikButton OnClick="@OnLoadItemsClick">Load Data</TelerikButton>

<style>
    .header-footer {
        text-align: center;
        padding: var(--kendo-spacing-1) var(--kendo-spacing-2);
        background: var(--kendo-color-base-subtle);
    }
</style>

@code {
    private TelerikDropDownTree<TreeItem, int>? DropDownTreeRef;
    private List<TreeItem>? DropDownTreeData { get; set; }
    private List<TreeItem> RawData { get; set; } = new();

    private IEnumerable<object> DropDownTreeExpandedItems { get; set; } = new List<object>();

    private int DropDownTreeValue { get; set; }

    private int IdCounter { get; set; }

    private async Task OnRemoveItemsClick()
    {
        DropDownTreeData?.Clear();
        DropDownTreeExpandedItems = new List<TreeItem>();

        await Task.Delay(350);

        DropDownTreeRef?.Open();
    }

    private async Task OnLoadItemsClick()
    {
        DropDownTreeData = new List<TreeItem>(RawData);
        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.ParentId is null).ToList();

        await Task.Delay(350);

        DropDownTreeRef?.Open();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            RawData.Add(new TreeItem()
            {
                Id = ++IdCounter,
                Text = $"Tree Item {i}",
                HasChildren = true
            });

            int parentId = IdCounter;

            for (int j = 1; j <= 2; j++)
            {
                RawData.Add(new TreeItem()
                {
                    Id = ++IdCounter,
                    ParentId = parentId,
                    Text = $"Tree Item {i}-{j}",
                    ItemCode = GetRandomCode()
                });
            }
        }

        DropDownTreeData = new List<TreeItem>(RawData);
        DropDownTreeExpandedItems = DropDownTreeData.Where(x => x.ParentId is null).ToList();
    }

    private string GetRandomCode()
    {
        return string.Concat((char)Random.Shared.Next(65, 91),
            (char)Random.Shared.Next(65, 91),
            (char)Random.Shared.Next(65, 91));
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string Text { get; set; } = string.Empty;
        public string ItemCode { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demo: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
