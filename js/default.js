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
		docs=I(`docs`),
		keyboard=Q(`#keyboard>ol`),
		buttons={
			code:I(`copy_code`),
			link:I(`copy_link`),
			post:I(`copy_post`),
			run:I(`run`),
			safemode:I(`safemode`)
		},
		fields={
			clipboard:I(`clipboard`),
			code:I(`code`),
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
			running:false,
			safemode:false
		},
		version={
			current:`1.4.6`,
			numbers:[`1.4`,`1.4.1`,`1.4.2`,`1.4.3`,`1.4.4`,`1.4.5`,`1.4.6`,`2.0a0`]
		},
		charmap=()=>{
			let 	characters="$[]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûü",
				key,li;
			for(key of characters){
				if(li)
					li=li.cloneNode(1);
				else{
					li=E(`li`);
					li.classList.add(`cp`,`df`);
					li.append(T(``));
				}
				li.dataset.character=li.firstChild.nodeValue=key;
				keyboard.append(li);
			}
		},
		close=(event,fn)=>{
			if(event.keyCode===27){
				fn();
				event.stopPropagation();
			}
		},
		closedocs=event=>close(event,toggledocs),
		closekeyboard=event=>close(event,togglekeyboard),
		copy=async(text)=>{
			try{
				await navigator.clipboard.writeText(text);
			}catch(err){
				fields.clipboard.value=text;
				fields.clipboard.select();
				D.execCommand(`copy`);
			}
		},
		decode=text=>atob(text).replace(/\\u[0-9A-Fa-f]{4}/g,chr=>String.fromCodePoint(parseInt(chr.slice(2),16))),
		encode=text=>btoa(text.replace(/./g,chr=>chr.charCodeAt(0)<256?chr:`\\u`+(`00`+chr.charCodeAt(0).toString(16)).slice(-4))),
		icons=()=>{
			let 	library={
					"alert":`M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z`,
					"dots-vertical":`M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z`,
					"forum":`M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z`,
					"help-circle-outline":`M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z`,
					"information":`M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z`,
					"flag":`M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z`,
					"file-document":`M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z`,
					"github-circle":`M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z`,
					"keyboard":`M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z`,
					"link-variant":`M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z`,
					"loading":`M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z`,
					"lock":`M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z`,
					"lock-open":`M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z`,
					"markdown":`M2,16V8H4L7,11L10,8H12V16H10V10.83L7,13.83L4,10.83V16H2M16,8H19V12H21.5L17.5,16.5L13.5,12H16V8Z`,
					"menu-down":`M7,10L12,15L17,10H7Z`,
					"play":`M8,5.14V19.14L19,12.14L8,5.14Z`,
					"stop":`M18,18H6V6H18V18Z`,
					"xml":`M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z`
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
		init=()=>{
			setup();
			menus();
			icons();
			charmap();
			let file=`https://cdn.jsdelivr.net/gh/ETHproductions/japt@${version.selected===version.current||version.two?`master`:version.selected}/src/${version.two?`japt`:`japt-interpreter`}.js`;
			js(file).then(()=>{
				Japt.stdout=fields.output;
				Japt.stderr=fields.error;
				update(fields.code,fields.transpiled,fields.input);
				listeners();
			}).catch(err=>console.error(`Failed to load interpreter:`,err));
			js(`https://www.googletagmanager.com/gtag/js?id=UA-135737580-1`).then(()=>{
				W.dataLayer=W.dataLayer||[];
				gtag=(...args)=>W.dataLayer.push(args);
				gtag(`js`,new Date());
				gtag(`config`,`UA-135737580-1`);
			});
		},
		js=file=>new Promise((resolve,reject)=>{
			let script=E(`script`);
			script.async=true;
			script.src=file;
			B.append(script);
			script.addEventListener(`load`,resolve,{capture:false,once:true});
			script.addEventListener(`error`,reject,{capture:false,once:true});
		}),
		jump=event=>{
			if(event.target.dataset.for){
				event.currentTarget.scroll({
					behavior:`smooth`,
					top:I(event.target.dataset.for).parentNode.offsetTop
				});
				event.target.parentNode.blur();
			}
		},
		listeners=()=>{
			buttons.code.addEventListener(`click`,()=>copy(fields.code.value),false);
			buttons.link.addEventListener(`click`,()=>copy(url()),false);
			buttons.post.addEventListener(`click`,()=>copy(markdown()),false);
			buttons.run.addEventListener(`click`,()=>!variables.running?run():stop(),false);
			buttons.safemode.addEventListener(`click`,()=>B.dataset.safemode=(variables.safemode=!variables.safemode).toString(),false);
			fields.code.addEventListener(`input`,()=>update(fields.code,fields.transpiled),false);
			fields.flags.addEventListener(`blur`,()=>{if(fields.flags.value===`-`)fields.flags.value=``;},false);
			fields.flags.addEventListener(`focus`,()=>{if(!fields.flags.value)fields.flags.value=`-`;},false);
			fields.input.addEventListener(`input`,()=>resize([fields.input]),false);
			docs.lastElementChild.addEventListener(`click`,jump,false);
			Q(`#docs>h2`).addEventListener(`click`,toggledocs,false);
			Q(`#keyboard>h2`).addEventListener(`click`,togglekeyboard,false);
			W.addEventListener(`resize`,()=>resize([fields.code,fields.transpiled,fields.input,fields.output]),false);
		},
		markdown=()=>{
			let output=`#[Japt](https://github.com/ETHproductions/japt)`;
			if(version.selected!==version.current)
				output+=` v`+version.selected
			if(fields.flags.value)
				output+=` [\`${fields.flags.value}\`](https://codegolf.meta.stackexchange.com/a/14339/)`;
			output+=`, ${variables.bytes} ${`bytes`.slice(0,variables.bytes!==1?5:4)}\n\n${fields.code.value.replace(/^/gm,`   `)}\n\n[Try it](${url()})`;
			return output
		},
		menus=()=>{
			let 	headings=docs.querySelectorAll(`h3`),
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
		},
		resize=nodes=>{
			for(let field of nodes){
				fields.clipboard.value=field.value;
				field.style.height=(fields.clipboard.scrollHeight)+`px`;
			}
		},
		run=()=>{
			if(!variables.running&&Japt){
				let input,timer;
				input=fields.input.value;
				if(fields.flags.value)
					input+=`\n`+fields.flags.value;
				variables.running=true;
				B.classList.add(`cw`);
				B.dataset.running=`true`;
				fields.error.parentNode.classList.add(`dn`);
				Japt.run(
					fields.code.value,
					input,
					variables.safemode,
					()=>timer=performance.now(),
					result=>{
						fields.timer.firstChild.nodeValue=((performance.now()-timer)/1e3).toFixed(3)+` seconds`;
						if(Japt.implicit_output){
							Japt.output(result);
							resize([fields.output]);
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
		setup=()=>{
			let params=U.searchParams
			version.selected=version.numbers.includes(params.get(`v`))?params.get(`v`):version.current;
			Q(`title`).firstChild.nodeValue=`Japt v${version.selected} Interpreter`;
			version.two=/^2/.test(version.selected);
			if(params.get(`flags`))
				fields.flags.value=decode(params.get(`flags`));
			if(params.get(`code`))
				fields.code.value=decode(params.get(`code`));
			if(params.get(`input`))
				fields.input.value=decode(params.get(`input`));
			fields.counter.append(T(``));
			fields.timer.append(T(``));
		},
		stop=()=>(Japt.interrupt||Japt.stop)(),
		toggledocs=()=>{
			let open=docs.dataset.open===`false`;
			docs.dataset.open=open.toString();
			if(open)
				B.addEventListener(`keydown`,closedocs,false);
			else B.removeEventListener(`keydown`,closedocs);
		},
		togglekeyboard=()=>{
			let open=B.dataset.keyboard===`false`;
			B.dataset.keyboard=open.toString();
			if(open)
				B.addEventListener(`keydown`,closekeyboard,false);
			else B.removeEventListener(`keydown`,closekeyboard);
		},
		update=(...nodes)=>{
			let 	code=fields.code.value,
				encoding=`ISO-8859-1`
			fields.transpiled.value=Japt.transpile(code);
			resize(nodes);
			if (/[^\x00-\xff]/.test(code)){
				code=unescape(encodeURI(code));
				encoding=`UTF-8`;
			}
			variables.bytes=code.length;
			fields.counter.firstChild.nodeValue=variables.bytes+` bytes`.slice(0,variables.bytes!==1?6:5)+` (${encoding})`;
		},
		url=()=>{
			let link=U.protocol+`//${U.hostname+U.pathname}?v=`+version.selected;
			if(fields.flags.value)
				link+=`&flags=`+encode(fields.flags.value);
			if(fields.code.value)
				link+=`&code=`+encode(fields.code.value);
			if(fields.input.value)
				link+=`&input=`+encode(fields.input.value);
			return link;
		};
	init();
}