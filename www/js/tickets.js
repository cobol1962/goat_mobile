/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "hot-widget/hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "hot-widget/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9b52c52ae4de7c583659";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".main.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/array-contains/index.js":
/*!**********************************************!*\
  !*** ./node_modules/array-contains/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(arrays, array) {
  var hash = {};

  for(var key in arrays) {
    hash[arrays[key]] = key;
  }

  return hash.hasOwnProperty(array);
};


/***/ }),

/***/ "./node_modules/array-each/index.js":
/*!******************************************!*\
  !*** ./node_modules/array-each/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * array-each <https://github.com/jonschlinkert/array-each>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



/**
 * Loop over each item in an array and call the given function on every element.
 *
 * ```js
 * each(['a', 'b', 'c'], function(ele) {
 *   return ele + ele;
 * });
 * //=> ['aa', 'bb', 'cc']
 *
 * each(['a', 'b', 'c'], function(ele, i) {
 *   return i + ele;
 * });
 * //=> ['0a', '1b', '2c']
 * ```
 *
 * @name each
 * @alias forEach
 * @param {Array} `array`
 * @param {Function} `fn`
 * @param {Object} `thisArg` (optional) pass a `thisArg` to be used as the context in which to call the function.
 * @return {undefined}
 * @api public
 */

module.exports = function each(arr, cb, thisArg) {
  if (arr == null) return;

  var len = arr.length;
  var idx = -1;

  while (++idx < len) {
    var ele = arr[idx];
    if (cb.call(thisArg, ele, idx, arr) === false) {
      break;
    }
  }
};


/***/ }),

/***/ "./node_modules/array-slice/index.js":
/*!*******************************************!*\
  !*** ./node_modules/array-slice/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * array-slice <https://github.com/jonschlinkert/array-slice>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function slice(arr, start, end) {
  var len = arr.length;
  var range = [];

  start = idx(len, start);
  end = idx(len, end, len);

  while (start < end) {
    range.push(arr[start++]);
  }
  return range;
};

function idx(len, pos, end) {
  if (pos == null) {
    pos = end || 0;
  } else if (pos < 0) {
    pos = Math.max(len + pos, 0);
  } else {
    pos = Math.min(pos, len);
  }

  return pos;
}


/***/ }),

/***/ "./node_modules/data-attributes/index.js":
/*!***********************************************!*\
  !*** ./node_modules/data-attributes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(exports) {
  'use strict';

  function toUpperCase(string) {
    return string.toUpperCase();
  }

  function toLowerCase(string) {
    return string.toLowerCase();
  }

  // Shout out to MOUT: https://github.com/mout/mout
  function camelize(string) {
    return string
                .toString()
                .trim()
                .replace(/[\-_]/g, ' ')
                .replace(/\s[a-z]/g, toUpperCase)
                .replace(/\s+/g, '')
                .replace(/^[A-Z]/g, toLowerCase);
  }

  function dataAttributes(node) {
    var attributes = {};
    var matchDataAttribute = /^data\-/;
    var total = node.attributes.length;
    var isDataAttribute;
    var attribute;
    var name;
    var i = -1;

    while(++i < total) {
      attribute = node.attributes[i];
      name = attribute.name;
      isDataAttribute = matchDataAttribute.test(name);

      if(isDataAttribute) {
        name = name.replace(matchDataAttribute, '');
        name = camelize(name);

        attributes[name] = attribute.value;
      }
    }

    return attributes;
  }

  if(true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return dataAttributes; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})(this);


/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.5+7f2b526d
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves

    Synchronous example:

    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }

    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```

    Asynchronous example:

    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```

    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/fetch-jsonp/build/fetch-jsonp.js":
/*!*******************************************************!*\
  !*** ./node_modules/fetch-jsonp/build/fetch-jsonp.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/for-in/index.js":
/*!**************************************!*\
  !*** ./node_modules/for-in/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};


/***/ }),

/***/ "./node_modules/for-own/index.js":
/*!***************************************!*\
  !*** ./node_modules/for-own/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var forIn = __webpack_require__(/*! for-in */ "./node_modules/for-in/index.js");
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
};


/***/ }),

/***/ "./node_modules/insert-css/index.js":
/*!******************************************!*\
  !*** ./node_modules/insert-css/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),

/***/ "./node_modules/isobject/index.js":
/*!****************************************!*\
  !*** ./node_modules/isobject/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/object.defaults/immutable.js":
/*!***************************************************!*\
  !*** ./node_modules/object.defaults/immutable.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = __webpack_require__(/*! array-slice */ "./node_modules/array-slice/index.js");

var defaults = __webpack_require__(/*! ./mutable */ "./node_modules/object.defaults/mutable.js");

/**
 * Extends an empty object with properties of one or
 * more additional `objects`
 *
 * @name .defaults.immutable
 * @param  {Object} `objects`
 * @return {Object}
 * @api public
 */

module.exports = function immutableDefaults() {
  var args = slice(arguments);
  return defaults.apply(null, [{}].concat(args));
};


/***/ }),

/***/ "./node_modules/object.defaults/index.js":
/*!***********************************************!*\
  !*** ./node_modules/object.defaults/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * object.defaults <https://github.com/jonschlinkert/object.defaults>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = __webpack_require__(/*! ./mutable */ "./node_modules/object.defaults/mutable.js");
module.exports.immutable = __webpack_require__(/*! ./immutable */ "./node_modules/object.defaults/immutable.js");


/***/ }),

/***/ "./node_modules/object.defaults/mutable.js":
/*!*************************************************!*\
  !*** ./node_modules/object.defaults/mutable.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(/*! array-each */ "./node_modules/array-each/index.js");
var slice = __webpack_require__(/*! array-slice */ "./node_modules/array-slice/index.js");
var forOwn = __webpack_require__(/*! for-own */ "./node_modules/for-own/index.js");
var isObject = __webpack_require__(/*! isobject */ "./node_modules/isobject/index.js");

/**
 * Extends the `target` object with properties of one or
 * more additional `objects`
 *
 * @name .defaults
 * @param  {Object} `target` The target object. Pass an empty object to shallow clone.
 * @param  {Object} `objects`
 * @return {Object}
 * @api public
 */

module.exports = function defaults(target, objects) {
  if (target == null) {
    return {};
  }

  each(slice(arguments, 1), function(obj) {
    if (isObject(obj)) {
      forOwn(obj, function(val, key) {
        if (target[key] == null) {
          target[key] = val;
        }
      });
    }
  });

  return target;
};


/***/ }),

/***/ "./node_modules/object.pick/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object.pick/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * object.pick <https://github.com/jonschlinkert/object.pick>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */



var isObject = __webpack_require__(/*! isobject */ "./node_modules/isobject/index.js");

module.exports = function pick(obj, keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {};
  }

  var res = {};
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys];
    }
    return res;
  }

  var len = keys.length;
  var idx = -1;

  while (++idx < len) {
    var key = keys[idx];
    if (key in obj) {
      res[key] = obj[key];
    }
  }
  return res;
};


/***/ }),

/***/ "./node_modules/preact/dist/preact.mjs":
/*!*********************************************!*\
  !*** ./node_modules/preact/dist/preact.mjs ***!
  \*********************************************/
/*! exports provided: default, h, createElement, cloneElement, Component, render, rerender, options */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;

			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		if (!this.prevState) this.prevState = this.state;
		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);

