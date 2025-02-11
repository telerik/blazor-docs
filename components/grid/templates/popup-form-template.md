---
title: Popup Form Template
page_title: Grid Popup Form Template
description: Learn how to define a custom popup create or edit template in the Blazor Data Grid. The template allows you to customize the layout and the content of the create/edit popup.
slug: grid-templates-popup-form
tags: telerik,blazor,grid,templates,popup,edit,create
published: True
position: 50
---


# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the Grid. 

>caption In this article:
* [Using the Popup Form Template](#using-the-popup-form-template)
* [Specifics](#specifics)
* [Example](#example)

## Using the Popup Form Template

1. Declare the desired custom content inside the `<FormTemplate>` inner tag of the `<GridPopupEditFormSettings>`. For example, [`TelerikForm`](slug:form-overview) or [`EditForm`](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/).
1. The `FormTemplate` provides a `context` of type [`GridPopupEditFormTemplateContext`](slug:telerik.blazor.components.gridpopupeditformtemplatecontext). It contains a clone of the Grid data item in its `Item` property, and reveals if the user is adding a new item or editing an existing one through its `IsNew` boolean property. Cast `context.Item` to your model type, so you can pass it to the custom form.
1. (optional) Use the `Context` attribute of the `<FormTemplate>` tag to set the name of the `context` variable.

## Specifics

When using the template, the default Popup form is replaced by the declared content within the `FormTemplate` tag. This introduces the following specifics:
* The default **Update** and **Cancel** buttons are removed. This means that the [`OnUpdate` and `OnCancel`](slug:components/grid/editing/overview#events) events cannot be triggered. To modify or cancel the update of a record, you need to include custom controls to manage these actions. 
* The popup footer remains empty by design. You can [either hide it or place your custom buttons in it](slug:grid-kb-handle-empty-popup-footer).
* The `FormTemplate` disables the [built-in validation](slug:grid-editing-validation) of the Grid. Implement a [Form Validation](slug:form-validation) instead.
* The [`<GridPopupEditFormSettings>` parameters](slug:components/grid/editing/popup#edit-form-customization) do not apply to a custom `TelerikForm` that you may render inside the `<FormTemplate>` tag. Set the desired Form configurations such as `Columns`, `Orientation`, and more on the [Form component](slug:form-overview#form-parameters).

## Example

Using a `FormTemplate` to modify the Edit/Create Popup window.

````RAZOR
@using System.Collections.Generic;
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             EditMode="@GridEditMode.Popup"
             Pageable="true"
             Width="950px"
             PageSize="5"
             OnDelete="@DeleteItem">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridPopupEditSettings Width="550px" MaxHeight="95vh" MaxWidth="95vw"></GridPopupEditSettings>
        <GridPopupEditFormSettings Context="FormContext">
            <FormTemplate>
                @{
                    EditItem = FormContext.Item as Person;

                    <TelerikForm Model="@EditItem"
                                 ColumnSpacing="20px"
                                 Columns="2"
                                 ButtonsLayout="@FormButtonsLayout.Stretch"
                                 OnValidSubmit="@OnValidSubmit">
                        <FormItems>
                            <FormItem Field="EmployeeId" Enabled="false"></FormItem>
                            <FormItem Field="Name">
                            </FormItem>
                            <FormItem Field="HireDate" LabelText="Custom Hire Date Label"></FormItem>
                            <FormItem>
                                <Template>
                                    <label for="position">Custom Position Label</label>
                                    <TelerikDropDownList Data="@PositionsData"
                                                         @bind-Value="@EditItem.Position"
                                                         Id="position">
                                    </TelerikDropDownList>
                                </Template>
                            </FormItem>
                            </FormItems>
                            <FormButtons>
                                <TelerikButton Icon="@nameof(SvgIcon.Save)">Save</TelerikButton>
                                <TelerikButton Icon="@nameof(SvgIcon.Cancel)" ButtonType="@ButtonType.Button" OnClick="@OnCancel">Cancel</TelerikButton>
                            </FormButtons>
                        </TelerikForm>
                }
            </FormTemplate>
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" />
        <GridColumn Field=@nameof(Person.Name) />
        <GridColumn Field=@nameof(Person.HireDate) Title="Hire Date" />
        <GridColumn Field=@nameof(Person.Position) Title="Position" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<string> PositionsData { get; set; } = new List<string>()
    {
        "Manager", "Developer", "QA"
    };

    private TelerikGrid<Person> GridRef { get; set; }
    private List<Person> GridData { get; set; }
    private Person EditItem { get; set; }
    private List<Person> _people;

    public class Person
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        public string Position { get; set; }
    }

    public List<Person> People
    {
        get
        {
            if (_people == null)
            {
                _people = GeneratePeople(30);
            }

            return _people;
        }
    }

    protected override void OnInitialized()
    {
        LoadData();
    }

    private void LoadData()
    {
        GridData = GetPeople();
    }

    private void DeleteItem(GridCommandEventArgs args)
    {
        DeletePerson(args.Item as Person);

        LoadData();
    }

    private async Task OnValidSubmit()
    {

        if (EditItem.EmployeeId != default)
        {
            UpdatePerson(EditItem);
        }
        else
        {
            CreatePerson(EditItem);
        }

        await ExitEditAsync();

        LoadData();
    }

    private async Task OnCancel()
    {
        await ExitEditAsync();
    }

    private async Task ExitEditAsync()
    {
        var state = GridRef?.GetState();
        state.OriginalEditItem = null;
        state.EditItem = null;
        state.InsertedItem = null;

        await GridRef?.SetStateAsync(state);
    }

    #region Service Methods
    private List<Person> GetPeople()
    {
        return People;
    }

    private DataSourceResult GetPeople(DataSourceRequest request)
    {
        return People.ToDataSourceResult(request);
    }

    private void DeletePerson(Person person)
    {
        People.Remove(person);
    }

    private void UpdatePerson(Person person)
    {
        var index = People.FindIndex(i => i.EmployeeId == person.EmployeeId);
        if (index != -1)
        {
            People[index] = person;
        }
    }

    private void CreatePerson(Person person)
    {
        person.EmployeeId = People.Max(x => x.EmployeeId) + 1;

        People.Insert(0, person);
    }

    private List<Person> GeneratePeople(int count, int startIndex = 0)
    {
        List<Person> result = new List<Person>();

        for (int i = startIndex; i < startIndex + count; i++)
        {
            result.Add(new Person()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    HireDate = new DateTime(2020, 6, 1).Date.AddDays(count - (i % 7)),
                    Position = i % 3 <= 2 ? PositionsData[i % 3] : PositionsData.FirstOrDefault()

                });
        }

        return result;
    }
    #endregion
}
````

## See Also

 * [Grid Popup Buttons Template](slug:grid-templates-popup-buttons)
 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Popup Edit Form Template](https://demos.telerik.com/blazor-ui/grid/popup-edit-form-template)
 * [Blazor Grid](slug:grid-overview)
