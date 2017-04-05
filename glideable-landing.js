import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Glideable from "react-glideable";
//
import {fetchGlideableHtml} from "../actions/actions_glideable-landing";
import {fetchGlideablePropsexampleJs} from "../actions/actions_glideable-landing";
import {fetchGlideableMethodsexampleJs} from "../actions/actions_glideable-landing";
import {fetchGlideablePropsDemoexampleJson} from "../actions/actions_glideable-landing";
import {fetchGlideableCssDemoexampleCss} from "../actions/actions_glideable-landing";
import {fetchGlideableDeployexampleHtml} from "../actions/actions_glideable-landing";
//
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class GlideableLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		this.props.fetchGlideableHtml();
		this.props.fetchGlideablePropsexampleJs();
		this.props.fetchGlideableMethodsexampleJs();
		this.props.fetchGlideablePropsDemoexampleJson();
		this.props.fetchGlideableCssDemoexampleCss();
		this.props.fetchGlideableDeployexampleHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			let updateNavigationState
				= scopeProxy.props.updateNavigationstateAction;
			let setViewLoaded
				= scopeProxy.props.setViewLoadedAction;
			let setLayoutMode
				= scopeProxy.props.setLayoutModeAction;
			//
			let setviewTimeout =
				setTimeout(function()
				{
					setViewLoaded(true);
					setLayoutMode("full");
					updateNavigationState(navigationSection);
				},
				500);
			//
		});
		this.addListeners();
		//
		updateState(scopeProxy,
		{
			"Ready":false
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
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let glideableHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let glideablePropsDemoExample
			= (scopeProxy.props.glideablePropsexampleJs !== undefined
			&& scopeProxy.props.glideablePropsexampleJs !== null)
			? scopeProxy.props.glideablePropsexampleJs
			: "loading...";
		let glideableMethodsDemoExample
			= (scopeProxy.props.glideableMethodsexampleJs !== undefined
			&& scopeProxy.props.glideableMethodsexampleJs !== null)
			? scopeProxy.props.glideableMethodsexampleJs
			: "loading...";
		let glideablePropsExample
			= (scopeProxy.props.glideablePropsDemoexampleJson !== undefined
			&& scopeProxy.props.glideablePropsDemoexampleJson !== null)
			? scopeProxy.props.glideablePropsDemoexampleJson
			: "loading...";
		let glideableCssDemoExample
			= (scopeProxy.props.glideableCssDemoexampleCss !== undefined
			&& scopeProxy.props.glideableCssDemoexampleCss !== null)
			? scopeProxy.props.glideableCssDemoexampleCss
			: "loading...";
		let glideableDeployExample
			= (scopeProxy.props.glideableDeployexampleHtml !== undefined
			&& scopeProxy.props.glideableDeployexampleHtml !== null)
			? scopeProxy.props.glideableDeployexampleHtml
			: "loading...";
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"glideable",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		let glideableProfile =
			{
				"Bounds":"#glideable-host-container",
				"Glide":
				{
					"Axis":"both",
					"Duration":500,
					"Easing":"easeOutQuad",
					"Start":scopeProxy.glideStart,
					"Progress":scopeProxy.glideProgress,
					"Complete":scopeProxy.glideComplete
				},
				"Drag":
				{
					"Start":scopeProxy.elementDragStart.bind(scopeProxy),
					"Stop":scopeProxy.elementDragStop.bind(scopeProxy),
					"Dragging":scopeProxy.elementDragging.bind(scopeProxy)
				},
				"Reset":
				{
					"All":
					{
						"Complete":scopeProxy.glideableResetComplete
					},
					"Item":
					{
						"Complete":scopeProxy.glideableItemResetComplete
					}
				},
				"Ready":scopeProxy.glideableReady
			}
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":glideableHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={glideablePropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let glideablesampleRef = this.refs.linearyaxis;"}/>
								<hr/>
								<Highlight lang="js" value={glideableMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={glideablePropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={glideableCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-glideable -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Glideable from 'react-glideable';"}/>
								<hr/>
								<Highlight lang="html" value={glideableDeployExample}/>
							</Panel>
						</div>
						<div id="glideable-showcase-container" ref="glideableshowcase" className="glideable-showcase">
							<div id="glideable-heading-container" ref="glideableheading" className="glideable-heading">
								<div id="glideable-heading-headline-container" ref="glideableheadingheadline" className="glideable-heading-headline">
									Demo
								</div>
							</div>
							<div id="glideable-sandbox-container" className="glideable-sandbox">
								<Button id="glideable-resetbutton-container" className="glideable-reset-button" onClick={scopeProxy.glideableReset.bind(this)}>Reset</Button>
								<div id="glideable-host-container" className="glideable-host">
									<Glideable id="glideable-surface-container" ref="glideablesurface" {...glideableProfile} className="glideable-surface">
										<div id="glideable-item_1-container" className="glideable-item_1"></div>
										<div id="glideable-item_2-container" className="glideable-item_2"></div>
										<div id="glideable-item_3-container" className="glideable-item_3"></div>
										<div id="glideable-item_4-container" className="glideable-item_4"></div>
										<div id="glideable-item_5-container" className="glideable-item_5"></div>
									</Glideable>
								</div>
							</div>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Glideable Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	addListeners()
	{
		// empty
	}
	glideableReset()
	{
		let glideablesurfaceRef
			= this.refs.glideablesurface;
		//
		glideablesurfaceRef.resetGlideableElements();
	}
	glideableReady(event)
	{
		//console.log("----- glideableReady:", event);
	}
	elementDragStart(dragElement)
	{
		//console.log("----- elementDragStart:", dragElement);
		ReactGA.event(
		{
		  "category":"glideable_action",
		  "action":"element_drag",
		  "label":"element-id_".concat(dragElement.id)
		});
	}
	elementDragging(dragElement)
	{
		//console.log("----- elementDragging:", dragElement);
	}
	elementDragStop(dragElement)
	{
		//console.log("----- elementDragStop:", dragElement);
	}
	glideStart(dragElement)
	{
		//console.log("----- glideStart:", dragElement);
	}
	glideProgress(dragElement)
	{
		//console.log("----- glideProgress:", dragElement);
	}
	glideComplete(dragElement)
	{
		//console.log("----- glideComplete:", dragElement);
		ReactGA.event(
		{
		  "category":"glideable_action",
		  "action":"element_glide",
		  "label":"element-id_".concat(dragElement.id)
		});
	}
	glideableResetComplete(event)
	{
		//console.log("----- glideableResetComplete:", event);
	}
	glideableItemResetComplete(event)
	{
		//console.log("----- glideableItemResetComplete:", event);
		ReactGA.event(
		{
		  "category":"glideable_action",
		  "action":"reset_elements",
		  "label":"reset_complete"
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			"transitionBody":PropTypes.func,
			"updateNavigationState":PropTypes.func,
			"setViewLoaded":PropTypes.func,
			"setLayoutMode":PropTypes.func
		}
	//
}
function mapReduxstateToProps(reduxState)
{
	return(
	{
		"html":reduxState.glideableReducer.html,
		"glideablePropsexampleJs":reduxState.glideableReducer.glideablePropsexampleJs,
		"glideableMethodsexampleJs":reduxState.glideableReducer.glideableMethodsexampleJs,
		"glideablePropsDemoexampleJson":reduxState.glideableReducer.glideablePropsDemoexampleJson,
		"glideableCssDemoexampleCss":reduxState.glideableReducer.glideableCssDemoexampleCss,
		"glideableDeployexampleHtml":reduxState.glideableReducer.glideableDeployexampleHtml,
		"setViewLoadedAction":reduxState.mainReducer.setViewloadedAction,
		"setLayoutModeAction":reduxState.mainReducer.setLayoutmodeAction,
		"updateNavigationstateAction":reduxState.navigationReducer.updateNavigationstateAction
	});
}
export default connect(mapReduxstateToProps,
{
	"fetchGlideableHtml":fetchGlideableHtml,
	"fetchGlideablePropsexampleJs":fetchGlideablePropsexampleJs,
	"fetchGlideableMethodsexampleJs":fetchGlideableMethodsexampleJs,
	"fetchGlideablePropsDemoexampleJson":fetchGlideablePropsDemoexampleJson,
	"fetchGlideableCssDemoexampleCss":fetchGlideableCssDemoexampleCss,
	"fetchGlideableDeployexampleHtml":fetchGlideableDeployexampleHtml
})(GlideableLanding);