//# sourceMappingURL=preact.mjs.map


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/assets/stylesheets/main.scss":
/*!******************************************!*\
  !*** ./src/assets/stylesheets/main.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bit-widget {\n  min-width: 250px;\n  padding-bottom: 10px; }\n  .bit-widget .bit-spacer {\n    height: 10px; }\n  .bit-widget .bit-no-dates-container {\n    border-top: 1px solid rgba(124, 124, 124, 0.25);\n    text-align: center;\n    margin: 0px 10px 0px 10px;\n    padding: 100px 0px 100px 0px; }\n    .bit-widget .bit-no-dates-container .bit-no-dates-title {\n      text-transform: uppercase;\n      font-size: 15px;\n      font-weight: bold;\n      margin-bottom: 5px;\n      line-height: 25px; }\n    .bit-widget .bit-no-dates-container .bit-track-button {\n      text-decoration: none;\n      display: inline-block;\n      line-height: 44px;\n      width: 284px;\n      margin: 20px 0 0 0;\n      text-transform: uppercase;\n      font-weight: bold; }\n  .bit-widget .bit-nav-bar-container {\n    padding: 0px 10px 0px 10px; }\n    .bit-widget .bit-nav-bar-container .bit-nav-bar {\n      display: flex;\n      float: none;\n      flex-direction: row;\n      align-items: flex-end;\n      padding: 0px 0 10px 0; }\n      .bit-widget .bit-nav-bar-container .bit-nav-bar .bit-logo-container {\n        margin: 0 0 0 auto; }\n  .bit-widget .bit-top-track-button {\n    display: block;\n    font-size: 16px;\n    font-weight: 700;\n    padding: 5px 40px  0 10px; }\n    .bit-widget .bit-top-track-button span {\n      text-decoration: underline; }\n  .bit-widget .bit-upcoming-events, .bit-widget .bit-past-events {\n    margin-bottom: 8px;\n    margin: 0px 10px 10px 10px; }\n  .bit-widget .bit-local-events-container {\n    margin: 0px 10px 0px 10px; }\n  .bit-widget .bit-upcoming-events-show-all-button, .bit-widget .bit-past-events-show-all-button, .bit-widget .bit-play-my-city-button {\n    font-size: 0.88em;\n    font-weight: bold;\n    line-height: 44px;\n    text-align: center;\n    cursor: pointer;\n    text-transform: uppercase;\n    margin: 0px 10px 0px 10px; }\n  .bit-widget .bit-upcoming-events-show-all-button, .bit-widget .bit-past-events-show-all-button {\n    background-color: transparent; }\n  .bit-widget .bit-play-my-city-button {\n    display: block; }\n  .bit-widget .bit-event-list-title {\n    font-weight: bold;\n    padding: 0px 12px 0 0;\n    display: inline-block;\n    font-size: 14px; }\n    .bit-widget .bit-event-list-title.bit-clickable {\n      text-decoration: underline;\n      cursor: pointer; }\n  .bit-widget .bit-event {\n    text-decoration: none;\n    padding: 17px 0;\n    line-height: 22px; }\n    .bit-widget .bit-event .bit-event-buttons {\n      display: flex;\n      flex-direction: column-reverse;\n      align-items: center;\n      justify-content: space-between;\n      margin: 10px 0 0 0; }\n    .bit-widget .bit-event .bit-details:first-child {\n      flex-grow: 1; }\n    .bit-widget .bit-event .bit-date {\n      font-weight: bold; }\n    .bit-widget .bit-event .bit-startTime-container {\n      display: inline-block;\n      margin-left: 4px; }\n      .bit-widget .bit-event .bit-startTime-container .bit-startTime {\n        font-weight: bold; }\n    .bit-widget .bit-event .bit-location {\n      font-weight: bold;\n      margin-top: 1px; }\n    .bit-widget .bit-event .bit-button {\n      text-align: center;\n      line-height: 44px;\n      font-weight: bold; }\n    .bit-widget .bit-event .bit-rsvp {\n      background-color: transparent;\n      font-size: 0.88em;\n      text-transform: uppercase; }\n    .bit-widget .bit-event .bit-rsvp-container {\n      flex-basis: 100%;\n      width: 100%;\n      margin-top: 5px; }\n    .bit-widget .bit-event .bit-offers-container {\n      flex-basis: 100%;\n      width: 100%; }\n    .bit-widget .bit-event .bit-offers {\n      position: relative;\n      cursor: pointer; }\n    .bit-widget .bit-event .bit-lineUp-container {\n      margin-top: 2px;\n      margin: 2px 0 3px 0; }\n      .bit-widget .bit-event .bit-lineUp-container .bit-lineUp-with {\n        margin-right: 4px; }\n      .bit-widget .bit-event .bit-lineUp-container .bit-lineUp {\n        font-size: 0.88em;\n        line-height: 17px; }\n    .bit-widget .bit-event .on-sale-date {\n      margin: 2px 0 0 0; }\n    .bit-widget .bit-event .bit-details a, .bit-widget .bit-event .bit-offers-menu a {\n      display: block;\n      text-decoration: none; }\n    .bit-widget .bit-event .bit-display-none {\n      display: none; }\n    .bit-widget .bit-event .bit-transparent {\n      opacity: 0; }\n    .bit-widget .bit-event .bit-offers-menu {\n      position: absolute;\n      border: solid 1px #cbcbcb;\n      box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.11);\n      top: 46px;\n      left: -1px;\n      z-index: 50;\n      background-color: white;\n      color: black;\n      transition: opacity 0.25s ease-out;\n      line-height: 48px;\n      width: 100%; }\n    .bit-widget .bit-event .bit-overlay {\n      position: fixed;\n      z-index: 30;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0; }\n    .bit-widget .bit-event .bit-offers-text {\n      text-transform: uppercase;\n      font-size: 0.88em;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n    .bit-widget .bit-event .bit-offer {\n      text-transform: uppercase;\n      font-size: 0.88em; }\n      .bit-widget .bit-event .bit-offer:hover {\n        background-color: rgba(81, 81, 81, 0.1); }\n  .bit-widget a {\n    text-decoration: none;\n    color: inherit;\n    box-shadow: none; }\n  .bit-widget .bit-logo-desktop {\n    display: none; }\n  .bit-widget .bit-logo {\n    position: relative; }\n  .bit-widget.bit-layout-logo-ipad .bit-logo-mobile {\n    display: none; }\n  .bit-widget.bit-layout-logo-ipad .bit-logo-desktop {\n    display: block; }\n  .bit-widget.bit-layout-ipad .bit-upcoming-events, .bit-widget.bit-layout-ipad .bit-past-events {\n    margin-bottom: 8px;\n    margin: 0px 10px 10px 10px; }\n  .bit-widget.bit-layout-ipad .bit-local-events-container {\n    margin: 0px 10px 0px 10px; }\n  .bit-widget.bit-layout-ipad .bit-event-list-title {\n    font-weight: bold;\n    padding: 0px 12px 0 0;\n    display: inline-block; }\n    .bit-widget.bit-layout-ipad .bit-event-list-title.bit-clickable {\n      text-decoration: underline;\n      cursor: pointer; }\n  .bit-widget.bit-layout-ipad .bit-event {\n    display: flex;\n    flex-direction: row;\n    text-decoration: none;\n    padding: 16px 10px; }\n    .bit-widget.bit-layout-ipad .bit-event .bit-details {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      justify-content: center; }\n    .bit-widget.bit-layout-ipad .bit-event .bit-event-buttons {\n      flex-direction: column-reverse;\n      margin: 0 0 0 15px; }\n    .bit-widget.bit-layout-ipad .bit-event .bit-button {\n      width: 150px; }\n    .bit-widget.bit-layout-ipad .bit-event .bit-rsvp-container {\n      flex-basis: auto;\n      margin: 4px 0 0 0; }\n    .bit-widget.bit-layout-ipad .bit-event .bit-offers-container {\n      flex-basis: auto; }\n    .bit-widget.bit-layout-ipad .bit-event .bit-offers {\n      flex-basis: auto;\n      margin-left: 0px;\n      margin-top: 0px; }\n  .bit-widget.bit-layout-desktop .bit-details {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center; }\n  .bit-widget.bit-layout-desktop .bit-event {\n    padding: 10px 6px;\n    display: flex;\n    flex-direction: row; }\n    .bit-widget.bit-layout-desktop .bit-event .bit-button {\n      width: 150px; }\n    .bit-widget.bit-layout-desktop .bit-event:hover {\n      padding: 10px 6px;\n      background-color: rgba(81, 81, 81, 0.1); }\n  .bit-widget.bit-layout-desktop .bit-offer:hover {\n    background-color: rgba(81, 81, 81, 0.1); }\n  .bit-widget.bit-layout-desktop .bit-date {\n    min-width: 95px;\n    margin: 0 15px 0 0; }\n  .bit-widget.bit-layout-desktop .bit-location {\n    margin: 0 14px 0 5px;\n    text-align: right;\n    font-weight: normal;\n    hyphens: auto; }\n  .bit-widget.bit-layout-desktop .bit-venue {\n    margin: 0 auto 0 0; }\n  .bit-widget.bit-layout-desktop .bit-rsvp-container {\n    padding: 0px;\n    margin-top: 0px; }\n  .bit-widget.bit-layout-desktop .bit-offers {\n    margin-left: 15px;\n    margin-top: 0px; }\n  .bit-widget img.bit-widget-loading {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n    height: 20px;\n    width: 20px; }\n  .bit-widget .google-pixel-iframe {\n    height: 1px;\n    width: 1px;\n    display: none; }\n"

/***/ }),

/***/ "./src/assets/svgs/bitFist.js":
/*!************************************!*\
  !*** ./src/assets/svgs/bitFist.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", {
    width: "23px",
    height: "20px",
    viewBox: "0 0 23 24",
    ariaLabelledby: "bit-imgTitle bit-imgDesc",
    role: "img"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("title", {
    id: "bit-imgTitle"
  }, "Bandsintown"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("desc", {
    id: "bit-imgDesc"
  }, "Bandsintown Fist Logo"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("g", {
    id: "Page-1",
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd",
    fillOpacity: "0.402400362"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
    d: "M17.709,0 L22.917,0 L22.917,12.343 L17.709,12.343 L17.709,0 Z M11.806,5.829 L17.014,5.829 L17.014,12.343 L11.806,12.343 L11.806,5.829 Z M5.903,5.829 L11.111,5.829 L11.111,12.343 L5.903,12.343 L5.903,5.829 Z M22.917,24 L0,24 L0,0 L5.208,0 L5.208,18.857 L17.708,18.857 L17.708,18.171 L5.904,18.171 L5.904,13.03 L22.918,13.03 L22.918,24 L22.917,24 Z",
    id: "Shape",
    fill: "#A9A9A9",
    fillRule: "nonzero"
  })));
});

/***/ }),

/***/ "./src/assets/svgs/bitLogo.js":
/*!************************************!*\
  !*** ./src/assets/svgs/bitLogo.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", {
    width: "144",
    height: "20",
    viewBox: "0 0 172 24",
    ariaLabelledby: "bit-logoTitle bit-logoDesc",
    role: "img"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("title", {
    id: "bit-logoTitle"
  }, "Bandsintown"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("desc", {
    id: "bit-logoDesc"
  }, "Bandsintown Fist Logo"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("defs", null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
    id: "a",
    d: "M9.858 12.143c0-2.233-1.44-3.806-3.651-3.806S2.556 9.91 2.556 12.143s1.44 3.806 3.65 3.806c2.212 0 3.652-1.573 3.652-3.806zm-7.277 4.198h-.052v1.758H0V0h2.529v7.912h.052c.748-1.293 2.065-2.146 4.026-2.146 3.148 0 5.807 2.378 5.807 6.36s-2.659 6.36-5.807 6.36c-1.961 0-3.278-.853-4.026-2.145zm11.658-4.198c0-3.971 2.658-6.343 5.807-6.343 1.962 0 3.278.85 4.026 2.14h.052V6.186h2.529V18.1h-2.529v-1.754h-.052c-.748 1.29-2.064 2.14-4.026 2.14-3.149 0-5.807-2.372-5.807-6.343zm10.223 0c0-2.233-1.44-3.806-3.65-3.806-2.212 0-3.652 1.573-3.652 3.806s1.44 3.806 3.651 3.806 3.651-1.573 3.651-3.806zm16.43-1.357v7.338h-2.525v-6.898c0-2.041-1.031-2.894-2.733-2.894-1.854 0-3.17 1.11-3.17 4.082v5.71H29.94V6.187h2.526v1.809h.051c.774-1.37 2.062-2.196 3.892-2.196 2.551 0 4.484 1.369 4.484 4.986zm2.556 1.34c0-3.982 2.658-6.36 5.807-6.36 1.961 0 3.277.853 4.026 2.146h.052V0h2.529v18.099h-2.53V16.34h-.05c-.75 1.292-2.066 2.145-4.027 2.145-3.149 0-5.807-2.378-5.807-6.36zm10.223.017c0-2.233-1.44-3.806-3.651-3.806-2.212 0-3.651 1.573-3.651 3.806s1.44 3.806 3.65 3.806c2.212 0 3.652-1.573 3.652-3.806zm4.381 5.08l1.135-2.243c1.11.644 2.374 1.134 3.792 1.134 1.213 0 1.858-.36 1.858-1.108 0-.49-.258-.852-1.264-1.342l-2.167-1.057c-1.806-.85-2.502-2.063-2.502-3.429 0-2.192 1.625-3.378 4.23-3.378 1.367 0 2.864.36 4.127.928L66.23 8.92c-.903-.387-2.013-.774-3.173-.774-1.11 0-1.47.361-1.47.903 0 .567.335.928 1.367 1.418l2.218 1.057c1.548.722 2.373 1.754 2.373 3.352 0 2.424-1.857 3.61-4.643 3.61-1.703 0-3.482-.464-4.85-1.263zm12.049.9h2.556V6.164H70.1v11.96zm16.795-7.337v7.338H84.37v-6.898c0-2.041-1.03-2.894-2.731-2.894-1.856 0-3.171 1.11-3.171 4.082v5.71h-2.525V6.187h2.525v1.809h.052c.773-1.37 2.062-2.196 3.892-2.196 2.551 0 4.484 1.369 4.484 4.986zm6.383-2.44v6.227c0 .85.354 1.235 1.215 1.235h.607v2.316h-1.139c-2.05 0-3.164-1.106-3.164-3.062V8.346h-2.076V6.21h2.076V1.45h2.48v4.76h2.38v2.136h-2.38zm16.619 3.797c0 3.662-2.805 6.343-6.572 6.343s-6.572-2.681-6.572-6.343S99.559 5.8 103.326 5.8s6.572 2.681 6.572 6.343zm-10.223 0c0 2.309 1.57 3.806 3.834 3.806 2.264 0 3.833-1.497 3.833-3.806s-1.569-3.806-3.833-3.806c-2.265 0-3.834 1.497-3.834 3.806zm29.209-5.98l-3.98 11.96h-2.311l-2.824-8.569-2.85 8.57h-2.311l-3.98-11.962h2.773l2.388 8.622 2.748-8.622h2.438l2.748 8.622 2.388-8.622h2.773zm13.143 4.623v7.338h-2.525v-6.898c0-2.041-1.031-2.894-2.732-2.894-1.856 0-3.17 1.11-3.17 4.082v5.71h-2.526V6.187h2.526v1.809h.051c.774-1.37 2.062-2.196 3.892-2.196 2.552 0 4.484 1.369 4.484 4.986zm-68.64-8.974c0 1.001-.817 1.813-1.825 1.813a1.82 1.82 0 0 1-1.826-1.813c0-1 .817-1.812 1.826-1.812 1.008 0 1.825.811 1.825 1.812z"
  })), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("g", {
    fill: "none",
    fillRule: "evenodd",
    opacity: "0.402400362"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("g", {
    transform: "translate(29.522 3.243)"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("mask", {
    id: "b",
    fill: "#fff"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("use", {
    xlinkHref: "#a"
  })), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
    fill: "#A9A9A9",
    d: "M-.013 18.506H142.04V-.02H-.013z",
    mask: "url(#b)"
  })), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("path", {
    fill: "#A9A9A9",
    d: "M17.709 0h5.208v12.343h-5.208V0zm-5.903 5.829h5.208v6.514h-5.208V5.829zm-5.903 0h5.208v6.514H5.903V5.829zM22.917 24H0V0h5.208v18.857h12.5v-.686H5.904V13.03h17.014V24z"
  })));
});

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Widget */ "./src/components/Widget.js");
/* harmony import */ var _lib_breakPointsHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/breakPointsHandlers */ "./src/lib/breakPointsHandlers.js");
/* harmony import */ var _lib_fetchData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/fetchData */ "./src/lib/fetchData.js");
/* harmony import */ var _lib_getUserLocation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/getUserLocation */ "./src/lib/getUserLocation.js");
/* harmony import */ var _lib_handleJsonLd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/handleJsonLd */ "./src/lib/handleJsonLd.js");
/* harmony import */ var _lib_handleJsonLd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_handleJsonLd__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }







