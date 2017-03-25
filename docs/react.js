'use strict';

import React from './lib/React';

var Children=React.Children;
var Component=React.Component;
var PureComponent=React.PureComponent;
var createElement=React.createElement;
var cloneElement=React.cloneElement;
var isValidElement=React.isValidElement;
var PropTypes=React.PropTypes;
var createClass=React.createClass;
var createFactory=React.createFactory;
var createMixin=React.createMixin;
var DOM=React.DOM;
var version=React.version;
var __spread=React.__spread;

export {
	Children,
	Component,
	PureComponent,

	createElement,
	cloneElement,
	isValidElement,
	PropTypes,
	createClass,
	createFactory,
	createMixin,
	DOM,
	version,
	__spread
};

export default {
	Children:Children,
	Component:Component,
	PureComponent:PureComponent,
	
	createElement:createElement,
	cloneElement:cloneElement,
	isValidElement:isValidElement,
	PropTypes:PropTypes,
	createClass:createClass,
	createFactory:createFactory,
	createMixin:createMixin,
	DOM:DOM,
	version:version,
	__spread:__spread
};
