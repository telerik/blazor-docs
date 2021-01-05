#base-slider-features
* `Class` - the CSS class that will be rendered on the main wrapping element of the slider.

* `Decimals` - a setting that helps avoid <a href="https://en.wikipedia.org/wiki/Round-off_error" target="_blank">round-off errors</a> (see more <a href="https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems" target="_blank">here</a>). The slider uses that to determine how many decimals to take and set to the value when calculating the differences between the min and max, and the steps. You can see an [example](#decimals-and-rounding-errors) below.

* `Enabled` - whether the component is enabled.

* `LabelTemplate` - lets you render your own custom labels for the major ticks.

* `LargeStep` - defines where the larger (longer) ticks lie - they are rendere on every n-th occurence of the `LargeStep`. Required. 

    * At least one large tick will be rendered in the beginning of the track, even if `LargeStep` is larger than the difference between the `Min` and `Max`. 
    
    * This is purely a presentational setting and we recommend setting it to a value that matches the range of the slider and the `SmallStep` for best appearance.
    
    * To disable the rendering of the large ticks, set the parameter to `0`.

* `Max` - the maximum value on the slider. Required.

* `Min` - the minimum value on the slider. Required. Must be lower than the `Max`.

* `Orientation` - whether the slider will be horizontal (the default) or vertical. Takes a member of the `Telerik.Blazor.SliderOrientation` enum.

* `SmallStep` - defines the step through which the slider `Value` is changed when the user drags the handle. Also defines where small ticks appear on the track to indicate a value that can be selected. Required.

    * We recommend matching the `SmallStep` with the `LargeStep` for imroved visual appearance (e.g., multiply the `SmallStep` by the desired whole number and set that to the `LargeStep`). 

    * The slider starts rendering ticks from the `Min` value and so if the `Max` does not match a tick, it will not be rendered. For example, if `Min=0` and `Max=100` but `SmallStep=15` the final value that will render will be `90` (four times the small step) and not `100`. See an [example](#not-matching-ticks-steps-min-max) below.

* `TickPosition` - lets you choose where the ticks render. Takes a member of the `Telerik.Blazor.SliderTickPosition` enum. Defaults to `Both`. Can be `Before`, `After`, `Both`, `None`. For example, with the default horizontal slider, these values will render ticks above, below, both above and below, and no ticks.

* `Width` - the width of the main element. In case you would like it to fit to a container you could set it to `100%` or other percent value depending on the application needs. You can read more in the [Dimensions]({%slug common-features/dimensions%}) article.

* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article for more details.
#end
