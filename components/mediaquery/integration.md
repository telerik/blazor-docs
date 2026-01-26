---
title: Integration
page_title: MediaQuery Overview
description: Integration of the MediaQuery for Blazor.
slug: mediaquery-integration
tags: telerik,blazor,mediaquery,integration,chart,grid,form
published: True
position: 1
components: ["mediaquery"]
---
# Integration

You can integrate the TelerikMediaQuery component with our existing components. This article provides examples on the most common scenarios:

* [Grid Integration](#grid-integration)

* [Chart Integration](#chart-integration)

* [Form Integration](#form-integration)

## Grid Integration

You can hide or more columns in the Grid based on the dimensions of the browser window by using the TelerikMediaQuery component and the [Visible parameter](slug:components/grid/columns/bound#grid-bound-column-parameters) of the Grid column.

>tip You can use similar approach for the Telerik TreeList in order to hide some of the component columns on small devices. You can even replace the entire components with other components that have a simpler layout and limited functionality, such as a ListView, for small devices.

>tip If you are [saving the Grid state](slug:grid-kb-save-load-state-localstorage), you need to remove column visibility information in `OnStateChanged`. Otherwise the saved column visibility may conflict with the visibility determined by the MediaQuery component.

````RAZOR
@* Hide Grid columns on small screens - those below 1024px in this example *@

<TelerikMediaQuery Media="(max-width: 1023px)" OnChange="@( (doesMatch) => IsMediumDown = doesMatch )"></TelerikMediaQuery>

<TelerikGrid Data="@MyData"
             Pageable="true" PageSize="10"
             OnStateChanged="@( (GridStateEventArgs<User> args) => OnStateChangedHandler(args) )">
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
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private bool IsMediumDown { get; set; } // sample rule to hide columns on small devices through their Visible parameter

    async void OnStateChangedHandler(GridStateEventArgs<User> args)
    {
        // Strip column visibility information, so that only the MediaQuery component manages column visibility, not the Grid.
        // This code is needed only in MediaQuery integration scenarios.
        foreach (var columnState in args.GridState.ColumnStates)
        {
            columnState.Visible = null;
        }

        //await LocalStorage.SetItem("local-storage-key", args.GridState);
    }

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

````RAZOR
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

You can use the MediaQuery component to set various [layout-related parameters of the Form component](slug:form-overview#form-parameters), such as `Orientation`, `Columns`, `ColumnSpacing`, and `ButtonsLayout`.

>caption Responsive Form with MediaQuery

````RAZOR
@using System.ComponentModel.DataAnnotations

<ul>
    <li>
        <code>IsSmallScreen</code>: <strong>@IsSmallScreen</strong>
    </li>
    <li>
        <code>IsMediumScreen</code>: <strong>@IsMediumScreen</strong>
    </li>
    <li>
        <code>IsLargeScreen</code>: <strong>@IsLargeScreen</strong>
    </li>
    <li>
        <code>IsExtraLargeScreen</code>: <strong>@IsExtraLargeScreen</strong>
    </li>
</ul>

<TelerikForm Model="@Employee"
             ButtonsLayout="@FormButtonsLayout"
             Orientation="@FormOrientation">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormGroup LabelText="Personal Information" Columns="@FormGroupColumns" ColumnSpacing="@FormGroupColumnSpacing">
            <FormItem Field="@nameof(Person.FirstName)" LabelText="First Name"></FormItem>
            <FormItem Field="@nameof(Person.MiddleName)" LabelText="Middle Name"></FormItem>
            <FormItem Field="@nameof(Person.LastName)" LabelText="Last Name"></FormItem>
            <FormItem Field="@nameof(Person.BirthDate)" LabelText="Birth Date"></FormItem>
            <FormItem Field="@nameof(Person.Address)" EditorType="@FormEditorType.TextArea" ColSpan="@FormGroupColumns"></FormItem>
        </FormGroup>
        <FormGroup LabelText="Work Information" Columns="@FormGroupColumns" ColumnSpacing="@FormGroupColumnSpacing">
            <FormItem Field="@nameof(Person.Id)" LabelText="Corporate ID" Enabled="false"></FormItem>
            <FormItem Field="@nameof(Person.HireDate)" LabelText="Hire Date"></FormItem>
            <FormItem Field="@nameof(Person.Team)"></FormItem>
            <FormItem Field="@nameof(Person.LeaveDate)" LabelText="Leave Date"></FormItem>
        </FormGroup>
    </FormItems>
</TelerikForm>

<TelerikMediaQuery Media="@SmallScreenMediaQuery" OnChange="@( (bool matches) => { IsSmallScreen = matches; ConfigureForm(); } )" />
<TelerikMediaQuery Media="@MediumScreenMediaQuery" OnChange="@( (bool matches) => { IsMediumScreen = matches; ConfigureForm(); } )" />
<TelerikMediaQuery Media="@LargeScreenMediaQuery" OnChange="@( (bool matches) => { IsLargeScreen = matches; ConfigureForm(); } )" />
<TelerikMediaQuery Media="@ExtraLargeScreenMediaQuery" OnChange="@( (bool matches) => { IsExtraLargeScreen = matches; ConfigureForm(); } )" />

@code {
    private Person Employee { get; set; } = new() { Id = 1234 };

    private FormOrientation FormOrientation { get; set; } = FormOrientation.Vertical;
    private FormButtonsLayout FormButtonsLayout { get; set; } = FormButtonsLayout.Start;
    private int FormGroupColumns { get; set; } = 1;
    private string FormGroupColumnSpacing { get; set; } = string.Empty;

    private string SmallScreenMediaQuery { get; set; } = "(max-width: 430px)";
    private string MediumScreenMediaQuery { get; set; } = "(min-width: 431px)";
    private string LargeScreenMediaQuery { get; set; } = "(min-width: 768px)";
    private string ExtraLargeScreenMediaQuery { get; set; } = "(min-width: 1199px)";

    private bool IsSmallScreen { get; set; }
    private bool IsMediumScreen { get; set; }
    private bool IsLargeScreen { get; set; }
    private bool IsExtraLargeScreen { get; set; }

    private void ConfigureForm()
    {
        if (IsMediumScreen)
        {
            FormOrientation = FormOrientation.Horizontal;
            FormButtonsLayout = FormButtonsLayout.Center;
            FormGroupColumns = 2;
            FormGroupColumnSpacing = "1em";
        }

        if (IsSmallScreen)
        {
            FormOrientation = FormOrientation.Vertical;
            FormButtonsLayout = FormButtonsLayout.Stretch;
            FormGroupColumns = 1;
            FormGroupColumnSpacing = string.Empty;
        }

        if (IsLargeScreen)
        {
            FormOrientation = FormOrientation.Vertical;
            FormButtonsLayout = FormButtonsLayout.Start;
            FormGroupColumns = 3;
            FormGroupColumnSpacing = "2em";
        }

        if (IsExtraLargeScreen)
        {
            FormOrientation = FormOrientation.Vertical;
            FormButtonsLayout = FormButtonsLayout.End;
            FormGroupColumns = 4;
            FormGroupColumnSpacing = "3em";
        }
    }

    public class Person
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string MiddleName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public DateTime? BirthDate { get; set; }

        [Required]
        public DateTime HireDate { get; set; } = DateTime.Today;

        [Required]
        public string? Team { get; set; }

        public DateTime? LeaveDate { get; set; }
    }
}
````

## See Also

* [Live Demo: MediaQuery and Grid Integration](https://demos.telerik.com/blazor-ui/mediaquery/grid-integration)
* [MediaQuery Overview](slug:mediaquery-overview)
* [MediaQuery Events](slug:mediaquery-events)
