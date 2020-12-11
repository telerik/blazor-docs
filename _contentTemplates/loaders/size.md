#loaders-size

There are three predefined sizes for the loader that you can set through its `Size` parameter that takes a member of the `Telerik.Blazor.Components.LoaderSize` enum:

* `Small`
* `Medium` - the default value
* `Large`

You can see them in action in the [Loader Overview](https://demos.telerik.com/blazor-ui/loader/overview) Live Demo.

>caption Loader Size

![loader size](images/loader-size.png)

````CSHTML
@foreach (LoaderSize size in Enum.GetValues(typeof(Telerik.Blazor.Components.LoaderSize)))
{
    <div style="float: left; margin: 20px;">
        @size
        <br /><br />
        <TelerikLoader Size="@size"></TelerikLoader>
    </div>
}
````

#end