var decorator = Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ../behaviors/decorate */ "./src/behaviors/decorate.js"));

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      rawData: {},
      data: null,
      responsiveLayout: "",
      responsiveLogoLayout: "",
      isLoading: true,
      showingPastEvents: false,
      pastEventsDataHasBeenFetched: false
    };
    _this.handleBreakpoints = _this.handleBreakpoints.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fetchPastEventsData = _this.fetchPastEventsData.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePastEventsClick = _this.handlePastEventsClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpcomingEventsClick = _this.handleUpcomingEventsClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getUserLocation = _this.getUserLocation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var options = this.props.options;
      var displayLocalDates = options.widgetOptions.displayLocalDates;
      this.handleBreakpoints();
      window.addEventListener("resize", this.handleBreakpoints);
      Promise.all([Object(_lib_fetchData__WEBPACK_IMPORTED_MODULE_3__["fetchData"])(options.widgetOptions), decorator]).then(function (results) {
        var _results = _slicedToArray(results, 2),
            response = _results[0],
            decorateModule = _results[1];

        var decorate = decorateModule.default;
        var rawData = _this2.state.rawData;
        var data = decorate(_objectSpread({}, rawData, response), options);

        _this2.setState({
          rawData: _objectSpread({}, rawData, response),
          data: data,
          isLoading: false
        });

        _lib_handleJsonLd__WEBPACK_IMPORTED_MODULE_5___default()(data.jsonLd);
      }).catch(function (error) {
        console.log(error);

        _this2.setState({
          isLoading: false,
          error: error
        });
      });
      if (displayLocalDates) this.getUserLocation();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleBreakpoints);
    }
  }, {
    key: "getUserLocation",
    value: function getUserLocation() {
      var _this3 = this;

      var options = this.props.options;
      Promise.all([Object(_lib_getUserLocation__WEBPACK_IMPORTED_MODULE_4__["default"])(), decorator]).then(function (results) {
        var _results2 = _slicedToArray(results, 2),
            response = _results2[0],
            decorateModule = _results2[1];

        var decorate = decorateModule.default;
        var _this3$state = _this3.state,
            rawData = _this3$state.rawData,
            data = _this3$state.data;
        var _response$coords = response.coords,
            latitude = _response$coords.latitude,
            longitude = _response$coords.longitude;
        var userLocation = {
          latitude: latitude,
          longitude: longitude
        };

        _this3.setState({
          rawData: _objectSpread({}, rawData, {
            userLocation: userLocation
          }),
          data: data && decorate(_objectSpread({}, rawData, {
            userLocation: userLocation
          }), options)
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "fetchPastEventsData",
    value: function fetchPastEventsData() {
      var _this4 = this;

      var options = this.props.options;
      this.setState({
        isLoading: true
      });
      Promise.all([Object(_lib_fetchData__WEBPACK_IMPORTED_MODULE_3__["fetchPastEventsData"])(options.widgetOptions), decorator]).then(function (results) {
        var _results3 = _slicedToArray(results, 2),
            pastEvents = _results3[0],
            decorateModule = _results3[1];

        var decorate = decorateModule.default;
        var rawData = _this4.state.rawData;

        _this4.setState({
          rawData: _objectSpread({}, rawData, {
            pastEvents: pastEvents
          }),
          data: decorate(_objectSpread({}, rawData, {
            pastEvents: pastEvents
          }), options),
          isLoading: false,
          showingPastEvents: true,
          pastEventsDataHasBeenFetched: true
        });
      });
    }
  }, {
    key: "handlePastEventsClick",
    value: function handlePastEventsClick() {
      var pastEventsDataHasBeenFetched = this.state.pastEventsDataHasBeenFetched;

      if (!pastEventsDataHasBeenFetched) {
        this.fetchPastEventsData();
      } else {
        this.setState({
          showingPastEvents: true
        });
      }
    }
  }, {
    key: "handleUpcomingEventsClick",
    value: function handleUpcomingEventsClick() {
      this.setState({
        showingPastEvents: false
      });
    }
  }, {
    key: "handleBreakpoints",
    value: function handleBreakpoints() {
      var options = this.props.options;
      var _options$widgetOption = options.widgetOptions,
          displayDetails = _options$widgetOption.displayDetails,
          displayLineup = _options$widgetOption.displayLineup;
      var width = this.widgetDiv.clientWidth;
      this.setState({
        responsiveLayout: displayDetails || displayLineup ? Object(_lib_breakPointsHandlers__WEBPACK_IMPORTED_MODULE_2__["calculateDetailedViewBreakPoints"])(width) : Object(_lib_breakPointsHandlers__WEBPACK_IMPORTED_MODULE_2__["calculateLayoutBreakPoints"])(width),
        responsiveLogoLayout: Object(_lib_breakPointsHandlers__WEBPACK_IMPORTED_MODULE_2__["calculateLogoBreakPoints"])(width)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          data = _this$state.data,
          responsiveLayout = _this$state.responsiveLayout,
          responsiveLogoLayout = _this$state.responsiveLogoLayout,
          isLoading = _this$state.isLoading,
          showingPastEvents = _this$state.showingPastEvents,
          error = _this$state.error;

      var propsForWidget = _objectSpread({
        error: error,
        data: data,
        responsiveLayout: responsiveLayout,
        responsiveLogoLayout: responsiveLogoLayout,
        isLoading: isLoading,
        showingPastEvents: showingPastEvents
      }, this.props);

      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        ref: function ref(widgetDiv) {
          return _this5.widgetDiv = widgetDiv;
        }
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_Widget__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, propsForWidget, {
        handlePastEventsClick: this.handlePastEventsClick,
        handleUpcomingEventsClick: this.handleUpcomingEventsClick
      })));
    }
  }]);

  return App;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/Widget.js":
/*!**********************************!*\
  !*** ./src/components/Widget.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _widget_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget/Loading */ "./src/components/widget/Loading.js");
/* harmony import */ var _widget_EventsContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget/EventsContainer */ "./src/components/widget/EventsContainer.js");
/* harmony import */ var _widget_NavigationBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget/NavigationBar */ "./src/components/widget/NavigationBar.js");
/* harmony import */ var _widget_TrackButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widget/TrackButton */ "./src/components/widget/TrackButton.js");
/* harmony import */ var _widget_LocalEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widget/LocalEvents */ "./src/components/widget/LocalEvents.js");
/* harmony import */ var _widget_ListenUnit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widget/ListenUnit */ "./src/components/widget/ListenUnit.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var data = props.data,
      responsiveLayout = props.responsiveLayout,
      responsiveLogoLayout = props.responsiveLogoLayout,
      options = props.options,
      isLoading = props.isLoading,
      showingPastEvents = props.showingPastEvents,
      handlePastEventsClick = props.handlePastEventsClick,
      handleUpcomingEventsClick = props.handleUpcomingEventsClick,
      error = props.error;
  if (error) return null;
  if (!data) return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-widget"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null));
  var navigationBar = data.navigationBar,
      eventsContainer = data.eventsContainer,
      trackButton = data.trackButton,
      localEvents = data.localEvents,
      listenUnit = data.listenUnit;
  var _options$widgetOption = options.widgetOptions,
      displayLocalDates = _options$widgetOption.displayLocalDates,
      displayTrackButton = _options$widgetOption.displayTrackButton;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-widget ".concat(responsiveLayout, " ").concat(responsiveLogoLayout)
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_ListenUnit__WEBPACK_IMPORTED_MODULE_6__["default"], listenUnit), displayLocalDates && localEvents && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_LocalEvents__WEBPACK_IMPORTED_MODULE_5__["default"], localEvents), displayTrackButton && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_TrackButton__WEBPACK_IMPORTED_MODULE_4__["default"], trackButton), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_NavigationBar__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, navigationBar, {
    showingPastEvents: showingPastEvents,
    handlePastEventsClick: handlePastEventsClick,
    handleUpcomingEventsClick: handleUpcomingEventsClick
  })), isLoading ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_Loading__WEBPACK_IMPORTED_MODULE_1__["default"], null) : Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_widget_EventsContainer__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, eventsContainer, {
    showingPastEvents: showingPastEvents
  })));
});

/***/ }),

/***/ "./src/components/widget/EventsContainer.js":
/*!**************************************************!*\
  !*** ./src/components/widget/EventsContainer.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _eventsContainer_UpcomingEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventsContainer/UpcomingEvents */ "./src/components/widget/eventsContainer/UpcomingEvents.js");
/* harmony import */ var _eventsContainer_PastEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventsContainer/PastEvents */ "./src/components/widget/eventsContainer/PastEvents.js");
/* harmony import */ var _eventsContainer_NoUpcomingEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventsContainer/NoUpcomingEvents */ "./src/components/widget/eventsContainer/NoUpcomingEvents.js");




/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var upcomingEvents = props.upcomingEvents,
      noUpcomingEvents = props.noUpcomingEvents,
      pastEvents = props.pastEvents,
      showingPastEvents = props.showingPastEvents,
      displayNoUpcomingEvents = props.displayNoUpcomingEvents,
      iframeSrc = props.iframeSrc;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-event-lists"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-events-container"
  }, showingPastEvents ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_eventsContainer_PastEvents__WEBPACK_IMPORTED_MODULE_2__["default"], pastEvents) : displayNoUpcomingEvents ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_eventsContainer_NoUpcomingEvents__WEBPACK_IMPORTED_MODULE_3__["default"], noUpcomingEvents) : Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_eventsContainer_UpcomingEvents__WEBPACK_IMPORTED_MODULE_1__["default"], upcomingEvents), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("iframe", {
    src: iframeSrc,
    className: "google-pixel-iframe"
  })));
});

