---
title: Integration
page_title: Dialog Integration
description: Learn how to integrate Blazor components like the Checkbox and the Filter into the Blazor Dialog and explore the practical sample code.
slug: dialog-integration
tags: telerik,blazor,dialog,integration
published: True
position: 9
---

# Integrating Components into the Blazor Dialog

A common application requirement is to display other Blazor components in the Blazor Dialog. You can achieve this by placing them inside the `DialogContent`.

>The two-way binding for the parameters of the components nested in the `DialogContent` may not work as expected. The Dialog needs to [`Refresh`](slug:dialog-overview#dialog-reference-and-methods) to reflect UI changes.

This article contains the following examples:

* [Checkbox integration in Dialog](#checkbox-in-a-dialog)
* [Filter integration in Dialog](#filter-in-a-dialog)

## Checkbox in a Dialog

To integrate the Checkbox in the Dialog:

1. Include the [Telerik Checkbox](slug:checkbox-overview) as `DialogContent`.
1. Set the [`Value` parameter](slug:checkbox-overview#checkbox-parameters) of the Checkbox via two-way binding.
1. Invoke the Dialog's `Refresh` method in the [`OnChange` event](slug:checkbox-events#onchange) of the Checkbox.

>caption Using Checkbox in Dialog

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

To integrate the Filter in the Dialog:

1. Include the [Telerik Filter](slug:filter-overview) as `DialogContent`.
1. Set the [`Value` parameter](slug:filter-overview#filter-parameters) of the Filter via one-way binding.
1. Invoke the Dialog's `Refresh` method in the [`ValueChanged` event](slug:filter-events#valuechanged) of the Filter.
1. Update the `Value` parameter of the Filter manually in the `ValueChanged` event of the Filter.

>caption Using Filter in Dialog

````RAZOR
@using Telerik.DataSource

<TelerikDialog @ref="DialogRef" Visible="true">
    <DialogContent>
        <TelerikFilter Value="@Value" ValueChanged="@OnValueChanged">
            <FilterFields>
                <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
                <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name"></FilterField>
                <FilterField Name="@(nameof(Person.AgeInYears))" Type="@(typeof(int))" Label="Age"></FilterField>
            </FilterFields>
        </TelerikFilter>
    </DialogContent>
</TelerikDialog>

@code {
    private TelerikDialog DialogRef { get; set; }

    private TelerikFilter FilterRef { get; set; }

    private CompositeFilterDescriptor Value { get; set; } = new CompositeFilterDescriptor();

    private void OnValueChanged(CompositeFilterDescriptor filter)
    {
        Value = filter;
        DialogRef.Refresh();
    }

    public class Person
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public int AgeInYears { get; set; }
    }
}
````