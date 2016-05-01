/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "5c07e755b38c6e34e120"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _index = __webpack_require__(2);\n\nvar _primitives = __webpack_require__(3);\n\nvar _math = __webpack_require__(4);\n\nvar _index2 = __webpack_require__(5);\n\nvar _index3 = __webpack_require__(6);\n\nvar _particles = __webpack_require__(7);\n\nvar random = (0, _math.seededRandom)(12345);\nvar canvas = document.getElementById('canvas');\nvar context = (0, _index.initCanvas)(canvas);\nvar width = window.innerWidth;\nvar height = window.innerHeight;\n\nvar createParticle = function createParticle() {\n  var mass = random() * 1.72 + 0.63;\n  return {\n    x: random() * width,\n    y: random() * height,\n    mass: mass,\n    radius: mass\n  };\n};\n\nvar particles = (0, _particles.createParticles)(1440, { width: width, height: height }, random);\n\nparticles.forEach(function (p) {\n  (0, _primitives.createDot)(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' });\n});\n\nvar start = +new Date();\nvar tree = (0, _index3.createNode)(particles, { x: 0, y: 0, width: width, height: height });\nconsole.log(+new Date() - start);\nconsole.log(tree);\nconsole.log(particles.reduce(function (t, p) {\n  t += p.mass;return t;\n}, 0));//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwLmpzP2JkOWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdENhbnZhcyB9IGZyb20gJy4vY2FudmFzL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZURvdCB9IGZyb20gJy4vY2FudmFzL3ByaW1pdGl2ZXMnO1xuaW1wb3J0IHsgc2VlZGVkUmFuZG9tIH0gZnJvbSAnLi91dGlscy9tYXRoJztcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnLi91dGlscy9pbmRleCc7XG5cbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tICcuL3RyZWUvaW5kZXgnO1xuaW1wb3J0IHsgY3JlYXRlUGFydGljbGVzIH0gZnJvbSAnLi90cmVlL3BhcnRpY2xlcyc7XG5cbmNvbnN0IHJhbmRvbSA9IHNlZWRlZFJhbmRvbSgxMjM0NSk7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjb250ZXh0ID0gaW5pdENhbnZhcyhjYW52YXMpO1xuY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuY29uc3QgY3JlYXRlUGFydGljbGUgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBtYXNzID0gKHJhbmRvbSgpICogMS43MikgKyAwLjYzO1xuICByZXR1cm4ge1xuICAgIHg6IHJhbmRvbSgpICogd2lkdGgsXG4gICAgeTogcmFuZG9tKCkgKiBoZWlnaHQsXG4gICAgbWFzczogbWFzcyxcbiAgICByYWRpdXM6IG1hc3NcbiAgfTtcbn1cblxubGV0IHBhcnRpY2xlcyA9IGNyZWF0ZVBhcnRpY2xlcygxNDQwLCB7d2lkdGgsIGhlaWdodH0sIHJhbmRvbSk7XG5cbnBhcnRpY2xlcy5mb3JFYWNoKChwKSA9PiB7XG4gIGNyZWF0ZURvdChjb250ZXh0LCB7IHg6IHAueCwgeTogcC55LCByYWRpdXM6IHAucmFkaXVzLCBjb2xvcjogJ3doaXRlJyB9KTtcbn0pO1xuXG5jb25zdCBzdGFydCA9ICtuZXcgRGF0ZSgpO1xuY29uc3QgdHJlZSA9IGNyZWF0ZU5vZGUocGFydGljbGVzLCB7IHg6IDAsIHk6IDAsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG5jb25zb2xlLmxvZygrbmV3IERhdGUoKSAtIHN0YXJ0KTtcbmNvbnNvbGUubG9nKHRyZWUpO1xuY29uc29sZS5sb2cocGFydGljbGVzLnJlZHVjZSgodCwgcCkgPT4geyB0ICs9IHAubWFzczsgcmV0dXJuIHQgfSwgMCkpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2FwcC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.initCanvas = initCanvas;\nexports.clearCanvas = clearCanvas;\n/**\n * Basic fullscreen canvas\n */\nfunction initCanvas(canvas) {\n  var context = canvas.getContext('2d');\n\n  var width = window.innerWidth;\n  var height = window.innerHeight;\n  var ratio = window.devicePixelRatio;\n\n  canvas.width = width * ratio;\n  canvas.height = height * ratio;\n  canvas.style.width = width + 'px';\n  canvas.style.height = height + 'px';\n  context.scale(ratio, ratio);\n  return context;\n}\n\nfunction clearCanvas(context, _ref) {\n  var width = _ref.width;\n  var height = _ref.height;\n\n  context.clearRect(0, 0, width, height);\n};//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2FudmFzL2luZGV4LmpzPzcyMjgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCYXNpYyBmdWxsc2NyZWVuIGNhbnZhc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdENhbnZhcyAoY2FudmFzKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGNvbnN0IHJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cbiAgY2FudmFzLndpZHRoID0gd2lkdGggKiByYXRpbztcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHJhdGlvO1xuICBjYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICBjb250ZXh0LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYW52YXMgKGNvbnRleHQsIHsgd2lkdGgsIGhlaWdodCB9KSB7XG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jYW52YXMvaW5kZXguanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7QUFlQTs7OztBQWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createCircle = createCircle;\nexports.createEllipse = createEllipse;\nexports.createDot = createDot;\nexports.createCrosshair = createCrosshair;\nexports.creatQuadraticCurve = creatQuadraticCurve;\nfunction createCircle(context, _ref) {\n  var x = _ref.x;\n  var y = _ref.y;\n  var radius = _ref.radius;\n  var color = _ref.color;\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.7)';\n  context.arc(x, y, radius, 0, 2 * Math.PI, false);\n  context.stroke();\n}\n\nfunction createEllipse(context, _ref2) {\n  var x = _ref2.x;\n  var y = _ref2.y;\n  var radiusX = _ref2.radiusX;\n  var radiusY = _ref2.radiusY;\n  var color = _ref2.color;\n  var angle = _ref2.angle;\n  var stroke = _ref2.stroke;\n\n  var diff = radiusX - radiusY;\n  angle = angle || 0;\n\n  // console.log(diff, angle);\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.lineWidth = stroke;\n  context.ellipse(x + diff / 2, y, radiusX, radiusY, angle, 0, 2 * Math.PI); //\n  context.stroke();\n}\n\nfunction createDot(context, _ref3) {\n  var x = _ref3.x;\n  var y = _ref3.y;\n  var radius = _ref3.radius;\n  var color = _ref3.color;\n\n  context.beginPath();\n  context.fillStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.arc(x, y, radius, 0, 2 * Math.PI, false);\n  context.fill();\n}\n\nfunction createCrosshair(context, _ref4) {\n  var x = _ref4.x;\n  var y = _ref4.y;\n  var size = _ref4.size;\n  var color = _ref4.color;\n\n  var l = size ? size / 2 : 20;\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.moveTo(x - l, y);\n  context.lineTo(x + l, y);\n  context.moveTo(x, y - l);\n  context.lineTo(x, y + l);\n  context.stroke();\n}\n\nfunction creatQuadraticCurve(context, _ref5) {\n  var x1 = _ref5.x1;\n  var y1 = _ref5.y1;\n  var x2 = _ref5.x2;\n  var y2 = _ref5.y2;\n  var xc = _ref5.xc;\n  var yc = _ref5.yc;\n  var color = _ref5.color;\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.moveTo(x1, y1);\n  context.quadraticCurveTo(xc, yc, x2, y2);\n  context.stroke();\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2FudmFzL3ByaW1pdGl2ZXMuanM/MDEzYiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2lyY2xlIChjb250ZXh0LCB7eCwgeSwgcmFkaXVzLCBjb2xvcn0pIHtcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuNyknO1xuICBjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGxpcHNlIChjb250ZXh0LCB7eCwgeSwgcmFkaXVzWCwgcmFkaXVzWSwgY29sb3IsIGFuZ2xlLCBzdHJva2V9KSB7XG4gIGNvbnN0IGRpZmYgPSByYWRpdXNYIC0gcmFkaXVzWTtcbiAgYW5nbGUgPSBhbmdsZSB8fCAwO1xuXG4gIC8vIGNvbnNvbGUubG9nKGRpZmYsIGFuZ2xlKTtcblxuICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3IgfHwgJ2hzbGEoMCwgMTAwJSwgMTAwJSwgMC4zKSc7XG4gIGNvbnRleHQubGluZVdpZHRoID0gc3Ryb2tlO1xuICBjb250ZXh0LmVsbGlwc2UoeCArIChkaWZmIC8gMiksIHksIHJhZGl1c1gsIHJhZGl1c1ksIGFuZ2xlLCAwLCAyICogTWF0aC5QSSk7IC8vXG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEb3QgKGNvbnRleHQsIHt4LCB5LCByYWRpdXMsIGNvbG9yfSkge1xuICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuMyknO1xuICBjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gIGNvbnRleHQuZmlsbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ3Jvc3NoYWlyIChjb250ZXh0LCB7eCwgeSwgc2l6ZSwgY29sb3J9KSB7XG4gIGxldCBsID0gc2l6ZSA/IHNpemUgLyAyIDogMjA7XG5cbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuMyknO1xuICBjb250ZXh0Lm1vdmVUbyh4IC0gbCwgeSk7XG4gIGNvbnRleHQubGluZVRvKHggKyBsLCB5KTtcbiAgY29udGV4dC5tb3ZlVG8oeCwgeSAtIGwpO1xuICBjb250ZXh0LmxpbmVUbyh4LCB5ICsgbCk7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdFF1YWRyYXRpY0N1cnZlIChjb250ZXh0LCB7eDEsIHkxLCB4MiwgeTIsIHhjLCB5YywgY29sb3J9KSB7XG4gIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvciB8fCAnaHNsYSgwLCAxMDAlLCAxMDAlLCAwLjMpJztcbiAgY29udGV4dC5tb3ZlVG8oeDEsIHkxKTtcbiAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHhjLCB5YywgeDIsIHkyKTtcbiAgY29udGV4dC5zdHJva2UoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jYW52YXMvcHJpbWl0aXZlcy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQU9BO0FBYUE7QUFPQTtBQVlBO0FBdkNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.seededRandom = seededRandom;\n// A seeded random number generator.\nfunction seededRandom(seed) {\n  var m = Math.pow(2, 32);\n  var a = 1664525;\n  var c = 1013904223;\n  var x = seed;\n\n  return function () {\n    x = (a * x + c) % m;\n    return x / m;\n  };\n};//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdXRpbHMvbWF0aC5qcz85ZjI4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIEEgc2VlZGVkIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuZXhwb3J0IGZ1bmN0aW9uIHNlZWRlZFJhbmRvbSAoc2VlZCkge1xuICBsZXQgbSA9IE1hdGgucG93KDIsIDMyKTtcbiAgbGV0IGEgPSAxNjY0NTI1O1xuICBsZXQgYyA9IDEwMTM5MDQyMjM7XG4gIGxldCB4ID0gc2VlZDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgeCA9IChhICogeCArIGMpICUgbTtcbiAgICByZXR1cm4geCAvIG07XG4gIH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3V0aWxzL21hdGguanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.times = times;\nfunction times(num, fn) {\n  for (var i = 0; i < num; i++) {\n    fn(i);\n  }\n};//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdXRpbHMvaW5kZXguanM/ODk2OCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gdGltZXMgKG51bSwgZm4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgIGZuKGkpO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3V0aWxzL2luZGV4LmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createChildren = createChildren;\nexports.createNode = createNode;\nfunction createChildren(particles, options) {\n  var parent = options.parent;\n  var width = options.width / 2;\n  var height = options.height / 2;\n\n  var ne = createNode(particles, { parent: parent, x: options.x, y: options.y, width: width, height: height });\n  var nw = createNode(particles, { parent: parent, x: options.x + height, y: options.y, width: width, height: height });\n  var sw = createNode(particles, { parent: parent, x: options.x + height, y: options.y + height, width: width, height: height });\n  var se = createNode(particles, { parent: parent, x: options.x, y: options.y + height, width: width, height: height });\n\n  return [ne, nw, sw, se];\n}\n\nfunction createNode(particles, options) {\n  var x = options.x;\n  var y = options.y;\n  var width = options.width;\n  var height = options.height;\n  var parent = options.parent;\n\n\n  particles = particles.filter(function (p) {\n    return p.x > x && p.x < x + width && p.y > y && p.y < y + height;\n  });\n\n  var node = {\n    // parent: parent,\n    particle: null,\n    x: x,\n    y: y,\n    width: width,\n    height: height,\n    // depth: options.depth,\n    mass: particles.reduce(function (t, p) {\n      t += p.mass;return t;\n    }, 0)\n  };\n\n  if (node.mass) {\n    var xm = particles.reduce(function (memo, p) {\n      memo += p.x;return memo;\n    }, 0);\n    var ym = particles.reduce(function (memo, p) {\n      memo += p.y;return memo;\n    }, 0);\n    node.center = {\n      x: xm / node.mass,\n      y: ym / node.mass\n    };\n  }\n\n  if (particles.length < 2) {\n    node.particle = particles[0];\n    return node;\n  }\n\n  // options.parent = node;\n  node.children = createChildren(particles, options);\n  return node;\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdHJlZS9pbmRleC5qcz9kYzcyIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaGlsZHJlbiAocGFydGljbGVzLCBvcHRpb25zKSB7XG4gIGxldCBwYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgbGV0IHdpZHRoID0gb3B0aW9ucy53aWR0aCAvIDI7XG4gIGxldCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCAvIDI7XG5cbiAgbGV0IG5lID0gY3JlYXRlTm9kZShwYXJ0aWNsZXMsIHsgcGFyZW50LCB4OiBvcHRpb25zLngsIHk6IG9wdGlvbnMueSwgd2lkdGgsIGhlaWdodCB9KTtcbiAgbGV0IG53ID0gY3JlYXRlTm9kZShwYXJ0aWNsZXMsIHsgcGFyZW50LCB4OiBvcHRpb25zLnggKyBoZWlnaHQsIHk6IG9wdGlvbnMueSwgd2lkdGgsIGhlaWdodCB9KTtcbiAgbGV0IHN3ID0gY3JlYXRlTm9kZShwYXJ0aWNsZXMsIHsgcGFyZW50LCB4OiBvcHRpb25zLnggKyBoZWlnaHQsIHk6IG9wdGlvbnMueSArIGhlaWdodCwgd2lkdGgsIGhlaWdodCB9KTtcbiAgbGV0IHNlID0gY3JlYXRlTm9kZShwYXJ0aWNsZXMsIHsgcGFyZW50LCB4OiBvcHRpb25zLngsIHk6IG9wdGlvbnMueSArIGhlaWdodCwgd2lkdGgsIGhlaWdodCB9KTtcblxuICByZXR1cm4gW25lLCBudywgc3csIHNlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUgKHBhcnRpY2xlcywgb3B0aW9ucykge1xuICBsZXQgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBwYXJlbnQgfSA9IG9wdGlvbnM7XG5cbiAgcGFydGljbGVzID0gcGFydGljbGVzLmZpbHRlcigocCkgPT4ge1xuICAgIHJldHVybiAocC54ID4geCAmJiBwLnggPCB4ICsgd2lkdGgpICYmIChwLnkgPiB5ICYmIHAueSA8IHkgKyBoZWlnaHQpO1xuICB9KTtcblxuICBsZXQgbm9kZSA9ICB7XG4gICAgLy8gcGFyZW50OiBwYXJlbnQsXG4gICAgcGFydGljbGU6IG51bGwsXG4gICAgeDogeCxcbiAgICB5OiB5LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAvLyBkZXB0aDogb3B0aW9ucy5kZXB0aCxcbiAgICBtYXNzOiBwYXJ0aWNsZXMucmVkdWNlKCh0LCBwKSA9PiB7IHQgKz0gcC5tYXNzOyByZXR1cm4gdCB9LCAwKVxuICB9XG5cbiAgaWYgKG5vZGUubWFzcykge1xuICAgIGxldCB4bSA9IHBhcnRpY2xlcy5yZWR1Y2UoKG1lbW8sIHApID0+IHsgbWVtbyArPSBwLng7IHJldHVybiBtZW1vO30sIDApO1xuICAgIGxldCB5bSA9IHBhcnRpY2xlcy5yZWR1Y2UoKG1lbW8sIHApID0+IHsgbWVtbyArPSBwLnk7IHJldHVybiBtZW1vO30sIDApO1xuICAgIG5vZGUuY2VudGVyID0ge1xuICAgICAgeDogeG0gLyBub2RlLm1hc3MsXG4gICAgICB5OiB5bSAvIG5vZGUubWFzc1xuICAgIH07XG4gIH1cblxuXG4gIGlmIChwYXJ0aWNsZXMubGVuZ3RoIDwgMikge1xuICAgIG5vZGUucGFydGljbGUgPSBwYXJ0aWNsZXNbMF07XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvLyBvcHRpb25zLnBhcmVudCA9IG5vZGU7XG4gIG5vZGUuY2hpbGRyZW4gPSBjcmVhdGVDaGlsZHJlbiAocGFydGljbGVzLCBvcHRpb25zKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvdHJlZS9pbmRleC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQWFBO0FBYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createParticle = createParticle;\nexports.createParticles = createParticles;\n\nvar _index = __webpack_require__(5);\n\nfunction createParticle(random, _ref) {\n  var width = _ref.width;\n  var height = _ref.height;\n\n  var mass = random() * 1.72 + 0.43;\n  return {\n    x: random() * width,\n    y: random() * height,\n    mass: mass,\n    radius: mass\n  };\n}\n\nfunction createParticles(num, bounds, random) {\n  random = random; // || Math.random;\n\n  var particles = [];\n  (0, _index.times)(num, function (i) {\n    return particles.push(createParticle(random, bounds));\n  });\n\n  return particles;\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdHJlZS9wYXJ0aWNsZXMuanM/MGFiNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aW1lcyB9IGZyb20gJy4uL3V0aWxzL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcnRpY2xlIChyYW5kb20sIHt3aWR0aCwgaGVpZ2h0fSkge1xuICBsZXQgbWFzcyA9IChyYW5kb20oKSAqIDEuNzIpICsgMC40MztcbiAgcmV0dXJuIHtcbiAgICB4OiByYW5kb20oKSAqIHdpZHRoLFxuICAgIHk6IHJhbmRvbSgpICogaGVpZ2h0LFxuICAgIG1hc3M6IG1hc3MsXG4gICAgcmFkaXVzOiBtYXNzXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXJ0aWNsZXMgKG51bSwgYm91bmRzLCByYW5kb20pIHtcbiAgcmFuZG9tID0gcmFuZG9tOyAvLyB8fCBNYXRoLnJhbmRvbTtcblxuICBsZXQgcGFydGljbGVzID0gW107XG4gIHRpbWVzKG51bSwgKGkpID0+IHBhcnRpY2xlcy5wdXNoKGNyZWF0ZVBhcnRpY2xlKHJhbmRvbSwgYm91bmRzKSkpO1xuXG4gIHJldHVybiBwYXJ0aWNsZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvdHJlZS9wYXJ0aWNsZXMuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7QUFVQTtBQUNBO0FBYkE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);