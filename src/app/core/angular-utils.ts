export namespace angular {
    const toString = Object.prototype.toString;

    /**
    * @ngdoc function
    * @name angular.isObject
    * @module ng
    * @kind function
    *
    * @description
    * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
    * considered to be objects. Note that JavaScript arrays are objects.
    *
    * @param {*} value Reference to check.
    * @returns {boolean} True if `value` is an `Object` but not `null`.
    */
    export function isObject(value: any): boolean {
        return value !== null && typeof value === 'object';
    }

    /**
     * @ngdoc function
     * @name angular.isString
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `String`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `String`.
     */
    export function isString(value: any): boolean {
        return typeof value === 'string';
    }

    /**
     * @ngdoc function
     * @name angular.isDefined
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is defined.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is defined.
     */
    export function isDefined(value: any): boolean {
        return typeof value !== 'undefined';
    }

    /**
     * @ngdoc function
     * @name angular.isDate
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a value is a date.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Date`.
     */
    export function isDate(value: any): boolean {
        return toString.call(value) === '[object Date]';
    }

    /**
     * @ngdoc function
     * @name angular.isArray
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is an `Array`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is an `Array`.
     */
    export function isArray(arg): boolean {
        return Array.isArray(arg);
    }

    /**
     * @ngdoc function
     * @name angular.equals
     * @module ng
     * @kind function
     *
     * @description
     * Determines if two objects or two values are equivalent. Supports value types, regular
     * expressions, arrays and objects.
     *
     * Two objects or values are considered equivalent if at least one of the following is true:
     *
     * * Both objects or values pass `===` comparison.
     * * Both objects or values are of the same type and all of their properties are equal by
     *   comparing them with `angular.equals`.
     * * Both values are NaN. (In JavaScript, NaN == NaN => false. But we consider two NaN as equal)
     * * Both values represent the same regular expression (In JavaScript,
     *   /abc/ == /abc/ => false. But we consider two regular expressions as equal when their textual
     *   representation matches).
     *
     * During a property comparison, properties of `function` type and properties with names
     * that begin with `$` are ignored.
     *
     * Scope and DOMWindow objects are being compared only by identify (`===`).
     *
     * @param {*} o1 Object or value to compare.
     * @param {*} o2 Object or value to compare.
     * @returns {boolean} True if arguments are equal.
     *
     */
    export function equals(o1: any, o2: any): boolean {
        if (o1 === o2) {
            return true;
        }

        if (o1 === null || o2 === null) {
            return false;
        }

        if (o1 !== o1 && o2 !== o2) {
            return true; // NaN === NaN
        }

        if (typeof o1 === typeof o2 && typeof o1 === 'object') {
            if (isArray(o1)) {
                if (!isArray(o2)) {
                    return false;
                }
                const length: number = o1.length;
                if (length === o2.length) {
                    for (let key = 0; key < length; key++) {
                        if (!equals(o1[key], o2[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            } else if (isDate(o1)) {
                if (!isDate(o2)) {
                    return false;
                }
                return equals(o1.getTime(), o2.getTime());
            } else if (isRegExp(o1)) {
                if (!isRegExp(o2)) {
                    return false;
                }
                return o1.toString() === o2.toString();
            }
        }
        return false;
    }

    /**
     * @ngdoc function
     * @name angular.forEach
     * @module ng
     * @kind function
     *
     * @description
     * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
     * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
     * is the value of an object property or an array element, `key` is the object property key or
     * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
     *
     * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
     * using the `hasOwnProperty` method.
     *
     * @param {Object|Array} obj Object to iterate over.
     * @param {Function} iterator Iterator function.
     * @param {Object=} context Object to become context (`this`) for the iterator function.
     * @returns {Object|Array} Reference to `obj`.
     */
    export function forEach(obj: any | Array<any>, iterator: Function, context?: object | undefined): object | Array<any> {
        if (obj) {
            if (isFunction(obj)) {
                for (const key in obj) {
                    // Need to check if hasOwnProperty exists,
                    // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                    if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (isArray(obj) || isArrayLike(obj)) {
                for (let key = 0, length = obj.length; key < length; key++) {
                    if (typeof obj !== 'object' || key in obj) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (obj.forEach && obj.forEach !== forEach) {
                obj.forEach(iterator, context, obj);
            } else if (isBlankObject(obj)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else if (typeof obj.hasOwnProperty === 'function') {
                // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            } else {
                // Slow path for objects which do not have a method `hasOwnProperty`
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        }
        return obj;
    }

    /**
     * @ngdoc function
     * @name angular.toJson
     * @module ng
     * @kind function
     *
     * @description
     * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
     * stripped since angular uses this notation internally.
     *
     * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
     * @param {boolean|number} [pretty=2] If set to true, the JSON output will contain newlines and whitespace.
     *    If set to an integer, the JSON output will contain that many spaces per indentation.
     * @returns {string|undefined} JSON-ified string representing `obj`.
     * @knownIssue
     *
     */
    export function toJson(obj: object | Array<any> | Date | string | number): string | undefined {
        if (isUndefined(obj)) {
            return undefined;
        }
        return JSON.stringify(obj);
    }

    /**
     * @ngdoc function
     * @name angular.isNumber
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `Number`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Number`.
     */
    export function isNumber(value: any): boolean {
        return typeof value === 'number';
    }


    /**
     * @ngdoc function
     * @name angular.isUndefined
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is undefined.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is undefined.
     */
    export function isUndefined(value: any): boolean {
        return typeof value === 'undefined';
    }

    /**
     * @ngdoc function
     * @name angular.fromJson
     * @module ng
     * @kind function
     *
     * @description
     * Deserializes a JSON string.
     *
     * @param {string} json JSON string to deserialize.
     * @returns {Object|Array|string|number} Deserialized JSON string.
     */
    export function fromJson(json: string): object | Array<any> | string | number {
        return isString(json)
            ? JSON.parse(json)
            : json;
    }

    /**
     * @ngdoc function
     * @name angular.isFunction
     * @module ng
     * @kind function
     *
     * @description
     * Determines if a reference is a `Function`.
     *
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `Function`.
     */
    export function isFunction(value: any): boolean {
        return typeof value === 'function';
    }

    /**
     * Determines if a value is a regular expression object.
     *
     * @private
     * @param {*} value Reference to check.
     * @returns {boolean} True if `value` is a `RegExp`.
     */
    export function isRegExp(value: any): boolean {
        return toString.call(value) === '[object RegExp]';
    }

    /**
     * Determine if a value is an object with a null prototype
     *
     * @returns {boolean} True if `value` is an `Object` with a null prototype
     */
    export function isBlankObject(value): boolean {
        return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
    }

    /**
     * @ngdoc function
     * @name angular.extend
     * @module ng
     * @kind function
     *
     * @description
     * Extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
     * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
     * by passing an empty object as the target: `var object = angular.extend({}, object1, object2)`.
     *
     * **Note:** Keep in mind that `angular.extend` does not support recursive merge (deep copy). Use
     * {@link angular.merge} for this.
     *
     * @param {Object} dst Destination object.
     * @param {...Object} src Source object(s).
     * @returns {Object} Reference to `dst`.
     */
    export function extend(dst, ...args) {
        return baseExtend(dst, args, false);
    }

    /**
    * @ngdoc function
    * @name angular.merge
    * @module ng
    * @kind function
    *
    * @description
    * Deeply extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
    * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
    * by passing an empty object as the target: `var object = angular.merge({}, object1, object2)`.
    *
    * Unlike {@link angular.extend extend()}, `merge()` recursively descends into object properties of source
    * objects, performing a deep copy.
    *
    * @deprecated
    * sinceVersion="1.6.5"
    * This function is deprecated, but will not be removed in the 1.x lifecycle.
    * There are edge cases (see {@link angular.merge#known-issues known issues}) that are not
    * supported by this function. We suggest
    * using [lodash's merge()](https://lodash.com/docs/4.17.4#merge) instead.
    *
    * @knownIssue
    * This is a list of (known) object types that are not handled correctly by this function:
    * - [`Blob`](https://developer.mozilla.org/docs/Web/API/Blob)
    * - [`MediaStream`](https://developer.mozilla.org/docs/Web/API/MediaStream)
    * - [`CanvasGradient`](https://developer.mozilla.org/docs/Web/API/CanvasGradient)
    * - AngularJS {@link $rootScope.Scope scopes};
    *
    * @param {Object} dst Destination object.
    * @param {...Object} src Source object(s).
    * @returns {Object} Reference to `dst`.
    */
    export function merge(dst, ...args) {
        return baseExtend(dst, args, true);
    }

    /**
     * @ngdoc function
     * @name angular.copy
     * @module ng
     * @kind function
     *
     * @description
     * Creates a deep copy of `source`, which should be an object or an array.
     *
     * * If no destination is supplied, a copy of the object or array is created.
     * * If a destination is provided, all of its elements (for arrays) or properties (for objects)
     *   are deleted and then all elements/properties from the source are copied to it.
     * * If `source` is not an object or array (inc. `null` and `undefined`), `source` is returned.
     * * If `source` is identical to `destination` an exception will be thrown.
     *
     * <br />
     * <div class="alert alert-warning">
     *   Only enumerable properties are taken into account. Non-enumerable properties (both on `source`
     *   and on `destination`) will be ignored.
     * </div>
     *
     * @param {*} source The source that will be used to make a copy.
     *                   Can be any type, including primitives, `null`, and `undefined`.
     * @param {(Object|Array)=} destination Destination into which the source is copied. If
     *     provided, must be of the same type as `source`.
     * @returns {*} The copy or updated `destination`, if `destination` was specified.
     *
     * @example
     <example module="copyExample" name="angular-copy">
        <file name="index.html">
        <div ng-controller="ExampleController">
            <form novalidate class="simple-form">
            <label>Name: <input type="text" ng-model="user.name" /></label><br />
            <label>Age:  <input type="number" ng-model="user.age" /></label><br />
            Gender: <label><input type="radio" ng-model="user.gender" value="male" />male</label>
                    <label><input type="radio" ng-model="user.gender" value="female" />female</label><br />
            <button ng-click="reset()">RESET</button>
            <button ng-click="update(user)">SAVE</button>
            </form>
            <pre>form = {{user | json}}</pre>
            <pre>leader = {{leader | json}}</pre>
        </div>
        </file>
        <file name="script.js">
        // Module: copyExample
        angular.
            module('copyExample', []).
            controller('ExampleController', ['$scope', function($scope) {
            $scope.leader = {};

            $scope.reset = function() {
                // Example with 1 argument
                $scope.user = angular.copy($scope.leader);
            };

            $scope.update = function(user) {
                // Example with 2 arguments
                angular.copy(user, $scope.leader);
            };

            $scope.reset();
            }]);
        </file>
    </example>
    */
    export function copy(source, destination?, maxDepth?: number) {
        const stackSource = [];
        const stackDest = [];
        maxDepth = isValidObjectMaxDepth(maxDepth) ? maxDepth : NaN;

        if (destination) {
            if (isTypedArray(destination) || isArrayBuffer(destination)) {
                // throw ngMinErr('cpta', 'Can\'t copy! TypedArray destination cannot be mutated.');
                console.error(`Can't copy! TypedArray destination cannot be mutated.`);
            }
            if (source === destination) {
                // throw ngMinErr('cpi', 'Can\'t copy! Source and destination are identical.');
                console.error(`Can't copy! Source and destination are identical.`);
            }

            // Empty the destination object
            if (isArray(destination)) {
                destination.length = 0;
            } else {
                forEach(destination, function (value, key) {
                    if (key !== '$$hashKey') {
                        delete destination[key];
                    }
                });
            }

            stackSource.push(source);
            stackDest.push(destination);
            return copyRecurse(source, destination, maxDepth);
        }

        return copyElement(source, maxDepth);

        function copyRecurse(source, destination, maxDepth) {
            maxDepth--;
            if (maxDepth < 0) {
                return '...';
            }

            if (isArray(source)) {
                for (let i = 0, ii = source.length; i < ii; i++) {
                    destination.push(copyElement(source[i], maxDepth));
                }
            } else if (isBlankObject(source)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        destination[key] = copyElement(source[key], maxDepth);
                    }
                }
            } else if (source && typeof source.hasOwnProperty === 'function') {
                // Slow path, which must rely on hasOwnProperty
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        destination[key] = copyElement(source[key], maxDepth);
                    }
                }
            } else {
                // Slowest path --- hasOwnProperty can't be called as a method
                for (const key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        destination[key] = copyElement(source[key], maxDepth);
                    }
                }
            }
            return destination;
        }

        function copyElement(source, maxDepth?: number) {
            // Simple values
            if (!isObject(source)) {
                return source;
            }

            // Already copied values
            const index = stackSource.indexOf(source);
            if (index !== -1) {
                return stackDest[index];
            }

            // if (isWindow(source) || isScope(source)) {
            //     throw ngMinErr('cpws',
            //         'Can\'t copy! Making copies of Window or Scope instances is not supported.');
            // }

            let needsRecurse = false;
            let destination = copyType(source);

            if (destination === undefined) {
                destination = isArray(source) ? [] : Object.create(Object.getPrototypeOf(source));
                needsRecurse = true;
            }

            stackSource.push(source);
            stackDest.push(destination);

            return needsRecurse
                ? copyRecurse(source, destination, maxDepth)
                : destination;
        }

        function copyType(source) {
            switch (toString.call(source)) {
                case '[object Int8Array]':
                case '[object Int16Array]':
                case '[object Int32Array]':
                case '[object Float32Array]':
                case '[object Float64Array]':
                case '[object Uint8Array]':
                case '[object Uint8ClampedArray]':
                case '[object Uint16Array]':
                case '[object Uint32Array]':
                    return new source.constructor(copyElement(source.buffer), source.byteOffset, source.length);

                case '[object ArrayBuffer]':
                    // Support: IE10
                    if (!source.slice) {
                        // If we're in this case we know the environment supports ArrayBuffer
                        /* eslint-disable no-undef */
                        const copied = new ArrayBuffer(source.byteLength);
                        new Uint8Array(copied).set(new Uint8Array(source));
                        /* eslint-enable */
                        return copied;
                    }
                    return source.slice(0);

                case '[object Boolean]':
                case '[object Number]':
                case '[object String]':
                case '[object Date]':
                    return new source.constructor(source.valueOf());

                case '[object RegExp]':
                    const re = new RegExp(source.source, source.toString().match(/[^/]*$/)[0]);
                    re.lastIndex = source.lastIndex;
                    return re;

                case '[object Blob]':
                    return new source.constructor([source], { type: source.type });
            }

            if (isFunction(source.cloneNode)) {
                return source.cloneNode(true);
            }
        }
    }

    const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/;

    function isTypedArray(value) {
        return value && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value));
    }

    function isArrayBuffer(obj) {
        return toString.call(obj) === '[object ArrayBuffer]';
    }

    /**
     * @private
     * @param {Number} maxDepth
     * @return {boolean}
     */
    function isValidObjectMaxDepth(maxDepth) {
        return isNumber(maxDepth) && maxDepth > 0;
    }

    function baseExtend(dst, objs, deep) {
        for (let i = 0, ii = objs.length; i < ii; ++i) {
            const obj = objs[i];
            if (!isObject(obj) && !isFunction(obj)) {
                continue;
            }
            const keys = Object.keys(obj);
            for (let j = 0, jj = keys.length; j < jj; j++) {
                const key = keys[j];
                const src = obj[key];

                if (deep && isObject(src)) {
                    if (isDate(src)) {
                        dst[key] = new Date(src.valueOf());
                    } else if (isRegExp(src)) {
                        dst[key] = new RegExp(src);
                        // } else if (src.nodeName) {
                        //     dst[key] = src.cloneNode(true);
                        // } else if (isElement(src)) {
                        //     dst[key] = src.clone();
                    } else {
                        if (!isObject(dst[key])) {
                            dst[key] = isArray(src) ? [] : {};
                        }
                        baseExtend(dst[key], [src], true);
                    }
                } else {
                    dst[key] = src;
                }
            }
        }
        return dst;
    }

    /**
     * @private
     * @param {*} obj
     * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
     *                   String ...)
     */
    function isArrayLike(obj: any): boolean {

        // `null`, `undefined` and `window` are not array-like
        if (obj == null || isWindow(obj)) {
            return false;
        }

        // arrays, strings and jQuery/jqLite objects are array like
        // * jqLite is either the jQuery or jqLite constructor function
        // * we have to check the existence of jqLite first as this method is called
        //   via the forEach method when constructing the jqLite object in the first place
        if (isArray(obj) || isString(obj)) {
            return true;
        }

        // Support: iOS 8.2 (not reproducible in simulator)
        // "length" in obj used to prevent JIT error (gh-11508)
        const length = 'length' in Object(obj) && obj.length;

        // NodeList objects (with `item` method) and
        // other objects with suitable length characteristics are array-like
        return isNumber(length) &&
            (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item === 'function');
    }

    /**
     * Checks if `obj` is a window object.
     *
     * @private
     * @param {*} obj Object to check
     * @returns {boolean} True if `obj` is a window obj.
     */
    function isWindow(obj: any): boolean {
        return obj && obj.window === obj;
    }

    export function proxyPromise(promise: Promise<any>) {
        return new Proxy(promise, {
            get: (target, property) => {
                if (property === 'then') {
                    return new Proxy(target[property], {
                        apply: (func, thisBinding, args: Array<any>) => {
                            if (args.length === 1) {
                                args.push(() => { });
                            }
                            return Reflect.apply(func, thisBinding, args);
                        }
                    });
                } else {
                    return Reflect.get(target, property);
                }
            }
        });
    }

    export function parse(expression, context) {
        if (angular.isString(expression)) {
            if (expression.indexOf('.') !== -1 || expression.indexOf('[') !== -1) {
                const expressionSplit = expression.split(/(\[.+?\])|\./);
                let parsedString = '';
                expressionSplit.forEach(element => {
                    if (element) {
                        if (element.indexOf('[') !== -1) {
                            parsedString += element;
                        } else {
                            parsedString += '["' + element + '"]';
                        }
                    }

                });

                try {
                    return eval('context' + parsedString);
                } catch (ex) {
                    return '';
                }

            } else {
                return context[expression];
            }

        } else if (angular.isFunction(expression)) {
            return expression(context);
        } else {
            return '';
        }
    }

    export function getProperty(data: Object | Array<any>, properties: string | Array<string>, defaultValue?: any) {
        let keys: Array<string>;
        if (typeof properties === 'string') {
            keys = properties.split('.');
        } else {
            keys = properties;
        }

        for (const key of keys) {
            if (data && angular.isDefined(data[key])) {
                data = data[key];
            } else {
                return defaultValue;
            }
        }

        return data;
    }

    // 提取数组内对象的某个键值的数据，返回数组
    export function arrayColumn(data: Array<Object>, key) {
        const result = [];
        data.forEach((item) => {
            if (item[key]) {
                result.push(item[key]);
            }
        });
        return result;
    }
}
