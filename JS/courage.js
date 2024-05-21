/********courage***************************************************************************************************/
function initCourage(){
	if (nombreDeVertues() < 5) {
		innerHtml('intro', setAccents("A Sorbotin, l'on vous indique que des rats monstrueux ont été aperçus au sud, aux abords de Chanmaudit. Le clerc qui s'occupe du courage est parti à Porviria réclamer de l'aide. En revanche, celui de la tempérence est présent...<br/><br/><br/> "));
		var elt = getElt('bouton1');
		elt.value = "Passer l'epreuve de temperance";
		elt.onclick = () => goto('presentationTemperance');
	} else {
		innerHtml('intro', setAccents("Le clerc qui s'occupe de l'épreuve du courage est furieux : aucune aide ne viendra de Porviria. Il semble que l'épreuve de courage va consister à l'aider à combattre les rats géants !" 
			+"</br> Cependant, l'épreuve est mortelle ! Si vous perdez ici, la voie des douze vertus sera à reprendre... depuis le début !<br/>"
			+"Vous serez accompagnés par Artholien Finefeuille, aviveur, et Jarroy Marlevue, guérisseur venu de Porviria<br/><br/> "));
		var elt = getElt('bouton1');
		elt.value = "Lancer l'epreuve de courage";
		elt.onclick = () => courage(0);
	}
	var elt = getElt('bouton2');
	elt.value = "Retourner a Luciandath";
	elt.onclick = () => goto('luciandath');
}

function fuirCourage() {
	hide('combat');
	hide('bouton1');
	show('intro');
	innerHtml('intro', setAccents("Malheureusement, les rats géants étaient trop forts... Le clerc vous remercie quand même...<br/><br/><br/> "));
	var elt = getElt('bouton2');
	show('bouton2');
	elt.value = "Retourner a Luciandath";
	elt.onclick = () => goto('luciandath');
}


var animation;
var animationStart;
var animationDepl;
var animationObj;
var animationCount;
var animationDamage;
function getPosition( el ) {
    switch(el) {
    case 'hp1' : return {x : 150, y : 100};
    case 'hp2' : return {x : 350, y : 100};
    case 'hp3' : return {x : 550, y : 100};
    case 'hpe1' : return {x : 130, y : 260};
    case 'hpe2' : return {x : 330, y : 260};
    case 'hpe3' : return {x : 530, y : 260};
    case 'hpe4' : return {x : 130, y : 280};
    case 'hpe5' : return {x : 330, y : 280};
    case 'hpe6' : return {x : 530, y : 280};
    }
}
function animate(imageId, idFrom, idTo, dommage) {
	animationObj = getElt(imageId);
	animationStart = getPosition(idFrom);
	var p2 = getPosition(idTo);
	animationDepl = {x : (p2.x - animationStart.x)/ 50, y : (p2.y - animationStart.y)/ 50 };
	animationCount = 0;
	animationDamage = dommage;
	clearInterval(animation);
	animationObj.style.left = animationStart.x + "px";
	animationObj.style.top = animationStart.y + "px";
	show(imageId);
	animation = setInterval(doAnimate, 5);
}
function doAnimate(p1, depl) {
	animationStart.x += animationDepl.x;
	animationStart.y += animationDepl.y;
	animationObj.style.left = animationStart.x + "px";
	animationObj.style.top = animationStart.y + "px";
	if (animationCount++ == 50) {
		clearInterval(animation);
		animationObj.style.display = "none";
		frapper(animationDamage);
	}
}

var persos = {};

