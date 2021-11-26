import _trigger from '../core/_trigger';
var markManager = function (options) {
	this.markers = [];
	this.map = options.map;
	this.defaultOpt = Object.assign(
		{},
		{
			map: options.map,
		},
		options.defaultOpt
	);
	this.create = options.create;
	this.destory = options.destory;
};
markManager.prototype.getAllMarkers = function () {
	return this.markers;
};
markManager.prototype.getMarkerWithIndexById = function (id) {
	for (var i = 0; i < this.markers.length; i++) {
		if (this.markers[i].id == id) {
			return {
				element: this.markers[i],
				index: i,
			};
		}
	}
	return {
		element: null,
		index: -1,
	};
};
markManager.prototype.getMarkerById = function (id) {
	return this.getMarkerWithIndexById(id).element;
};
markManager.prototype.addMarker = function (option) {
	var opt = Object.assign({}, this.defaultOpt, option);
	var marker = null;
	if (!opt.lat || !opt.lng) {
		return null;
	}
	if (!option.id) {
		option.id = $.guid++;
	} else {
		marker = this.getMarkerById(opt.id);
	}
	if (marker) {
		marker.setMap(this.map);
		return marker;
	}
	if (this.create) {
		marker = this.create.apply(this, [opt]);
	}
	if (marker) {
		if (opt.id) {
			marker.id = opt.id;
		}
		this.markers.push(marker);
		return marker;
	}
	return null;
};
markManager.prototype.addMarkers = function (options) {
	var self = this;
	if (options && options.length) {
		return options.map(function (option) {
			return self.addMarker(option);
		});
	}
	return [];
};
markManager.prototype.removeMarker = function (id) {
	var item = this.getMarkerWithIndexById(id);
	if (item.element) {
		if (this.destory) {
			id = this.destory.apply(this, [item.element]);
			this.markers.splice(item.index);
		}
	}
	return id;
};
markManager.prototype.removeMarkers = function (ids) {
	if (ids && ids.length) {
		return ids.map(function (id) {
			return this.removeMarker(id);
		});
	}
	return [];
};
var initalCustomMarker = function () {
	if (!window.CustomMarker) {
		window.CustomMarker = function (options) {
			var defaultOpt = {
				latlng: null,
				map: null,
				html: null,
				popData: null,
				popTmp: null,
				popHeight: null,
				onclick: null,
				popTheme: 'marker',
				zIndex: null,
			};
			var opt = Object.assign({}, defaultOpt, options);
			this.latlng = opt.latlng;
			this.html = opt.html;
			this.map = opt.map;
			this.popData = opt.popData;
			this.popTmp = opt.popTmp;
			this.popHeight = opt.popHeight;
			this.showPop = !!(opt.popData && opt.popTmp);
			this.onclick = opt.onclick;
			this.popTheme = opt.popTheme;
			this.zIndex = opt.zIndex;
			this.setMap(opt.map);
		};
		window.CustomMarker.prototype = new window.google.maps.OverlayView();
		window.CustomMarker.prototype.poppanel = function (div) {
			var self = this;
			if (self.showPop) {
				var $pin = $(div);
				var html = $.renderHtml(self.popTmp, self.popData);
				var $content = $(
					'<div class="pop-content"><div>' + html + '</div></div>'
				);
				var tippopover = $pin.find('.pin').cui_tooltip({
					content: $content,
					placement: 'top',
					trigger: 'click',
					html: true,
					once: true,
					type: self.popTheme,
					onload: function () {
						// $(document).trigger('dom.load');
					},
				});
				setTimeout(function () {
					tippopover.show();
					window.google.maps.event.addListener(
						self.map,
						'zoom_changed',
						function () {
							tippopover.hide();
						}
					);
					window.google.maps.event.addListener(
						self.map,
						'dragstart',
						function () {
							tippopover.hide();
						}
					);
					$(window).one('click', function () {
						tippopover.hide();
					});
				}, 150);
			} else {
				self.onclick(div);
			}
		};
		window.CustomMarker.prototype.draw = function () {
			var self = this;
			var div = this.div;
			if (!div) {
				div = this.div = $(this.html)[0];
				var panes = this.getPanes();
				panes.overlayMouseTarget.appendChild(div);
				if (this.showPop || this.onclick) {
					if (this.zIndex) {
						$(div).css('zIndex', this.zIndex);
					}
					if ($.isTouch) {
						window.google.maps.event.addDomListener(
							$(div).children()[0],
							'touchstart',
							function () {
								if (self.onclick) {
									self.onclick(div);
								}
								self.poppanel(div);
							}
						);
					} else {
						window.google.maps.event.addDomListener(
							$(div).children()[0],
							'click',
							function () {
								if (self.onclick) {
									self.onclick(div);
								}
								self.poppanel(div);
							}
						);
					}
				}
			}
			var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
			if (point) {
				div.style.left = point.x + 'px';
				div.style.top = point.y + 'px';
			}
		};
		window.CustomMarker.prototype.remove = function () {
			if (this.div) {
				this.div.parentNode.removeChild(this.div);
				this.div = null;
			}
		};
		window.CustomMarker.prototype.getPosition = function () {
			return this.latlng;
		};
		window.CustomMarker.prototype.refreshPop = function (
			popData,
			popTmp,
			onclick
		) {
			this.popData = popData;
			this.popTmp = popTmp;
			this.showPop = popData && popTmp;
			this.onclick = onclick;
		};
	}
};
var getMapTypeId = function (type) {
	var mapTypeId;
	switch (type * 1) {
		case 0:
			mapTypeId = window.google.maps.MapTypeId.ROADMAP;
			break;
		case 1:
			mapTypeId = window.google.maps.MapTypeId.SATELLITE;
			break;
		case 2:
			mapTypeId = window.google.maps.MapTypeId.HYBRID;
			break;
		case 3:
			mapTypeId = window.google.maps.MapTypeId.TERRAIN;
			break;
		default:
			mapTypeId = window.google.maps.MapTypeId.ROADMAP;
			break;
	}
	return mapTypeId;
};
export default {
	name: 'gmap',
	dependence: 'googlemap',
	defaultOpt: {
		lat: 0,
		lng: 0,
		zoom: 8,
		type: 0,
		streetview: false,
		inline: false,
		zoomable: true,
		draggable: true,
		scrollwheel: true,
		ondrag: null,
		ondraged: null,
		onzoom: null,
		onclick: null,
		onload: null,
		onresize: null,
		autoresize: false,
		clickableicons: true,
		disabledefaultui: false,
		streetviewcontrol: true,
		streetviewcontrolpos: 'BOTTOM_RIGHT',
		pancontrol: true,
		pancontrolpos: 'TOP_RIGHT',
		rotatecontrol: true,
		rotatecontrolpos: 'TOP_CENTER',
		zoomcontrol: true,
		zoomcontrolpos: 'BOTTOM_RIGHT',
		maptypecontrol: true,
		maptypecontrolpos: 'TOP_RIGHT',
		distancecontrol: true,
		distancecontrolpos: 'BOTTOM_LEFT',
	},
	init: function ($this, opt, exportObj) {
		var mapOptions = {
			disableDefaultUI: opt.disabledefaultui,
			gestureHandling: 'greedy',
			center: new window.google.maps.LatLng(opt.lat, opt.lng),
			mapTypeId: getMapTypeId(opt.type),
			zoom: opt.zoom,
			zoomable: opt.zoomable,
			scrollwheel: opt.scrollwheel,
			draggable: opt.draggable,
			clickableIcons: opt.clickableicons,
			streetViewControl: opt.streetviewcontrol,
			streetViewControlPos: opt.streetviewcontrolpos,
			panControl: opt.pancontrol,
			panControlPos: opt.pancontrolpos,
			rotateControl: opt.rotatecontrol,
			rotateControlPos: opt.rotatecontrolpos,
			zoomControl: opt.zoomcontrol,
			zoomControlPos: opt.zoomcontrolpos,
			mapTypeControl: opt.maptypecontrol,
			mapTypeControlPos: opt.maptypecontrolpos,
			distanceControl: opt.distancecontrol,
			distanceControlPos: opt.distancecontrolpos,
		};
		if (opt.inline) {
			mapOptions = Object.assign(mapOptions, {
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,
				draggable: false,
			});
		}
		var map = new window.google.maps.Map($this.get(0), mapOptions);
		exportObj.gmap = map;
		var markers = new markManager({
			defaultOpt: {
				draggable: false,
				icon: 'icon-cui',
				onclick: null,
				onmouseover: null,
				onmouseout: null,
				onhover: null,
				html: null,
				popTheme: null,
				popData: null,
				popTmp: null,
				popHeight: 100,
				zIndex: null,
			},
			map: exportObj.gmap,
			create: function (markerOpt) {
				var latlng = new window.google.maps.LatLng({
					lat: markerOpt.lat,
					lng: markerOpt.lng,
				});
				initalCustomMarker();
				var marker = new window.CustomMarker({
					latlng: latlng,
					map: markerOpt.map,
					html:
						'<div class="map-marker"><a class="pin" ><i class="' +
						markerOpt.icon +
						'"></i></div></div>',
					popData: markerOpt.popData,
					popTmp: markerOpt.popTmp,
					popHeight: markerOpt.popHeight,
					onclick: markerOpt.onclick,
					popTheme: markerOpt.popTheme,
					zIndex: markerOpt.zIndex,
				});
				if (markerOpt.id) {
					marker.id = markerOpt.id;
				}
				return marker;
			},
			destory: function (marker) {
				$(marker).addClass('removeing');
				$(document).one('mouseup', function () {
					marker.setMap(null);
				});
			},
		});
		exportObj.setCenter = function (lat, lng) {
			var center = new window.google.maps.LatLng(lat, lng);
			return map.setCenter(center);
		};
		var panorama = null;
		exportObj.showStreetView = function () {
			var streetViewLocation = new window.google.maps.LatLng(
				opt.lat,
				opt.lng
			);
			var sv = new window.google.maps.StreetViewService();
			sv.getPanoramaByLocation(
				streetViewLocation,
				50,
				function (data, status) {
					if (status == 'OK') {
						panorama = map.getStreetView();
						panorama.setPosition(streetViewLocation);
						panorama.setVisible(true);
					} else {
						$(document).trigger('gmap.streetview.error');
					}
				}
			);
		};
		exportObj.hideStreetView = function () {
			panorama.setVisible(false);
		};
		exportObj.changeMaptype = function (id) {
			map.setMapTypeId(getMapTypeId(id));
		};
		exportObj.addMarker = function (option) {
			return markers.addMarker(option);
		};
		exportObj.findItem = function (id) {
			for (var i = 0; i < markers.length; i++) {
				if (markers[i].id == id) {
					return {
						element: markers[i],
						index: i,
					};
				}
			}
			return {
				element: null,
				index: -1,
			};
		};
		exportObj.getMarkerById = function (id) {
			return markers.getMarkerById(id);
		};
		exportObj.setAllMap = function (map) {
			var markerList = markers.getAllMarkers();
			for (var i = 0; i < markerList.length; i++) {
				markerList[i].setMap(map);
			}
		};
		exportObj.hideMarkers = function () {
			exportObj.setAllMap(null);
		};
		exportObj.showMarkers = function () {
			exportObj.setAllMap(map);
		};
		exportObj.deleteMarker = function (id) {
			return markers.deleteMarker(id);
		};
		exportObj.deleteMarkers = function (ids) {
			markers.deleteMarkers(ids);
		};
		exportObj.getMarkers = function () {
			return markers;
		};
		exportObj.getBounds = function () {
			return map.getBounds();
		};
		exportObj.setZoom = function (level) {
			if ($.isNumeric(level)) {
				map.setZoom(level);
			}
		};
		exportObj.fitBounds = function (latlngs) {
			var list = [];
			if (latlngs && latlngs.length) {
				list = list.concat(
					latlngs.map(function (e) {
						return {
							lat: e.lat,
							lng: e.lng,
						};
					})
				);
			} else {
				var markerList = markers.getAllMarkers();
				list = markerList.map(function (e) {
					return {
						lat: e.lat || e.latlng.lat(),
						lng: e.lng || e.latlng.lng(),
					};
				});
			}
			if (list && list.length) {
				var bounds = new window.google.maps.LatLngBounds();
				for (var i = 0; i < list.length; i++) {
					if (list[i].lat && list[i].lng) {
						bounds.extend(
							new window.google.maps.LatLng(
								list[i].lat,
								list[i].lng
							)
						);
					}
				}
				map.fitBounds(bounds);
			}
		};
	},
	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: function ($this, opt, exportObj) {
		var map = exportObj.gmap;
		window.google.maps.event.addListenerOnce(
			map,
			'tilesloaded',
			function () {
				//click event
				opt.onclick && _trigger(opt.onclick, $this, opt, exportObj);
				//drag event
				if (opt.draggable) {
					if (opt.ondrag) {
						window.google.maps.event.addListener(
							map,
							'dragstart',
							function () {
								_trigger(opt.ondrag, $this, opt, exportObj);
							}
						);
					}
					if (opt.ondraged) {
						window.google.maps.event.addListener(
							map,
							'dragend',
							function () {
								_trigger(opt.ondraged, $this, opt, exportObj);
							}
						);
					}
				}
				if (opt.zoomable && opt.onzoom) {
					window.google.maps.event.addListener(
						map,
						'zoom_changed',
						function () {
							_trigger(opt.onzoom, $this, opt, exportObj);
						}
					);
				}
				if (opt.onload) {
					_trigger(opt.onload, $this, opt, exportObj);
				}
			}
		);
		if (opt.onresize) {
			window.google.maps.event.addListener(map, 'resize', function () {
				_trigger(opt.onresize, $this, opt, exportObj);
			});
		}
		if (opt.autoresize) {
			window.google.maps.event.addDomListener(
				window,
				'resize',
				function () {
					exportObj.eset();
				}
			);
		}
		if (opt.streetview) {
			exportObj.showStreetView();
		}
	},
	destroyBefore: null,
};
// $.cui.plugin(gmapConfig);
// $(document).on('dom.load.gmap', function () {
//     $('[data-gmap]')
//         .each(function (index, item) {
//             var $this = $(item);
//             var data = $this.data();
//             $this.removeAttr('data-gmap');
//             $this.onscroll({
//                 callback: function () {
//                     $this.gmap(data);
//                     $this.attr('data-gmap-load', '');
//                 }
//             });
//         });
// });