/***/ }),

/***/ "./src/components/widget/ListenUnit.js":
/*!*********************************************!*\
  !*** ./src/components/widget/ListenUnit.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return props.display ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    style: {
      textAlign: 'center',
      width: '100%'
    }
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("iframe", {
    style: {
      border: '0px transparent none',
      width: '100%',
      maxWidth: '417px',
      height: '60'
    },
    allowTransparency: true,
    src: props.url
  })) : null;
});

/***/ }),

/***/ "./src/components/widget/Loading.js":
/*!******************************************!*\
  !*** ./src/components/widget/Loading.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
    className: "bit-widget-loading",
    alt: "",
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSc1MHB4JyBoZWlnaHQ9JzUwcHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLXNwaW4iPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MCA1MCkiPjxnIHRyYW5zZm9ybT0icm90YXRlKDApIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiM4YThhOGEiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwcyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMHMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1KSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjOGE4YThhIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC4xMnMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuMTJzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg5MCkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iIzhhOGE4YSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuMjVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjI1cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMTM1KSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjOGE4YThhIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC4zN3MiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuMzdzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgxODApIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiM4YThhOGEiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgyMjUpIHRyYW5zbGF0ZSgzNCAwKSI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiM4YThhOGEiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjEiIGJlZ2luPSIwLjYycyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InNjYWxlIiBmcm9tPSIxLjUiIHRvPSIxIiBiZWdpbj0iMC42MnMiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDI3MCkgdHJhbnNsYXRlKDM0IDApIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iOCIgZmlsbD0iIzhhOGE4YSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMSIgYmVnaW49IjAuNzVzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0ic2NhbGUiIGZyb209IjEuNSIgdG89IjEiIGJlZ2luPSIwLjc1cyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzE1KSB0cmFuc2xhdGUoMzQgMCkiPjxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjOGE4YThhIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBmcm9tPSIxIiB0bz0iMC4xIiBiZWdpbj0iMC44N3MiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJzY2FsZSIgZnJvbT0iMS41IiB0bz0iMSIgYmVnaW49IjAuODdzIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvY2lyY2xlPjwvZz48L2c+PC9zdmc+"
  });
});

/***/ }),

/***/ "./src/components/widget/LocalEvents.js":
/*!**********************************************!*\
  !*** ./src/components/widget/LocalEvents.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _eventsContainer_upcomingEvents_UpcomingEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventsContainer/upcomingEvents/UpcomingEvent */ "./src/components/widget/eventsContainer/upcomingEvents/UpcomingEvent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




var LocalEvents =
/*#__PURE__*/
function (_Component) {
  _inherits(LocalEvents, _Component);

  function LocalEvents(props) {
    var _this;

    _classCallCheck(this, LocalEvents);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalEvents).call(this, props));
    var tooManyEvents = props.tooManyEvents;
    _this.state = {
      showingAllEvents: !tooManyEvents
    };
    _this.showAllEvents = _this.showAllEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(LocalEvents, [{
    key: "showAllEvents",
    value: function showAllEvents() {
      var showingAllEvents = this.state.showingAllEvents;

      if (!showingAllEvents) {
        this.setState({
          showingAllEvents: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var showingAllEvents = this.state.showingAllEvents;
      var _this$props = this.props,
          events = _this$props.events,
          tooManyEvents = _this$props.tooManyEvents,
          showAllDatesText = _this$props.showAllDatesText,
          displayLimit = _this$props.displayLimit,
          title = _this$props.title;
      if (events.length === 0) return null;
      var eventsList = events.map(function (event) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_eventsContainer_upcomingEvents_UpcomingEvent__WEBPACK_IMPORTED_MODULE_1__["default"], event);
      });
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-local-events-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-event-list-title"
      }, title), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-local-events"
      }, showingAllEvents ? eventsList : eventsList.slice(0, displayLimit)), tooManyEvents && !showingAllEvents && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-upcoming-events-show-all-button",
        onClick: this.showAllEvents
      }, showAllDatesText), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-spacer"
      }));
    }
  }]);

  return LocalEvents;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (LocalEvents);

/***/ }),

/***/ "./src/components/widget/NavigationBar.js":
/*!************************************************!*\
  !*** ./src/components/widget/NavigationBar.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _assets_svgs_bitFist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/svgs/bitFist */ "./src/assets/svgs/bitFist.js");
/* harmony import */ var _assets_svgs_bitLogo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/svgs/bitLogo */ "./src/assets/svgs/bitLogo.js");



/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var artistUrl = props.artistUrl,
      handlePastEventsClick = props.handlePastEventsClick,
      handleUpcomingEventsClick = props.handleUpcomingEventsClick,
      displayPastDates = props.displayPastDates,
      upcomingDatesText = props.upcomingDatesText,
      pastDatesText = props.pastDatesText,
      showingPastEvents = props.showingPastEvents,
      displayLogo = props.displayLogo,
      linkTarget = props.linkTarget;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-nav-bar-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-nav-bar"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-event-list-title bit-show-upcoming ".concat(showingPastEvents ? "bit-clickable" : ""),
    onClick: handleUpcomingEventsClick
  }, upcomingDatesText), displayPastDates && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-event-list-title bit-show-past ".concat(!showingPastEvents ? "bit-clickable" : ""),
    onClick: handlePastEventsClick
  }, pastDatesText), displayLogo && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-logo-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-logo"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    href: artistUrl,
    target: linkTarget,
    className: "bit-logo-link"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-logo-desktop"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_assets_svgs_bitLogo__WEBPACK_IMPORTED_MODULE_2__["default"], null)), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-logo-mobile"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_assets_svgs_bitFist__WEBPACK_IMPORTED_MODULE_1__["default"], null)))))));
});

/***/ }),

/***/ "./src/components/widget/TrackButton.js":
/*!**********************************************!*\
  !*** ./src/components/widget/TrackButton.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var trackUrl = props.trackUrl,
      trackDescription = props.trackDescription,
      linkTarget = props.linkTarget;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    className: "bit-top-track-button",
    href: trackUrl,
    dangerouslySetInnerHTML: {
      __html: trackDescription
    },
    target: linkTarget
  });
});

/***/ }),

/***/ "./src/components/widget/eventsContainer/NoUpcomingEvents.js":
/*!*******************************************************************!*\
  !*** ./src/components/widget/eventsContainer/NoUpcomingEvents.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var noUpcomingTourDatesText = props.noUpcomingTourDatesText,
      trackArtistDescription = props.trackArtistDescription,
      trackArtistUrl = props.trackArtistUrl,
      trackText = props.trackText;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-no-dates-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-no-dates-title"
  }, noUpcomingTourDatesText), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    dangerouslySetInnerHTML: {
      __html: trackArtistDescription
    }
  }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    className: "bit-button bit-track-button bit-offers",
    href: trackArtistUrl
  }, trackText))));
});

/***/ }),

/***/ "./src/components/widget/eventsContainer/PastEvents.js":
/*!*************************************************************!*\
  !*** ./src/components/widget/eventsContainer/PastEvents.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _pastEvents_PastEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pastEvents/PastEvent */ "./src/components/widget/eventsContainer/pastEvents/PastEvent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




var PastEvents =
/*#__PURE__*/
function (_Component) {
  _inherits(PastEvents, _Component);

  function PastEvents(props) {
    var _this;

    _classCallCheck(this, PastEvents);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PastEvents).call(this, props));
    var tooManyEvents = props.tooManyEvents;
    _this.state = {
      showingAllEvents: !tooManyEvents
    };
    _this.showAllEvents = _this.showAllEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PastEvents, [{
    key: "showAllEvents",
    value: function showAllEvents() {
      var showingAllEvents = this.state.showingAllEvents;

      if (!showingAllEvents) {
        this.setState({
          showingAllEvents: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var showingAllEvents = this.state.showingAllEvents;
      var _this$props = this.props,
          pastEvents = _this$props.pastEvents,
          tooManyEvents = _this$props.tooManyEvents,
          showAllDatesText = _this$props.showAllDatesText,
          displayLimit = _this$props.displayLimit;
      var eventsList = pastEvents.map(function (event) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_pastEvents_PastEvent__WEBPACK_IMPORTED_MODULE_1__["default"], event);
      });
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-upcoming-events-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-past-events"
      }, showingAllEvents ? eventsList : eventsList.slice(0, displayLimit)), tooManyEvents && !showingAllEvents && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-past-events-show-all-button",
        onClick: this.showAllEvents
      }, showAllDatesText));
    }
  }]);

  return PastEvents;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (PastEvents);

/***/ }),

/***/ "./src/components/widget/eventsContainer/UpcomingEvents.js":
/*!*****************************************************************!*\
  !*** ./src/components/widget/eventsContainer/UpcomingEvents.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _upcomingEvents_UpcomingEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upcomingEvents/UpcomingEvent */ "./src/components/widget/eventsContainer/upcomingEvents/UpcomingEvent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




var UpcomingEvents =
/*#__PURE__*/
function (_Component) {
  _inherits(UpcomingEvents, _Component);

  function UpcomingEvents(props) {
    var _this;

    _classCallCheck(this, UpcomingEvents);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpcomingEvents).call(this, props));
    var tooManyEvents = props.tooManyEvents;
    _this.state = {
      showingAllEvents: !tooManyEvents
    };
    _this.showAllEvents = _this.showAllEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(UpcomingEvents, [{
    key: "showAllEvents",
    value: function showAllEvents() {
      var showingAllEvents = this.state.showingAllEvents;

      if (!showingAllEvents) {
        this.setState({
          showingAllEvents: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var showingAllEvents = this.state.showingAllEvents;
      var _this$props = this.props,
          events = _this$props.events,
          tooManyEvents = _this$props.tooManyEvents,
          showAllDatesText = _this$props.showAllDatesText,
          displayLimit = _this$props.displayLimit,
          playMyCityText = _this$props.playMyCityText,
          playMyCityUrl = _this$props.playMyCityUrl,
          linkTarget = _this$props.linkTarget,
          displayPlayMyCity = _this$props.displayPlayMyCity;
      var eventsList = events.map(function (event) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_upcomingEvents_UpcomingEvent__WEBPACK_IMPORTED_MODULE_1__["default"], event);
      });
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-upcoming-events-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-upcoming-events"
      }, showingAllEvents ? eventsList : eventsList.slice(0, displayLimit)), tooManyEvents && !showingAllEvents && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-upcoming-events-show-all-button",
        onClick: this.showAllEvents
      }, showAllDatesText), displayPlayMyCity && showingAllEvents && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
        className: "bit-play-my-city-button",
        href: playMyCityUrl,
        target: linkTarget
      }, playMyCityText));
    }
  }]);

  return UpcomingEvents;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (UpcomingEvents);

/***/ }),