function courage(number, target) {

	var x;
	hide('choix1');
	hide('choix2');
	hide('choix3');
	hide('choix4');
	switch(number) {
	case 0 :
		hide('intro');
		hide('bouton2');
		hasardDiv = getElt('hasard');
		var elt = getElt('bouton1');
		elt.value = "Fuir !";
		elt.onclick = () => fuirCourage();

		persos.expertise = false;
		persos.vitesse = false;

		persos.personnage1 = {};
		persos.personnage2 = {};
		persos.personnage3 = {};

		persos.personnage1.nom = "Barrybole";
		persos.personnage1.hp = 100;
		persos.personnage1.hpMax = 100;
		persos.personnage1.mp = 0;
		persos.personnage1.mpMax = 0;
		persos.personnage1.force = 13;
		persos.personnage1.resistance = 7;
		persos.personnage1.boost = false;
		persos.personnage1.tourboost = 0;
		persos.personnage1.resist = false;
		persos.personnage1.tourresist = 0;
		persos.personnage1.poison = false;
		persos.personnage1.contre = false;
		persos.personnage1.niveau = false;
		persos.personnage1.number = 0;

		persos.personnage2.nom = "Maître Finefeuille";
		persos.personnage2.hp = 110;
		persos.personnage2.hpMax = 110;
		persos.personnage2.mp = 120;
		persos.personnage2.mpMax = 120;
		persos.personnage2.force = 10;
		persos.personnage2.resistance = 8;
		persos.personnage2.boost = false;
		persos.personnage2.tourboost = 0;
		persos.personnage2.resist = false;
		persos.personnage2.tourresist = 0;
		persos.personnage2.poison = false;
		persos.personnage2.number = 1;

		persos.personnage3.nom = "Jarroy";
		persos.personnage3.hp = 70;
		persos.personnage3.hpMax = 70;
		persos.personnage3.mp = 40;
		persos.personnage3.mpMax = 40;
		persos.personnage3.force = 7;
		persos.personnage3.resistance = 5;
		persos.personnage3.boost = false;
		persos.personnage3.tourboost = 0;
		persos.personnage3.resist = false;
		persos.personnage3.tourresist = 0;
		persos.personnage3.poison = false;
		persos.personnage3.abri = false;
		persos.personnage3.number = 2;

		initRats(2, 0);
		displayPersos();
		currentPerso = persos.personnage1;
		getElt("p1").style.fontWeight = 'bolder';
		explique("Dans le marais, un rat vous attaque !<br/>C'est votre tour d'agir");
		choixCourage("Vous frappez", 1, "Vous attendez", 7, null, 0);
		show('combat');
		intervalHasard = setInterval(displayHasard, 200);
		return;
	case 1 : //perso frappe
		viserUnRat();
		return;	
	case 2 :
		frapperUnRat(endTour, currentPerso, persos.rats[target]);
		return;
	case 3: //soigner
		soigner();
		return;
	case 3.1: //soigner
		soignerPerso(target);
		break;
	case 4: //aviver
		aviver();
		break;
	case 5: //new round
		setNewRound();
		break;
	case 6: //un rat frappe
		degatsRat(endTour, currentRat);
		return;
	case 7: //attendre
		break;
	case 8: //augmenter
		augmenter();
		return;
	case 8.1: //augmenter
		augmenterPerso(target);
		break;
	case 9:
		coupsAuHasard();
		coupsAuHasard();
		if (deusEx > 5 || getRandomInt(6) === 0) coupsAuHasard();
		break;
	case 10:
		coupMortel();
		break;
	case 11:
		soignerToutLeMonde();
		break;
	case 12:
		soignerDuPoison();
		break;
	case 13:
		recuperer();
		return;
	case 13.1:
		recuperer2();
		break;
	case 14:
		expertise();
		break;
	case 15:
		vitesse();
		break;
	case 20:
		preparerContreAttaque();
		break;
	case 21:
		faireFuir();
		return;
	case 21.1:
		faireFuir2();
		break;
	case 22 :
		viserUnRat(true);
		return;	
	case 22.1 :
		frapperUnRat(endTour, currentPerso, persos.rats[target], true);
		return;
	case 23:
		seMettreALAbri();
		break;
	case 24:
		antidote();
		break;
	case 25:
		resurect();
		break;
	
	}
	endTour();
}
function endTour(){
	if (currentPerso !== null) {
		if (currentPerso.boost) {
			currentPerso.tourboost ++;
			if (currentPerso.tourboost > 3 && getRandomInt(3) === 0 && !deusHelp(4,3)) {
				explique(currentPerso.nom + " perd le bonus");
				currentPerso.boost = false;
			}
		}
		if (currentPerso.resist) {
			currentPerso.tourresist++;
			if (currentPerso.tourresist > 3 && getRandomInt(3) === 0 && !deusHelp(4,3)) {
				explique(currentPerso.nom + " perd sa résistance");
				currentPerso.resist = false;
			}
		}
		if (currentPerso.poison) {
			explique("Le poison blesse " + currentPerso.nom);
			blesserUnPerso(null, currentPerso, 5 + getRandomInt(5), 'poison');
		}
		currentPerso.hp += 1;
		if (currentPerso.hp > currentPerso.hpMax) currentPerso.hp = currentPerso.hpMax;
		if (currentPerso.number !== 0 && currentPerso.mp < currentPerso.mpMax)
			currentPerso.mp += 1;
		
		
		currentPerso.contre = false;
		currentPerso.abri = false;
		getElt("p" + (currentPerso.number + 1)).style.fontWeight = 'normal';
		currentPerso = null;
		displayPersos();
	}
	if (currentRat !== null) {
		getElt("hpe" + (currentRat.order + 1)).style.fontWeight = 'normal';
		currentRat = null;
		displayPersos();
	}
	
	if (nombreDeRats == 0)
	{
		explique("Il n'y a plus de rats !", "#eba45a");
		choixCourage("Continuer", 5, null, 0 , null, 0);
	} else trouverProchainParticipant();
}

function setNewRound(){
	roundCourage++;
	if (roundCourage === 10) {
		explique("Mais d'autres arrivent !", "#eba45a");
		show('ennemis2');
		getElt("ennemis2").style.width = "100%";
		getElt("ennemis2").style.backgroundColor = "white";
		for(var i=1; i<=16; i++) {
			setRat(20 + i, 4 + getRandomInt(3));
			displayUnRat(persos.rats[20 + i], 10 * i);
			explique("Maître Artholien dit :", "#eba45a");
			explique("Ils arrivent tous !", "#eba45a");
		}	
	} else if (roundCourage == 11) {
		gotoHidden('templeCourage');
	} else {
		explique("Mais d'autres arrivent !", "#eba45a");
	}

	var rats;
	if (roundCourage == 4) {
		explique("Maître Artholien dit :", "#eba45a");
		explique("Si nous tuons les meneurs, les autres fuieront !", "#eba45a");
	}
	switch(roundCourage){
	case 2 : initRats(2, 1); break;
	case 3 : initRats(3, 2); break;
	case 4 : initRats(4, 2); break;
	case 5 : initRats(4, 4); break;
	case 6 : initRats(5, 4); break;
	case 7 : initRats(5, 5); break;
	case 8 : initRats(6, 6); break;
	case 9 : initRats(6, 6); break;
	case 10 : initRats(6, 6); break;
	}

	
	if (persos.personnage1.poison)
		explique("Poison ! Vous ne récupérez pas");
	else
		regagnerVie(persos.personnage1, 10 + getRandomInt(10));

	if (persos.personnage2.hp != 0)
	{
		if (persos.personnage2.poison)
			explique("Poison ! Artholien ne récupére pas");
		else {
			regagnerVie(persos.personnage2, 5 + getRandomInt(10));
			regagnerMagie(persos.personnage2, 3 + getRandomInt(5));
		}
	} else if (deusHelp(7,3)) {
		explique("Artholien reprend le combat");
		regagnerVie(persos.personnage2, 20 + getRandomInt(20));
		regagnerMagie(persos.personnage2, 10 + getRandomInt(5));
	}

	if (persos.personnage3.hp != 0)
	{
		if (persos.personnage3.poison)
			explique("Poison ! Jarroy ne récupére pas");
		else {
			regagnerVie(persos.personnage3, 5 + getRandomInt(10));
			regagnerMagie(persos.personnage3, 3 + getRandomInt(10));
		}
	} else if (deusHelp(7,3)) {
		explique("Jarroy reprend le combat");
		regagnerVie(persos.personnage3, 10 + getRandomInt(20));
		regagnerMagie(persos.personnage3, 3 + getRandomInt(10));
	}
	persos.personnage1.boost = false;
	persos.personnage1.resist = false;
	persos.personnage1.poison = false;
	persos.personnage2.boost = false;
	persos.personnage2.resist = false;
	persos.personnage2.poison = false;
	persos.personnage3.boost = false;
	persos.personnage3.resist = false;
	persos.personnage3.poison = false;
	
	persos.expertise = false;
	persos.vitesse = false;

	displayPersos();
	tourOrdrePerso = -1;
	setNewOrder();

}

