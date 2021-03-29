---
title: Integration
page_title: MediaQuery Overview
description: Integration of the MediaQuery for Blazor.
slug: mediaquery-integration
tags: telerik,blazor,mediaquery,integration,chart,grid,form
published: True
position: 1
---

# Integration

You can integrate the TelerikMediaQuery component with our existing components. This article provides examples on the most common scenarios:

* [Grid Integration](#grid-integration)

* [Chart Integration](#chart-integration)

* [Form Integration](#form-integration)

## Grid Integration

You can hide or more columns in the Grid based on the dimensions of the browser window by using the TelerikMediaQuery component and the [Visible parameter]({%slug components/grid/columns/bound%}#grid-bound-column-parameters) of the Grid column.

>tip You can use similar approach for the Telerik TreeList in order to hide some of the component columns on small devices. You can even replace the entire components with other components that have a simpler layout and limited functionality, such as a ListView, for small devices.

````CSHTML
@* Hide Grid columns on small screens - those below 1024px in this example *@

<TelerikMediaQuery Media="(max-width: 1023px)" OnChange="@( (doesMatch) => IsMediumDown = doesMatch )"></TelerikMediaQuery>

<TelerikGrid Data="@MyData"
             Pageable="true" PageSize="10">
    <GridColumns>
        <GridCheckboxColumn Title="Select" Width="70px" />
        <GridColumn Field="@(nameof(User.Id))" Width="100px" />
        
        <GridColumn Field="@(nameof(User.FirstName))" Title="First Name" Width="200px" Visible="@( !IsMediumDown )" />
        <GridColumn Field="@(nameof(User.LastName))" Title="Last Name" Width="200px" Visible="@( !IsMediumDown )" />
        
        <GridColumn Field="@(nameof(User.FullName))" Title="Full Name" Width="200px" />
        
        <GridColumn Field="@(nameof(User.DateOfBirth))" Title="Date of Birth" Width="200px" Visible="@( !IsMediumDown )" />
        <GridColumn Field="@(nameof(User.Age))" Title="Age" Width="100px" Visible="@( !IsMediumDown )" />
        
        <GridColumn Field="@(nameof(User.EmailAddress))" Title="Email Address" Width="200px" />
        
        <GridColumn Field="@(nameof(User.RegistrationDate))" Title="Registration Date" Width="200px" Visible="@( !IsMediumDown )" />
        <GridColumn Field="@(nameof(User.LocalTime))" Title="Local Time" Width="200px" Visible="@( !IsMediumDown )" />
        <GridColumn Field="@(nameof(User.UserNumber))" Title="User Number" Width="300px" Visible="@( !IsMediumDown )" />
        <GridColumn Field="@(nameof(User.Gender))" Title="Gender" Width="200px" Visible="@( !IsMediumDown )" />
        
        <GridCommandColumn Width="250px" Title="Command Column">
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private bool IsMediumDown { get; set; } // sample rule to hide columns on small devices through their Visible parameter

    // only sample data for the grid follows
    public IEnumerable<User> MyData = Enumerable.Range(1, 30).Select(x => new User
    {
        Id = x,
        FirstName = "App",
        LastName = $"User {x}",
        DateOfBirth = new DateTime(1970, 1, 1),
        EmailAddress = $"app-user{x}@mail.com",
        RegistrationDate = DateTime.Today.AddDays(-x),
        LocalTime = DateTime.Now,
        UserNumber = Guid.NewGuid(),
        Gender = x % 2 == 0 ? "Male" : "Female"
    });

    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get
            {
                string fullName = $"{FirstName} {LastName}";
                return fullName;
            }
        }
        public DateTime DateOfBirth { get; set; }
        public int Age
        {
            get
            {
                var timeSpan = DateTime.Today - DateOfBirth;
                var years = timeSpan.Days / 365;
                return years;
            }
        }
        public string EmailAddress { get; set; }
        public Guid UserNumber { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime LocalTime { get; set; }
        public string Gender { get; set; }
    }
}
````

## Chart Integration

You can resize the Chart based on the browser size and re-render with the new dimensions. The `OnChange` event of the media query component lets you call the `Refresh()` method of the chart easily when your layout also changes so the chart needs new dimensions.

>note You can also see the <a href="https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart" target="_blank">Responsive Chart demo application</a> for additional examples.

````CSHMTL
@* Resize the chart based on the browser size so it matches the corresponding responsive layout *@

<TelerikMediaQuery Media="(max-width: 767px)" OnChange="@OnChangeHandler"></TelerikMediaQuery>

<div style="width: @Width; height: @Height">

    <TelerikChart Width="100%" Height="100%" @ref="@ChartRef">

        <ChartSeriesItems>
            <ChartSeries Type="@ChartSeriesType.RadarColumn" Name="Soybean" Data="@series1Data">
            </ChartSeries>
            <ChartSeries Type="@ChartSeriesType.RadarColumn" Name="Lentils" Data="@series2Data">
            </ChartSeries>
        </ChartSeriesItems>
        <ChartCategoryAxes>
            <ChartCategoryAxis Categories="@xAxisItems">
            </ChartCategoryAxis>
        </ChartCategoryAxes>
        <ChartValueAxes>
            <ChartValueAxis Visible="false"></ChartValueAxis>
        </ChartValueAxes>
        <ChartTitle Text="Nutrients per 100g">
        </ChartTitle>
        <ChartLegend Position="@Telerik.Blazor.ChartLegendPosition.Right">
        </ChartLegend>

    </TelerikChart>

</div>

@code {
    string Width { get; set; } = "600px";
    string Height { get; set; } = "600px";

    public TelerikChart ChartRef { get; set; }

    private async Task OnChangeHandler(bool isSmall)
    {
        //sample responsive layout. Often, ths is done with CSS alone, without C#
        if (isSmall)
        {
            Width = "400px";
            Height = "400px";
        }
        else
        {
            Width = "600px";
            Height = "600px";
        }

        // re-render the chart after the layout has re-rendered too
        await Task.Delay(20);
        ChartRef.Refresh();
    }

    public List<object> series1Data = new List<object>() { 36, 30, 20 };
    public List<object> series2Data = new List<object>() { 9, 20, 0.4d };
    public string[] xAxisItems = new string[] { "Protein", "Carbohydrates", "Fats" };
}
````

## Form Integration

You can utilize the Form Columns to fit the contents of the Telerik Form to a smaller browser window. You can find an example in the <a href="https://github.com/telerik/blazor-ui/tree/master/form/responsive-form" target="_blank">Responsive Form</a> demo application.

## See Also
  
  * [Overview]({%slug mediaquery-overview%})
  * [Events]({%slug mediaquery-events%})

   
