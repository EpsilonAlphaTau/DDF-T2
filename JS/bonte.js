function initBonte(){
	getElt("image").style.backgroundImage = "url(../IMAGES/crypte.png)";	

	innerHtml('intro', "Dès votre arrivée, vous sentez le regard des fortunelles sur vos pas. Elles semblent vous souffler des indices... Elles n'attendent probablement qu'un mot de votre part pour vous mettre dans la bonne direction ou vous perdre...");
	show("reponse");
	getElt("bouton1").value = "Dire quelque chose";
	getElt("bouton1").onclick = () => checkBonte(0);
	getElt("reponse").addEventListener("keypress", function(event) {
	  	var x = getElt("reponse").value;
	    if (event.key === "Enter") {
		  	event.preventDefault();
		    getElt("bouton1").click();
	  	} else {
	  		if (x.length == 4) {
		  		event.preventDefault();
	  			getElt("reponse").value = x.substring(0,4);
	  		}
	  	}
	});
	getElt("reponse").addEventListener("keyup", function(event) {
	  	var x = getElt("reponse").value;
		getElt("reponse").value = x.toUpperCase();
	});
}


var intervalA;
var intervalB;
var tries = 0;
function checkBonte(num) {
	console.log("DOING " + num + " try " + tries);
	tries++;
	if (tries === 100) gotoMessage('presentationBonte', 'Vous vous êtes tellement perdus que vous vous retrouvez au dehors');
	switch(num) {
	case 0 :
		setNewRoom("U2FsdGVkX1+y2eV7A3wxyskdGh/wPfG42r97Pw9Hggs=", 
			"<i>Vous avez raison</i>, dit Sinthor. <i>On dirait qu'il fait nuit !</i> Vous passez l'ouverture et découvrez un tout autre lieu...", num + 1, 
			"U2FsdGVkX1+uD6lKndM4eUT6EQZlTWm0Jdl90e2k9L0=");
		break;
	case 1 :
		setNewRoom("U2FsdGVkX1+hfEBy5XmO3pu2uXA4CmK6NOuTiRLZ+Iw=", 
			"<i>Vous parlez peu, mais à dessein</i>, jugea Sinthor.<i>C'est vraiment impressionnant ! Où allons-nous maintenant ?</i>", num + 1, 
			"U2FsdGVkX1+DjJ98spzEpVYFs5YLW7dCqpkPrUD/rvw=");
		break;
	case 2 :
		setNewRoom("U2FsdGVkX1/bB1NH58l7aq49IMwlDuF6JffXul83WvQ=", 
			"<i>Oui, c'est très beau, mais nous allons finir par nous perdre...</i> ", num + 1, "U2FsdGVkX18KSur11eiwlWA4CsQfBRsv59D8s3PP628=");
		break;
	case 3 :
		setNewRoom("U2FsdGVkX1/eER6KdIjdN20z/bRwuz6OCAV5C4rOA7M=", 
			"<i>Vous voyez des chiffres vous ? Oui... Peut-être... Je ne sais pas lire à vrai dire...</i> ", num + 1, 
			"U2FsdGVkX1/ljAAlPGhkWSCvUlYD9jpw3J7pv5h7Pms=");
		document.getElementById("mainDiv").addEventListener("click", doHide);
		break;
	case 4 :
		getElt("mainDiv").style.height = '20%';
		setNewRoom("U2FsdGVkX19aMIoJUS94jRLozawn0h6j2aZrOqLYI3s=", 
			"<i>Oui, profitons-en ! Il faut descendre ensuite, nous ne sommes plus près de voir la lumière...</i> ", num + 1, 
			"U2FsdGVkX1+M8lKsnqfQqdlvJchaxLlB9a4zaTOkj6E=");
		break;
	case 5 :
		getElt("mainDiv").style.height = '20%';
		
		if (!setNewRoom("U2FsdGVkX1+X79BXG/6ZJTXEGbXUZVKwTNQ00QNMaq4=", 
			"Vous descendez un coridor étroit. Vous voici encore plus enfoncé sous terre... Il y a de nombreux chemins à suivre, et vous n'y voyez plus rien.", num + 1, 
			"U2FsdGVkX18M3JCtyRGKjrLR47IMf9jjuj5g5EQPP5s=")) {
			var rep = getElt("reponse").value.trim().toUpperCase();
			var dec = doDecCheat("U2FsdGVkX1+X79BXG/6ZJTXEGbXUZVKwTNQ00QNMaq4=");
			var res = "";
			for(var i = 0; i < 4 ; i ++){
				if (dec.includes(rep.charAt(i))) res += rep.charAt(i);
			}
			getElt("reponse").value = res;
			return;
		} else {
			intervalA = setInterval(showSecond, 10000);
			innerHtml("secondDiv", doDecCheat("U2FsdGVkX1/CgTvsC6KVVkD/0l+Cc5XGbSnSfKdagsw="));
		}
		break;
	case 6 :
		if (setNewRoom("U2FsdGVkX18I9kF4eEaXk4YZkOWaXzTSK6o66sBY6/8=", 
			"<i>On nous joue un tour, vous croyez ? Moi non plus, je n'ai pas très confiance dans ce clerc...</i> Il fait de plus en plus sombre,"
			+ " et vous avez la sensation que des créatures vous observent silencieusement.", num + 1, 
			"U2FsdGVkX19gSlL+nVAIOouujtDdNSdqqpdw/HLwYMI=")) {
			clearInterval(intervalA);
		}
		break;
	case 7 :
		if (setNewRoom("U2FsdGVkX1+7RERDhs9QTP7ttace2PRE+H6KlteloSw=", 
			"<i>Sombre feux ! Cela fait trois escaliers que nous descendons, et c'est toujours aussi immense !</i> "
			+ "Sinthor et vous demeurez ébahis par les incroyables catacombes. Mais désormais, il va falloir trouver des routes plus secrètes...", num + 1, 
			"U2FsdGVkX1/jnvuLOGkC5cY50y4rzOa32SVKXZuvbo8=")) {
		} 
		break;
	case 8: 
		var rep = getElt("reponse").value.trim().toUpperCase();
		if (rep === doDecCheat("U2FsdGVkX19lFG6uKp9ewYwqdbGdV/+GV7BLZL+jHZY=")) 
			innerHtml('intro', "Je suis sur une piste...");
		if (rep === doDecCheat("U2FsdGVkX18bf6r3CJnKVl/JRx+DmgWUp9I7Pss4v7s="))
			innerHtml('intro', "C'est presque ça... Il doit falloir y enlever des morceaux... Je vois de grandes oreilles...");
		if (setNewRoom("U2FsdGVkX191jAsrdsbUpW1mC41QwZnZKBKbz8kzojA=", 
			"<i>C'est de pire en pire... Où allons-nous ?</i>", num + 1, 
			"U2FsdGVkX1/VaHU2B2ROR90m/QWUKQetA5h/fH9745k=")) {
			hide("reponse");
			hide("bouton1");
			setDirections(["Par la porte","Dans le couloir de gauche","Vers la droite"],[9,10,11]);
		} 
		break;
	case 9:
		setLaby("U2FsdGVkX19Icjte+70wmavJ5ArIakQoAZ76aEa9TSk=");
		setDirections(["Tout droit","A gauche"],[12,14]);
		break;
	case 10:
		setLaby("U2FsdGVkX18U1tcS6HYXzIhlWb+jWOZCbhZMfJWg3HM=");
		setDirections(["Tout droit","Dans le premier passage à droite","Dans le second passage"],[12,15,16]);
		break;
	case 11:
		setLaby("U2FsdGVkX19pap/ev8FF1Of5U3CCJ4IKaQ8max0ExFU=");
		setDirections(["Tout droit","Dans l'ombre à droite","Par les ténèbres à gauche"],[12,13,14]);
		break;
	case 12:
		setLaby("U2FsdGVkX18vXCKJ+BfGc6baJHkUM3EjkiXE07AvaZA=");
		setDirections(["Tout de suite à gauche","Première à droite","Deuxième à droite", "Tout au fond"],[18,21,26, 28]);
		break;
	case 13:
		setLaby("U2FsdGVkX1/4tKUC2aowEnjT9KfhHFfhV7TQvFOGu8E=");
		setDirections(["Sur notre gauche","Derrière les tombeaux","Sur notre droite"],[10,16,17]);
		break;
	case 14:
		setLaby("U2FsdGVkX1/OZ1bAfYIDk3gAexj425/QG1E1nlPMbPQ=");
		setDirections(["Par l'ouverture en face","Par l'ouverture à droite"],[27,28]);
		break;
	case 15:
		setLaby("U2FsdGVkX19zukLIONENt3popPTW3PiX4f2OdVmoK/w=");
		setDirections(["Tout au fond","A gauche","Par l'arche à droite", "Au fond à droite"],[12,31,21,19]);
		break;
	case 16:
		setLaby("U2FsdGVkX1/oMg8X8+I+sEuf+9JKcjVN/wfFJ3+Z97E=");
		setDirections(["Au fond de la caverne","Sur la droite"],[24,30]);
		break;
	case 17:
		setLaby("U2FsdGVkX1/oU0L5YoMGNDwDsmoZG+lq/elQI1c2ccg=");
		setDirections(["Tout droit","Au fond à droite","Tout de suite à droite", "Au fond à gauche"],[18,19,20,21]);
		break;
	case 18:
		setLaby("U2FsdGVkX19agr/n8xLXUC1ca2ctbQvCF29I0+nS4Mc=");
		setDirections(["A gauche","A droite","En face derrière la pierre"],[35,38,41]);
		break;
	case 19:
		setLaby("U2FsdGVkX18tGB3KDBQHMWMwb4TcNaKf9cVcESmjg5o=");
		setDirections(["Au fond sur la gauche","Au fond vers la droite"],[37,40]);
		break;
	case 20:
		setLaby("U2FsdGVkX1+m34U9s/2nWLODe8c9KV7D8JnYEolf1eA=");
		setDirections(["A travers le mur au fond à droite","Derrière le tombeau"],[22,23]);
		break;
	case 21:
		setLaby("U2FsdGVkX19vh8uMMUAPJvwIoc+7Cx+mBQJuSwlDAX8=");
		setDirections(["A gauche","Vers la lumière","Derrière les stèles"],[40,41,46]);
		break;
	case 22:
		setLaby("U2FsdGVkX1/35uZ4rJAB77RRqPigWPuv4nizYMt/ZqE=");
		setDirections(["A gauche","A droite","Tout droit"],[24,25,26]);
		break;
	case 23:
		setLaby("U2FsdGVkX18JTin63yLm8y483C2y11emO04dH2VnQ7g=");
		setDirections(["Par la première porte","La seconde","La troisème", "Monter l'escalier"],[38,45,46,49]);
		break;
	case 24:
		setLaby("U2FsdGVkX1+F+0qY8OoQl05SNFJxxUTF6QU+PXWAERk=");
		setDirections(["Tout droit","Par l'ouverture à gauche"],[42,55]);
		break;
	case 25:
		setLaby("U2FsdGVkX1+O7OkCt8BuS8V+U62HcLTe/it8IioCx5E=");
		setDirections(["Dans la caverne à gauche","Dans le couloir en face","Le long du mur à droite", "Dans le creux devant"],[27,28,29,30]);
		break;
	case 26:
		setLaby("U2FsdGVkX1+1oC5K4zjimSpfMn7yppi6VJntHY9TmMY=");
		setDirections(["Se faufiler dans l'ouverture"],[54]);
		break;
	case 27:
		setLaby("U2FsdGVkX18DK35lMifFEerYUMCyex6NidWPbKHn7yo=");
		setDirections(["A gauche","Par le premier escalier","Par le second", "Par le troisème"],[15,26,51,47]);
		break;
	case 28:
		setLaby("U2FsdGVkX1+/Tnrq+txAgvYO7pkwB3JKCGYCl3djdYA=");
		setDirections(["Esacalader à gauche","Fouiller tout droit","Tenter à droite"],[42,43,54]);
		break;
	case 29:
		setLaby("U2FsdGVkX18CfnOZ3it4wRbQpAHRmzwKkVIbcKFhfMc=");
		setDirections(["Par l'escalier à gauche","Par celui de droite","Sous l'escalier à droite","Par la caverne tout à gauche","Par l'autre caverne"],[31,32,33,34,35]);
		break;
	case 30:
		setLaby("U2FsdGVkX19FWfqwp+TGX1YONVXRUOneXDyrTUXcxtM=");
		setDirections(["Passer la porte"],[35]);
		break;
	case 31:
		setLaby("U2FsdGVkX18BUvdGArT2ojYiQ+KWgK9MMbRSNFC7atw=");
		setDirections(["Aller tout droit","Aller à droite"],[36,42]);
		break;
	case 32:
		setLaby("U2FsdGVkX1/dkIA5EQ9odvygk3i5F1D1d4x+mwWMCUw=");
		setDirections(["Par la première ouverture","La seconde","Par l'escalier", "Par la quatrième ouverture", "Par la dernière"],[23,10,36,41,49]);
		break;
	case 33:
		innerHtml('intro', 'Presque par hasard, vous tombez sur les égarés ! Vous allez pouvoir refaire le chemin inverse...');
		setLaby("U2FsdGVkX18rNIj/fean+PeNgiqlu0u/46CE9KEQ5FI=");
		setDirections(["Sortir des cryptes"],[34]);
		break;
	case 34:
		gotoHidden("templeBonte");
		break;
	case 35:
		setLaby("U2FsdGVkX188SlX8/yu684clELMKzF0KEcyuwKLq7LY=");
		setDirections(["Tout au fond","Par la droite","Par le passage secret à gauche"],[10,26,50]);
		break;
	case 36:
		setLaby("U2FsdGVkX195aaDJaEMXowxHGiyga8msQTTgIXwgfCo=");
		setDirections(["Entrer"],[50]);
		break;
	case 37:
		setLaby("U2FsdGVkX1969AjOscIg0+bO4I8uYleUWUq7ZFiX2hM=");
		setDirections(["L'ouverture de droite","L'ouverture de gauche","L'ouverture en face"],[9,12,48]);
		break;
	case 38:
		setLaby("U2FsdGVkX1+4lKPiQvIz3cWHfrMOZ6FsgGhd/ceHRNA=");
		setDirections(["Tout de suite à gauche","Au fond","Vers la lumière à droite"],[21,27,39]);
		break;
	case 39:
		setLaby("U2FsdGVkX19DZLF+MLG8Db0do2RRO92bpJjU25JpBBI=");
		setDirections(["Vers le fond du trou"],[51]);
		break;
	case 40:
		setLaby("U2FsdGVkX18BQlFSBRNxSE2j/trVB4bG2iWalhEIJnk=");
		setDirections(["Derrière les stèle","Par l'ouverture","En hauteur"],[26,27,42]);
		break;
	case 41:
		setLaby("U2FsdGVkX195utO71EuV8s8uLRsitYFLNItXJcRyBZQ=");
		setDirections(["Derrière la statue","A gauche","A droite"],[31,15,45]);
		break;
	case 42:
		setLaby("U2FsdGVkX1/IM4juxoEKavdvwLGzMCDNW/1Bs6oZX/I=");
		setDirections(["A gauche","Par l'ouverture"],[32,44]);
		break;
	case 43:
		setLaby("U2FsdGVkX19MhzQaKbVgLZLxnhHZJ9VlAMAYaH07qII=");
		setDirections(["Dans le mausolée","Derrière","A droite"],[37,31,19]);
		break;
	case 44:
		setLaby("U2FsdGVkX18RhFTLdHe40+eb1qBAu19hBqIeazyXCag=");
		setDirections(["Tout au fond","Continuer"],[39,32]);
		break;
	case 45:
		setLaby("U2FsdGVkX1+OMKtF5eYv6b2j3Eu1SwTGqNWBle0Vq7g=");
		setDirections(["A travers les arches","Tout droit","A droite"],[40,29,19]);
		break;
	case 46:
		setLaby("U2FsdGVkX1/Lxcn1EGx/HSewkbVqBaRxeITY+PjDmyI=");
		setDirections(["Par l'ouverture à gauche","Vers la droite","Nous montons"],[47,38,32]);
		break;
	case 47:
		setLaby("U2FsdGVkX18lq+VLMJv0PBxmMaUHjf1IjMxPqSK5+fs=");
		setDirections(["Par la gauche","Prendre l'ouverture","Monter l'escalier"],[11,38,35]);
		break;
	case 48:
		setLaby("U2FsdGVkX1/uGlUrswSxGj37UgvF0Qxa0ySk4iDbIvM=");
		setDirections(["Tout droit","Fouiller derrière les colonnes","Examiner en bas"],[36,11,21]);
		break;
	case 49:
		setLaby("U2FsdGVkX1/GVI0VJwbumzwTz2u8Ll183u5Ddk2CVbc=");
		setDirections(["Par le crexu à gauche","Par le creux à droite"],[54,11]);
		break;
	case 50:
		setLaby("U2FsdGVkX1/jc1gwlcl8DqURfcUgX106eYxyBOQ4lXc=");
		setDirections(["Prendre l'ouverture","Se faufiler derrière le monticule","Aller à droite"],[52,40,36]);
		break;
	case 51:
		setLaby("U2FsdGVkX19Oc/rgpnUvezhlk/SAQQ1NrHkZqEngDdA=");
		setDirections(["Fouiller les ténèbres","Prendre le passage dans le creux","Contourner les stèles"],[11,44,44]);
		break;
	case 52:
		setLaby("U2FsdGVkX18MVwT6pLmZdC7jiWYk6oBWf+93jMJwKvU=");
		setDirections(["Prendre l'escalier","Longer le mur à gauche","Prendre le couloir à droite"],[35,11,36]);
		break;
	case 53:
		setLaby("U2FsdGVkX19LGCD/EysZCzkKWD92O5nn7SlWPv+mw3k=");
		setDirections(["Avancer"],[48]);
		break;
	case 54:
		setLaby("U2FsdGVkX18Y3G8CIFHWHraYiodUSniNeaZA+Bk5or8=");
		setDirections(["Monter l'escalier","Passer à gauche","Passer à droite"],[52,44,11]);
		break;
	case 55:
		setLaby("U2FsdGVkX1+krHnjGtDVdhQigiWNqaCsqn5eK7YBnRw=");
		setDirections(["Passer sous l'arche","Tourner à droite"],[35,11]);
		break;
	}
}

