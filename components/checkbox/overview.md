---
title: Overview
page_title: Checkbox Component for Blazor Overview
description: Overview of the Checkbox for Blazor
slug: components-checkbox-overview
tags: telerik,blazor,checkbox,overview
published: True
position: 0
---

# Checkbox Overview

The Checkbox component allows you to add more customizable checkboxes to your Blazor application. It maintains the behavior of the standard HTML checkbox and provides checked, unchecked and indeterminate states.

To use a Telerik Checkbox for Blazor

1. add the `TelerikCheckBox` tag
1. provide `Value` (one-way data binding) or `bind-Value` (two-way data binding) property
1. (optional) set the `Indeterminate` or `bind-Indeterminate` property
1. (optional) set the `ValueChanged` and `IndeterminateChanged` (if using one-way data binding).
1.

This article contains information about:
* [Examples](#examples)
* [Features](#features)
* [Events](#events)

## Examples

>caption One-way data binding by using Value and ValueChanged

````CSHTML
@*This example showcases one-way data binding by using Value and ValueChanged*@

<h4 class="text-muted">Deliveries:</h4>

@foreach (var delivery in Deliveries)
{
    <div>
        <label class="text-muted">
            <TelerikCheckBox Value="delivery.IsDelivered"
                             ValueChanged="((bool value) => ChangeHandler(value, delivery.ProductName))" />
            @delivery.ProductName
        </label>
    </div>
}

@if (AlreadyDelivered.Any())
{
<div>
    <h6 class="text-info">Successfully delivered products:</h6>
    <ul>
        @{
            foreach (var item in AlreadyDelivered)
            {
                <li>
                    @item.ProductName
                </li>
            }
        }
    </ul>
</div>   
}

@code {
    public List<Delivery> Deliveries { get; set; }
    public List<Delivery> AlreadyDelivered
    {
        get
        {
            return Deliveries.Where(x => x.IsDelivered == true).ToList();
        }
    }

    void ChangeHandler(bool value, string productName)
    {
        var item = Deliveries.Where(x => x.ProductName == productName).First();
        item.IsDelivered = value;
    }

    //In real case scenarios the model will be in a separate file.
    public class Delivery
    {
        public string ProductName { get; set; }
        public bool IsDelivered { get; set; }
        public DateTime DeliveryDate { get; set; }

        public Delivery() { }

        public Delivery(string Name, bool Delivered)
        {
            Name = ProductName;
            Delivered = IsDelivered;
        }
    }

    //Generating dummy data
    protected override void OnInitialized()
    {
        //Make your real data generation here.
        Deliveries = new List<Delivery>();
        Deliveries.Add(new Delivery()
        {
            ProductName = "PC",
            IsDelivered = false
        });
        Deliveries.Add(new Delivery()
        {
            ProductName = "Mobile Phone",
            IsDelivered = false
        });
        Deliveries.Add(new Delivery()
        {
            ProductName = "Headset",
            IsDelivered = false
        });
        Deliveries.Add(new Delivery()
        {
            ProductName = "Monitor",
            IsDelivered = false
        });
    }
}
````

>caption The result from the code snippet above

![screenshot to showcase checkbox with one-way data binding](images/one-way-data-binding-checkbox.jpg)

>caption Two-way data binding and Indeterminate state

````CSHTML

````
## Features

The CheckBox provides the following features:

* `Class` - the CSS class that will be rendered on the main wrapping element of the CheckBox.
* `Enabled` - whether the component is enabled.
* `Id` - renders as the `id` attribute on the `<select />` element, so you can attach a `<label for="">` to it.
* `TabIndex` - the `tabindex` attribute rendered on the CheckBox.
* `Value` and `bind-Value`- mapped to the `Checked` property of the normal HTML checkbox
* `Indeterminate` and `bind-Indeterminate` - mapped to the `Indeterminate` property of the normal HTML checkbox.


## Events

>caption Example template

````CSHTML

````




## See Also
[Live Demo: CheckBox](https://demos.telerik.com/blazor-ui/checkbox/overview)
