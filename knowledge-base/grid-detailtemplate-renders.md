---
title: Nested Grid - Unexpected (Multiple) calls to OnParametersSetAsync
description: Why there are more re-renders on the detail template than expected, and how to handle that
type: troubleshooting
page_title: Nested Grid - Unexpected (Multiple) calls to OnParametersSetAsync
slug: grid-kb-detailtemplate-renders
position: 
tags: 
ticketid: 1492092
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I have a component in the DetailTemplate of the grid that fetches more data (see <a href="https://github.com/telerik/blazor-ui/tree/master/grid/load-on-demand-hierarchy" target="_blank">here</a>) and that takes either an object as a parameter, or exposes an EventCallback that the parent component handles to perform data updates.

The problem is that the `OnParametersSetAsync` event is called multiple times when I don't expect it to be called:

* two times when the DetailTemplate expands

* two times when the parent row is clicked

* when a parent row is clicked all expanded detail templates re-render

* when a parent row enters or exits Edit mode all expanded detail templates re-render

Having the parameters of the nested component be primitive types don't (always) cause this, having an object (model) and/or an `EventCallback` causes this.


## Steps to Reproduce

Let's take the following grid and sample component and grid - try expanding the detail template on a row, clicking the row after that, entering and exiting edit mode for that row. Also try expanding a few of them and editing one row. Monitor the console for the event sequences.

>caption Sample nested component - the object parameter simulates any actual model from the app

````CSHTML
NestedComponent<br />

@SomePrimitiveParam
<br />
@Data?.Count

@code {
    [Parameter]
    public int SomePrimitiveParam { get; set; }
    [Parameter]
    public object SomeObjectParam { get; set; }
    [Parameter]
    public EventCallback<bool> SomeCallback { get; set; }

    List<int> Data { get; set; }
    Random rnd { get; set; } = new Random();

    protected override async Task OnParametersSetAsync()
    {
        // undesired/unexpected calls:
        // two instead of one when a parameter is a object or eventcallback
        // called when a parent row is edited
        // called twice when the parent row is clicked, once for all other templates
        Console.WriteLine("OnParametersSetAsync for " + SomePrimitiveParam);
        await LoadData(SomePrimitiveParam);
    }

    async Task LoadData(int argument)
    {
        Console.WriteLine("actually loading data and performing expensive operations");
        
        await Task.Delay(300);// simulate latency
        
        int count = rnd.Next(10, 20);
        Data = Enumerable.Range(1, count).ToList();//simulate loading data
    }
}
````

>caption sample grid - actual data and CRUD operatiosn are not implemented for brevity

````CSHTML
<TelerikGrid Data="@Customers"
             EditMode="@GridEditMode.Inline"
             Height="800px"
             Pageable="true"
             Sortable="true"
             SortMode="@SortMode.Single"
             OnRowClick="@RowClickHandler">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="Add">Add Customer</GridCommandButton>
        <GridSearchBox DebounceDelay="200"></GridSearchBox>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field="@nameof(Customer.Id)" />
        <GridColumn Field="@nameof(Customer.Name)" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="edit"></GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete"></GridCommandButton>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true"></GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true"></GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <DetailTemplate>
        @{
            Customer customer = context as Customer;
            <NestedComponent SomePrimitiveParam="@customer.Id"
                             SomeObjectParam="@customer.SomeObject"
                             SomeCallback="@TestCallbackHandler">
            </NestedComponent>
        }
    </DetailTemplate>
</TelerikGrid>

@code{
    List<Customer> Customers { get; set; }

    void TestCallbackHandler(bool something)
    {

    }

    void RowClickHandler(GridRowClickEventArgs e)
    {

    }

    protected override async Task OnInitializedAsync()
    {
        Customers = await GetCustomersAsync();
    }

    async Task<List<Customer>> GetCustomersAsync()
    {
        await Task.Delay(400);//simulate latency

        var data = Enumerable.Range(1, 100).Select(x => new Customer
        {
            Id = x,
            Name = $"name {x}",
            SomeObject = new object()
        });

        return await Task.FromResult(data.ToList());
    }

    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public object SomeObject { get; set; }
    }
}
````

## Cause\Possible Cause(s)

There are a few factors at play:

* The framework re-renders components twice when an async EventCallback fires.

    * The grid has async EventCallback handlers to the row click event - this is what triggers the detail template expand and the row click.

* The detail template is a child of the current row, so entering/exiting edit mode re-renders the row and its children, which includes the detail template.

* The grid events such as editing and row click fire at the level of the grid itself, so they re-render the entire grid - which includes all currently expanded detail templates.

>caption You can reproduce the same behavior without Telerik components, here is an example:

