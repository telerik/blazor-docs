---
title: How to Upload File in Grid
description: How to upload and attach a file to a Grid data item?
type: how-to
page_title: How to Upload File in Grid
slug: upload-kb-upload-files-in-grid
position: 
tags: telerik, blazor, grid, upload
ticketid: 1544295, 1585763, 1590409, 1600123, 1636473
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                Upload for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

How to upload and download files in a Blazor Grid?

How to display an icon and a download link in a Grid column?

How to add an upload button in every Grid row?

How to upload photos and files as an attachment in a Blazor Grid?


## Solution

Here are the required steps to implement file uploading inside the Telerik Blazor Grid.

1. The Upload occupies more space than a simple textbox. Use [Grid popup editing](slug:components/grid/editing/popup) with a [wider popup edit form](slug:components/grid/editing/popup#customization).
1. [Configure an Upload component](slug:upload-overview#creating-blazor-upload) inside a [Grid column `<EditorTemplate>`](slug:grid-templates-editor).
1. Handle the [`OnUpload` event of the Upload](slug:upload-events#onupload) to send custom information to the Upload controller, for example, information about the Grid data item.
1. [Implement the Upload controller methods](slug:upload-overview#implement-controller-methods), which receive and delete the uploaded files. File deletion is optional.
1. Handle the [`OnSuccess` event of the Upload](slug:upload-events#onsuccess) to confirm successful uploads or file deletions, and update the Grid data item, which is the `<EditorTemplate>` `context`.
1. The name of the saved file on the server can depend on the Razor UI or on the controller.
    * If the file name depends on the UI, send it to the controller via the `OnUpload` event arguments (`args.RequestData`).
    * If the file name depends on the controller, receive it in the `OnSuccess` event arguments via `args.Request.ResponseText`.
1. Handle the [Grid `OnUpdate`, `OnCreate` and `OnDelete` events](slug:components/grid/editing/overview#events) to commit changes to the Grid data source. Optionally, delete the respective saved files in `OnDelete`. The example below uses `OnAdd` to provide the `Id` of the new Grid data item, which also affects the uploaded file's name.
1. Display the uploaded files as images or download links in a [Grid column `<Template>`](slug:grid-templates-column).


## Example

>caption Upload Files in a Blazor Grid

The tabs below show a possible implementation for the Razor UI, `Save` and `Remove` controller methods.

<div class="skip-repl"></div>

````RAZOR
@inject HttpClient HttpClient
@inject NavigationManager NavigationManager

<TelerikGrid Data="@GridData"
             TItem="@Product"
             EditMode="@GridEditMode.Popup"
             OnAdd="@OnGridAdd"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete">
    <GridSettings>
        <GridPopupEditSettings Width="600px" />
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add New</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Width="120px" Editable="false" />
        <GridColumn Field="@nameof(Product.ImageUrl)" Width="160px" Title="Product Image">
            <Template>
                @{
                    var dataItem = (Product)context;
                    if (!string.IsNullOrEmpty(dataItem.ImageUrl))
                    {
                        <img src="@dataItem.ImageUrl" alt="@dataItem.Name" class="product-image" />
                        <a class="download-link" href="@dataItem.ImageUrl">@dataItem.Name</a>
                    }
                }
            </Template>
            <EditorTemplate>
                @{
                    var editDataItem = (Product)context;
                    if (!string.IsNullOrEmpty(editDataItem.ImageUrl))
                    {
                        <p>
                            <img src="@editDataItem.ImageUrl" alt="@editDataItem.Name" class="product-image" />
                            <br />
                            <TelerikButton ButtonType="@ButtonType.Button"
                                           Icon="@SvgIcon.Trash"
                                           OnClick="@( () => OnRemoveButtonClick(editDataItem) )">
                                Delete Current Image
                            </TelerikButton>
                        </p>
                    }
                }
                <TelerikUpload AllowedExtensions="@( new List<string> { ".jpg", ".jpeg", ".png", ".gif" } )"
                               Accept=".jpg, .jpeg, .png, .gif"
                               MaxFileSize="@( 16 * 1024 * 1024 )"
                               Multiple="false"
                               SaveUrl="@UploadSaveUrl"
                               RemoveUrl="@UploadRemoveUrl"
                               OnUpload="@( (UploadEventArgs args) => OnUploadUpload(args, editDataItem.Id) )"
                               OnSuccess="@( (UploadSuccessEventArgs args) => OnUploadSuccess(args, editDataItem) )" />
            </EditorTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridCommandColumn Width="240px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<style>
    .product-image {
        display: block;
        margin: 0 auto;
        max-width: 100px;
        max-height: 100px;
    }

    td a.download-link {
        display: block;
        text-align: center;
        text-decoration: underline;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    private string UploadSaveUrl => ToAbsoluteUrl("api/upload/save/");

    private string UploadRemoveUrl => ToAbsoluteUrl("api/upload/remove/");

    private int LastId { get; set; }

    private void OnUploadUpload(UploadEventArgs args, int productId)
    {
        // Send the product ID to the controller to take part in the saved file name.
        args.RequestData.Add("productId", productId);
    }

    private void OnUploadSuccess(UploadSuccessEventArgs args, Product product)
    {
        if (args.Operation == UploadOperationType.Upload)
        {
            // Set the image URL in the Grid data item, based on controller response.
            product.ImageUrl = args.Request.ResponseText;
        }
    }

    private async Task OnRemoveButtonClick(Product product)
    {
        var successfulDelete = await DeleteFileOnServer(product.ImageUrl);

        if (successfulDelete)
        {
            // Remove the image URL from the Grid data item.
            product.ImageUrl = string.Empty;
        }
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        await Task.Delay(1); // simulate network delay

        var updatedItem = (Product)args.Item;
        var originalItemIndex = GridData.FindIndex(x => x.Id == updatedItem.Id);
        if (originalItemIndex >= 0)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    private async Task OnGridAdd(GridCommandEventArgs args)
    {
        await Task.Delay(100); // simulate network delay

        var addedItem = (Product)args.Item;

        addedItem.Id = ++LastId;
    }

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        await Task.Delay(100); // simulate network delay

        var createdItem = (Product)args.Item;

        GridData.Insert(0, createdItem);
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var itemToDelete = (Product)args.Item;
        var originalItemIndex = GridData.FindIndex(x => x.Id == itemToDelete.Id);
        if (originalItemIndex >= 0)
        {
            await DeleteFileOnServer(itemToDelete.ImageUrl);
            GridData.Remove(itemToDelete);
        }
    }

    private async Task<bool> DeleteFileOnServer(string imageUrl)
    {
        // Set the file name for delection to the form key, which matches the Upload RemoveField value.
        var controllerData = new Dictionary<string, string>() {
            { "files", imageUrl }
        };
        // UploadRemoveUrl must be an absolute URL.
        var result = await HttpClient.PostAsync(UploadRemoveUrl,
            new FormUrlEncodedContent(controllerData));

        return result.IsSuccessStatusCode;
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        for (int i = 1; i <= 3; i++)
        {
            GridData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Product {LastId}"
            });
        }
    }

    private string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
````
````C# Controller
[Route("api/[controller]/[action]")]
public class UploadController : Controller
{
    public IWebHostEnvironment HostingEnvironment { get; set; }

    public UploadController(IWebHostEnvironment hostingEnvironment)
    {
        HostingEnvironment = hostingEnvironment;
    }

    [HttpPost]
    public async Task<IActionResult> Save(IFormFile files, [FromForm] int productId) // "files" must match Upload SaveField
    {
        if (files != null)
        {
            try
            {
                var savedFileName = $"product-{productId}{Path.GetExtension(files.FileName)}";
                // Blazor Server (wwwroot)
                var saveLocation = Path.Combine(HostingEnvironment.WebRootPath, savedFileName);
                // Blazor WebAssembly or Blazor Server (project root)
                //var saveLocation = Path.Combine(HostingEnvironment.ContentRootPath, savedFileName);

                using (var fileStream = new FileStream(saveLocation, FileMode.Create))
                {
                    await files.CopyToAsync(fileStream);
                    await Response.WriteAsync(savedFileName);
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                await Response.WriteAsync($"Upload failed: {ex.Message}");
            }
        }

        return new EmptyResult();
    }

    [HttpPost]
    public ActionResult Remove(string files) // "files" must match Upload RemoveField
    {
        if (files != null)
        {
            try
            {
                // Blazor Server (wwwroot)
                var fileLocation = Path.Combine(HostingEnvironment.WebRootPath, files);
                // Blazor WebAssembly or Blazor Server (project root)
                //var fileLocation = Path.Combine(HostingEnvironment.ContentRootPath, files);

                if (System.IO.File.Exists(fileLocation))
                {
                    System.IO.File.Delete(fileLocation);
                }
            }
            catch
            {
                Response.StatusCode = 500;
                Response.WriteAsync("File deletion failed.");
            }
        }

        return new EmptyResult();
    }
}
````
````C# Program.cs
// ...

builder.Services.AddHttpClient();

// ...

app.MapDefaultControllerRoute();

app.Run();
````


## Notes

* If necessary, [adjust the application settings to allow larger file uploads](slug:upload-overview#large-file-uploads).
* The Upload component itself can't delete files, which have been uploaded in previous edit sessions. Use separate UI for that inside the column `<Template>` or the `<EditorTemplate>`. In both cases, call the controller method directly via `HttpClient.PostAsync()`. The Upload `OnSuccess` event will not fire in this case.
* It is also possible to use the Upload component in a [custom edit form outside the Grid](https://demos.telerik.com/blazor-ui/grid/editing-custom-form).
* Instead of an Upload, you can also implement a similar scenario with a [FileSelect component](slug:fileselect-overview#fileselect-vs-upload). In that case, the file contents will be available directly in the Razor component, which holds the Grid.


## See Also

* [Upload Controller](slug:upload-overview#implement-controller-methods)
* [Upload Events](slug:upload-events)
* [Grid Editing](slug:components/grid/editing/overview)
* [Grid Editor Template](slug:grid-templates-editor)
