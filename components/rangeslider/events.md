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

## StartValueChanged and EndValueChanged

`StartValueChanged` fires when the user moves the lower range of the slider, and `EndValueChanged` fires when the user changes the higher range of the slider.

The `ValueChanged` events fire every time the corresponding `Value` parameter changes. This happens after the user stops dragging the handle or when they click on the track.

The events do not fire continuously while the user is dragging the handle because that would re-render the component and cause both poor performance, and the user to stop dragging because the element they are dragging will disappear.

>caption Handle StartValueChanged and EndValueChanged to filter products

````CSHTML
@* This example showcases one-way data binding by using Value and ValueChanged
    It also shows how you could filter data based on the user selection in the slider *@

from @StartValue to @EndValue
<br /><br />

<TelerikRangeSlider StartValue="@StartValue" StartValueChanged="@( async (decimal v) => await StartValueChangedHandler(v) )"
                    EndValue="@EndValue" EndValueChanged="@( async (decimal v) => await EndValueChangedHandler(v) )"
                    SmallStep="10m" LargeStep="20m" Min="0m" Max="170m" Width="500px">
</TelerikRangeSlider>

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
            if(_data == null || _data.Count < 1)
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


## See Also

* [RangeSlider Overview]({%slug rangeslider-overview%})