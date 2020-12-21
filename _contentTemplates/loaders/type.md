#loaders-type

The `Type` parameter controls the general shape of the animation. It takes a member of the `Telerik.Blazor.Components.LoaderType` enum:

* `Pulsing`
* `InfiniteSpinner`
* `ConvergingSpinner`

You can see them in action in the [Loader Overview](https://demos.telerik.com/blazor-ui/loader/overview) Live Demo.

>caption Loader Types

![loader types](images/loader-types.gif)

````CSHTML
@foreach (LoaderType type in Enum.GetValues(typeof(Telerik.Blazor.Components.LoaderType)))
{
    <div style="float: left; margin: 20px;">
        @type
        <br /><br />
        <TelerikLoader Type="@type"></TelerikLoader>
    </div>
}
````

#end

