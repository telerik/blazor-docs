---
title: Validation
page_title: Grid Validation
description: Built-in validation in the Grid and how to customize the validation behavior.
slug: grid-editing-validation
tags: telerik,blazor,grid,validation,editing
published: True
position: 40
---

# Grid Validation

The Telerik UI for Blazor Grid supports built-in validation that is enabled by default. The Grid passes an `EditContext` as a cascading value to the editable cells. When you use [inline](slug://components/grid/editing/inline) or [incell](slug://components/grid/editing/incell) editing, if any validation messages are present, the Grid will render them as [Validation Tooltips](slug://validation-tools-tooltip) on hover of the edited input. 

#### In this Article:

* [Disable the validation](#disable-validation)
* [Use a custom validator](#use-a-custom-validator)

## Disable Validation

To disable the built-in validation, add a `<GridValidationSettings>` tag to the `<GridSettings>` and set the `Enabled` parameter to `false`.

````RAZOR
@* Disable the built-in validation in the Grid *@

@using System.ComponentModel.DataAnnotations @* for the validation attributes *@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px"
             OnUpdate="@UpdateHandler" OnEdit="@EditHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler" OnCancel="@CancelHandler">
    <GridSettings>
        <GridValidationSettings Enabled="false">
        </GridValidationSettings>
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    void EditHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // prevent opening for edit based on condition
        if (item.ID < 3)
        {
            args.IsCancelled = true;// the general approach for cancelling an event
        }

        Console.WriteLine("Edit event is fired.");
    }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Update event is fired.");
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Delete event is fired.");
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Create event is fired.");
    }

    async Task CancelHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // if necessary, perform actual data source operation here through your service

        Console.WriteLine("Cancel event is fired.");
    }


    // in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
    }

    public List<SampleData> MyData { get; set; }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString()
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
````

## Use a Custom Validator

You can validate the Grid with any validator that uses the `EditContext`. To change the default validator, add a `<ValidatorTemplate>` tag in `<GridValidationSettings>`. Define the custom validator in the `ValidatorTemplate`. 

>note Such third party tools are not included in the Telerik UI for Blazor package. Your project must reference their NuGet packages explicitly. The code snippet below will not run unless you install an appropriate package first. You can find such in the <a href="https://docs.fluentvalidation.net/en/latest/blazor.html" target="_blank">official FluentValidation documentation</a>.

<div class="skip-repl"></div>
````RAZOR
@using Blazored.FluentValidation
@using FluentValidation

<TelerikGrid Data="@GridData"
             Pageable="true"
             EditMode="@GridEditMode.Inline"
             OnCreate="@CreateHandler"
             OnUpdate="@UpdateHandler"
             Height="500px">
    <GridSettings>
        <GridValidationSettings>
            <ValidatorTemplate>
                <FluentValidationValidator Validator="@Validator" />
            </ValidatorTemplate>
        </GridValidationSettings>
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" Width="80px" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn Width="240px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; } = new();

    private SampleDataValidator Validator = new();

    public class SampleDataValidator : AbstractValidator<SampleData>
    {
        public SampleDataValidator()
        {
            RuleFor(item => item.Name).NotEmpty().MaximumLength(50);
        }
    }

    private async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Update event is fired.");
    }

    private async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetGridData();

        Console.WriteLine("Create event is fired.");
    }

    private async Task GetGridData()
    {
        GridData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    public class SampleData
    {
        public int ID { get; set; }

        public string Name { get; set; } = string.Empty;
    }

    // The following static class mimics an actual data service.
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i <= 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = $"Name {i}"
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
`````

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## See Also

* [Grid Editing](slug://components/grid/editing/overview)
* [Custom Grid `DataAnnotations` Validation](slug://validation-kb-custom-dataannotations-validator)
* [Blazor Grid](slug://grid-overview)
