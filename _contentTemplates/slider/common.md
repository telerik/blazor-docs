#styling-features
| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Class` | `string` | the CSS class that will be rendered on the main wrapping element of the slider.
|`Width` | `stirng` | the width of the main element. In case you would like it to fit to a container you could set it to `100%` or other percent value depending on the application needs. You can read more in the [Dimensions](slug:common-features/dimensions) article.
#end

#large-step
The `LargeStep` defines where the larger (longer) ticks lie - they are rendered on every n-th occurrence of the `LargeStep`.

At least one large tick will be rendered in the beginning of the track, even if LargeStep is larger than the difference between the `Min` and `Max`.

This is purely a presentation setting and we recommend setting it to a value that matches the range of the slider and the `SmallStep` for best appearance.

To disable the rendering of the large ticks, set the parameter to 0.
#end

#small-step
The `SmallStep` defines the step through which the slider `Value` is changed when the user drags the handle. Also defines where small ticks appear on the track to indicate a value that can be selected.

We recommend matching the `SmallStep` with the `LargeStep` for improved visual appearance (e.g., multiply the `SmallStep` by the desired whole number and set that to the `LargeStep`).

The slider starts rendering ticks from the `Min` value and so if the `Max` does not match a tick, it will not be rendered. For example, if `Min=0` and `Max=100` but `SmallStep=15` the final value that will render will be `90` (four times the small step) and not `100`.
#end