/***/ "./src/components/widget/eventsContainer/pastEvents/PastEvent.js":
/*!***********************************************************************!*\
  !*** ./src/components/widget/eventsContainer/pastEvents/PastEvent.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var lineUp = props.lineUp,
      description = props.description,
      onSaleDate = props.onSaleDate,
      date = props.date,
      venue = props.venue,
      location = props.location,
      withText = props.withText,
      rsvp = props.rsvp,
      rsvpUrl = props.rsvpUrl,
      linkTarget = props.linkTarget,
      displayLineup = props.displayLineup,
      eventUrl = props.eventUrl;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-event"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    className: "bit-details",
    href: eventUrl,
    target: linkTarget
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-date"
  }, date), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-venue"
  }, venue), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-location"
  }, location), displayLineup && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-lineUp-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-lineUp-with"
  }, withText), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-lineUp"
  }, lineUp)), description && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-description"
  }, description), onSaleDate && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "on-sale-date"
  }, onSaleDate)), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-details bit-event-buttons"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-rsvp-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    className: "bit-rsvp bit-button",
    href: rsvpUrl,
    target: linkTarget
  }, rsvp))));
});

/***/ }),

/***/ "./src/components/widget/eventsContainer/upcomingEvents/EventCTAs.js":
/*!***************************************************************************!*\
  !*** ./src/components/widget/eventsContainer/upcomingEvents/EventCTAs.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _MultipleTicketButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MultipleTicketButton */ "./src/components/widget/eventsContainer/upcomingEvents/MultipleTicketButton.js");



var TicketButton = function TicketButton(_ref) {
  var linkTarget = _ref.linkTarget,
      defaultTicketUrl = _ref.defaultTicketUrl,
      offersText = _ref.offersText,
      isVirtualEvent = _ref.isVirtualEvent;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-offers-container".concat(isVirtualEvent ? " bit-single-cta" : "")
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    className: "bit-offers bit-button",
    rel: "nofollow",
    target: linkTarget,
    href: defaultTicketUrl,
    "aria-label": offersText
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-offers-text"
  }, offersText)));
};

var Offers = function Offers(props) {
  var linkTarget = props.linkTarget,
      defaultTicketUrl = props.defaultTicketUrl,
      offersText = props.offersText,
      isLive = props.isLive,
      isVirtualEvent = props.isVirtualEvent,
      offers = props.offers;
  var showLink = isLive || !isVirtualEvent;

  if (showLink) {
    return offers.length > 1 ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_MultipleTicketButton__WEBPACK_IMPORTED_MODULE_1__["default"], {
      offers: offers,
      offersText: offersText,
      linkTarget: linkTarget
    }) : Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(TicketButton, {
      linkTarget: linkTarget,
      defaultTicketUrl: defaultTicketUrl,
      offersText: offersText,
      isVirtualEvent: true
    });
  }

  return null;
};

var Rsvp = function Rsvp(props) {
  var isLive = props.isLive,
      isVirtualEvent = props.isVirtualEvent,
      rsvpUrl = props.rsvpUrl,
      linkTarget = props.linkTarget,
      rsvpText = props.rsvpText;
  var showRSVP = !isLive || !isVirtualEvent;

  if (showRSVP) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: "bit-rsvp-container".concat(isVirtualEvent ? " bit-single-cta" : "")
    }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
      className: "bit-rsvp bit-button",
      href: rsvpUrl,
      target: linkTarget,
      "aria-label": rsvpText
    }, rsvpText));
  }

  return null;
};

var EventCTAs = function EventCTAs(props) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-details bit-event-buttons"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(Rsvp, props), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(Offers, props));
};

/* harmony default export */ __webpack_exports__["default"] = (EventCTAs);

/***/ }),

/***/ "./src/components/widget/eventsContainer/upcomingEvents/MultipleTicketButton.js":
/*!**************************************************************************************!*\
  !*** ./src/components/widget/eventsContainer/upcomingEvents/MultipleTicketButton.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



var MultipleTicketButton =
/*#__PURE__*/
function (_Component) {
  _inherits(MultipleTicketButton, _Component);

  function MultipleTicketButton(props) {
    var _this;

    _classCallCheck(this, MultipleTicketButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultipleTicketButton).call(this, props));
    _this.state = {
      displayTickets: false,
      transparencyClass: "bit-transparent",
      displayClass: "bit-display-none"
    };
    _this.toggleDisplayTickets = _this.toggleDisplayTickets.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(MultipleTicketButton, [{
    key: "toggleDisplayTickets",
    value: function toggleDisplayTickets(event) {
      var _this2 = this;

      event.stopPropagation();
      var displayTickets = this.state.displayTickets;

      if (!displayTickets) {
        this.setState({
          displayTickets: !this.state.displayTickets,
          displayClass: ""
        }); // To animate appearance of an element, we must first let the element
        // display property change and then change opacity properties
        // setTimeout is necessary for the opacity to transition in this case

        setTimeout(function () {
          _this2.setState({
            transparencyClass: ""
          });
        }, 20);
      } else {
        this.setState({
          displayTickets: !this.state.displayTickets,
          displayClass: "bit-display-none",
          transparencyClass: "bit-transparent"
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          transparencyClass = _this$state.transparencyClass,
          displayClass = _this$state.displayClass;
      var _this$props = this.props,
          offersText = _this$props.offersText,
          offers = _this$props.offers,
          linkTarget = _this$props.linkTarget;
      var ticketsList = offers.map(function (offer) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
          className: "bit-offer",
          rel: "nofollow",
          href: offer.url,
          target: linkTarget,
          "aria-label": offer.type
        }, offer.type);
      });
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-offers-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-offers bit-button",
        onClick: this.toggleDisplayTickets
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
        className: "bit-offers-text"
      }, offersText), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-overlay ".concat(displayClass),
        onClick: this.toggleDisplayTickets
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "bit-offers-menu bit-button ".concat(transparencyClass, " ").concat(displayClass)
      }, ticketsList)));
    }
  }]);

  return MultipleTicketButton;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (MultipleTicketButton);

/***/ }),

/***/ "./src/components/widget/eventsContainer/upcomingEvents/UpcomingEvent.js":
/*!*******************************************************************************!*\
  !*** ./src/components/widget/eventsContainer/upcomingEvents/UpcomingEvent.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _EventCTAs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventCTAs */ "./src/components/widget/eventsContainer/upcomingEvents/EventCTAs.js");


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var lineUp = props.lineUp,
      description = props.description,
      onSaleDate = props.onSaleDate,
      date = props.date,
      startTime = props.startTime,
      venue = props.venue,
      location = props.location,
      withText = props.withText,
      linkTarget = props.linkTarget,
      displayLineup = props.displayLineup,
      eventUrl = props.eventUrl,
      displayStartTime = props.displayStartTime,
      ctaData = props.ctaData;
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-event"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
    className: "bit-details",
    href: eventUrl,
    target: linkTarget
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-date"
  }, date), displayStartTime && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-startTime-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", null, " @ "), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-startTime"
  }, startTime))), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-venue"
  }, venue), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-location"
  }, location), displayLineup && lineUp && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-lineUp-container"
  }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-lineUp-with"
  }, withText), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
    className: "bit-lineUp"
  }, lineUp)), description && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "bit-description"
  }, description), onSaleDate && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
    className: "on-sale-date"
  }, onSaleDate)), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_EventCTAs__WEBPACK_IMPORTED_MODULE_1__["default"], ctaData));
});

/***/ }),

/***/ "./src/config/default_options.js":
/*!***************************************!*\
  !*** ./src/config/default_options.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  autoStyle: true,
  displayLocalDates: false,
  displayPastDates: false,
  displayLogo: true,
  displayLineup: false,
  displayDetails: false,
  displayTrackButton: true,
  displayPlayMyCity: true,
  displayStartTime: false
};

/***/ }),

/***/ "./src/config/default_style_options.js":
/*!*********************************************!*\
  !*** ./src/config/default_style_options.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "fontSize": "16px",
  "font": "'helvetica', 'arial', sans-serif",
  "textColor": "#000000",
  "linkColor": "#000000",
  "linkTextColor": "white",
  "backgroundColor": "transparent",
  "separatorColor": "rgba(124,124,124,0.25)",
  "widgetWidth": "100%"
};

/***/ }),

/***/ "./src/config/widget_options.js":
/*!**************************************!*\
  !*** ./src/config/widget_options.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  widgetOptions: ["artistName", "displayLimit", "autoStyle", "divId", "facebookPageId", "displayLocalDates", "displayPastDates", "displayLogo", "appId", "affilCode", "language", "displayLineup", "displayDetails", "displayTrackButton", "displayPlayMyCity", "displayStartTime"],
  styleOptions: ["textColor", "linkColor", "backgroundColor", "separatorColor", "widgetWidth", "linkTextColor", "font"]
};

/***/ }),

/***/ "./src/i18n/de.json":
/*!**************************!*\
  !*** ./src/i18n/de.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, RSVP, I Was There, On Sale, Notify Me, <span>Track</span> to get concert and tour updates., Free, Play My City, Ask to play in your city, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"Lokale Daten\",\"Past Dates\":\"Alte Daten\",\"Upcoming Dates\":\"ZukÃ¼nftige Daten\",\"Tickets\":\"Karten\",\"Presale\":\"Vorverkauf\",\"Merch\":\"Verkauf\",\"VIP\":\"VIP\",\"Sold Out\":\"Ausverkauft\",\"More Info\":\"Weitere Infos\",\"Show All Dates\":\"Alle Termine\",\"Going\":\"Ausgehen\",\"Interested\":\"Interessiert\",\"with\":\"mit\",\"Tickets & More\":\"Tickets und mehr\",\"No Upcoming Tour Dates\":\"Keine ZukÃ¼nftige Daten\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>Folgen</b> um zukÃ¼nftige Konzerte in deiner Region zu finden.\",\"Track\":\"Folgen\",\"RSVP\":\"RSVP\",\"I Was There\":\"Ich war da\",\"On Sale\":\"Im Angebot\",\"Notify Me\":\"Alarmiere mich\",\"<span>Track</span> to get concert and tour updates.\":\"<span>Folgen</span> um zukÃ¼nftige Konzerte in deiner Region zu finden.\",\"Free\":\"Kostenlos\",\"Play My City\":\"Spiel in meiner Stadt\",\"Ask to play in your city\":\"Bitten Sie, in Ihrer Stadt zu spielen\",\"\":\"\"}");

/***/ }),

/***/ "./src/i18n/en.json":
/*!**************************!*\
  !*** ./src/i18n/en.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, RSVP, I Was There, On Sale, Notify Me, <span>Track</span> to get concert and tour updates., Free, Play My City, Ask to play in your city, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"Local Dates\",\"Past Dates\":\"Past Dates\",\"Upcoming Dates\":\"Upcoming Dates\",\"Tickets\":\"Tickets\",\"Presale\":\"Presale\",\"Merch\":\"Merch\",\"VIP\":\"VIP\",\"Sold Out\":\"Sold Out\",\"More Info\":\"More Info\",\"Show All Dates\":\"Show All Dates\",\"Going\":\"Going\",\"Interested\":\"Interested\",\"with\":\"with\",\"Tickets & More\":\"Tickets & More\",\"No Upcoming Tour Dates\":\"No Upcoming Tour Dates\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>Track</b> to get notified about upcoming shows in your area.\",\"Track\":\"Track\",\"RSVP\":\"RSVP\",\"I Was There\":\"I Was There\",\"On Sale\":\"On Sale\",\"Notify Me\":\"Notify Me\",\"<span>Track</span> to get concert and tour updates.\":\"<span>Track</span> to get concert and tour updates.\",\"Free\":\"Free\",\"Play My City\":\"Play My City\",\"Ask to play in your city\":\"Ask to play in your city\",\"\":\"\"}");

/***/ }),

