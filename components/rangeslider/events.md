---
title: Events
page_title: RangeSlider - Events
description: Events in the RangeSlider for Blazor.
slug: rangeslider-events
tags: telerik,blazor,range,slider,events
published: true
position: 20
---

# Events

This article showcases the available events in the Telerik RangeSlider component:

* [StartValueChanged and EndValueChanged](#startvaluechanged-and-endvaluechanged)
* [OnChange](#onchange)

## StartValueChanged and EndValueChanged

`StartValueChanged` fires when the user moves the lower range of the slider, and `EndValueChanged` fires when the user changes the higher range of the slider.

The `ValueChanged` events fire every time the corresponding `Value` parameter changes. This happens while the user is dragging the handle or when they click on the track.

>tip As of version 2.28.0 of Telerik UI for Blazor, the `ValueChanged` events fire continuously while the user is dragging the handle to ensure updating the value accordingly and deliver live UX. Thus, the component will re-render multiple times during the dragging process. If you want to avoid that, you can handle the [`OnChange`](#onchange) event instead.

>caption Handle the StartValueChanged and EndValueChanged to filter products

````CSHTML
@* This example showcases one-way data binding by using Value and ValueChanged
    It also shows how you could filter data based on the user selection in the slider *@

from @StartValue to @EndValue
<br />
<br />

<TelerikRangeSlider StartValue="@StartValue" StartValueChanged="@( async (decimal v) => await StartValueChangedHandler(v) )"
                    EndValue="@EndValue" EndValueChanged="@( async (decimal v) => await EndValueChangedHandler(v) )"
                    SmallStep="10m" LargeStep="20m" Min="0m" Max="170m" Width="500px">
</TelerikRangeSlider>

<br />
<br />

<ul>
    @foreach (Product item in Products)
    {
        <li>Product @item.Name costs <strong>@item.Price.ToString("C2")</strong></li>
    }
</ul>

@code{
    decimal StartValue { get; set; } = 30m;
    decimal EndValue { get; set; } = 40m;

    List<Product> Products { get; set; } = new List<Product>();

    async Task StartValueChangedHandler(decimal v)
    {
        // update the view-model to let the change render
        // if you avoid that, you wil effectively cancel the event
        StartValue = v;

        Console.WriteLine($"The user has now chosen {v} for the LOWER range");

        await FilterProducts();
    }

    async Task EndValueChangedHandler(decimal v)
    {
        // update the view-model to let the change render
        // if you avoid that, you wil effectively cancel the event
        EndValue = v;

        Console.WriteLine($"The user has now chosen {v} for the HIGHER range");

        await FilterProducts();
    }

    //sample business logic follows below

    async Task FilterProducts()
    {
        Products = await MyService.GetProducts(StartValue, EndValue);
    }

    protected override async Task OnInitializedAsync()
    {
        await FilterProducts();
    }

    // this mimics an actual service
    public static class MyService
    {
        private static List<Product> _data { get; set; }
        public static async Task<List<Product>> GetProducts(decimal low, decimal high)
        {
            EnsureData();
            var filteredProducts = _data.Where(p => p.Price >= low && p.Price <= high);
            return await Task.FromResult(filteredProducts.ToList());
        }

        private static void EnsureData()
        {
            if (_data == null || _data.Count < 1)
            {
                _data = new List<Product>();
                for (int i = 1; i < 30; i++)
                {
                    _data.Add(new Product { Name = $" Name {i}", Price = 3.14m * i * 2 });
                }
            }
        }
    }

    public class Product
    {
        public decimal Price { get; set; }
        public string Name { get; set; }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user stops dragging the handle or when they click on the track.

The handler receives an object of type `RangeSliderChangeEventArgs` which exposes the following fields:

* `StartValue` - the new lower value of the slider that marks the range start.
* `EndValue` - the new higher value of the slider that marks the range end.

If you use two-way data binding, this will effectively fire the [`StartValueChanged and EndValueChanged`](#startvaluechanged-and-endvaluechanged) events while the user drags the handle which will result in continuous component re-rendering. If you want to avoid that, use one-way binding and update the value for the view-model in the `OnChange` event handler.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event to filter products

````CSHTML
@* This example showcases one-way data binding and handling the OnChange event to update the view-model.
    If you want to update the value while the user drags the handle, you can additionally use two-way binding or handle the ValueChanged event.
    It also shows how you could filter data based on the user selection in the slider *@

from @StartValue to @EndValue
<br />
<br />

<TelerikRangeSlider StartValue="@StartValue"
                    EndValue="@EndValue"
                    OnChange="@OnChangeHandler"
                    SmallStep="10m" LargeStep="20m" Min="0m" Max="170m" Width="500px">
</TelerikRangeSlider>

<br />
<br />

<ul>
    @foreach (Product item in Products)
    {
        <li>Product @item.Name costs <strong>@item.Price.ToString("C2")</strong></li>
    }
</ul>

@code{
    decimal StartValue { get; set; } = 30m;
    decimal EndValue { get; set; } = 40m;

    List<Product> Products { get; set; } = new List<Product>();

    async Task OnChangeHandler(RangeSliderChangeEventArgs args)
    {
        // update the view-model to let the change render.
        // if you avoid that, you will effectively cancel the event
        StartValue = (decimal)args.StartValue;
        EndValue = (decimal)args.EndValue;

        Console.WriteLine($"The user has now chosen {StartValue} for the LOWER range and {EndValue} for the HIGHER range");

        await FilterProducts();
    }

    //sample business logic follows below

    async Task FilterProducts()
    {
        Products = await MyService.GetProducts(StartValue, EndValue);
    }

    protected override async Task OnInitializedAsync()
    {
        await FilterProducts();
    }

    // this mimics an actual service
    public static class MyService
    {
        private static List<Product> _data { get; set; }
        public static async Task<List<Product>> GetProducts(decimal low, decimal high)
        {
            EnsureData();
            var filteredProducts = _data.Where(p => p.Price >= low && p.Price <= high);
            return await Task.FromResult(filteredProducts.ToList());
        }

        private static void EnsureData()
        {
            if (_data == null || _data.Count < 1)
            {
                _data = new List<Product>();
                for (int i = 1; i < 30; i++)
                {
                    _data.Add(new Product { Name = $" Name {i}", Price = 3.14m * i * 2 });
                }
            }
        }
    }

    public class Product
    {
        public decimal Price { get; set; }
        public string Name { get; set; }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [RangeSlider Overview]({%slug rangeslider-overview%})