function setDirections(texts, targets){
	for(var i = 0; i < texts.length; i++){
		show("direction"+i);
		getElt("direction"+i).value = texts[i];
		setLabyCheck(i, targets[i]);
	}
	for(var i = texts.length; i < 5; i++){	
		hide("direction"+i);
	}  
}

function hideSecond() {
	hide("secondDiv");
}
function showSecond() {
	show("secondDiv");
	intervalB = setTimeout(hideSecond, 1000);
}

function doHide(e) {
    e = window.event || e; 
    if(this === e.target) {
       hideDiv()
    }
}
function hideDiv(){
	getElt("mainDiv").style.height = "50px";
}

function setLaby(image){
	getElt("image").style.backgroundImage = "url(../IMAGES/" + doDecCheat(image) + ".png)";	
}

function setLabyCheck(i, target){
	getElt("direction"+i).onclick = () => checkBonte(target);
}
function setNewRoom(reponseCode, text, target, image){
	if (doDecCheat(reponseCode) == getElt("reponse").value.trim().toUpperCase()) {
		document.getElementById("mainDiv").removeEventListener("click", doHide);
		innerHtml('intro', text);
		getElt("reponse").value = "";
		getElt("bouton1").onclick = () => checkBonte(target);
		getElt("image").style.backgroundImage = "url(../IMAGES/" + doDecCheat(image) + ".png)";	
		console.log("validate to target " + target + " to image " + getElt("image").style.backgroundImage);
		return true;
	}
	return false;
}