/***/ "./src/i18n/es.json":
/*!**************************!*\
  !*** ./src/i18n/es.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, RSVP, I Was There, On Sale, Notify Me, <span>Track</span> to get concert and tour updates., Free, Play My City, Ask to play in your city, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"Fechas Locales\",\"Past Dates\":\"Fechas Pasadas\",\"Upcoming Dates\":\"Fechas PrÃ³ximas\",\"Tickets\":\"Entradas\",\"Presale\":\"Preventa\",\"Merch\":\"MercancÃ­a\",\"VIP\":\"VIP\",\"Sold Out\":\"Agotado\",\"More Info\":\"MÃ¡s Info\",\"Show All Dates\":\"Mostrar todas las fechas\",\"Going\":\"Acudiendo\",\"Interested\":\"Interesado\",\"with\":\"con\",\"Tickets & More\":\"Entradas y mÃ¡s\",\"No Upcoming Tour Dates\":\"No hay fechas de giras prÃ³ximas\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>Seguir</b> para obtener notificaciones sobre fechas prÃ³ximas en tu Ã¡rea.\",\"Track\":\"Seguir\",\"RSVP\":\"RSVP\",\"I Was There\":\"Estuve allÃ­\",\"On Sale\":\"A la venta\",\"Notify Me\":\"NotifÃ­came\",\"<span>Track</span> to get concert and tour updates.\":\"<span>Seguir</span> para obtener notificaciones de conciertos.\",\"Free\":\"Gratis\",\"Play My City\":\"Actuad en mi ciudad\",\"Ask to play in your city\":\"Pide a que actÃºe en tu ciudad\",\"\":\"\"}");

/***/ }),

/***/ "./src/i18n/fr.json":
/*!**************************!*\
  !*** ./src/i18n/fr.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, RSVP, I Was There, On Sale, Notify Me, <span>Track</span> to get concert and tour updates., Free, Play My City, Ask to play in your city, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"Dates Locales\",\"Past Dates\":\"Anciennes Dates\",\"Upcoming Dates\":\"Prochaines Dates\",\"Tickets\":\"Billets\",\"Presale\":\"Avant-Vente\",\"Merch\":\"Goodies\",\"VIP\":\"VIP\",\"Sold Out\":\"Ã‰puisÃ©\",\"More Info\":\"Plus d'info\",\"Show All Dates\":\"Afficher toutes les Dates\",\"Going\":\"J'y vais\",\"Interested\":\"IntÃ©ressÃ©\",\"with\":\"avec\",\"Tickets & More\":\"Billets & Autre\",\"No Upcoming Tour Dates\":\"Pas de dates Ã  venir\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>Suivre</b> pour recevoir les dates des prochains concerts dans votre rÃ©gion.\",\"Track\":\"Suivre\",\"RSVP\":\"RSVP\",\"I Was There\":\"J'y Ã©tais\",\"On Sale\":\"En vente\",\"Notify Me\":\"Me prÃ©venir\",\"<span>Track</span> to get concert and tour updates.\":\"<span>Suivre</span> pour recevoir news et info concerts .\",\"Free\":\"Gratuit\",\"Play My City\":\"Jouer dans ma ville\",\"Ask to play in your city\":\"Viens jouer dans ma ville\",\"\":\"\"}");

/***/ }),

/***/ "./src/i18n/index.js":
/*!***************************!*\
  !*** ./src/i18n/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var en = __webpack_require__(/*! ./en.json */ "./src/i18n/en.json");

var fr = __webpack_require__(/*! ./fr.json */ "./src/i18n/fr.json");

var de = __webpack_require__(/*! ./de.json */ "./src/i18n/de.json");

var es = __webpack_require__(/*! ./es.json */ "./src/i18n/es.json");

var it = __webpack_require__(/*! ./it.json */ "./src/i18n/it.json");

var ja = __webpack_require__(/*! ./ja.json */ "./src/i18n/ja.json");

var pt = __webpack_require__(/*! ./pt.json */ "./src/i18n/pt.json");

module.exports = {
  en: en,
  fr: fr,
  de: de,
  es: es,
  it: it,
  ja: ja,
  pt: pt
};

/***/ }),

/***/ "./src/i18n/it.json":
/*!**************************!*\
  !*** ./src/i18n/it.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, Notify Me, RSVP, Free, Play My City, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"Date Locali\",\"Past Dates\":\"Date Passate\",\"Upcoming Dates\":\"Date Future\",\"Tickets\":\"Biglietti\",\"Presale\":\"Prevendita\",\"Merch\":\"Prodotti\",\"VIP\":\"VIP\",\"Sold Out\":\"Tutto esaurito\",\"More Info\":\"PiÃ¹ Info\",\"Show All Dates\":\"Mostra tutte le date\",\"Going\":\"In corso\",\"Interested\":\"Interessato\",\"with\":\"con\",\"Tickets & More\":\"Biglietti e altro\",\"No Upcoming Tour Dates\":\"Nessuna data del tour in programma\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>Segui</b> per ricevere le notifiche sugli spettacoli in programma nella tua zona.\",\"Track\":\"Segui\",\"Notify Me\":\"Notify Me\",\"RSVP\":\"RSVP\",\"Free\":\"Gratis\",\"Play My City\":\"Play My City\",\"\":\"\"}");

/***/ }),

/***/ "./src/i18n/ja.json":
/*!**************************!*\
  !*** ./src/i18n/ja.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, RSVP, I Was There, On Sale, Notify Me, <span>Track</span> to get concert and tour updates., Free, Play My City, Ask to play in your city, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"æ—¥ç¨‹\",\"Past Dates\":\"éŽåŽ»ã®æ—¥ç¨‹\",\"Upcoming Dates\":\"ä»Šå¾Œã®æ—¥ç¨‹\",\"Tickets\":\"ãƒã‚±ãƒƒãƒˆ\",\"Presale\":\"å…ˆè¡Œè²©å£²\",\"Merch\":\"ç‰©è²©\",\"VIP\":\"VIP\",\"Sold Out\":\"å®Œå£²\",\"More Info\":\"è©³ç´°æƒ…å ±\",\"Show All Dates\":\"æ—¥ç¨‹ã‚’ã™ã¹ã¦è¡¨ç¤º\",\"Going\":\"å‚åŠ \",\"Interested\":\"èˆˆå‘³ã‚ã‚Š\",\"with\":\"ä¸€ç·’ã«\",\"Tickets & More\":\"ãƒã‚±ãƒƒãƒˆãã®ä»–ã®æƒ…å ±\",\"No Upcoming Tour Dates\":\"ä»Šå¾Œã®ãƒ„ã‚¢ãƒ¼æ—¥ç¨‹ã¯ã‚ã‚Šã¾ã›ã‚“\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>ãƒ•ã‚©ãƒ­ãƒ¼</b>ã—ã¦ã€ãŠä½ã¾ã„ã®åœ°åŸŸã§è¿‘æ—¥é–‹å‚¬äºˆå®šã®å…¬æ¼”ã«é–¢ã™ã‚‹é€šçŸ¥ã‚’å—ã‘å–ã£ã¦ãã ã•ã„ã€‚\",\"Track\":\"ãƒ•ã‚©ãƒ­ãƒ¼\",\"RSVP\":\"å‚åŠ äºˆå®š\",\"I Was There\":\"è¡Œãã¾ã—ãŸã€‚\",\"On Sale\":\"ç™ºå£²ä¸­\",\"Notify Me\":\"é€šçŸ¥ã‚’å—ã‘ã‚‹\",\"<span>Track</span> to get concert and tour updates.\":\"<span>ãƒ•ã‚©ãƒ­ãƒ¼</span>ã—ã¦ã€ã‚³ãƒ³ã‚µãƒ¼ãƒˆæƒ…å ±ã‚„æœ€æ–°ãƒ„ã‚¢ãƒ¼æƒ…å ±ã‚’ã‚²ãƒƒãƒˆã€‚\",\"Free\":\"ç„¡æ–™\",\"Play My City\":\"æ‰€åœ¨åœ°ã§ã®å…¬æ¼”ä¾é ¼\",\"Ask to play in your city\":\"ãŠä½ã¾ã„ã®åœ°åŸŸã§ã®å…¬æ¼”ã‚’ãƒªã‚¯ã‚¨ã‚¹ãƒˆ\",\"\":\"\"}");

/***/ }),

/***/ "./src/i18n/pt.json":
/*!**************************!*\
  !*** ./src/i18n/pt.json ***!
  \**************************/
/*! exports provided: Local Dates, Past Dates, Upcoming Dates, Tickets, Presale, Merch, VIP, Sold Out, More Info, Show All Dates, Going, Interested, with, Tickets & More, No Upcoming Tour Dates, <b>Track</b> to get notified about upcoming shows in your area., Track, RSVP, I Was There, On Sale, Notify Me, <span>Track</span> to get concert and tour updates., Free, Play My City, Ask to play in your city, , default */
/***/ (function(module) {

module.exports = JSON.parse("{\"Local Dates\":\"Datas locais\",\"Past Dates\":\"Datas Passadas\",\"Upcoming Dates\":\"Datas Futuras\",\"Tickets\":\"Bilhetes\",\"Presale\":\"PrÃ©-Venda\",\"Merch\":\"Merch\",\"VIP\":\"VIP\",\"Sold Out\":\"Esgotado\",\"More Info\":\"Mais informaÃ§Ã£o\",\"Show All Dates\":\"Mostrar todas as datas\",\"Going\":\"Eu vou\",\"Interested\":\"Interessado\",\"with\":\"com\",\"Tickets & More\":\"Bilhetes e mais\",\"No Upcoming Tour Dates\":\"NÃ£o hÃ¡ datas de show marcadas\",\"<b>Track</b> to get notified about upcoming shows in your area.\":\"<b>Seguir</b> para receber notificaÃ§Ãµes dos prÃ³ximos concertos na tua Ã¡rea.\",\"Track\":\"Seguir\",\"RSVP\":\"ConfirmaÃ§Ãµes (RSVP)\",\"I Was There\":\"Eu estava lÃ¡\",\"On Sale\":\"Ã€ venda\",\"Notify Me\":\"Me informe\",\"<span>Track</span> to get concert and tour updates.\":\"<span>Seguir</span> para receber notificaÃ§Ãµes dos prÃ³ximos concertos na tua Ã¡rea.\",\"Free\":\"Gratuito\",\"Play My City\":\"Toca na minha cidade\",\"Ask to play in your city\":\"Pergunte a para jogar em sua cidade\",\"\":\"\"}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
/* harmony import */ var for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var insert_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js");
/* harmony import */ var insert_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(insert_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _initializeWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initializeWidget */ "./src/initializeWidget.js");
/* harmony import */ var _assets_stylesheets_main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/stylesheets/main.scss */ "./src/assets/stylesheets/main.scss");
/* harmony import */ var _assets_stylesheets_main_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_stylesheets_main_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_docready__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/docready */ "./src/lib/docready.js");
/* harmony import */ var _lib_docready__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_docready__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _initializeWidgetFromOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./initializeWidgetFromOptions */ "./src/initializeWidgetFromOptions.js");







