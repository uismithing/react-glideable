import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Glideable from "react-glideable";
//
import {fetchGlideableHtml} from "../actions/actions";
import {fetchGlideablePropsexampleJs} from "../actions/actions";
import {fetchGlideableMethodsexampleJs} from "../actions/actions";
import {fetchGlideablePropsDemoexampleJson} from "../actions/actions";
import {fetchGlideableCssDemoexampleCss} from "../actions/actions";
import {fetchGlideableDeployexampleHtml} from "../actions/actions";
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
		let setViewLoaded
			= scopeProxy.context.setViewLoaded;
		let setLayoutMode
			= scopeProxy.context.setLayoutMode;
		let updateNavigationState
			= scopeProxy.context.updateNavigationState;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			// Updating the section index this way lets the
			// state of the nagigation cluster fully initialize
			// before the activeKey value is updated. This is
			// necessary for it to be possible to navigate
			// back to the wares section from within a component
			// landing page when the component landing page is
			// directly accessed via the url bar in the browser.
			updateNavigationState(navigationSection);
		});
		let setviewTimeout =
			setTimeout(function()
			{
				setViewLoaded(true);
				setLayoutMode("full");
			},
			500);
		//
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
function mapAxiosstateToReactprops(axiosState)
{
	// This function is only called when the axios
	// response updates the application state. Once
	// this function is called, the component state
	// is updated which causes the render() function
	// to execute.
	return(
	{
		// When the application state (state.posts.all) is
		// updated by the axios promise, the promise response
		// is assigned the component state this.content.posts.
		"html":axiosState.content.html,
		"glideablePropsexampleJs":axiosState.content.glideablePropsexampleJs,
		"glideableMethodsexampleJs":axiosState.content.glideableMethodsexampleJs,
		"glideablePropsDemoexampleJson":axiosState.content.glideablePropsDemoexampleJson,
		"glideableCssDemoexampleCss":axiosState.content.glideableCssDemoexampleCss,
		"glideableDeployexampleHtml":axiosState.content.glideableDeployexampleHtml
	});
}
export default connect(mapAxiosstateToReactprops,
{
	"fetchGlideableHtml":fetchGlideableHtml,
	"fetchGlideablePropsexampleJs":fetchGlideablePropsexampleJs,
	"fetchGlideableMethodsexampleJs":fetchGlideableMethodsexampleJs,
	"fetchGlideablePropsDemoexampleJson":fetchGlideablePropsDemoexampleJson,
	"fetchGlideableCssDemoexampleCss":fetchGlideableCssDemoexampleCss,
	"fetchGlideableDeployexampleHtml":fetchGlideableDeployexampleHtml
})(GlideableLanding);