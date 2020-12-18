---
title: Dynamic Templates that can be repeated easily
description: How to create dynamic grid column templates for easy reuse and dynamic logic
type: how-to
page_title: Dynamic Column Templates that can be repeated easily
slug: grid-kb-dynamic-columns-templates
position: 
tags: 
ticketid: 1496723
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Any Blazor component with a RenderFragment template, example with Telerik Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When working with templated columns some code is repetitive for each Column that needs to be in a template (we have a lot of templates in each grid) and I want an easier and more reusable way to write templates.

How can I define my template code in C# so it is easier to reuse?

I have dynamic objects with many fields and I want to pass the object and field name to the template so I can extract the information I need.

## Solution

While all of this is possible with templates in the markup, some code may get repetitive (especially casting the `context`) and/or may be harder to debug. You can extract templates to the C# portion of your component by defining the `RenderFragment` object yourself.

Another option is, of course, to create a child component that receives the `context` and provides the required casting and rendering on its own. This is a well documented approach in the Blazor framework so this article will focus on the specific way of writing a `RenderFragment`.

>caption Using a `RenderFragment` in the C# code to create a template by passing a field name to it so you can extract particular information based on that field with Reflection.

````CSHTML
@using System.Reflection;

<TelerikGrid Data="@forecasts" Height="550px" Pageable="true">
    <GridColumns>
        <GridColumn Template="@(GetColumnTemplate("Id"))"
            Field="Id" Title="Id" Width="100px" Editable="false" Groupable="false">
        </GridColumn>
        <GridColumn Template="@(GetColumnTemplate("Date"))"
            Field="Date" Width="220px">
        </GridColumn>
        <GridColumn Field="Summary">
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<WeatherForecast> forecasts { get; set; }

    protected override void OnInitialized()
    {
        GetForecasts();
    }

    void GetForecasts()
    {
        forecasts = Enumerable.Range(1, 20).Select(x => new WeatherForecast()
        {
            Id = x,
            Date = DateTime.Now.AddDays(x),
            Summary = "Summary" + x
        }).ToList();
    }

    public class WeatherForecast
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Summary { get; set; }
    }

    public RenderFragment<object> GetColumnTemplate(string propName)
    {
        // Define the RenderFragment in your code
        // Its type matches the type of the Grid context - an object
        // The same as if you were defining it in the markup
        
        // The syntax for writing a RenderFragment is rather specific, note the lambda expressions
        
        RenderFragment<object> ColumnTemplate = context => __builder =>
        {
            // in this example we pass the property name from the grid declaration
            // and we use reflection to extract the needed data. You don't have to
            // If you know the field or the type, you can cast and simplify this code as needed
            
            PropertyInfo propertyInfo = context.GetType().GetProperty(propName);

            var propType = propertyInfo.PropertyType;

            var propValue = propertyInfo.GetValue(context);

            if (propType == typeof(int))
            {
                <div style="text-align: right;">
                    @propValue
                </div>
            }
            else
            {
                @propValue
            }
        };

        return ColumnTemplate;
    }
}
````


## Notes

You can combine this approach with a loop over a column descriptor so you can create many columns based on what you seek. Of course, you can declare the template in the markup too.

Generally, casting of the `Template` `context` is required because an `object` is passed to the `RenderFragment`. Currently, there is no option to pass the `typeparam` of a parent component down to its children, and that is why we are using an `object` instead of the `TItem` that you have bound the Grid to: <a href="https://github.com/dotnet/aspnetcore/issues/7268" target="_blank">https://github.com/dotnet/aspnetcore/issues/7268</a>

For example, the [`RowTemplate`]({%slug grid-templates-row%}) of the Grid uses `RenderFragment<TItem>` where no additional casting is needed, but the [cell template]({%slug grid-templates-column%}) is a child component of the row so it can only get an `object`.

To summarize, once the framework provides the ability to pass the `typeparam` to child components, there will be no need to cast the `context` to the model and the code will look cleaner. Until then, there is no other way to avoid those lines of casting.
