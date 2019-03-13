{const 
W=window,
D=document,
B=D.body,
L=W.localStorage,
U=new URL(W.location.href),
A=s=>D.querySelectorAll(s),
E=e=>D.createElement(e),
I=i=>D.getElementById(i),
N=e=>D.createElementNS(`http://www.w3.org/2000/svg`,e),
Q=s=>D.querySelector(s),
T=t=>D.createTextNode(t),
/*characters="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕ×ßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûü",*/
characters="$[]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕ×ßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûü",
shortcuts={"XYZ{X":`È`,"XYZ{Y":`Ï`,"g ":`Î`,"gJ ":`Ì`,"l ":`Ê`,"Um@":`¡`,"m@":`£`,"m_":`®`,"mDEF{D":`Ë`,"n2 ":`Í`,"o@":`Æ`,"o_":`Ç`,"p2 ":`²`,"p3 ":`³`,"q ":`¬`,"qR ":`·`,"qS ":`¸`,"r*1 ":`×`,"s0,":`¯`,"s1 ":`Å`,"Us2 ":`¢`,"s2 ":`¤`,"w ":`Ô`,"y ":`Õ`,"} ":`Ã`,") ":`¹`,"$new Date($":`Ð`,"+1":`Ä`,"++":`°`,"+=":`±`,"-1":`É`,"--":`´`,"-=":`µ`,"*2":`Ñ`,"!==":`À`,"!=":`¦`,"===":`¶`,"==":`¥`,"<=":`§`,">=":`¨`,"&&!":`«`,"&&":`©`,"||":`ª`,"-~":`Ò`,"~-":`Ó`,"~~":`Â`,">>>":`Á`,".25":`¼`,".5":`½`,".75":`¾`,"(((":`»`,"((":`º`},
version={
	current:`1.4.6`,
	list:I(`versions`),
	numbers:[`1.4`,`1.4.1`,`1.4.2`,`1.4.3`,`1.4.4`,`1.4.5`,`1.4.6`,`2.0a0`],
	change(event){
		let v=event.target.dataset.version;
		if(v&&v!==version.selected)
			window.location.href=interpreter.url(v);
	},
	init(){
		let item,menu,svg,v;
		version.two=/^2/.test(version.selected);
		for(v of version.numbers){
			if(item)
				item=item.cloneNode(1);
			else{
				svg=N(`svg`);
				svg.classList.add(`fr`);
				svg.setAttribute(`viewBox`,`0 0 24 24`);
				svg.dataset.mdi=`menu-down`;
				item=E(`li`);
				item.classList.add(`cp`);
				item.append(svg,T(``));
			}
			item.classList.toggle(`fwm`,v===version.current);
			item.dataset.selected=v===version.selected;
			item.dataset.version=v;
			item.lastChild.nodeValue=`v`+v;
			version.list.append(item);
		}
	}
},
interpreter={
	bytes:0,
	running:false,
	fields:{
		code:I(`code`),
		counter:I(`counter`),
		error:Q(`#error>span`),
		explanation:I(`explanation`),
		flags:I(`flags`),
		input:I(`input`),
		output:I(`output`),
		timer:I(`timer`),
		transpiled:I(`transpiled`)
	},
	button:I(`run`),
	cache:{
		enabled:false,
		array:L[`json-cache`]?JSON.parse(L[`json-cache`]):[],
		buttons:{
			clear:I(`clear`),
			toggle:I(`cache`)
		},
		add(code,flags,input,output,timer){
			interpreter.cache.array.push({
				code:code,
				flags:flags,
				input:input,
				output:output,
				timer:timer,
				version:version.selected
			});
			if(interpreter.cache.array.length===1)
				interpreter.cache.buttons.clear.parentNode.classList.remove(`dn`);
			interpreter.cache.array=interpreter.cache.array.slice(-50);
			L.setItem(`json-cache`,JSON.stringify(interpreter.cache.array));
		},
		clear(){
			interpreter.cache.array=[];
			L.removeItem(`json-cache`);
			interpreter.cache.buttons.clear.parentNode.classList.add(`dn`);
		},
		find(code,flags,input){
			return interpreter.cache.array.find(obj=>obj.code===code&&obj.flags===flags&&obj.input===input&&obj.version===version.selected);
		},
		toggle(){
			interpreter.cache.enabled=!interpreter.cache.enabled;
			interpreter.cache.buttons.toggle.classList.toggle(`enabled`,interpreter.cache.enabled);
			interpreter.cache.buttons.clear.parentNode.classList.toggle(`dn`,!interpreter.cache.enabled||!interpreter.cache.array.length);
			interpreter.cache.buttons.toggle.parentNode.dataset.title=`${interpreter.cache.enabled?`Disable`:`Enable`} Caching`;
		},
	},
	init(){
		let params=U.searchParams;
		version.selected=version.numbers.includes(params.get(`v`))?params.get(`v`):version.current;
		Q(`title`).firstChild.nodeValue=`Japt v${version.selected} Interpreter`;
		if(params.get(`flags`))
			interpreter.fields.flags.value=interpreter.decode(params.get(`flags`));
		if(params.get(`code`)){
			interpreter.fields.code.value=interpreter.decode(params.get(`code`));
			general.resize(interpreter.fields.code);
		}
		if(params.get(`input`)){
			interpreter.fields.input.value=interpreter.decode(params.get(`input`));
			general.resize(interpreter.fields.input);
		}
		interpreter.fields.counter.append(T(``));
		interpreter.fields.timer.append(T(``));
	},
	decode(text){
		return atob(text).replace(/\\u[0-9A-Fa-f]{4}/g,chr=>String.fromCodePoint(parseInt(chr.slice(2),16)));
	},
	encode(text){
		return btoa(text.replace(/./g,chr=>chr.charCodeAt(0)<256?chr:`\\u`+chr.charCodeAt(0).toString(16).padStart(4,0)));
	},
	flags(event){
		if(event.type===`focus`&&!interpreter.fields.flags.value)
			interpreter.fields.flags.value=`-`;
		else if(event.type===`blur`&&interpreter.fields.flags.value===`-`)
			interpreter.fields.flags.value=``;
	},
	golf(){
/*		let 	code=interpreter.fields.code.value,
			golfed=Object.entries(shortcuts).reduce((output,[string,shortcut])=>output.replace(RegExp(string.replace(/(?=\W)/g,`\\`),`g`),shortcut),code);*/
		let 	code=golfed=interpreter.fields.code.value,
			transpiled=interpreter.fields.transpiled.value,
			regex=RegExp(Object.keys(shortcuts).map(string=>string.replace(/(?=\W)/g,`\\`)).join(`|`),`g`),
			offset=0,
			match,tmp,shortcut;
		while(match=regex.exec(code)){
			shortcut=shortcuts[match[0]];
			tmp=golfed.substring(0,match.index-offset)+shortcut+golfed.slice(match.index+match[0].length-offset);
			if(transpiled===Japt.transpile(tmp)){
				golfed=tmp;
				offset+=match[0].length-shortcut.length;
			}else regex.lastIndex=match.index+1;
		}
		if(code!==golfed){
			interpreter.fields.code.select();
			D.execCommand(`insertText`,false,golfed);
			interpreter.update();
			interpreter.fields.code.selectionStart=interpreter.fields.code.selectionEnd=golfed.length;
		}else interpreter.fields.code.focus();
	},
	markdown(){
		let markdown=`#[Japt](https://github.com/ETHproductions/japt)`;
		if(version.selected!==version.current)
			markdown+=` v`+version.selected;
		if(interpreter.fields.flags.value)
			markdown+=` [\`${interpreter.fields.flags.value}\`](https://codegolf.meta.stackexchange.com/a/14339/)`;
		markdown+=`, ${interpreter.bytes} ${`bytes`.slice(0,interpreter.bytes!==1?5:4)}\n\n${interpreter.fields.code.value.replace(/^/gm,`    `)}\n\n[Try it](${interpreter.url()})`;
		if(interpreter.fields.explanation.value)
			markdown+=`\n\n`+interpreter.fields.explanation.value.replace(/^/gm,`    `);
		return markdown;
	},
	reset(){
		B.classList.remove(`cw`);
		interpreter.running=false;
	},
	run(){
		if(!interpreter.running){
			let 	code=interpreter.fields.code.value,
				flags=interpreter.fields.flags.value,
				input=interpreter.fields.input.value,
				result,timer;
			interpreter.fields.error.parentNode.classList.add(`dn`);
			if(interpreter.cache.enabled)
				result=interpreter.cache.find(code,flags,input);
			if(interpreter.cache.enabled&&result){
				interpreter.fields.timer.firstChild.nodeValue=`Cached`;
				interpreter.fields.output.value=result.output;
				general.resize(interpreter.fields.output);
			}else{
				interpreter.running=true;
				B.classList.add(`cw`);
				interpreter.fields.timer.firstChild.nodeValue=``;
				Japt.run(
					code,
					input+`\n`+flags,
					false,/*safemode*/
					()=>timer=performance.now(),
					output=>{
						timer=performance.now()-timer;
						interpreter.fields.timer.firstChild.nodeValue=(timer/1e3).toFixed(3)+` seconds`;
						if(Japt.implicit_output)
							Japt.output(output);
						general.resize(interpreter.fields.output);
						interpreter.reset();
						if(interpreter.cache.enabled)
							interpreter.cache.add(code,flags,input,output,timer);
					},
					err=>{
						console.error(err);
						Japt.error(err);
						interpreter.fields.error.parentNode.classList.remove(`dn`);
						interpreter.reset();
					}
				);
			}
		}
	},
	update(){
		let 	code=interpreter.fields.code.value,
			encoding=`ISO-8859-1`;
		interpreter.fields.transpiled.value=Japt.transpile(code);
		general.resize(interpreter.fields.code);
		general.resize(interpreter.fields.transpiled);
		if (/[^\x00-\xff]/.test(code)){
			code=unescape(encodeURI(code));
			encoding=`UTF-8`;
		}
		interpreter.bytes=code.length;
		interpreter.fields.counter.firstChild.nodeValue=interpreter.bytes+` bytes`.slice(0,interpreter.bytes!==1?6:5)+` (${encoding})`;
	},
	url(v=version.selected){
		let url=U.protocol+`//${U.hostname+U.pathname}?v=`+v;
		if(interpreter.fields.flags.value)
			url+=`&flags=`+interpreter.encode(interpreter.fields.flags.value);
		if(interpreter.fields.code.value)
			url+=`&code=`+interpreter.encode(interpreter.fields.code.value);
		if(interpreter.fields.input.value)
			url+=`&input=`+interpreter.encode(interpreter.fields.input.value);
		return url;
	}
},
compressor={
	bases:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
	delimiters:` \nabcdefghijklmnopqrstuvwxyz`,
	golfables:`gnpqswy`,
	shortcuts:`ÎÍ²¬¤ÔÕ`,
	field:I(`compressor`),
	buttons:{
		compress:I(`compress`),
		copy:I(`copy-compressed`),
		permute:I(`permute`),
		reset:I(`reset`)
	},
	permutations:{
		enabled:false,
		get(){
			let 	length=compressor.value.length,
				permutations=[compressor.value.slice()],
				tmp=Array(length).fill(0),
				x=1,index;
			while (x<length)
				if(tmp[x]<x){
					index=x%2&&tmp[x];
					[compressor.value[x],compressor.value[index]]=[compressor.value[index],compressor.value[x]];
					++tmp[x];
					x=1;
					permutations.push(compressor.value.slice());
				}else tmp[x++]=0;
			compressor.value=permutations;
		},
		toggle(){
			compressor.permutations.enabled=!compressor.permutations.enabled;
			compressor.buttons.permute.classList.toggle(`enabled`,compressor.permutations.enabled);
			compressor.buttons.permute.parentNode.dataset.title=`${compressor.permutations.enabled?`Disable`:`Enable`} Permutations`;
		}
	},
	init(){
		compressor.value=compressor.field.value.trim();
		if(compressor.value){
			compressor.original=compressor.value;
			compressor.buttons.compress.parentNode.classList.add(`dn`);
			compressor.buttons.permute.parentNode.classList.add(`dn`);
			compressor.buttons.reset.parentNode.classList.remove(`dn`);
			if(compressor.permutations.enabled)
				compressor.buttons.reset.classList.add(`spin`);
			compressor.field.readOnly=true;
			setTimeout(compressor.run);
		}
	},
	get(array){
		return array.map(compressor.weigh).sort((one,two)=>(one.weight>two.weight)-(one.weight<two.weight))[0];
	},
	map(array,base){
		if(array[0].constructor===Array)
			return array.map(array=>compressor.get(compressor.map(array,base)));
		let delimiters,strings;
		if(base){
			strings=array.map(num=>num.toString(base));
			delimiters=compressor.delimiters.k(strings.join(``));
		}else delimiters=compressor.delimiters.k(array.join(``));
		return [...delimiters].map(character=>{
			let obj={delimiter:character};
			if(compressor.permutations.enabled)
				obj.permutation=array;
			if(base){
				obj.string=shoco.c(strings.join(character));
				obj.base=base;
			}else obj.string=shoco.c(array.join(character));
			obj.string=`\`${obj.string.replace(/(?=`)/g,`\\`)}\``;
			return obj;
		});
	},
	reset(){
		compressor.field.readOnly=false;
		compressor.field.value=compressor.original;
		general.resize(compressor.field);
		compressor.buttons.compress.parentNode.classList.remove(`dn`);
		compressor.buttons.permute.parentNode.classList.remove(`dn`);
		compressor.buttons.copy.parentNode.classList.add(`dn`);
		compressor.buttons.reset.parentNode.classList.add(`dn`);
	},
	run(){
		try{
			compressor.value=eval(compressor.value);
			if(compressor.value.constructor===String)
				compressor.result={string:`\`${shoco.c(compressor.value).replace(/(?=`)/g,`\\`)}\``};
			else if(compressor.value.constructor===Array){
				if(compressor.value.every(x=>x.constructor===String)){
					if(compressor.permutations.enabled)
						compressor.permutations.get();
					compressor.result=compressor.map(compressor.value);
				}else if(compressor.value.every(x=>x.constructor===Number)){
					if(compressor.permutations.enabled)
						compressor.permutations.get();
					compressor.result=compressor.bases.map(base=>compressor.map(compressor.value,base));
					compressor.result=compressor.result.map(compressor.get);
				}
				compressor.result=compressor.get(compressor.result);
			}
			compressor.update();
		}catch(err){
			console.error(err);
			compressor.reset();
		}
	},
	update(){
		if(compressor.result.delimiter){
			if(compressor.result.delimiter===` `){
				compressor.result.delimiter=`S`;
				compressor.result.string+=`¸`;
			}
			else if(compressor.result.delimiter===`\n`){
				compressor.result.delimiter=`R`;
				compressor.result.string+=`·`;
			}else if(compressor.golfables.includes(compressor.result.delimiter))
				compressor.result.string+=`q${compressor.shortcuts[compressor.golfables.search(compressor.result.delimiter)]}`;
			else compressor.result.string+=`q${compressor.result.delimiter} `;
		}
		if(compressor.result.base)
			compressor.result.string+=`mn${compressor.result.base=compressor.result.base%16?compressor.result.base:`GH`[compressor.result.base/16-1]} `;
		compressor.field.value=`Original:    ${compressor.original}\n`;
		if(compressor.result.permutation)
			compressor.field.value+=`Permutation: ${JSON.stringify(compressor.result.permutation)}\n`;
		compressor.field.value+=`Bytes:       ${compressor.original.length}\n`;
		compressor.field.value+=`Compressed:  ${compressor.result.string}\n`;
		if(compressor.result.base)
			compressor.field.value+=`Base:        ${compressor.result.base}\n`;
		if(compressor.result.delimiter)
			compressor.field.value+=`Delimiter:   ${compressor.result.delimiter}\n`;
		compressor.field.value+=`Bytes:       ${compressor.result.string.length}`;
		general.resize(compressor.field);
		compressor.buttons.copy.parentNode.classList.remove(`dn`);
		if(compressor.permutations.enabled)
			compressor.buttons.reset.addEventListener(`animationiteration`,()=>compressor.buttons.reset.classList.remove(`spin`),{capture:false,once:true});
	},
	weigh(obj){
		obj.weight=obj.string.length-` \n`.includes(obj.delimiter)-` \n${compressor.golfables}`.includes(obj.delimiter)-[16,32].includes(obj.base);
		return obj;
	}
},
keyboard={
	list:Q(`#keyboard>ol`),
	init(){
		let item,key;
		for(key of characters){
			if(item)
				item=item.cloneNode(1);
			else{
				item=E(`li`);
				item.classList.add(`cp`,`df`);
				item.append(T(``));
			}
			item.dataset.character=item.firstChild.nodeValue=key;
			keyboard.list.append(item);
		}
	},
	close(event){
		general.close(event,keyboard.toggle);
	},
	insert(event){
		if(event.target.dataset.character){
			interpreter.fields.code.focus();
			D.execCommand(`insertText`,false,event.target.dataset.character);
			interpreter.update();
		}
	},
	toggle(){
		let open=B.dataset.keyboard===`false`;
		B.dataset.keyboard=open;
		if(open)
			B.addEventListener(`keydown`,keyboard.close,false);
		else B.removeEventListener(`keydown`,keyboard.close);
	}
},
docs={
	sidebar:I(`docs`),
	init(){
		let 	articles=docs.sidebar.querySelectorAll(`article`),
			length=articles.length,
			list=E(`ol`),
			article,heaing,item,menu,svg;
		list.classList.add(`pa`);
		list.tabIndex=`-1`;
		for(article of articles){
			heading=article.firstElementChild;
			if(svg){
				svg=svg.cloneNode(1);
				item=item.cloneNode(1);
				item.firstChild.nodeValue=heading.firstChild.nodeValue;
			}else{
				svg=N(`svg`);
				svg.classList.add(`cp`,`pa`);
				svg.tabIndex=`-1`;
				svg.setAttribute(`viewBox`,`0 0 24 24`);
				svg.dataset.mdi=`dots-vertical`;
				item=E(`li`);
				item.classList.add(`cp`,`fwm`,`oh`,`toe`,`wsnw`);
				item.append(T(heading.firstChild.nodeValue));
			}
			heading.append(svg);
			article.style.zIndex=length--;
			item.dataset.for=article.id;
			list.append(item);
		}
		for(article of articles){
			menu=list.cloneNode(1);
			menu.querySelector(`[data-for=${article.id}]`).remove();
			article.firstElementChild.append(menu);
		}
		docs.shortcuts();
	},
	close(event){
		general.close(event,docs.toggle);
	},
	example(event){
		let dataset=event.target.dataset;
		if(dataset.code){
			interpreter.fields.code.select();
			D.execCommand(`insertText`,false,dataset.code);
			interpreter.update();
			interpreter.run();
		}
	},
	scroll(event){
		if(event.target.dataset.for){
			event.currentTarget.scroll({
				behavior:`smooth`,
				top:I(event.target.dataset.for).offsetTop
			});
			event.target.parentNode.blur();
		}
	},
	shortcuts(){
		let 	table=I(`shortcuts`),
			shortcut,row,cell,code,value;
		for(shortcut in shortcuts){
			if(row){
				row=row.cloneNode(0);
				cell=cell.cloneNode(0);
				code=code.cloneNode(0);
			}else{
				row=E(`tr`);
				cell=E(`td`);
				code=E(`code`);
				code.classList.add(`dib`,`fwm`,`vam`,`wsnw`);
			}
			code.classList.add(`cp`);
			code.append(T(code.dataset.character=shortcuts[shortcut]));
			cell.append(code);
			row.append(cell);
			code=code.cloneNode(0);
			code.classList.remove(`cp`);
			code.removeAttribute(`data-character`);
			code.append(T(shortcut.replace(` `,`\u00A0`)));
			cell=cell.cloneNode(0);
			cell.append(code);
			row.append(cell);
			table.append(row);
		}
	},
	toggle(){
		let open=docs.sidebar.dataset.open===`false`;
		docs.sidebar.dataset.open=open;
		if(open)
			B.addEventListener(`keydown`,docs.close,false);
		else B.removeEventListener(`keydown`,docs.close);
	}
},
general={
	buttons:{
		theme:I(`theme`)
	},
	clipboard:I(`clipboard`),
	meta:Q(`meta[name=theme-color]`),
	async init(){
		interpreter.init();
		version.init();
		docs.init();
		keyboard.init();
		general.icons();
		let 	file=`https://cdn.jsdelivr.net/gh/ETHproductions/japt@`,
			js=file=>new Promise((resolve,reject)=>{
				let script=E(`script`);
				script.async=true;
				script.src=file;
				B.append(script);
				script.addEventListener(`load`,resolve,{capture:false,once:true});
				script.addEventListener(`error`,reject,{capture:false,once:true});
			});
		file+=`${version.selected===version.current||version.two?`master`:`v`+version.selected}/src/${version.two?`japt`:`japt-interpreter`}.js`;
		file+=`?`+new Date().toISOString().replace(/\D/g,``).slice(2,12);
		js(file).then(()=>{
			Japt.stdout=interpreter.fields.output;
			Japt.stderr=interpreter.fields.error;
			if(interpreter.fields.code.value){
				interpreter.update();
				interpreter.run();
			}
			general.listeners();
			general.theme();
		}).catch(err=>console.error(`Failed to load interpreter:`,err));
		js(`https://www.googletagmanager.com/gtag/js?id=UA-135737580-1`).then(()=>{
			W.dataLayer=W.dataLayer||[];
			gtag=(...args)=>W.dataLayer.push(args);
			gtag(`js`,new Date());
			gtag(`config`,`UA-135737580-1`);
		});
	},
	close(event,fn){
		if(event.keyCode===27){
			fn();
			event.stopPropagation();
		}
	},
	copy(text){
		general.clipboard.value=text;
		general.clipboard.select();
		D.execCommand(`copy`,false);
	},
	icons(){
		let 	library={
				"alert":`M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z`,
				"autorenew":`M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z`,
				"check-box-outline":`M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9`,
				"checkbox-blank-outline":`M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z`,
				"clipboard-text-outline":`M19,4H14.82C14.25,2.44 12.53,1.64 11,2.2C10.14,2.5 9.5,3.16 9.18,4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M7,8H17V6H19V20H5V6H7V8M17,12H7V10H17V12M15,16H7V14H15V16Z`,
				"delete":`M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z`,
				"dots-vertical":`M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z`,
				"golf":`M19.5,18A1.5,1.5 0 0,1 21,19.5A1.5,1.5 0 0,1 19.5,21A1.5,1.5 0 0,1 18,19.5A1.5,1.5 0 0,1 19.5,18M17,5.92L11,9V18.03C13.84,18.19 16,19 16,20C16,21.1 13.31,22 10,22C6.69,22 4,21.1 4,20C4,19.26 5.21,18.62 7,18.27V20H9V2L17,5.92Z`,
				"information":`M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,
				"flag":`M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z`,
				"file-document":`M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z`,
				"github-circle":`M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z`,
				"invert-colors":`M12,19.58V19.58C10.4,19.58 8.89,18.96 7.76,17.83C6.62,16.69 6,15.19 6,13.58C6,12 6.62,10.47 7.76,9.34L12,5.1M17.66,7.93L12,2.27V2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93Z`,
				"keyboard":`M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z`,
				"link-variant":`M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z`,
				"markdown":`M2,16V8H4L7,11L10,8H12V16H10V10.83L7,13.83L4,10.83V16H2M16,8H19V12H21.5L17.5,16.5L13.5,12H16V8Z`,
				"menu-down":`M7,10L12,15L17,10H7Z`,
				"play":`M8,5.14V19.14L19,12.14L8,5.14Z`,
				"play-circle":`M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,
				"redo":`M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z`,
				"shuffle":`M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z`,
				"shuffle-disabled":`M16,4.5V7H5V9H16V11.5L19.5,8M16,12.5V15H5V17H16V19.5L19.5,16`,
				"stack-exchange":`M4,14.04V11H20V14.04H4M4,10V7H20V10H4M17.46,2C18.86,2 20,3.18 20,4.63V6H4V4.63C4,3.18 5.14,2 6.54,2H17.46M4,15H20V16.35C20,17.81 18.86,19 17.46,19H16.5L13,22V19H6.54C5.14,19 4,17.81 4,16.35V15Z`,
				"text":`M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z`,
				"undo":`M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z`
			},icon,path,svg;
		for(svg of A(`svg[data-mdi]`)){
			if(!svg.getAttribute(`viewBox`))
				svg.setAttribute(`viewBox`,`0 0 24 24`);
			for(icon of svg.dataset.mdi.split(`,`)){
				if(path)
					path=path.cloneNode(1);
				else{
					path=N(`path`);
					path.classList.add(`pen`);
				}
				path.setAttribute(`d`,library[icon]);
				svg.append(path);
			}
		}
	},
	listeners(){
		version.list.addEventListener(`click`,version.change,false);
		general.buttons.theme.addEventListener(`click`,general.theme,false);
		interpreter.fields.flags.addEventListener(`focus`,interpreter.flags,false);
		interpreter.fields.flags.addEventListener(`blur`,interpreter.flags,false);
		interpreter.button.addEventListener(`click`,interpreter.run,false);
		I(`copy-link`).addEventListener(`click`,()=>general.copy(interpreter.url()),false);
		I(`copy-post`).addEventListener(`click`,()=>general.copy(interpreter.markdown()),false);
		I(`undo`).addEventListener(`click`,()=>D.execCommand(`undo`,false),false);
		I(`redo`).addEventListener(`click`,()=>D.execCommand(`redo`,false),false);
		I(`golf`).addEventListener(`click`,interpreter.golf,false);
		I(`copy-code`).addEventListener(`click`,()=>general.copy(interpreter.fields.code.value),false);
		interpreter.fields.code.addEventListener(`input`,interpreter.update,false);
		I(`copy-js`).addEventListener(`click`,()=>general.copy(interpreter.fields.transpiled.value),false);
		I(`copy-input`).addEventListener(`click`,()=>general.copy(interpreter.fields.input.value),false);
		interpreter.fields.input.addEventListener(`input`,()=>general.resize(interpreter.fields.input),false);
		I(`copy-output`).addEventListener(`click`,()=>general.copy(interpreter.fields.output.value),false);
		interpreter.cache.buttons.toggle.addEventListener(`click`,interpreter.cache.toggle,false);
		interpreter.cache.buttons.clear.addEventListener(`click`,interpreter.cache.clear,false);
		I(`copy-explanation`).addEventListener(`click`,()=>general.copy(interpreter.fields.explanation.value.replace(/^/gm,`    `)),false);
		interpreter.fields.explanation.addEventListener(`input`,()=>general.resize(interpreter.fields.explanation),false);
		compressor.buttons.compress.addEventListener(`click`,compressor.init,false);
		compressor.buttons.permute.addEventListener(`click`,compressor.permutations.toggle,false);
		compressor.buttons.copy.addEventListener(`click`,()=>general.copy(compressor.result.string),false);
		compressor.buttons.reset.addEventListener(`click`,compressor.reset,false);
		compressor.field.addEventListener(`input`,()=>general.resize(compressor.field),false);
		Q(`#docs>h2`).addEventListener(`click`,docs.toggle,false);
		docs.sidebar.lastElementChild.addEventListener(`click`,docs.scroll,false);
		docs.sidebar.lastElementChild.addEventListener(`click`,keyboard.insert,false);
		I(`docs-examples`).addEventListener(`click`,docs.example,false);
		Q(`#keyboard>h2`).addEventListener(`click`,keyboard.toggle,false);
		keyboard.list.addEventListener(`click`,keyboard.insert,false);
		B.addEventListener(`keydown`,general.run,false);
		W.addEventListener(`resize`,()=>{
			general.resize(interpreter.fields.code);
			general.resize(interpreter.fields.transpiled);
			general.resize(interpreter.fields.input);
			general.resize(interpreter.fields.output);
			general.resize(interpreter.fields.explanation);
			general.resize(compressor.field);
		},false);
	},
	resize(field){
		general.clipboard.value=field.value;
		field.style.height=2+general.clipboard.scrollHeight+`px`;
	},
	run(event){
		if(event.ctrlKey&&event.keyCode==13)
			interpreter.run();
	},
	theme(loaded=false){
		if(loaded){
			B.classList.toggle(`light`);
			B.classList.toggle(`dark`);
		}else B.classList.add(L[`japt-theme`]||`dark`);
		let light=B.classList.contains(`light`);
		general.meta.content=`#${light?`fff`:`212121`}`;
		general.buttons.theme.parentNode.dataset.title=`${light?`Dark`:`Light`} Theme`;
		if(loaded)
			L.setItem(`japt-theme`,light?`light`:`dark`);
	}
};
general.init();}