function deusHelp(min, sur) {
	var x = deusEx > min && getRandomInt(sur) === 0;
	return x;
}

function estLeChef(rat) {
	if (rat.added) return false;
	if (roundCourage < 5) return false;
	if (deusEx > 6 && getRandomInt(3) === 0) return true;
	if (nombreDeRats > 2) return false;
	if (roundCourage == 10 && nombreDeRats < 4) return true;
	return getRandomInt(10) === 0;
}

function setNewOrder(){
	if (persos.vitesse || deusHelp(5,4)) 
		ordrePersos = getRandomSortArray([-1, -2, -3]).concat(getRandomSortArray([0,1,2,3,4,5]));
	else 
		ordrePersos = getRandomSortArray(ordrePersos);
	tourOrdrePerso = 0;
}

function trouverProchainParticipant(){
	tourOrdrePerso++;
	if (tourOrdrePerso === ordrePersos.length) 
		setNewOrder();
		
	var x = getRandomInt(roundCourage);
	if (x < 4) showInline('bouton1');
	else hide('bouton1');
		
	var x = ordrePersos[tourOrdrePerso];
	if (x < 0) {
		if (x === -1) {
			getElt("p1").style.fontWeight = 'bolder';
			choixPerso1();
		}
		else if (x === -2 && persos.personnage2.hp > 0) {
			getElt("p2").style.fontWeight = 'bolder';
			choixPerso2();
		}
		else if (x === -3 && persos.personnage3.hp > 0) {
			getElt("p3").style.fontWeight = 'bolder';
			choixPerso3();
		}
		else trouverProchainParticipant();
	} else {
		if (!estMort(persos.rats[x]))
		{
			getElt("hpe" + (persos.rats[x].order + 1)).style.fontWeight = 'bolder';
			combatRat(x);
		}	
		else 
			trouverProchainParticipant();
	}
}


function regagnerVie(perso, quantite){
	if (deusHelp(6,3))
		quantite += 15;

	if (quantite > perso.hpMax - perso.hp)
		quantite = perso.hpMax - perso.hp;
	if (quantite > 0)
		explique(perso.nom + " récupère " + quantite + " pv", "lightblue");
	
	perso.hp += quantite;
}
function regagnerMagie(perso, quantite){
	if (deusHelp(6,3))
		quantite += 5;

	perso.mp += quantite;
	if (perso.mp > perso.mpMax)
		perso.mp = perso.mpMax;
}

function personnage(target){
	switch(target) {
	case 0 : return persos.personnage1;
	case 1 : return persos.personnage2;
	case 2 : return persos.personnage3;
	}
}

function allPersosHave(func) {
	if (!func(persos.personnage1)) return false;
	if (!func(persos.personnage2)) return false;
	if (!func(persos.personnage3)) return false;
	return true;
}









function choixPerso1() {
	currentPerso = persos.personnage1;
	explique("Que faites-vous ?");
	var base = { text : "Vous frappez", target : 1};
	var items = [];
	if (currentPerso.hp < currentPerso.hpMax / 3)
		items.push({ text : "Vous recuperez", target : 13});
	if (getRandomInt(4) === 0 && nombreDeRats > 1)
		items.push({ text : "Coups au hasard", target : 9});
	items.push({ text : "Preparer contre-attaque", target : 20});
	items.push({ text : "Effrayer les rats", target : 21});
	items.push({ text : "Viser les pattes", target : 22});
	setChoixCourageFrom(base, items);
}

function choixPerso2() {
	currentPerso = persos.personnage2;
	explique("Que fait Artholien ?");
	var base = { text : "Artholien frappe", target : 1};
	var items = [];
	if (currentPerso.hp < currentPerso.hpMax / 3)
		items.push({ text : "Artholien recupere", target : 13});
	if (persos.personnage2.mp > 5){
		if (!allPersosHave((p) => p.resist))
			items.push({ text : "Artholien augmente", target : 8});
		if (getRandomInt(3) === 0)
			items.push({ text : "Tenter coup mortel", target : 10});
		if (getRandomInt(3) === 0 && !persos.vitesse)
			items.push({ text : "Initiative", target : 15});
	} 
	if (persos.personnage2.mp > 10 && !allPersosHave((p) => p.boost))
		items.push({ text : "Artholien avive", target : 4});
	items.push({ text : "Effrayer les rats", target : 21});
	
	setChoixCourageFrom(base, items); 	
}

