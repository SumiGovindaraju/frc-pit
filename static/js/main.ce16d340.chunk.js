(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,n){e.exports=n(49)},28:function(e,t,n){},30:function(e,t,n){},32:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(20),c=n.n(l),o=(n(28),n(30),n(32),n(2)),i=n(3),s=n(5),u=n(4),m=n(6),d=n(7),h=n.n(d),f=(n(14),function(e){function t(e){var n;return Object(o.a)(this,t),n=Object(s.a)(this,Object(u.a)(t).call(this,e)),h.a.auth().onAuthStateChanged(function(e){if(e&&e.displayName){var t=document.createElement("li");t.classList.add("nav-item");var n=document.createElement("a");n.classList.add("nav-link"),n.classList.add("sign-out"),n.innerHTML="Sign out "+e.displayName,n.href="/frc-pit/#/sign_out",t.appendChild(n),document.getElementsByClassName("sign-out-ul")[0].appendChild(t)}}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=document.createElement("script"),t=document.createTextNode("\n      $(document).ready(function () {\n        $('.set-team-number-and-event-btn').click(function () {\n          setTeamNumberAndEvent();\n        });\n      });\n    ");e.appendChild(t),document.body.appendChild(e)}},{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("a",{className:"navbar-brand",href:"/frc-pit"},"FRC Pit"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarText"},r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/frc-pit"},r.a.createElement("i",{className:"fa fa-home","aria-hidden":"true"})," Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/frc-pit/#/tools_list"},r.a.createElement("i",{className:"fa fa-wrench","aria-hidden":"true"})," Tools List")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/frc-pit/#/check_out_tool"},r.a.createElement("i",{className:"fa fa-plus","aria-hidden":"true"})," Check Out Tool")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"/frc-pit/#/stats"},r.a.createElement("i",{className:"fa fa-chart-area","aria-hidden":"true"})," Stats"))),r.a.createElement("form",{className:"form-inline settings",style:{display:"none"}},r.a.createElement("select",{className:"form-control mr-sm-2 settings-event"}),r.a.createElement("input",{className:"form-control mr-sm-2 settings-team",placeholder:"Team Number",type:"number"}),r.a.createElement("input",{type:"button",className:"btn btn-success set-team-number-and-event-btn my-2 my-sm-0",value:"\u2713"})),r.a.createElement("ul",{className:"navbar-nav ml-auto sign-out-ul"}))))}}]),t}(a.Component)),p=n(53),b=n(51),v=n(52),E=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"tab-pane fade show active schedule",id:"schedule",role:"tabpanel"},r.a.createElement("h1",{className:"no-schedule",style:{display:"none"}},"No Schedule"),r.a.createElement("table",{className:"table table-bordered",id:"schedule-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Match"),r.a.createElement("th",{colSpan:"3"},"Red Alliance"),r.a.createElement("th",{colSpan:"3"},"Blue Alliance"),r.a.createElement("th",{colSpan:"2"},"Scores"))),r.a.createElement("tbody",null)))}}]),t}(a.Component),g=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"tab-pane fade rankings",id:"rankings",role:"tabpanel"},r.a.createElement("h1",{className:"no-rankings",style:{display:"none"}},"No Rankings"),r.a.createElement("table",{className:"table table-striped table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Rank"),r.a.createElement("th",null,"Team"),r.a.createElement("th",null,"Ranking Score"),r.a.createElement("th",null,"Record (W-L-T)"),r.a.createElement("th",null,"Played"),r.a.createElement("th",null,"Total RP"))),r.a.createElement("tbody",null)))}}]),t}(a.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"schedule-rankings"},r.a.createElement("ul",{className:"nav nav-tabs",role:"tablist"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link active","data-toggle":"tab",href:"#schedule",role:"tab"},"Schedule")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link","data-toggle":"tab",href:"#rankings",role:"tab"},"Rankings"))),r.a.createElement("div",{className:"tab-content"},r.a.createElement(E,null),r.a.createElement(g,null)))}}]),t}(a.Component),O=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"webcasts"},r.a.createElement("h1",{className:"no-internet",style:{display:"none"}},"Offline: Cannot Access Webcasts"),r.a.createElement("h1",{className:"no-webcasts",style:{display:"none"}},"No Webcasts"),r.a.createElement("ul",{className:"nav nav-tabs",role:"tablist"}),r.a.createElement("div",{className:"tab-content"}))}}]),t}(a.Component),j=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"awards"},r.a.createElement("h1",{className:"no-awards",style:{display:"none"}},"No Awards"),r.a.createElement("h1",null,"Awards"),r.a.createElement("ul",null))}}]),t}(a.Component),N=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"countdown"},r.a.createElement("h1",{className:"no-countdown",style:{display:"none"}},"No Match Coming Up"),r.a.createElement("h1",{className:"countdown-timer-tag text-danger",style:{textAlign:"center",fontSize:"4.5em"}},"\xa0"),r.a.createElement("h2",{style:{textAlign:"center"}},"Until "))}}]),t}(a.Component),w=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=document.createElement("script"),t=document.createTextNode('\n      $(document).ready(function() {    \n        $(".schedule-rankings").hide();\n        $(".webcasts").hide();\n        $(".awards").hide();\n        $(".countdown").hide();\n        $(".settings").show();\n        $(".no-team-event-selected").show();\n\n        $("body").tooltip({selector: \'[data-toggle=tooltip]\'});\n\n        if (getUrlVars()["team"] !== undefined) {\n          team = getUrlVars()["team"];\n        }\n\n        if (getUrlVars()["event"] !== undefined) {\n          event = getUrlVars()["event"];\n        }\n        \n        $(\'form input\').keydown(function(event){\n          if(event.keyCode == 13) {\n            event.preventDefault();\n            return false;\n          }\n        });\n\n        renderListOfEvents();\n\n        if (event) {\n          render(true);\n        }\n    \n        setInterval(function() {\n          if (event) {\n            render(false);\n          }\n        }, 120000); // Attempt to render every 2 minutes no matter what\n      });\n    ');e.appendChild(t),document.body.appendChild(e)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{className:"no-team-event-selected",style:{textAlign:"center"}},"No Event/Team selected"),r.a.createElement("h1",{className:"loading",style:{textAlign:"center",display:"none"}},"Loading..."),r.a.createElement(y,null),r.a.createElement(O,null),r.a.createElement(j,null),r.a.createElement(N,null))}}]),t}(a.Component),k=n(9),C=n(21),x=n.n(C),T=(new RegExp("[?|&]redirect=([^&;]+?)(&|#|;|$)").exec(window.location.href)||[null,""])[1].replace(/\+/g,"%20"),U=function(e){function t(e){var n;Object(o.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={shouldRender:!1,uiConfig:{signInFlow:"popup",signInSuccessUrl:"/frc-pit"+"/#/signed_in?redirect=".concat(T),signInOptions:[h.a.auth.GoogleAuthProvider.PROVIDER_ID,h.a.auth.GithubAuthProvider.PROVIDER_ID,h.a.auth.EmailAuthProvider.PROVIDER_ID,{provider:h.a.auth.PhoneAuthProvider.PROVIDER_ID,recaptchaParameters:{type:"image",size:"normal",badge:"bottomleft"},defaultCountry:"US"}]}};var a=Object(k.a)(Object(k.a)(n));return console.log(T),h.a.auth().onAuthStateChanged(function(e){e?window.location.href="/frc-pit"+"/#/signed_in?redirect=".concat(T):a.setState({shouldRender:!0})}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return this.state.shouldRender?r.a.createElement(x.a,{uiConfig:this.state.uiConfig,firebaseAuth:h.a.auth()}):null}}]),t}(a.Component),R=(n(16),function(e){function t(e){var n;Object(o.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).returnTool=n.returnTool.bind(Object(k.a)(Object(k.a)(n))),n.state={currentUser:null};var a=Object(k.a)(Object(k.a)(n));return h.a.auth().onAuthStateChanged(function(e){e?a.setState({currentUser:e}):window.location.href="/frc-pit/#/auth?redirect="+encodeURIComponent(window.location.href)}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"returnTool",value:function(e){null!=this.state.currentUser?(document.getElementsByClassName("error-alert-div")[0].style.display="none",h.a.firestore().collection("users").doc(this.state.currentUser.uid).collection("tools").doc(e).delete()):alert("No current user")}},{key:"render",value:function(){var e=this;return r.a.createElement("tr",null,r.a.createElement("td",null,this.props.name),r.a.createElement("td",null,this.props.team),r.a.createElement("td",null,this.props.time),r.a.createElement("td",null,this.props.tool),r.a.createElement("td",null,r.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:function(){return e.returnTool(e.props.index)}},"Return")))}}]),t}(a.Component)),A=function(e){function t(e){var n;Object(o.a)(this,t),n=Object(s.a)(this,Object(u.a)(t).call(this,e)),h.a.firestore().settings({timestampsInSnapshots:!0}),n.state={shouldRender:!1,tools:[],team_number:null};var a=Object(k.a)(Object(k.a)(n));return h.a.auth().onAuthStateChanged(function(e){e?(a.setState({currentUser:e}),h.a.firestore().collection("users").doc(a.state.currentUser.uid).collection("tools").onSnapshot(function(e){var t=[];for(var n in e.docs)t.push({key:e.docs[n].id,name:e.docs[n].get("name"),team_number:e.docs[n].get("team_number"),checkout_time:e.docs[n].get("checkout_time").toDate().toLocaleString(),description:e.docs[n].get("description")});a.setState({tools:t})},function(e){console.error(e)}),h.a.firestore().collection("users").doc(a.state.currentUser.uid).get().then(function(e){a.setState({team_number:e.get("team")})}),a.setState({shouldRender:!0})):window.location.href="/frc-pit/#/auth?redirect="+encodeURIComponent(window.location.href)}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){if(this.state.shouldRender){var e;return e=this.state.tools.map(function(e){var t=e.key,n=e.name,a=e.team_number,l=e.checkout_time,c=e.description;return r.a.createElement(R,{key:t,index:t,name:n,team:a,time:l,tool:c})}),r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"center"}},null==this.state.team_number?"Loading...":"Tools Checked Out from Team "+this.state.team_number+":"),r.a.createElement("table",{className:"table-striped table-bordered tools-list",style:{width:"98%",maxWidth:"98%",margin:"1%"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Team Number"),r.a.createElement("th",null,"Checkout Date"),r.a.createElement("th",null,"Tool"),r.a.createElement("th",null,"Return"))),r.a.createElement("tbody",null,e)))}return null}}]),t}(a.Component),S=function(e){function t(e){var n;Object(o.a)(this,t),n=Object(s.a)(this,Object(u.a)(t).call(this,e)),h.a.firestore().settings({timestampsInSnapshots:!0}),n.addTool=n.addTool.bind(Object(k.a)(Object(k.a)(n))),n.state={shouldRender:!1,currentUser:null};var a=Object(k.a)(Object(k.a)(n));return h.a.auth().onAuthStateChanged(function(e){e?(a.setState({currentUser:e}),h.a.firestore().collection("users").doc(a.state.currentUser.uid).get().then(function(e){a.setState({team_number:e.get("team")})}),a.setState({shouldRender:!0})):window.location.href="/frc-pit/#/auth?redirect="+encodeURIComponent(window.location.href)}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"addTool",value:function(){var e=document.getElementById("name").value,t=document.getElementById("tool").value,n=document.getElementById("team-number").value;""!==e&&""!==t&&""!==n?null!=this.state.currentUser?(h.a.firestore().collection("users").doc(this.state.currentUser.uid).collection("tools").add({name:e,description:t,checkout_time:new Date,team_number:parseInt(n,10)}),document.getElementById("name").value="",document.getElementById("tool").value="",document.getElementById("team-number").value="",document.getElementsByClassName("error-alert-div")[0].style.display="none"):alert("No current user"):alert("Error: All fields must be filled.")}},{key:"render",value:function(){return this.state.shouldRender?r.a.createElement("div",null,r.a.createElement("h2",{style:{textAlign:"center"}},null==this.state.team_number?"Loading...":"Check Out Tool from Team "+this.state.team_number+":"),r.a.createElement("form",{className:"add-tool-container",style:{width:"98%",margin:"1%"}},r.a.createElement("p",null,"Name:"),r.a.createElement("input",{className:"form-control",id:"name",placeholder:"Name",type:"text"}),r.a.createElement("p",null,"Tool:"),r.a.createElement("input",{className:"form-control",id:"tool",placeholder:"Tool",type:"text"}),r.a.createElement("p",null,"Team Number:"),r.a.createElement("input",{className:"form-control",id:"team-number",placeholder:"Team Number",type:"number"}),r.a.createElement("div",{className:"btn btn-primary add-tool-btn",onClick:this.addTool},"Add Tool"))):null}}]),t}(a.Component),I=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{style:{textAlign:"center",marginTop:"1%"}},"404 Page Not Found:"),r.a.createElement("h3",{style:{textAlign:"center",marginTop:"1%"}},"This Page Does Not Exist"))}}]),t}(a.Component),$=decodeURIComponent((new RegExp("[?|&]redirect=([^&;]+?)(&|#|;|$)").exec(window.location.href)||[null,""])[1].replace(/\+/g,"%20")),_=function(e){function t(e){var n;Object(o.a)(this,t),n=Object(s.a)(this,Object(u.a)(t).call(this,e)),h.a.firestore().settings({timestampsInSnapshots:!0}),n.createUser=n.createUser.bind(Object(k.a)(Object(k.a)(n))),n.state={shouldRender:!1,currentUser:null};var a=Object(k.a)(Object(k.a)(n));return console.log($),h.a.auth().onAuthStateChanged(function(e){e?h.a.firestore().collection("users").doc(e.uid).get().then(function(t){t.exists?window.location.href=$:(a.setState({currentUser:e}),a.setState({shouldRender:!0}))}):window.location.href="/frc-pit/#/auth?redirect="+$}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"createUser",value:function(){var e=""!==document.getElementById("full-name").value?document.getElementById("full-name").value:this.state.currentUser.displayName,t=document.getElementById("team-number").value;""!==e&&null!==e&&""!==t?(document.getElementsByClassName("error-alert-div")[0].style.display="none",null!=this.state.currentUser&&(h.a.firestore().collection("users").doc(this.state.currentUser.uid).set({name:e,team:t}),this.state.currentUser.updateProfile({displayName:e}).then(function(){window.location.href=$}).catch(function(e){console.error(e)}))):alert("Error: All fields must be filled.")}},{key:"render",value:function(){return this.state.shouldRender?r.a.createElement("div",null,r.a.createElement("form",{className:"add-tool-container",style:{width:"98%",margin:"1%"}},r.a.createElement("p",null,"Full Name:"),r.a.createElement("input",{className:"form-control",id:"full-name",placeholder:null==this.state.currentUser.displayName?"Full name":this.state.currentUser.displayName,type:"text"}),r.a.createElement("p",null,"Team Number:"),r.a.createElement("input",{className:"form-control",id:"team-number",placeholder:"Team Number",type:"number"}),r.a.createElement("div",{className:"btn btn-primary add-tool-btn",onClick:this.createUser},"Create User"))):null}}]),t}(a.Component),P=function(e){function t(e){var n;return Object(o.a)(this,t),n=Object(s.a)(this,Object(u.a)(t).call(this,e)),h.a.auth().signOut().then(function(){window.location.href="/frc-pit"},function(e){console.error(e)}),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("h1",{className:"sign-out-header",style:{textAlign:"center"}},"Signing you out now.")}}]),t}(a.Component),B=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null)}}]),t}(a.Component),L=[{path:"/",component:w,exact:!0},{path:"/auth",component:U,exact:!0},{path:"/tools_list",component:A,exact:!0},{path:"/check_out_tool",component:S,exact:!0},{path:"/signed_in",component:_,exact:!0},{path:"/sign_out",component:P,exact:!0},{path:"/stats",component:function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=document.createElement("script"),t=document.createTextNode('\n      $(document).ready(function() {    \n        $(".rankings").addClass("show active");\n        $(".rankings").hide();\n        $(".settings").show();\n        $(".settings-team").hide();\n        $(".no-team-event-selected").show();\n\n        $("body").tooltip({selector: \'[data-toggle=tooltip]\'});\n\n        if (getUrlVars()["team"] !== undefined) {\n          team = getUrlVars()["team"];\n        }\n\n        if (getUrlVars()["event"] !== undefined) {\n          event = getUrlVars()["event"];\n        }\n        \n        $(\'form input\').keydown(function(event){\n          if(event.keyCode == 13) {\n            event.preventDefault();\n            return false;\n          }\n        });\n\n        renderListOfEvents();\n\n        if (event) {\n          verifyTeamInEvent(\n            async function () {\n              if (cache.events[event] === undefined) {\n                cache.events[event] = { "teams": {}, "awards": {}, "rankings": {}, "matches": {}, "webcasts": {} };\n              }\n    \n              if (team && cache.events[event].teams[team] === undefined) {\n                cache.events[event].teams[team] = { "awards": {}, "matches": {} };\n              }\n\n              $(".no-team-event-selected").hide();\n              $(".loading").show();\n    \n              document.title = "FRC Pit | " + (team ? team.substring(3) + " @ " : "") + event;\n\n              await updateAPIs();\n              \n              $(".loading").hide();\n              $(".no-team-event-selected").hide();\n              $(".rankings").show();\n\n              renderRankings();\n            }, async function () {\n              $(".loading").hide();\n              $(".no-team-event-selected").show();\n              $(".rankings").hide();\n            }\n          );\n        }\n    \n        setInterval(async function() {\n          if (event) {\n            await updateAPIs();\n            renderRankings(false);\n          }\n        }, 120000); // Attempt to render every 2 minutes no matter what\n      });\n    ');e.appendChild(t),document.body.appendChild(e)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{className:"no-team-event-selected",style:{textAlign:"center"}},"No Event/Team selected"),r.a.createElement("h1",{className:"loading",style:{textAlign:"center",display:"none"}},"Loading..."),r.a.createElement(g,null),r.a.createElement(B,null))}}]),t}(a.Component),exact:!0},{component:I,exact:!0}],D=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e;return e=L.map(function(e,t){var n=e.path,a=e.component,l=e.exact;return r.a.createElement(p.a,{key:t,exact:l,path:n,component:a})}),r.a.createElement("main",{role:"main"},r.a.createElement(b.a,{basename:"/frc-pit"},r.a.createElement(v.a,null,e)),r.a.createElement("div",{className:"error-alert-div",style:{display:"none"}},r.a.createElement("div",{className:"btn btn-danger btn-lg error-alert"})))}}]),t}(a.Component),V=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f,null),r.a.createElement(D,null))}}]),t}(a.Component),W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function F(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}h.a.apps.length||h.a.initializeApp({apiKey:"AIzaSyBbB47QbfJXsEViiCqwYUjWQLw0KNpROCc",authDomain:"frc-pit-5cb1f.firebaseapp.com",databaseURL:"https://frc-pit-5cb1f.firebaseio.com",projectId:"frc-pit-5cb1f"}),c.a.render(r.a.createElement(V,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/frc-pit",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/frc-pit","/service-worker.js");W?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):F(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):F(e)})}}()}},[[23,2,1]]]);
//# sourceMappingURL=main.ce16d340.chunk.js.map