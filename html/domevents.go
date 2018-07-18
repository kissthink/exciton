package html

import (
	"encoding/json"

	"github.com/yossoy/exciton/markup"

	"github.com/yossoy/exciton/event"
	"github.com/yossoy/exciton/geom"
)

// Event represents any event which takes place in the DOM;
// some are user-generated (such as mouse or keyboard events),
// while others are generated by APIs (such as events that indicate an animation
// has finished running, a video has been paused, and so forth).
// There are many types of events, some of which use other interfaces based on
// the main Event interface. Event itself contains the properties and methods
// which are common to all events.
//
// https://developer.mozilla.org/en-US/docs/Web/API/Event
type Event struct {
	Bubbles          bool                `json:"bubbles"`                 // Bubbles is a Boolean indicating whether the event bubbles up through the DOM or not.
	CancelBubble     bool                `json:"cancelBubble"`            // CancelBubble is a historical alias to Event.stopPropagation(). Setting its value to true before returning from an event handler prevents propagation of the event.
	Cancelable       bool                `json:"cancelable"`              // Cancelable is a Boolean indicating whether the event is cancelable.
	Composed         bool                `json:"composed"`                // Composed is a Boolean value indicating whether or not the event can bubble across the boundary between the shadow DOM and the regular DOM.
	CurrentTarget    *markup.EventTarget `json:"currentTarget,omitempty"` // CurrentTarget is a reference to the currently registered target for the event. This is the object to which the event is currently slated to be sent; it's possible this has been changed along the way through retargeting.
	DefaultPrevented bool                `json:"defaultPrevented"`        // DefaultPrevented indicates whether or not event.preventDefault() has been called on the event.
	EventPhase       EventPhase          `json:"eventPhase"`              // Phase indicates which phase of the event flow is being processed.
	Target           *markup.EventTarget `json:"target,omitempty"`        // Target is a reference to the target to which the event was originally dispatched.
	TimeStamp        float64             `json:"timeStamp"`               // TimeStamp is the time at which the event was created, in milliseconds. By specification, this value is time since epoch, but in reality browsers' definitions vary; in addition, work is underway to change this to be a DOMHighResTimeStamp instead.
	Type             string              `json:"type"`                    // Type is the name of the event (case-insensitive).
	IsTrusted        bool                `json:"isTrusted"`               // Indicates whether or not the event was initiated by the browser (after a user click for instance) or by a script (using an event creation method, like event.initEvent)
}

