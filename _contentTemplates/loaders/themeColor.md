#loaders-theme-color

The color of the animated loading icon is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeColor` class:

* `Primary`
* `Secondary`
* `Tertiary`
* `Success`
* `Info`
* `Warning`
* `Error`
* `Dark`
* `Light`
* `Inverse`

These predefined options match the main [Telerik Theme]({%slug general-information/themes%}) and you can see that in action in the [Appearance](https://demos.telerik.com/blazor-ui/loader/appearance) Live Demo.

>caption Built-in Theme Colors

![Loader Theme Colors](images/loader-built-in-theme-colors.png)

````CSHTML
@{
    var fields = typeof(Telerik.Blazor.ThemeColors)
                    .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static |
                       System.Reflection.BindingFlags.FlattenHierarchy)
                    .Where(fi => fi.IsLiteral && !fi.IsInitOnly).ToList();
    foreach (var f in fields)
    {
        string color = f.GetValue(null).ToString();
        <div style="float: left; margin: 20px;">
            @color
            <br /><br />
            <TelerikLoader ThemeColor="@color"></TelerikLoader>
        </div>
    }
}
````

The `ThemeColor` parameter renders as the `k-loader-<ThemeColor>` CSS class on the wrapping element and you can set it to a custom value to cascade through and set the color to a setting of your own without customizing the entire theme.

>caption Custom loader color without customizing the Telerik Theme

![Custom loader color](images/loader-custom-color.png)

````CSHTML
<style>
    .k-loader-custom-color .k-loader-segment::after {
        background-color: cyan;
    }
</style>
<TelerikLoader ThemeColor="custom-color"></TelerikLoader>
````

#end