if (!window.Promise) {
  // eslint-disable-next-line global-require
  __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill();
}

window.BIT = window.BIT || {};
Object(_lib_docready__WEBPACK_IMPORTED_MODULE_4__["docReady"])(function () {
  var widgets = document.querySelectorAll('.bit-widget-initializer');
  for_each__WEBPACK_IMPORTED_MODULE_0___default()(widgets, function (widget) {
    return Object(_initializeWidget__WEBPACK_IMPORTED_MODULE_2__["default"])(widget);
  });
  insert_css__WEBPACK_IMPORTED_MODULE_1___default()(_assets_stylesheets_main_scss__WEBPACK_IMPORTED_MODULE_3___default.a);
  var mutationObserver = new MutationObserver(function () {
    var newWidgets = document.querySelectorAll('.bit-widget-initializer');
    for_each__WEBPACK_IMPORTED_MODULE_0___default()(newWidgets, function (widget) {
      return Object(_initializeWidget__WEBPACK_IMPORTED_MODULE_2__["default"])(widget);
    });
  });
  mutationObserver.observe(document.body, {
    childList: true
  });
  window.BIT.widgetInitializer = {
    append: _initializeWidgetFromOptions__WEBPACK_IMPORTED_MODULE_5__["default"],
    mutationObserver: mutationObserver
  };

  if (window.BIT.onReady) {
    window.BIT.onReady();
  }
});

/***/ }),

/***/ "./src/initializeWidget.js":
/*!*********************************!*\
  !*** ./src/initializeWidget.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./src/components/App.js");
/* harmony import */ var _lib_optionsParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/optionsParser */ "./src/lib/optionsParser.js");
/* harmony import */ var _lib_insertDynamicStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/insertDynamicStyles */ "./src/lib/insertDynamicStyles.js");





var initializeWidget = function initializeWidget(element) {
  var parsedOptions = Object(_lib_optionsParser__WEBPACK_IMPORTED_MODULE_2__["optionsParser"])(element);
  Object(_lib_insertDynamicStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(parsedOptions);
  var widgetRoot = document.createElement("div");
  widgetRoot.setAttribute("class", "bit-widget-container");
  var divId = parsedOptions.widgetOptions.divId;

  if (divId && document.getElementById(divId)) {
    element.parentNode.removeChild(element);
    var widgetInitializerDiv = document.getElementById(divId);
    widgetInitializerDiv.appendChild(widgetRoot);
  } else {
    var _widgetInitializerDiv = element;

    _widgetInitializerDiv.parentNode.replaceChild(widgetRoot, _widgetInitializerDiv);
  }

  Object(preact__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], {
    options: parsedOptions
  }), widgetRoot);
};

/* harmony default export */ __webpack_exports__["default"] = (initializeWidget);

/***/ }),

/***/ "./src/initializeWidgetFromOptions.js":
/*!********************************************!*\
  !*** ./src/initializeWidgetFromOptions.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/App */ "./src/components/App.js");
/* harmony import */ var _lib_optionsParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/optionsParser */ "./src/lib/optionsParser.js");
/* harmony import */ var _lib_insertDynamicStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/insertDynamicStyles */ "./src/lib/insertDynamicStyles.js");





var initializeWidgetFromOptions = function initializeWidgetFromOptions(node, options) {
  var parsedOptions = Object(_lib_optionsParser__WEBPACK_IMPORTED_MODULE_2__["optionsParserFromObject"])(node, options);
  Object(_lib_insertDynamicStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(parsedOptions);
  var widgetRoot = document.createElement("div");
  widgetRoot.setAttribute("class", "bit-widget-container");
  node.appendChild(widgetRoot);
  Object(preact__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], {
    options: parsedOptions
  }), widgetRoot);
};

/* harmony default export */ __webpack_exports__["default"] = (initializeWidgetFromOptions);

/***/ }),

/***/ "./src/lib/breakPointsHandlers.js":
/*!****************************************!*\
  !*** ./src/lib/breakPointsHandlers.js ***!
  \****************************************/
/*! exports provided: calculateLayoutBreakPoints, calculateDetailedViewBreakPoints, calculateLogoBreakPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateLayoutBreakPoints", function() { return calculateLayoutBreakPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateDetailedViewBreakPoints", function() { return calculateDetailedViewBreakPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateLogoBreakPoints", function() { return calculateLogoBreakPoints; });
var calculateLayoutBreakPoints = function calculateLayoutBreakPoints(width) {
  if (width <= 320) {
    return "";
  }

  return width > 900 ? "bit-layout-desktop" : "bit-layout-ipad";
};
var calculateDetailedViewBreakPoints = function calculateDetailedViewBreakPoints(width) {
  return width >= 520 ? "bit-layout-ipad" : "";
};
var calculateLogoBreakPoints = function calculateLogoBreakPoints(width) {
  return width >= 520 ? "bit-layout-logo-ipad" : "";
};

/***/ }),

/***/ "./src/lib/docready.js":
/*!*****************************!*\
  !*** ./src/lib/docready.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var docready = {};

(function (funcName, baseObj) {
  "use strict"; // The public function name defaults to window.docReady
  // but you can modify the last line of this function to pass in a different object or method name
  // if you want to put them in a different namespace and those will be used instead of
  // window.docReady(...)

  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false; // call this when the document is ready
  // this function protects itself against being called more than once

  function ready() {
    if (!readyFired) {
      // this must be set to true before we start calling callbacks
      readyFired = true;

      for (var i = 0; i < readyList.length; i++) {
        // if a callback here happens to add new ready handlers,
        // the docReady() function will see that it already fired
        // and will schedule the callback to run right after
        // this event loop finishes so all handlers will still execute
        // in order and no new ones will be added to the readyList
        // while we are processing the list
        readyList[i].fn.call(window, readyList[i].ctx);
      } // allow any closures held by these functions to free


      readyList = [];
    }
  }

  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  } // This is the one public interface
  // docReady(fn, context);
  // the context argument is optional - if present, it will be passed
  // as an argument to the callback


  baseObj[funcName] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    } // if ready has already fired, then just schedule the callback
    // to fire asynchronously, but right away


    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      // add the function and context to the list
      readyList.push({
        fn: callback,
        ctx: context
      });
    } // if document already ready to go, schedule the ready function to run
    // IE only safe when readyState is "complete", others safe when readyState is "interactive"


    if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      // otherwise if we don't have event handlers installed, install them
      if (document.addEventListener) {
        // first choice is DOMContentLoaded event
        document.addEventListener("DOMContentLoaded", ready, false); // backup is window load event

        window.addEventListener("load", ready, false);
      } else {
        // must be IE
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }

      readyEventHandlersInstalled = true;
    }
  };
})("docReady", docready);

module.exports = docready;

/***/ }),

/***/ "./src/lib/fetchData.js":
/*!******************************!*\
  !*** ./src/lib/fetchData.js ***!
  \******************************/
/*! exports provided: fetchPastEventsData, fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPastEventsData", function() { return fetchPastEventsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var fetch_jsonp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fetch-jsonp */ "./node_modules/fetch-jsonp/build/fetch-jsonp.js");
/* harmony import */ var fetch_jsonp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fetch_jsonp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _uri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uri */ "./src/lib/uri.js");
/* harmony import */ var _slaxios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slaxios */ "./src/lib/slaxios.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./number */ "./src/lib/number.js");





var fetchArtistData = function fetchArtistData(options) {
  var appId = options.appId,
      artistName = options.artistName;
  var query = {
    app_id: appId || "js_".concat(window.location.hostname)
  };
  var url = "https://rest.bandsintown.com/artists/".concat(artistName);
  var fetchUrl = Object(_uri__WEBPACK_IMPORTED_MODULE_1__["buildUrl"])(url, query);
  return Object(_slaxios__WEBPACK_IMPORTED_MODULE_2__["default"])(fetchUrl);
};

var generateJSONPFunction = function generateJSONPFunction() {
  var MAX_SAFE_INTEGER = 9007199254740991;
  return "bitJsonp_".concat(Object(_number__WEBPACK_IMPORTED_MODULE_3__["getRandomInteger"])(1, MAX_SAFE_INTEGER));
};

var fetchEventsData = function fetchEventsData(options) {
  var appId = options.appId,
      artistName = options.artistName;
  var query = {
    app_id: appId || "js_".concat(window.location.hostname)
  }; //const url = `https://widget-api-pp.prod.bandsintown.com/widgetAPI/v3/artistEvents/${artistName}`;

  var url = "https://rest.bandsintown.com/artists/".concat(artistName, "/events/");
  var fetchUrl = Object(_uri__WEBPACK_IMPORTED_MODULE_1__["buildUrl"])(url, query);
  return fetch_jsonp__WEBPACK_IMPORTED_MODULE_0___default()(fetchUrl, {
    jsonpCallbackFunction: generateJSONPFunction()
  }).then(function (response) {
    return response.json();
  }).catch(function (error) {
    return console.log(error);
  });
};

var fetchPastEventsData = function fetchPastEventsData(options) {
  var appId = options.appId,
      artistName = options.artistName;
  var query = {
    app_id: appId || "js_".concat(window.location.hostname),
    date: 'past'
  };
  var url = "https://rest.bandsintown.com/artists/".concat(artistName, "/events");
  var fetchUrl = Object(_uri__WEBPACK_IMPORTED_MODULE_1__["buildUrl"])(url, query);
  return fetch_jsonp__WEBPACK_IMPORTED_MODULE_0___default()(fetchUrl).then(function (response) {
    return response.json();
  });
};
var fetchData = function fetchData(options) {
  return new Promise(function (resolve, reject) {
    fetchEventsData(options).then(function (events) {
      if (events.length > 0 && events[0].artist) {
        resolve({
          events: events,
          artist: events[0].artist
        });
      } else {
        fetchArtistData(options).then(function (response) {
          resolve({
            events: events,
            artist: response
          });
        });
      }
    }).catch(function (err) {
      reject(err);
    });
  });
};

/***/ }),

/***/ "./src/lib/getUserLocation.js":
/*!************************************!*\
  !*** ./src/lib/getUserLocation.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000
      });
    } else {
      reject(new Error(''));
    }
  });
});

/***/ }),

/***/ "./src/lib/handleJsonLd.js":
/*!*********************************!*\
  !*** ./src/lib/handleJsonLd.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var handleJsonLd = function handleJsonLd(jsonLdData) {
  var jsonLdElement = document.createElement("script");
  jsonLdElement.setAttribute('type', 'application/ld+json');
  jsonLdElement.textContent = JSON.stringify(jsonLdData);
  document.body.appendChild(jsonLdElement);
};

module.exports = handleJsonLd;

/***/ }),

