/**
 * linkscustom.js
 * Allows to adds custom links
 * @author convinced
 */

 ////////////////////////////////////////////////////////////////////////////////

var FoxtrickLinksCustom = {
    MODULE_NAME : "LinksCustom",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	NEW_AFTER_VERSION: "0.4.7.5",
	LATEST_CHANGE:"Fixed removed delete button for custom links. Added remove button to standard links",

	_ownBoxBody:"",
	_basepref:"",
	_info:"",

	add : function( page, doc,ownBoxBody,pagemodule,info ) {
		try {
			FoxtrickLinksCustom._info=info;

			var basepref="module."+FoxtrickLinksCustom.MODULE_NAME+'.'+pagemodule;

			if (ownBoxBody==null) {
				ownBoxBody = doc.createElement("div");
				var ownBoxId = "foxtrick_links_box";
				var ownBoxBodyId = "foxtrick_links_content";
				var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
                ownBoxBody.setAttribute( "id", ownBoxBodyId );

				Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
			}

			var alldivs = doc.getElementsByTagName('div');
			for (var j = 0; j < alldivs.length; j++) {
				if (alldivs[j].className=="sidebarBox" ) {
					var header = alldivs[j].getElementsByTagName("h2")[0];
					if (header.innerHTML == Foxtrickl10n.getString("foxtrick.links.boxheader" )) {
						var pn=header.parentNode;
						var hh=pn.removeChild(header);
						var div = doc.createElement("div");
						div.appendChild(hh);
						div.setAttribute( "title", Foxtrickl10n.getString("foxtrick.linkscustom.addpersonallink") );
						Foxtrick.addEventListenerChangeSave( div, "click", FoxtrickLinksCustom.HeaderClick, false );
						ownBoxBody.setAttribute('basepref',basepref);
						pn.insertBefore(div,pn.firstChild);
						break;
					}
				}
			}


			var all_links=ownBoxBody.getElementsByTagName('a');
			for (var i=0;i<all_links.length;++i) {
				var key = all_links[i].getAttribute('key');
				var module_name = all_links[i].getAttribute('module');
				if (key && module_name) {
					var delLink = doc.createElement("div");
					delLink.setAttribute("class","ft_actionicon foxtrickRemove");
					delLink.setAttribute( "title", Foxtrickl10n.getString("foxtrick.linkscustom.remove"));
					Foxtrick.addEventListenerChangeSave( delLink, "click", FoxtrickLinksCustom.delStdLink, false );
					ownBoxBody.insertBefore(delLink,all_links[i].nextSibling);
				}
			}

			if (Foxtrick.isModuleEnabled(this)) {
				FoxtrickLinksCustom.showEdit( doc , ownBoxBody, basepref);
			}
			else {
				FoxtrickLinksCustom.showLinks(doc,ownBoxBody,basepref);
			}
		}
		catch(e){Foxtrick.dump("CustomLinks->"+e);}
	},

	showLinks : function(doc,ownBoxBody,basepref){
		try {
			var ownBoxId = "foxtrick_links_box";
			var div=doc.getElementById(ownBoxId).firstChild;
			div.setAttribute("class","boxHead ft_sidebarBoxCollapsed");
			if (Foxtrick.isRTLLayout(doc)) div.setAttribute("class","boxHead ft_sidebarBoxCollapsed_rtl");

			var all_links=ownBoxBody.getElementsByTagName('a');
			for (var i=0;i<all_links.length;++i) {
				var key = all_links[i].getAttribute('key');
				if (key) {
					all_links[i].nextSibling.style.display="none";
				}
			}

			// get custon links from pref
			var keys={};
			var array = FoxtrickPrefs._getElemNames( basepref );
			for (var nl=0;nl<array.length;nl++) {
				var key=array[nl].replace(basepref+'\.',"");
				if (key.search(/\./)!=-1) {key=key.replace(/\..+/,"");keys[key]=key;}
				else continue;
			}
			for (key in keys)  {
				var href=FoxtrickPrefs.getString(basepref+'.'+key+'.href');
				var imgref=FoxtrickPrefs.getString(basepref+'.'+key+'.img');
				var title=FoxtrickPrefs.getString(basepref+'.'+key+'.title');
				if (href==null||imgref==null||title==null) {Foxtrick.dump('customLink '+key+' incomplete\n');continue; }
				// replace tags

				var mykeytag=href.match(/\[\w+\]/ig);
				if (mykeytag && mykeytag.length>0) {
					for (var i=0;i<mykeytag.length;i++)
					{
						var mykey=mykeytag[i].replace(/\[/,"").replace(/\]/,"");
						if (FoxtrickLinksCustom._info[mykey]) href=href.replace (mykeytag[i],FoxtrickLinksCustom._info[mykey] );
						else  href=href.replace( mykeytag[i], FoxtrickHelper.ownTeam[mykey] );
					}
				}
				try { // add icons
					var a = doc.createElement("a");
					a.id = 'LinksCustomLinkID'+key;
					a.className = "inner";
					a.title = FoxtrickPrefs.getString(basepref+'.'+key+'.title');
					a.href = href;
					a.setAttribute("target", "_blank");
					var img = doc.createElement("img");
					img.style.width = img.style.height = "16px";
					img.src = FoxtrickPrefs.getString(basepref+'.'+key+'.img');
					img.alt = FoxtrickPrefs.getString(basepref+'.'+key+'.title');
					a.appendChild(img);
					ownBoxBody.appendChild(a);
				} catch(e){Foxtrick.dump('showLinks_adddiv: '+e);continue;}
			}
		}
		catch(e){Foxtrick.dump("CustomLinks->showLinks->"+e+'\n');}
	},

	showEdit : function( doc , ownBoxBody, basepref) {
		try {
			// box
			var ownBoxId = "foxtrick_links_box";
			var div=doc.getElementById(ownBoxId).firstChild;
			div.setAttribute("class","boxHead ft_sidebarBoxUnfolded");
			if (Foxtrick.isRTLLayout(doc)) div.setAttribute("class","boxHead  ft_sidebarBoxUnfolded_rtl");

			var all_links=ownBoxBody.getElementsByTagName('a');
			for (var i=0;i<all_links.length;++i) {
				var key = all_links[i].getAttribute('key');
				if (key) {
					all_links[i].nextSibling.style.display="";
				}
			}

			var divED = doc.createElement("div");
			divED.id = "divEDId";
			divED.className = "ft-note";

			var table=doc.createElement ("table");
			table.width="120px";
			table.setAttribute('id','LinksCustomTableID');
			var tr0 = doc.createElement ("tr");
			var th = doc.createElement ("th");
			th.innerHTML =Foxtrickl10n.getString("foxtrick.linkscustom.addpersonallink" );
			th.setAttribute("colspan","5");
			tr0.appendChild(th);
			table.appendChild(tr0);

			// get custon links from pref
			var keys={};
			var array = FoxtrickPrefs._getElemNames( basepref );
			for (var nl=0;nl<array.length;nl++) {
				var key=array[nl].replace(basepref+'\.',"");
				if (key.search(/\./)!=-1) {key=key.replace(/\..+/,"");keys[key]=key;}
				else continue;
			}
			for (key in keys)  {
				var href=FoxtrickPrefs.getString(basepref+'.'+key+'.href');
				var imgref=FoxtrickPrefs.getString(basepref+'.'+key+'.img');
				var title=FoxtrickPrefs.getString(basepref+'.'+key+'.title');
				if (href==null||imgref==null||title==null) {continue;}

				var a = doc.createElement("a");
				a.title = FoxtrickPrefs.getString(basepref+'.'+key+'.title');
				a.href = FoxtrickPrefs.getString(basepref+'.'+key+'.href');
				a.setAttribute("target", "_blank");
				var img = doc.createElement("img");
				img.className = "ft-links-custom-icon-edit";
				img.src = FoxtrickPrefs.getString(basepref+'.'+key+'.img');
				img.alt = FoxtrickPrefs.getString(basepref+'.'+key+'.title');
				a.appendChild(img);

				var tr1 = doc.createElement ("tr");
				var td1 = doc.createElement ("td");
				var td2 = doc.createElement ("td");
				td2.setAttribute("style","vertical-align:middle;");
				td2.width="100%";
				var tdiv = doc.createElement ("div");
				var title = doc.createTextNode(FoxtrickPrefs.getString(basepref+'.'+key+'.title').substr(0,8));
				var td3 = doc.createElement ("td");
				td3.setAttribute("style","vertical-align:middle;");
				td3.width="16px";
				var td4 = doc.createElement ("td");
				td4.setAttribute("style","vertical-align:middle;");
				td4.width="16px";
				var td5 = doc.createElement ("td");
				td5.setAttribute("style","vertical-align:middle;");
				td5.width="16px";

				td1.appendChild(a);
				tdiv.appendChild(title);
				td2.appendChild(tdiv);
				if (key.length>3) td5.appendChild(FoxtrickLinksCustom.GetExportLink(doc,a,basepref+'.'+key)); // prevent export of oldstyle keys
				td3.appendChild(FoxtrickLinksCustom.GetEditOldLink(doc,a,basepref+'.'+key));
				td4.appendChild(FoxtrickLinksCustom.GetDelLink(doc,a,basepref+'.'+key));
				tr1.appendChild(td1);
				tr1.appendChild(td2);
				tr1.appendChild(td5);
				tr1.appendChild(td3);
				tr1.appendChild(td4);
				table.appendChild(tr1);
			}

			divED.appendChild(table);

			var table2=doc.createElement ("table");
			table2.setAttribute('id','LinksCustomTable2ID');

			var div = doc.createElement("div");
			div.id = "inputImgDivID";
			div.className = "ft_icon foxtrickBrowse";

			// load image button
			var loadIcon = doc.createElement("a");
			loadIcon.href = "javascript: void(0);";
			loadIcon.className = "inner";
			loadIcon.textContent = Foxtrickl10n.getString("foxtrick.linkscustom.selecticon");
			Foxtrick.addEventListenerChangeSave( loadIcon, "click", FoxtrickLinksCustom.LoadDialog, false );

			var tr1 = doc.createElement ("tr");
			var td1 = doc.createElement ("td");
			td1.width="20px";
			var td2 = doc.createElement ("td");
			td2.setAttribute("style","vertical-align:middle;");
			td2.width="100%";
			td1.appendChild(div);
			td2.appendChild(loadIcon);
			td2.setAttribute("colspan","4");
			tr1.appendChild(td1);
			tr1.appendChild(td2);
			table.appendChild(tr1);

			// titel edit field
			var inputTitle = doc.createElement ("input");
			inputTitle.setAttribute("name", "inputTitle");
			inputTitle.setAttribute("id", "inputTitleID");
			inputTitle.setAttribute("value", "Title");
			inputTitle.setAttribute('onfocus', 'if(FoxtrickLinksCustom.value==\'Title\')FoxtrickLinksCustom.value=\'\'');
			inputTitle.setAttribute("type", "text");
			inputTitle.setAttribute("maxlength", "100");
			inputTitle.setAttribute("style","width:100%;");
			var trn4 = doc.createElement ("tr");
			var tdn4 = doc.createElement ("td");
			var divn4 = doc.createElement ("div");
			divn4.appendChild(inputTitle);
			tdn4.appendChild(divn4);
			tdn4.setAttribute("colspan","3");
			trn4.appendChild(tdn4);
			table2.appendChild(trn4);

			// href edit field
			var inputHref = doc.createElement ("input");
			inputHref.setAttribute("name", "inputHref");
			inputHref.setAttribute("id", "inputHrefID");
			inputHref.setAttribute("value", "http://example.org");
			inputHref.setAttribute('onfocus', 'if(FoxtrickLinksCustom.value==\'http://example.org\')FoxtrickLinksCustom.value=\'http://\'');
			inputHref.setAttribute("type", "text");
			inputHref.setAttribute("maxlength", "5000");
			inputHref.setAttribute("style","width:100%;");
			inputHref.className ="inner";
			var trn3 = doc.createElement ("tr");
			var tdn3 = doc.createElement ("td");
			var divn3 = doc.createElement ("div");
			divn3.appendChild(inputHref);
			tdn3.appendChild(divn3);
			tdn3.setAttribute("colspan","3");
			trn3.appendChild(tdn3);
			table2.appendChild(trn3);

			// tag select list
			var selectbox = doc.createElement("select");
			selectbox.setAttribute("title",Foxtrickl10n.getString("foxtrick.linkscustom.addtag" ));
			selectbox.setAttribute("id","ft_ownselecttagboxID");
			selectbox.setAttribute("style","width:100%;");
			Foxtrick.addEventListenerChangeSave(selectbox, 'change',FoxtrickLinksCustom.SelectBox_Select,false);
			var option = doc.createElement("option");
			option.setAttribute("value","");
			option.innerHTML=Foxtrickl10n.getString("foxtrick.linkscustom.tags" );
			selectbox.appendChild(option);

			for (var key in FoxtrickLinksCustom._info) {
				var option = doc.createElement("option");
				option.setAttribute("value",key);
				option.innerHTML='['+key+']';
				option.setAttribute("style","width:100%;");
				selectbox.appendChild(option);
			}
			try {
				for (var key in FoxtrickHelper.ownTeam) {
					var option = doc.createElement("option");
					option.setAttribute("value",key);
					option.innerHTML='['+key+']';
					option.setAttribute("style","width:100%;");
					selectbox.appendChild(option);
					}
			} catch(e){Foxtrick.dump('tags: ownteaminfo not available\n');}
			var trn2 = doc.createElement ("tr");
			var tdn2 = doc.createElement ("td");
			var divn2 = doc.createElement ("div");
			divn2.appendChild(selectbox);
			tdn2.appendChild(divn2);
			tdn2.setAttribute("colspan","3");
			trn2.appendChild(tdn2);
			table2.appendChild(trn2);


			// save link
			var saveLink = doc.createElement ("a");
			saveLink.setAttribute("href", "javascript: void(0);");
			saveLink.setAttribute("name", "savelinkname");
			saveLink.setAttribute("basepref", basepref);
			Foxtrick.addEventListenerChangeSave(saveLink, "click", FoxtrickLinksCustom.saveMyLink, false );
			saveLink.innerHTML = Foxtrickl10n.getString("foxtrick.linkscustom.addlink" );
			var trn5 = doc.createElement ("tr");
			var tdn5 = doc.createElement ("td");
			tdn5.setAttribute("colspan","2");
			var divn5 = doc.createElement ("div");
			divn5.appendChild(saveLink);
			tdn5.appendChild(divn5);

			var helplink = doc.createElement("a");
			helplink.className = "ft_actionicon foxtrickHelp float_right";
			helplink.title = Foxtrickl10n.getString("foxtrick.linkscustom.help");
			helplink.href = "javascript: alert('"+Foxtrickl10n.getString('foxtrick.linkscustom.helptext')+' \n'+Foxtrickl10n.getString('foxtrick.linkscustom.helptext2')+"');";

			var tdn5b = doc.createElement ("td");
			tdn5b.appendChild(helplink);

			trn5.appendChild(tdn5);
			trn5.appendChild(tdn5b);
			table2.appendChild(trn5);
			divED.appendChild(table2);

			ownBoxBody.appendChild(divED);

		}
		catch (e) {Foxtrick.dump("LinksCustom->show_edit->"+e+'\n');}
	},


	delStdLink : function (evt) {
		try {
			var doc = evt.target.ownerDocument;

			var key = evt["target"].previousSibling.getAttribute("key");
			var module_name = evt["target"].previousSibling.getAttribute("module");
			var par=evt["target"].parentNode;
			par.removeChild(evt["target"].previousSibling);
			par.removeChild(evt["target"]);
			FoxtrickPrefs.setBool( "module." + module_name+'.'+key + ".enabled",false);
		}
		catch (e) {Foxtrick.dump("LinksCustom->edityLink->"+e+'\n');}
	},


	delMyLink : function (evt) {
		try {
			var doc = evt.target.ownerDocument;
			var Check = doc.defaultView.confirm(Foxtrickl10n.getString("foxtrick.linkscustom.confirmremove"));
			if (Check == false) return;

			var mylink = evt["target"]["mylink"];
			var baseprefnl = evt["target"]["baseprefnl"];
			FoxtrickPrefs.delListPref(baseprefnl+'.href');
			FoxtrickPrefs.delListPref(baseprefnl+'.title');
			FoxtrickPrefs.delListPref(baseprefnl+'.img');
			mylink.parentNode.parentNode.parentNode.removeChild(mylink.parentNode.parentNode);
		}
		catch (e) {Foxtrick.dump("LinksCustom->edityLink->"+e+'\n');}

	},


	editOldLink : function (evt) {
		try {
			var doc = evt.target.ownerDocument;
			var baseprefnl = evt["target"]["baseprefnl"];
			doc.getElementById("inputHrefID").value= FoxtrickPrefs.getString(baseprefnl+'.href');
			doc.getElementById("inputTitleID").value= FoxtrickPrefs.getString(baseprefnl+'.title');
			doc.getElementById("inputImgDivID").style.backgroundImage = "url('" + FoxtrickPrefs.getString(baseprefnl+'.img') +"')";
			doc.getElementById("inputImgDivID").imgref=FoxtrickPrefs.getString(baseprefnl+'.img');
			doc.getElementById('inputImgIDName').src = FoxtrickPrefs.getString(baseprefnl+'.img');
		}
		catch (e) {Foxtrick.dump("LinksCustom->editOldLink->"+e+'\n');}
	},


	Export : function (evt) {
		try {
			var doc = evt.target.ownerDocument;
			var baseprefnl = evt.target.baseprefnl;

			var locpath=Foxtrick.selectFileSave(doc.defaultView);
			if (locpath==null) {return;}
			var File = Components.classes["@mozilla.org/file/local;1"].
                     createInstance(Components.interfaces.nsILocalFile);
			File.initWithPath(locpath);

			var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                         createInstance(Components.interfaces.nsIFileOutputStream);
			foStream.init(File, 0x02 | 0x08 | 0x10, 0666, 0);  // write, create, append
			var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
                   .createInstance(Components.interfaces.nsIConverterOutputStream);
			os.init(foStream, "UTF-8", 0, 0x0000);

			var array = FoxtrickPrefs._getElemNames(baseprefnl);
			for(var i = 0; i < array.length; i++) {
					var value=FoxtrickPrefs.getString(array[i]);
					if (value!=null) os.writeString('user_pref("extensions.foxtrick.prefs.'+array[i]+'","'+value+'");\n');
					else { value=FoxtrickPrefs.getInt(array[i]);
						if (value==null) value=FoxtrickPrefs.getBool(array[i]);
						os.writeString('user_pref("extensions.foxtrick.prefs.'+array[i]+'",'+value+');\n');
						}
				}
			os.close();
			foStream.close();
		}
		catch (e) {Foxtrick.dump("LinksCustom->exportLink->"+e+'\n');}
	},

	saveMyLink : function (evt) {
		try {
			var doc = evt.target.ownerDocument;
			var uniquekey=(Math.random()+"").replace(/0\./,"");
			var ownBoxBody = doc.getElementById('foxtrick_links_content');
			var basepref = ownBoxBody.getAttribute("basepref");
			var baseprefnl = basepref+'.'+uniquekey;

			FoxtrickPrefs.setString(baseprefnl+'.href',doc.getElementById ("inputHrefID" ).value );
			FoxtrickPrefs.setString(baseprefnl+'.title',doc.getElementById ( "inputTitleID" ).value);
			FoxtrickPrefs.setString(baseprefnl+'.img',doc.getElementById('inputImgDivID').imgref);

			var a = doc.createElement("a");
			a.title = FoxtrickPrefs.getString(baseprefnl+'.title');
			a.href = FoxtrickPrefs.getString(baseprefnl+'.href');
			a.setAttribute("target", "_blank");
			var img = doc.createElement("img");
			img.className = "ft-links-custom-icon-edit";
			img.src = FoxtrickPrefs.getString(baseprefnl+'.img');
			img.alt = FoxtrickPrefs.getString(baseprefnl+'.title');
			a.appendChild(img);

			var tr1 = doc.createElement ("tr");
			var td1 = doc.createElement ("td");
			var td2 = doc.createElement ("td");
			td2.setAttribute("style","vertical-align:middle;");
			var tdiv = doc.createElement ("div");
			tdiv.setAttribute("style","width:100%;");
			var title = doc.createTextNode(FoxtrickPrefs.getString(baseprefnl+'.title').substr(0,8));
			var td3 = doc.createElement ("td");
			td3.setAttribute("style","vertical-align:middle;");
			var td4 = doc.createElement ("td");
			td4.setAttribute("style","vertical-align:middle; margin-right:10px;");
			var td5 = doc.createElement ("td");
			td5.setAttribute("style","vertical-align:middle; margin-right:10px;");

			td1.appendChild(a);
			tdiv.appendChild(title);
			td2.appendChild(tdiv);
			td5.appendChild(FoxtrickLinksCustom.GetExportLink(doc,a,baseprefnl));
			td3.appendChild(FoxtrickLinksCustom.GetEditOldLink(doc,a,baseprefnl));
			td4.appendChild(FoxtrickLinksCustom.GetDelLink(doc,a,baseprefnl));

			tr1.appendChild(td1);
			tr1.appendChild(td2);
			tr1.appendChild(td5);
			tr1.appendChild(td3);
			tr1.appendChild(td4);

			var table=doc.getElementById("LinksCustomTableID");
			table.width="100px";
			table.insertBefore(tr1,table.lastChild.previousSibling);
		}
		catch(e) {Foxtrick.dump("LinksCustom->saveMyLink->"+e+'\n');}
	},

	GetDelLink  : function(doc,mylink,baseprefnl) {
	try {
		var delLink = doc.createElement("div");
		delLink.setAttribute("class","ft_actionicon foxtrickRemove");
		delLink.setAttribute( "title", Foxtrickl10n.getString("foxtrick.linkscustom.remove"));
		Foxtrick.addEventListenerChangeSave(delLink, "click", FoxtrickLinksCustom.delMyLink, false );
		delLink.baseprefnl = baseprefnl;
		delLink.mylink = mylink;
		return delLink;
	}
	catch(e) {Foxtrick.dump("LinksCustom->FoxtrickLinksCustom.GetDelLink->"+e+'\n');}
	},


	GetEditOldLink  : function(doc,mylink,baseprefnl) {
	try {
		var editOld = doc.createElement("div");
		editOld.setAttribute("class","ft_actionicon foxtrickCopy float_right");
		editOld.setAttribute( "title", Foxtrickl10n.getString("foxtrick.linkscustom.copy"));
		Foxtrick.addEventListenerChangeSave(editOld, "click", FoxtrickLinksCustom.editOldLink, false );
		editOld.baseprefnl = baseprefnl;
		editOld.mylink = mylink;
		return editOld;
	}
	catch(e) {Foxtrick.dump("LinksCustom->FoxtrickLinksCustom.GetEditOldLink->"+e+'\n');}
	},


	GetExportLink  : function(doc,mylink,baseprefnl) {
	try {
		var ExportLink = doc.createElement("div");
		ExportLink.setAttribute("class","ft_actionicon foxtrickExport float_right");
		ExportLink.setAttribute( "title", Foxtrickl10n.getString("foxtrick.linkscustom.export"));
		Foxtrick.addEventListenerChangeSave(ExportLink, "click", FoxtrickLinksCustom.Export, false );
		ExportLink.baseprefnl = baseprefnl;
		ExportLink.mylink = mylink;
		return ExportLink;
	}
	catch(e) {Foxtrick.dump("LinksCustom->FoxtrickLinksGetExpostLink->"+e+'\n');}
	},


	LoadDialog  : function(evt)
	{	var doc = evt.target.ownerDocument;
		var window = evt.view;
		var path="file://"+Foxtrick.selectFile(window);
		var pathdel="\\";
		if (path.charAt(7)=="/") {pathdel="/";}
		var imgfile=path.substr(path.lastIndexOf(pathdel)+1);

		var pngBinary;
		// load from file
		try {
			var ios = Components.classes["@mozilla.org/network/io-service;1"]
					.getService(Components.interfaces.nsIIOService);
			var url = ios.newURI(path, null, null);
			if (!url || !url.schemeIs("file")) {throw "Expected a file URL.";}
			var pngFile = url.QueryInterface(Components.interfaces.nsIFileURL).file;
			var image=FoxtrickLinksCustom.generateDataURI(pngFile);
			if (image.length>2000) {Foxtrick.alert("Image too large.");return;}
			var div=doc.getElementById('inputImgDivID');
			div.imgref=image;
			div.style.backgroundImage = "url('" + div.imgref + "')";
 		}
		catch(e) {Foxtrick.dump('FoxtrickLinksCustom.LoadDialog->'+e);Foxtrick.alert(aFileURL+" not found");return;}
	},


	HeaderClick : function(evt) {
		try {
			var doc = evt.target.ownerDocument;
			var ownBoxBody=doc.getElementById('foxtrick_links_content');
			var basepref=ownBoxBody.getAttribute("basepref");
			var enabled = FoxtrickPrefs.getBool( "module.LinksCustom.enabled" );

			// remove old
			FoxtrickPrefs.setBool( "module.LinksCustom.enabled", !enabled );
			var editbox=doc.getElementById("divEDId");
			if (editbox) editbox.parentNode.removeChild(editbox);
			var keys={};
			var array = FoxtrickPrefs._getElemNames( basepref );
			for (var nl=0;nl<array.length;nl++) {
					var key=array[nl].replace(basepref+'\.',"");
					if (key.search(/\./)!=-1) {key = key.replace(/\..+/,""); keys[key] = key;}
					else continue;
			}
			for (key in keys)  {
					var href=FoxtrickPrefs.getString(basepref+'.'+key+'.href');
					var imgref=FoxtrickPrefs.getString(basepref+'.'+key+'.img');
					var title=FoxtrickPrefs.getString(basepref+'.'+key+'.title');
					if (href==null||imgref==null||title==null) {continue; }
					var mylink=doc.getElementById('LinksCustomLinkID'+key);
					if (mylink) mylink.parentNode.removeChild(mylink);
			}

			if (!enabled) {
				FoxtrickLinksCustom.showEdit(doc,ownBoxBody,basepref);
			}
			else {
				FoxtrickLinksCustom.showLinks(doc,ownBoxBody,basepref);
			}
		}
		catch(e) { Foxtrick.dump("LinksCustom->HeaderClick->"+e+'\n'); }
	},


	SelectBox_Select : function(evt) {
	try {
		var doc = evt.target.ownerDocument;
		var value = doc.getElementById ( "inputHrefID" ).value;
		if (value.search(/\?/)==-1) value+="\?"; else  value+="&";
		value+=evt["target"]["value"]+'=['+evt["target"]["value"]+']';
		doc.getElementById ( "inputHrefID" ).value=value;
	} catch (e) {Foxtrick.dump("FoxtrickLinksCustom.SelectBox_Select: "+e+'\n');}
	},


	generateDataURI : function(file) {
	try {
		var contentType = Components.classes["@mozilla.org/mime;1"]
                              .getService(Components.interfaces.nsIMIMEService)
                              .getTypeFromFile(file);
		var inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                              .createInstance(Components.interfaces.nsIFileInputStream);
		inputStream.init(file, 0x01, 0600, 0);
		var stream = Components.classes["@mozilla.org/binaryinputstream;1"]
                         .createInstance(Components.interfaces.nsIBinaryInputStream);
		stream.setInputStream(inputStream);
		var encoded = btoa(stream.readBytes(stream.available()));
		return "data:" + contentType + ";base64," + encoded;
	} catch (e) {Foxtrick.dump("FoxtrickLinks generateDataURI: "+e+'\n');}
	}
};
