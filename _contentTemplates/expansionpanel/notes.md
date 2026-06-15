#comparison-with-panelbar

* The PanelBar is a [databound component](slug:panelbar-data-binding-overview). The ExpansionPanel and its content are [defined declaratively](slug:expansionpanel-overview#creating-blazor-expansionpanel).
* When using a hierarchy of parent and child items, the PanelBar uses different styling for the children, while the nested ExpansionPanel instances look in the same way as their parent.
* The PanelBar provides built-in selection and [navigation](slug:panelbar-navigation), while the ExpansionPanel does not.
* The ExpansionPanel is more convenient to use in scenarios where multiple instances one below the other show very different content that cannot be generalized in a single [PanelBar `ContentTemplate`](slug:panelbar-templates-content).

#end