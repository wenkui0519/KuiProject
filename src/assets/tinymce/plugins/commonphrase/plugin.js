/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

const { resolve, reject } = require("core-js/fn/promise");

/*global tinymce:true */

tinymce.PluginManager.add('commonphrase', function (editor, url) {
    var token = '';
    if (localStorage.getItem("eoffice_login_user")) {
        var eoffice_login_user = JSON.parse(localStorage.getItem("eoffice_login_user"));
        if (eoffice_login_user) {
            token = eoffice_login_user.token || '';
        }
    }
    // 封装Ajax
    function ajax(obj) {
        return new Promise((resolve, reject) => {
            $.ajax({
                async: obj.async,
                url: obj.url,
                data: obj.data,
                success: function (response) {
                    resolve(response.data);
                }
            });
        })
    }

    async function getHtml() {
        var arr = [];
        var html = "<div class='common-phrase'>";
        var content = "";
        const sysCom = await ajax({
            async: false,
            url: "../../server/public/api/system/system-phrase/list?api_token=" + token,
            data: "",
        })
        if (sysCom.list.length > 0) {
            content += "<h2 style='cursor: default;padding: 0 0 0 5px;font-size: 14px;font-weight: 700;'>系统常用短语</h2>"; // 系统常用短语
            for (var i = 0; i < sysCom.list.length; i++) {
                content += "<p style='padding:0 0 0 20px;cursor: pointer;font-size: 14px;margin: 0 0 5px;' title='" + sysCom.list[i].content + "'>" + sysCom.list[i].content + "</p>";
            }
        }
        const perCom = await ajax({
            async: false,
            url: "../../server/public/api/personal-set/history-common-phrase?api_token=" + token,
            data: "",
        })
        if (perCom.list.length > 0) {
            content += "<h2 style='cursor: default;padding: 0 0 0 5px;font-size: 14px;font-weight: 700;'>个人常用短语</h2>"; //个人常用短语
            for (var i = 0; i < perCom.list.length; i++) {
                content += "<p style='padding:0 0 0 20px;cursor: pointer;font-size: 14px;margin: 0 0 5px;'  title='" + perCom.list[i].content + "'>" + perCom.list[i].content + "</p>";
            }
        }
        if (content == "") {
            " + window.trans('eui.editor.not_set_phrase') + "
            content = "<div class='no-common-phrase' title='您暂未设置常用短语！'>您暂未设置常用短语！</div>" //您暂未设置常用短语！
        }
        html += content;
        html += "</div>";
        return html;
    }

    async function createPopover(event) {
        var popover = document.getElementById('editor_popover_20210409'),
        bg=document.getElementById('editor_bg_20210409');
        if (popover) {
            const display = popover.style.display;
            if (display === 'none') {
                popover.style.left = event.clientX + 'px';
                popover.style.top = event.clientY + 40 + 'px';
                popover.style.display = 'block';
                bg.style.display = "block";
            } else {
                popover.style.display = 'none';
                bg.style.display = "none";
            }
        } else {
            popover = document.createElement('div');
            popover.setAttribute('id', 'editor_popover_20210409');
            popover.style = 'position:fixed;border:1px solid #dcdcdc; overflow: auto; background: #fff;';
            popover.style.width = '230px';
            popover.style['max-height'] = '350px';
            if (document.body.clientWidth - event.clientX <= 400) {
                popover.style['margin-left'] = '-150px';
            }
            popover.style.left = event.clientX - 20 + 'px';
            popover.style.top = event.clientY + 30 + 'px';
            popover.style.zIndex = '100';
            popover.style.padding = '5px 0';
            popover.style.cursor = 'default';
            popover.innerHTML = await getHtml();
            document.body.appendChild(popover);
            // 创建背景
            bg = document.createElement('div');
            bg.setAttribute('id', 'editor_bg_20210409');
            document.body.appendChild(bg);
            jQuery(bg).css({ 'position': 'fixed', 'left': '0', 'top': '0', 'right': '0', 'bottom': '0', 'z-index': '99' })
            jQuery('#editor_bg_20210409').click(() => {
                bg.style.display = 'none';
                popover.style.display = 'none';
            })
            jQuery(popover).find("p").click((e) => {
                if (e) {
                    e.stopPropagation();
                }
                bg.style.display = 'none';
                popover.style.display = 'none';
                editor.insertContent(e.target.innerHTML);
            })
            jQuery(popover).find("p").hover((e) => {
                if (e.target.tagName == 'P') {
                    $(e.target).css({ 'background': '#efefef' })
                }
            }, (e) => {
                if (e.target.tagName == 'P') {
                    $(e.target).css({ 'background': '#fff' })
                }
            })
        }
    }
    editor.ui.registry.addButton('commonphrase', {
        // type: 'panelbutton',
        tooltip: 'Useful expressions',
        // text: '常用短语',
        icon: 'comment',
        onAction: function (_) {
            createPopover(event);
        },
    });
});
