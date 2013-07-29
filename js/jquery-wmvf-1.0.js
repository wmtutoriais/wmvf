/*
 * desenvolvidor por Welison Menezes
 * welisonmenezes@gmail.com
 */
(function( $ ){
    $.fn.wmvf = function(options) {
        var element  = $(this);
        var defaults = {
            btn_submit        : 'input[type=submit]',
            msg_error         : false,
            checkboxes_radios : false,
            class_error       : 'wm_error',
            confirm           : false,
            custom            : false,
            messages          : {
                required  : 'Campo requerido!',
                email     : 'E-mail inválido!',
                numeric   : 'Por favor, apenas número.',
                between   : 'Por favor, digite entre %min% e %max% caracter(es)',
                maxlength : 'Por favor, digite no máximo %max% caracter(es).',
                minlength : 'Por favor, digite no mínimo %min% caracter(es).',
                cpf       : 'CPF inválido!',
                confirm   : 'A confirmação está diferente!',
                file      : 'O tipo do arquivo é inválido!'
            }
        };
        var settings = $.extend(true, defaults, options);
        funcs.new_submit(element, settings);
    };
    var funcs = {
        new_submit: function(el, set){
            $(set.btn_submit, el).click(function(){
                var error = 0;
                if( set.msg_error ){
                    $(set.msg_error).html('');
                }
                if( funcs.required(el, set) == false ) error++;
                if( funcs.email(el, set) == false ) error++;
                if( funcs.numeric(el, set) == false ) error++;
                if( funcs.between(el, set) == false ) error++;
                if( funcs.maxlength(el, set) == false ) error++;
                if( funcs.minlength(el, set) == false ) error++;
                if( funcs.cpf(el, set) == false ) error++;
                if( funcs.conf(el, set) == false ) error++;
                if( funcs.custom(el, set) == false ) error++;
                if( funcs.file(el, set) == false ) error++;
                if( error > 0 ){
                    return false;
                }else{
                    el.submit();
                }
            });
        },
        required: function(el, set){
            var el    = el;
            var reqs  = $('.required', el);
            var ch_ra = set.checkboxes_radios;
            var error = 0;
            // text, password, select, textarea, file
            reqs.each(function(){
                var el = $(this);
                if( el.attr('type') != 'checkbox' && el.attr('type') != 'radio' ){
                    if( el.val() == '' ){
                        el.addClass(set.class_error);
                        if( set.msg_error ){
                            el.next(set.msg_error).html(set.messages['required']);
                        }
                        error++;
                    }
                }
            });
            // radio and checbox by name
            if( ch_ra ){
                var c_r = ch_ra.split(',');
                for(var i=0;i<c_r.length;i++){
                    var field_checked = $('input[type=checkbox][name='+c_r[i]+'].required, input[type=radio][name='+c_r[i]+'].required', el);
                    var checked = $('input[type=checkbox][name='+c_r[i]+'].required:checked, input[type=radio][name='+c_r[i]+'].required:checked', el).length;
                    if( checked < 1 ){
                        field_checked.addClass(set.class_error);
                        if( set.msg_error ){
                            field_checked.next(set.msg_error).html(set.messages['required']);
                        }
                        error++;
                    }
                }
            }else{
                // generic checkbox
                var inp_box = $('input[type=checkbox].required');
                if( inp_box.length >= 1 ){
                    var field_checkbox = $('input[type=checkbox].required', el);
                    var checked_1 = $('input[type=checkbox].required:checked', el).length;
                    if( checked_1 < 1 ){
                        field_checkbox.addClass(set.class_error);
                        if( set.msg_error ){
                            field_checkbox.next(set.msg_error).html(set.messages['required']);
                        }
                        error++;
                    }
                }
                // generic radio
                var inp_rad = $('input[type=radio].required');
                if( inp_rad.length >= 1 ){
                    var field_radio = $('input[type=radio].required', el);
                    var checked_2 = $('input[type=radio].required:checked', el).length;
                    if( checked_2 < 1 ){
                        field_radio.addClass(set.class_error);
                        if( set.msg_error ){
                            field_radio.next(set.msg_error).html(set.messages['required']);
                        }
                        error++;
                    }
                }
            }
            return (error > 0) ? false : true;
        },
        email: function(el, set){
            var el     = el;
            var emails = $('.email', el);
            var error  = 0;
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            emails.each(function(index){
                var el = $(this);
                if( !emailReg.test( el.val() ) ) {
                    el.addClass(set.class_error);
                    if( set.msg_error ){
                        el.next(set.msg_error).html(set.messages['email']);
                    }
                    error++;
                }
            });
            return (error > 0) ? false : true;
        },
        numeric: function(el, set){
            var el    = el;
            var num   = $('.numeric', el);
            var error = 0;
            var numReg = /^\d+$/;
            num.each(function(index){
                var el = $(this);
                if( !numReg.test( el.val() ) || el.val() == '' ) {
                    el.addClass(set.class_error);
                    if( set.msg_error ){
                        el.next(set.msg_error).html(set.messages['numeric']);
                    }
                    error++;
                }
            });
            return (error > 0) ? false : true;
        },
        between: function(el, set){
            var el     = el;
            var el_bet = $('.between', el);
            var r_bet  = /^(\d),(\d)$/;
            var error  = 0;
            el_bet.each(function(index){
                var el = $(this);
                var p_bet = el.attr('rel');
                if( p_bet != undefined && p_bet != '' ){
                    if( r_bet.test( p_bet ) ){
                        var s_bet = p_bet.split(',');
                        if( el.val().length < s_bet[0] || el.val().length > s_bet[1] ){
                            el.addClass(set.class_error);
                            if( set.msg_error ){
                                var msg = set.messages['between'].replace('%min%',s_bet[0]);
                                msg     = msg.replace('%max%',s_bet[1]);
                                el.next(set.msg_error).html( msg );
                            }
                            error++;
                        }
                    }
                }
            });
            return (error > 0) ? false : true;
        },
        maxlength: function(el, set){
            var el     = el;
            var el_max = $('.maxlength', el);
            var r_max  = /^\d+$/;
            var error  = 0;
            el_max.each(function(index){
                var el    = $(this);
                var p_max = el.attr('rel');
                if( p_max != undefined && p_max != '' ){
                    if( r_max.test( p_max ) ){
                        if( el.val().length > p_max ){
                            el.addClass(set.class_error);
                            if( set.msg_error ){
                                var msg = set.messages['maxlength'].replace('%max%',p_max);
                                el.next(set.msg_error).html( msg );
                            }
                            error++;
                        }
                    }
                }
            });
            return (error > 0) ? false : true;
        },
        minlength: function(el, set){
            var el     = el;
            var el_min = $('.minlength', el);
            var r_min  = /^\d+$/;
            var error  = 0;
            el_min.each(function(index){
                var el    = $(this);
                var p_min = el.attr('rel');
                if( p_min != undefined && p_min != '' ){
                    if( r_min.test( p_min ) ){
                        if( el.val().length < p_min ){
                            el.addClass(set.class_error);
                            if( set.msg_error ){
                                var msg = set.messages['minlength'].replace('%min%',p_min);
                                el.next(set.msg_error).html( msg );
                            }
                            error++;
                        }
                    }
                }
            });
            return (error > 0) ? false : true;
        },
        cpf: function(el, set){
            var error  = 0;
            var el     = el;
            var el_cpf = $('.cpf',el);
            el_cpf.each(function(index){
                var t_el = $(this);
                value  = t_el.val().replace('.','');
                value2 = value.replace('.','');
                cpf    = value2.replace('-','');
                while(cpf.length < 11) cpf = "0"+ cpf;
                var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
                var a = [];
                var b = new Number;
                var c = 11;
                for (i=0; i<11; i++){
                    a[i] = cpf.charAt(i);
                    if (i < 9) b += (a[i] * --c);
                }
                if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
                b = 0;
                c = 11;
                for (y=0; y<10; y++) b += (a[y] * c--);
                if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
                if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) {
                    t_el.addClass(set.class_error);
                    if( set.msg_error ){
                        t_el.next(set.msg_error).html(set.messages['cpf']);
                    }
                    error++;
                }
            });
            return (error > 0) ? false : true;
        },
        conf: function(el, set){
            var error   = 0;
            var el      = el;
            if( set.confirm != false ){
                var string = set.confirm;
                var s_conf = string.split(",");
                console.log(s_conf);
                for(var i=0; i<s_conf.length; i++){
                    var el_conf = $('.confirm[rel="'+s_conf[i]+'"]',el);
                    if( el_conf.length == 2 ){
                        var c_1 = el_conf.eq(0);
                        var c_2 = el_conf.eq(1);
                        if( c_1.val() != c_2.val() ){
                            el_conf.addClass(set.class_error);
                            if( set.msg_error ){
                                c_1.next(set.msg_error).html(set.messages['confirm']);
                            }
                            error++;
                        }
                    }
                }
            }else{
                var el_conf = $('.confirm',el);
                if( el_conf.length == 2 ){
                    var c_1 = el_conf.eq(0);
                    var c_2 = el_conf.eq(1);
                    if( c_1.val() != c_2.val() ){
                        el_conf.addClass(set.class_error);
                        if( set.msg_error ){
                            c_1.next(set.msg_error).html(set.messages['confirm']);
                        }
                        error++;
                    }
                }
            }
             
        },
        custom: function(el, set){
            var error   = 0;
            var el      = el;
            var cust    = $('.custom', el);
            cust.each(function(index){
                var el   = $(this);
                var nome = el.attr('name');
                var obj  = set.custom[nome];
                if( obj != undefined ){
                    if( ! obj['reg'].test( el.val() ) && el.val() != '' ){ 
                        el.addClass(set.class_error);
                        if( obj['msg'] != undefined && obj['msg'] != '' ){
                            el.next(set.msg_error).html(obj['msg']);
                        }
                        error++;
                    }
                }
            });
            return (error > 0) ? false : true;
        },
        file: function(el, set){
            var error   = 0;
            var el      = el;
            var file    = $('.file', el);
            file.each(function(index){
                var el    = $(this);
                var types = el.attr('rel');
                if( types != undefined && types != '' && el.val() != '' ){
                    var ar_types   = types.split(',');
                    var ar_val     = el.val().split('.');
                    var lastEl     = ar_val.pop();
                    var in_ar      = 0;
                    for (var i = 0; i <ar_types.length; i++) {
                        if( ar_types[i] == lastEl ){
                            in_ar++;
                        }
                    }
                    if( in_ar == 0 ){
                        el.addClass(set.class_error);
                        if( set.msg_error ){
                            el.next(set.msg_error).html(set.messages['file']);
                        }
                        error++;
                    }
                }
            });
            return (error > 0) ? false : true;
        }
    }
})( jQuery );