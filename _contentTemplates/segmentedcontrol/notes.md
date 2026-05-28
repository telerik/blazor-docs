#comparison-with-buttongroup-tabstrip

The ButtonGroup, SegmentedControl, and TabStrip are similar and even inter-changeable in some aspects. The major differences between these components are:

* The [ButtonGroup](slug:buttongroup-overview) supports single and multiple selection. The SegmentedControl and TabStrip can only have one selected (active) item.
* The [SegmentedControl](slug:segmentedcontrol-overview) is a databound component. The ButtonGroup and TabStrip use declarative items as child components.
* The [TabStrip](slug:components/tabstrip/overview) renders content containers and manages their visibility out-of-the-box. The ButtonGroup and SegmentedControl can also integrate with separate content containers, but this must rely on the component events and a custom implementation.

#end
