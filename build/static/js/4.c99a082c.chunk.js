(this["webpackJsonpoktopad-crm"]=this["webpackJsonpoktopad-crm"]||[]).push([[4],{1052:function(e,t,n){},1057:function(e,t,n){"use strict";n.r(t);var a=n(6),s=n(5),i=n.n(s),r=n(10),c=n(69),o=n(12),u=n(21),l=n(40),d=n(16),h=n(15),p=n(13),f=n.n(p),m=n(3),v=n(7),y=n.n(v),E={Course:{fields:[{name:"title",type:y.a.STRING}]},Class:{fields:[{name:"title",type:y.a.STRING},{name:"course",type:y.a.REFERENCE,entity:"Course"},{name:"tutor",type:y.a.REFERENCE,entity:"User"},{name:"start",type:y.a.DATE},{name:"durationMin",type:y.a.INTEGER}]},Attendance:{fields:[{name:"client",type:y.a.REFERENCE,entity:"Client"},{name:"class",type:y.a.REFERENCE,entity:"Class"},{name:"attend",type:y.a.BOOLEAN}]}},O=(y.a.REFERENCE,E.Class),g=function(){function e(t){var n=this;Object(o.a)(this,e),Object.assign(this,t),this.elements=[{id:"classModal",type:m.Elements.MODAL,fullWidth:!0,maxWidth:"xl",open:!1,onClose:null,elements:[{type:m.Elements.GROUP,div:!0,style:{display:"flex"},elements:[{type:m.Elements.LABEL,title:"Class",tag:"h4",style:{width:200}},{type:m.Elements.BUTTON,title:"Close",onClick:function(){return n.close()}},{type:m.Elements.BUTTON,title:"Delete",style:{marginLeft:50},onClick:function(){return n.delete()}}]},{type:m.Elements.GRID,elements:[Object(a.a)(Object(a.a)({},Object(m.getElement)(O.fields.find((function(e){return"tutor"===e.name})),this)),{},{onChange:function(){return n.change()}}),Object(a.a)(Object(a.a)({},Object(m.getElement)(O.fields.find((function(e){return"course"===e.name})),this)),{},{onChange:function(){return n.change()}}),Object(a.a)(Object(a.a)({},Object(m.getElement)(O.fields.find((function(e){return"start"===e.name})))),{},{title:"Start",onChange:function(){return n.change()}}),Object(a.a)(Object(a.a)({},Object(m.getElement)(O.fields.find((function(e){return"durationMin"===e.name})))),{},{title:"Duration min",onChange:function(){return n.change()}})]},{type:m.Elements.BUTTON,title:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u0435\u0449\u0435\u043d\u0438\u0435",onClick:function(){return n.addAttendance()},style:{marginBottom:20}},{type:m.Elements.GRID,id:"rowsTitle",elements:[{type:m.Elements.LABEL,title:"\u041a\u043b\u0438\u0435\u043d\u0442",tag:"h4",cols:4},{type:m.Elements.LABEL,title:"\u041f\u043e\u0441\u0435\u0442\u0438\u043b",tag:"h4",cols:1}]},{type:m.Elements.GROUP,id:"rows",elements:[]},{id:"spacer",type:m.Elements.LABEL,tag:"p",title:" ",style:{height:300}}]},Object(m.ConfirmDialog)({form:this.form,id:"confirmDialog"})],this.aChangeTimeouts={},this.attendanceUuids={}}return Object(u.a)(e,[{key:"open",value:function(){var e=Object(r.a)(i.a.mark((function e(t){var n,a,s,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.content.classModal.open=!0,this.content.rows.elements=[],!t.uuid){e.next=12;break}return this.uuid=t.uuid,e.next=6,this.app.Class.get({uuid:t.uuid});case 6:n=e.sent,a=n.response,this.form.setValues(a),this.loadAttendances(),e.next=19;break;case 12:this.uuid=void 0,s=t.start,r=t.end,this.content.tutor.value=null,this.content.course.value=null,this.content.start.value=s,this.content.durationMin.value=Math.ceil((r.getTime()-s.getTime())/6e4),this.save();case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"change",value:function(){var e=this;this.changeTimeout&&(clearTimeout(this.changeTimeout),this.changeTimeout=void 0),this.changeTimeout=setTimeout((function(){e.save()}),500)}},{key:"save",value:function(){var e=Object(r.a)(i.a.mark((function e(){var t,n,a,s,r,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.form.getValues(),n=t.tutor,a=t.course,s=t.start,r=t.durationMin,e.next=3,this.app.Class.put({uuid:this.uuid,body:{tutor:n,course:a,start:s,durationMin:r}});case 3:c=e.sent,o=c.response,this.uuid=o.uuid;case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"close",value:function(){this.load(),this.content.classModal.open=!1}},{key:"delete",value:function(){var e=Object(r.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.content.confirmDialog.confirm({title:"Are you sure?"});case 2:if(e.sent){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,this.app.Class.delete({uuid:this.uuid});case 6:this.content.classModal.open=!1,this.load();case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addAttendance",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Math.ceil(1e4*Math.random()),a={id:"row".concat(n),type:m.Elements.GRID,elements:[{id:"client".concat(n),type:m.Elements.SELECT,getOptions:function(t){return e.clientQuery()},title:"",cols:4,onChange:function(){return e.saveAttendance(n)},value:t.client},{id:"attend".concat(n),type:m.Elements.CHECKBOX,cols:1,onChange:function(){return e.saveAttendance(n)},style:{marginTop:10},value:t.attend},{type:m.Elements.BUTTON,title:"X",onClick:function(){return e.delAttendance(n)},style:{marginTop:20}}]};t&&(this.attendanceUuids[n]=t.uuid),this.content.rows.elements.push(a),this.content.rows.elements.sort((function(e,t){var n,a,s,i;return(null===(n=e.elements[0].value)||void 0===n?void 0:n.title)>(null===(a=t.elements[0].value)||void 0===a?void 0:a.title)?1:(null===(s=e.elements[0].value)||void 0===s?void 0:s.title)<(null===(i=t.elements[0].value)||void 0===i?void 0:i.title)?-1:0})),this.content.rows.elements=Object(c.a)(this.content.rows.elements)}},{key:"clientQuery",value:function(){var e=Object(r.a)(i.a.mark((function e(t){var n,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.app.Client.query({where:{$or:[{title:{$like:"%".concat(t||"","%")}},{phone:{$like:"%".concat(t||"","%")}},{address:{$like:"%".concat(t||"","%")}}]}});case 2:return n=e.sent,s=n.response,e.abrupt("return",(s||[]).map((function(e){return Object(a.a)(Object(a.a)({},e),{},{title:"".concat(e.title," (").concat(e.phone||"").concat(e.phone&&e.address?",":"").concat(e.address||"",")")})})));case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"saveAttendance",value:function(){var e=Object(r.a)(i.a.mark((function e(t){var n,a,s=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.aChangeTimeouts[t]&&(clearTimeout(this.aChangeTimeouts[t]),this.aChangeTimeouts[t]=void 0),n={client:this.content["client".concat(t)].value,attend:this.content["attend".concat(t)].value,class:{uuid:this.uuid}},a=this.attendanceUuids[t],setTimeout(Object(r.a)(i.a.mark((function e(){var r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.app.Attendance.put({uuid:a,body:n});case 2:r=e.sent,c=r.response,s.attendanceUuids[t]=c.uuid;case 5:case"end":return e.stop()}}),e)}))),500);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"loadAttendances",value:function(){var e=Object(r.a)(i.a.mark((function e(){var t,n=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.app.Attendance.query({where:{classUuid:this.uuid}});case 2:t=e.sent,t.response.forEach((function(e){return n.addAttendance(e)}));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"delAttendance",value:function(){var e=Object(r.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.app.Attendance.delete({uuid:this.attendanceUuids[t]});case 2:(n=this.content.rows.elements).splice(n.findIndex((function(e){return e.id==="row".concat(t)})),1),this.content.rows.elements=Object(c.a)(n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),b=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).classModal=new g({content:a.content,app:a.app,form:Object(l.a)(a),load:function(){return a.load()}}),a.elements=[{id:"calendar",type:"Calendar",onSelectSlot:function(e){return a.newClass(e)},onRangeChange:function(e){return a.onRangeChange(e)},events:[],onSelectEvent:function(e){return a.onSelectEvent(e)},onEventResize:function(e){return a.onEventResize(e)},onEventDrop:function(e){return a.onEventResize(e)}}].concat(Object(c.a)(a.classModal.elements)),a.start=f()().startOf("week").toDate(),a.end=f()().endOf("week").toDate(),a.load(),a}return Object(u.a)(n,[{key:"newClass",value:function(e){this.classModal.open(e)}},{key:"onRangeChange",value:function(e){e.start?(this.start=f()(e.start).startOf("day").toDate(),this.end=f()(e.end).endOf("day").toDate()):(this.start=f()(e[0]).startOf("day").toDate(),this.end=f()(e[e.length-1]).endOf("day").toDate()),this.load()}},{key:"load",value:function(){var e=Object(r.a)(i.a.mark((function e(){var t,n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.app.Class.query({where:{start:{$lte:this.end,$gte:this.start}}});case 2:t=e.sent,n=t.response,a=n.map((function(e){return{start:f()(e.start).toDate(),end:f()(e.start).add(e.durationMin,"minutes").toDate(),uuid:e.uuid,title:"".concat(e.course?e.course.title:"\u0417\u0430\u043d\u044f\u0442\u0438\u0435"," (").concat(e.tutor?e.tutor.title:"",")")}})),this.content.calendar.events=a;case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"onSelectEvent",value:function(e){this.classModal.open({uuid:e.uuid})}},{key:"onEventResize",value:function(){var e=Object(r.a)(i.a.mark((function e(t){var n,a,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.start,a=t.end,(s=t.event).start=n,s.end=a,this.content.calendar.events=Object(c.a)(this.content.calendar.events),e.next=6,this.app.Class.put({uuid:s.uuid,body:{start:n,durationMin:Math.ceil((a.getTime()-n.getTime())/6e4)}});case 6:return e.next=8,this.load();case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),n}(m.Form);b.title="Schedule";var C=n(0),w=n.n(C),k=n(1053),j=(n(949),n(950),n(951)),T=n.n(j),x=(n(1052),Object(k.b)(f.a)),R=T()(k.a),A={height:"80vh"},M={date:"\u0414\u0430\u0442\u0430",time:"\u0412\u0440\u0435\u043c\u044f",event:"\u0417\u0430\u043d\u044f\u0442\u0438\u0435",allDay:"\u0426\u0435\u043b\u044b\u0439 \u0434\u0435\u043d\u044c",week:"\u041d\u0435\u0434\u0435\u043b\u044f",work_week:"\u0420\u0430\u0431\u043e\u0447\u0430\u044f \u043d\u0435\u0434\u0435\u043b\u044f",day:"\u0414\u0435\u043d\u044c",month:"\u041c\u0435\u0441\u044f\u0446",previous:"\u041d\u0430\u0437\u0430\u0434",next:"\u0412\u043f\u0435\u0440\u0435\u0434",yesterday:"\u0412\u0447\u0435\u0440\u0430",tomorrow:"\u0417\u0430\u0432\u0442\u0440\u0430",today:"\u0421\u0435\u0433\u043e\u0434\u043d\u044f",agenda:"\u0410\u0433\u0435\u043d\u0434\u0430",noEventsInRange:"\u041d\u0435\u0442 \u0437\u0430\u043d\u044f\u0442\u0438\u0439 \u0432 \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u043c \u043f\u0435\u0440\u0438\u043e\u0434\u0430",showMore:function(e){return"+".concat(e," \u0435\u0449\u0435")}},D=(C.Component,{Calendar:function(e){return w.a.createElement("div",{style:A},w.a.createElement(R,Object.assign({defaultView:"week",resizable:!0,selectable:!0,localizer:x,messages:M},e,{events:e.events||[]})))}}),S={Schedule:"\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435",Courses:"\u041a\u0443\u0440\u0441\u044b",Course:"\u041a\u0443\u0440\u0441",Tutor:"\u041f\u0440\u0435\u043f\u043e\u0434\u0430\u0432\u0430\u0442\u0435\u043b\u044c",Class:"\u0417\u0430\u043d\u044f\u0442\u0438\u0435",Classs:"\u0417\u0430\u043d\u044f\u0442\u0438\u044f",Attendances:"\u041f\u043e\u0441\u0435\u0449\u0435\u043d\u0438\u044f",Attendance:"\u041f\u043e\u0441\u0435\u0449\u0435\u043d\u0438\u0435","Duration min":"\u0414\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c, \u043c\u0438\u043d"};t.default=function(e){e.init({structures:E,addToMenu:!0}),e.forms.Schedule=b,e.menu.unshift({title:"Schedule",form:"Schedule"}),e.setMenu(e.menu),e.constructor.components=Object(a.a)(Object(a.a)({},e.constructor.components),D),Object.assign(e.translations.ru,S)}}}]);
//# sourceMappingURL=4.c99a082c.chunk.js.map