function choixPerso3() {
	currentPerso = persos.personnage3;
	explique("Que fait Jarroy ?");
	var base = { text : "Jarroy frappe", target : 1};
	var items = [];
	if (currentPerso.hp < currentPerso.hpMax / 3)
		items.push({ text : "Jarroy recupere", target : 13});
	if (!persos.expertise && getRandomInt(3) === 0)
		items.push({ text : "Expertise", target : 14});
	if (persos.personnage3.mp > 2){
		if (!allPersosHave((p) => !p.poison))
			items.push({ text : "Jarroy guerit du poison", target : 12});
	}
	if (persos.personnage3.mp > 5){
		if (!allPersosHave((p) => p.hp > p.hpMax - 30))
			items.push({ text : "Jarroy soigne", target : 3});
	} 
	if (persos.personnage3.mp > 13) {
		if (!allPersosHave((p) => p.hp > 0))
			items.push({ text : "Redonner vigueur", target : 25});
	}
	if (persos.personnage3.mp > 15) {
		if (allPersosHave((p) => p.hp < p.hpMax - 30))
			items.push({ text : "Jarroy soigne tout le monde", target : 11});
	}
	if (currentPerso.poison)
		items.push({ text : "Utiliser un antidote", target : 24});
	items.push({ text : "Il se met a l'abri", target : 23});
	setChoixCourageFrom(base, items); 
}

function setChoixCourageFrom(item, items) {
	if (items.length > 3) {
		items = getRandomSortArray(items);
	}
	if (items.length > 2)
		choixCourage(item.text, item.target, 
			items[0].text, items[0].target, 
			items[1].text, items[1].target, 
			items[2].text, items[2].target);
	else if (items.length > 1)
		choixCourage(item.text, item.target, 
			items[0].text, items[0].target, 
			items[1].text, items[1].target);
	else if (items.length > 0)
		choixCourage(item.text, item.target, 
			items[0].text, items[0].target, 
			null, 0);
	else 
		choixCourage(item.text, item.target, 
			null, 0, 
			null, 0);
}
function soigner(){
	explique("Qui soigne-t-il ?");
	setToHasard();
	waitClickPerso(3.1);
}
function soignerPerso(target){
	getHasard();
	persos.personnage3.mp -= 5;
	var p = personnage(target);
	var x = 40 + randomVariable * 3;
	explique(p.nom + " regagne "+x+" pv !");
	regagnerVie(p, x);
	displayPersos();
}
function soignerToutLeMonde() {
	persos.personnage3.mp -= 15;
	var x = 40;
	if (deusHelp(7,2))
		x = 100;
	explique(persos.personnage1.nom + " regagne "+x+" pv !");
	regagnerVie(persos.personnage1, x);

	if (persos.personnage2.hp > 0) {
		explique(persos.personnage2.nom + " regagne "+x+" pv !");
		regagnerVie(persos.personnage2, x);
	}
	
	explique(persos.personnage3.nom + " regagne "+x+" pv !");
	regagnerVie(persos.personnage3, x);
	displayPersos();
}
function soignerDuPoison(){
	if (persos.personnage1.poison) {
	 	if (getRandomInt(4) !== 0 || deusHelp(5,3)) {
			explique("Vous êtes guéri du poison", 'lightblue');
			persos.personnage1.poison = false;
		} else {
			explique("Le poison résiste !", '#ff86ad');
		}
	}
	if (persos.personnage2.poison) {
	 	if (getRandomInt(4) !== 0 || deusHelp(5,3)) {
			explique("Artholien est guéri du poison", 'lightblue');
			persos.personnage2.poison = false;
		} else {
			explique("Le poison résiste !", '#ff86ad');
		}
	}
	if (persos.personnage3.poison) {
	 	if (getRandomInt(6) !== 0 || deusHelp(5,3)) {
			explique("Jarroy est guéri du poison", 'lightblue');
			persos.personnage3.poison = false;
		} else {
			explique("Le poison résiste !", '#ff86ad');
		}
	}
	persos.personnage3.mp -= 2;
	displayPersos();
}
function recuperer(){
	setToHasard();
	choixCourage("Continuer", 13.1, null, 0, null, 0);
}
function recuperer2(){
	getHasard();
	if (deusHelp(7,2)) {	
		setHasardTo(9);
		regagnerVie(currentPerso, 40);
	}else 
		regagnerVie(currentPerso, 20 + 2 * randomVariable);
	displayPersos();
}

