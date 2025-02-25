(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9926:function(e,t,s){Promise.resolve().then(s.bind(s,1863))},1863:function(e,t,s){"use strict";s.d(t,{default:function(){return v}});var a=s(7437),n=s(2265);class i{static initialiseZeroArray(e,t){return this.createIterationArray(e,t)}static createIterationArray(e,t){let s=[];for(let a=0;a<e;a++)s[a]=Array(t).fill(!1);return s}static setStateOfPosition(e,t,s,a){return a[e][t]=s,a}static calculateNextIteration(e,t,s){let a=this.takeMatrixCopy(e),n=this.takeMatrixCopy(e);for(let e=0;e<t;e++)for(let i=0;i<s;i++){let l=0;e!=t-1&&i!=s-1&&a[e+1][i+1]&&l++,e!=t-1&&a[e+1][i]&&l++,e!=t-1&&0!=i&&a[e+1][i-1]&&l++,0!=e&&i!=s-1&&a[e-1][i+1]&&l++,0!=e&&a[e-1][i]&&l++,0!=e&&0!=i&&a[e-1][i-1]&&l++,i!=s-1&&a[e][i+1]&&l++,0!=i&&a[e][i-1]&&l++,a[e][i]?(l<2&&(n[e][i]=!n[e][i]),l>3&&(n[e][i]=!n[e][i])):3==l&&(n[e][i]=!n[e][i])}return n}static takeMatrixCopy(e){let t=[];for(let s=0;s<e.length;s++){t[s]=[];for(let a=0;a<e[s].length;a++)t[s][a]=e[s][a]}return t}static randomiseIteration(e,t){let s=[];for(let a=0;a<e;a++){s[a]=[];for(let e=0;e<t;e++)s[a][e]=.5>Math.random()}return s}static checkForActiveCells(e,t,s){for(let a=0;a<t;a++)for(let t=0;t<s;t++)if(e[a][t])return!0;return!1}static applyPattern(e,t,s,a){for(let n=0;n<e.size[1];n++)for(let i=0;i<e.size[0];i++)a[t+n][s+i]=e.pattern[n][i];return a}}var l=s(3322),r=s(4540),o=s(9357);function c(e){let t=e.squareState?"square-on":"square-off",s={width:"calc(100% / ".concat(e.numCols,")")},n=e.applyingPatternStyle?{borderRadius:e.numRows>8||e.numCols>8?"0.3rem":"1rem",borderWidth:e.numRows>8||e.numCols>8?"0.05rem":"0.2em"}:{borderRadius:e.numRows>8||e.numCols>8?"0.1rem":"0.15rem",borderWidth:(e.numRows>8||e.numCols,"0.05rem")};return(0,a.jsx)("div",{style:s,children:(0,a.jsx)("div",{style:n,className:"display-square "+t})})}function d(e){console.log(e);let t=e.isPlaying?"clicked-button":"";if(!e.isPatternSelected)return(0,a.jsxs)("div",{className:"control-wrapper",children:[(0,a.jsx)(l.Z,{title:"Info",children:(0,a.jsx)("button",{onClick:()=>e.openInfoDialog(),children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"info"})})}),(0,a.jsx)("div",{className:"title-wrapper",children:(0,a.jsx)("h1",{className:"title",children:"GAME OF LIFE"})}),(0,a.jsxs)("div",{className:"scrub-wrapper",children:[(0,a.jsx)(l.Z,{title:"Back Step",children:(0,a.jsx)("span",{children:(0,a.jsx)("button",{disabled:e.iterationsLength<2,onClick:()=>e.backClicked(),children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"first_page"})})})}),(0,a.jsx)(l.Z,{title:"Play/Pause",children:(0,a.jsx)("span",{children:(0,a.jsx)("button",{disabled:!e.activeCells||e.isSeqTerminated,className:t,onClick:()=>e.togglePlaying(),children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"play_pause"})})})}),(0,a.jsx)(l.Z,{title:"Next Step",children:(0,a.jsx)("span",{children:(0,a.jsx)("button",{disabled:!e.activeCells||e.isSeqTerminated,onClick:()=>e.goClicked(),children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"last_page"})})})})]}),(0,a.jsxs)("div",{className:"button-wrapper",children:[(0,a.jsx)(l.Z,{title:"Randomise Grid",children:(0,a.jsx)("span",{children:(0,a.jsxs)("button",{disabled:e.isPlaying,onClick:()=>e.randomise(),children:[(0,a.jsx)("span",{className:"material-symbols-outlined casino-logo-spacing",children:"casino"}),(0,a.jsx)("p",{children:"Randomise"})]})})}),(0,a.jsx)(l.Z,{title:"Empty Grid",children:(0,a.jsx)("span",{children:(0,a.jsxs)("button",{disabled:!e.activeCells||e.isPlaying,onClick:()=>e.clear(),children:[(0,a.jsx)("span",{className:"material-symbols-outlined casino-logo-spacing",children:"check_box_outline_blank"}),(0,a.jsx)("p",{children:"Clear"})]})})})]}),(0,a.jsxs)("div",{className:"row-col-controls-wrapper",children:[(0,a.jsx)("div",{className:"flexy",children:(0,a.jsx)("p",{id:"row-para",children:"Rows (1-100):"})}),(0,a.jsx)("input",{id:"row-input",type:"number",min:0,max:100,value:e.numRows,onChange:t=>e.numRowsChanged(t.target.value)}),(0,a.jsx)("div",{className:"flexy",children:(0,a.jsx)("p",{id:"col-para",children:"Columns (1-100):"})}),(0,a.jsx)("input",{id:"col-input",type:"number",min:0,max:100,value:e.numCols,onChange:t=>e.numColsChanged(t.target.value)})]}),(0,a.jsx)("div",{className:"button-wrapper",children:(0,a.jsx)(l.Z,{title:"Pick a pattern to add to the grid",children:(0,a.jsxs)("button",{onClick:()=>e.openPatternsDialog(),children:[(0,a.jsx)("span",{className:"material-symbols-outlined casino-logo-spacing",children:"rocket_launch"}),"Add Patterns"]})})}),(0,a.jsx)("div",{className:"flexy-info",style:{marginTop:"1rem"},children:(0,a.jsx)(l.Z,{title:"Terminate sequence if sequence is repeating",children:(0,a.jsx)(r.Z,{control:(0,a.jsx)(o.Z,{value:e.terminateSequence,onChange:()=>e.toggleTerminateSequence(),id:"toggle-term-seq"}),label:"Terminate Sequence"})})})]});{console.log("here");let t=function(e,t){let s=[];for(let i=0;i<e.size[1];i++){let l=[];for(let s=0;s<e.size[0];s++){let a={squareState:e.pattern[i][s],numRows:e.size[1],numCols:e.size[0],applyingPatternStyle:t};l.push(a)}s.push((0,a.jsx)("div",{className:"display-grid-row-wrapper",style:{height:"".concat(100/e.size[1],"%")},children:l.map((e,t)=>(0,n.createElement)(c,{...e,key:i+"-"+t}))},i))}return s}(e.selectedPattern,!0);return(0,a.jsxs)("div",{className:"add-pattern-wrapper",children:[(0,a.jsx)("h1",{className:"add-pattern-title",children:"Add Pattern to Grid"}),(0,a.jsx)("div",{className:"add-pattern-arrow",children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"arrow_forward"})}),(0,a.jsx)("h1",{children:"Currently Applying:"}),(0,a.jsx)("h1",{children:e.selectedPattern.patternName}),(0,a.jsx)("div",{className:"applying-pattern-wrapper",children:t}),(0,a.jsx)("div",{className:"cancel-wrap",children:(0,a.jsxs)("button",{children:[(0,a.jsx)("span",{className:"material-symbols-outlined",children:"close"}),"Cancel"]})})]})}}var u=s(782);let p=[{groupName:"Still-life",patterns:[{patternName:"Block",size:[2,2],pattern:[[!0,!0],[!0,!0]]},{patternName:"Beehive",size:[4,3],pattern:[[!1,!0,!0,!1],[!0,!1,!1,!0],[!1,!0,!0,!1]]},{patternName:"Loaf",size:[4,4],pattern:[[!1,!0,!0,!1],[!0,!1,!1,!0],[!1,!0,!1,!0],[!1,!1,!0,!1]]},{patternName:"Boat",size:[3,3],pattern:[[!0,!0,!1],[!0,!1,!0],[!1,!0,!1]]},{patternName:"Tub",size:[3,3],pattern:[[!1,!0,!1],[!0,!1,!0],[!1,!0,!1]]}]},{groupName:"Oscillator",patterns:[{patternName:"Blinker",size:[3,1],pattern:[[!0,!0,!0]]},{patternName:"Toad",size:[4,2],pattern:[[!1,!0,!0,!0],[!0,!0,!0,!1]]},{patternName:"Beacon",size:[4,4],pattern:[[!0,!0,!1,!1],[!0,!1,!1,!1],[!1,!1,!1,!0],[!1,!1,!0,!0]]},{patternName:"Pulsar",size:[15,15],pattern:[[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!0,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!0,!1],[!1,!0,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!0,!1],[!1,!0,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!0,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!0,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!0,!1],[!1,!0,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!0,!1],[!1,!0,!1,!1,!1,!1,!0,!1,!0,!1,!1,!1,!1,!0,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]]},{patternName:"Penta-decathlon",size:[9,16],pattern:[[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!0,!1,!0,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!0,!1,!0,!1,!1,!1],[!1,!1,!1,!0,!0,!0,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1],[!1,!1,!1,!1,!1,!1,!1,!1,!1]]}]},{groupName:"Spaceship",patterns:[{patternName:"Glider",size:[3,3],pattern:[[!0,!1,!0],[!1,!0,!0],[!1,!0,!1]]},{patternName:"Light-weight Spaceship",size:[5,4],pattern:[[!1,!0,!0,!0,!0],[!0,!1,!1,!1,!0],[!1,!1,!1,!1,!0],[!0,!1,!1,!0,!1]]},{patternName:"Middle-weight Spaceship",size:[6,5],pattern:[[!1,!1,!0,!1,!1,!1],[!0,!1,!1,!1,!0,!1],[!1,!1,!1,!1,!1,!0],[!0,!1,!1,!1,!1,!0],[!1,!0,!0,!0,!0,!0]]},{patternName:"Heavy-weight Spaceship",size:[7,5],pattern:[[!1,!1,!0,!0,!1,!1,!1],[!0,!1,!1,!1,!1,!0,!1],[!1,!1,!1,!1,!1,!1,!0],[!0,!1,!1,!1,!1,!1,!0],[!1,!0,!0,!0,!0,!0,!0]]}]}];function h(e){let t=[];for(let n of p){let i=[];for(let t of n.patterns){let n=e.selectedPattern==t&&e.isPatternSelected?"clicked-button":"";t.size[0]>e.numCols||t.size[1]>e.numRows?i.push((0,a.jsx)(l.Z,{title:"Grid too small to insert pattern",placement:"right",children:(0,a.jsx)("span",{children:(0,a.jsxs)("button",{className:"pattern-button "+n,children:[(0,a.jsx)("p",{children:t.patternName}),(0,a.jsx)("div",{className:"display-grid-wrapper",children:s(t,!1)})]},t.patternName)})},"tt-"+t.patternName)):i.push((0,a.jsxs)("button",{onClick:()=>e.patternSelectedActions(t),className:"pattern-button "+n,children:[(0,a.jsx)("p",{children:t.patternName}),(0,a.jsx)("div",{className:"display-grid-wrapper",children:s(t,!1)})]},t.patternName))}t.push((0,a.jsxs)("div",{className:"pattern-group-wrapper",children:[(0,a.jsx)("p",{className:"pattern-group-name",children:n.groupName}),i]},n.groupName+"wrap"))}function s(e,t){let s=[];for(let i=0;i<e.size[1];i++){let l=[];for(let s=0;s<e.size[0];s++){let a={squareState:e.pattern[i][s],numRows:e.size[1],numCols:e.size[0],applyingPatternStyle:t};l.push(a)}s.push((0,a.jsx)("div",{className:"display-grid-row-wrapper",style:{height:"".concat(100/e.size[1],"%")},children:l.map((e,t)=>(0,n.createElement)(c,{...e,key:i+"-"+t}))},i))}return s}return(0,a.jsx)(u.Z,{open:e.isPatternsDialogOpen,className:"dialog-style",children:(0,a.jsxs)("div",{className:"dialog-wrapper",children:[(0,a.jsxs)("div",{className:"dialog-title-wrapper",children:[(0,a.jsx)("h1",{className:"dialog-title",children:"Add Patterns"}),(0,a.jsxs)("button",{onClick:()=>e.openPatternsDialog(),children:[(0,a.jsx)("span",{className:"material-symbols-outlined",children:"close"}),"Close"]})]}),(0,a.jsx)("p",{children:"Select a pattern below to add to the grid."}),(0,a.jsx)("div",{className:"dialog-content",children:(0,a.jsx)("div",{className:"patterns-settings-wrapper",children:(0,a.jsx)("div",{className:"patterns-wrapper",children:t})})})]})})}function m(e){var t;let s;let[i,l]=(0,n.useState)(null);function r(){let t=!i;l(t),e.squareClicked&&e.squareClicked(e.squareIndexRow,e.squareIndexCol,t)}(0,n.useEffect)(()=>{l(e.stateInput)},[e]),s=e.numCols+e.numRows>150?"0.01rem":e.numCols+e.numRows>100?"0.05rem":e.numCols+e.numRows>70?"0.1rem":"0.2rem";let o={borderWidth:e.infoDialog?"0.1rem":s,borderRadius:e.infoDialog?"0.1rem":"".concat(.5/((e.numCols+e.numRows)/20),"rem")},c=e.infoDialog?"square-button-info ":"square-button ";return(0,a.jsx)("div",{className:"square-wrapper",children:(0,a.jsx)("button",{id:e.infoDialog?"info-"+e.squareKey:e.squareKey,className:c+(i?"square-on":"square-off"),style:o,onClick:()=>{void 0!=r()&&r()},disabled:void 0==e.selectedPattern||null!==(t=e.patternSelected&&(e.squareIndexCol+e.selectedPattern.size[0]>e.numCols||e.squareIndexRow+e.selectedPattern.size[1]>e.numRows))&&void 0!==t&&t},e.squareKey)},e.squareKey+"-wrap")}function x(e){let t=e.iteration,s=e.seqTerminated?"flash-terminated":"";if(!t||0===t.length||!t[0]||0===t[0].length)return(0,a.jsx)("div",{children:"Loading..."});let i=[];for(let s=0;s<e.numRows;s++){let l=[];for(let a=0;a<e.numCols;a++){let n={squareKey:s+"-"+a,stateInput:t[s][a],squareIndexRow:s,squareIndexCol:a,squareClicked:e.squareClicked,numRows:e.numRows,numCols:e.numCols,patternSelected:e.isPatternSelected,selectedPattern:e.selectedPattern,infoDialog:e.isInfoDialogGrid};l.push(n)}i.push((0,a.jsx)("div",{className:"grid-wrapper",style:{height:"calc(100% / ".concat(e.numRows,")")},children:l.map((e,t)=>(0,n.createElement)(m,{...e,key:s+"-"+t}))},s))}let l=e.isInfoDialogGrid?"info-page-wrapper ":"page-wrapper ";return(0,a.jsx)("div",{className:l+s,children:i})}s(8276),s(1384);var j=s(1223),g=s(5398),f=s(6811),y=s(555);function b(){let[e,t]=n.useState(0),s=[(0,a.jsxs)("p",{children:[(0,a.jsx)("a",{href:"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life",children:(0,a.jsx)("u",{children:"Game Of Life"})}),", is an automated cellular zero-player game, meaning that its evolution is determined by its initial state. It was devised by Mathematician John Conway in 1970.",(0,a.jsx)("br",{}),"You play the game by inputting an initial state and by seeing how that state evolves over time. Cells in every state are either alive or dead, and become alive or dead based on a specific set of rules about each cells eight neighbors..."]},"aboutp"),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{style:{marginBottom:"0.5rem"},children:"Rules of the game: Each cell is either alive or dead. Each cell then becomes alive or dead based on its current state and the state of its eight neighbors. At each step in time, a cell becomes alive or dead based on the following rules:"}),(0,a.jsxs)("div",{className:"instruction-grid",children:[(0,a.jsx)("p",{children:"Any live cell with less then two live neighbours dies, as if by underpopulation."}),(0,a.jsx)("div",{className:"flexy-info",children:(0,a.jsx)(x,{iteration:[[!1,!0,!1],[!1,!0,!1],[!1,!1,!1]],numRows:3,numCols:3,isInfoDialogGrid:!0})}),(0,a.jsx)("p",{children:"Any live cell with exactly two, or three, live neighbours, lives on to the next generation."}),(0,a.jsx)("div",{className:"flexy-info",children:(0,a.jsx)(x,{iteration:[[!1,!1,!0],[!1,!0,!1],[!1,!0,!0]],numRows:3,numCols:3,isInfoDialogGrid:!0})}),(0,a.jsx)("p",{children:"Any live cell with more than three live neighbours dies, as if by overpopulation."}),(0,a.jsx)("div",{className:"flexy-info",children:(0,a.jsx)(x,{iteration:[[!1,!0,!0],[!0,!0,!1],[!0,!1,!1]],numRows:3,numCols:3,isInfoDialogGrid:!0})}),(0,a.jsx)("p",{children:"Any dead cell with exactly three live neighbours becomes alive, as if by reproduction."}),(0,a.jsx)("div",{className:"flexy-info",children:(0,a.jsx)(x,{iteration:[[!1,!0,!0],[!1,!1,!1],[!0,!1,!1]],numRows:3,numCols:3,isInfoDialogGrid:!0})})]})]},"rulesp"),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{style:{marginBottom:"0.5rem"},children:"How to play: "}),(0,a.jsxs)("div",{className:"instruction-grid",children:[(0,a.jsx)("p",{children:"You can manually turn each cell in the grid on and off by clicking them. Experiment creating your own patterns to see how they behave according to the simulation rules."}),(0,a.jsxs)("div",{className:"flexy-info",children:[(0,a.jsx)("button",{className:"",disabled:!0,children:"Alive"}),(0,a.jsx)("button",{className:"dead",disabled:!0,children:"Dead"})]}),(0,a.jsx)("p",{children:"Use the 'Back', 'Play', and 'Next' steps to control the game, stepping forward and back in time to see how the population grows."}),(0,a.jsxs)("div",{className:"scrub-wrapper-info flexy-info",children:[(0,a.jsx)("button",{disabled:!0,children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"first_page"})}),(0,a.jsx)("button",{disabled:!0,children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"play_pause"})}),(0,a.jsx)("button",{disabled:!0,children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"last_page"})})]}),(0,a.jsx)("p",{children:"The randomise button will randomly turn all cells in the grid either on or off, great if you just enjoy watching the simulation."}),(0,a.jsx)("div",{className:"flexy-info",children:(0,a.jsxs)("button",{disabled:!0,children:[(0,a.jsx)("span",{className:"material-symbols-outlined casino-logo-spacing",children:"casino"}),(0,a.jsx)("p",{children:"Randomise"})]})}),(0,a.jsx)("p",{children:"Use the clear button to empty the grid and start again."}),(0,a.jsx)("div",{className:"flexy-info",children:(0,a.jsxs)("button",{disabled:!0,children:[(0,a.jsx)("span",{className:"material-symbols-outlined casino-logo-spacing",children:"check_box_outline_blank"}),(0,a.jsx)("p",{children:"Clear"})]})}),(0,a.jsx)("p",{children:"You can set the number of rows and columns with the controls."}),(0,a.jsxs)("div",{className:"row-col-controls-wrapper-info",children:[(0,a.jsx)("div",{className:"flexy",children:(0,a.jsx)("p",{id:"row-para",children:"Rows (1-100):"})}),(0,a.jsx)("input",{className:"info-input",id:"row-input-info",type:"number",disabled:!0,value:30}),(0,a.jsx)("div",{className:"flexy",children:(0,a.jsx)("p",{id:"col-para",children:"Columns (1-100):"})}),(0,a.jsx)("input",{className:"info-input",id:"col-input-info",type:"number",disabled:!0,value:30})]}),(0,a.jsx)("p",{children:"User the 'Add Patterns' button to add some presets to the grid. Simply select the pattern you wish to add, then click the grid where you would like to add the pattern. The presets all behave in fun ways; 'Oscillators' loop through phases, whilst 'Spaceships' move slowly across the screen."}),(0,a.jsx)("div",{className:"flexy",children:(0,a.jsxs)("button",{disabled:!0,children:[(0,a.jsx)("span",{className:"material-symbols-outlined casino-logo-spacing",children:"rocket_launch"}),"Add Patterns"]})})]})]},"howtoplayp")];return(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"stepper-wrapper",children:(0,a.jsx)(j.Z,{activeStep:e,children:["About","Rules","How to Play"].map(e=>(0,a.jsx)(g.Z,{children:(0,a.jsx)(f.Z,{children:e})},e))})}),(0,a.jsxs)("div",{className:"content-grid",children:[(0,a.jsx)(y.Z,{color:"inherit",disabled:0===e,onClick:()=>{t(e=>e-1)},className:"back-button",children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"chevron_left"})}),(0,a.jsx)("div",{className:"content-col",children:s[e]}),(0,a.jsx)(y.Z,{onClick:()=>{t(e=>e+1)},className:"forward-button",disabled:2===e,children:(0,a.jsx)("span",{className:"material-symbols-outlined",children:"chevron_right"})})]})]})}function N(e){return(0,a.jsx)(u.Z,{open:e.isDialogOpen,children:(0,a.jsxs)("div",{className:"dialog-wrapper",children:[(0,a.jsxs)("div",{className:"dialog-title-wrapper",children:[(0,a.jsx)("h1",{className:"dialog-title",children:"About GAME OF LIFE"}),(0,a.jsxs)("button",{onClick:()=>e.triggerOpen(),children:[(0,a.jsx)("span",{className:"material-symbols-outlined",children:"close"}),"Close"]})]}),(0,a.jsx)("div",{className:"i-dialog-content",children:(0,a.jsx)(b,{})})]})})}function v(){var e;let[t,s]=(0,n.useState)(30),[l,r]=(0,n.useState)(40),[o,c]=(0,n.useState)(i.initialiseZeroArray(t,l)),[u,m]=(0,n.useState)([i.initialiseZeroArray(t,l)]),[j,g]=(0,n.useState)(!1),[f,y]=(0,n.useState)(!1),[b,v]=(0,n.useState)(!1),[w,C]=(0,n.useState)(!1),k=p[0].patterns[0],[S,P]=(0,n.useState)(k),[R,q]=(0,n.useState)(!1),[A,z]=(0,n.useState)(!1),[I,_]=(0,n.useState)(!1),Z=(0,n.useRef)(j);function D(){u.push(o),m(u);let e=i.calculateNextIteration(o,t,l);I&&(E(e,u[u.length-1])||E(e,u[u.length-2]))&&v(!0),b?g(!1):(c(e),y(i.checkForActiveCells(e,t,l)),f||g(!1))}function E(e,t){return e.flat().every((e,s)=>e===t.flat()[s])}function G(e){C(!0),P(e),T()}function T(){q(!R)}function O(){z(!A)}Z.current=j,(0,n.useEffect)(()=>{if(j){let e=setTimeout(()=>{Z&&D()},500);return()=>clearTimeout(e)}},[j,o]),(0,n.useEffect)(()=>{c(i.initialiseZeroArray(t,l))},[t,l]);let F={goClicked:D,backClicked:function(){let e=u.pop();c(e),y(i.checkForActiveCells(e,t,l)),v(!1)},numRows:t,numRowsChanged:function(e){let t=parseInt(e,10);t>100?t=100:t<1&&(t=1),isNaN(t)||s(t),v(!1)},numCols:l,numColsChanged:function(e){let t=parseInt(e,10);t>100?t=100:t<1&&(t=1),isNaN(t)||r(t),v(!1)},randomise:function(){let e=i.randomiseIteration(t,l);c(e),m([i.initialiseZeroArray(t,l),e]),console.log(u),y(i.checkForActiveCells(e,t,l)),v(!1)},clear:function(){m([i.initialiseZeroArray(t,l)]),c(i.createIterationArray(t,l)),v(!1)},isPlaying:j,togglePlaying:function(){g(e=>!e)},iterationsLength:u.length,activeCells:f,isSeqTerminated:b,isPatternSelected:w,selectedPattern:S,patternSelectedActions:G,openPatternsDialog:T,openInfoDialog:O,terminateSequence:I,toggleTerminateSequence:function(){_(!I)}};return(0,a.jsxs)("div",{onClick:function(){w&&C(!1)},className:"home-wrapper",children:[(0,a.jsx)(d,{...F}),o.length===t&&(null===(e=o[0])||void 0===e?void 0:e.length)===l?(0,a.jsx)(x,{iteration:o,squareClicked:function(e,s,a){w?(c(i.applyPattern(S,e,s,o)),v(!1),y(i.checkForActiveCells(o,t,l))):(c(i.setStateOfPosition(e,s,a,o)),v(!1),a?y(!0):y(i.checkForActiveCells(o,t,l)))},numRows:t,numCols:l,seqTerminated:b,patternSelected:w,selectedPattern:S,isInfoDialogGrid:!1}):(0,a.jsx)("div",{}),(0,a.jsx)(h,{isPatternsDialogOpen:R,openPatternsDialog:T,numRows:t,numCols:l,isPatternSelected:w,selectedPattern:S,patternSelectedActions:G}),(0,a.jsx)(N,{isDialogOpen:A,triggerOpen:()=>O()})]})}},8276:function(){},1384:function(){}},function(e){e.O(0,[885,84,971,117,744],function(){return e(e.s=9926)}),_N_E=e.O()}]);