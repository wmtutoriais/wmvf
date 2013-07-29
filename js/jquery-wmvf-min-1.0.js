/*
 * desenvolvidor por Welison Menezes
 * welisonmenezes@gmail.com
 */
(function(e){e.fn.wmvf=function(n){var r=e(this);var i={btn_submit:"input[type=submit]",msg_error:false,checkboxes_radios:false,class_error:"wm_error",confirm:false,custom:false,messages:{required:"Campo requerido!",email:"E-mail inválido!",numeric:"Por favor, apenas número.",between:"Por favor, digite entre %min% e %max% caracter(es)",maxlength:"Por favor, digite no máximo %max% caracter(es).",minlength:"Por favor, digite no mínimo %min% caracter(es).",cpf:"CPF inválido!",confirm:"A confirmação está diferente!",file:"O tipo do arquivo é inválido!"}};var s=e.extend(true,i,n);t.new_submit(r,s)};var t={new_submit:function(n,r){e(r.btn_submit,n).click(function(){var i=0;if(r.msg_error){e(r.msg_error).html("")}if(t.required(n,r)==false)i++;if(t.email(n,r)==false)i++;if(t.numeric(n,r)==false)i++;if(t.between(n,r)==false)i++;if(t.maxlength(n,r)==false)i++;if(t.minlength(n,r)==false)i++;if(t.cpf(n,r)==false)i++;if(t.conf(n,r)==false)i++;if(t.custom(n,r)==false)i++;if(t.file(n,r)==false)i++;if(i>0){return false}else{n.submit()}})},required:function(t,n){var t=t;var r=e(".required",t);var i=n.checkboxes_radios;var s=0;r.each(function(){var t=e(this);if(t.attr("type")!="checkbox"&&t.attr("type")!="radio"){if(t.val()==""){t.addClass(n.class_error);if(n.msg_error){t.next(n.msg_error).html(n.messages["required"])}s++}}});if(i){var o=i.split(",");for(var u=0;u<o.length;u++){var a=e("input[type=checkbox][name="+o[u]+"].required, input[type=radio][name="+o[u]+"].required",t);var f=e("input[type=checkbox][name="+o[u]+"].required:checked, input[type=radio][name="+o[u]+"].required:checked",t).length;if(f<1){a.addClass(n.class_error);if(n.msg_error){a.next(n.msg_error).html(n.messages["required"])}s++}}}else{var l=e("input[type=checkbox].required");if(l.length>=1){var c=e("input[type=checkbox].required",t);var h=e("input[type=checkbox].required:checked",t).length;if(h<1){c.addClass(n.class_error);if(n.msg_error){c.next(n.msg_error).html(n.messages["required"])}s++}}var p=e("input[type=radio].required");if(p.length>=1){var d=e("input[type=radio].required",t);var v=e("input[type=radio].required:checked",t).length;if(v<1){d.addClass(n.class_error);if(n.msg_error){d.next(n.msg_error).html(n.messages["required"])}s++}}}return s>0?false:true},email:function(t,n){var t=t;var r=e(".email",t);var i=0;var s=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;r.each(function(t){var r=e(this);if(!s.test(r.val())){r.addClass(n.class_error);if(n.msg_error){r.next(n.msg_error).html(n.messages["email"])}i++}});return i>0?false:true},numeric:function(t,n){var t=t;var r=e(".numeric",t);var i=0;var s=/^\d+$/;r.each(function(t){var r=e(this);if(!s.test(r.val())||r.val()==""){r.addClass(n.class_error);if(n.msg_error){r.next(n.msg_error).html(n.messages["numeric"])}i++}});return i>0?false:true},between:function(t,n){var t=t;var r=e(".between",t);var i=/^(\d),(\d)$/;var s=0;r.each(function(t){var r=e(this);var o=r.attr("rel");if(o!=undefined&&o!=""){if(i.test(o)){var u=o.split(",");if(r.val().length<u[0]||r.val().length>u[1]){r.addClass(n.class_error);if(n.msg_error){var a=n.messages["between"].replace("%min%",u[0]);a=a.replace("%max%",u[1]);r.next(n.msg_error).html(a)}s++}}}});return s>0?false:true},maxlength:function(t,n){var t=t;var r=e(".maxlength",t);var i=/^\d+$/;var s=0;r.each(function(t){var r=e(this);var o=r.attr("rel");if(o!=undefined&&o!=""){if(i.test(o)){if(r.val().length>o){r.addClass(n.class_error);if(n.msg_error){var u=n.messages["maxlength"].replace("%max%",o);r.next(n.msg_error).html(u)}s++}}}});return s>0?false:true},minlength:function(t,n){var t=t;var r=e(".minlength",t);var i=/^\d+$/;var s=0;r.each(function(t){var r=e(this);var o=r.attr("rel");if(o!=undefined&&o!=""){if(i.test(o)){if(r.val().length<o){r.addClass(n.class_error);if(n.msg_error){var u=n.messages["minlength"].replace("%min%",o);r.next(n.msg_error).html(u)}s++}}}});return s>0?false:true},cpf:function(t,n){var r=0;var t=t;var s=e(".cpf",t);s.each(function(t){var s=e(this);value=s.val().replace(".","");value2=value.replace(".","");cpf=value2.replace("-","");while(cpf.length<11)cpf="0"+cpf;var o=/^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;var u=[];var a=new Number;var f=11;for(i=0;i<11;i++){u[i]=cpf.charAt(i);if(i<9)a+=u[i]*--f}if((x=a%11)<2){u[9]=0}else{u[9]=11-x}a=0;f=11;for(y=0;y<10;y++)a+=u[y]*f--;if((x=a%11)<2){u[10]=0}else{u[10]=11-x}if(cpf.charAt(9)!=u[9]||cpf.charAt(10)!=u[10]||cpf.match(o)){s.addClass(n.class_error);if(n.msg_error){s.next(n.msg_error).html(n.messages["cpf"])}r++}});return r>0?false:true},conf:function(t,n){var r=0;var t=t;if(n.confirm!=false){var i=n.confirm;var s=i.split(",");console.log(s);for(var o=0;o<s.length;o++){var u=e('.confirm[rel="'+s[o]+'"]',t);if(u.length==2){var a=u.eq(0);var f=u.eq(1);if(a.val()!=f.val()){u.addClass(n.class_error);if(n.msg_error){a.next(n.msg_error).html(n.messages["confirm"])}r++}}}}else{var u=e(".confirm",t);if(u.length==2){var a=u.eq(0);var f=u.eq(1);if(a.val()!=f.val()){u.addClass(n.class_error);if(n.msg_error){a.next(n.msg_error).html(n.messages["confirm"])}r++}}}},custom:function(t,n){var r=0;var t=t;var i=e(".custom",t);i.each(function(t){var i=e(this);var s=i.attr("name");var o=n.custom[s];if(o!=undefined){if(!o["reg"].test(i.val())&&i.val()!=""){i.addClass(n.class_error);if(o["msg"]!=undefined&&o["msg"]!=""){i.next(n.msg_error).html(o["msg"])}r++}}});return r>0?false:true},file:function(t,n){var r=0;var t=t;var i=e(".file",t);i.each(function(t){var i=e(this);var s=i.attr("rel");if(s!=undefined&&s!=""&&i.val()!=""){var o=s.split(",");var u=i.val().split(".");var a=u.pop();var f=0;for(var l=0;l<o.length;l++){if(o[l]==a){f++}}if(f==0){i.addClass(n.class_error);if(n.msg_error){i.next(n.msg_error).html(n.messages["file"])}r++}}});return r>0?false:true}}})(jQuery)