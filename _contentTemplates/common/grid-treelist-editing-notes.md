#grid-treelist-data-operations-while-editing

    * For operations like Filter, Group, Sort, Page, Search, Select, Row drag and Delete:
        * InCell edit - if the validation is satisfied, a save operation will be executed. If the validation is **not** satisfied, editing will be cancelled, the `OnCancel` event will fire and the new user operation will be executed. In this case, you can handle the OnCancel event and set the `IsCancelled` property of the `CommandEventArgs` to true. Thus, the other data operation will be aborted and the Grid will remain in edit mode.
        * Inline edit - regardless of the validation, editing will be cancelled, the `OnCancel` event will fire and the new user operation will be executed. In this case, you can handle the OnCancel event and set the `IsCancelled` property of the `CommandEventArgs` to true. Thus, the other data operation will be aborted and the Grid will remain in edit mode.

    * For operations like Edit, Add, Save:
        * InCell edit - if the validation is satisfied, the currently edited item will be saved and the command will be executed. If the validation is **not** satisfied, the command will be blocked until the item is valid or editing is cancelled.
        * Inline edit - if the validation is satisfied, `OnCancel` will be fired for the currently edited item and the command will be executed. If the validation is **not** satisfied, the command will be blocked until the item is valid or editing is cancelled.
#end