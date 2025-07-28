---
title: Extend or Inherit Telerik Blazor Components
description: Learn how to extend, inherit, wrap, and reuse Telerik UI for Blazor components, so that the app uses a Telerik component instance with similar settings or behavior at multiple places.
type: how-to
page_title: How to Extend, Inherit, or Wrap Telerik Components for Blazor
slug: common-kb-component-inheritance
tags: telerik, blazor, inheritance
ticketid: 1628856, 1615737, 1604776, 1607228, 1618168, 1690926, 1694691
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to extend and customize Telerik components?
* How to inherit Telerik components and change their properties or methods?
* How to wrap and reuse Telerik components for Blazor?

## Solution

There are two ways to extend, inherit, reuse or wrap Telerik components for Blazor. Both of them are demonstrated in the [example below](#example).

* [Composition&mdash;wrap the Telerik component in another Razor component](#wrap-telerik-components)
* [Inheritance&mdash;inherit the Telerik component in a C# class](#inherit-telerik-components)

The sections below discuss the differences between the two alternatives. On the other hand, both options allow you to:

* Reuse a Telerik component with similar or identical configuration at multiple places in your app.
* Add new parameters.
* Set default values to parameters, so that there is no need to do that everywhere in the app.

On the other hand, neither option allows changing the internal HTML rendering of the Telerik component.

> Using both options at the same time is not possible and will lead to runtime exceptions, because such a setup will nest a Telerik component in itself. The following JavaScript error will likely occur: `Cannot read properties of null (reading addEventListener)`.

> The development tasks discussed in this article fall outside the Telerik support scope.

### Wrap Telerik Components

This approach allows you to add additional markup or other components next to the Telerik component.

1. Add the Telerik component to a separate `.razor` file, for example, `MyReusableComponent.razor`.
1. Implement the desired `MyReusableComponent` parameters and set the required parameters of the Telerik component.
1. Add any other optional content next to the Telerik component.

### Inherit Telerik Components

This approach allows you to modify the built-in API and life cycle events of the Telerik component.

1. Create a class that inhefits from a Telerik component class, for example, `MyInheritedComponent.cs`.
1. Implement API member overrides or change default API member values.

## Example

The following example includes three files:

* `Home.razor` is the component (page) that consumes the inherited and wrapped Telerik components.
* `ReusableComboBox.razor` shows a wrapped Telerik ComboBox.
* `InheritedComboBox.cs` shows an inheriteed Telerik ComboBox.

Adjust the `YourAppName.BaseComponents` namespace in `Home.razor` and `InheritedComboBox.cs` to run the code successfully in your app.

<div class="skip-repl"></div>

````RAZOR Home.razor
@page "/"

@using YourAppName.BaseComponents

<p><strong>Telerik ComboBox</strong></p>

<TelerikComboBox Data="@ListItems"
                 @bind-Value="@SelectedValue"
                 GroupField="@nameof(ListItem.Category)"
                 TextField="@nameof(ListItem.Text)"
                 ValueField="@nameof(ListItem.Id)"
                 Class="my-combobox"
                 Filterable="true"
                 FilterOperator="@StringFilterOperator.Contains"
                 Width="200px" />

<p style="margin-top:2em"><strong>Inherited ComboBox</strong> with additional API and default property values</p>

<InheritedComboBox @ref="@InheritedComboBoxRef"
                   Data="@ListItems"
                   @bind-Value="@SelectedValue"
                   GroupField="@nameof(ListItem.Category)"
                   TextField="@nameof(ListItem.Text)"
                   ValueField="@nameof(ListItem.Id)"
                   CustomParameter="foo" />

<TelerikButton OnClick="@OnInheritedButtonClick">@InheritedComboBoxCustomProperty</TelerikButton>

<p style="margin-top:2em"><strong>Reusable ComboBox</strong> with additional rendering, API and default parameter values</p>

<ReusableComboBox @ref="@ReusableComboBoxRef"
                  Data="@ListItems"
                  @bind-Value="@SelectedValue"
                  GroupField="@nameof(ListItem.Category)"
                  TextField="@nameof(ListItem.Text)"
                  ValueField="@nameof(ListItem.Id)" />

<TelerikButton OnClick="@OnReusableButtonClick">@ReusableComboBoxCustomProperty</TelerikButton>

<style>
    .my-combobox {
        border-color: blue;
    }
</style>

@code {
    private InheritedComboBox<ListItem, int>? InheritedComboBoxRef { get; set; }
    private ReusableComboBox<ListItem, int>? ReusableComboBoxRef { get; set; }

    private List<ListItem> ListItems { get; set; } = new();

    private int SelectedValue { get; set; } = 3;

    private string InheritedComboBoxCustomProperty { get; set; } = "Get Custom ComboBox Property";
    private string ReusableComboBoxCustomProperty { get; set; } = "Get Custom ComboBox Property";

    private void OnInheritedButtonClick()
    {
        InheritedComboBoxCustomProperty = InheritedComboBoxRef?.CustomProperty ?? "Error";
    }

    private void OnReusableButtonClick()
    {
        ReusableComboBoxCustomProperty = ReusableComboBoxRef?.CustomProperty ?? "Error";
    }

    protected override void OnInitialized()
    {
        ListItems = new List<ListItem>();

        for (int i = 1; i <= 24; i++)
        {
            ListItems.Add(new ListItem()
            {
                Id = i,
                Text = $"Item {i}",
                Category = $"Category {i % 6 + 1}"
            });
        }

        base.OnInitialized();
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
````
````RAZOR ReusableComboBox.razor
@using System.Linq.Expressions

@typeparam TItem
@typeparam TValue

<span style="display: flex; gap: 1em; align-items: center;">
    <label for="@Id" style="font-size: var(--kendo-font-size)">@Label</label>
    <TelerikComboBox Data="@Data"
                     Value="@Value"
                     ValueChanged="@( (TValue newValue) => ComboBoxValueChanged(newValue) )"
                     ValueExpression="@ValueExpression"
                     GroupField="@GroupField"
                     TextField="@TextField"
                     ValueField="@ValueField"
                     Filterable="true"
                     FilterOperator="@StringFilterOperator.Contains"
                     Class="my-combobox"
                     Id="@Id"
                     Width="200px" />
</span>

@code {
    [Parameter]
    public IEnumerable<TItem>? Data { get; set; }

    [Parameter]
    public TValue? Value { get; set; }

    [Parameter]
    public EventCallback<TValue?> ValueChanged { get; set; }

    [Parameter]
    public Expression<Func<TValue?>>? ValueExpression { get; set; }

    [Parameter]
    public string? GroupField { get; set; }

    [Parameter]
    public string? TextField { get; set; }

    [Parameter]
    public string? ValueField { get; set; }

    [Parameter]
    public string Label { get; set; } = "Select Value";

    private readonly string Id = $"id-{Guid.NewGuid()}";

    public string CustomProperty
    {
        get
        {
            return $"Custom Reusable Property {DateTime.Now.Millisecond}";
        }
    }

    private async Task ComboBoxValueChanged(TValue newValue)
    {
        Value = newValue;

        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync(Value);
        }
    }
}
````
````C# InheritedComboBox.cs
using Microsoft.AspNetCore.Components;
using Telerik.Blazor.Components;

namespace YourAppName.BaseComponents
{
    public class InheritedComboBox<TItem, TValue> : TelerikComboBox<TItem, TValue>
    {
        public InheritedComboBox()
        {
            Class = "my-combobox";
            Filterable = true;
            FilterOperator = Telerik.Blazor.StringFilterOperator.Contains;
            Width = "200px";
        }

        [Parameter]
        public string CustomParameter { get; set; } = string.Empty;

        public string CustomProperty
        {
            get
            {
                return $"Custom Inherited Property {DateTime.Now.Millisecond}";
            }
        }

        // Optional method overrides...
    }
}
````

## Notes

If `ReusableComboBox.razor` has a separate `.razor.cs` file, then the [partial class must be defined as generic](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/generic-type-support):

````C#.skip-repl
public partial class ReusableComboBox<TItem, TValue> : ComponentBase
{

}
````

## See Also

* [Using Base Classes with Razor Components](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-9.0#specify-a-base-class)
