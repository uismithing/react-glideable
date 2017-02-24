import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import _ from "lodash";
//
//*************************
//*************************
// Nonpublished Imports
//
//
//*************************
//*************************
// Exports
//
export default class Glideable extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		//
		scopeProxy.setState(
		{
			"Ready":false,
			"Portal":
			{
				"Classname":this.props.className,
				"Velocity":
				{
					"Profile":
					{
						"runOnMount":false
					}
				},
				"Drag":
				{
					"Start":scopeProxy.props.Drag.Start,
					"Dragging":scopeProxy.props.Drag.Dragging,
					"Stop":scopeProxy.props.Drag.Stop
				},
				"Reset":
				{
					"All":
					{
						"Complete":scopeProxy.props.Reset.All.Complete
					},
					"Item":
					{
						"Complete":scopeProxy.props.Reset.Item.Complete
					}
				},
				"Ready":scopeProxy.props.Ready
			},
			"Bounds":
			{
				"Selector":this.props.Bounds,
				"Glide":
				{
					"Axis":scopeProxy.props.Glide.Axis,
					"Duration":scopeProxy.props.Glide.Duration,
					"Easing":scopeProxy.props.Glide.Duration,
					"Start":scopeProxy.props.Start,
					"Progess":scopeProxy.props.Progress,
					"Complete":scopeProxy.props.Complete
				}
			}
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		let boundsElement
			= (scopeProxy.state.Bounds.Selector.length > 1)
			? document.querySelector(scopeProxy.state.Bounds.Selector)
			: null;
		let boundsOffsetwidth
			= boundsElement.offsetWidth;
		let boundsOffsetheight
			= boundsElement.offsetHeight;
		//
		let boundsMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let boundsTransformMatrix
			= (boundsElement !== null)
			? window.getComputedStyle(boundsElement, null).getPropertyValue("transform")
			: "none";
		let boundsMatrixSegments
			= (boundsTransformMatrix !== "none")
			? boundsMatrixRegExp.exec(boundsTransformMatrix)[1].split(", ")
			: null
		let boundsTranslateX
			= (boundsMatrixSegments !== null)
			? parseFloat(boundsMatrixSegments[4])
			: 0;
		let boundsTranslateY
			= (boundsMatrixSegments !== null)
			? parseFloat(boundsMatrixSegments[5])
			: 0;
		//
		window.requestAnimationFrame(()=>
		{
			if(scopeProxy.state !== null
			&& scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				let draggableStateItems =
					scopeProxy.props.children.map((childItem)=>
					{
						let childId
							= childItem.props.id;
						let portalId
							= childId.concat("_glideable-child");
						let portalElement
							= document.getElementById(portalId);
						//
						let portalMatrixRegExp
							= new RegExp(/\(([^)]+)\)/g);
						let portalTransformMatrix
							= window.getComputedStyle(portalElement, null).getPropertyValue("transform");
						let portalMatrixSegments
							= (portalTransformMatrix !== "none")
							? portalMatrixRegExp.exec(portalTransformMatrix)[1].split(", ")
							: null;
						let portalTranslateX
							= (portalMatrixSegments !== null)
							? parseFloat(portalMatrixSegments[4])
							: 0;
						let portalTranslateY
							= (portalMatrixSegments !== null)
							? parseFloat(portalMatrixSegments[5])
							: 0;
						//
						let portalOffsettop
							= portalElement.offsetTop;
						let portalOffsetleft
							= portalElement.offsetLeft;
						let portalOffsetwidth
							= portalElement.offsetWidth;
						let portalOffsetheight
							= portalElement.offsetHeight;
						//
						let portalLocationTop
							= portalOffsettop
							+ portalTranslateY;
						let portalLocationLeft
							= portalOffsetleft
							+ portalTranslateX;
						let portalLocationRight
							= portalLocationLeft
							+ portalOffsetwidth;
						let portalLocationBottom
							= portalLocationTop
							+ portalOffsetheight;
						//
						let deltaOffsettop
							= portalOffsettop
							+ portalTranslateY;
						let deltaOffsetleft
							= portalOffsetleft
							+ portalTranslateX;
						let deltaOffsetright
							= boundsOffsetwidth
							- deltaOffsetleft
							- portalOffsetwidth;
						let deltaOffsetbottom
							= boundsOffsetheight
							- deltaOffsettop
							- portalOffsetheight;
						//
						let draggableProfile =
							{
								"axis":scopeProxy.props.Glide.Axis,
								"disabled":false,
								"bounds":
								{
									"top":-deltaOffsettop,
									"right":deltaOffsetright,
									"bottom":deltaOffsetbottom,
									"left":-deltaOffsetleft
								},
								"onStart":scopeProxy.targetDragStart.bind(scopeProxy),
								"onDrag":scopeProxy.targetDragging.bind(scopeProxy),
								"onStop":scopeProxy.targetDragStop.bind(scopeProxy)
							}
						//
						return(draggableProfile);
					});
				//
				let glideableState =
					{
						"Ready":true,
						"Portal":
						{
							"Drag":scopeProxy.state.Portal.Drag,
							"Ready":scopeProxy.state.Portal.Ready,
							"Reset":scopeProxy.state.Portal.Reset,
							"Velocity":scopeProxy.state.Portal.Velocity,
							"Classname":scopeProxy.state.Portal.Classname
						},
						"Drag":
						{
							"Profile":draggableStateItems,
							"Location":
							{
								"Delta":
								{
									"X":0,
									"Y":0
								},
								"Previous":
								{
									"X":0,
									"Y":0
								}
							}
						},
						"Bounds":
						{
							"Glide":scopeProxy.props.Glide,
							"Selector":scopeProxy.props.Bounds,
							"Limits":
							{
								"Top":0,
								"Right":boundsOffsetwidth,
								"Bottom":boundsOffsetheight,
								"Left":0
							}
						}
					}
				//
				scopeProxy.setState(glideableState);
				scopeProxy.state.Portal.Ready(scopeProxy.props.children);
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let glideableportalClassname
			= _.has(this, "state.Portal.Classname")
			? this.state.Portal.Classname
			: null;
		let adjustedChildTransform
			= "translateX(0)".concat(
			" translateY(0)",
			" translateZ(0)",
			" rotateX(0)",
			" rotateY(0)",
			" rotateZ(0)");
		let childIndex
			= 0;
		//
		let glideableportalStyle =
			{
				"display":"block",
				"position":"absolute",
				"margin":"0",
				"padding":"0",
				"border":"none",
				"background":"none",
				"background-attachment":"scroll",
				"background-blend-mode":"normal",
				"bakcground-clip":"border-box",
				"background-image":"none",
				"background-origin":"padding-box",
				"background-position":"0% 0%",
				"background-repeat":"repeat",
				"background-size":"auto",
				"background-color":"rgba(0,0,0,0)",
				"box-shadow":"none"
			}
		//
		let portalmorphStyle =
			{
				"display":"inline-block",
				"position":"absolute",
				"visibility":"0",
				"opacity":"0",
				"width":"0",
				"height":"0"
			}
		//
		let preparedGlideableItems =
			this.props.children.map((childItem)=>
			{
				let childitemId
					= childItem.props.id;
				let childitemStyle
					= childItem.props.style;
				let childitemClassname
					= childItem.props.className;
				let glideablechildId
					= childitemId.concat("_glideable-child");
				let portalmorphId
					= childitemId.concat("_glideable-morph");
				let portalmorphRefvalue
					= childitemId.concat("_glideablemorph");
				let portaldragRefvalue
					= childitemId.concat("_glideabledrag");
				let childdragProfile
					= _.has(scopeProxy, "state.Drag.Profile")
					? scopeProxy.state.Drag.Profile[childIndex]
					: null;
				let portalmorphProfile
					= _.has(scopeProxy, "state.Portal.Velocity.Profile")
					? (scopeProxy.state.Portal.Velocity.Profile[childitemId] !== undefined)
					? scopeProxy.state.Portal.Velocity.Profile[childitemId]
					: null
					: null;
				//
				let glideableChild =
					<div id={glideablechildId} className={childitemClassname} style={glideableportalStyle}>
						<Draggable ref={portaldragRefvalue} {...childdragProfile}>
							{childItem}
						</Draggable>
						<VelocityComponent {...portalmorphProfile}>
							<div id={portalmorphId} ref={portalmorphRefvalue} style={portalmorphStyle}></div>
						</VelocityComponent>
					</div>
				//
				childItem.props.style
				= (childItem.props.style !== undefined)
				? childItem.props.style
				: {};
				//
				Object.assign(childItem.props.style,
				{
					"top":"0",
					"bottom":"0",
					"left":"0",
					"right":"0",
					"width":"100%",
					"height":"100%",
					"margin":"0",
					"pointer-events":"all",
					"transform":adjustedChildTransform
				});
				childIndex++;
				//
				return glideableChild;
			});
		//
		return(
			<div id="glideable-portal-container" className={glideableportalClassname}>
				{preparedGlideableItems}
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	getElementIndex(elementId)
	{
		let scopeProxy
			= this;
		//
		for(let childIndex in scopeProxy.props.children)
		{
			if(scopeProxy.props.children[childIndex].props.id === elementId)
			{
				return childIndex;
			}
		}
	}
	reportDragStart(dragElement)
	{
		let scopeProxy
			= this;
		//
		scopeProxy.state.Portal.Drag.Start(dragElement);
	}
	reportDragStop(dragElement)
	{
		
		let scopeProxy
			= this;
		//
		scopeProxy.state.Portal.Drag.Stop(dragElement);
	}
	reportDragging(dragElement)
	{
		let scopeProxy
			= this;
		//
		scopeProxy.state.Portal.Drag.Dragging(dragElement);
	}
	targetDragStart(event)
	{
		let scopeProxy
			= this;
		let dragtargetId
			= event.target.id;
		let dragElement
			= document.getElementById(dragtargetId);
		//
		scopeProxy.reportDragStart(dragElement);
		scopeProxy.focusGlideableItem(dragtargetId);
	}
	targetDragging(event)
	{
		let scopeProxy
			= this;
		let childId
			= event.target.id;
		let childElement
			= document.getElementById(childId);
		let childIndex
			= scopeProxy.getElementIndex(childId);
		let portalMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let portalTransformMatrix
			= window.getComputedStyle(childElement, null).getPropertyValue("transform");
		let portalMatrixSegments
			= (portalTransformMatrix !== "none")
			? portalMatrixRegExp.exec(portalTransformMatrix)[1].split(", ")
			: null;
		let childLocationX
			= (portalMatrixSegments !== null)
			? parseFloat(portalMatrixSegments[4])
			: 0;
		let childLocationY
			= (portalMatrixSegments !== null)
			? parseFloat(portalMatrixSegments[5])
			: 0;
		//
		let dragstatePosition
			= _.has(scopeProxy, "state.Drag.Profile")
			? (scopeProxy.state.Drag.Profile !== undefined
			&& scopeProxy.state.Drag.Profile[childIndex] !== undefined
			&& scopeProxy.state.Drag.Profile[childIndex].position !== undefined)
			? scopeProxy.state.Drag.Profile[childIndex].position
			: null
			: null;
		//
		let previousDragLocationX
			= scopeProxy.state.Drag.Location.Previous.X;
		let previousDragLocationY
			= scopeProxy.state.Drag.Location.Previous.Y;
		let dragLocationX
			= (dragstatePosition !== null
			&& dragstatePosition.x !== null)
			? dragstatePosition.x
			: childLocationX;
		let dragLocationY
			= (dragstatePosition !== null
			&& dragstatePosition.y !== null)
			? dragstatePosition.y
			: childLocationY;
		let deltaMotionX
			= dragLocationX
			- previousDragLocationX;
		let deltaMotionY
			= dragLocationY
			- previousDragLocationY;
		let adjustedChildTransform
			= "translateX(".concat(dragLocationX.toString(), "px) translateY(", dragLocationY.toString(), "px)");
		//
		if(scopeProxy.state.Drag.Profile[childIndex].position !== undefined)
		{
			delete scopeProxy.state.Drag.Profile[childIndex].position;
		}
		let adjustedState =
			_.merge(_.cloneDeep(scopeProxy.state),
			{
				"Drag":
				{
					"Location":
					{
						"Delta":
						{
							"X":deltaMotionX,
							"Y":deltaMotionY
						},
						"Previous":
						{
							"X":dragLocationX,
							"Y":dragLocationY
						}
					}
				}
			});
		//
		scopeProxy.setState(adjustedState);
		scopeProxy.reportDragging(childElement);
	}
	targetDragStop(event)
	{
		let scopeProxy
			= this;
		let childId
			= event.target.id;
		let childElement
			= document.getElementById(childId);
		let childIndex
			= scopeProxy.getElementIndex(childId);
		let deltaMotionX
			= parseFloat(scopeProxy.state.Drag.Location.Delta.X);
		let deltaMotionY
			= parseFloat(scopeProxy.state.Drag.Location.Delta.Y);
		//
		let portalMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let portalTransformMatrix
			= window.getComputedStyle(childElement, null).getPropertyValue("transform");
		let portalMatrixSegments
			= (portalTransformMatrix !== "none")
			? portalMatrixRegExp.exec(portalTransformMatrix)[1].split(", ")
			: null;
		let currentLocationX
			= (portalMatrixSegments !== null)
			? parseFloat(portalMatrixSegments[4])
			: 0;
		let currentLocationY
			= (portalMatrixSegments !== null)
			? parseFloat(portalMatrixSegments[5])
			: 0;
		//
		let adjustedLocationX
			= deltaMotionX
			+ currentLocationX;
		let adjustedLocationY
			= deltaMotionY
			+ currentLocationY;
		let glideDuration
			= (deltaMotionX !== 0
			&& deltaMotionY !== 0)
			? scopeProxy.state.Bounds.Glide.Duration
			: 0;
		//
		let glideableProfile =
			{
				"runOnMount":false,
				"easing":scopeProxy.state.Bounds.Glide.Easing,
				"duration":glideDuration,
				"animation":
				{
					"opacity":1
				},
				"begin":(event)=>
				{
					// empty
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity.
					//
					let progressValue
						= (parseFloat(elements[0].style.opacity) > 0)
						? parseFloat(elements[0].style.opacity)
						: 0;
					let childElement
						= document.getElementById(childId);
					//
					let topLimit
						= scopeProxy.state.Drag.Profile[childIndex].bounds.top;
					let rightLimit
						= scopeProxy.state.Drag.Profile[childIndex].bounds.right;
					let bottomLimit
						= scopeProxy.state.Drag.Profile[childIndex].bounds.bottom;
					let leftLimit
						= scopeProxy.state.Drag.Profile[childIndex].bounds.left;
					//
					let portalMatrixRegExp
						= new RegExp(/\(([^)]+)\)/g);
					let portalTransformMatrix
						= window.getComputedStyle(childElement, null).getPropertyValue("transform");
					let portalMatrixSegments
						= (portalTransformMatrix !== "none")
						? portalMatrixRegExp.exec(portalTransformMatrix)[1].split(", ")
						: null;
					let currentLocationX
						= (portalMatrixSegments !== null)
						? parseFloat(portalMatrixSegments[4])
						: 0;
					let currentLocationY
						= (portalMatrixSegments !== null)
						? parseFloat(portalMatrixSegments[5])
						: 0;
					//
					let glideDeltaX
						= (1 - progressValue) * deltaMotionX;
					let glideDeltaY
						= (1 - progressValue) * deltaMotionY;
					let glideableLocationX
						= (deltaMotionX !== 0)
						? glideDeltaX
						+ currentLocationX
						: currentLocationX;
					let glideableLocationY
						= (deltaMotionY !== 0)
						? glideDeltaY
						+ currentLocationY
						: currentLocationY;
					let glideableTransform
						= "translateX(".concat(glideableLocationX.toString(),
						"px) translateY(", glideableLocationY.toString(), "px)");
					//
					if(currentLocationX < rightLimit
					&& currentLocationX > leftLimit
					&& currentLocationY > topLimit
					&& currentLocationY < bottomLimit)
					{
						Object.assign(childElement.style,
						{
							"transform":glideableTransform
						});
						scopeProxy.state.Bounds.Glide.Progress(childElement);
					}
					else
					{
						// onBoundaryCollision
					}
				},
				"complete":(event)=>
				{
					let childElement
						= document.getElementById(childId);
					let portalMatrixRegExp
						= new RegExp(/\(([^)]+)\)/g);
					let portalTransformMatrix
						= window.getComputedStyle(childElement, null).getPropertyValue("transform");
					let portalMatrixSegments
						= (portalTransformMatrix !== "none")
						? portalMatrixRegExp.exec(portalTransformMatrix)[1].split(", ")
						: null;
					let completeLocationX
						= (portalMatrixSegments !== null)
						? parseFloat(portalMatrixSegments[4])
						: 0;
					let completeLocationY
						= (portalMatrixSegments !== null)
						? parseFloat(portalMatrixSegments[5])
						: 0;
					let glideableCompleteTransform
						= "translateX(".concat(completeLocationX.toString(),
						"px) translateY(", completeLocationY.toString(), "px)");
					//
					let glideableCompleteProfile =
						{
							"runOnMount":false,
							"easing":"linear",
							"duration":0,
							"animation":
							{
								"opacity":0
							},
							"progress":(elements, complete, remaining, start, tweenValue)=>
							{
								// empty
							},
							"complete":(event)=>
							{
								let glideableResetState =
									_.merge(_.cloneDeep(scopeProxy.state),
									{
										"Portal":
										{
											"Velocity":
											{
												"Profile":
												{
													[childId]:null
												}
											}
										},
										"Drag":
										{
											"Location":
											{
												"Delta":
												{
													"X":0,
													"Y":0
												},
												"Previous":
												{
													"X":completeLocationX,
													"Y":completeLocationY
												}
											}
										}
									});
								//
								window.requestAnimationFrame(()=>
								{
									scopeProxy.setState(glideableResetState);
									scopeProxy.state.Bounds.Glide.Complete(childElement);
								});
							}
						}
					//
					Object.assign(scopeProxy.state.Drag.Profile[childIndex],
					{
						"disabled":false,
						"position":
						{
							"x":completeLocationX,
							"y":completeLocationY
						}
					});
					let glideableCompleteState =
						_.merge(_.cloneDeep(scopeProxy.state),
						{
							"Portal":
							{
								"Velocity":
								{
									"Profile":
									{
										[childId]:glideableCompleteProfile
									}
								}
							},
							"Drag":
							{
								"Location":
								{
									"Delta":
									{
										"X":0,
										"Y":0
									},
									"Previous":
									{
										"X":completeLocationX,
										"Y":completeLocationY
									}
								}
							}
						});
					//
					Object.assign(childElement.style,
					{
						"transform":glideableCompleteTransform
					});
					window.requestAnimationFrame(()=>
					{
						scopeProxy.setState(glideableCompleteState);
					});
				}
			}
		//
		if(glideDuration > 0)
		{
			Object.assign(scopeProxy.state.Drag.Profile[childIndex],
			{
				"disabled":true
			});
		}
		let adjustedState =
			_.merge(_.cloneDeep(scopeProxy.state),
			{
				"Portal":
				{
					"Velocity":
					{
						"Profile":
						{
							[childId]:glideableProfile
						}
					}
				},
				"Drag":
				{
					"Location":
					{
						"Delta":
						{
							"X":0,
							"Y":0
						},
						"Previous":
						{
							"X":adjustedLocationX,
							"Y":adjustedLocationY
						}
					}
				}
			});
		//
		scopeProxy.reportDragStop(childElement);
		//
		if(glideDuration > 0)
		{
			scopeProxy.setState(adjustedState);
			scopeProxy.state.Bounds.Glide.Start(childElement);
		}
	}
	resetGlideableElements()
	{
		let scopeProxy
			= this;
		let totalChildren
			= scopeProxy.props.children.length;
		let childCount
			= 0;
		//
		let resetChild =
			(childIndex)=>
			{
				let childId
					= (scopeProxy.props.children[childIndex] !== undefined)
					? scopeProxy.props.children[childIndex].props.id
					: null;
				let portalId
					= childId.concat("_glideable-child");
				let childElement
					= document.getElementById(childId);
				let portalElement
					= document.getElementById(portalId);
				//
				let childMatrixRegExp
					= new RegExp(/\(([^)]+)\)/g);
				let childTransformMatrix
					= window.getComputedStyle(childElement, null).getPropertyValue("transform");
				let childMatrixSegments
					= (childTransformMatrix !== "none")
					? childMatrixRegExp.exec(childTransformMatrix)[1].split(", ")
					: null;
				let currentLocationX
					= (childMatrixSegments !== null)
					? parseFloat(childMatrixSegments[4])
					: 0;
				let currentLocationY
					= (childMatrixSegments !== null)
					? parseFloat(childMatrixSegments[5])
					: 0;
				//
				let deltaMotionX
					= currentLocationX;
				let deltaMotionY
					= currentLocationY;
				//
				let glideDeltaX
					= -deltaMotionX;
				let glideDeltaY
					= -deltaMotionY;
				let glideableLocationX
					= (deltaMotionX !== 0)
					? glideDeltaX
					+ currentLocationX
					: currentLocationX;
				let glideableLocationY
					= (deltaMotionY !== 0)
					? glideDeltaY
					+ currentLocationY
					: currentLocationY;
				//
				Object.assign(scopeProxy.state.Drag.Profile[childIndex],
				{
					"disabled":true,
					"position":
					{
						"x":glideableLocationX,
						"y":glideableLocationY
					}
				});
				let glideableTransform
					= "translateX(".concat(glideableLocationX.toString(),
					"px) translateY(", glideableLocationY.toString(), "px)");
				//
				Object.assign(childElement.style,
				{
					"transform":glideableTransform
				});
				Object.assign(scopeProxy.state.Drag.Profile[childIndex],
				{
					"disabled":false
				});
				Object.assign(portalElement.style,
				{
					"z-index":1
				});
				let adjustedState =
					_.merge(_.cloneDeep(scopeProxy.state),
					{
						"Drag":
						{
							"Location":
							{
								"Delta":
								{
									"X":0,
									"Y":0
								},
								"Previous":
								{
									"X":glideableLocationX,
									"Y":glideableLocationY
								}
							}
						}
					});
				//
				scopeProxy.setState(adjustedState);
				//
				delete scopeProxy.state.Drag.Profile[childIndex].position;
				//
				if(childIndex < totalChildren - 1)
				{
					childIndex++;
					//
					window.requestAnimationFrame(()=>
					{
						resetChild(childIndex);
					});
				}
				else
				{
					scopeProxy.state.Portal.Reset.All.Complete(scopeProxy.props.children);
				}
			}
		//
		resetChild(0);
	}
	resetGlideableElement(childIndex)
	{
		let scopeProxy
			= this;
		let childId
			= this.props.children[childIndex].props.id;
		let childElement
			= document.getElementById(childId);
		//
		let childMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let childTransformMatrix
			= window.getComputedStyle(childElement, null).getPropertyValue("transform");
		let childMatrixSegments
			= (childTransformMatrix !== "none")
			? childMatrixRegExp.exec(childTransformMatrix)[1].split(", ")
			: null;
		let currentLocationX
			= (childMatrixSegments !== null)
			? parseFloat(childMatrixSegments[4])
			: 0;
		let currentLocationY
			= (childMatrixSegments !== null)
			? parseFloat(childMatrixSegments[5])
			: 0;
		//
		let deltaMotionX
			= currentLocationX;
		let deltaMotionY
			= currentLocationY;
		//
		let glideableProfile =
			{
				"runOnMount":false,
				"easing":scopeProxy.state.Bounds.Glide.Easing,
				"duration":scopeProxy.state.Bounds.Glide.Duration,
				"animation":
				{
					"opacity":1
				},
				"begin":(event)=>
				{
					//empty
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity.
					//
					let progressValue
						= (parseFloat(elements[0].style.opacity) > 0)
						? parseFloat(elements[0].style.opacity)
						: 0;
					let glideDeltaX
						= progressValue * -deltaMotionX;
					let glideDeltaY
						= progressValue * -deltaMotionY;
					let glideableLocationX
						= (deltaMotionX !== 0)
						? glideDeltaX
						+ currentLocationX
						: currentLocationX;
					let glideableLocationY
						= (deltaMotionY !== 0)
						? glideDeltaY
						+ currentLocationY
						: currentLocationY;
					let glideableTransform
						= "translateX(".concat(glideableLocationX.toString(),
						"px) translateY(", glideableLocationY.toString(), "px)");
					//
					Object.assign(childElement.style,
					{
						"transform":glideableTransform
					});
				},
				"complete":(event)=>
				{
					let childElement
						= document.getElementById(childId);
					let portalMatrixRegExp
						= new RegExp(/\(([^)]+)\)/g);
					let portalTransformMatrix
						= window.getComputedStyle(childElement, null).getPropertyValue("transform");
					let portalMatrixSegments
						= (portalTransformMatrix !== "none")
						? portalMatrixRegExp.exec(portalTransformMatrix)[1].split(", ")
						: null;
					let completeLocationX
						= (portalMatrixSegments !== null)
						? parseFloat(portalMatrixSegments[4])
						: 0;
					let completeLocationY
						= (portalMatrixSegments !== null)
						? parseFloat(portalMatrixSegments[5])
						: 0;
					let glideableCompleteTransform
						= "translateX(".concat(completeLocationX.toString(),
						"px) translateY(", completeLocationY.toString(), "px)");
					//
					let glideableCompleteProfile =
						{
							"runOnMount":false,
							"easing":"linear",
							"duration":0,
							"animation":
							{
								"opacity":0
							},
							"progress":(elements, complete, remaining, start, tweenValue)=>
							{
								// empty
							},
							"complete":(event)=>
							{
								let glideableResetState =
									_.merge(_.cloneDeep(scopeProxy.state),
									{
										"Portal":
										{
											"Velocity":
											{
												"Profile":
												{
													[childId]:null
												}
											}
										},
										"Drag":
										{
											"Location":
											{
												"Delta":
												{
													"X":0,
													"Y":0
												},
												"Previous":
												{
													"X":completeLocationX,
													"Y":completeLocationY
												}
											}
										}
									});
								//
								window.requestAnimationFrame(()=>
								{
									scopeProxy.setState(glideableResetState);
									//
									scopeProxy.state.Portal.Reset.Item.Complete(childElement);
								});
							}
						}
					//
					Object.assign(scopeProxy.state.Drag.Profile[childIndex],
					{
						"disabled":false,
						"position":
						{
							"x":completeLocationX,
							"y":completeLocationY
						}
					});
					let glideableCompleteState =
						_.merge(_.cloneDeep(scopeProxy.state),
						{
							"Portal":
							{
								"Velocity":
								{
									"Profile":
									{
										[childId]:glideableCompleteProfile
									}
								}
							},
							"Drag":
							{
								"Location":
								{
									"Delta":
									{
										"X":0,
										"Y":0
									},
									"Previous":
									{
										"X":completeLocationX,
										"Y":completeLocationY
									}
								}
							}
						});
					//
					Object.assign(childElement.style,
					{
						"transform":glideableCompleteTransform
					});
					window.requestAnimationFrame(()=>
					{
						scopeProxy.setState(glideableCompleteState);
					});
				}
			}
		//
		Object.assign(scopeProxy.state.Drag.Profile[childIndex],
		{
			"disabled":true
		});
		let adjustedState =
			_.merge(_.cloneDeep(scopeProxy.state),
			{
				"Portal":
				{
					"Velocity":
					{
						"Profile":
						{
							[childId]:glideableProfile
						}
					}
				},
				"Drag":
				{
					"Location":
					{
						"Delta":
						{
							"X":0,
							"Y":0
						},
						"Previous":
						{
							"X":currentLocationX,
							"Y":currentLocationY
						}
					}
				}
			});
		//
		scopeProxy.setState(adjustedState);
		//
		scopeProxy.focusGlideableItem(itemId);
	}
	focusGlideableItem(elementId)
	{
		let scopeProxy
			= this;
		let stackElement
			= document.getElementById(elementId.concat("_glideable-child"));
		let highestZindex
			= 1;
		//
		scopeProxy.props.children.map((childItem)=>
		{
			let portalitemId
				= childItem.props.id.concat("_glideable-child");
			let portalElement
				= document.getElementById(portalitemId);
			//
			let glideableItemZindex
				= (!isNaN(parseInt(portalElement.style.zIndex)))
				? parseInt(portalElement.style.zIndex)
				: 0;
			//
			highestZindex
			= (glideableItemZindex > highestZindex)
			? glideableItemZindex
			: highestZindex;
		});
		Object.assign(stackElement.style,
		{
			"z-index":(highestZindex + 1)
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}