function expertise() {
	explique("Jarroy vous donne des astuces", 'lightblue');
	persos.expertise = true;
}
function vitesse() {
	explique("Vous attaquerez les premiers !", 'lightblue');
	persos.vitesse = true;
}
function preparerContreAttaque() {
	currentPerso.contre = true;
}
function faireFuir() {
	setToHasard();
	choixCourage("Continuer", 21.1, null, 0, null, 0);
}
function faireFuir2() {
	getHasard();
	var ok = false;
	switch(currentPerso.number) {
	case 0 : ok = randomVariable > 7; break;
	case 1 : ok = randomVariable > 6; break;
	case 2 : ok = randomVariable > 8; break;
	}
	explique(currentPerso.nom + " s'écrit : BOUH !");
	if (ok) {
		for(var i = 0; i <6; i++) {
			if (!estMort(persos.rats[i])) {
				explique(persos.rats[i].nom + " a peur et s'enfuit", 'lightblue');
				persos.rats[i].hp = 0;
				nombreDeRats--;
				if (getRandomInt(4) !== 0) break;
			}
		}
		displayPersos();
	} else {
		explique("Aucun rat ne fuit");
	}
}
function seMettreALAbri() {
	currentPerso.abri = true;
	explique("Jarroy se place à l'arrière");
}
function antidote() {
	currentPerso.poison = false;
	explique("Le poison est guéri", 'lightblue');
	displayPersos();

}
function resurect() {
	currentPerso.mp -= 13;
	persos.personnage2.hp = persos.personnage2.hpMax;
	explique("Artholien est soigné !", 'lightblue');
	displayPersos();
}
function augmenter(){
	explique("Qui augmente-t-il ?");
	setToHasard();
	waitClickPerso(8.1);
}
function augmenterPerso(target){
	getHasard();
	persos.personnage2.mp -= 5;
	var p = personnage(target);
	p.resist = true;
	p.tourresist = 0;
	explique(p.nom + " est devenu plus résistant !");
	displayPerso(target + 1, p);
}
function aviver(){
	explique("Les personnages sont avivés !");
	persos.personnage2.mp -= 10;
	persos.personnage1.boost = true;
	persos.personnage2.boost = true;
	persos.personnage3.boost = true;
	persos.personnage1.tourboost = 0;
	persos.personnage2.tourboost = 0;
	persos.personnage3.tourboost = 0;
	displayPersos();
}



function continuer() {
	choixCourage("Continuer", 7, null, 0, null, 0);
}





var currentRat = null;
var currentPerso = null;
var targetPerso;
var deusEx = 0;
function combatRat(number) {
	currentRat = persos.rats[number];
	if (currentRat.actions === '') {
		ratAttaque();
		return;
	}
	var x = currentRat.actions + '0';
	switch(x.charAt(getRandomInt(x.length))){
	case '0': ratAttaque(); return;
	case '1': empoisonne(); return;
	case '2': if (getRandomInt(3) === 0) appelle(); else ratAttaque(); return;
	case '3': appelleCompere(); return;
	case '4': berserk(); return;
	default: ratAttaque(); return;
	}
}
function berserk(){
	explique(currentRat.nom + " s'énerve !", 'lightblue');
	currentRat.force += 10;
	currentRat.nom += '*';
	continuer();
}
function appelle(){
	explique(currentRat.nom + " appelle des renforts");
	for(var i = 0; i<6; i++) {
		if (persos.rats[i].hp <= 0) {
			setRat(i, 0);
			persos.rats[i].added = true;
		}
	}
	nombreDeRats = 6;
	displayPersos();
	continuer();
}
function appelleCompere(){
	explique(currentRat.nom + " appelle un compère");
	for(var i = 0; i<6; i++) {
		if (persos.rats[i].hp <= 0) {
			if (getRandomInt(10) === 0 && !deusHelp(8,2))
			{
				setRat(i, currentRat.numero);
				persos.rats[i].added = true;
				nombreDeRats++;
			}	
			else
				explique("Aucun ne vient");
			break;
		}
	}
	displayPersos();
	continuer();
}
function getRandomPerso(){
	var x = [0];
	if (persos.personnage2.hp > 0 && (persos.personnage2.hp > 30 || getRandomInt(3) === 0))
		x.push(1);
	if (persos.personnage3.hp > 0 && !persos.personnage3.abri  && (persos.personnage3.hp > 30 || getRandomInt(3) === 0))
		x.push(2);
	x = getRandomSortArray(x);
	if (x[0] == 0 && x.length > 1 && deusHelp(8,2))
		return personnage(x[1]);
	return personnage(x[0]);
}
function empoisonne() {
	targetPerso = getRandomPerso();
	explique(currentRat.nom + ' mord ' + targetPerso.nom);
	explique(targetPerso.nom + " est empoisonné !", 'red');
	targetPerso.poison = true;
	animate('animage2', 'hpe' + (currentRat.order + 1), 'hp' + (targetPerso.number+1), 10);
	//displayPersos();
	continuer();
}
function ratAttaque() {
	targetPerso = getRandomPerso();
	explique(currentRat.nom + " va griffer..." + targetPerso.nom + "!");
	setToHasard();
	choixCourage("Continuer", 6, null, 0, null, 0);
}
function degatsRat(callback, rat) {
	getHasard();
	var dommage = rat.force + randomVariable;
	frappeDeRat(callback, rat, targetPerso, dommage);
}
function persoContreAttaque() {
	return getRandomInt(10) === 0;
}


function doTimeDelay2(func, callback, perso, rat, dommage){
	setTimeout(function() { func(callback, rat, perso, dommage); }, 600);	
}
function frappeDeRat(callback, rat, perso, dommage){
	switch(perso.number) {
	case 0:
		var x = getRandomInt(6);
		if (perso.contre || x === 0 || deusHelp(8,2))  {
			explique("Vous évitez le coup !", 'lightblue');
		} else {
			blesserUnPerso(rat, perso, dommage, 'coup');			
		}
		break;
	case 1:
		var x = getRandomInt(10);
		if (x === 0 || deusHelp(8,5)) {
			explique("Maître Finefeuille évite le coup !", 'lightblue');		
		}	
		else 
			blesserUnPerso(rat, perso, dommage, 'coup');
		break;
	case 2:
		var x = getRandomInt(3);
		if (x === 0 || deusHelp(8,3))  {
			explique("Jarroy évite le coup !", 'lightblue');
		} else 
			blesserUnPerso(rat, perso, dommage, 'coup');
		break;
	}
	doTimeDelay2(frappeDeRat2, callback, perso, rat, dommage);
}
function frappeDeRat2(callback, rat, perso, dommage){
	if (perso.contre || persoContreAttaque()) {
		perso.contre = false;
		explique(perso.nom + " contre-attaque !", 'lightblue');
		blesserUnRat(perso, rat, perso.force + 10);
	}
	callback();	
}