func dispatchEventHelperEvent(ee *event.Event, handler func(e *Event)) {
	var e Event
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// UIEvent derives from Event.
//
// https://developer.mozilla.org/en-US/docs/Web/API/UIEvent
type UIEvent struct {
	Event
	Detail uint64              `json:"detail"`         // Detail returns a long with details about the event, depending on the event type.
	View   *markup.EventTarget `json:"view,omitempty"` // View returns a WindowProxy that contains the view that generated the event.
}

func dispatchEventHelperUIEvent(ee *event.Event, handler func(e *UIEvent)) {
	var e UIEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// BeforeUnloadEvent is fired when the window, the document and its resources are about to be unloaded.
//
// https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent
type BeforeUnloadEvent struct {
	Event
}

func dispatchEventHelperBeforeUnloadEvent(ee *event.Event, handler func(e *BeforeUnloadEvent)) {
	var e BeforeUnloadEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// EventPhase describe which phase the event flow is currently being evaluated.
//
// https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
type EventPhase int

const (
	// EventPhaseNone is NO event is being processed at this time.
	EventPhaseNone EventPhase = iota
	// EventPhaseCapturingPhase is HTMLHtmlElement, and so on through the elements until the target's parent is reached. Event listeners registered for capture mode when EventTarget.addEventListener() was called are triggered during this phase.
	EventPhaseCapturingPhase
	// EventPhaseAtTarget is the event has arrived at the event's target. Event listeners registered for this phase are called at this time. If Event.bubbles is false, processing the event is finished after this phase is complete.
	EventPhaseAtTarget
	// EventPhaseBubblingPhase is the event is propagating back up through the target's ancestors in reverse order, starting with the parent, and eventually reaching the containing Window. This is known as bubbling, and occurs only if Event.bubbles is true. Event listeners registered for this phase are triggered during this process.
	EventPhaseBubblingPhase
)

// MouseEvent represents events that occur due to the user interacting
// with a pointing device (such as a mouse).
// Common events using this interface include click, dblclick, mouseup, mousedown.
//
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
type MouseEvent struct {
	UIEvent

	AltKey        bool                `json:"altKey"`                  // AltKey returns true if the alt key was down when the mouse event was fired.
	Button        int                 `json:"button"`                  // Button number that was pressed (if applicable) when the mouse event was fired.
	Buttons       int                 `json:"buttons"`                 // Buttons being depressed (if any) when the mouse event was fired.
	ClientX       float64             `json:"clientX"`                 // ClientX is the X coordinate of the mouse pointer in local (DOM content) coordinates.
	ClientY       float64             `json:"clientY"`                 // ClientY is the Y coordinate of the mouse pointer in local (DOM content) coordinates.
	CtrlKey       bool                `json:"ctrlKey"`                 // CtrlKey returns true if the control key was down when the mouse event was fired.
	MetaKey       bool                `json:"metaKey"`                 // MetaKey returns true if the meta key was down when the mouse event was fired.
	MovementX     float64             `json:"movementX"`               // MovementX is the X coordinate of the mouse pointer relative to the position of the last mousemove event.
	MovementY     float64             `json:"movementY"`               // MovementY is the Y coordinate of the mouse pointer relative to the position of the last mousemove event.
	Region        string              `json:"region"`                  // Region returns the id of the hit region affected by the event. If no hit region is affected, null is returned.
	RelatedTarget *markup.EventTarget `json:"relatedTarget,omitempty"` // RelatedTarget is the secondary target for the event, if there is one.
	ScreenX       float64             `json:"screenX"`                 // ScreenX is the X coordinate of the mouse pointer in global (screen) coordinates.
	ScreenY       float64             `json:"screenY"`                 // ScreenY is the Y coordinate of the mouse pointer in global (screen) coordinates.
	ShiftKey      bool                `json:"shiftKey"`                // ShiftKey returns true if the shift key was down when the mouse event was fired.
}

func (e *MouseEvent) ClientPos() geom.Point {
	return geom.Point{X: e.ClientX, Y: e.ClientY}
}

func (e *MouseEvent) ScreenPos() geom.Point {
	return geom.Point{X: e.ScreenX, Y: e.ScreenY}
}

func dispatchEventHelperMouseEvent(ee *event.Event, handler func(e *MouseEvent)) {
	var e MouseEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// PopStateEvent is dispatched to the window every time the active history entry changes between two history entries for the same document.
// If the history entry being activated was created by a call to history.pushState() or was affected by a call to history.replaceState(), the popstate event's state property contains a copy of the history entry's state object.
//
// https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent
type PopStateEvent struct {
	Event
}

func dispatchEventHelperPopStateEvent(ee *event.Event, handler func(e *PopStateEvent)) {
	var e PopStateEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// WheelDeltaMode represents the unit of the delta values scroll amount.
type WheelDeltaMode int

const (
	//WheelDeltaModePixel is the delta values are specified in pixels.
	WheelDeltaModePixel WheelDeltaMode = iota
	//WheelDeltaModeLine is the delta values are specified in lines.
	WheelDeltaModeLine
	//WheelDeltaModePage is the delta values are specified in pages.
	WheelDeltaModePage
)

// WheelEvent represents events that occur due to the user moving a mouse wheel or similar input device.
//
// https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
type WheelEvent struct {
	MouseEvent

	DeltaX    float64        `json:"deltaX"`    // DeltaX returns a double representing the horizontal scroll amount.
	DeltaY    float64        `json:"deltaY"`    // DeltaY returns a double representing the vertical scroll amount.
	DeltaZ    float64        `json:"deltaZ"`    // DeltaZ returns a double representing the scroll amount for the z-axis.
	DeltaMode WheelDeltaMode `json:"deltaMode"` // DeltaMode returns an unsigned long representing the unit of the delta values scroll
}

func dispatchEventHelperWheelEvent(ee *event.Event, handler func(e *WheelEvent)) {
	var e WheelEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// PageTransitionEvent fire when a webpage is being loaded or unloaded.
//
// https://developer.mozilla.org/en-US/docs/Web/API/PageTransitionEvent
type PageTransitionEvent struct {
	Event
	Persisted bool `json:"persisted"` // Persisted indicates if a webpage is loading from a cache.
}

func dispatchEventHelperPageTransitionEvent(ee *event.Event, handler func(e *PageTransitionEvent)) {
	var e PageTransitionEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// ProgressEvent represents events measuring progress of an underlying process,
//  like an HTTP request (for an XMLHttpRequest, or the loading of the underlying resource of an <img>, <audio>, <video>, <style> or <link>).
//
// https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent
type ProgressEvent struct {
	Event

	LengthComputable bool   `json:"lengthComputable"` // LengthComputable is a Boolean flag indicating if the total work to be done, and the amount of work already done, by the underlying process is calculable.
	Loaded           uint64 `json:"loaded"`           // Loaded is an unsigned long long representing the amount of work already performed by the underlying process.
	Total            uint64 `json:"total"`            // Total is an unsigned long long representing the total amount of work that the underlying process is in the progress of performing.
}

func dispatchEventHelperProgressEvent(ee *event.Event, handler func(e *ProgressEvent)) {
	var e ProgressEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// KeyboardEvent escribe a user interaction with the keyboard. Each event describes a key;
//  the event type (keydown, keypress, or keyup) identifies what kind of activity was performed.
//
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
type KeyboardEvent struct {
	UIEvent

	AltKey      bool        `json:"altKey"`      // AltKey returns a Boolean that is true if the Alt ( Option or ⌥ on OS X) key was active when the key event was generated.
	Code        string      `json:"code"`        // Code Returns a DOMString with the code value of the key represented by the event.
	CtrlKey     bool        `json:"ctrlKey"`     // CtrlKey returns a Boolean that is true if the Ctrl key was active when the key event was generated.
	IsComposing bool        `json:"isComposing"` // IsComposing returns a Boolean that is true if the event is fired between after compositionstart and before compositionend.
	Key         string      `json:"key"`         // Key returns a DOMString representing the key value of the key represented by the event.
	Locale      string      `json:"locale"`      // Locale represente a locale string indicating the locale the keyboard is configured for.
	Location    json.Number `json:"location"`    // Location returns a Number representing the location of the key on the keyboard or other input device.
	MetaKey     bool        `json:"metaKey"`     // MetaKey returns a Boolean that is true if the Meta key (on Mac keyboards, the ⌘Command key; on Windows keyboards, the Windows key (⊞)) was active when the key event was generated.
	Repeat      bool        `json:"repeat"`      // Repeat returns a Boolean that is true if the key is being held down such that it is automatically repeating.
	ShiftKey    bool        `json:"shiftKey"`    // ShitKey returns a Boolean that is true if the Shift key was active when the key event was generated.
}

func dispatchEventHelperKeyboardEvent(ee *event.Event, handler func(e *KeyboardEvent)) {
	var e KeyboardEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// FocusEvent represents focus-related events like focus, blur, focusin, or focusout.
//
// https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent
type FocusEvent struct {
	UIEvent

	RelatedTarget *markup.EventTarget `json:"relatedTarget,omitempty"` // RelatedTarget is an EventTarget representing a secondary target for this event.
}

func dispatchEventHelperFocusEvent(ee *event.Event, handler func(e *FocusEvent)) {
	var e FocusEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// CompositionEvent represents events that occur due to the user indirectly entering text.
//
// https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent
type CompositionEvent struct {
	UIEvent

	Data   string `json:"data"`   // Data returns the characters generated by the input method that raised the event; its varies depending on the type of event that generated the CompositionEvent object.
	Locale string `json:"locale"` // Locale returns the locale of current input method (for example, the keyboard layout locale if the composition is associated with IME).
}

func dispatchEventHelperCompositionEvent(ee *event.Event, handler func(e *CompositionEvent)) {
	var e CompositionEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// DragEvent is a DOM event that represents a drag and drop interaction.
// The user initiates a drag by placing a pointer device (such as a mouse)
// on the touch surface and then dragging the pointer to a new location (such as another DOM element).
// Applications are free to interpret a drag and drop interaction in an application-specific way.
//
// https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
type DragEvent struct {
	MouseEvent

	DataTransfer interface{} `json:"dataTransfer,omitempty"` // The data that is transferred during a drag and drop interaction.
}

func dispatchEventHelperDragEvent(ee *event.Event, handler func(e *DragEvent)) {
	var e DragEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// HashChangeEvent is fired when the fragment identifier of the URL has changed
//  (the part of the URL that follows the # symbol, including the # symbol).
//
// https://developer.mozilla.org/en-US/docs/Web/API/HashChangeEvent
type HashChangeEvent struct {
	Target     *markup.EventTarget `json:"target,omitempty"` // The browsing context (<code>window</code>).
	Type       string              `json:"type"`             // The type of event.
	Bubbles    bool                `json:"bubbles"`          // Whether the event normally bubbles or not
	Cancelable bool                `json:"cancelable"`       //Whether the event is cancellable or not?
	OldURL     string              `json:"oldURL"`           //The previous URL from which the window was navigated.
	NewURL     string              `json:"newURL"`
}

func dispatchEventHelperHashChangeEvent(ee *event.Event, handler func(e *HashChangeEvent)) {
	var e HashChangeEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}

// OfflineAudioCompletionEvent represents events that occur when the processing of an OfflineAudioContext
//  is terminated. The complete event implements this interface.
//
// https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioCompletionEvent
type OfflineAudioCompletionEvent struct {
	Event

	// An AudioBuffer containing the result of processing an OfflineAudioContext.
	RenderedBuffer interface{} `json:"renderedBuffer,omitempty"`
}

func dispatchEventHelperOfflineAudioCompletionEvent(ee *event.Event, handler func(e *OfflineAudioCompletionEvent)) {
	var e OfflineAudioCompletionEvent
	if err := ee.Argument.Decode(&e); err != nil {
		panic(err)
	}
	handler(&e)
}
