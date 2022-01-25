#loaders-size

There are three predefined sizes for the loader that you can set through its `Size` parameter (`string`). You can use the predefined properties in the `Telerik.Blazor.ThemeConstants.Loader.Size` static class:

* `Small` (equals `"sm"`)
* `Medium` (equals `"md"`) - the default value
* `Large` (equals `"lg"`)

You can see them in action in the [Loader Overview](https://demos.telerik.com/blazor-ui/loader/overview) Live Demo.

>caption Loader Size

![loader size](images/loader-size.png)

````CSHTML
@foreach (string size in LoaderSizes)
{
    <div style="float: left; margin: 20px;">
        @size
        <br /><br />
        <TelerikLoader Size="@size"></TelerikLoader>
    </div>
}

@code {
    List<string> LoaderSizes { get; set; } = new List<string>() {
        ThemeConstants.Loader.Size.Small,
        ThemeConstants.Loader.Size.Medium,
        ThemeConstants.Loader.Size.Large
    };
}
````

#end

