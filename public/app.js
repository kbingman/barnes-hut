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
/******/ 	var hotCurrentHash = "e2beb43795877e91ab73"; // eslint-disable-line no-unused-vars
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

	eval("'use strict';\n\nvar _index = __webpack_require__(2);\n\nvar _primitives = __webpack_require__(3);\n\nvar _math = __webpack_require__(4);\n\nvar _tree = __webpack_require__(5);\n\nvar _particles = __webpack_require__(7);\n\nvar random = (0, _math.seededRandom)(12343);\nvar canvas = document.getElementById('canvas');\nvar context = (0, _index.initCanvas)(canvas);\nvar width = window.innerWidth;\nvar height = window.innerHeight;\n\nvar particles = (0, _particles.createParticles)(7, { width: width, height: height }, random);\n\nvar start = +new Date();\nparticles.forEach(function (p) {\n  return (0, _primitives.createDot)(context, { x: p.x, y: p.y, radius: p.radius, color: 'white' });\n});\nconsole.log(+new Date() - start);\n\nstart = +new Date();\nvar root = (0, _tree.createTree)(particles, { x: 0, y: 0, width: width, height: height });\nconsole.log(+new Date() - start);\nconsole.log(root);\n\nfunction drawNodes(node) {\n  (0, _primitives.createRectangle)(context, { x: node.x, y: node.y, width: node.width, height: node.height });\n  if (!node.children) {\n    return;\n  }\n\n  node.children.forEach(drawNodes);\n}\n\ndrawNodes(root);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwLmpzP2JkOWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdENhbnZhcyB9IGZyb20gJy4vY2FudmFzL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZURvdCwgY3JlYXRlUmVjdGFuZ2xlIH0gZnJvbSAnLi9jYW52YXMvcHJpbWl0aXZlcyc7XG5pbXBvcnQgeyBzZWVkZWRSYW5kb20gfSBmcm9tICcuL3V0aWxzL21hdGgnO1xuXG5pbXBvcnQgeyBjcmVhdGVOb2RlLCBjcmVhdGVUcmVlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IGNyZWF0ZVBhcnRpY2xlcyB9IGZyb20gJy4vcGFydGljbGVzJztcblxuY29uc3QgcmFuZG9tID0gc2VlZGVkUmFuZG9tKDEyMzQzKTtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNvbnN0IGNvbnRleHQgPSBpbml0Q2FudmFzKGNhbnZhcyk7XG5jb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG5sZXQgcGFydGljbGVzID0gY3JlYXRlUGFydGljbGVzKDcsIHsgd2lkdGgsIGhlaWdodCB9LCByYW5kb20pO1xuXG5sZXQgc3RhcnQgPSArbmV3IERhdGUoKTtcbnBhcnRpY2xlcy5mb3JFYWNoKHAgPT4gY3JlYXRlRG90KGNvbnRleHQsIHsgeDogcC54LCB5OiBwLnksIHJhZGl1czogcC5yYWRpdXMsIGNvbG9yOiAnd2hpdGUnIH0pKTtcbmNvbnNvbGUubG9nKCtuZXcgRGF0ZSgpIC0gc3RhcnQpO1xuXG5zdGFydCA9ICtuZXcgRGF0ZSgpO1xuY29uc3Qgcm9vdCA9IGNyZWF0ZVRyZWUocGFydGljbGVzLCB7IHg6IDAsIHk6IDAsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG5jb25zb2xlLmxvZygrbmV3IERhdGUoKSAtIHN0YXJ0KTtcbmNvbnNvbGUubG9nKHJvb3QpO1xuXG5mdW5jdGlvbiBkcmF3Tm9kZXMgKG5vZGUpIHtcbiAgY3JlYXRlUmVjdGFuZ2xlKGNvbnRleHQsIHt4OiBub2RlLngsIHk6IG5vZGUueSwgd2lkdGg6IG5vZGUud2lkdGgsIGhlaWdodDogbm9kZS5oZWlnaHR9KTtcbiAgaWYgKCFub2RlLmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBub2RlLmNoaWxkcmVuLmZvckVhY2goZHJhd05vZGVzKTtcbn1cblxuZHJhd05vZGVzKHJvb3QpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2FwcC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.initCanvas = initCanvas;\nexports.clearCanvas = clearCanvas;\n/**\n * Basic fullscreen canvas\n */\nfunction initCanvas(canvas) {\n  var context = canvas.getContext('2d');\n\n  var width = window.innerWidth;\n  var height = window.innerHeight;\n  var ratio = window.devicePixelRatio;\n\n  canvas.width = width * ratio;\n  canvas.height = height * ratio;\n  canvas.style.width = width + 'px';\n  canvas.style.height = height + 'px';\n  context.scale(ratio, ratio);\n  return context;\n}\n\nfunction clearCanvas(context, _ref) {\n  var width = _ref.width;\n  var height = _ref.height;\n\n  context.clearRect(0, 0, width, height);\n};//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2FudmFzL2luZGV4LmpzPzcyMjgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCYXNpYyBmdWxsc2NyZWVuIGNhbnZhc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdENhbnZhcyAoY2FudmFzKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGNvbnN0IHJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cbiAgY2FudmFzLndpZHRoID0gd2lkdGggKiByYXRpbztcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHJhdGlvO1xuICBjYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICBjb250ZXh0LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDYW52YXMgKGNvbnRleHQsIHsgd2lkdGgsIGhlaWdodCB9KSB7XG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jYW52YXMvaW5kZXguanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7QUFlQTs7OztBQWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createCircle = createCircle;\nexports.createRectangle = createRectangle;\nexports.createEllipse = createEllipse;\nexports.createDot = createDot;\nexports.createCrosshair = createCrosshair;\nexports.creatQuadraticCurve = creatQuadraticCurve;\nfunction createCircle(context, _ref) {\n  var x = _ref.x;\n  var y = _ref.y;\n  var radius = _ref.radius;\n  var color = _ref.color;\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.7)';\n  context.arc(x, y, radius, 0, 2 * Math.PI, false);\n  context.stroke();\n}\n\nfunction createRectangle(context, _ref2) {\n  var x = _ref2.x;\n  var y = _ref2.y;\n  var width = _ref2.width;\n  var height = _ref2.height;\n  var color = _ref2.color;\n\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.rect(x, y, width, height);\n  context.stroke();\n}\n\nfunction createEllipse(context, _ref3) {\n  var x = _ref3.x;\n  var y = _ref3.y;\n  var radiusX = _ref3.radiusX;\n  var radiusY = _ref3.radiusY;\n  var color = _ref3.color;\n  var angle = _ref3.angle;\n  var stroke = _ref3.stroke;\n\n  var diff = radiusX - radiusY;\n  angle = angle || 0;\n\n  // console.log(diff, angle);\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.lineWidth = stroke;\n  context.ellipse(x + diff / 2, y, radiusX, radiusY, angle, 0, 2 * Math.PI); //\n  context.stroke();\n}\n\nfunction createDot(context, _ref4) {\n  var x = _ref4.x;\n  var y = _ref4.y;\n  var radius = _ref4.radius;\n  var color = _ref4.color;\n\n  context.beginPath();\n  context.fillStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.arc(x, y, radius, 0, 2 * Math.PI, false);\n  context.fill();\n}\n\nfunction createCrosshair(context, _ref5) {\n  var x = _ref5.x;\n  var y = _ref5.y;\n  var size = _ref5.size;\n  var color = _ref5.color;\n\n  var l = size ? size / 2 : 20;\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.moveTo(x - l, y);\n  context.lineTo(x + l, y);\n  context.moveTo(x, y - l);\n  context.lineTo(x, y + l);\n  context.stroke();\n}\n\nfunction creatQuadraticCurve(context, _ref6) {\n  var x1 = _ref6.x1;\n  var y1 = _ref6.y1;\n  var x2 = _ref6.x2;\n  var y2 = _ref6.y2;\n  var xc = _ref6.xc;\n  var yc = _ref6.yc;\n  var color = _ref6.color;\n\n  context.beginPath();\n  context.strokeStyle = color || 'hsla(0, 100%, 100%, 0.3)';\n  context.moveTo(x1, y1);\n  context.quadraticCurveTo(xc, yc, x2, y2);\n  context.stroke();\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY2FudmFzL3ByaW1pdGl2ZXMuanM/MDEzYiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2lyY2xlIChjb250ZXh0LCB7eCwgeSwgcmFkaXVzLCBjb2xvcn0pIHtcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuNyknO1xuICBjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWN0YW5nbGUgKGNvbnRleHQsIHt4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcn0pIHtcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuMyknO1xuICBjb250ZXh0LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGxpcHNlIChjb250ZXh0LCB7eCwgeSwgcmFkaXVzWCwgcmFkaXVzWSwgY29sb3IsIGFuZ2xlLCBzdHJva2V9KSB7XG4gIGNvbnN0IGRpZmYgPSByYWRpdXNYIC0gcmFkaXVzWTtcbiAgYW5nbGUgPSBhbmdsZSB8fCAwO1xuXG4gIC8vIGNvbnNvbGUubG9nKGRpZmYsIGFuZ2xlKTtcblxuICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3IgfHwgJ2hzbGEoMCwgMTAwJSwgMTAwJSwgMC4zKSc7XG4gIGNvbnRleHQubGluZVdpZHRoID0gc3Ryb2tlO1xuICBjb250ZXh0LmVsbGlwc2UoeCArIChkaWZmIC8gMiksIHksIHJhZGl1c1gsIHJhZGl1c1ksIGFuZ2xlLCAwLCAyICogTWF0aC5QSSk7IC8vXG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEb3QgKGNvbnRleHQsIHt4LCB5LCByYWRpdXMsIGNvbG9yfSkge1xuICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuMyknO1xuICBjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gIGNvbnRleHQuZmlsbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ3Jvc3NoYWlyIChjb250ZXh0LCB7eCwgeSwgc2l6ZSwgY29sb3J9KSB7XG4gIGxldCBsID0gc2l6ZSA/IHNpemUgLyAyIDogMjA7XG5cbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdoc2xhKDAsIDEwMCUsIDEwMCUsIDAuMyknO1xuICBjb250ZXh0Lm1vdmVUbyh4IC0gbCwgeSk7XG4gIGNvbnRleHQubGluZVRvKHggKyBsLCB5KTtcbiAgY29udGV4dC5tb3ZlVG8oeCwgeSAtIGwpO1xuICBjb250ZXh0LmxpbmVUbyh4LCB5ICsgbCk7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdFF1YWRyYXRpY0N1cnZlIChjb250ZXh0LCB7eDEsIHkxLCB4MiwgeTIsIHhjLCB5YywgY29sb3J9KSB7XG4gIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvciB8fCAnaHNsYSgwLCAxMDAlLCAxMDAlLCAwLjMpJztcbiAgY29udGV4dC5tb3ZlVG8oeDEsIHkxKTtcbiAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHhjLCB5YywgeDIsIHkyKTtcbiAgY29udGV4dC5zdHJva2UoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jYW52YXMvcHJpbWl0aXZlcy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQU9BO0FBTUE7QUFhQTtBQU9BO0FBWUE7QUE3Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.seededRandom = seededRandom;\nexports.round = round;\nexports.sumOf = sumOf;\n// A seeded random number generator.\nfunction seededRandom(seed) {\n  var m = Math.pow(2, 32);\n  var a = 1664525;\n  var c = 1013904223;\n  var x = seed;\n\n  return function () {\n    x = (a * x + c) % m;\n    return x / m;\n  };\n};\n\nfunction round(num, places) {\n  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);\n}\n\nfunction sumOf(array, attr) {\n  return array.reduce(function (total, c) {\n    total += c[attr] || 0;\n    return total;\n  }, 0);\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdXRpbHMvbWF0aC5qcz85ZjI4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIEEgc2VlZGVkIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuZXhwb3J0IGZ1bmN0aW9uIHNlZWRlZFJhbmRvbSAoc2VlZCkge1xuICBsZXQgbSA9IE1hdGgucG93KDIsIDMyKTtcbiAgbGV0IGEgPSAxNjY0NTI1O1xuICBsZXQgYyA9IDEwMTM5MDQyMjM7XG4gIGxldCB4ID0gc2VlZDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgeCA9IChhICogeCArIGMpICUgbTtcbiAgICByZXR1cm4geCAvIG07XG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQgKG51bSwgcGxhY2VzKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKG51bSAqIE1hdGgucG93KDEwLCBwbGFjZXMpKSAvIE1hdGgucG93KDEwLCBwbGFjZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VtT2YgKGFycmF5LCBhdHRyKSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKHRvdGFsLCBjKSA9PiB7XG4gICAgdG90YWwgKz0gY1thdHRyXSB8fCAwO1xuICAgIHJldHVybiB0b3RhbDtcbiAgfSwgMCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvdXRpbHMvbWF0aC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTtBQVlBO0FBSUE7O0FBaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createTree = createTree;\n\nvar _index = __webpack_require__(6);\n\nvar _math = __webpack_require__(4);\n\n/**\n * @param {array} children\n * @returns {object} position - X and Y coords\n */\nvar findCenter = function findCenter(children) {\n  var m = (0, _math.sumOf)(children, 'mass');\n  if (m) {\n    var masses = children.reduce(function (m, c) {\n      m.x += c.x * c.mass || 0;\n      m.y += c.y * c.mass || 0;\n      return m;\n    }, { x: 0, y: 0 });\n\n    return { x: masses.x / m, y: masses.y / m };\n  }\n};\n\n/**\n * 1. No particle exists, add it and be done with it\n * 2. Particle exists. Create children, move both new and old particle, move on to next\n * 3. Children exist. Find correct child and repeat this procedure\n */\nvar updateNode = function updateNode(particle, node) {\n  if (!(0, _index.contains)(particle, node)) {\n    return;\n  }\n  node.mass += particle.mass;\n\n  if (!node.particle && !node.children) {\n    node.particle = particle;\n    node.mass = particle.mass;\n    node.center = { x: particle.x, y: particle.y };\n  } else if (!node.children && node.particle) {\n    console.log('exists', node.particle.x, node.particle.y);\n    node.children = divideNode([particle, node.particle], node);\n    node.center = findCenter(node.children);\n    console.log(node.children);\n\n    delete node.particle;\n  } else if (node.children && node.children.length) {\n    var child = node.children.find(function (n) {\n      return (0, _index.contains)(particle, n);\n    });\n\n    updateNode(particle, child);\n    node.center = findCenter(node.children);\n  }\n};\n\n/**\n * @param {array} particles\n * @param {object} options\n * @returns {array} nodes\n */\nvar divideNode = function divideNode(particles, options, nodes) {\n  var width = options.width / 2;\n  var height = options.height / 2;\n\n  var children = [{ x: options.x, y: options.y, width: width, height: height }, { x: options.x + width, y: options.y, width: width, height: height }, { x: options.x, y: options.y + height, width: width, height: height }, { x: options.x + width, y: options.y + height, width: width, height: height }];\n  return children.map(function (node) {\n\n    var particle = particles.find(function (p) {\n      return (0, _index.contains)(p, node);\n    });\n    if (particle) {\n      updateNode(particle, node);\n    }\n    return node;\n  });\n};\n\n/**\n * @param {array} particles\n * @param {object} root\n * @returns {object} root node\n */\nfunction createTree(particles, root) {\n  var nodes = [root];\n  particles.forEach(function (p) {\n    console.log('particle', p.x, p.y);\n    updateNode(p, root);\n  });\n  console.log();\n\n  return root;\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdHJlZS5qcz80YWYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnRhaW5zIH0gZnJvbSAnLi91dGlscy9pbmRleCc7XG5pbXBvcnQgeyBzdW1PZiB9IGZyb20gJy4vdXRpbHMvbWF0aCc7XG5cbi8qKlxuICogQHBhcmFtIHthcnJheX0gY2hpbGRyZW5cbiAqIEByZXR1cm5zIHtvYmplY3R9IHBvc2l0aW9uIC0gWCBhbmQgWSBjb29yZHNcbiAqL1xuY29uc3QgZmluZENlbnRlciA9IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuICBsZXQgbSA9IHN1bU9mKGNoaWxkcmVuLCAnbWFzcycpO1xuICBpZiAobSkge1xuICAgIGxldCBtYXNzZXMgPSBjaGlsZHJlbi5yZWR1Y2UoKG0sIGMpID0+IHtcbiAgICAgIG0ueCArPSBjLnggKiBjLm1hc3MgfHwgMDtcbiAgICAgIG0ueSArPSBjLnkgKiBjLm1hc3MgfHwgMDtcbiAgICAgIHJldHVybiBtO1xuICAgIH0sIHsgeDogMCwgeTogMCB9KTtcblxuICAgIHJldHVybiB7IHg6IG1hc3Nlcy54IC8gbSwgeTogbWFzc2VzLnkgLyBtIH07XG4gIH1cbn07XG5cbi8qKlxuICogMS4gTm8gcGFydGljbGUgZXhpc3RzLCBhZGQgaXQgYW5kIGJlIGRvbmUgd2l0aCBpdFxuICogMi4gUGFydGljbGUgZXhpc3RzLiBDcmVhdGUgY2hpbGRyZW4sIG1vdmUgYm90aCBuZXcgYW5kIG9sZCBwYXJ0aWNsZSwgbW92ZSBvbiB0byBuZXh0XG4gKiAzLiBDaGlsZHJlbiBleGlzdC4gRmluZCBjb3JyZWN0IGNoaWxkIGFuZCByZXBlYXQgdGhpcyBwcm9jZWR1cmVcbiAqL1xuY29uc3QgdXBkYXRlTm9kZSA9IGZ1bmN0aW9uIChwYXJ0aWNsZSwgbm9kZSkge1xuICBpZiAoIWNvbnRhaW5zKHBhcnRpY2xlLCBub2RlKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBub2RlLm1hc3MgKz0gcGFydGljbGUubWFzcztcblxuICBpZiAoIW5vZGUucGFydGljbGUgJiYgIW5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLnBhcnRpY2xlID0gcGFydGljbGU7XG4gICAgbm9kZS5tYXNzID0gcGFydGljbGUubWFzcztcbiAgICBub2RlLmNlbnRlciA9IHsgeDogcGFydGljbGUueCwgeTogcGFydGljbGUueSB9O1xuICB9XG4gIGVsc2UgaWYgKCFub2RlLmNoaWxkcmVuICYmIG5vZGUucGFydGljbGUpIHtcbiAgICBjb25zb2xlLmxvZygnZXhpc3RzJywgbm9kZS5wYXJ0aWNsZS54LCBub2RlLnBhcnRpY2xlLnkpO1xuICAgIG5vZGUuY2hpbGRyZW4gPSBkaXZpZGVOb2RlKFtwYXJ0aWNsZSwgbm9kZS5wYXJ0aWNsZV0sIG5vZGUpO1xuICAgIG5vZGUuY2VudGVyID0gZmluZENlbnRlcihub2RlLmNoaWxkcmVuKTtcbiAgICBjb25zb2xlLmxvZyhub2RlLmNoaWxkcmVuKTtcblxuICAgIGRlbGV0ZSBub2RlLnBhcnRpY2xlO1xuICB9XG4gIGVsc2UgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkcmVuLmZpbmQoKG4pID0+IGNvbnRhaW5zKHBhcnRpY2xlLCBuKSk7XG5cbiAgICB1cGRhdGVOb2RlKHBhcnRpY2xlLCBjaGlsZCk7XG4gICAgbm9kZS5jZW50ZXIgPSBmaW5kQ2VudGVyKG5vZGUuY2hpbGRyZW4pO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHthcnJheX0gcGFydGljbGVzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHJldHVybnMge2FycmF5fSBub2Rlc1xuICovXG5jb25zdCBkaXZpZGVOb2RlID0gZnVuY3Rpb24gKHBhcnRpY2xlcywgb3B0aW9ucywgbm9kZXMpIHtcbiAgbGV0IHdpZHRoID0gb3B0aW9ucy53aWR0aCAvIDI7XG4gIGxldCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCAvIDI7XG5cbiAgbGV0IGNoaWxkcmVuID0gW1xuICAgIHsgeDogb3B0aW9ucy54LCB5OiBvcHRpb25zLnksIHdpZHRoLCBoZWlnaHQgfSxcbiAgICB7IHg6IG9wdGlvbnMueCArIHdpZHRoLCB5OiBvcHRpb25zLnksIHdpZHRoLCBoZWlnaHQgfSxcbiAgICB7IHg6IG9wdGlvbnMueCwgeTogb3B0aW9ucy55ICsgaGVpZ2h0LCB3aWR0aCwgaGVpZ2h0IH0sXG4gICAgeyB4OiBvcHRpb25zLnggKyB3aWR0aCwgeTogb3B0aW9ucy55ICsgaGVpZ2h0LCB3aWR0aCwgaGVpZ2h0IH1cbiAgXTtcbiAgcmV0dXJuIGNoaWxkcmVuLm1hcCgobm9kZSkgPT4ge1xuXG4gICAgbGV0IHBhcnRpY2xlID0gcGFydGljbGVzLmZpbmQoKHApID0+IGNvbnRhaW5zKHAsIG5vZGUpKTtcbiAgICBpZiAocGFydGljbGUpIHtcbiAgICAgIHVwZGF0ZU5vZGUocGFydGljbGUsIG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHthcnJheX0gcGFydGljbGVzXG4gKiBAcGFyYW0ge29iamVjdH0gcm9vdFxuICogQHJldHVybnMge29iamVjdH0gcm9vdCBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmVlIChwYXJ0aWNsZXMsIHJvb3QpIHtcbiAgbGV0IG5vZGVzID0gW3Jvb3RdO1xuICBwYXJ0aWNsZXMuZm9yRWFjaChwID0+IHtcbiAgICBjb25zb2xlLmxvZygncGFydGljbGUnLCBwLngsIHAueSlcbiAgICB1cGRhdGVOb2RlKHAsIHJvb3QpO1xuICB9KTtcbiAgY29uc29sZS5sb2coKTtcblxuICByZXR1cm4gcm9vdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy90cmVlLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQWtGQTtBQUNBO0FBbkZBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.times = times;\nexports.contains = contains;\nfunction times(num, fn) {\n  for (var i = 0; i < num; i++) {\n    fn(i);\n  }\n};\n\nfunction contains(pos, bounds) {\n  if (!bounds) {\n    return false;\n  }\n\n  var w = bounds.x + bounds.width;\n  var h = bounds.y + bounds.height;\n\n  return pos.x > bounds.x && pos.x < w && pos.y > bounds.y && pos.y < h;\n};//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvdXRpbHMvaW5kZXguanM/ODk2OCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gdGltZXMgKG51bSwgZm4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgIGZuKGkpO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMgKHBvcywgYm91bmRzKSB7XG4gIGlmICghYm91bmRzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IHcgPSBib3VuZHMueCArIGJvdW5kcy53aWR0aDtcbiAgbGV0IGggPSBib3VuZHMueSArIGJvdW5kcy5oZWlnaHQ7XG5cbiAgcmV0dXJuIChwb3MueCA+IGJvdW5kcy54ICYmIHBvcy54IDwgdykgJiYgKHBvcy55ID4gYm91bmRzLnkgJiYgcG9zLnkgPCBoKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvdXRpbHMvaW5kZXguanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFNQTtBQU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createParticle = createParticle;\nexports.createParticles = createParticles;\n\nvar _index = __webpack_require__(6);\n\nfunction createParticle(random, _ref) {\n  var width = _ref.width;\n  var height = _ref.height;\n\n  var mass = random() * 1.72 + 0.43;\n  return {\n    x: random() * width,\n    y: random() * height,\n    mass: mass,\n    radius: mass\n  };\n}\n\nfunction createParticles(num, bounds, random) {\n  random = random; // || Math.random;\n\n  var particles = [];\n  (0, _index.times)(num, function (i) {\n    return particles.push(createParticle(random, bounds));\n  });\n\n  return particles;\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvcGFydGljbGVzLmpzPzU0ZTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGltZXMgfSBmcm9tICcuL3V0aWxzL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcnRpY2xlIChyYW5kb20sIHt3aWR0aCwgaGVpZ2h0fSkge1xuICBsZXQgbWFzcyA9IChyYW5kb20oKSAqIDEuNzIpICsgMC40MztcbiAgcmV0dXJuIHtcbiAgICB4OiByYW5kb20oKSAqIHdpZHRoLFxuICAgIHk6IHJhbmRvbSgpICogaGVpZ2h0LFxuICAgIG1hc3M6IG1hc3MsXG4gICAgcmFkaXVzOiBtYXNzXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXJ0aWNsZXMgKG51bSwgYm91bmRzLCByYW5kb20pIHtcbiAgcmFuZG9tID0gcmFuZG9tOyAvLyB8fCBNYXRoLnJhbmRvbTtcblxuICBsZXQgcGFydGljbGVzID0gW107XG4gIHRpbWVzKG51bSwgKGkpID0+IHBhcnRpY2xlcy5wdXNoKGNyZWF0ZVBhcnRpY2xlKHJhbmRvbSwgYm91bmRzKSkpO1xuXG4gIHJldHVybiBwYXJ0aWNsZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvcGFydGljbGVzLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBO0FBVUE7QUFDQTtBQWJBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);