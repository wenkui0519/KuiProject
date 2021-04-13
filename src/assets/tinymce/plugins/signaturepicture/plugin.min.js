/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
/*global tinymce:true */
tinymce.PluginManager.add('signaturepicture', function(editor, url) {
    var eoffice_login_user = eval('(' + localStorage.getItem("eoffice_login_user") + ')');
    var token = eoffice_login_user.token;
    editor.ui.registry.addButton('signaturepicture', {
        tooltip: 'Signature picture',
        icon: 'image',
        onAction: function() {
            var caseID = window.localStorage.getItem('caseID');
            var url = "../../../server/public/api/personal-set/get-signature-picture?api_token=" + token;
            if (caseID) {
                url += '&CASE_ID=' + caseID;
            }
            $.ajax({
                async: false,
                url: url,
                data: {
                    'encrypt': 1
                },
                success: function(response) {
                    if (response.data && response.data.attachment_id && response.data.encrypt_attach) {
                        var src = '../../../server/public/api/attachment/index/' + response.data.attachment_id + "?attachment_id=" + encodeURIComponent(response.data.encrypt_attach) + "&api_token=" + token;
                        if (caseID) {
                            src +=  '&CASE_ID=' + caseID;
                        }
                        var html = "<img width='200' src='" + src + "'>";
                        editor.insertContent(html);
                    }
                }
            });
        },
    });
});
