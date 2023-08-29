#dropdownbutton-splitbutton-comparison
The DropDownButton and SplitButton components are similar. They both consist of a primary button and a dropdown element that holds additional action items. The major difference is the purpose of the primary button.

* [DropDownButton]({%slug dropdownbutton-overview%}) - The main purpose of the primary button is to open the popup with additional actions. The primary button does expose a separate [`OnClick` event]({%slug dropdownbutton-events%}), so you can handle it to invoke a dedicated action but clicking on it always opens the dropdown.

* [SplitButton]({%slug splitbutton-overview%}) - The main element contains a primary button and a separate button for opening the dropdown. The purpose of the primary button is to [invoke a standalone action]({%slug splitbutton-events%}#onclick). Clicking on it does not open the dropdown. To open the popup with the additional actions, the user has to click the dedicated button with `caret-alt-down` icon.
#end