/***/ "./src/lib/insertDynamicStyles.js":
/*!****************************************!*\
  !*** ./src/lib/insertDynamicStyles.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var insert_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js");
/* harmony import */ var insert_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(insert_css__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  var styleOptions = options.styleOptions;
  var fontSize = styleOptions.fontSize,
      font = styleOptions.font,
      widgetWidth = styleOptions.widgetWidth,
      textColor = styleOptions.textColor,
      backgroundColor = styleOptions.backgroundColor,
      linkColor = styleOptions.linkColor,
      linkTextColor = styleOptions.linkTextColor,
      separatorColor = styleOptions.separatorColor;
  insert_css__WEBPACK_IMPORTED_MODULE_0___default()("\n    .bit-widget {\n      font-size:".concat(fontSize, ";\n      font-family:").concat(font, ";\n      width:").concat(widgetWidth, ";\n      color:").concat(textColor, ";\n      background-color:").concat(backgroundColor, ";\n    }\n\n    .bit-widget .bit-offers {\n      background-color:").concat(linkColor, ";\n      border: 1px solid ").concat(linkColor, ";\n      color: ").concat(linkTextColor, ";\n    }\n\n    .bit-widget .bit-rsvp {\n      color:").concat(linkColor, ";\n      border: 1px solid ").concat(linkColor, ";\n    }\n\n    .bit-widget .bit-venue {\n      color:").concat(linkColor, ";\n    }\n\n    .bit-widget .bit-lineUp {\n      color:").concat(linkColor, ";\n    }\n\n    .bit-widget .bit-event {\n      border-top: 1px solid ").concat(separatorColor, ";\n      color: ").concat(textColor, ";\n    }\n\n    .bit-widget .bit-upcoming-events, bit-past-events {\n      border-bottom: 1px solid ").concat(separatorColor, ";\n    }\n\n    .bit-widget .bit-upcoming-events-show-all-button, .bit-past-events-show-all-button {\n      color: ").concat(linkColor, ";\n      border: 1px solid ").concat(linkColor, ";\n    }\n\n    .bit-widget .bit-play-my-city-button {\n      background-color:").concat(linkColor, ";\n      border: 1px solid ").concat(linkColor, ";\n      color: ").concat(linkTextColor, ";\n    }\n\n    .bit-widget .bit-clickable {\n      color: ").concat(linkColor, ";\n    }\n  "));
});

/***/ }),

/***/ "./src/lib/number.js":
/*!***************************!*\
  !*** ./src/lib/number.js ***!
  \***************************/
/*! exports provided: getRandomInteger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
;

/***/ }),

/***/ "./src/lib/optionsParser.js":
/*!**********************************!*\
  !*** ./src/lib/optionsParser.js ***!
  \**********************************/
/*! exports provided: parseAttributeValue, collectOptionsFromHtmlAttributes, collectStyleOptions, collectWidgetOptions, validateLanguage, calculateTrackingParameters, optionsParserFromObject, optionsParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAttributeValue", function() { return parseAttributeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collectOptionsFromHtmlAttributes", function() { return collectOptionsFromHtmlAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collectStyleOptions", function() { return collectStyleOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collectWidgetOptions", function() { return collectWidgetOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLanguage", function() { return validateLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateTrackingParameters", function() { return calculateTrackingParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsParserFromObject", function() { return optionsParserFromObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optionsParser", function() { return optionsParser; });
/* harmony import */ var for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
/* harmony import */ var for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var data_attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! data-attributes */ "./node_modules/data-attributes/index.js");
/* harmony import */ var data_attributes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(data_attributes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _optionsParser_isMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./optionsParser/isMobile */ "./src/lib/optionsParser/isMobile.js");
/* harmony import */ var _optionsParser_calculateAutoStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./optionsParser/calculateAutoStyles */ "./src/lib/optionsParser/calculateAutoStyles.js");
/* harmony import */ var _polyglot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./polyglot */ "./src/lib/polyglot.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var defaults = __webpack_require__(/*! object.defaults */ "./node_modules/object.defaults/index.js");

var arrayContains = __webpack_require__(/*! array-contains */ "./node_modules/array-contains/index.js");

var pick = __webpack_require__(/*! object.pick */ "./node_modules/object.pick/index.js");

var translations = __webpack_require__(/*! ../i18n */ "./src/i18n/index.js");

var optionsConfig = __webpack_require__(/*! ../config/widget_options */ "./src/config/widget_options.js");

var defaultWidgetOptions = __webpack_require__(/*! ../config/default_options */ "./src/config/default_options.js");

var defaultStyleOptions = __webpack_require__(/*! ../config/default_style_options */ "./src/config/default_style_options.js");

var parseAttributeValue = function parseAttributeValue(value) {
  var valueAsLowerCase = value.toLowerCase();
  var valueIsANumber = !isNaN(Number(value));
  return value === "" ? undefined : valueAsLowerCase === "true" ? true : valueAsLowerCase === "false" ? false : valueIsANumber ? Number(value) : value;
};
var collectOptionsFromHtmlAttributes = function collectOptionsFromHtmlAttributes(element) {
  var optionsAsStrings = data_attributes__WEBPACK_IMPORTED_MODULE_1___default()(element);
  var options = {};
  for_each__WEBPACK_IMPORTED_MODULE_0___default()(optionsAsStrings, function (val, key) {
    options[key] = parseAttributeValue(val.trim());
  });

  if (options.artistName) {
    options.artistName = options.artistName.toString();
  }

  return options;
};
var collectStyleOptions = function collectStyleOptions(element, options) {
  var autoStyleOptions = options.autoStyle ? Object(_optionsParser_calculateAutoStyles__WEBPACK_IMPORTED_MODULE_3__["default"])(element, options) : {};

  var optionsWithAutoStyle = _objectSpread({}, autoStyleOptions, options);

  var styleOptions = pick(optionsWithAutoStyle, optionsConfig.styleOptions);
  return defaults(styleOptions, defaultStyleOptions);
};
var collectWidgetOptions = function collectWidgetOptions(options) {
  var widgetOptions = pick(options, optionsConfig.widgetOptions);
  return defaults(widgetOptions, defaultWidgetOptions);
};
var validateLanguage = function validateLanguage(language) {
  var supportedLanguages = ["de", "en", "es", "fr", "it", "ja", "pt"];
  return arrayContains(supportedLanguages, language) ? language : "en";
};
var calculateTrackingParameters = function calculateTrackingParameters(options) {
  var affilCode = options.affilCode,
      appId = options.appId;
  var hostId = "js_".concat(window.location.hostname);
  return {
    utm_medium: "web",
    utm_source: "widget",
    came_from: "242",
    app_id: appId || hostId,
    affil_code: affilCode || hostId
  };
};
var optionsParserFromObject = function optionsParserFromObject(element, options) {
  var language = validateLanguage(options.language);
  var polyglot = new _polyglot__WEBPACK_IMPORTED_MODULE_4__["default"]({
    phrases: translations[language]
  });
  var validatedOptions = {
    styleOptions: collectStyleOptions(element, options),
    widgetOptions: collectWidgetOptions(options),
    language: language,
    trackingParams: calculateTrackingParameters(options),
    polyglot: polyglot,
    isMobile: Object(_optionsParser_isMobile__WEBPACK_IMPORTED_MODULE_2__["default"])()
  };
  return validatedOptions;
};
var optionsParser = function optionsParser(element) {
  var options = collectOptionsFromHtmlAttributes(element);
  var language = validateLanguage(options.language);
  var polyglot = new _polyglot__WEBPACK_IMPORTED_MODULE_4__["default"]({
    phrases: translations[language]
  });
  var validatedOptions = {
    styleOptions: collectStyleOptions(element, options),
    widgetOptions: collectWidgetOptions(options),
    language: language,
    trackingParams: calculateTrackingParameters(options),
    polyglot: polyglot,
    isMobile: Object(_optionsParser_isMobile__WEBPACK_IMPORTED_MODULE_2__["default"])()
  };
  return validatedOptions;
};

/***/ }),

/***/ "./src/lib/optionsParser/calculateAutoStyles.js":
/*!******************************************************!*\
  !*** ./src/lib/optionsParser/calculateAutoStyles.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var autoStyleOptionsParameters = [{
  key: "linkColor",
  name: "color",
  element: "a"
}, {
  key: "font",
  name: "fontFamily",
  element: "div"
}, {
  key: "textColor",
  name: "color",
  element: "div"
}];

var getPropertyFromDom = function getPropertyFromDom(rootElement, cssProperty, testElementForm) {
  var testElement = document.createElement(testElementForm);
  if (testElementForm === "a") testElement.setAttribute('href', '#');
  rootElement.appendChild(testElement);
  var propertyFromDom = window.getComputedStyle(testElement)[cssProperty];
  testElement.parentNode.removeChild(testElement);
  return propertyFromDom;
};

var calculateAutoStyles = function calculateAutoStyles(rootElement, options) {
  var autoStyleOptions = {};
  autoStyleOptionsParameters.forEach(function (_ref) {
    var key = _ref.key,
        name = _ref.name,
        element = _ref.element;
    if (!options[key]) autoStyleOptions[key] = getPropertyFromDom(rootElement, name, element);
  });
  return autoStyleOptions;
};

/* harmony default export */ __webpack_exports__["default"] = (calculateAutoStyles);

/***/ }),

/***/ "./src/lib/optionsParser/isMobile.js":
/*!*******************************************!*\
  !*** ./src/lib/optionsParser/isMobile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  if (!window.navigator) {
    return false;
  }

  var mobileRegEx = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i;
  return mobileRegEx.test(window.navigator.userAgent);
});

/***/ }),

/***/ "./src/lib/polyglot.js":
/*!*****************************!*\
  !*** ./src/lib/polyglot.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Polyglot =
/*#__PURE__*/
function () {
  function Polyglot(_ref) {
    var phrases = _ref.phrases;

    _classCallCheck(this, Polyglot);

    this.phrases = phrases;
  }

  _createClass(Polyglot, [{
    key: "t",
    value: function t(phrase) {
      if (phrase && this.phrases[phrase]) return this.phrases[phrase];else return phrase;
    }
  }]);

  return Polyglot;
}();

/* harmony default export */ __webpack_exports__["default"] = (Polyglot);

/***/ }),

/***/ "./src/lib/slaxios.js":
/*!****************************!*\
  !*** ./src/lib/slaxios.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var loadJSON = function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200 && success) {
        success(JSON.parse(xhr.responseText));
      } else if (error) {
        error(xhr);
      }
    }
  };

  xhr.open("GET", path, true);
  xhr.send();
};

var slaxios = function slaxios(url) {
  return new Promise(function (resolve, reject) {
    loadJSON(url, function (data) {
      return resolve(data);
    }, function (err) {
      return reject(err);
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (slaxios);

/***/ }),

/***/ "./src/lib/uri.js":
/*!************************!*\
  !*** ./src/lib/uri.js ***!
  \************************/
/*! exports provided: buildUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildUrl", function() { return buildUrl; });
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var buildUrl = function buildUrl(fullUrl, setQuery) {
  var _queryString$parseUrl = query_string__WEBPACK_IMPORTED_MODULE_0___default.a.parseUrl(fullUrl),
      url = _queryString$parseUrl.url,
      query = _queryString$parseUrl.query;

  var newQuery = _objectSpread({}, query, setQuery);

  return "".concat(url, "?").concat(query_string__WEBPACK_IMPORTED_MODULE_0___default.a.stringify(newQuery));
};

/***/ })

/******/ });
