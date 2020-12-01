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
			w.location.href=interpreter.url(ver);
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
		footer:i(`footer`),
		header:i(`header`),
		input:i(`input`),
		output:i(`output`),
		timer:i(`timer`),
		transpiled:i(`transpiled`)
	},
	buttons:{
		golf:i(`golf`),
		run:i(`run`)
	},
	cache:{
		enabled:false,
		storage:`japt-cache`,
		buttons:{
			empty:i(`empty`),
			toggle:i(`cache`)
		},
		init(){
			interpreter.cache.array=l[interpreter.cache.storage]?JSON.parse(l[interpreter.cache.storage]):[];
		},
		add(flags,header,code,footer,input,output,timer){
			let programme={code,output,timer,version:version.selected};
			if(flags)
				programme.flags=flags;
			if(header)
				programme.header=header;
			if(footer)
				programme.footer=footer;
			if(input)
				programme.input=input;
			interpreter.cache.array.push(programme);
			if(interpreter.cache.array.length===1)
				interpreter.cache.buttons.empty.parentNode.classList.remove(`dn`);
			interpreter.cache.array=interpreter.cache.array.slice(-50);
			l.setItem(interpreter.cache.storage,JSON.stringify(interpreter.cache.array));
		},
		empty(){
			interpreter.cache.array=[];
			l.removeItem(interpreter.cache.storage);
			interpreter.cache.buttons.empty.parentNode.classList.add(`dn`);
		},
		find(index,flags,header,code,footer,input){
			return interpreter.cache.array[index?`findIndex`:`find`](obj=>obj.flags===flags&&obj.header===header&&obj.code===code&&obj.footer===footer&&obj.input===input&&obj.version===version.selected);
		},
		toggle(){
			interpreter.cache.enabled=!interpreter.cache.enabled;
			interpreter.cache.buttons.toggle.classList.toggle(`enabled`,interpreter.cache.enabled);
			interpreter.cache.buttons.empty.parentNode.classList.toggle(`dn`,!interpreter.cache.enabled||!interpreter.cache.array.length);
			interpreter.cache.buttons.toggle.parentNode.dataset.title=`${interpreter.cache.enabled?`Dis`:`En`}able Caching`;
		},
		update(index){
			interpreter.cache.array.push(interpreter.cache.array.splice(index,1)[0]);
			l.setItem(interpreter.cache.storage,JSON.stringify(interpreter.cache.array));
		}
	},
	init(){
		let params=u.searchParams;
		version.selected=version.numbers.includes(params.get(`v`))?params.get(`v`):version.current;
		q(`title`).firstChild.nodeValue=`Japt v${version.selected} Interpreter`;
		if(params.get(`flags`)){
			interpreter.fields.flags.value=general.decode(params.get(`flags`));
			interpreter.fields.flags.closest(`section`).classList.remove(`collapsed`);
		}
		if(params.get(`header`)){
			interpreter.fields.header.value=general.decode(params.get(`header`));
			general.resize(interpreter.fields.header);
			interpreter.fields.header.closest(`section`).classList.remove(`collapsed`);
		}
		if(params.get(`code`)){
			interpreter.fields.code.value=general.decode(params.get(`code`));
			general.resize(interpreter.fields.code);
		}
		if(params.get(`footer`)){
			interpreter.fields.footer.value=general.decode(params.get(`footer`));
			general.resize(interpreter.fields.footer);
			interpreter.fields.footer.closest(`section`).classList.remove(`collapsed`);
		}
		if(params.get(`input`)){
			interpreter.fields.input.value=general.decode(params.get(`input`));
			general.resize(interpreter.fields.input);
		}
		interpreter.fields.counter.append(t(``));
		interpreter.fields.timer.append(t(``));
		interpreter.regex=RegExp(Object.keys(shortcuts).filter(shortcut=>shortcuts[shortcut].version<=version.selected).map(string=>string.replace(/(?=\W)/g,`\\`)).join(`|`),`g`);
		interpreter.cache.init();
	},
	flags(event){
		if(event.type===`focus`&&!interpreter.fields.flags.value)
			interpreter.fields.flags.value=`-`;
		else if(event.type===`blur`&&interpreter.fields.flags.value===`-`)
			interpreter.fields.flags.value=``;
	},
	golf(event){
		let 	code=golfed=interpreter.fields.code.value,
			transpiled=Japt.transpile(code),
			offset=0,
			selection=interpreter.fields.code.selectionStart,
			length,match,tmp,shortcut;
		while(match=interpreter.regex.exec(code)){
			shortcut=shortcuts[match[0]].character;
			tmp=golfed.substring(0,match.index-offset)+shortcut+golfed.slice(match.index+match[0].length-offset);
			if(transpiled===Japt.transpile(tmp)){
				golfed=tmp;
				length=match[0].length-shortcut.length;
				offset+=length;
				if(offset<selection)
					selection-=length;
			}else interpreter.regex.lastIndex=match.index+1;
		}
		if(code!==golfed){
			interpreter.fields.code.focus();
			d.execCommand(`selectAll`,false);
			d.execCommand(`insertText`,false,golfed);
			interpreter.fields.code.selectionStart=interpreter.fields.code.selectionEnd=selection;
		}else interpreter.fields.code.focus();
		interpreter.regex.lastIndex=0;
		general.confirm(event.target);
	},
	markdown(){
		let markdown=`# [Japt](https://github.com/ETHproductions/japt)`;
		if(version.current!==version.selected)
			markdown+=` v`+version.selected;
		if(interpreter.fields.flags.value)
			markdown+=` [\`${interpreter.fields.flags.value}\`](https://codegolf.meta.stackexchange.com/a/14339/)`;
		markdown+=`, ${interpreter.bytes} [${`bytes`.slice(0,interpreter.bytes!==1?5:4)}](https://en.wikipedia.org/wiki/${interpreter.encoding===`UTF-8`?`UTF-8`:`ISO/IEC_8859-1`})\n\n${interpreter.fields.code.value.replace(/^/gm,`    `)}\n\n[${interpreter.fields.input.value?`Try`:`Test`} it](${interpreter.url()})`;
		if(interpreter.fields.explanation.value)
			markdown+=`\n\n`+interpreter.fields.explanation.value.replace(/^/gm,`    `);
		return markdown;
	},
	reset(){
		b.classList.remove(`cw`);
		interpreter.running=false;
		general.resize(interpreter.fields.output);
		interpreter.buttons.run.classList.remove(`running`);
	},
	run(){
		if(!interpreter.running){
			let 	flags=interpreter.fields.flags.value,
				header=interpreter.fields.header.value,
				code=programme=interpreter.fields.code.value,
				footer=interpreter.fields.footer.value,
				input=interpreter.fields.input.value,
				result,timer;
			interpreter.fields.error.parentNode.classList.add(`dn`);
			if(interpreter.cache.enabled)
				result=interpreter.cache.find(false,flags,header,code,footer,input);
			if(interpreter.cache.enabled&&result){
				interpreter.fields.timer.firstChild.nodeValue=`cached`;
				interpreter.fields.output.value=result.output;
				interpreter.cache.update(interpreter.cache.find(true,flags,header,code,footer,input));
				general.resize(interpreter.fields.output);
			}else{
				interpreter.running=true;
				b.classList.add(`cw`);
				interpreter.fields.timer.firstChild.nodeValue=``;
				interpreter.buttons.run.classList.add(`running`);
				if(header)
					programme=header+`\n`+programme;
				if(footer)
					programme+=`\n`+footer;
				setTimeout(Japt.run,1,
					programme,
					flags+`\n`+input,
					false,
					()=>timer=performance.now(),
					output=>{
						timer=performance.now()-timer;
						interpreter.fields.timer.firstChild.nodeValue=(timer/1000).toFixed(3)+` seconds`;
						if(Japt.implicit_output)
							Japt.output(output);
						interpreter.reset();
						if(interpreter.cache.enabled&&timer>100)
							interpreter.cache.add(flags,header,code,footer,input,output,timer);
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
	update(loaded=true){
		let 	header=interpreter.fields.header.value,
			code=programme=interpreter.fields.code.value,
			footer=interpreter.fields.footer.value,
			indent=1,
			transpiled;
		if(header)
			programme=header+`\n`+programme;
		if(footer)
			programme+=`\n`+footer;
		transpiled=Japt.transpile(programme);
		transpiled=transpiled.replace(/\{ | \}|; /g,brace=>{
			brace=brace.trim();
			switch(brace){
				case`{`:
					indent++;
					return`{\n`.padEnd(Math.max(1,indent+1),`\t`);
					break;
				case`}`:
					indent--;
					return`\n`.padEnd(Math.max(1,indent),`\t`)+`}`;
					break;
				default:
					return`;\n`;
			}
		});		
		interpreter.fields.transpiled.value=transpiled;
		if(loaded){
			highlighter.ace.transpiled.setValue(transpiled,1);
			general.resize(interpreter.fields.transpiled);
		}
		if(/[^\x00-\xff]/.test(code))
			interpreter.encoding=`UTF-8`;
		else interpreter.encoding=`ISO-8859-1`;
		interpreter.bytes=general.count(code);
		interpreter.fields.counter.firstChild.nodeValue=interpreter.bytes+` bytes`.slice(0,interpreter.bytes!==1?6:5)+` (${interpreter.encoding})`;
	},
	url(v=version.selected){
		let url=u.protocol+`//${u.hostname+u.pathname}?v=`+v;
		if(interpreter.fields.flags.value)
			url+=`&flags=`+general.encode(interpreter.fields.flags.value);
		if(interpreter.fields.header.value)
			url+=`&header=`+general.encode(interpreter.fields.header.value);
		if(interpreter.fields.code.value)
			url+=`&code=`+general.encode(interpreter.fields.code.value);
		if(interpreter.fields.footer.value)
			url+=`&footer=`+general.encode(interpreter.fields.footer.value);
		if(interpreter.fields.input.value)
			url+=`&input=`+general.encode(interpreter.fields.input.value);
		return url.replace(/\+/g,`%2b`).replace(/ /g,`%20`);
	}
},
highlighter={
	buttons:{
		transpiled:i(`hl-transpiled`),
	},
	themes:{
		dark:`merbivore_soft`,
		light:`xcode`
	},
	init(){
		general.js(`https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js`).then(()=>{
			highlighter.ace={
				transpiled:highlighter.load(interpreter.fields.transpiled,`javascript`)
			};
		}).catch(err=>console.error(`Failed to load Ace:`,err));
	},
	load(field,mode){
		let editor=ace.edit(field,{
			behavioursEnabled:false,
			dragEnabled:false,
			cursorStyle:`slim`,
			fontFamily:`Roboto Mono,Lucida Console,Courier New,monospace`,
			fontSize:16,
			highlightActiveLine:false,
			highlightGutterLine:false,
			highlightSelectedWord:false,
			maxLines:Infinity,
			minLines:1,
			mergeUndoDeltas:false,
			mode:`ace/mode/`+mode,
			readOnly:field.parentNode.classList.contains(`readonly`),
			selectionStyle:`text`,
			showGutter:false,
			showPrintMargin:false,
			tabSize:4,
			theme:`ace/theme/${highlighter.themes[b.classList.contains(`light`)?`light`:`dark`]}`,
			useWorker:false,
			wrap:true
		});
		editor.container.parentNode.parentNode.append(field);
		general.resize(field);
		return editor;
	},
	toggle(editor){
		highlighter.buttons[editor].classList.toggle(`enabled`);
		highlighter.ace[editor].container.parentNode.classList.toggle(`dn`);
		highlighter.buttons[editor].parentNode.dataset.title=`${highlighter.ace[editor].container.parentNode.classList.contains(`dn`)?`En`:`Dis`}able Highlighting`;
	},
},
compressor={
	bases:[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
	delimiters:` \nabcdefghijklmnopqrstuvwxyz`,
	golfables:`gnpqswy`,
	shortcuts:`ÎÍ²¬¤ÔÕ`,
	results:i(`results`),
	fields:{
		input:i(`compressor`)
	},
	buttons:{
		compress:i(`compress`),
		insert:i(`insert`),
		permute:i(`permute`)
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
			compressor.buttons.permute.parentNode.dataset.title=`${compressor.permutations.enabled?`Dis`:`En`}able Permutations`;
		}
	},
	init(){
		for(let field of results.querySelectorAll(`pre`))
			compressor.fields[field.id]=field.appendChild(t(``));
	},
	get(array){
		return array.map(compressor.weigh).sort((one,two)=>(one.weight>two.weight)-(one.weight<two.weight))[0];
	},
	insert(){
		interpreter.fields.code.focus({preventScroll:true});
		d.execCommand(`insertText`,false,compressor.result.string);
		interpreter.fields.code.blur();
		general.confirm(compressor.buttons.insert);
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
	run(){
		compressor.value=compressor.fields.input.value.trim();
		if(compressor.value){
			compressor.original=compressor.value;
			try{
				let array=compressor.value.startsWith(`["`);
				if(array)
					compressor.value=compressor.value.replace(/([^\\["])",?"/g,"$1`,`").replace(/\["/,"[`").replace(/"\]/,"`]");
				else if(compressor.value.startsWith(`"`))
					compressor.value=compressor.value.replace(/^"|"$/g,"`");
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
			}
		}
	},
	test(){
		let value=compressor.fields.input.value.trim();
		if(value.startsWith(`["`)&&value.endsWith(`"]`))
			value=value.replace(/([^\\["])",?"/g,"$1`,`").replace(/\["/,"[`").replace(/"\]/,"`]");
		else if(value.startsWith(`"`)&&value.endsWith(`"`))
			value=value.replace(/^"|"$/g,"`");
		try{
			value=eval(value);
			if(value.constructor===String)
				value=value.length>0;
			else if(value.constructor===Array)
				value=value.every(elm=>elm.constructor===String)&&value.some(elm=>elm.length>0)||value.length>0&&value.every(elm=>elm.constructor===Number);
			else value=false;
			compressor.buttons.compress.classList.toggle(`pen`,!value);
		}catch(err){
			compressor.buttons.compress.classList.add(`pen`);
		}
	},
	update(array){
		let 	original=compressor.original,
			quotes=/([^\\[])("|`),\2/g;
		if(array)
			original=original.replace(quotes,`$1$2$2`);
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
		compressor.fields.original.nodeValue=original;
		compressor.fields.permutation.nodeValue=compressor.result.permutation?JSON.stringify(compressor.result.permutation).replace(array?quotes:``,array?`$1$2$2`:``):``;
		compressor.fields.size.nodeValue=general.count(original);
		compressor.fields.compressed.nodeValue=compressor.result.string;
		compressor.fields.base.nodeValue=compressor.result.base||``;
		compressor.fields.delimiter.nodeValue=compressor.result.delimiter||``;
		compressor.fields.bytes.nodeValue=general.count(compressor.result.string);
		compressor.results.classList.remove(`dn`);
	},
	weigh(obj){
		obj.weight=general.count(obj.string)-` \n`.includes(obj.delimiter)-` \n${compressor.golfables}`.includes(obj.delimiter)-(obj.base<17||obj.base===32);
		return obj;
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
			if(event.currentTarget===keyboard.list)
				event.target.focus();
			else interpreter.fields.code.blur();
		}
	},
	toggle(){
		keyboard.open=keyboard.list.parentNode.dataset.open!==`true`;
		keyboard.list.parentNode.dataset.open=keyboard.open;
		if(keyboard.open)
			b.addEventListener(`keydown`,keyboard.close);
		else b.removeEventListener(`keydown`,keyboard.close);
	}
},
docs={
	sidebar:i(`docs`),
	storage:`japt-docs`,
	search:{
		article:i(`docs-search`),
		form:q(`#docs-search>div`),
		input:q(`#docs-search>div>input[type=text]`),
		init(){
			docs.search.titles=docs.search.article.querySelectorAll(`h4`);
			docs.search.methods=[...docs.search.form.querySelectorAll(`input[type=checkbox]`)];
			docs.search.form.addEventListener(`input`,docs.search.wait,true);
		},
		exec(){
			let 	methods=docs.search.methods.map(input=>input.checked&&input.value),
				value=docs.search.input.value.toLowerCase(),
				hide,title,text;
			docs.search.article.scrollTo({
				behavior:`smooth`,
				top:0
			});
			for(title of docs.search.titles){
				text=title.nextElementSibling;
				hide=	!value||
					!methods.includes(title.dataset.object)||
					!(text.innerHTML.replace(/^Returns |\<[^>]+?\>/g,``).toLowerCase().includes(value)||
					title.firstChild.nodeValue.includes(value));
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
		docs.files=l[docs.storage]?JSON.parse(l[docs.storage]):[
			`docs/intro.html`,
			`docs/interpreter.html`,
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
			`docs/examples.json`,
			`docs/settings.html`
		];
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
				svg.addEventListener(`click`,general.copy);
				switch(docs.files[index].slice(-4)){
					case`json`:
						json=await file.json();
						switch(json.type){
							case`examples`:
								docs.examples(json,article);
								break;
							case`flags`:
								docs.methods(json,article);
								break;
							case`methods`:
								docs.methods(json,article);
								label.setAttribute(`for`,input.id=`method-`+json.object);
								input.value=json.object;
								label.lastChild.nodeValue=article.firstChild.innerText.match(/[^ ]+/)[0];
								docs.search.form.append(input,label);
								break;
						}
						item.firstChild.nodeValue=order.lastChild.nodeValue=json.title;
						break;
					case`html`:
						article.innerHTML=docs.parse(await file.text());
						item.firstChild.nodeValue=order.lastChild.nodeValue=article.firstChild.firstChild.nodeValue;
						break;
					default:console.error(`Failed to load documenation:`,file.url)
				}
				docs.sidebar.append(article);
				article.firstChild.prepend(svg);
				menu.append(item);
				order.dataset.file=docs.files[index];
				sort.append(order);
			}
			docs.menu(menu);
			docs.shortcuts();
			docs.regex();
			i(`docs-examples`).addEventListener(`click`,docs.run);
			docs.settings(sort);
			general.icons(docs.sidebar);
			docs.search.init();
			i(`loading`).remove();
		});
	},
	change(event){
		if(event.target.dataset.section){
			if(w.getComputedStyle(docs.sidebar).getPropertyValue(`transform`)!==`none`)
				docs.toggle();
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
	examples(json,article){
		let 	object=docs.prep(json,article),
			list=e(`ol`),
			item,span;
		for(key in object){
			if(item){
				item=item.cloneNode(false);
				span=span.cloneNode(true);
			}else{
				item=e(`li`);
				span=e(`span`);
				span.classList.add(`cp`,`tdu`);
				span.append(t(``));
			}
			span.dataset.code=general.encode(object[key]);
			span.firstChild.nodeValue=key;
			item.append(span,t(` (${object[key].length} byte${`s`.slice(object[key].length===1)})`));
			list.append(item);
		}
		article.append(list);
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
	methods(json,article){
		let 	object=docs.prep(json,article),
			key,svg,title,text;
		for(key in object){
			if(title){
				title=title.cloneNode(false);
				text=text.cloneNode(false);
				if(json.type===`methods`){
					title.removeAttribute(`data-object`);
					title.classList.remove(`dn`);
					text.classList.remove(`dn`);
					svg=svg.cloneNode(true);
				}
			}else{
				title=e(`h4`);
				title.classList.add(`method`,`fwm`);
				if(json.type===`methods`){
					title.classList.add(`cp`);
					svg=n(`svg`);
					svg.classList.add(`pen`,`vat`);
					svg.setAttribute(`viewBox`,`0 0 24 24`);
					svg.dataset.mdi=`arrow-right`;
				}
				text=e(`p`);
			}
			title.classList.toggle(`unavailable`,object[key].version>version.selected);
			title.dataset.version=object[key].version;
			text.innerHTML=docs.parse(object[key].description);
			article.append(title,text);
			switch(json.type){
				case`flags`:
					title.append(t(`-`+key));
					break;
				default:
					title.dataset.character=key[0];
					title.append(t(key),svg,t(object[key].returns));
					docs.search.article.append(title=title.cloneNode(true),text=text.cloneNode(true));
					title.dataset.object=json.object;
					title.classList.add(`dn`);
					text.classList.add(`dn`);
			}
		}
	},
	parse(text){
		return text
			.replace(/`([^`]+?)`([^`]+?)``/g,`<code class="cp dib vat" data-character="$1">$2</code>`)
			.replace(/`([^`]+?)`/g,`<code class="dib vat">$1</code>`)
			.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g,`<a href="$2">$1</a>`)
			.replace(/\[(v)\:current\]/g,`<span class="version dib vat">$1${version.current}</span>`)
			.replace(/\[(v)\:([^\]]+?)\]/g,`<span class="version dib vat">$1$2</span>`)
			.replace(/\[icon\:([^\]]+?)\]/g,`<svg class="vat" data-mdi="$1" viewBox="0 0 24 24"></svg>`)
			.replace(/\[([a-z]+)\:([^\]]+?)\]/g,`<span class="cp tdu" data-section="docs-$1">$2</span>`);

	},
	prep(json,article){
		let heading,intro,text;
		heading=e(`h3`);
		heading.classList.add(`ps`);
		heading.innerHTML=json.type===`methods`?json.title.replace(/./,`<code>$&</code>`):json.title;
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
		return json[json.type];
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
			ver.classList.toggle(`unavailable`,version.selected<regexes[regex].version);
			ver.append(t(`v`+regexes[regex].version));
			cell.append(ver);
			row.append(cell);
			table.append(row);
		}
	},
	run(event){
		let dataset=event.target.dataset;
		if(dataset.code){
			interpreter.fields.code.focus();
			d.execCommand(`selectAll`,false);
			d.execCommand(`insertText`,false,general.decode(dataset.code));
			interpreter.run();
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
					if(event.oldIndex!==event.newIndex)
						l.setItem(docs.storage,JSON.stringify([...event.target.children].map(child=>child.dataset.file).concat(docs.files[docs.files.length-1])));
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
			ver.classList.toggle(`unavailable`,version.selected<shortcuts[shortcut].version);
			ver.append(t(`v`+shortcuts[shortcut].version));
			cell.append(ver);
			row.append(cell);
			table.append(row);
		}
	},
	toggle(){
		docs.open=docs.sidebar.dataset.open!==`true`;
		docs.sidebar.dataset.open=docs.open;
		if(docs.open){
			if(projects.open)
				projects.toggle();
			b.addEventListener(`keydown`,docs.close);
		}
		else b.removeEventListener(`keydown`,docs.close);
	}
},
projects={
	sidebar:i(`projects`),
	fields:{
		name:i(`name`),
		url:i(`challenge`)
	},
	buttons:{
		save:i(`save`),
		upload:i(`upload`),
		download:i(`download`),
		clear:i(`clear`)
	},
	list:q(`#projects ol`),
	storage:`japt-projects`,
	init(key){
		projects.data=l[projects.storage]?JSON.parse(l[projects.storage]):{};
		if(key)
			if(projects.data[key=general.decode(key)]){
				let project=projects.data[key];
				if(project.flags){
					interpreter.fields.flags.value=general.decode(project.flags);
					interpreter.fields.flags.closest(`section`).classList.remove(`collapsed`);
				}
				if(project.header){
					interpreter.fields.header.value=general.decode(project.header);
					general.resize(interpreter.fields.header);
					interpreter.fields.header.closest(`section`).classList.remove(`collapsed`);
				}
				interpreter.fields.code.value=general.decode(project.code);
				general.resize(interpreter.fields.code);
				if(project.footer){
					interpreter.fields.footer.value=general.decode(project.footer);
					general.resize(interpreter.fields.footer);
					interpreter.fields.footer.closest(`section`).classList.remove(`collapsed`);
				}
				if(project.input){
					interpreter.fields.input.value=general.decode(project.input);
					general.resize(interpreter.fields.input);
				}
				if(project.cache)
					interpreter.cache.buttons.toggle.dispatchEvent(general.events.click);
				if(project.explanation){
					interpreter.fields.explanation.value=general.decode(project.explanation);
					general.resize(interpreter.fields.explanation);
					interpreter.fields.explanation.closest(`section`).classList.remove(`collapsed`);
				}
				if(project.permutations)
					compressor.buttons.permute.dispatchEvent(general.events.click);
				if(project.compressor){
					compressor.fields.input.value=general.decode(project.compressor);
					compressor.fields.input.dispatchEvent(general.events.input);
					compressor.fields.input.closest(`section`).classList.remove(`collapsed`);
				}
				if(project.notes){
					general.fields.notes.value=general.decode(project.notes);
					general.resize(general.fields.notes);
					general.fields.notes.closest(`section`).classList.remove(`collapsed`);
				}
				projects.fields.name.value=key;
				if(project.url)
					projects.fields.url.value=project.url;
			}
		projects.items=projects.list.children;
		for(key in projects.data)
			projects.add(key);
		if(Object.keys(projects.data).length){
			projects.buttons.download.classList.remove(`dn`);
			projects.buttons.clear.classList.remove(`dn`);
		}
		general.icons(projects.list);
	},
	add(key){
		let 	item=e(`li`),
			menu=e(`ul`),
			action=e(`li`),
			link=e(`a`),
			svg=n(`svg`),
			insert;
		item.classList.add(`oh`,`pr`,`toe`,`wsnw`);
		item.dataset.project=key;
		item.append(t(key),menu);
		menu.classList.add(`oh`,`pa`);
		action.classList.add(`dib`,`tac`);
		svg.classList.add(`cp`,`vat`);
		svg.setAttribute(`viewBox`,`0 0 24 24`);
		svg.dataset.mdi=`play-circle`;
		svg.addEventListener(`click`,projects.load);
		action.append(svg);
		menu.append(action);
		action=action.cloneNode(false);
		svg=svg.cloneNode(true);
		link.href=projects.data[key].url;
		if(!projects.data[key].url)
			link.classList.add(`pen`);
		svg.dataset.mdi=`launch`;
		link.append(svg);
		action.append(link);
		menu.append(action);
		action=action.cloneNode(false);
		svg=svg.cloneNode(true);
		svg.dataset.mdi=`delete`;
		svg.addEventListener(`click`,projects.delete);
		action.append(svg);
		menu.append(action);
		for(let child of projects.items)
			if(child.dataset.project.toLowerCase()>key.toLowerCase()){
				insert=child;
				break;
			}
		projects.list.insertBefore(item,insert);
		return item;
	},
	clear(){
		if(confirm(`Are you sure you wish to delete all your projects?`)){
			projects.data={};
			l.removeItem(projects.storage);
			while(projects.items.length)
				projects.list.firstElementChild.remove();
			projects.buttons.download.classList.add(`dn`);
			projects.buttons.clear.classList.add(`dn`);
		}
	},
	close(event){
		general.close(event,projects.toggle);
	},
	delete(event){
		if(confirm(`Are you sure you wish to delete this project?`)){
			let item=event.target.parentNode.parentNode.parentNode;
			delete projects.data[item.dataset.project];
			item.remove();
			if(projects.items.length)
				l.setItem(projects.storage,JSON.stringify(projects.data));
			else l.removeItem(projects.storage);
			projects.buttons.download.classList.toggle(`dn`,!projects.items.length);
			projects.buttons.clear.classList.toggle(`dn`,!projects.items.length);
		}
	},
	download(){
		general.download(`data:text/plain;base64,${general.encode(general.encode(JSON.stringify(projects.data)))}`,`japt-projects.txt`);
	},
	filter(event){
		for(let item of projects.items)
			item.classList.toggle(`dn`,!item.dataset.project.toLowerCase().startsWith(event.target.value.toLowerCase()));
	},
	import(event){
		let 	list=JSON.parse(general.decode(event.target.result)),
			key,project;
		for(key in list){
			let add=true;
			project=list[key];
			if(projects.data[key]){
				let count=0;
				if(Object.keys(projects.data[key]).length!==Object.keys(project).length||Object.entries(projects.data[key]).some(([key,value])=>key!==`timestamp`&&value!==project[key])){
					while(projects.data[key+` (${++count})`]);
					key+=` (${count})`;
				}else add=false
			}
			if(add){
				projects.data[key]=project;
				projects.add(key);
			}
		}
		if(key){
			l.setItem(projects.storage,JSON.stringify(projects.data));
			projects.buttons.download.classList.remove(`dn`);
			projects.buttons.clear.classList.remove(`dn`);
			general.icons(projects.list);
		}
		general.confirm(projects.buttons.upload);
	},
	load(event){
		let 	key=event.target.parentNode.parentNode.parentNode.dataset.project,
			url=u.protocol+`//${u.hostname+u.pathname}?v=${projects.data[key].version}&project=`+general.encode(key);
		window.location.href=url.replace(/\+/g,`%2b`).replace(/ /g,`%20`);
	},
	read(event){
		if(event.target.files[0].type===`text/plain`){
			let reader=new FileReader();
			reader.addEventListener(`load`,projects.import,{capture:false,once:true}),
			reader.readAsText(event.target.files[0]);
		}
		event.target.remove();
	},
	save(){
		let key=projects.fields.name.value.trim();
		if(key&&interpreter.fields.code.value){
			let 	url=projects.fields.url.value.trim(),
				compress=compressor.fields.input.value.trim(),
				link;
			if(projects.data[key])
				if(!confirm(`You already have a project saved with the name "${key}"; would you like to overwrite it with your current project?`))
					return;
				else for(let item of projects.items)
					if(item.dataset.project===key){
						link=item.querySelector(`a`);
						break;
					}
			projects.data[key]={
				"timestamp":new Date().getTime(),
				"version":version.selected,
				"code":general.encode(interpreter.fields.code.value)
			};
			if(url)
				projects.data[key].url=url;
			if(link){
				link.href=url;
				link.classList.toggle(`pen`,!url);
			}
			if(interpreter.fields.flags.value)
				projects.data[key].flags=general.encode(interpreter.fields.flags.value);
			if(interpreter.fields.header.value)
				projects.data[key].header=general.encode(interpreter.fields.header.value);
			if(interpreter.fields.input.value)
				projects.data[key].input=general.encode(interpreter.fields.input.value);
			if(interpreter.fields.footer.value)
				projects.data[key].footer=general.encode(interpreter.fields.footer.value);
			if(interpreter.cache.enabled)
				projects.data[key].cache=1;
			if(interpreter.fields.explanation.value)
				projects.data[key].explanation=general.encode(interpreter.fields.explanation.value);
			if(compressor.permutations.enabled)
				projects.data[key].permutations=1;
			if(compress)
				projects.data[key].compressor=general.encode(compress);
			if(general.fields.notes.value)
				projects.data[key].notes=general.encode(general.fields.notes.value);
			l.setItem(projects.storage,JSON.stringify(projects.data));
			if(!link)
				general.icons(projects.add(key));
			projects.buttons.download.classList.remove(`dn`);
			projects.buttons.clear.classList.remove(`dn`);
			general.confirm(projects.buttons.save);
		}
	},
	toggle(){
		projects.open=projects.sidebar.dataset.open!==`true`;
		projects.sidebar.dataset.open=projects.open;
		if(projects.open){
			if(docs.open)
				docs.toggle();
			b.addEventListener(`keydown`,projects.close);
		}
		else b.removeEventListener(`keydown`,projects.close);
	},
	upload(){
		let input=e(`input`);
		input.accept=`.txt,text/plain`;
		input.type=`file`;
		input.addEventListener(`change`,projects.read,{capture:false,once:true});
		b.append(input);
		input.click();
	}
},
general={
	buttons:{
		link:i(`copy-link`),
		post:i(`copy-post`),
		theme:i(`theme`)
	},
	fields:{
		clipboard:i(`clipboard`),
		notes:i(`notes`)
	},
	meta:q(`meta[name=theme-color]`),
	shortcuts:a(`[data-key]`),
	mdi:{
		"alert":`M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z`,
		"arrow-right":`M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z`,
		"book-open-variant":`M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z`,
		"cached":`M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12`,
		"check":`M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z`,
		"check-box-outline":`M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,5V19H5V5H19M10,17L6,13L7.41,11.58L10,14.17L16.59,7.58L18,9`,
		"checkbox-blank-outline":`M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z`,
		"clipboard-text-outline":`M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z`,
		"close":`M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z`,
		"content-save":`M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z`,
		"delete":`M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z`,
		"dots-vertical":`M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z`,
		"download":`M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z`,
		"drag-vertical":`M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z`,
		"file-document-edit":`M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H10V20.09L12.09,18H6V16H14.09L16.09,14H6V12H18.09L20,10.09V8L14,2H6M13,3.5L18.5,9H13V3.5M20.15,13C20,13 19.86,13.05 19.75,13.16L18.73,14.18L20.82,16.26L21.84,15.25C22.05,15.03 22.05,14.67 21.84,14.46L20.54,13.16C20.43,13.05 20.29,13 20.15,13M18.14,14.77L12,20.92V23H14.08L20.23,16.85L18.14,14.77Z`,
		"format-indent-increase":`M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z`,
		"forum":`M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z`,
		"golf":`M19.5,18A1.5,1.5 0 0,1 21,19.5A1.5,1.5 0 0,1 19.5,21A1.5,1.5 0 0,1 18,19.5A1.5,1.5 0 0,1 19.5,18M17,5.92L11,9V18.03C13.84,18.19 16,19 16,20C16,21.1 13.31,22 10,22C6.69,22 4,21.1 4,20C4,19.26 5.21,18.62 7,18.27V20H9V2L17,5.92Z`,
		"github-circle":`M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z`,
		"invert-colors":`M12,19.58V19.58C10.4,19.58 8.89,18.96 7.76,17.83C6.62,16.69 6,15.19 6,13.58C6,12 6.62,10.47 7.76,9.34L12,5.1M17.66,7.93L12,2.27V2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93Z`,
		"keyboard":`M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z`,
		"launch":`M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z`,
		"link":`M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z`,
		"link-variant":`M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z`,
		"loading":`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,
		"magnify":`M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z`,
		"markdown":`M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6H20.56C21.35 6 22 6.63 22 7.41V16.59C22 17.37 21.35 18 20.56 18M6.81 15.19V11.53L8.73 13.88L10.65 11.53V15.19H12.58V8.81H10.65L8.73 11.16L6.81 8.81H4.89V15.19H6.81M19.69 12H17.77V8.81H15.85V12H13.92L16.81 15.28L19.69 12Z`,
		"marker":`M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16`,
		"menu-down":`M7,10L12,15L17,10H7Z`,
		"menu-right":`M10,17L15,12L10,7V17Z`,
		"play":`M8,5.14V19.14L19,12.14L8,5.14Z`,
		"play-circle":`M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,
		"redo":`M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z`,
		"shuffle":`M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z`,
		"undo":`M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z`,
		"upload":`M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z`
	},
	events:{
		click:new Event(`click`),
		input:new Event(`input`)
	},
	init(event){
		interpreter.init();
		projects.init(u.searchParams.get(`project`));
		general.theme();
		version.init();
		general.icons(b);
		keyboard.init();
		let file=`https://cdn.jsdelivr.net/gh/ETHproductions/japt`;
		file+=`@${version.selected===version.current||version.two?`master@{${new Date().toISOString().replace(/(\:\d\d){2}\.\d+.+?$/,``)}}`:`v`+version.selected}/src/${version.two?`japt`:`japt-interpreter`}.js`;
		general.js(`https://cdn.jsdelivr.net/gh/ETHproductions/japt/dependencies/shoco.js`).then(()=>{
			general.js(file).then(()=>{
				Japt.stdout=interpreter.fields.output;
				Japt.stderr=interpreter.fields.error;
				general.listeners();
				compressor.init();
				if(interpreter.fields.code.value){
					interpreter.update(false);
					interpreter.run();
				}
				docs.init().catch(err=>console.error(`Failed to load documentation:`,err));
				highlighter.init();
			}).catch(err=>console.error(`Failed to load Japt:`,err));
		}).catch(err=>console.error(`Failed to load Shoco:`,err));
	},
	click(event){
		let 	target=event.target,
			dataset=target.dataset;
		if(event.target.constructor===HTMLHeadingElement)
			general.collapse(event);
		else if(dataset.copy)
			general.copy(event);
		else if(dataset.highlight)
			highlighter.toggle(dataset.highlight);
		else if(dataset.section)
			docs.change(event);
		else switch(target){
			case interpreter.buttons.golf:
				interpreter.golf(event);
				break;
			case highlighter.buttons.highlight:
				interpreter.highlight();
				break;
			case interpreter.cache.buttons.toggle:
				interpreter.cache.toggle();
				break;
			case interpreter.cache.buttons.empty:
				interpreter.cache.empty();
				break;
			case compressor.buttons.compress:
				compressor.run();
				break;
			case compressor.buttons.permute:
				compressor.permutations.toggle();
				break;
			case compressor.buttons.insert:
				compressor.insert();
				break;
		}
	},
	close(event,fn){
		if(event.key===`Escape`){
			fn();
			event.stopPropagation();
		}
	},
	collapse(event){
		event.target.parentNode.classList.toggle(`collapsed`);
	},
	confirm(button){
		button.classList.add(`confirm`);
		button.addEventListener(`transitionend`,general.unconfirm,{capture:false,once:true});
	},
	copy(event){
		let 	svg=event.target.constructor===SVGSVGElement,
			field,text;
		if(svg){
			let target=event.target.dataset.copy;
			if(target===`compressor`)
				text=compressor.result.string;
			else if(interpreter.fields[target]){
				field=interpreter.fields[target];
				text=field.value;
			}else if(general.fields[target]){
				field=general.fields[target];
				text=field.value;
			}else if(interpreter[target])
				text=interpreter[target]();
			else if(target.startsWith(`docs-`))
				text=interpreter.url()+`#`+target;
			if(target===`explanation`)
				text=text.replace(/^/gm,`    `);
		}else{
			field=event.target;
			text=field.value;
		}
		general.fields.clipboard.value=text||``;
		general.fields.clipboard.select();
		d.execCommand(`copy`,false);
		if(field)
			field.focus({preventScroll:true});
		if(svg)
			general.confirm(event.target);
	},
	count(code){
		if(/[^\x00-\xff]/.test(code))
			code=unescape(encodeURI(code));
		return code.length;
	},
	decode(text){
		return atob(text).replace(/\\u[0-9A-F]{4}/gi,chr=>String.fromCharCode(parseInt(chr.slice(2),16)));
	},
	download(data,name){
		let link=e(`a`);
		link.href=data;
		link.download=name;
		b.append(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(link.href);
	},
	encode(text){
		return btoa(text.replace(/./g,chr=>chr<`Ā`?chr:`\\u`+chr.charCodeAt(0).toString(16).padStart(4,0))).replace(/=+$/,``);
	},
	exec(event){
		d.execCommand(event.target.id,false);
	},
	icons(parent){
		let icon,path,svg;
		for(svg of parent.querySelectorAll(`svg[data-mdi]`)){
			if(!svg.hasAttribute(`viewBox`))
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
	input(event){
		let target=event.target;
		if(target.constructor===HTMLTextAreaElement)
			general.resize(target);
		switch(target){
			case interpreter.fields.header:
			case interpreter.fields.code:
			case interpreter.fields.footer:
				interpreter.update();
				break;
			case compressor.fields.input:
				compressor.test();
				break;
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
	keydown(event){
		let 	key=event.key,
			target=event.target;
		if(event.ctrlKey)
			switch(key){
				case`Control`:
					for(let button of general.shortcuts)
						button.classList.add(`show`);
					break;
				case`Enter`:
					if(target!==compressor.fields.input)
						interpreter.buttons.run.dispatchEvent(general.events.click);
					else compressor.buttons.compress.dispatchEvent(general.events.click);
					break;
				case`c`:
					if(target.value&&target.selectionStart===target.selectionEnd)
						general.copy(event);
					break;
				case`g`:
					event.preventDefault();
					interpreter.buttons.golf.dispatchEvent(general.events.click);
					break;
				case`k`:
					event.preventDefault();
					keyboard.toggle();
					break;
				case`l`:
					event.preventDefault();
					general.buttons.link.dispatchEvent(general.events.click);
					break;
				case`m`:
					general.buttons.post.dispatchEvent(general.events.click);
					break;
			}
		else if(key===`Enter`&&(target===projects.fields.name||target===projects.fields.url))
			projects.buttons.save.dispatchEvent(general.events.click);
	},
	keyup(event){
		if(!event.key||event.key===`Control`)
			for(let button of general.shortcuts)
				button.classList.remove(`show`);
	},
	listeners(){
		b.addEventListener(`keydown`,general.keydown);
		b.addEventListener(`keyup`,general.keyup);
		version.list.addEventListener(`click`,version.change);
		general.buttons.theme.addEventListener(`click`,general.theme);
		i(`undo`).addEventListener(`click`,general.exec);
		i(`redo`).addEventListener(`click`,general.exec);
		interpreter.buttons.run.addEventListener(`click`,interpreter.run);
		general.buttons.link.addEventListener(`click`,general.copy);
		general.buttons.post.addEventListener(`click`,general.copy);
		q(`main`).addEventListener(`click`,general.click,true);
		q(`main`).addEventListener(`input`,general.input,true);
		interpreter.fields.flags.addEventListener(`focus`,interpreter.flags);
		interpreter.fields.flags.addEventListener(`blur`,interpreter.flags);
		q(`#keyboard>h2`).addEventListener(`click`,keyboard.toggle);
		keyboard.list.addEventListener(`click`,keyboard.insert);
		q(`#docs>h2`).addEventListener(`click`,docs.toggle);
		docs.sidebar.addEventListener(`click`,docs.change);
		docs.sidebar.addEventListener(`click`,keyboard.insert);
		i(`search`).addEventListener(`click`,docs.search.toggle);
		q(`#projects>h2`).addEventListener(`click`,projects.toggle);
		projects.buttons.save.addEventListener(`click`,projects.save);
		projects.buttons.upload.addEventListener(`click`,projects.upload);
		projects.buttons.download.addEventListener(`click`,projects.download);
		projects.buttons.clear.addEventListener(`click`,projects.clear);
		i(`filter`).addEventListener(`input`,projects.filter);
		q(`footer`).addEventListener(`click`,general.toggle);
		d.addEventListener(`visibilitychange`,general.keyup);
		w.addEventListener(`resize`,general.resize);
	},
	resize(target){
		if(target.currentTarget!==w){
			general.fields.clipboard.value=target.value;
			target.style.height=2+general.fields.clipboard.scrollHeight+`px`;
		}else{
			general.resize(interpreter.fields.header);
			general.resize(interpreter.fields.code);
			general.resize(interpreter.fields.footer);
			general.resize(interpreter.fields.transpiled);
			general.resize(interpreter.fields.input);
			general.resize(interpreter.fields.output);
			general.resize(interpreter.fields.explanation);
			general.resize(compressor.fields.input);
			general.resize(general.fields.notes);
		}
	},
	theme(loaded=false){
		if(loaded){
			b.classList.toggle(`light`);
			b.classList.toggle(`dark`);
		}else b.classList.add(l[`japt-theme`]||`dark`);
		let light=b.classList.contains(`light`);
		general.meta.content=`#${light?`fff`:`212121`}`;
		general.buttons.theme.parentNode.dataset.title=`${light?`Dark`:`Light`} Theme`;
		if(loaded){
			for(let editor in highlighter.ace)
				highlighter.ace[editor].setTheme(`ace/theme/${highlighter.themes[light?`light`:`dark`]}`);
			l.setItem(`japt-theme`,light?`light`:`dark`);
		}
	},
	toggle(event){
		if(event.target.dataset.sidebar)
			q(`#${event.target.dataset.sidebar}>h2`).dispatchEvent(general.events.click);
	},
	unconfirm(event){
		event.currentTarget.classList.remove(`confirm`);
	}
};
general.init();
}
