/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";

class Main extends React.Component {
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                        return (
                           <div className={'my-extension'}>
                               <div className={'cfc-header'}>
                                  <p>Community Fact Checker</p>
                               </div>

                               <div className={'cfc-pageHighlights'}>
                                 <p>Current Page: BBC News</p>
                                 <p># Positive Flags: 0</p>
                                 <p># Negative Flags: 0</p>
                               </div>

                               <div className={'cfc-dispute-negative'}>
                                  <p>Disputed by Matthew Morrison (Chief Admin)</p>
                                  <hr/>
                                  <p>This number is actually not correct. If you look at the medical data for 2017 (source)
                                    you can very clearly see that this number is under dispute.</p>
                               </div>
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}