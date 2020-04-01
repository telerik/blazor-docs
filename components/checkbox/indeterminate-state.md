---
title: Events
page_title: CheckBox for Blazor | Indeterminate State
description: Indeterminate State in the CheckBox for Blazor
slug: checkbox-indeterminate-state
tags: telerik,blazor,checkbox,state,indeterminate
published: true
position: 2
---

# Indeterminate State

In addition to `checked` and `unchecked` basic states, the Telerik CheckBox has a third state - `Indeterminate`. This means that it is hard to tell if the checkbox is toggled or not.
The main usecase is when the checkbox owns a number of sub-options and they have different states, than the main checkbox is in indeterminate state.

## Features

The Telerik CheckBox has the following features to control that state:
`Indeterminate` and `bind-Indeterminate` - mapped to the `Indeterminate` property of the normal HTML checkbox. Every time the state is changed (checked or unchecked) the `Indeterminate` is set to false.
  * The `Indeterminate` and `bind-Indeterminate` accept `bool` and `bool?` type

## Example

>caption Observe the behavior of Indeterminate state

````CSHTML

@*Observe the behavior of the Select all checkbox*@

<h3 class="text-muted">Deliveries</h3>

<div>
    <TelerikCheckBox Id="selectAllCheckbox"
                     Value="SelectAll"
                     ValueChanged="((bool newVal) => ChangeAllHander(newVal))"
                     Indeterminate="SelectAllIndeterminate"></TelerikCheckBox>
    <label for="selectAllCheckbox" class="text-muted">Select all items</label>
</div>

@foreach (var delivery in Deliveries)
{
    <div class="ml-2">
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
    public bool SelectAll
    {
        get
        {
            return Deliveries.All(item => item.IsDelivered);
        }
    }

    public bool SelectAllIndeterminate
    {
        get
        {
            return Deliveries.Any(item => item.IsDelivered) && !SelectAll;
        }
    }

    public List<Delivery> Deliveries { get; set; }
    public List<Delivery> AlreadyDelivered
    {
        get
        {
            return Deliveries.Where(x => x.IsDelivered == true).ToList();
        }
    }

    void ChangeAllHander(bool newVal)
    {
        Deliveries.ForEach(item => item.IsDelivered = newVal);
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

![gif to showcase the Indeterminate state](images/checkbox-indeterminate-example.gif)