function setHasardTo(number) {
	innerHtml('hasard', number); 
	randomVariable = number;
}
function deusExMachina(dommage){
	deusEx++;
	console.log('deusExMachina' + deusEx);
	persos.personnage1.poison = false;
	switch(deusEx) {
	case 1: explique("Vous évitez le coup !", 'lightblue'); return 0;
	case 2: explique("Vous évitez le coup !", 'lightblue'); return 0;
	case 3: setHasardTo(0); return hpPart(dommage);
	case 4: explique("Vous évitez le coup !", 'lightblue'); return 0;
	case 5: setHasardTo(0); return hpPart(dommage);
	case 6: setHasardTo(0); return hpPart(dommage);
	case 7: explique("Vous évitez le coup !", 'lightblue'); return 0;
	case 8: explique("Vous évitez le coup !", 'lightblue'); return 0;
	case 9: 
		persos.personnage1.niveau = true;
		explique("Vous gagnez un niveau !", "lightblue");
		persos.personnage1.hpMax = 120;
		persos.personnage1.hp = 60;
		persos.personnage1.force += 4;
		persos.personnage1.resistance += 6;
		return 0;
	case 10: explique("Vous évitez le coup !", 'lightblue'); return 0;
	case 11: setHasardTo(0); return hpPart(dommage);
	case 12:
		explique("A l'aide de ses dernières forces","#eba45a");
		explique("Jarroy vous rend vos pv","#eba45a");
		persos.personnage1.hp = 120;
		break;
	case 13: return 0;
	case 14: return 0;
	case 15: explique("Vous évitez le coup !", 'lightblue'); return 0;
	default: gotoMessage('presentationCourage', "A bout de force, vous parvenez a fuir jusqu'au village...");
	}
}
function hpPart(dommage) {
	if (persos.personnage1.hp > 10) return getRandomInt(10);
	if (persos.personnage1.hp === 1) {
		explique("Vous évitez le coup !", 'lightblue'); 
		return 0;
	}
	return persos.personnage1.hp - getRandomInt(persos.personnage1.hp);
}
function calculerDegatsFrappe(rat, pattes){
	var x;
	if (currentPerso.boost)
		x = currentPerso.force + 4 * randomVariable - rat.resistance;
	else
		x = currentPerso.force + 2 * randomVariable - rat.resistance;
	if (getRandomInt(10) === 0) {
		explique("Coup surpuissant !!!", 'lightblue');
		if (deusEx > 5)
			x = 3 * x;
		else 
			x = 2 * x;
	}
	if (pattes !== undefined)
	{
		x -= 5;
		if (x < 0) x = 1;
	}	
	return x;
}

function ratEviteAttaque(rat) {
	if (rat.numero === 4) return getRandomInt(3) === 0;
	return getRandomInt(8) === 0;
}
function ratContreAttaque(rat) {
	return getRandomInt(8) === 0;
}
function estMort(rat) {
	return rat.hp <= 0;
}
function viserUnRat(pattes){
	setToHasard();
	//choixCourage(null, 0 , null, 0 , null, 0);
	explique("Quel rat ?");
	if (pattes === undefined)
		waitClickRat(2);
	else waitClickRat(22.1);
}


function doTimeDelay(func, callback, perso, rat, pattes){
	setTimeout(function() { func(callback, perso, rat, pattes); }, 600);	
}
function frapperUnRat(callback, perso, rat, pattes){
	getHasard();
	//var rat = persos.rats[target];
	var x = calculerDegatsFrappe(rat, pattes);
	if (ratEviteAttaque(rat))
	{
		explique("Le rat évite l'attaque !", '#ff86ad');
		x = 0;
	}
	blesserUnRat(perso, rat, x, pattes);
	doTimeDelay(frapperUnRat2, callback, perso, rat, pattes);
}
function frapperUnRat2(callback, perso, rat, pattes){

	if (!estMort(rat) && (getRandomInt(12) === 0 ||  deusHelp(6,4)))
	{
		explique("Deuxième attaque !", 'lightblue');
		x = calculerDegatsFrappe(rat);
		if (ratEviteAttaque(rat))
		{
			explique("Le rat évite l'attaque !", '#ff86ad');
			x = 0;
		}
		blesserUnRat(perso, rat, x);
		doTimeDelay(frapperUnRat3, callback, perso, rat, pattes);
	}
	else doTimeDelay(frapperUnRat4, callback, perso, rat, pattes);
}
function frapperUnRat3(callback, perso, rat, pattes){

	if (!estMort(rat) && (getRandomInt(12) === 0 ||  deusHelp(6,4)))
	{
		explique("Troisème attaque !", 'lightblue');
		x = calculerDegatsFrappe(rat);
		if (ratEviteAttaque(rat))
		{
			explique("Le rat évite l'attaque !", '#ff86ad');
			x = 0;
		}
		blesserUnRat(perso, rat, x);
	} 
	doTimeDelay(frapperUnRat4, callback, perso, rat, pattes);
}
function frapperUnRat4(callback, perso, rat, pattes){
	if (!estMort(rat) && ratContreAttaque(rat)) {
		explique("Le rat contre-attaque !", "red");
		frappeDeRat(callback, rat, perso, 5 + getRandomInt(15));
	} 
	else callback();
}



function ratAuHasard() {
	if (nombreDeRats === 0) return 0;
	var x = getRandomInt(6);
	while(persos.rats[x].hp <= 0) {
		x = getRandomInt(6);
	}
	return persos.rats[x];
}
function coupsAuHasard() {
	if (nombreDeRats === 0) return;
	var rat = ratAuHasard();
	explique("Vous frappez " + rat.nom);
	blesserUnRat(persos.personnage1, rat, persos.personnage1.force - 5);
}

