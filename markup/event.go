package markup

import (
	"github.com/yossoy/exciton/internal/object"

	"github.com/yossoy/exciton/event"
	"github.com/yossoy/exciton/log"
)

// EventListener hold event name, handler, and properties
type EventListener struct {
	Name                string
	Listener            event.Handler
	callPreventDefault  bool
	callStopPropagation bool
	//TODO: binding position
}

func (l *EventListener) isMarkup()        {}
func (l *EventListener) isMarkupOrChild() {}

// PreventDefault prevents the default behavior of the event from occurring.
//
// See https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault.
func (l *EventListener) PreventDefault() *EventListener {
	l.callPreventDefault = true
	return l
}

// StopPropagation prevents further propagation of the current event in the
// capturing and bubbling phases.
//
// See https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation.
func (l *EventListener) StopPropagation() *EventListener {
	l.callStopPropagation = true
	return l
}

// Apply implements the Applyer interface.
func (l *EventListener) applyToNode(b *Builder, n *node, on *node) {
	match := false
	exist := false
	if on.eventListeners != nil {
		if oe, ok := on.eventListeners[l.Name]; ok {
			if l.callPreventDefault == oe.callPreventDefault && l.callStopPropagation == oe.callStopPropagation {
				// There is not need to compare Listener,
				//   	 because Listner is used only in go region and is not used in js region.
				/*
					nf := reflect.ValueOf(l.Listener)
					of := reflect.ValueOf(oe.Listener)
					if nf == of {
						match = true
					}*/
				match = true
			}
			exist = true
			delete(on.eventListeners, l.Name)
		}
	}
	if n.eventListeners == nil {
		n.eventListeners = make(map[string]*EventListener)
	}
	n.eventListeners[l.Name] = l
	if !match {
		if exist {
			b.diffSet.RemoveEventListener(n, l.Name)
		}
		b.diffSet.AddEventListener(n, l.Name, n.uuid, l.callPreventDefault, l.callStopPropagation)
	}
}

func InitEvents() error {
	err := event.AddHandler("/:evtroot/:id/html/:html/:event", func(e *event.Event) {
		//id := e.Params["id"]
		eventRoot := e.Params["evtroot"]
		id := e.Params["id"]
		html := e.Params["html"]
		event := e.Params["event"]
		//TODO: cleaup code!
		var buildable Buildable
		switch eventRoot {
		case "window":
			buildable = object.Windows.Get(id).(Buildable)
		case "menu":
			buildable = object.Menus.Get(id).(Buildable)
		default:
			panic("invalid html event path:/" + eventRoot + "/...")
		}
		itm := buildable.Builder().elements.Get(html)
		if itm == nil {
			log.PrintError("obj not found: %q", html)
			return
		}
		obj, ok := itm.(*node)
		if !ok {
			panic("obj not found(invalid sequecne): " + html)
		}
		l, ok := obj.eventListeners[event]
		if !ok {
			log.PrintError("event is not registerd: %q", event)
			return
		}
		l.Listener(e)
	})
	return err
}
