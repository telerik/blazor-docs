#focus-kb
Also check the dedicated KB article about [programmatic input component focusing](slug:inputs-kb-focus), which provides more examples and tips.
#end

#edit-debouncedelay
Consider setting `DebounceDelay="0"` to the component inside the editor template. This is how the default editors in all Telerik Blazor components work. Otherwise, fast users may try to save changes before the data item in edit mode receives the new value.
#end

#adornments
## Adornments

The component allows you to add custom elements as prefixes and suffixes. [Read more about how to render custom adornments before and after the input element...](slug:common-features/input-adornments)
#end
 
#floating-label-and-preffix
When using the [`PrefixTemplate`](slug:common-features/input-adornments#adding-a-prefix-adornment) for a component wrapped in a [FloatingLabel](slug:floatinglabel-overview), the label will overlap the prefix.

To ensure both the FloatingLabel and the prefix content are properly displayed, move the label with CSS:

<demo metaUrl="client/floatinglabel/prefix-adornment/" height="300"></demo>
#end