function coupMortel() {
	if (nombreDeRats === 0) return;
	var rat = ratAuHasard();
	persos.personnage2.mp -= 5;
	explique("Artholien frappe " + rat.nom);
	if (getRandomInt(2) === 0 || deusHelp(6,2)) 
		blesserUnRat(persos.personnage2, rat, rat.hp);
	else
		explique(rat.nom + " évite le coup !", '#ff86ad');
	//continuer();
}

function blesserUnRat(perso, rat, dommage, pattes) {

	if (dommage > 40)
		animate('animage3', 'hp' + (perso.number+1), 'hpe' + (rat.order + 1), dommage);
	else if (dommage > 0)
		animate('animage1', 'hp' + (perso.number+1), 'hpe' + (rat.order + 1), dommage);

	if (pattes !== undefined) {
		explique('Le rat est affaibli', 'lightblue');
		rat.force -= 5;
		if (rat.force < 1) 
			rat.force = 1;
	}
	if (dommage < 1) {
		explique('Aucun dommage', '#ff86ad');
		return;
	}
	//if (debug) dommage = rat.hp;
	explique('Le rat perd ' + dommage + ' pv', 'lightblue');
	rat.hp -= dommage;
	//displayPersos();
	//frapper(dommage);
	if (rat.hp <= 0) {
		rat.hp = 0;
		nombreDeRats--;
		explique("Le rat s'effondre sans vie...", 'lightblue');
		if (estLeChef(rat)) {
			for(var i = 0; i< 6; i++) 
				persos.rats[i].hp = 0;
			nombreDeRats = 0;
			explique("Vous avez tué le meneur ! les autres rats s'enfuient");
			hide("ennemis2");
			displayPersos();
		}
	} 
}
function blesserUnPerso(rat, perso, dommage, type){
	if (rat !== null && dommage > 0)
		animate('animage2', 'hpe' + (rat.order + 1), 'hp' + (perso.number+1), dommage);

	if (perso.number === 0 &&  dommage >= perso.hp) {
		dommage = deusExMachina(dommage);
	} 
	if (dommage >= perso.hp && getRandomInt(3) === 0) {
		dommage = perso.hp - 1;
	}
	perso.hp -= dommage;
	explique(dommage + " points de dommage !", 'red');
	if (perso.hp <= 0) {
		perso.hp = 0;
		explique(perso.nom + " est épuisé !!!!!!", 'red');
	}
	//displayPersos();
	//if (dommage > 0) frapper(dommage);
}











var roundCourage = 1;
var waitingClickRat = -1;
var waitingClickPerso = -1;
var ordrePersos = [-1, -2, -3, 0, 1, 2, 3, 4, 5];
var tourOrdrePerso = 0;
var intervalHasard;


function waitClickRat(retour){
	choixCourage(null, 0 , null, 0 , null, 0);
	waitingClickRat = retour;
}
function waitClickPerso(retour){
	choixCourage(null, 0 , null, 0 , null, 0);
	waitingClickPerso = retour;
}
function clickRat(number){
	if (waitingClickRat === -1) return;
	var x = waitingClickRat;
	waitingClickRat = -1;
	courage(x, number - 1);
}
function clickPerso(number){
	if (waitingClickPerso === -1) return;
	if (personnage(number - 1).hp <= 0) return;
	var x = waitingClickPerso;
	waitingClickPerso = -1;
	courage(x, number - 1);
}
function clickHasard(){

}


var randomVariable;
var shuffle = false;
var hasardDiv;

function setToHasard() {
	shuffle = true;
}
function displayHasard() {
	if (shuffle) {
		randomVariable = getRandomInt(9);
		hasardDiv.innerHTML = randomVariable;
	} 
}
function getHasard(){
	shuffle = false;
	if (deusHelp(4,2))
		setHasardTo(9);
}



/*demo();
function demo(){
	explique('etape 1')
	.then(() => {
		explique('etape 2')
		.then(() => {
			explique('etape 3')
		});
	});
}*/


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function explique(text, col){
	var elt = getElt('explication');
	if (elt.innerHTML.trim().length !== 0) {
		var idx = elt.innerHTML.indexOf("</div>");
		elt.innerHTML = elt.innerHTML.substring(idx + 6);
	}
	if (col !== undefined) 
		elt.innerHTML += "<div style='background-color:"+col+"'>" + setAccents(text) + "</div>";
	else 
		elt.innerHTML += "<div>" + setAccents(text) + "</div>";
	elt.scrollTop = elt.scrollHeight;
}
async function choixCourage(text1, choix1, text2, choix2, text3, choix3, text4, choix4) {
	hide('choix1');
	hide('choix2');
	hide('choix3');
	hide('choix4');
	
	if (text1 !== null) {
		var elt = getElt('choix1');
		elt.style.display = "inline-block";
		elt.value = setAccents(text1);
		elt.onclick = () => courage(choix1, 0);
	}
	if (text2 !== null) {
		var elt = getElt('choix2');
		elt.style.display = "inline-block";
		elt.value = setAccents(text2);
		elt.onclick = () => courage(choix2, 0);
	}
	if (text3 !== null)  {
		var elt = getElt('choix3');
		elt.style.display = "inline-block";
		elt.value = setAccents(text3);
		elt.onclick = () => courage(choix3, 0);
	}
	if (text4 !== undefined)  {
		var elt = getElt('choix4');
		elt.style.display = "inline-block";
		elt.value = setAccents(text4);
		elt.onclick = () => courage(choix4, 0);
	}
}

