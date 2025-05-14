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

* The default **Update** and **Cancel** buttons are removed. This means that the [`OnUpdate` and `OnCancel`](slug:grid-editing-overview#events) events do not fire. To modify or cancel the update of a record, you need to include custom components to manage these actions. 
* The popup footer remains empty by design. You can [either hide it or place your custom buttons in it](slug:grid-kb-handle-empty-popup-footer).
* The `FormTemplate` disables the [built-in validation](slug:grid-editing-validation) of the Grid. Implement a [Form Validation](slug:form-validation) instead.
* The [`<GridPopupEditFormSettings>` parameters](slug:grid-editing-popup#form-layout) do not apply to a custom `TelerikForm` that you may render inside the `<FormTemplate>` tag. Set the desired Form configurations such as `Columns`, `Orientation`, and more on the [Form component](slug:form-overview#form-parameters).

## Example

Using a `FormTemplate` to modify the Edit/Create Popup window.

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid @ref="@GridRef"
             OnRead="@OnGridRead"
             TItem="@Product"
             EditMode="@GridEditMode.Popup"
             OnDelete="@OnGridDelete">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add Item</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridPopupEditSettings Width="550px" MaxHeight="95vh" MaxWidth="95vw"></GridPopupEditSettings>
        <GridPopupEditFormSettings Context="formContext">
            <FormTemplate>
                @{
                    if (GridEditItem is null)
                    {
                        // Setting GridEditItem unconditionally may
                        // reset the modified and unsaved values after re-render.
                        // Nullify GridEditItem when editing completes.
                        GridEditItem = (Product)formContext.Item;
                    }

                    <TelerikForm Model="@GridEditItem"
                                 ColumnSpacing="20px"
                                 Columns="2"
                                 ButtonsLayout="@FormButtonsLayout.Stretch"
                                 OnValidSubmit="@OnFormValidSubmit">
                        <FormItems>
                            <FormItem Field="@nameof(Product.Id)" Enabled="false" />
                            <FormItem Field="@nameof(Product.Name)" />
                            <FormItem Field="@nameof(Product.Description)"
                                      ColSpan="2"
                                      EditorType="@FormEditorType.TextArea" />
                            <FormItem Field="@nameof(Product.Price)">
                                <Template>
                                    <label class="k-label k-form-label">Price</label>
                                    <div class="k-form-field-wrap">
                                        <TelerikNumericTextBox @bind-Value="@GridEditItem.Price"
                                                               DebounceDelay="0" />
                                        <TelerikValidationMessage For="@( () => GridEditItem.Price)" />
                                    </div>
                                </Template>
                            </FormItem>
                            <FormItem Field="@nameof(Product.Quantity)" />
                            <FormItem Field="@nameof(Product.ReleaseDate)" />
                            <FormItem Field="@nameof(Product.Discontinued)" />
                        </FormItems>
                        <FormButtons>
                            <TelerikButton Icon="@nameof(SvgIcon.Save)">Save</TelerikButton>
                            <TelerikButton Icon="@nameof(SvgIcon.Cancel)"
                                           ButtonType="@ButtonType.Button"
                                           OnClick="@ExitGridEditMode">Cancel</TelerikButton>
                        </FormButtons>
                    </TelerikForm>
                }
            </FormTemplate>
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" />
        <GridCommandColumn Width="180px">
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private ProductService GridProductService { get; set; } = new();

    private TelerikGrid<Product>? GridRef { get; set; }

    private Product? GridEditItem { get; set; }

    private async Task OnFormValidSubmit()
    {
        if (GridEditItem is null)
        {
            return;
        }

        if (GridEditItem.Id != default)
        {
            await GridProductService.Update(GridEditItem);
        }
        else
        {
            await GridProductService.Create(GridEditItem);
        }

        await ExitGridEditMode();
    }

    private async Task ExitGridEditMode()
    {
        if (GridRef is null)
        {
            return;
        }

        var state = GridRef.GetState();
        state.OriginalEditItem = null!;
        state.EditItem = null!;
        state.InsertedItem = null!;

        await GridRef.SetStateAsync(state);

        GridEditItem = default;
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        await GridProductService.Delete(deletedItem);
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = await GridProductService.Read(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        [Required]
        public DateTime? ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }

    #region Data Service

    public class ProductService
    {
        private List<Product> Items { get; set; } = new();

        private int LastId { get; set; }

        public async Task<int> Create(Product product)
        {
            await SimulateAsyncOperation();

            product.Id = ++LastId;

            Items.Insert(0, product);

            return LastId;
        }

        public async Task<bool> Delete(Product product)
        {
            await SimulateAsyncOperation();

            if (Items.Contains(product))
            {
                Items.Remove(product);

                return true;
            }

            return false;
        }

        public async Task<List<Product>> Read()
        {
            await SimulateAsyncOperation();

            return Items;
        }

        public async Task<DataSourceResult> Read(DataSourceRequest request)
        {
            return await Items.ToDataSourceResultAsync(request);
        }

        public async Task<bool> Update(Product product)
        {
            await SimulateAsyncOperation();

            int originalItemIndex = Items.FindIndex(x => x.Id == product.Id);

            if (originalItemIndex != -1)
            {
                Items[originalItemIndex] = product;
                return true;
            }

            return false;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        public ProductService(int itemCount = 5)
        {
            Random rnd = Random.Shared;

            for (int i = 1; i <= itemCount; i++)
            {
                Items.Add(new Product()
                {
                    Id = ++LastId,
                    Name = $"Product {LastId}",
                    Description = $"Multi-line\ndescription {LastId}",
                    Price = LastId % 2 == 0 ? null : rnd.Next(0, 100) * 1.23m,
                    Quantity = LastId % 2 == 0 ? 0 : rnd.Next(0, 3000),
                    ReleaseDate = DateTime.Today.AddDays(-rnd.Next(365, 3650)),
                    Discontinued = LastId % 2 == 0
                });
            }
        }
    }

    #endregion Data Service
}
````

## See Also

 * [Grid Popup Buttons Template](slug:grid-templates-popup-buttons)
 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Popup Edit Form Template](https://demos.telerik.com/blazor-ui/grid/popup-edit-form-template)
 * [Blazor Grid](slug:grid-overview)
