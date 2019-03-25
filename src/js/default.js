{const 
w=window,
d=document,
b=d.body,
l=w.localStorage,
u=new URL(w.location.href),
a=S=>d.querySelectorAll(S),
e=E=>d.createElement(E),
i=I=>d.getElementById(I),
n=E=>d.createElementNS(`http://www.w3.org/2000/svg`,E),
q=S=>d.querySelector(S),
t=T=>d.createTextNode(T),
characters="$[]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕ×ßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûü",
shortcuts={
	"XYZ{X":{character:`È`,version:`1.4.5`},
	"XYZ{Y":{character:`Ï`,version:`1.4.5`},
	"g ":{character:`Î`,version:`1.4.5`},
	"gJ ":{character:`Ì`,version:`1.4.5`},
	"l ":{character:`Ê`,version:`1.4.5`},
	"Um@":{character:`¡`,version:`1.4.5`},
	"m@":{character:`£`,version:`1.4.5`},
	"m_":{character:`®`,version:`1.4.5`},
	"mDEF{D":{character:`Ë`,version:`1.4.5`},
	"n2 ":{character:`Í`,version:`1.4.5`},
	"o@":{character:`Æ`,version:`1.4.5`},
	"o_":{character:`Ç`,version:`1.4.5`},
	"p2 ":{character:`²`,version:`1.4.5`},
	"p3 ":{character:`³`,version:`1.4.5`},
	"q ":{character:`¬`,version:`1.4.5`},
	"qR ":{character:`·`,version:`1.4.5`},
	"qS ":{character:`¸`,version:`1.4.5`},
	"r*1 ":{character:`×`,version:`1.4.5`},
	"s0,":{character:`¯`,version:`1.4.5`},
	"s1 ":{character:`Å`,version:`1.4.5`},
	"Us2 ":{character:`¢`,version:`1.4.5`},
	"s2 ":{character:`¤`,version:`1.4.5`},
	"w ":{character:`Ô`,version:`1.4.6`},
	"y ":{character:`Õ`,version:`1.4.6`},
	"} ":{character:`Ã`,version:`1.4.5`},
	") ":{character:`¹`,version:`1.4.5`},
	"+1":{character:`Ä`,version:`1.4.5`},
	"++":{character:`°`,version:`1.4.5`},
	"+=":{character:`±`,version:`1.4.5`},
	"-1":{character:`É`,version:`1.4.5`},
	"--":{character:`´`,version:`1.4.5`},
	"-=":{character:`µ`,version:`1.4.5`},
	"*2":{character:`Ñ`,version:`1.4.5`},
	"!==":{character:`À`,version:`1.4.5`},
	"!=":{character:`¦`,version:`1.4.5`},
	"===":{character:`¶`,version:`1.4.5`},
	"==":{character:`¥`,version:`1.4.5`},
	"<=":{character:`§`,version:`1.4.5`},
	">=":{character:`¨`,version:`1.4.5`},
	"&&!":{character:`«`,version:`1.4.5`},
	"&&":{character:`©`,version:`1.4.5`},
	"||":{character:`ª`,version:`1.4.5`},
	"-~":{character:`Ò`,version:`1.4.6`},
	"~-":{character:`Ó`,version:`1.4.6`},
	"~~":{character:`Â`,version:`1.4.5`},
	">>>":{character:`Á`,version:`1.4.5`},
	".25":{character:`¼`,version:`1.4.5`},
	".5":{character:`½`,version:`1.4.5`},
	".75":{character:`¾`,version:`1.4.5`},
	"(((":{character:`»`,version:`1.4.5`},
	"((":{character:`º`,version:`1.4.5`}
},
regexes={
	"w":{match:`A-Z, a-z & 0-9`,version:`1.4.5`},
	"W":{match:`Everything else`,version:`1.4.5`},
	"d":{match:`0-9`,version:`1.4.5`},
	"D":{match:`Everything else`,version:`1.4.5`},
	"s":{match:`Whitespace`,version:`1.4.5`},
	"S":{match:`Everything else`,version:`1.4.5`},
	"n":{match:`Newline`,version:`1.4.5`},
	"t":{match:`Tab`,version:`1.4.5`},
	"b":{match:`Word boundary`,version:`1.4.5`},
	"B":{match:`Everything else`,version:`1.4.5`},
	"a":{match:`a-z`,version:`1.4.5`},
	"A":{match:`A-Z`,version:`1.4.5`},
	"l":{match:`A-Z & a-z`,version:`1.4.5`},
	"L":{match:`Everything else`,version:`1.4.5`},
	"p":{match:`ASCII`,version:`1.4.5`},
	"P":{match:`Everything else`,version:`1.4.5`},
	"q":{match:`ASCII & newline`,version:`1.4.5`},
	"Q":{match:`Everything else`,version:`1.4.5`},
	"v":{match:`Vowels`,version:`1.4.5`},
	"V":{match:`Everything else`,version:`1.4.5`},
	"y":{match:`Vowels & Yy`,version:`1.4.5`},
	"Y":{match:`Everything else`,version:`1.4.5`},
	"c":{match:`Consonants`,version:`1.4.5`},
	"C":{match:`Everything else`,version:`1.4.5`}
},
version={
	current:`1.4.6`,
	list:i(`versions`),
	numbers:[`1.4.5`,`1.4.6`,`2.0a0`],
	change(event){
		let ver=event.target.dataset.version;
		if(ver&&ver!==version.selected)
			window.location.href=interpreter.url(ver);
	},
	init(){
		let item,menu,svg,ver;
		version.two=/^2/.test(version.selected);
		for(ver of version.numbers){
			if(item)
				item=item.cloneNode(true);
			else{
				svg=n(`svg`);
				svg.classList.add(`fr`);
				svg.setAttribute(`viewBox`,`0 0 24 24`);
				svg.dataset.mdi=`menu-down`;
				item=e(`li`);
				item.classList.add(`cp`);
				item.append(svg,t(``));
			}
			item.classList.toggle(`fwm`,ver===version.current);
			item.dataset.selected=ver===version.selected;
			item.dataset.version=ver;
			item.lastChild.nodeValue=`v`+ver;
			version.list.append(item);
		}
	}
},
interpreter={
	bytes:0,
	running:false,
	fields:{
		code:i(`code`),
		counter:i(`counter`),
		error:q(`#error>span`),
		explanation:i(`explanation`),
		flags:i(`flags`),
		input:i(`input`),
		output:i(`output`),
		timer:i(`timer`),
		transpiled:i(`transpiled`)
	},
	button:i(`run`),
	cache:{
		enabled:false,
		array:l[`json-cache`]?JSON.parse(l[`json-cache`]):[],
		buttons:{
			clear:i(`clear`),
			toggle:i(`cache`)
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
			l.setItem(`json-cache`,JSON.stringify(interpreter.cache.array));
		},
		clear(){
			interpreter.cache.array=[];
			l.removeItem(`json-cache`);
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
		let params=u.searchParams;
		version.selected=version.numbers.includes(params.get(`v`))?params.get(`v`):version.current;
		q(`title`).firstChild.nodeValue=`Japt v${version.selected} Interpreter`;
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
		interpreter.fields.counter.append(t(``));
		interpreter.fields.timer.append(t(``));
		interpreter.regex=RegExp(Object.keys(shortcuts).filter(shortcut=>shortcuts[shortcut].version<=version.selected).map(string=>string.replace(/(?=\W)/g,`\\`)).join(`|`),`g`);
	},
	decode(text){
		return atob(text).replace(/\\u[0-9A-F]{4}/gi,chr=>String.fromCharCode(parseInt(chr.slice(2),16)));
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
		let 	code=golfed=interpreter.fields.code.value,
			transpiled=interpreter.fields.transpiled.value,
			offset=0,
			match,tmp,shortcut;
		while(match=interpreter.regex.exec(code)){
			shortcut=shortcuts[match[0]].character;
			tmp=golfed.substring(0,match.index-offset)+shortcut+golfed.slice(match.index+match[0].length-offset);
			if(transpiled===Japt.transpile(tmp)){
				golfed=tmp;
				offset+=match[0].length-shortcut.length;
			}else interpreter.regex.lastIndex=match.index+1;
		}
		if(code!==golfed){
			interpreter.fields.code.select();
			d.execCommand(`insertText`,false,golfed);
			interpreter.update();
			interpreter.fields.code.selectionStart=interpreter.fields.code.selectionEnd=golfed.length;
		}else interpreter.fields.code.focus();
		interpreter.regex.lastIndex=0;
	},
	markdown(){
		let markdown=`#[Japt](https://github.com/ETHproductions/japt)`;
		if(version.current!==version.selected)
			markdown+=` v`+version.selected;
		if(interpreter.fields.flags.value)
			markdown+=` [\`${interpreter.fields.flags.value}\`](https://codegolf.meta.stackexchange.com/a/14339/)`;
		markdown+=`, ${interpreter.bytes} ${`bytes`.slice(0,interpreter.bytes!==1?5:4)}\n\n${interpreter.fields.code.value.replace(/^/gm,`    `)}\n\n[Try it](${interpreter.url()})`;
		if(interpreter.fields.explanation.value)
			markdown+=`\n\n`+interpreter.fields.explanation.value.replace(/^/gm,`    `);
		return markdown;
	},
	reset(){
		b.classList.remove(`cw`);
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
				interpreter.fields.timer.firstChild.nodeValue=`cached`;
				interpreter.fields.output.value=result.output;
				general.resize(interpreter.fields.output);
			}else{
				interpreter.running=true;
				b.classList.add(`cw`);
				interpreter.fields.timer.firstChild.nodeValue=``;
				Japt.run(
					code,
					input+`\n`+flags,
					false,
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
		let url=u.protocol+`//${u.hostname+u.pathname}?v=`+v;
		if(interpreter.fields.flags.value)
			url+=`&flags=`+interpreter.encode(interpreter.fields.flags.value);
		if(interpreter.fields.code.value)
			url+=`&code=`+interpreter.encode(interpreter.fields.code.value);
		if(interpreter.fields.input.value)
			url+=`&input=`+interpreter.encode(interpreter.fields.input.value);
		return url.replace(/\+/g,`%2b`).replace(/ /g,`%20`);
	}
},
compressor={
	bases:[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
	delimiters:` \nabcdefghijklmnopqrstuvwxyz`,
	golfables:`gnpqswy`,
	shortcuts:`ÎÍ²¬¤ÔÕ`,
	field:i(`compressor`),
	buttons:{
		compress:i(`compress`),
		copy:i(`copy-compressed`),
		permute:i(`permute`),
		reset:i(`reset`)
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
			let array=compressor.value.startsWith(`["`);
			if(array)
				compressor.value=compressor.value.replace(/([^\\[]")"/g,`$1,"`);
			compressor.value=eval(compressor.value);
			if(compressor.value.constructor===String)
				compressor.result={string:`\`${shoco.c(compressor.value).replace(/(?=`)/g,`\\`)}\``};
			else if(compressor.value.constructor===Array){
				if(compressor.value.every(elm=>elm.constructor===String)){
					if(compressor.permutations.enabled)
						compressor.permutations.get();
					compressor.result=compressor.map(compressor.value);
				}else if(compressor.value.every(elm=>elm.constructor===Number)){
					if(compressor.permutations.enabled)
						compressor.permutations.get();
					compressor.result=compressor.bases.map(base=>compressor.map(compressor.value,base));
					compressor.result=compressor.result.map(compressor.get);
				}
				compressor.result=compressor.get(compressor.result);
			}
			compressor.update(array);
		}catch(err){
			console.error(err);
			compressor.reset();
		}
	},
	update(array){
		let 	original=compressor.original,
			quotes=/([^\\]"),"/g;
		if(array)
			original=original.replace(quotes,`$1"`);
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
			compressor.result.string+=`mn${compressor.result.base=compressor.result.base<17?`ABCDEFG`[compressor.result.base%10]:compressor.result.base===32?`H`:compressor.result.base} `;
		compressor.field.value=`Original:    ${original}\n`;
		if(compressor.result.permutation)
			compressor.field.value+=`Permutation: ${JSON.stringify(compressor.result.permutation).replace(array?quotes:``,array?`$1"`:``)}\n`;
		compressor.field.value+=`Bytes:       ${original.length}\n`;
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
		obj.weight=obj.string.length-` \n`.includes(obj.delimiter)-` \n${compressor.golfables}`.includes(obj.delimiter)-(obj.base<17||obj.base===32);
		return obj;
	}
},
docs={
	sidebar:i(`docs`),
	files:l[`japt-docs`]?JSON.parse(l[`japt-docs`]):[
		`docs/intro.html`,
		`docs/basics.html`,
		`docs/variables.html`,
		`docs/shortcuts.html`,
		`docs/compression.html`,
		`docs/regex.html`,
		`docs/string.json`,
		`docs/array.json`,
		`docs/number.json`,
		`docs/function.json`,
		`docs/date.json`,
		`docs/math.json`,
		`docs/other.json`,
		`docs/flags.json`,
		`docs/examples.html`,
		`docs/settings.html`
	],
	search:{
		article:i(`docs-search`),
		form:q(`#docs-search>form`),
		input:q(`#docs-search>form>input[type=text]`),
		init(){
			docs.search.titles=docs.search.article.querySelectorAll(`h4`);
			docs.search.methods=[...docs.search.form.querySelectorAll(`input[type=checkbox]`)];
			docs.search.form.addEventListener(`input`,docs.search.wait,true);
		},
		exec(){
			let hide,title,text;
			docs.search.article.scrollTo({
				behavior:`smooth`,
				top:0
			});
			for(title of docs.search.titles){
				text=title.nextElementSibling;
				hide=	!docs.search.input.value||
					!text.firstChild.nodeValue.replace(/^Returns |\<[^>]+?\>/g,``).toLowerCase().includes(docs.search.input.value.toLowerCase())||
					!docs.search.methods.map(input=>input.checked&&input.value).includes(title.dataset.object);
				title.classList.toggle(`dn`,hide);
				text.classList.toggle(`dn`,hide);
			}
		},
		toggle(){
			docs.search.article.classList.toggle(`dn`);
		},
		wait(){
			if(docs.search.timer)
				clearTimeout(docs.search.timer);
			docs.search.timer=setTimeout(docs.search.exec,100);
		}
	},
	init(){
		let 	menu=e(`ol`),
			sort=e(`ol`),
			article,current,input,item,json,label,order,svg;
		return Promise.all(docs.files.map(file=>fetch(file))).then(async files=>{
			for(let [index,file] of files.entries()){
				if(article){
					article=article.cloneNode(false);
					item=item.cloneNode(true);
					order=order.cloneNode(true);
					svg=svg.cloneNode(true);
					input=input.cloneNode(true);
					label=label.cloneNode(true);
				}else{
					article=e(`article`);
					article.classList.add(`oa`);
					item=e(`li`);
					item.classList.add(`cp`,`fwm`,`oh`,`toe`,`wsnw`);
					item.append(t(``));
					order=e(`li`);
					order.classList.add(`pr`);
					order.append(e(`span`),t(``));
					order.firstChild.classList.add(`cm`,`dib`,`vat`);
					svg=n(`svg`);
					svg.classList.add(`pen`,`vat`);
					svg.dataset.mdi=`drag-vertical`;
					svg.setAttribute(`viewBox`,`0 0 24 24`);
					order.firstChild.append(svg);
					input=e(`input`);
					input.checked=true;
					input.name=`methods`;
					input.type=`checkbox`;
					label=e(`label`);
					label.classList.add(`dib`,`cp`); 
					svg=n(`svg`);
					svg.classList.add(`cp`,`vat`);
					svg.dataset.mdi=`check-box-outline,checkbox-blank-outline`;
					svg.setAttribute(`viewBox`,`0 0 24 24`);
					label.append(svg,t(``));
					svg=n(`svg`);
					svg.classList.add(`cp`,`vat`);
					svg.dataset.mdi=`link-variant,check`;
					svg.setAttribute(`viewBox`,`0 0 24 24`);
				}
				article.id=item.dataset.section=svg.dataset.copy=`docs-`+docs.files[index].slice(5,-5);
				current=!index&&!u.hash.startsWith(`#docs-`)||u.hash.slice(1)===article.id;
				if(current)
					docs.current={article,item};
				article.classList.toggle(`dn`,!current);
				item.classList.toggle(`current`,current);
				svg.addEventListener(`click`,general.copy,false);
				switch(docs.files[index].slice(-4)){
					case`json`:
						docs.json(json=await file.json(),article);
						if(json.type===`methods`){
							label.setAttribute(`for`,input.id=`method-`+json.object);
							input.value=json.object;
							label.lastChild.nodeValue=article.firstChild.firstChild.nodeValue.match(/[^ ]+/);
							docs.search.form.append(input,label);
						}
						break;
					case`html`:
						article.innerHTML=docs.parse(await file.text());
						break;
					default:console.error(`Failed to load documenation:`,file.url)
				}
				docs.sidebar.append(article);
				item.firstChild.nodeValue=order.lastChild.nodeValue=article.firstChild.firstChild.nodeValue;
				article.firstChild.prepend(svg);
				menu.append(item);
				order.dataset.file=docs.files[index];
				sort.append(order);
			}
			docs.menu(menu);
			docs.shortcuts();
			docs.regex();
			i(`docs-examples`).addEventListener(`click`,docs.example,false);
			docs.settings(sort);
			general.icons(docs.sidebar);
			docs.search.init();
			i(`loading`).remove();
		});
	},
	change(event){
		if(event.target.dataset.section){
			docs.current.article.classList.add(`dn`);
			docs.current.article=i(event.target.dataset.section);
			docs.current.article.classList.remove(`dn`);
			docs.current.item.classList.remove(`current`);
			docs.current.item=docs.sidebar.querySelector(`#menu+ol>li[data-section=${event.target.dataset.section}]`);
			docs.current.item.classList.add(`current`);
			if(event.target===docs.current.item)
				event.target.parentNode.blur();
		}
	},
	close(event){
		general.close(event,docs.toggle);
	},
	example(event){
		let dataset=event.target.dataset;
		if(dataset.code){
			interpreter.fields.code.select();
			d.execCommand(`insertText`,false,dataset.code);
			interpreter.update();
			interpreter.run();
		}
	},
	json(json,article){
		let 	object=json[json.type],
			heading,intro,key,svg,title,text;
		heading=e(`h3`);
		heading.classList.add(`ps`);
		heading.append(t(json.title));
		article.append(heading);
		if(json.intro){
			for(intro of json.intro){
				if(text)
					text=text.cloneNode(false);
				else text=e(`p`);
				text.innerHTML=docs.parse(intro);
				article.append(text);
			}
		}
		for(key in object){
			if(title){
				title=title.cloneNode(false);
				if(json.type===`methods`)
					svg=svg.cloneNode(true);
				text=text.cloneNode(false);
			}else{
				title=e(`h4`);
				title.classList.add(`method`,`fwm`);
				if(json.type===`methods`){
					title.classList.add(`cp`);
					svg=n(`svg`);
					svg.classList.add(`vat`);
					svg.setAttribute(`viewBox`,`0 0 24 24`);
					svg.dataset.mdi=`arrow-right`;
				}
				text=e(`p`);
			}
			title.dataset.version=object[key].version;
			text.innerHTML=docs.parse(object[key].description);
			article.append(title,text);
			switch(json.type){
				case`flags`:
					title.append(t(`-`+key));
					break;
				default:
					title.dataset.character=key[0];
					title.append(t(json.object+`.`+key),svg,t(object[key].returns));
					docs.search.article.append(title=title.cloneNode(true),text=text.cloneNode(true));
					title.dataset.object=json.object;
					title.classList.add(`dn`);
					text.classList.add(`dn`);
			}
		}
	},
	menu(list){
		let svg=n(`svg`);
		svg.classList.add(`cp`,`pa`);
		svg.dataset.mdi=`dots-vertical`;
		svg.id=`menu`;
		svg.tabIndex=`-1`;
		svg.setAttribute(`viewBox`,`0 0 24 24`);
		list.classList.add(`pa`);
		list.tabIndex=`-1`;
		docs.sidebar.prepend(svg,list);
	},
	parse(text){
		return text
			.replace(/\n/g,`<br>`)
			.replace(/`([^`]+?)`([^`]+?)``/g,`<code class="cp dib vat" data-character="$1">$2</code>`)
			.replace(/`([^`]+?)`/g,`<code class="dib vat">$1</code>`)
			.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g,`<a href="$2">$1</a>`)
			.replace(/\[(v)\:([^\]]+?)\]/g,`<span class="version dib vat">$1$2</span>`)
			.replace(/\[icon\:([^\]]+?)\]/g,`<svg class="vat" data-mdi="$1" viewBox="0 0 24 24"></svg>`)
			.replace(/\[([a-z]+)\:([^\]]+?)\]/g,`<span class="cp tdu" data-section="docs-$1">$2</span>`);

	},
	regex(){
		let 	table=i(`regex`),
			regex,row,cell,code,ver;
		for(regex in regexes){
			if(row){
				row=row.cloneNode(false);
				cell=cell.cloneNode(false);
				code=code.cloneNode(false);
				ver=ver.cloneNode(false);
			}else{
				row=e(`tr`);
				cell=e(`td`);
				code=e(`code`);
				code.classList.add(`dib`,`vam`);
				ver=e(`span`);
				ver.classList.add(`version`,`dib`,`vam`);
			}
			code.append(t((version.selected<`2.0a0`?`%`:`\\`)+regex));
			cell.append(code);
			row.append(cell);
			cell=cell.cloneNode(false);
			cell.append(t(regexes[regex].match));
			row.append(cell);
			cell=cell.cloneNode(false);
			ver.append(t(`v`+regexes[regex].version));
			cell.append(ver);
			row.append(cell);
			table.append(row);
		}
	},
	settings(list){
		list.lastChild.remove();
		list.id=`sort`;
		i(`docs-settings`).append(list);
		general.js(`https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js`).then(()=>{
			Sortable.create(list,{
				animation:150,
				chosenClass:`sorting`,
				handle:`span`,
				onChoose:event=>event.target.classList.add(`sorting`),
				onUnchoose:event=>event.target.classList.remove(`sorting`),
				onEnd:event=>{
				}
			});
		});
	},
	shortcuts(){
		let 	table=i(`shortcuts`),
			shortcut,row,cell,code,ver;
		for(shortcut in shortcuts){
			if(row){
				row=row.cloneNode(false);
				cell=cell.cloneNode(false);
				code=code.cloneNode(false);
				ver=ver.cloneNode(false);
			}else{
				row=e(`tr`);
				cell=e(`td`);
				code=e(`code`);
				code.classList.add(`dib`,`vam`);
				ver=e(`span`);
				ver.classList.add(`version`,`dib`,`vam`);
			}
			code.classList.add(`cp`);
			code.append(t(code.dataset.character=shortcuts[shortcut].character));
			cell.append(code);
			row.append(cell);
			code=code.cloneNode(false);
			code.classList.remove(`cp`);
			code.removeAttribute(`data-character`);
			code.append(t(shortcut));
			cell=cell.cloneNode(false);
			cell.append(code);
			row.append(cell);
			cell=cell.cloneNode(false);
			ver.append(t(`v`+shortcuts[shortcut].version));
			cell.append(ver);
			row.append(cell);
			table.append(row);
		}
	},
	toggle(){
		docs.open=docs.sidebar.dataset.open!==`true`;
		docs.sidebar.dataset.open=docs.open;
		if(docs.open)
			b.addEventListener(`keydown`,docs.close,false);
		else b.removeEventListener(`keydown`,docs.close);
	}
},
keyboard={
	list:q(`#keyboard>ol`),
	init(){
		let item,key;
		for(key of characters){
			if(item)
				item=item.cloneNode(true);
			else{
				item=e(`li`);
				item.classList.add(`cp`,`df`);
				item.tabIndex=`-1`;
				item.append(t(``));
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
			d.execCommand(`insertText`,false,event.target.dataset.character);
			interpreter.update();
			if(event.currentTarget===keyboard.list)
				event.target.focus();
		}
	},
	toggle(){
		keyboard.open=keyboard.list.parentNode.dataset.open!==`true`;
		keyboard.list.parentNode.dataset.open=keyboard.open;
		if(keyboard.open)
			b.addEventListener(`keydown`,keyboard.close,false);
		else b.removeEventListener(`keydown`,keyboard.close);
	}
},
general={
	buttons:{
		theme:i(`theme`)
	},
	clipboard:i(`clipboard`),
	meta:q(`meta[name=theme-color]`),
	mdi:{
		"alert":`M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z`,
		"arrow-right":`M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z`,
		"autorenew":`M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z`,
		"check":`M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z`,
		"check-box-outline":`M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9`,
		"checkbox-blank-outline":`M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z`,
		"clipboard-text-outline":`M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z`,
		"close":`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,
		"delete":`M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z`,
		"dots-vertical":`M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z`,
		"drag-vertical":`M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z`,
		"flag":`M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z`,
		"file-document":`M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z`,
		"golf":`M19.5,18A1.5,1.5 0 0,1 21,19.5A1.5,1.5 0 0,1 19.5,21A1.5,1.5 0 0,1 18,19.5A1.5,1.5 0 0,1 19.5,18M17,5.92L11,9V18.03C13.84,18.19 16,19 16,20C16,21.1 13.31,22 10,22C6.69,22 4,21.1 4,20C4,19.26 5.21,18.62 7,18.27V20H9V2L17,5.92Z`,
		"github-circle":`M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z`,
		"invert-colors":`M12,19.58V19.58C10.4,19.58 8.89,18.96 7.76,17.83C6.62,16.69 6,15.19 6,13.58C6,12 6.62,10.47 7.76,9.34L12,5.1M17.66,7.93L12,2.27V2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93Z`,
		"keyboard":`M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z`,
		"link-variant":`M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z`,
		"loading":`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,
		"magnify":`M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z`,
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
	},
	init(){
		general.theme();
		interpreter.init();
		version.init();
		general.icons(b);
		keyboard.init();
		let file=`https://cdn.jsdelivr.net/gh/ETHproductions/japt`;
		file+=`@${version.selected===version.current||version.two?`master@{${new Date().toISOString().replace(/(\:\d\d){2}\.\d+.+?$/,``)}}`:`v`+version.selected}/src/${version.two?`japt`:`japt-interpreter`}.js`;
		general.js(`https://cdn.jsdelivr.net/gh/ETHproductions/japt/dependencies/shoco.js`).then(()=>{
			general.js(file).then(()=>{
				Japt.stdout=interpreter.fields.output;
				Japt.stderr=interpreter.fields.error;
				if(interpreter.fields.code.value){
					interpreter.update();
					interpreter.run();
				}
				general.listeners();
				docs.init().catch(err=>console.error(`Failed to load documentation:`,err));
			}).catch(err=>console.error(`Failed to load interpreter:`,err));
		}).catch(err=>console.error(`Failed to load schoco:`,err));
	},
	close(event,fn){
		if(event.keyCode===27){
			fn();
			event.stopPropagation();
		}
	},
	copy(event){
		let 	target=event.target.dataset.copy,
			text;
		console.log(target.startsWith(`docs-`));
		if(target===`compressor`)
			text=compressor.result.string;
		else if(interpreter[target])
			text=interpreter[target]();
		else if(interpreter.fields[target])
			text=interpreter.fields[target].value;
		else if(target.startsWith(`docs-`))
			text=interpreter.url()+`#`+target;
		if(target===`explanation`)
			text=text.replace(/^/gm,`    `);
		general.clipboard.value=text;
		general.clipboard.select();
		d.execCommand(`copy`,false);
		event.target.classList.add(`confirm`);
		event.target.addEventListener(`transitionend`,()=>event.target.classList.remove(`confirm`),{capture:false,once:false});
	},
	icons(parent){
		let icon,path,svg;
		for(svg of parent.querySelectorAll(`svg[data-mdi]`)){
			if(!svg.getAttribute(`viewBox`))
				svg.setAttribute(`viewBox`,`0 0 24 24`);
			for(icon of svg.dataset.mdi.split(`,`)){
				if(path)
					path=path.cloneNode(true);
				else{
					path=n(`path`);
					path.classList.add(`pen`);
				}
				path.setAttribute(`d`,general.mdi[icon]);
				svg.append(path);
			}
			svg.removeAttribute(`data-mdi`);
		}
	},
	js(file){
		return new Promise((resolve,reject)=>{
			let script=e(`script`);
			script.async=true;
			script.src=file;
			b.append(script);
			script.addEventListener(`load`,resolve,{capture:false,once:true});
			script.addEventListener(`error`,reject,{capture:false,once:true});
		});
	},
	listeners(){
		b.addEventListener(`keydown`,general.run,false);
		version.list.addEventListener(`click`,version.change,false);
		general.buttons.theme.addEventListener(`click`,general.theme,false);
		interpreter.fields.flags.addEventListener(`focus`,interpreter.flags,false);
		interpreter.fields.flags.addEventListener(`blur`,interpreter.flags,false);
		interpreter.button.addEventListener(`click`,interpreter.run,false);
		i(`copy-link`).addEventListener(`click`,general.copy,false);
		i(`copy-post`).addEventListener(`click`,general.copy,false);
		i(`undo`).addEventListener(`click`,()=>d.execCommand(`undo`,false),false);
		i(`redo`).addEventListener(`click`,()=>d.execCommand(`redo`,false),false);
		i(`golf`).addEventListener(`click`,interpreter.golf,false);
		i(`copy-code`).addEventListener(`click`,general.copy,false);
		interpreter.fields.code.addEventListener(`input`,interpreter.update,false);
		i(`copy-js`).addEventListener(`click`,general.copy,false);
		i(`copy-input`).addEventListener(`click`,general.copy,false);
		interpreter.fields.input.addEventListener(`input`,()=>general.resize(interpreter.fields.input),false);
		i(`copy-output`).addEventListener(`click`,general.copy,false);
		interpreter.cache.buttons.toggle.addEventListener(`click`,interpreter.cache.toggle,false);
		interpreter.cache.buttons.clear.addEventListener(`click`,interpreter.cache.clear,false);
		i(`copy-explanation`).addEventListener(`click`,general.copy,false);
		interpreter.fields.explanation.addEventListener(`input`,()=>general.resize(interpreter.fields.explanation),false);
		compressor.buttons.compress.addEventListener(`click`,compressor.init,false);
		compressor.buttons.permute.addEventListener(`click`,compressor.permutations.toggle,false);
		compressor.buttons.copy.addEventListener(`click`,general.copy,false);
		compressor.buttons.reset.addEventListener(`click`,compressor.reset,false);
		compressor.field.addEventListener(`input`,()=>general.resize(compressor.field),false);
		q(`#docs>h2`).addEventListener(`click`,docs.toggle,false);
		docs.sidebar.addEventListener(`click`,docs.change,false);
		docs.sidebar.addEventListener(`click`,keyboard.insert,false);
		i(`search`).addEventListener(`click`,docs.search.toggle,false);
		q(`#keyboard>h2`).addEventListener(`click`,keyboard.toggle,false);
		keyboard.list.addEventListener(`click`,keyboard.insert,false);
		w.addEventListener(`resize`,()=>{
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
			b.classList.toggle(`light`);
			b.classList.toggle(`dark`);
		}else b.classList.add(l[`japt-theme`]||`dark`);
		let light=b.classList.contains(`light`);
		general.meta.content=`#${light?`fff`:`212121`}`;
		general.buttons.theme.parentNode.dataset.title=`${light?`Dark`:`Light`} Theme`;
		if(loaded)
			l.setItem(`japt-theme`,light?`light`:`dark`);
	}
};
general.init();
}