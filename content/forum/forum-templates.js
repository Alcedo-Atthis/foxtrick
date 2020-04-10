'use strict';
/**
 * forum-templates.js
 * Foxtrick forum template handling service
 * @author Mod-PaV, convincedd
 */

Foxtrick.modules['ForumTemplates'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.FORUM,
	PAGES: ['forumWritePost', 'messageWritePost', 'htPress', 'forumModWritePost'],
	OPTIONS: ['DefaultShow'],

	CSS: Foxtrick.InternalPath + 'resources/css/forum-templates.css',

	run: function(doc) {
		var MAIN = Foxtrick.getMainIDPrefix();
		var PAGES = {
			forumWritePost: {
				templatesDivId: 'post_templates',
				templatesPrefList: 'post_templates',
				newMsgWindow: MAIN + 'ucHattrickMLEditor_txtBody',
			},
			forumModWritePost: {
				templatesDivId: 'post_mod_templates',
				templatesPrefList: 'post_mod_templates',
				newMsgWindow: MAIN + 'ucHattrickMLEditor_txtBody',
			},
			messageWritePost: {
				templatesDivId: 'mail_templates',
				templatesPrefList: 'mail_templates',
				newMsgWindow: MAIN + 'ucEditorMain_txtBody',
			},
			htPress: {
				// For Staff! Users have another  MESSAGE_WINDOW ID !
				newMsgWindow: MAIN + 'txtComment',
				templatesDivId: 'htpress_templates',
				templatesPrefList: 'htpress_templates',
			}
		};
		var PAGE;
		for (var p in PAGES) {
			if (Foxtrick.isPage(doc, p)) {
				PAGE = PAGES[p];
				break;
			}
		}
		var templatesDivId = PAGE.templatesDivId;
		var templatesPrefList = PAGE.templatesPrefList;
		// var newMsgWindow = PAGE.newMsgWindow;

		var addNewTemplate = function() {
			var msg_window = doc.getElementById('mainBody').getElementsByTagName('textarea')[0];
			var text = Foxtrick.stripHTML(msg_window.value);
			var inputTitle = doc.getElementById('ForumTemplatesInputTitleId');

			var title = Foxtrick.stripHTML(inputTitle.value);

			if (title.search(/\[|\]/) != -1)
				Foxtrick.alert(Foxtrick.L10n.getString('ForumTemplates.templateTitle.error'));
			else if (Foxtrick.Prefs.addPrefToList(templatesPrefList, '[title=' + title + ']' +
			         text)) {
				appendTemplate('[title=' + title + ']' + text);
			}
			else
				Foxtrick.alert(Foxtrick.L10n.getString('ForumTemplates.make.error'));

			var inputTitleDiv = doc.getElementById('ForumTemplatesinputTitleDivId');
			inputTitleDiv.parentNode.removeChild(inputTitleDiv);
		};

		var addNewTitle = function() {
			try {
				var msg_window = doc.getElementById('mainBody').getElementsByTagName('textarea')[0];
				var text = Foxtrick.stripHTML(msg_window.value);
				if (text == '') {
					Foxtrick.alert(Foxtrick.L10n.getString('ForumTemplates.make.error'));
					return;
				}
				var inputTitleDiv = doc.getElementById('ForumTemplatesinputTitleDivId');
				var inputTitle = doc.getElementById('ForumTemplatesInputTitleId');
				if (!inputTitleDiv) {
					inputTitleDiv = doc.createElement('div');
					inputTitleDiv.setAttribute('id', 'ForumTemplatesinputTitleDivId');
					inputTitleDiv.setAttribute('style', 'padding-top:5px;');

					var TitleDesc = doc.createTextNode(Foxtrick.L10n
					                                   .getString('ForumTemplates.templateTitle'));
					inputTitleDiv.appendChild(TitleDesc);

					inputTitle = doc.createElement('input');
					inputTitle.setAttribute('id', 'ForumTemplatesInputTitleId');
					inputTitle.setAttribute('value', '');// text.substr(0,20));
					inputTitle.setAttribute('type', 'text');
					inputTitle.setAttribute('maxlength', '200');
					inputTitle.setAttribute('size', '20');
					inputTitle.setAttribute('tabIndex', '3');
					inputTitle.setAttribute('style', 'margin-left:5px;margin-right:5px;');
					inputTitleDiv.appendChild(inputTitle);
					inputTitle.focus();

					var button_ok = doc.createElement('input');
					button_ok.setAttribute('value', Foxtrick.L10n.getString('button.ok'));
					button_ok.setAttribute('id', 'ForumTemplatesOKId');
					button_ok.setAttribute('type', 'button');
					Foxtrick.onClick(button_ok, addNewTemplate);
					button_ok.setAttribute('tabindex', '5');
					inputTitleDiv.appendChild(button_ok);

					var button_cancel = doc.createElement('input');
					button_cancel.setAttribute('value', Foxtrick.L10n.getString('button.cancel'));
					button_cancel.setAttribute('id', 'ForumTemplatesCancelId');
					button_cancel.setAttribute('type', 'button');
					Foxtrick.onClick(button_cancel, CancelTitle);
					//button_cancel.setAttribute('tabindex', '');
					inputTitleDiv.appendChild(button_cancel);

					msg_window.parentNode.insertBefore(inputTitleDiv, msg_window);
				}
				inputTitle.setAttribute('value', text.substr(0, 20));
			}
			catch (e) {
				Foxtrick.log(e);
			}
		};
		var CancelTitle = function() {
			var inputTitleDiv = doc.getElementById('ForumTemplatesinputTitleDivId');
			inputTitleDiv.parentNode.removeChild(inputTitleDiv);
		};
		var ShowTemplates = function() {
			var div = doc.getElementById(templatesDivId);
			Foxtrick.toggleClass(div, 'hidden');
			var div = doc.getElementById('showTemplateId');
			Foxtrick.toggleClass(div, 'hidden');
			var div = doc.getElementById('hideTemplateId');
			Foxtrick.toggleClass(div, 'hidden');
		};
		var HideTemplates = function() {
			var div = doc.getElementById(templatesDivId);
			Foxtrick.toggleClass(div, 'hidden');
			var div = doc.getElementById('showTemplateId');
			Foxtrick.toggleClass(div, 'hidden');
			var div = doc.getElementById('hideTemplateId');
			Foxtrick.toggleClass(div, 'hidden');
		};
		var removeTemplate = function(ev) {
			if (Foxtrick.confirmDialog(Foxtrick.L10n.getString('ForumTemplates.delete.ask'))) {
				Foxtrick.Prefs.delListPref(templatesPrefList, ev.target.msg);
				ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);
			}
		};
		var fillMsgWindow = function(ev) {
			var msg_window = doc.getElementById('mainBody').getElementsByTagName('textarea')[0];
			Foxtrick.insertAtCursor(msg_window, ev.target.msg);
		};
		var appendTemplate = function(text, where) {
			if (arguments.length < 2) {
				var where = doc.getElementById(templatesDivId);
			}
			if (!where)
				return;

			var fulltext = text;
			var title = text.match(/\[title=([^\]]+)\]/);
			if (!title)
				title = text;
			else {
				title = title[1];
				text = text.replace(/\[title=[^\]]+\]/, '');
			}

			var container = doc.createElement('span');
			container.className = 'ft-forum-template-container';
			where.appendChild(container);
			var remover = doc.createElement('span');
			remover.className = 'ft-forum-template-remover ft_actionicon foxtrickRemove';
			remover.msg = fulltext;
			Foxtrick.onClick(remover, removeTemplate);
			container.appendChild(remover);
			var name = doc.createElement('a');
			name.className = 'ft-link ft-forum-template-name';
			name.msg = text;
			name.title = name.textContent = title;
			Foxtrick.onClick(name, fillMsgWindow);
			container.appendChild(name);
		};

		var sControlsID = 'foxtrick_forumtemplates_controls_div';
		if (doc.getElementById(sControlsID))
			return;
		// display templates above the message window
		//var msg_window = doc.getElementById(newMsgWindow);

		var msg_window = doc.getElementById('mainBody').getElementsByTagName('textarea')[0];


		if (!msg_window) return; // ie mailbox overview
		var templates_div = Foxtrick.createFeaturedElement(doc, this, 'div');
		templates_div.setAttribute('class', 'folderItem');
		templates_div.setAttribute('style', 'padding-top:5px;');
		templates_div.id = templatesDivId;

		msg_window.parentNode.insertBefore(templates_div, msg_window);

		var templates = Foxtrick.Prefs.getList(templatesPrefList);

		for (var i = 0; i < templates.length; ++i)
			appendTemplate(templates[i], templates_div);

		// display add new template button
		var controls_div = Foxtrick.createFeaturedElement(doc, this, 'div');
		controls_div.id = sControlsID;
		controls_div.style.paddingTop = '5px';
		var new_button = doc.createElement('a');
		new_button.id = 'addTemplateId';
		new_button.className = 'ft-link';
		new_button.setAttribute('style', 'margin-right:10px;');

		// tabindex is intended to be lower than ddlRecipient, which is 6 atm
		new_button.setAttribute('tabindex', '3');
		new_button.setAttribute('role', 'button');
		new_button.textContent = Foxtrick.L10n.getString('ForumTemplates.make');
		Foxtrick.onClick(new_button, addNewTitle);
		controls_div.appendChild(new_button);

		if (!Foxtrick.Prefs.isModuleOptionEnabled('ForumTemplates', 'DefaultShow')) {
			Foxtrick.addClass(templates_div, 'hidden');

			var show_button = doc.createElement('a');
			show_button.id = 'showTemplateId';
			show_button.className = 'ft-link';
			show_button.setAttribute('style', 'margin-right:10px;');
			//show_button.setAttribute('tabIndex', '3');
			show_button.textContent = Foxtrick.L10n.getString('ForumTemplates.show');
			Foxtrick.onClick(show_button, ShowTemplates);
			controls_div.appendChild(show_button);

			var hide_button = doc.createElement('a');
			hide_button.id = 'hideTemplateId';
			hide_button.className = 'hidden ft-link';
			hide_button.setAttribute('style', 'margin-right:10px;');
			//hide_button.setAttribute('tabIndex', '3');
			hide_button.textContent = Foxtrick.L10n.getString('ForumTemplates.hide');
			Foxtrick.onClick(hide_button, HideTemplates);
			controls_div.appendChild(hide_button);
		}

		msg_window.parentNode.insertBefore(controls_div, msg_window);
	},

	change: function(doc) {
		this.run(doc);
	}
};
