(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{105:function(e,s,a){"use strict";a.r(s);a(0);var t=a(53),i=a(98),n=a.n(i),c=a(8),o=a(1),r=function(e){var s="/dialogs/"+e.id;return Object(o.jsxs)("div",{className:"".concat(n.a.dialog," ").concat(n.a.active),children:[Object(o.jsx)("img",{className:n.a.user_img,src:e.img,alt:""}),Object(o.jsx)(c.b,{to:s,children:e.name})]})},g=function(e){return Object(o.jsx)("div",{className:n.a.message,children:e.message})},u=function(e){var s=e.dialogsPage,a=s.dialogs.map((function(e){return Object(o.jsx)(r,{id:e.id,name:e.name,img:e.img},e.id)})),t=s.messages.map((function(e){return Object(o.jsx)(g,{message:e.message},e.id)}));return Object(o.jsxs)("div",{className:n.a.dialogs,children:[Object(o.jsx)("div",{className:n.a.dialogsItems,children:a}),Object(o.jsxs)("div",{className:n.a.messages,children:[t,Object(o.jsx)("div",{children:Object(o.jsx)("textarea",{onChange:function(s){var a=s.target.value;e.updateNewMessageChange(a)},value:s.newMessageText,cols:"10",rows:"2"})}),Object(o.jsx)("button",{onClick:function(){e.sendMessage()},children:"add"})]})]})},l=a(18),d=a(99),j=a(17);s.default=Object(j.c)(Object(l.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{updateNewMessageChange:function(s){e(Object(t.c)(s))},sendMessage:function(){e(Object(t.a)())}}})),d.a)(u)},98:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__2xRSA",dialogsItems:"Dialogs_dialogsItems__2sNe2",dialog:"Dialogs_dialog__lk_cw",active:"Dialogs_active__2sQhs",messages:"Dialogs_messages__1w_Up",message:"Dialogs_message__1xIDh",user_img:"Dialogs_user_img__1aK89"}},99:function(e,s,a){"use strict";a.d(s,"a",(function(){return m}));var t=a(2),i=a(19),n=a(20),c=a(22),o=a(21),r=a(0),g=a.n(r),u=a(5),l=a(18),d=a(1),j=function(e){return{isAuth:e.auth.isAuth}},m=function(e){var s=function(s){Object(c.a)(r,s);var a=Object(o.a)(r);function r(){return Object(i.a)(this,r),a.apply(this,arguments)}return Object(n.a)(r,[{key:"render",value:function(){return this.props.isAuth?Object(d.jsx)(e,Object(t.a)({},this.props)):Object(d.jsx)(u.a,{to:"/login"})}}]),r}(g.a.Component);return Object(l.b)(j)(s)}}}]);
//# sourceMappingURL=4.d26c3efe.chunk.js.map