---
title: Integration
page_title: Dialog Integration
description: Learn how to integrate Blazor components like the Checkbox and the Filter into the Blazor Dialog and explore the practical sample code.
slug: dialog-integration
tags: telerik,blazor,dialog,integration
published: True
position: 9
components: ["dialog"]
---
# Integrating Components into the Blazor Dialog

A common application requirement is to display other Blazor components in the Blazor Dialog. You can achieve this by placing them inside the `DialogContent`.

>The two-way binding for the parameters of the components nested in the `DialogContent` may not work as expected. The Dialog needs to [`Refresh`](slug:dialog-overview#dialog-reference-and-methods) to reflect UI changes.

This article contains the following examples:

* [Checkbox integration in Dialog](#checkbox-in-a-dialog)
* [Filter integration in Dialog](#filter-in-a-dialog)

## CheckBox in a Dialog

To use a CheckBox component in the Dialog:

1. Include the [Telerik CheckBox](slug:checkbox-overview) as `DialogContent`.
1. Set the [`Value` parameter](slug:checkbox-overview#checkbox-parameters) of the CheckBox with two-way binding.
1. Invoke the [Dialog `Refresh` method](slug:dialog-overview#dialog-reference-and-methods) in the [CheckBox `OnChange` event](slug:checkbox-events#onchange).

>caption Using CheckBox in Dialog

````RAZOR
@using Telerik.DataSource

<TelerikDialog @ref="DialogRef" Visible="true">
    <DialogContent>
        <TelerikCheckBox Id="MyCheckBox" @bind-Value="@IsSelected" OnChange="@OnCheckBoxValueChanged" />
        <label for="MyCheckBox">@(IsSelected ? "Selected" : "Not selected")</label>
    </DialogContent>
</TelerikDialog>

@code {
    private bool IsSelected { get; set; }

    private TelerikDialog DialogRef { get; set; }

    private void OnCheckBoxValueChanged()
    {
        DialogRef.Refresh();
    }
}
````

## Filter in a Dialog

To use a Filter component in the Dialog:

1. Include the [Telerik Filter](slug:filter-overview) inside `<DialogContent>`.
1. Set the [`Value` parameter](slug:filter-overview#filter-parameters) of the Filter with one-way binding.
1. Invoke the [Dialog `Refresh` method](slug:dialog-overview#dialog-reference-and-methods) in the [Filter `OnUpdate` event](slug:filter-events#onupdate).

>caption Using Filter in Dialog

````RAZOR
@using Telerik.DataSource

<TelerikDialog @ref="DialogRef" Visible="true" Width="66vw" Height="66vh">
    <DialogContent>
        <TelerikFilter Value="@FilterValue" OnUpdate="@OnFilterUpdate">
            <FilterFields>
                <FilterField Name="@(nameof(Product.Name))" Type="@(typeof(string))" />
                <FilterField Name="@(nameof(Product.Price))" Type="@(typeof(decimal))" />
                <FilterField Name="@(nameof(Product.Quantity))" Type="@(typeof(int))" />
                <FilterField Name="@(nameof(Product.Discontinued))" Type="@(typeof(bool))" />
            </FilterFields>
        </TelerikFilter>
    </DialogContent>
</TelerikDialog>

@code {
    private TelerikDialog? DialogRef { get; set; }

    private CompositeFilterDescriptor FilterValue { get; set; } = new();

    private void OnFilterUpdate()
    {
        DialogRef?.Refresh();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
