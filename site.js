"use strict";
window.commonModule = function(e) {
    e(document).ready(function() {
        var a;
        a = e("body").attr("id"),
        window[a + "Module"].loadPage()
    })
}(jQuery),
window.mapsUtils = function(e) {
    var a = !1
      , r = function(e, a, r) {
        a.comment.length > 0 && r.addListener("click", function() {
            var t;
            (t = a,
            new google.maps.InfoWindow({
                content: t.pointIndex + 1 + ". " + t.comment + " (" + t.lat + ", " + t.lng + ")"
            })).open(e, r)
        })
    };
    return {
        pixelsToMapUnits: function(a, r) {
            var t = e(a.getDiv()).height()
              , n = a.getBounds()
              , o = r / t * (n.getNorthEast().lat() - n.getSouthWest().lat());
            return o = Math.abs(o)
        },
        latDistToMeters: function(e) {
            return 111e3 * e
        },
        validateLatitude: function(e) {
            if (!/^-?\d{1,2}\.{0,1}\d{0,}/i.exec(e))
                return {
                    value: null,
                    error: "Please provide a valid number (for example: 38.345689 or -34.435456) as latitude"
                };
            var a = parseFloat(e);
            return isNaN(a) ? {
                value: null,
                error: "Please provide a valid number as latitude"
            } : a > 90 || a < -90 ? {
                value: null,
                error: "Please provide a valid number within range -90 to 90 as latitude."
            } : {
                value: a,
                error: null
            }
        },
        validateLongitude: function(e) {
            if (!/^-?\d{1,3}\.{0,1}\d{0,}/i.exec(e))
                return {
                    value: null,
                    error: "Please provide a valid number (for example: 138.345689 or -134.435456) as longitude"
                };
            var a = parseFloat(e);
            return isNaN(a) ? {
                value: null,
                error: "Please provide a valid number as longitude"
            } : a > 180 || a < -180 ? {
                value: null,
                error: "Please provide a valid number within range -180 to 180 as latitude."
            } : {
                value: a,
                error: null
            }
        },
        addSquareAtPoint: function(e, t) {
            var n = null;
            a && (n = t.pointIndex + 1 + "");
            var o, l = new google.maps.Marker({
                map: e,
                position: {
                    lat: t.lat,
                    lng: t.lng
                },
                label: n,
                icon: (o = t.color,
                {
                    path: "M-10 -10 L-10 10 L10 10 L10 -10 Z",
                    fillColor: o,
                    fillOpacity: .8,
                    strokeColor: o,
                    strokeWeight: 0,
                    scale: 1
                })
            });
            return r(e, t, l),
            l
        },
        addCircleAtPoint: function(e, t) {
            var n = null;
            a && (n = t.pointIndex + 1 + "");
            var o = new google.maps.Marker({
                position: {
                    lat: t.lat,
                    lng: t.lng
                },
                map: e,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 9,
                    fillColor: t.color,
                    strokeColor: t.color,
                    fillOpacity: .8,
                    strokeWeight: .8
                },
                label: n
            });
            return r(e, t, o),
            o
        },
        addMarkerAtPoint: function(e, t) {
            var n = null;
            a && (n = t.pointIndex + 1 + "");
            var o, l = new google.maps.Marker({
                map: e,
                position: {
                    lat: t.lat,
                    lng: t.lng
                },
                label: n,
                icon: (o = t.color,
                {
                    path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                    fillColor: o,
                    fillOpacity: .9,
                    strokeColor: o,
                    strokeWeight: 0,
                    scale: .8
                })
            });
            return r(e, t, l),
            l
        },
        setShowLabels: function(e) {
            a = e
        },
        drawLine: function(e, a) {
            var r = new google.maps.Polyline({
                path: a.data,
                geodesic: !1,
                strokeColor: "#0000FF",
                strokeOpacity: 1,
                strokeWeight: 2
            });
            return r.setMap(e),
            r
        }
    }
}(jQuery),
window.indexModule = function(e) {
    var a = window.mapsUtils
      , r = null
      , t = []
      , n = null
      , o = function(a) {
        var r = {};
        return r.lat = a[0],
        r.lng = a[1],
        a[2] && function(a) {
            if (!a || "string" != typeof a)
                return !1;
            var r = a.toLowerCase();
            return "#" === r.charAt(0) ? function(e) {
                if (!e || "string" != typeof e)
                    return !1;
                var a = "";
                switch ("#" === e.substring(0, 1) && (a = e.substring(1)),
                a.length) {
                case 3:
                    return /^[0-9A-F]{3}$/i.test(a);
                case 6:
                    return /^[0-9A-F]{6}$/i.test(a);
                default:
                    return !1
                }
            }(r) : !(e.inArray(r, ["white", "silver", "gray", "black", "red", "maroon", "yellow", "olive", "lime", "green", "aqua", "teal", "blue", "navy", "fuchsia", "purple"]) < 0)
        }(a[2]) ? r.color = a[2] : r.color = "blue",
        a[3] ? r.shape = a[3].toLowerCase() : r.shape = "marker",
        a[4] ? r.comment = a[4] : r.comment = "",
        r
    }
      , l = function(e, a) {
        var r = {
            dataPoint: e,
            shape: a
        };
        t.push(r)
    }
      , i = function(e, o) {
        !function() {
            n && n.setMap(null);
            for (var e = 0; e < t.length; e++)
                t[e].shape.setMap(null);
            t = []
        }(),
        o && (n = a.drawLine(r, e));
        for (var i = 0; i < e.data.length; i++) {
            var u = e.data[i];
            switch (u.shape) {
            case "square":
                h = r,
                m = u,
                void 0,
                f = a.addSquareAtPoint(h, m),
                l(m, f);
                break;
            case "circle":
                p = r,
                v = u,
                void 0,
                g = a.addCircleAtPoint(p, v),
                l(v, g);
                break;
            case "marker":
                s = r,
                d = u,
                void 0,
                c = a.addMarkerAtPoint(s, d),
                l(d, c);
                break;
            default:
                console.log("Invalid shape type: " + u.shape)
            }
        }
        var s, d, c, p, v, g, h, m, f
    }
      , u = function() {
        var t = e("#multiPointTextarea").val()
          , n = Papa.parse(t);
        if (n.errors.length > 0)
            alert("Please enter valid CSV data.");
        else {
            var l = function(e) {
                var r = {
                    data: [],
                    errors: []
                };
                if (0 === e.data.length)
                    return r.errors.push("Please enter CSV data."),
                    r;
                for (var t = 0; t < e.data.length; t++) {
                    var n = e.data[t];
                    if (!(n.length > 0 && "" === n[0])) {
                        if (n.length <= 2)
                            return r.errors.push("Each row must have at least longitude and latitude defined.\nPlease correct row number: " + (t + 1)),
                            r;
                        var l = a.validateLatitude(n[0]);
                        if (l.error) {
                            var i = l.error + "\nPlease correct row number: " + (t + 1);
                            return r.errors.push(i),
                            r
                        }
                        if (n[0] = l.value,
                        (l = a.validateLongitude(n[1])).error)
                            return i = l.error + "\nPlease correct row number: " + (t + 1),
                            r.errors.push(i),
                            r;
                        n[1] = l.value;
                        var u = o(n);
                        u.pointIndex = t,
                        r.data.push(u)
                    }
                }
                return r
            }(n);
            if (l.errors.length > 0)
                alert(l.errors[0]);
            else {
                var u = e("#showPointNumsCheckBox").prop("checked");
                a.setShowLabels(u);
                var s = e("#showLinesCheckBox").prop("checked");
                i(l, s),
                function(e) {
                    for (var a = [], t = [], n = 0; n < e.data.length; n++) {
                        var o = e.data[n];
                        a.push(o.lat),
                        t.push(o.lng)
                    }
                    var l = Math.max.apply(Math, a)
                      , i = Math.min.apply(Math, a)
                      , u = Math.max.apply(Math, t)
                      , s = {
                        lat: i,
                        lng: Math.min.apply(Math, t)
                    }
                      , d = {
                        lat: l,
                        lng: u
                    }
                      , c = new google.maps.LatLngBounds(s,d);
                    r.fitBounds(c)
                }(l)
            }
        }
    }
      , s = function() {
        var t = e("#centerField").val().split(",")
          , n = "Please provide the value in latitude,longitude format. For example: -33.9249,118.4241";
        if (t.length < 2)
            alert(n);
        else {
            var o = t[0].trim()
              , l = t[1].trim()
              , i = a.validateLatitude(o);
            if (i.error)
                alert(n);
            else {
                var u = i.value;
                if ((i = a.validateLongitude(l)).error)
                    alert(n);
                else {
                    var s = i.value
                      , d = new google.maps.LatLng(u,s);
                    r.panTo(d)
                }
            }
        }
    };
    return {
        loadPage: function() {
            null === r && (r = new google.maps.Map(document.getElementById("map"),{
                center: {
                    lat: 40.4168,
                    lng: 3.7038
                },
                zoom: 2,
                maxZoom: 17,
                minZoom: 2
            }),
            e("#multiPointTextarea").attr("placeholder", '12.34567,-132.6789,red,square,"Group One"\n12.34567,-132.6889,red,cricle,"Group Two"\n12.34567,-132.6889,red,marker,"Group Three"'),
            e("#updateMapButton").click(u),
            e("#centerMapButton").click(s),
            e("#multiPointTextarea").val('19.0760,72.8777,#00FF00,marker,"Mumbai"\n18.5204,73.8567,red,square,"Pune"\n40.7128,-74.0060,#333,circle,"New York"\n-33.9249,18.4241,red,square,"Cape Town"\n-22.9068,-43.1729,blue,marker,"Rio de Janeiro"'))
        }
    }
}(jQuery);
