    jsPlumb.ready(function () {

        var instance,
            discs = [],

            initAnimation = function (elId) {
                var el = document.getElementById(elId);

                instance.on(el, 'click', function (e, ui) {
                    if (el.className.indexOf("jsPlumb_dragged") > -1) {
                        jsPlumb.removeClass(elId, "jsPlumb_dragged");
                        return;
                    }
                    var o = instance.getOffset(el, true),
                        o2 = instance.getOffset(el),
                        s = jsPlumb.getSize(el),
                        pxy = [e.pageX || e.clientX, e.pageY || e.clientY],
                        // c = [pxy[0] - (o.left + (s[0] / 2)), pxy[1] - (o.top + (s[1] / 2))],
                        // oo = [c[0] / s[0], c[1] / s[1]],
                        DIST = 350,
                        l = o2.left + (oo[0] * DIST),
                        t = o2.top + (oo[1] * DIST);

                    var id = el.getAttribute("id");
                    instance.animate(el, {left: l, top: t}, { duration: 350, easing: 'easeOutBack' });
                });
            },

            endpoint = {
                anchor: [0.5, 0.5, 0, -1],
                connectorStyle: { strokeWidth: 7, stroke: "rgba(118,229,30,0.7)" },
                endpointsOnTop: true,
                isSource: true,
                maxConnections: 10,
                isTarget: true,
                dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
            },

            prepare = function (elId) {
                initAnimation(elId);

                return instance.addEndpoint(elId, endpoint);
            },


        // get a jsPlumb instance, setting some appropriate defaults and a Container.
        instance = jsPlumb.getInstance({
            DragOptions: { cursor: 'wait', zIndex: 20 },
            Endpoint: [ "Image", { url: "littledot.png" } ],
            Connector: [ "Bezier", { curviness: 90 } ],
            Container: "canvas"
        });

        // suspend drawing and initialise.
        instance.batch(function () {
            var e1 = prepare("bd1"),
                e2 = prepare("bd2"),
                e3 = prepare("bd3"),
                e4 = prepare("bd4"),
                e5 = prepare("bd5"),
                e6 = prepare("bd6"),
                e7 = prepare("bd7"),
                e8 = prepare("bd8"),
                e9 = prepare("bd9"),
                e10 = prepare("bd10"),
                e11 = prepare("bd11")
                
                clearBtn = jsPlumb.getSelector("#anim-clear"),
                addBtn = jsPlumb.getSelector("#add");

            instance.on(clearBtn, "click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                instance.detachEveryConnection();
            });

        });

        jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });