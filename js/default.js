{
const 	W=window,
	D=document,
	B=D.body,
	L=W.localStrorage,
	U=new URL(W.location.href),
	A=s=>D.querySelectorAll(s),
	E=e=>D.createElement(e),
	I=i=>D.getElementById(i),
	N=e=>D.createElementNS(`http://www.w3.org/2000/svg`,e),
	Q=s=>D.querySelector(s),
	T=t=>D.createTextNode(t),
//	characters="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕ×ßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûü",
	characters="$[]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕ×ßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûü",
	shortcuts=characters.slice(characters.search(`¡`),characters.search(`ß`)),
	golfables=[`Um@`,`Us2 `,`m@`,`s2 `,`==`,`!=`,`<=`,`>=`,`&&`,`||`,`&&!`,`q `,`m_`,`s0,`,`++`,`+=`,`p2 `,`p3 `,`--`,`-=`,`===`,`qR `,`qS `,`) `,`((`,`(((`,`.25`,`.5`,`.75`,`!==`,`>>>`,`~~`,`} `,`+1`,`s1 `,`o@`,`o_`,`XYZ{X`,`-1`,`l `,`mDEF{D`,`gJ `,`n2 `,`g `,`XYZ{Y`,`$new Date($`,`*2`,`-~`,`~-`,`w `,`y `,`r*1 `],
	fields={
		clipboard:I(`clipboard`),
		code:I(`code`),
		compressor:I(`compressor`),
		counter:I(`counter`),
		error:Q(`#error>span`),
		flags:I(`flags`),
		input:I(`input`),
		output:I(`output`),
		timer:I(`timer`),
		transpiled:I(`transpiled`)
	},
	variables={
		bytes:0,
		permute:false,
		running:false,
		safemode:false
	},
	compressor={
		alphabet:`\nabcdefghijklmnopqrstuvwxyz`,
		bases:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
		buttons:{
			compress:I(`compress`),
			copy:I(`copy_compressed`),
			permute:I(`permute`),
			reset:I(`reset`)
		},
		compress(){
			compressor.value=fields.compressor.value;
			if(compressor.original=compressor.value){
				try{
					compressor.value=eval(compressor.value);
					if(compressor.value.constructor===String)
						compressor.result=[{string:shoco.c(compressor.value)}];
					else if(compressor.value.constructor===Array){
						if(compressor.value.every(x=>x.constructor===String)){
							if(variables.permute)
								compressor.value=compressor.value.á();
							compressor.result=compressor.map(compressor.value);
						}else if(compressor.value.every(x=>x.constructor===Number)){
							if(variables.permute)
								compressor.value=compressor.value.á();
							compressor.result=compressor.bases.map(base=>compressor.get(compressor.map(compressor.value,base)));
						}
					}
					for(let result of compressor.result)
						result.string=`\`${result.string.replace(/`/g,"\\`")}\``;
					compressor.result=compressor.get(compressor.result);
					compressor.update();
				}catch(err){
					console.error(err);
				}
			}
		},
		get(array){
			return array.sort((one,two)=>one.string.length-two.string.length)[0];
		},
		map(array,base){
			if(array[0].constructor===Array)
				return array.map(array=>compressor.get(compressor.map(array,base)));
			let alphabet,strings;
			if(base){
				strings=array.map(num=>num.toString(base));
				alphabet=compressor.alphabet.k(strings.join(``));
			}else alphabet=compressor.alphabet.k(array.join(``));
			return [...alphabet].map(character=>{
				let obj={delimiter:character===`\n`?`R`:`"${character}"`};
				if(variables.permute)
					obj.permutation=array;
				if(base){
					obj.string=shoco.c(strings.join(character));
					obj.base=base%16?base:`GH`[base/16];
				}else obj.string=shoco.c(array.join(character));
				return obj;
			});
		},
		reset(){
			fields.compressor.readOnly=false;
			fields.compressor.value=compressor.original;
			fields.compressor.dispatchEvent(new Event(`input`));
			compressor.buttons.compress.classList.remove(`dn`);
			compressor.buttons.permute.classList.remove(`dn`);
			compressor.buttons.copy.classList.add(`dn`);
			compressor.buttons.reset.classList.add(`dn`);
		},
		update(){
			compressor.buttons.compress.classList.add(`dn`);
			compressor.buttons.permute.classList.add(`dn`);
			compressor.buttons.copy.classList.remove(`dn`);
			compressor.buttons.reset.classList.remove(`dn`);
			fields.compressor.readOnly=true;
			fields.compressor.value=`Original:    ${compressor.original}\n`;
			if(compressor.result.permutation)
				fields.compressor.value+=`Permutation: ${JSON.stringify(compressor.result.permutation)}\n`;
			fields.compressor.value+=`Bytes:       ${compressor.original.length}\nCompressed:  ${compressor.result.string}\n`;
			if(compressor.result.base)
				fields.compressor.value+=`Base:        ${compressor.result.base}\n`;
			if(compressor.result.delimiter)
				fields.compressor.value+=`Delimiter:   ${compressor.result.delimiter}\n`;
			fields.compressor.value+=`Bytes:       ${compressor.result.string.length}`;
			fields.compressor.dispatchEvent(new Event(`input`));
		}
	},
	docs={
		sidebar:I(`docs`),
		init(){
			let 	headings=docs.sidebar.querySelectorAll(`h3`),
				length=headings.length,
				list=E(`ol`),
				heading,item,menu,svg;
			list.classList.add(`pa`);
			list.tabIndex=`-1`;
			for(heading of headings){
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
				heading.style.zIndex=length--;
				item.dataset.for=heading.id;
				list.append(item);
			}
			for(heading of headings){
				menu=list.cloneNode(1);
				menu.querySelector(`[data-for=${heading.id}]`).remove();
				heading.append(menu);
			}
			docs.shortcuts();
		},
		close(event){
			general.close(event,docs.toggle);
		},
		scroll(event){
			if(event.target.dataset.for){
				event.currentTarget.scroll({
					behavior:`smooth`,
					top:I(event.target.dataset.for).parentNode.offsetTop
				});
				event.target.parentNode.blur();
			}
		},
		shortcuts(){
			let 	table=I(`shortcuts`),
				count=0,
				character,row,cell,code,value;
			for(character of shortcuts)
				if(golfables[count]){
					if(row){
						row=row.cloneNode(0);
						cell=cell.cloneNode(0);
						code=code.cloneNode(0)
					}else{
						row=E(`tr`);
						cell=E(`td`);
						code=E(`code`);
						code.classList.add(`dib`,`fwm`,`vam`,`wsnw`);
					}
					code.classList.add(`cp`);
					code.append(T(code.dataset.character=character))
					cell.append(code);
					row.append(cell);
					code=code.cloneNode(0)
					code.classList.remove(`cp`);
					code.removeAttribute(`data-character`);
					code.append(T(golfables[count++].replace(` `,`\u00A0`)))
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
	interpreter={
		decode:text=>atob(text).replace(/\\u[0-9A-Fa-f]{4}/g,chr=>String.fromCodePoint(parseInt(chr.slice(2),16))),
		encode:text=>btoa(text.replace(/./g,chr=>chr.charCodeAt(0)<256?chr:`\\u`+(`00`+chr.charCodeAt(0).toString(16)).slice(-4))),
		init(){
			let params=U.searchParams
			versions.selected=versions.numbers.includes(params.get(`v`))?params.get(`v`):versions.current;
			Q(`title`).firstChild.nodeValue=`Japt v${versions.selected} Interpreter`;
			if(params.get(`flags`))
				fields.flags.value=interpreter.decode(params.get(`flags`));
			if(params.get(`code`)){
				fields.code.value=interpreter.decode(params.get(`code`));
				general.resize(fields.code);
			}
			if(params.get(`input`)){
				fields.input.value=interpreter.decode(params.get(`input`));
				general.resize(fields.input);
			}
			fields.counter.append(T(``));
			fields.timer.append(T(``));
		},
		golf(){
			let 	value=fields.code.value,
				golfed=golfables.reduce((output,string,index)=>output.replace(RegExp(string.replace(/(?=\W)/g,`\\`),`g`),shortcuts[index]),value);
			if(value!==golfed){
				fields.code.select();
				D.execCommand(`insertText`,false,golfed);
				fields.code.dispatchEvent(new Event(`input`));
			}else fields.code.focus();
			fields.code.selectionStart=fields.code.selectionEnd=golfed.length;
		},
		markdown(){
			let markdown=`#[Japt](https://github.com/ETHproductions/japt)`;
			if(versions.selected!==versions.current)
				markdown+=` v`+versions.selected
			if(fields.flags.value)
				markdown+=` [\`${fields.flags.value}\`](https://codegolf.meta.stackexchange.com/a/14339/)`;
			markdown+=`, ${variables.bytes} ${`bytes`.slice(0,variables.bytes!==1?5:4)}\n\n${fields.code.value.replace(/^/gm,`   `)}\n\n[Try it](${interpreter.url()})`;
			return markdown
		},
		run(){
			if(!variables.running&&Japt){
				let input,timer;
				input=fields.input.value;
				if(fields.flags.value)
					input+=`\n`+fields.flags.value;
				variables.running=true;
				B.classList.add(`cw`);
				B.dataset.running=`true`;
				fields.error.parentNode.classList.add(`dn`);
				fields.timer.firstChild.nodeValue=``;
				Japt.run(
					fields.code.value,
					input,
					variables.safemode,
					()=>timer=performance.now(),
					result=>{
						fields.timer.firstChild.nodeValue=((performance.now()-timer)/1e3).toFixed(3)+` seconds`;
						if(Japt.implicit_output){
							Japt.output(result);
							general.resize(fields.output);
						}
						B.dataset.running=`false`;
						B.classList.remove(`cw`);
						variables.running=false;
					},
					err=>{
						Japt.error(err);
						fields.error.parentNode.classList.remove(`dn`);
						B.dataset.running=`false`;
						B.classList.remove(`cw`);
						variables.running=false;
					}
				);
			}
		},
		stop(){
			(Japt.interrupt||Japt.stop)();
		},
		update(){
			let 	code=fields.code.value,
				encoding=`ISO-8859-1`
			fields.transpiled.value=Japt.transpile(code);
			general.resize(fields.transpiled);
			if (/[^\x00-\xff]/.test(code)){
				code=unescape(encodeURI(code));
				encoding=`UTF-8`;
			}
			variables.bytes=code.length;
			fields.counter.firstChild.nodeValue=variables.bytes+` bytes`.slice(0,variables.bytes!==1?6:5)+` (${encoding})`;
		},
		url(version=versions.selected){
			let url=U.protocol+`//${U.hostname+U.pathname}?v=`+version;
			if(fields.flags.value)
				url+=`&flags=`+interpreter.encode(fields.flags.value);
			if(fields.code.value)
				url+=`&code=`+interpreter.encode(fields.code.value);
			if(fields.input.value)
				url+=`&input=`+interpreter.encode(fields.input.value);
			return url;
		}
	},
	keyboard={
		list:Q(`#keyboard>ol`),
		init(){
			let key,li;
			for(key of characters){
				if(li)
					li=li.cloneNode(1);
				else{
					li=E(`li`);
					li.classList.add(`cp`,`df`);
					li.append(T(``));
				}
				li.dataset.character=li.firstChild.nodeValue=key;
				keyboard.list.append(li);
			}
		},
		close(event){
			general.close(event,keyboard.toggle)
		},
		insert(event){
			if(event.target.dataset.character){
				fields.code.focus();
				D.execCommand(`insertText`,false,event.target.dataset.character);
				fields.code.dispatchEvent(new Event(`input`));
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
	versions={
		current:`1.4.6`,
		list:I(`versions`),
		numbers:[`1.4`,`1.4.1`,`1.4.2`,`1.4.3`,`1.4.4`,`1.4.5`,`1.4.6`,`2.0a0`],
		change(version){
			if(version&&version!==versions.selected)
				window.location.href=interpreter.url(version);
		},
		init(){
			let item,menu,svg;
			versions.two=/^2/.test(versions.selected);
			for(version of versions.numbers){
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
				item.classList.toggle(`fwm`,version===versions.current);
				item.dataset.selected=version===versions.selected;
				item.dataset.version=version;
				item.lastChild.nodeValue=`v`+version;
				versions.list.append(item);
			}
		}
	},
	general={
		init(){
			interpreter.init();
			versions.init();
			docs.init();
			keyboard.init();
			general.icons();
			let 	file=`https://cdn.jsdelivr.net/gh/ETHproductions/japt@${versions.selected===versions.current||versions.two?`master`:versions.selected}/src/${versions.two?`japt`:`japt-interpreter`}.js`,
				js=file=>new Promise((resolve,reject)=>{
					let script=E(`script`);
					script.async=true;
					script.src=file;
					B.append(script);
					script.addEventListener(`load`,resolve,{capture:false,once:true});
					script.addEventListener(`error`,reject,{capture:false,once:true});
				});
			js(file).then(()=>{
				Japt.stdout=fields.output;
				Japt.stderr=fields.error;
				if(fields.code.value){
					interpreter.update();
					interpreter.run();
				}
				general.listeners();
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
			fields.clipboard.value=text;
			fields.clipboard.select();
			D.execCommand(`copy`);
		},
		icons(){
			let 	library={
					"alert":`M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z`,
					"arrow-collapse":`M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z`,
					"clipboard-text-outline":`M19,4H14.82C14.25,2.44 12.53,1.64 11,2.2C10.14,2.5 9.5,3.16 9.18,4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M7,8H17V6H19V20H5V6H7V8M17,12H7V10H17V12M15,16H7V14H15V16Z`,
					"dots-vertical":`M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z`,
					"golf":`M19.5,18A1.5,1.5 0 0,1 21,19.5A1.5,1.5 0 0,1 19.5,21A1.5,1.5 0 0,1 18,19.5A1.5,1.5 0 0,1 19.5,18M17,5.92L11,9V18.03C13.84,18.19 16,19 16,20C16,21.1 13.31,22 10,22C6.69,22 4,21.1 4,20C4,19.26 5.21,18.62 7,18.27V20H9V2L17,5.92Z`,
					"forum":`M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z`,
					"help-circle-outline":`M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z`,
					"information":`M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,
					"flag":`M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z`,
					"file-document":`M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z`,
					"github-circle":`M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z`,
					"invert-colors":`M12,19.58V19.58C10.4,19.58 8.89,18.96 7.76,17.83C6.62,16.69 6,15.19 6,13.58C6,12 6.62,10.47 7.76,9.34L12,5.1M17.66,7.93L12,2.27V2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93Z`,
					"keyboard":`M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z`,
					"link-variant":`M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z`,
					"loading":`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,
					"lock":`M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z`,
					"lock-open":`M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z`,
					"menu-down":`M7,10L12,15L17,10H7Z`,
					"play-circle":`M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,
					"shuffle":`M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z`,
					"shuffle-disabled":`M16,4.5V7H5V9H16V11.5L19.5,8M16,12.5V15H5V17H16V19.5L19.5,16`,
					"stop-circle":`M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M9,9H15V15H9`,
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
					path.setAttribute(`d`,library[icon]||library[`help-circle-outline`]);
					svg.append(path);
				}
			}
		},
		listeners(){
			versions.list.addEventListener(`click`,event=>versions.change(event.target.dataset.version),false);
			I(`theme`).addEventListener(`click`,theme,false);
			fields.flags.addEventListener(`focus`,()=>{if(!fields.flags.value)fields.flags.value=`-`;},false);
			fields.flags.addEventListener(`blur`,()=>{if(fields.flags.value===`-`)fields.flags.value=``;},false);
			I(`run`).addEventListener(`click`,()=>!variables.running?interpreter.run():interpreter.stop(),false);
			I(`safemode`).addEventListener(`click`,()=>B.dataset.safemode=(variables.safemode=!variables.safemode),false);
			I(`copy_link`).addEventListener(`click`,()=>general.copy(interpreter.url()),false);
			I(`copy_post`).addEventListener(`click`,()=>general.copy(interpreter.markdown()),false);
			I(`theme`).addEventListener(`click`,general.theme,false);
			I(`golf`).addEventListener(`click`,interpreter.golf,false);
			I(`copy_code`).addEventListener(`click`,()=>general.copy(fields.code.value),false);
			fields.code.addEventListener(`input`,interpreter.update,false);
			fields.input.addEventListener(`input`,()=>general.resize(fields.input),false);
			compressor.buttons.compress.addEventListener(`click`,compressor.compress,false);
			compressor.buttons.permute.addEventListener(`click`,()=>B.dataset.permute=(variables.permute=!variables.permute),false);
			compressor.buttons.copy.addEventListener(`click`,()=>general.copy(compressor.result.string),false);
			compressor.buttons.reset.addEventListener(`click`,compressor.reset,false);
			fields.compressor.addEventListener(`input`,()=>general.resize(fields.compressor),false);
			Q(`#docs>h2`).addEventListener(`click`,docs.toggle,false);
			docs.sidebar.lastElementChild.addEventListener(`click`,docs.scroll,false);
			docs.sidebar.lastElementChild.addEventListener(`click`,keyboard.insert,false);
			Q(`#keyboard>h2`).addEventListener(`click`,keyboard.toggle,false);
			keyboard.list.addEventListener(`click`,keyboard.insert,false);
			D.addEventListener(`scroll`,general.scroll,false);
			W.addEventListener(`resize`,()=>{
				general.resize(fields.code);
				general.resize(fields.transpiled);
				general.resize(fields.input);
				general.resize(fields.output);
				general.resize(fields.compressor);
			},false);
		},
		resize(field){
			fields.clipboard.value=field.value;
			field.style.height=(fields.clipboard.scrollHeight)+`px`;
		},
		scroll(){
			B.dataset.header=(B.scrollTop||H.scrollTop||W.pageYOffset||0)<51;
		},
		theme(){
			B.classList.toggle(`light`);
			B.classList.toggle(`dark`);
			Q(`meta[name=theme-color]`).content=`#${B.classList.contains(`light`)?`fff`:`212121`}`;
		}
	};
general.init();
}