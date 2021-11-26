document.addEventListener("DOMContentLoaded", function (event) {


	/* ----------------------------------------------------*/
	// Animation du nom : code en double car 2 anomations a intervalles de temps differents
	/* ----------------------------------------------------*/

	var lettre1 = ["_", "<br>", "_", "<br>", "_", "<br>", "_", "<br>", "_"];
	//var lettre2 = ["I_", "IT_", "IT _", "IT S_", "IT ST_", "IT STU_", "IT STUD_", "IT STUDE_", "IT STUDEN_", "IT STUDENT"];
	var lettre2 = ["D_", "DE_", "DEV_", "DEVE_", "DEVEL_", "DEVELOP_", "DEVELOPP_", "DEVELOPPE_", "DEVELOPPEU_", "DEVELOPPEUR_", "DEVELOPPEUR _", "DEVELOPPEUR I_", "DEVELOPPEUR IN_", "DEVELOPPEUR INF_", "DEVELOPPEUR INFO_", "DEVELOPPEUR INFOR_", "DEVELOPPEUR INFORM_", "DEVELOPPEUR INFORMA_", "DEVELOPPEUR INFORMAT_", "DEVELOPPEUR INFORMATI_", "DEVELOPPEUR INFORMATIQ_", "DEVELOPPEUR INFORMATIQU_", "DEVELOPPEUR INFORMATIQUE"];
	var lettreI = 0;
	var textAnimation1 = setInterval(animationText1, 175);
	var textAnimation2;
	var titreAnimation = document.querySelector("#titreAnimation");


	function animationText1() {
		titreAnimation.innerHTML = lettre1[lettreI]
		lettreI++;

		if (lettreI >= lettre1.length) {
			clearInterval(textAnimation1);
			textAnimation2 = setInterval(animationText2, 80);
			lettreI = 0;
		}
	}

	function animationText2() {
		titreAnimation.innerHTML = lettre2[lettreI];
		lettreI++;
		//console.log("lettre i : " + lettreI);
		//console.log("lenght tab :" + lettre2.length);

		if (lettreI >= lettre2.length) {
			clearInterval(textAnimation2);
			document.querySelector(".separateur").style.width = "100px";

			setTimeout(function(){
				document.querySelector("#nomprenomheader").style.paddingTop = "25px";
				document.querySelector("#nomprenomheader").style.opacity = "1";
			}, 600);
		}
	}


	var executerAnimationProgressBar = true;
	var executerAnimationTimeline = true;
	var executerAnimationPhoto = true;
	var body = document.querySelector("body");

	var KonamiCode = [{ key: "ArrowUp", bool: false }, { key: "ArrowUp", bool: false }, { key: "ArrowDown", bool: false }, { key: "ArrowDown", bool: false }, { key: "ArrowLeft", bool: false }, { key: "ArrowRight", bool: false }, { key: "ArrowLeft", bool: false }, { key: "ArrowRight", bool: false }, { key: "b", bool: false }, { key: "a", bool: false }];
	var KonamiCodeI = 0;

	var timelineContent = [].slice.call(document.querySelectorAll(".timeline-content"));
	var tabAnimationTimeline = [true, true, true, true, true];


	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION HEADER
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/


	/* ----------------------------------------------------*/
	// lors du scroll : changer opacité menu navigation + animation progressbar + animation timeline
	/* ----------------------------------------------------*/
	window.onscroll = function (e) {
		if (window.pageYOffset > 0)
			document.querySelector("nav").style.opacity = "0.95";
		else
			document.querySelector("nav").style.opacity = "1";

		if (window.pageYOffset >= (document.querySelector('#skills').offsetTop - 500) && executerAnimationProgressBar == true) {
			animationProgressBar();
			executerAnimationProgressBar = false;
		}
		if (window.pageYOffset >= 400 && executerAnimationPhoto == true) {
			document.querySelector("#contentprofile").style.transform = "translate(0px,0px)";
			//animationProfile();
			executerAnimationPhoto = false;
		}
		if(window.pageYOffset >= (document.querySelector('#experiences').offsetTop - 500) && executerAnimationTimeline == true)
		{
			for(i=0;i<timelineContent.length;i++)
			{
				let element = timelineContent[i];
				
				animationTimelineOne(element, document.querySelector('#experiences').offsetTop - 500 + 400*i, i);
				
			}

			//animationTimeline(document.querySelector('#experiences').offsetTop - 500);
			//executerAnimationTimeline = false;
		}

		//console.log(window.pageYOffset);
	}

	/* NAVIGATION BAR RESPONSIF avec menu lateral*/
	var navBarResponsif = document.querySelector("#iconResponsif");
	navBarResponsif.addEventListener("click", function(){

		let nav_ul = document.querySelector("nav ul");
		let nav_ul_li = document.querySelectorAll("nav ul li");
		let nav_ul_li_a = document.querySelectorAll("nav ul li a");

		if(nav_ul.classList[0] == "nav_ul_responsif")
		{
			nav_ul.removeAttribute("class");
			nav_ul_li.forEach(function(element){
				element.className = element.classList[0];
			});
			nav_ul_li_a.forEach(function(element){
				element.className = element.classList[0];
			});
		}
		else
		{
			nav_ul.className += " nav_ul_responsif";
			nav_ul_li.forEach(function(element){
				element.className += " nav_ul_li_responsif";
			});
			nav_ul_li_a.forEach(function(element){
				element.className += " nav_ul_li_a_responsif";
			});
		}

	})



	/* ----------------------------------------------------*/
	// lors d'un click sur le menu de nav : animation/scroll jusqu'a la section voulu
	/* ----------------------------------------------------*/
	var link = document.querySelectorAll("nav > ul > li > a");
	//console.log(link);
	var idlink = ["none", "header", "profile", "experiences", "formation", "skills", "projects", "references"]
	link.forEach(function (element, index) {
		element.addEventListener("click", function () {
			var height = document.querySelector('#' + idlink[index]).offsetTop - document.querySelector("nav").offsetHeight;
			window.scroll({ top: height, behavior: "smooth" })

		});
	});



	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION PROFILE
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/

	/* ----------------------------------------------------*/
	// changement couleur site lors du clic sur image ptofile + animation full drogue lors de 10 click
	/* ----------------------------------------------------*/
	var i = 0;
	var fullDrogue = 0;
	var colorTab = ["#F8A055", "#FA6E59", "#FFDB5C", "#4897D8"];
	var classAfter = ["class1", "class2", "class3", "class4"];
	var headertitre = document.querySelector("#profile img");
	headertitre.addEventListener("click", function () {
		fullDrogue++;
		var oldI = i;
		i++;
		if (i >= colorTab.length)
			i = 0;

		var backgroundColor = document.querySelectorAll(".backgroundColor");
		var colors = document.querySelectorAll(".color");
		var hover = document.querySelectorAll(".hover");
		var border = document.querySelectorAll(".border");
		var after = document.querySelectorAll("nav > ul > li");

		//change couleur timeline
		var styleElem = document.head.appendChild(document.createElement("style"));
		styleElem.innerHTML += ".timeline:before, .timeline:after, .timeline-img {background-color:" + colorTab[i] + ";}";

		backgroundColor.forEach(function (element, index) {
			element.style.backgroundColor = colorTab[i];
		});

		colors.forEach(function (element, index) {
			element.style.color = colorTab[i];
		});

		border.forEach(function (element, index) {
			element.style.borderColor = colorTab[i];
		});

		hover.forEach(function (element, index) {
			element.addEventListener("mouseover", function (event) {
				element.style.color = colorTab[i];
			})
			element.addEventListener("mouseout", function (event) {
				element.style.color = "black";
			})
		});

		after.forEach(function (element, index) {
			element.classList.remove(classAfter[oldI]);
			element.classList.add(classAfter[i]);
		});

		if (fullDrogue >= 10) {
			var divwtf = createDivFixed("divDrogue");

			body.appendChild(divwtf);
			var couleurFlash = ["#FFFFFF", "#FFFF00", "#00FFFF", "#00FE00", "#FF00FE", "#FE0000", "0000FE"];
			var intervallefullDrogue = setInterval(AnimationfullDrogue, 50);
			// objet simple a manipuler dans le contexte actuel
			var j = { index: 0, time: 0 };
			divwtf.style.cursor = "none";
			function AnimationfullDrogue() {
				j.index++;
				if (j.index >= couleurFlash.length) {
					j.index = 0;
					j.time++;
				}
				divwtf.style.backgroundColor = couleurFlash[j.index];
				if (j.time >= 5) {
					clearInterval(intervallefullDrogue);
					body.removeChild(divwtf);
				}
			}

			fullDrogue = 0;

		}
	});

	/* ----------------------------------------------------*/
	// animation photo de profil qui rebond --> a revoir (modifier css en consequence)
	/* ----------------------------------------------------*/
	/*function animationProfile() {
		document.querySelector("#contentprofile").style.transform = "translate(0px,0px)";
		var y = 400;
		var photoDiv = document.querySelector("#photoprofile");
		var experiencesrebond = document.querySelector("#experiences");
		var profilerebond = document.querySelector("#profile");
		console.log(photoDiv);

		var intervallePhotoAnimation = setInterval(AnimationPhotoProfile, 5);
		function AnimationPhotoProfile() {
			//console.log(photoDiv.offsetTop);
			//console.log(photoDiv.offsetTop);
			if(photoDiv.offsetTop >= experiencesrebond.offsetHeight + profilerebond.offsetHeight - document.querySelector("nav").offsetHeight - 100 && y > 0)
			{
				y = -y*0.5;
				nbRebond = 1;
				photoDiv.style.borderRadius = "0px";
			}
			console.log(photoDiv.offsetTop)
			if(photoDiv.offsetTop <= 1125 && y < 0 && nbRebond == 1)
			{
				photoDiv.style.position = "static";
				clearInterval(intervallePhotoAnimation);
			}
			photoDiv.style.top = photoDiv.offsetTop + y + "px";
		}

	}*/

	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION EXPERIENCE
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	// Anime toute les box timeline en mm temps
	// function animationTimeline()
	// {
	// 	var leftitem = document.querySelectorAll(".leftitem");
	// 	var rightitem = document.querySelectorAll(".rightitem");

	// 	leftitem.forEach(function(element){
	// 		element.style.left = "0px";
	// 		element.style.opacity = "1";
	// 	});

	// 	rightitem.forEach(function(element){
	// 		element.style.right = "0px";
	// 		element.style.opacity = "1";
	// 	});
	// }

	function animationTimelineOne(element, scroll, ibool)
	{
		// console.log("bool : "+ bool);
		// console.log("scroll : "+ scroll);
		// console.log("wind : "+ pageYOffset);
		if(window.pageYOffset >= scroll && tabAnimationTimeline[ibool] == true)
		{
			tabAnimationTimeline[ibool] = false;
			element.style.opacity = "1";
			if(element.classList[1] == "leftitem")
				element.style.left = "0px";
			else
			element.style.right = "0px";
		}
	}



	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION EDUCATION
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	var formations = document.querySelectorAll(".uneFormation");
	var detailsFormations = document.querySelectorAll(".detailsFormation");
	formations.forEach(function (element) {
		element.addEventListener("click", function () {
			if (element.id == "") {
				//fait disparaitre tt les details de formation
				detailsFormations.forEach(function (detailsElement) {
					detailsElement.style.display = "none";
				});
				// supprime attribut ancien block formation actif
				formations.forEach(function (foElement) {
					foElement.removeAttribute("id");
				});
				// fait apparaitre celui sur lequel on a cliquer
				let foDetails = detailsFormations[element.getAttribute("idFo")];
				foDetails.style.display = "block";
				// rajoute des attributs au nvo block formation actif
				element.id = "formationActive";

			}
		});
	});





	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION PROGRESSBAR
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/

	/* ----------------------------------------------------*/
	// animation progress Bar + reflet lors du hover
	/* ----------------------------------------------------*/
	function animationProgressBar() {
		var tabElement = document.querySelectorAll(".bar");
		tabElement.forEach(function (element) {
			var width = -1;
			var oui = 0;
			var animationBar1 = setInterval(animation, 10);
			function animation() {
				if (width >= element.getAttribute('levelskill'))
					clearInterval(animationBar1);
				else {
					width++;
					element.style.width = width + "%";
				}
			}

			element.addEventListener("mouseover", function () {
				var reflet = element.querySelector(".effetbar");
				var animationReflet = setInterval(animationReflet, 2);
				function animationReflet() {
					if (reflet.getBoundingClientRect().left >= element.offsetLeft + element.offsetWidth) {
						clearInterval(animationReflet);
						reflet.style.left = -20 + "px";
					}
					else {
						//console.log(reflet.style.left)
						reflet.style.left = reflet.offsetLeft + 5 + "px";
					}
				}
			}, { once: true })
		});
	}


	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION PROJECT
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/

	document.querySelectorAll(".layercontent button").forEach(function (element) {
		//console.log(element);
		if(element.classList[0] != "buttongrise")
		{
			element.addEventListener("click", function () {
				var divVideo = createDivFixed("divVideo");
				divVideo.style.display = "flex";
				divVideo.style.flexDirection = "column";
				divVideo.style.justifyContent = "center;"
				var frame = document.createElement("iframe");
				frame.src = element.getAttribute('urldemo');
				frame.frameBorder = "0";
				frame.allow = "autoplay; encrypted-media";
				frame.allowFullscreen = "true";
				frame.width = "100%";
				frame.height = "100%";
				frame.style.display = "block";
				frame.style.position = "fixed;"
	
				var divContainerFrame = document.createElement("div");
				divContainerFrame.style.width = "50%";
				divContainerFrame.style.height = "50%";
				divContainerFrame.style.margin = "auto";
	
				divVideo.addEventListener("click", function () {
					body.removeChild(divVideo);
				});
	
				body.addEventListener("keydown", function (e) {
					if (e.key == "Escape")
						body.removeChild(divVideo);
				});
	
				// boutton fermer
				var divfermer = document.createElement("div");
				divfermer.id = "btnfermer";
				divfermer.innerHTML = "X";
				divfermer.style.position = "absolute";
				divfermer.style.top = "20px";
				divfermer.style.right = "20px";
	
				divfermer.addEventListener("click", function () {
					divVideo.removeChild(div);
					divVideo.style.overflow = "visible";
				})
	
	
				divVideo.appendChild(divfermer);
				body.appendChild(divVideo).appendChild(divContainerFrame).appendChild(frame);
	
			});
		}
	});



	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													SECTION REFERENCES/CONTACT 
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/



	var errorMail;
	var nbMort = 0;
	var intervalleMort;
	var intervalleClignotant;
	/* ----------------------------------------------------*/
	// AJAX CONTACT FORM
	/* ----------------------------------------------------*/
	document.querySelector("#ContactSubmit").addEventListener("click", function () {
		var name1 = document.querySelector("#ContactNom");
		var email1 = document.querySelector("#ContactMail");
		var message1 = document.querySelector("#ContactMessage");
		//console.log(errorMail);
		if (message1.value.length > 0 && email1.value.length > 0) {
			if (typeof errorMail !== 'undefined' || errorMail !== null) {
				email1.style.border = "1px grey solid";
				message1.style.border = "1px grey solid";
				document.querySelector("#form").removeChild(errorMail);
				errorMail = null;
				//errorMail.parentNode.removeChild(errorMail);
			}
			var divLoadPage = createDivFixed("loadPage");
			var divLoad = document.createElement("div");
			divLoad.setAttribute('class', 'loader');
			body.appendChild(divLoadPage).appendChild(divLoad);
			ajax("js/mail.php", { name: name1.value, email: email1.value, message: message1.value }, function () {
				console.log("b1 envoyé");
				body.removeChild(divLoadPage);
				//name1.value = "";
				//email1.value = "";
				message1.value = "";
			});
		}
		else {
			if (email1.value.length <= 0)
				email1.style.border = "solid 2px red";
			else
				email1.style.border = "1px grey solid";
			if (message1.value.length <= 0)
				message1.style.border = "solid 2px red";
			else
				message1.style.border = "1px grey solid";

			if (typeof errorMail === 'undefined' || errorMail == null) {
				errorMail = document.createElement("p");
				errorMail.innerHTML = "l'email et le message sont obligatoires";
				errorMail.setAttribute('class', 'errorContact');
				document.querySelector("#form").appendChild(errorMail);
			}

			nbMort++;
			if (nbMort == 3) {
				intervalleMort = setInterval(AnimationMort, 50);
			}
		}

	});

	/* ----------------------------------------------------*/
	// ANIMATION TETE DE MORT LORSQUE TROP DE CLIC SUR SUBMIT INVALIDE
	/* ----------------------------------------------------*/
	function AnimationMort() {
		nbMort++;
		let divMort = document.createElement("div");
		let imgMort = document.createElement("img");
		imgMort.src = "images/mort.png";
		divMort.className = "tetemort";
		divMort.style.width = "5%";
		divMort.style.position = "absolute";
		divMort.style.top = Math.floor(Math.random() * Math.floor(body.offsetHeight - 300)) + "px";
		divMort.style.zIndex = "15";
		divMort.style.left = 5 + Math.floor(Math.random() * Math.floor(80)) + "%";
		imgMort.style.width = "100%";
		imgMort.style.height = "auto";
		body.appendChild(divMort).appendChild(imgMort);

		if (nbMort >= 80) {
			clearInterval(intervalleMort);
			let allTeteMort = document.querySelectorAll(".tetemort");
			setTimeout(function () {
				intervalleClignotant = setInterval(function () {
					animationClignotant(allTeteMort)
				}, 100);
				//console.log("wola2" + nbMort);
			}, 4000);
			//console.log("wola3" + nbMort);
		}
	}

	function animationClignotant(tabTeteMort) {
		nbMort++;
		tabTeteMort.forEach(function (element) {
			if (nbMort % 2 == 0)
				element.style.opacity = "0";
			else
				element.style.opacity = "1";
		});

		if (nbMort >= 100) {
			tabTeteMort.forEach(function (element) {
				body.removeChild(element);
			});

			clearInterval(intervalleClignotant);
		}

		//console.log("wola1" + nbMort);
	}


	/* ----------------------------------------------------*/
	// CAROUSEL 				CREDIT : grafikart
	/* ----------------------------------------------------*/
	var carousel = document.querySelector("#carousel1");
	var children = [].slice.call(carousel.children);
	var currentItem = 0;
	var root = document.createElement("div");
	root.setAttribute('class', 'carousel');
	var container = document.createElement("div");
	container.style.width = "200%";
	container.setAttribute('class', 'carousel_container');
	root.appendChild(container);
	carousel.appendChild(root);
	children.forEach(function (element) {
		var item = document.createElement("div");
		item.setAttribute('class', 'carousel_item');
		item.style.width = (1 / 2) * 100 + "%";
		item.appendChild(element);
		container.appendChild(item);
	});
	var nextButton = document.createElement("div");
	nextButton.setAttribute('class', 'carousel_next');
	var prevButton = document.createElement("div");
	prevButton.setAttribute('class', 'carousel_prev');
	root.appendChild(nextButton);
	root.appendChild(prevButton);

	nextButton.addEventListener("click", function () {
		currentItem += 1;
		if (currentItem >= children.length)
			currentItem = 0;
		var translateX = currentItem * -100 / children.length
		container.style.transform = 'translate3d(' + translateX + '%,0,0)';

	});

	prevButton.addEventListener("click", function () {
		currentItem -= 1;
		if (currentItem < 0)
			currentItem = children.length - 1;
		var translateX = currentItem * -100 / children.length
		container.style.transform = 'translate3d(' + translateX + '%,0,0)';
	});



	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/
	//													AUTRE => ANIMATION CACHE ECT ....
	/* -------------------------------------------------------------------------------------------------------------------------------------------------*/


	/* ----------------------------------------------------*/
	// KONAMI CODE ==> supprimer le css puis l'element 
	/* ----------------------------------------------------*/
	body.addEventListener("keydown", function (e) {
		console.log(e);
		if (e.key.toUpperCase() == KonamiCode[KonamiCodeI].key.toUpperCase()) {
			//console.log("hehe");
			KonamiCodeI++;
			if (KonamiCodeI == KonamiCode.length) {
				animationKonamiCode();
				KonamiCodeI = 0;
			}
		}
		else {
			KonamiCodeI = 0;
		}
	})

	/* ----------------------------------------------------*/
	// PACMAN QUI BOUFFE LES ELEMENTS DU SITE
	/* ----------------------------------------------------*/
	function animationKonamiCode() {
		var audio = document.getElementById("myAudio");
		body.style.cursor = "url('images/pacman1.png'), auto";
		window.onclick = e => {
			audio.play();
			body.style.cursor = "url('images/pacman2.png'), url('images/pacman1.png'), auto";
			e.target.setAttribute('disabled', 'disabled');
			/*if (e.target.id == "delete") {
				console.log("remove element");
				e.target.parentNode.removeChild(e.target);
			}
			else {
				e.target.removeAttribute("class");
				e.target.removeAttribute("id");
				if (e.target.tagName != "BODY" && e.target.tagName != "HTML")
					e.target.id = "delete"
			}*/

			console.log("remove element");
			if (e.target.tagName != "BODY" && e.target.tagName != "HTML")
				e.target.parentNode.removeChild(e.target)

			setTimeout(function () {
				body.style.cursor = "url('images/pacman1.png'), auto";
			}, 250);

			setTimeout(function () {
				audio.pause();
			}, 1000);



			//console.log(e.target.tagName);
		}
	}


	// MINI JEUX SI ON CLICK SUR LA BAR FRENCH
	document.querySelector(".minijeux").addEventListener("click", function () {
		animationMiniJeux();
	})

	/* ----------------------------------------------------*/
	// animation mini jeux lorsque toute les bar sont full
	/* ----------------------------------------------------*/
	function animationMiniJeux() {
		body.style.cursor = "crosshair";
		//body.style.overflow = "hidden";
		// fond noir
		var div = createDivFixed("divJeux");

		body.appendChild(div);

		//console.log(window.pageYOffset);
		//console.log(div);

		TabCreationBallon = ["ballon1.png", "ballon2.png", "ballon3.png"];
		TabCreationBallon.forEach(function (element) {
			let ClassName = "ballon";
			var ballon = document.createElement("img");
			ballon.src = "images/" + element;
			ballon.classList.add(ClassName);
			ballon.style.position = "absolute";
			ballon.style.left = 10 + Math.floor(Math.random() * Math.floor(80)) + "%";
			ballon.style.bottom = Math.floor(Math.random() * Math.floor(30)) + "%";
			div.appendChild(ballon);
		});



		TabBallon = div.querySelectorAll(".ballon");
		TabBallon.forEach(function (element) {
			var nbA;
			var intervalNbA = setInterval(function () {
				nbA = Math.floor(Math.random() * Math.floor(100));
			}, 200);

			var intervalBallon = setInterval(animationBallon, 10);
			function animationBallon() {
				//console.log(nbA);
				element.style.top = element.getBoundingClientRect().top - 1 + "px";
				if (nbA >= 50) {
					element.style.left = element.getBoundingClientRect().left + 1 + "px";
					//console.log("oui");
				}
				else {
					element.style.left = element.getBoundingClientRect().left - 1 + "px";
					//console.log("non");
				}

				if (element.getBoundingClientRect().top <= -100) {
					clearInterval(intervalBallon);
					clearInterval(intervalNbA);
					div.removeChild(element);
				}
			}

			element.addEventListener("click", function (e) {
				//console.log(e.clientX);
				var explosion = document.createElement("img");
				explosion.src = "images/explosion.png";
				explosion.style.position = "absolute";
				explosion.style.left = e.clientX - 12 + "px";
				explosion.style.top = e.clientY - 12 + "px";
				//explosion.style.left = element.getBoundingClientRect().left+"px";
				//explosion.style.top =  element.getBoundingClientRect().top+"px";
				div.appendChild(explosion);
				clearInterval(intervalBallon);
			})
		});
	}

	function createDivFixed(idDiv) {
		var div = document.createElement("div");
		div.id = idDiv;
		div.style.position = "fixed";
		div.style.overflow = "auto";
		div.style.top = "0px";
		div.style.left = "0px";
		div.style.height = "100%";
		div.style.width = "100%";
		div.style.backgroundColor = "rgba(0,0,0,0.7)";
		div.style.zIndex = "10";

		return div;
	}



});