var nombreDeRats;
function initRats(nombre, maxType){
	nombreDeRats = nombre;
	persos.rats = [];
	for (var i = 0; i < 6; i++) {
		if (i < nombre) {
			setRat(i, getRandomInt(maxType))
		} else {
			persos.rats[i] = {};
			persos.rats[i].hp = 0;
		}
	}
}
function setRat(i, number){
	persos.rats[i] = {};
	switch(number) {
	case 0: 
		persos.rats[i].hp = persos.rats[i].hpMax = 20;
		persos.rats[i].nom = 'Grand Rat';
		persos.rats[i].force = 10;
		persos.rats[i].resistance = 0;
		persos.rats[i].actions = '';
		break;
	case 1: 
		persos.rats[i].hp = persos.rats[i].hpMax = 30;
		persos.rats[i].nom = 'Grand rat gris';
		persos.rats[i].force = 10;
		persos.rats[i].resistance = 5;
		persos.rats[i].actions = '14';
		break;
	case 2: 
		persos.rats[i].hp = persos.rats[i].hpMax = 40;
		persos.rats[i].nom = 'Rate Sale';
		persos.rats[i].force = 15;
		persos.rats[i].resistance = 6;
		persos.rats[i].actions = '4';
		break;
	case 3: 
		persos.rats[i].hp = persos.rats[i].hpMax = 40;
		persos.rats[i].nom = 'Rat Musclé';
		persos.rats[i].force = 25;
		persos.rats[i].resistance = 10;
		persos.rats[i].actions = '23';
		break;
	case 4: 
		persos.rats[i].hp = persos.rats[i].hpMax = 50;
		persos.rats[i].nom = 'Rat Bruyant';
		persos.rats[i].force = 12;
		persos.rats[i].resistance = 3;
		persos.rats[i].actions = '13';
		break;
	case 5: 
		persos.rats[i].hp = persos.rats[i].hpMax = 50;
		persos.rats[i].nom = 'Rat du Marais';
		persos.rats[i].force = 20;
		persos.rats[i].resistance = 10;
		persos.rats[i].actions = '1';
		break;
	case 6: 
		persos.rats[i].hp = persos.rats[i].hpMax = 80;
		persos.rats[i].nom = 'Rat Géant';
		persos.rats[i].force = 6;
		persos.rats[i].resistance = 6;
		persos.rats[i].actions = '1234';
		break;
	}
	persos.rats[i].numero = number;
	persos.rats[i].order = i;
	persos.rats[i].added = false;
}
function displayPersos() {
	displayPerso(1, persos.personnage1);
	displayPerso(2, persos.personnage2);
	displayPerso(3, persos.personnage3);
	for (var i = 0; i < 6; i++) {
		displayRat(i);
	}
}
function displayPerso(number, perso){
	var elt = getElt('hp' + number);
	elt.innerHTML = 'HP : ' + perso.hp;
	var x = Math.round(perso.hp / perso.hpMax * 100);
	elt.style.background = "linear-gradient(to right, lightgreen "+x+"%, red "+x+"%)";
	elt.style.width = perso.hpMax + 'px';

	var elt = getElt('mp' + number);
	elt.innerHTML = 'Ma : ' + perso.mp;
	if (perso.mpMax === 0) {
		elt.style.background = "linear-gradient(to right, white 100%, white 0%)";;
	} else {
		var x = perso.mpMax === 0 ? 0 : Math.round(perso.mp / perso.mpMax * 100);
		elt.style.background = "linear-gradient(to right, lightgreen "+x+"%, red "+x+"%)";
	}
	elt.style.width = perso.mpMax + 'px';

	if (perso.boost) showInline('boost' + number);
	else hide('boost' + number);
	if (perso.resist) showInline('boucl' + number);
	else hide('boucl' + number);
	if (perso.poison) showInline('poison' + number);
	else hide('poison' + number);
}
function displayRat(number){
	var rat = persos.rats[number];
	displayUnRat(rat, number);
}
function displayUnRat(rat, number){
	if (rat.hp <= 0) {
		hide('hpe' + (number + 1));
		return;
	}
	var elt = getElt('hpe' + (number + 1));
	var html = setAccents(rat.nom);
	elt.style.display = "block";
	if (persos.expertise) {
		if (rat.force > 15) 
			elt.style.color = 'red';
		else if (rat.force > 15) 
			elt.style.color = '#ff86ad';
		html += " (" + getOrder(rat.order) + ")";
	}
	elt.innerHTML = html;
	elt.style.width = rat.hpMax + 'px';
	var x = Math.round(rat.hp / rat.hpMax * 100);
	elt.style.background = "linear-gradient(to right, lightgreen "+x+"%, red "+x+"%)";
}
function getOrder(order) {
	var x = 0;
	while (ordrePersos[x] !== order) x++;
	return x + 1;
	
}

var animationFrappe;
var animationCourage;
function frapper(dommages) {
	clearInterval(animationCourage);
	animationFrappe = 0;
	animationCourage = setInterval(function() { animationFrapper(dommages);}, 80);
}
function animationFrapper(dommages) {
	var elt = getElt('mainDiv');
	var plus;
	var x = Math.round(dommages /2);
	if (x > 15) x = 15;
	switch(animationFrappe % 2) {
	case 0 : plus = 5 + x; break;
	case 2 : plus = 0; break;
	case 1 : plus = - 5 - x; break;
	}
	
	elt.style.top = '' + plus + 'px';
	if (animationFrappe > 5)
	{
		clearInterval(animationCourage);
		displayPersos();
	}	
	animationFrappe++;
}