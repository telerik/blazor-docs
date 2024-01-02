#focus-kb
Also check the dedicated KB article about [programmatic input component focusing]({%slug inputs-kb-focus%}), which provides more examples and tips.
#end

#edit-debouncedelay

Consider setting `DebounceDelay="0"` to the component inside the editor template. This is how the default editors in all Telerik Blazor components work. Otherwise, fast users may try to save changes before the data item in edit mode receives the new value.

#end

#adornments
## Adornments

The component allows adding custom elements as prefix and suffix. [Read more about how to render custom adornments before and after the input element...]({%slug common-features/input-adornments%})
#end