````CSHTML
@* Much simpler than the actual grid, and only simulates the expand and row click, but shows the general concept *@

<div @onclick="@SimulateGridClickHandler" style="border:1px solid red;">

    Click within the red border to see the way the framework re-renders the component. 
    This simulates expanding the DetailTemplate of the grid or the RowClick event.
    Subsequent clicks simulate a row click event and/or edit events. See the code comments for more details.

    @if (isVisible)
    {
        <br />
        <br />
        <br />
        <br />
        <NestedComponent SomePrimitiveParam="@( rnd.Next(1, 10) )"
                         SomeObjectParam="@SampleObject"
                         SomeCallback="@TestCallbackHandler">
        </NestedComponent>
    }
</div>
@code{
    bool isVisible { get; set; }
    Random rnd { get; set; } = new Random();
    object SampleObject { get; set; } = new object();

    async Task SimulateGridClickHandler()
    {
        isVisible = true;

        await Task.Delay(100);//any async method call, which the grid has - does not have to be a delay
        // when async work is done in an event callback, the framework re-renders the component twice
        // expanding the detail row of the grid requires a click on the parent element which causes the two renders
        // when you enter edit mode the current row is destroyed and replaced with the editable row, which re-renders the child
    }

    void TestCallbackHandler(bool test)
    {

    }
}
````


## Workarounds

There are a few options you can consider:

* Consider caching data locally, or in a memory cache in the service. This will make such data resquests cheaper and faster even when they happen multiple times.

* Consider showing details in a popup Window instead of the detail template, so they are not actually inside the grid and will, therefore, not be affected by its re-renders.

* Handle the [`SetParameters`](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-3.1#before-parameters-are-set) event of the child component to monitor for changes to important parameters and only perform the necessary expensive operations when the parameter that controls them has an actual new value, not every time the component goes through its lifecycle. 

>caption Sample of handling `SetParameters` to monitor for value changes in the `NestedComponent.razor` and avoid two initial data requests

>note This is just one example that you can use as base for following the component lifecycle and investigating how to achieve the desired behavior. There can be other ways, and you can take further logic into account - such as raising and lowering flags in the CRUD events of the grid to take into account editing modes and avoid requests then too.

````CSHTML
NestedComponent<br />

@SomePrimitiveParam
<br />
@Data?.Count

@code {
    [Parameter]
    public int SomePrimitiveParam { get; set; }
    [Parameter]
    public object SomeObjectParam { get; set; }
    [Parameter]
    public EventCallback<bool> SomeCallback { get; set; }

    List<int> Data { get; set; }
    Random rnd { get; set; } = new Random();

    List<string> _changedParameters { get; set; } = new List<string>();

    public override Task SetParametersAsync(ParameterView parameters)
    {
        Console.WriteLine("set parameters");
        // this example checks for changes in integer type, you can extend it further or make it generic, or
        // to work with concrete models and to also perform more complex logic that considers more than one parameter value
        bool hasParameterChanged = HasIntParameterChanged(parameters, nameof(SomePrimitiveParam), SomePrimitiveParam);
        if (hasParameterChanged)
        {
            _changedParameters.Add(nameof(SomePrimitiveParam));
        }

        return base.SetParametersAsync(parameters);
    }

    bool HasIntParameterChanged(ParameterView parameters, string parameterName, int value)
    {
        if (parameters.TryGetValue(parameterName, out int parameterValue))
        {
            // compare the old value we have at the moment with the new one coming from the parent
            // note: the first time a component renders, 
            bool isNewValue = !EqualityComparer<int>.Default.Equals(parameterValue, value);
            return isNewValue;
        }

        return false;
    }

    protected override async Task OnParametersSetAsync()
    {
        Console.WriteLine("parameters set");
        //this is where we previously loaded data. Note how it fires every time and we don't have a flag
        //from the framework whether the component has rendered or not already.
        //moreover, this will fire each times before we get to OnAfterRenderAsync even once - that's how the framework works
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        Console.WriteLine("after render " + firstRender);

        // only do the expensive work if we know there was a change in the parameter values that we monitor
        // and on the first render only. You can tweak this logic as necessary
        if (firstRender && _changedParameters != null && _changedParameters.Any())
        {
            await LoadData(SomePrimitiveParam);
        }

        _changedParameters.Clear();
    }

    async Task LoadData(int argument)
    {
        Console.WriteLine("actually loading data and performing expensive operations for " + SomePrimitiveParam);

        await Task.Delay(300);// simulate latency

        int count = rnd.Next(10, 20);
        Data = Enumerable.Range(1, count).ToList();//simulate loading data

        // If you render child components you may need to call StateHasChanged()
        // now that data is loaded in OnAfterRender and not in OnParametersSet
        // StateHasChanged();
    }
}

````


