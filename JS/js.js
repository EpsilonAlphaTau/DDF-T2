
var encrypter;
var debug = false;
function doEnc(item) {
	var encrypted = CryptoJS.AES.encrypt(item, encrypter);
	return encrypted.toString();
}
function doDec(item) {
	var decrypted = CryptoJS.AES.decrypt(item, encrypter);
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function doEncCheat(item) {
	var encrypted = CryptoJS.AES.encrypt(item, 'dontcheatplease!');
	return encrypted.toString();
}
function doDecCheat(item) {
	var decrypted = CryptoJS.AES.decrypt(item, 'dontcheatplease!');
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function encryptArea(){
	getElt('ta2').value = Translate(getElt('ta1').value.trim());
	getElt('ta3').value = Decrypt(getElt('ta2').value.trim());
}
function decryptArea(){
	getElt('ta3').value = Decrypt(getElt('ta2').value);
}
function decryptHtml(id, html){
	innerHtml(id, doDecCheat(html));
}
function decryptBody(){
	//console.log(getElt('body').innerHTML);
	getElt('body').innerHTML = Decrypt(getElt('body').innerHTML);
	//console.log(getElt('body').innerHTML);
}
function encoreInner(id){
	hide(id);
	innerHtml(id, doEncCheat(getElt(id).innerHTML.trim()));
}
function decodeInner(id){
	innerHtml(id, doDecCheat(getElt(id).innerHTML));
	show(id);
}



function doMix(s, v)
{
    var t = "";
    var i;
    //console.log(s + '-----' + v);
    for (i = 0; i + 2*v < s.length; i += 2*v)
    {
    	//console.log('avant ' + t);
        t += s.substring(i + v, i + 2*v) + s.substring(i, i+v);
        //console.log('apres ' + t);
    }
    return t + s.substring(i);
}
function Translate(plainText)
{
    var s = "";
    for(i = 0; i < plainText.length; i++)
    //foreach (char c in plainText)
    {
        s = plainText[i] + s;
    }
    s = doMix(s, 2);
    s = doMix(s, 3);
    return doMix(s, 5);
}
function Decrypt(s)
{
    var t = doMix(s.trim().replaceAll('@', '<').replaceAll('$', '>').replaceAll('_', ' '), 5);
    t = doMix(t, 3);
    t = doMix(t, 2);
    var res = "";
    for(i = 0; i < t.length; i++)
    {
        res = t[i] + res;
    }
    //foreach (char c in t)
    //{
    //    res = c + res;
    //}

    return res;
}




function doGetCodeFor(item)
{
	var encrypted = doEncCheat(item);
	console.log("case '" + item + "': break;//" + encrypted.toString());
	return encrypted.toString();
}

function getScreen(toCheck) {
	console.info("E" + screen.width + '' + screen.height + '' + screen.pixelDepth + '' + window.navigator.appVersion);
	encrypter = CryptoJS.AES.encrypt(screen.width + '' + screen.height + '' + screen.pixelDepth + '' + window.navigator.appVersion, 'dhmis');
	encrypter = encrypter.toString().substring(0,5);
	try {
		readDataCode();
		if (debug !== true && toCheck !== undefined && toCheck !== gotoCode) {
			innerHtml('mainDiv','');
			console.log('forbidden ' + toCheck + '<>' + gotoCode);
			return;
		}
		gotoCode = '';
		if (message !== '') {
			displayMessage();
		}
	} catch (error) {
		innerHtml('mainDiv','');
	}
}
function displayMessage() {
	innerHtml('messageDiv', message);
	show('messageDiv');
	message = '';
}
function hideMessage(){
	hide('messageDiv');
}
function getElt(id){
	return document.getElementById(id);
}
function innerHtml(id, html) {
	document.getElementById(id).innerHTML = html;
}
function hide(id){
	document.getElementById(id).style.display = 'none';
}
function show(id){
	document.getElementById(id).style.display = 'block';
}
function showInline(id){
	document.getElementById(id).style.display = 'inline-block';
}
function goto(page){
	window.location = './'+page+'.html?id='+getDataCode();
}
function gotoHidden(page){
	gotoCode = page;
	goto(page);
}
function gotoMessage(page, m){
	message = m;
	gotoCode = page;
	goto(page);
}
function getBack() {
	gotoHidden(gotoCode);
}
function getRandomInt(max) {
  	return Math.floor(Math.random() * max);
}
function timeOut(time, func, value){
	return setTimeout(() => func(value), time);
}
function getRandomSortArray(arr){
	return arr.sort((a, b) => 0.5 - Math.random());
}
function dblog(text){
	if (true)
		console.log(text);
}
function setStr(str, char, pos){
	return str.substring(0, pos) + char + str.substring(pos + 1);
}
function setAccents(text) {
	return text.replaceAll('é', '&eacute;').replaceAll('è', '&egrave;').replaceAll('ç', '&ccedil;')
		.replaceAll('à', '&agrave;').replaceAll('î', '&icirc;').replaceAll('ê', '&ecirc;');
}



var separator = '/';
var message = '';
var gotoCode = '';
var epreuvesReussies = '000000000000';
var preEpreuvesReussies = '000000000000';
var lastEpreuve;
var specialEvent = 0; //1 force
var monnaieSud = 60;
function getDataCode() {
	var toEncrypt = message 
	+ separator + gotoCode
	+ separator + epreuvesReussies
	+ separator + lastEpreuve
	+ separator + specialEvent
	+ separator + monnaieSud
	+ separator + preEpreuvesReussies
	;
	return doEnc(toEncrypt);;
}
function readDataCode(){
	var queryString = window.location.search;
	if (queryString.length > 0)
	{
		queryString = queryString.substring(4);
		var decrypted = doDec(queryString, encrypter);
		decrypted = decrypted.split(separator);
		console.log(decrypted);
		message = decrypted[0];
		gotoCode = decrypted[1];
		epreuvesReussies = decrypted[2];
		lastEpreuve = decrypted[3];
		specialEvent = decrypted[4];
		monnaieSud = parseInt(decrypted[5]);
		preEpreuvesReussies = decrypted[6];
	}
}

function removeEpreuve(which) {
	var x = epreuvesReussies; x='000100000000'
	console.log('=>' + x);
	switch(which) {
	case 'discernement': epreuvesReussies = setStr(epreuvesReussies, '0', 0); break;
	case 'savoir': epreuvesReussies = setStr(epreuvesReussies, '0', 1); break;
	case 'honnetete': epreuvesReussies = setStr(epreuvesReussies, '0', 2); break;
	case 'temperance': epreuvesReussies = setStr(epreuvesReussies, '0', 3); break;
	case 'force': epreuvesReussies = setStr(epreuvesReussies, '0', 4); break;
	case 'courage': epreuvesReussies = setStr(epreuvesReussies, '0', 5); break;
	case 'bonte': epreuvesReussies = setStr(epreuvesReussies, '0', 6); break;
	case 'humilite': epreuvesReussies = setStr(epreuvesReussies, '0', 7); break;
	case 'charite': epreuvesReussies = setStr(epreuvesReussies, '0', 8); break;
	case 'esperance': epreuvesReussies = setStr(epreuvesReussies, '0', 9); break;
	case 'altruisme': epreuvesReussies = setStr(epreuvesReussies, '0', 10); break;
	case 'prudence': epreuvesReussies = setStr(epreuvesReussies, '0', 11); break;
	}
	console.log(x);
	console.log(epreuvesReussies);
	if (x !== epreuvesReussies)
		message += 'Vous avez perdu votre marqueur de : ' + which + '<br/>';
}



/*********************************************************************************/


function myTimer() {
	var elt = getElt("image");
  	elt.style.opacity -= '-0.05';
  	if (elt.style.opacity === '1')
  		window.clearInterval();
}

function updateEpreuve(){
	getElt("image").style.opacity = '0.2';
	setInterval(myTimer, 200);

	console.info(epreuvesReussies);
	console.info(lastEpreuve);
	if (12 - nombreDeVertues() === 0) {
		hide('mainD');
		show('finD');
		getElt('bfin').onclick = () => gotoHidden('t2ee');
		return;
	} else {
		hide('finD');
	}
	innerHtml('nombre', 12 - nombreDeVertues());
	var ep;
	switch(lastEpreuve){
	case '0':ep=' du discernement ';break;
	case '1':ep=' du savoir ';break;
	case '2':ep=" de l'honnêteté ";break;
	case '3':ep=' de la tempérance ';break;
	case '4':ep=' de la force ';break;
	case '5':ep=' du courage ';break;
	case '6':ep=' de la bonté ';break;
	case '7':ep=" de l'humilité ";break;
	case '8':ep=' de la charité ';break;
	case '9':ep=" de l'espérance ";break;
	case '10':ep=" de l'altruisme ";break;
	case '11':ep=' de la prudence ';break;
	}
	innerHtml('epreuve', ep);
	lastEpreuve = -1;
}
function suivante() {
	if (epreuvesReussies === '111111111111') gotoHidden('t2ee');
	for(var i = lastEpreuve; ; i++){
		if (i === 12) i = 0;
		if (epreuvesReussies.charAt(i) === '0') break;
	}
	switch(i) {
	case 0:ep='presentationDiscernement';break;
	case 1:ep='presentationSavoir';break;
	case 2:ep="presentationHonnetete";break;
	case 3:ep='presentationTemperance';break;
	case 4:ep='presentationForce';break;
	case 5:ep='presentationCourage';break;
	case 6:ep='presentationBonte';break;
	case 7:ep="presentationHumilite";break;
	case 8:ep='presentationCharite';break;
	case 9:ep="presentationEsperance";break;
	case 10:ep="presentationAltruisme";break;
	case 11:ep='presentationPrudence';break;
	}
	goto(ep);
}

function luciandath(){
	goto('luciandath');
}
function colorButtons(){
	if (specialEvent === '1') {
		innerHtml('messageDiv',"Escorté par plusieurs solides soldats, on vous ramène à proximité de Luciandath...");
		specialEvent = '2';
	} else if (specialEvent === '2') {
		specialEvent = '0';
	} else {
		for(var i = 1; i <= 12; i++){
			if (epreuvesReussies.charAt(i - 1) === '1')
				getElt('but' + i).style.backgroundColor = 'lightgreen';
		}
	}
	if (monnaieSud < 60) monnaieSud = 60;
}

function nombreDeVertues(){
	var cnt = 0;
	for(var i = 0; i < 12; i++)
		if (epreuvesReussies.charAt(i) === '1') cnt++;
	return cnt;	
}

/*************questions*******************************************/
function restartQuestions(){
	hide('question2');
	hide('question3');
	hide('question4');
	show('question1');
}

var questionRound = 1;
var questionNext = '';
function runOk() {
	 if (questionRound === 4) {
		hideMessage();
		gotoHidden(questionNext);
	} else {
		hideMessage();
		hide('question' + questionRound);
		questionRound++;
		show('question' + questionRound);
		
		console.log(questionNext + questionRound);
		if (questionNext === 'finalSavoir' && questionRound === 4) {
			timeOut(10000, show, 'hiddenResp');
		}
	}
}
function runBad(){
	gotoMessage(gotoCode, "Ce n'est pas la bonne réponse. Vous devez étudier encore!");
}
function updateReponses() {
	var elts = document.getElementsByClassName('reponse');
	for (var i = 0; i < elts.length; i++) {
		elts[i].onclick = () => runBad();
	}
	elts = document.getElementsByClassName('reponse1');
	var bad = 0;
	for (var i = 0; i < elts.length; i++) {
		elts[i].onclick = () => runOk();
	}
	for (var i = elts.length - 1; i >= 0 ; i--) {
		elts[i].className = 'reponse';
	}
	
}
function getNumberFromEpreuve(epreuve){
	switch(epreuve) {
	case 'discernement': return 0;
	case 'savoir': return 1;
	case 'honnetete': return 2;
	case 'temperance': return 3;
	case 'force': return 4;
	case 'courage': return 5;
	case 'bonte': return 6;
	case 'humilite': return 7;
	case 'charite': return 8;
	case 'esperance': return 9;
	case 'altruisme': return 10;
	case 'prudence': return 11;
	default:alert('oups2');
	}
}
function setShortCut(epreuve) {
	console.log(preEpreuvesReussies);
	if (preEpreuvesReussies.charAt(getNumberFromEpreuve(epreuve)) === '1') {
		show("shortcut");
		getElt("shortcut").onclick = () => gotoHidden('temple' + epreuve[0].toUpperCase() + epreuve.slice(1) );
	}
}
function setQuestionForm(next, code){
	preEpreuvesReussies = setStr(preEpreuvesReussies, '1', getNumberFromEpreuve(code.substring(6).toLowerCase()));
	questionNext = next;
	gotoCode = code;
	updateReponses();
	restartQuestions();
}


/*********choix*************************************************************/

function setBgColor(num){
	if (getElt('choix' + num).checked) {
		getElt('image').style.opacity -= 0.1;
	} else {
		getElt('image').style.opacity -= '-0.1';
	}
}

function validerChoix() {
	var s = '';
	for(var i = 1; i < 9; i++) {
		if (getElt('choix' + i).checked) s+='1';
		else s+='0';
	}
	console.info(doEncCheat(s));
	if (s === doDecCheat(goodAnswer)){
		epreuvesReussies = setStr(epreuvesReussies, '1', lastEpreuve);
		gotoHidden('reussite');
	} else {
		if (!debug) goto('echec');
	}
}
function setEpreuve(epreuve){
	lastEpreuve = epreuve;
	switch(epreuve) {
		case 0 :goodAnswer = 'U2FsdGVkX19fb2gnSv6nX2HX+GMGLyaV+/FLCELITkc=';break;
		case 1 :goodAnswer = 'U2FsdGVkX1/KGJYWYsqhLGhTzD5KeFFPlyi4bo0KEHE=';break;
		case 2 :goodAnswer = 'U2FsdGVkX19WdfqoWtVTARwTHCX5dt8ctkUDQBtxmbk=';break;
		case 3 :goodAnswer = 'U2FsdGVkX18gL9OlNlgSSvfwhYv1f60my6fdzOFJmXU=';break;
		case 4 :goodAnswer = 'U2FsdGVkX18+u4JwiJBapNNWNSLlmquiIcsynIAyCKg=';break;
		case 5 :goodAnswer = 'U2FsdGVkX1//78FbfHdUCh59qje00m3z51OPhbdkTWw=';break;
		case 6 :goodAnswer = 'U2FsdGVkX181cmhazvQ0xZnmtRhDjIhAZxRkmMyx7ws=';break;
		case 7 :goodAnswer = 'U2FsdGVkX1/asr9sDvqLBE2Cbw9sbJoKTxH4g23CqUA=';break;
		case 8 :goodAnswer = 'U2FsdGVkX1+Dy9XxTdLl7Wqr1QTjP3lTsfTTKuTW5tQ=';break;
		case 9 :goodAnswer = 'U2FsdGVkX1+EinpDKDJ5V290Sv7qLKNMKsawagrOJwo=';break;
		case 10 :goodAnswer = 'U2FsdGVkX180+klD3BGUAL26VD3hDr52WJekUvSPXko=';break;
		case 11 :goodAnswer = 'U2FsdGVkX184XbNmSXn+7BAtIgzcb7UsjbdMs4VynQU=';break;
	}
}


var goodAnswer;
var round = 1;
/************discernement************************************************/

function discernement(resp) {
	if (resp === goodAnswer) {
		if (round === 10) gotoHidden('templeDiscernement')
		hide('boutons' + round);
		round ++;
		if (round === 10) {
			switch(getRandomInt(3)){
				case 0:
					setDiscVar('var1', 'rouge', 'red', 'green', 1);
					setDiscVar('var2', 'vert', 'blue', 'red', 2);
					setDiscVar('var3', 'rouge', 'black', 'red', 2);
				break;
				case 1:
					setDiscVar('var1', 'bleu', 'green', 'red', 2);
					setDiscVar('var2', 'jaune', 'yellow', 'blue', 1);
					setDiscVar('var3', 'vert', 'black', 'white', 2);
				break;
				case 2:
					setDiscVar('var1', 'rouge', 'green', 'red', 2);
					setDiscVar('var2', 'vert', 'blue', 'red', 2);
					setDiscVar('var3', 'rouge', 'red', 'black', 1);
				break;
			}
			
		}
		show('boutons' + round);
		timeOut(2000, checkDiscernement, round);
	} else {
		message = "Echec !!!";
		goto('presentationDiscernement');
	}
}
function setDiscVar(id, value, bgColor, col, ret){
	var v1 = getElt(id);
	v1.value = value;
	v1.style.backgroundColor = bgColor;
	v1.style.color = col;
	v1.onclick = () => discernement(ret);
}
function checkDiscernement(value){
	if (value === round)
	{
		message = "Echec !!!";
		goto('presentationDiscernement');
	}
}
/******************savoir****************************************************/
var questionsSavoir = [];
var questionsRepondues = [];
function initQuestionsSavoir() {
	goodAnswer = 0;
	var uneQuestion = {};
	uneQuestion.question = "Où sont situés les Abasseurs Venteux ?";
	uneQuestion.reponses = ["Au sud", "Au nord", "A l'est", "A l'ouest"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le nom de la cité des mines, détruite par le Courroux Reclus ?";
	uneQuestion.reponses = ["Fondestina", "Gardénia", "Abrabémor", "Bripotis"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le nom de l’auberge de Pierretin ?";
	uneQuestion.reponses = ["Le clarion", "l'Aimable Amanite", "La Bonne Chère", "Le Griffon Dodu"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment s’appellent les cultes unifiés ?";
	uneQuestion.reponses = ["La Capitance", "Les éternels", "La communauté", "L'Alliance"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le plus grand arbre d'Argolie";
	uneQuestion.reponses = ["L'araucaire courbe", "Le séquoïa", "Le salarinier ", "Le mélèze"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel autre nom porte le salarinier ?";
	uneQuestion.reponses = ["Bourdaine solitaire", "Pin solitaire", "Bourdaine prétentieuse", "Pin prétentieux"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment s’appellent les vignobles de la trouée fertile ?";
	uneQuestion.reponses = ["Les Herboises", "Les Glèbes", "Mareschailles", "Buttes-au-Soleil"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment s’appelle le fleuve qui traverse l’Oslande ?";
	uneQuestion.reponses = ["Clarion", "Callis", "Lavasse", "Luyon"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le nom de l’éternelle des créations, protectrice de Ténélur ?";
	uneQuestion.reponses = ["Kypion", "Pi", "Celrulya", "Cébhor"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment nomme-t-on les habitants de Conchaya ? ";
	uneQuestion.reponses = ["Conchayans", "Conchayins", "Conchayinois", "Conchayiers"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le nom du grand plateau Herbeux de Pranadie ?";
	uneQuestion.reponses = ["Moloissière", "Herboises", "Confins Herbeux", "Confins"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quelle structure de sortilée du sud accueille les apprentis afin de les former ?";
	uneQuestion.reponses = ["La Capitance", "L'école des flammes", "L'appentissoire", "Le dormoir aux apprentis"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est l’ordre des inflammés qui commande au feu et aux éclairs ?";
	uneQuestion.reponses = ["Les aviveurs", "Les élémentaires", "Les sorciers", "Les mages"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment est-ce que les bardes appellent Fulnaïr ?";
	uneQuestion.reponses = ["Foudre", "Tonnerre", "Fièvre", "Lave"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment se nomment les fées du hasard et de la chance ?";
	uneQuestion.reponses = ["Les fortunelles", "Les chancerelles", "Les destinelles", "Les hasardelles"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quelle est l’espèce d’écureuils endémique de Valflori ?";
	uneQuestion.reponses = ["Les fourrus", "Les fourreux", "Les fourraux", "Les fourrals"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le nom du premier arrivé ?";
	uneQuestion.reponses = ["Orban", "Kazar", "Andellion", "Ghhet"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quelles sont ces particules qui flottent parfois sur Porviria ?";
	uneQuestion.reponses = ["Les griffons", "Des fées", "Le gomà", "La mana"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est l’autre nom du maroire ?";
	uneQuestion.reponses = ["Le rat des marais", "Le groueux", "Le grou-grou", "Le grouan"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Dans quelle partie de l’Outre-Monde se perdent les esprits ?";
	uneQuestion.reponses = ["Les Nappes Ténébreuses", "Les Solines Noires", "Les Confins Fiévreux", "Les Hermes Malsains"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment s’appellent les îles de l’Oslande ?";
	uneQuestion.reponses = ["Kornemore", "Karnemare", "Karnemore", "Kernemore"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quelle tour de Pranadie accueille auteurs et savants ?";
	uneQuestion.reponses = ["Abrabémor", "Stel-Ruraut", "Luciandath", "Vigilante"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment s’appelle le buisson musical ?";
	uneQuestion.reponses = ["Méloprin", "Chanterelle", "Litanien", "Sérénier"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quelle danse traditionnelle est dansée à Porviria ?";
	uneQuestion.reponses = ["Le goulot de quatre", "La Soubassonne", "Le Frontil", "La Palantone"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quelle est la région la plus nordique de l’Oslande ?";
	uneQuestion.reponses = ["La Pranadie", "L'Argolie", "Le Palatorne", "La Primarie"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est le nom des fées responsables de faire tomber la nuit ?";
	uneQuestion.reponses = ["Les sommeilielles", "Les pénombrelles", "Les nocturnelles", "Les ténébrelles"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quels arbres poussent avachis sur le sol ?";
	uneQuestion.reponses = ["Les pins plats", "Les pins mous", "Les pins lassifs", "Les pins noueux"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel est l’ancien nom de la tour de Kazar ?";
	uneQuestion.reponses = ["Silladia", "Satyris", "Sorcelière", "Sélénya"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Combien y’a-t-il de plaies des abysses ?";
	uneQuestion.reponses = ["Six", "Sept", "Huit", "Neuf"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment s’appelle la tour de Porviria ?";
	uneQuestion.reponses = ["Luciandath", "Vigilante", "Silladia", "Stel-Ruraut"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Quel territoire de l’ouest a été abandonné aux faulves ?";
	uneQuestion.reponses = ["Les Territoires Sauvages", "L'Argolie", "L'Uroyante", "Le Palatorne"];
	questionsSavoir.push(uneQuestion);
	uneQuestion = {};
	uneQuestion.question = "Comment est appelé le havre des druides ?";
	uneQuestion.reponses = ["Yssialys", "Astaliel", "Herbalis", "Ophilys"];
	questionsSavoir.push(uneQuestion);

	/*uneQuestion = {};
	uneQuestion.question = "";
	uneQuestion.reponses = ["", "", "", ""];
	questionsSavoir.push(uneQuestion);/**/

	setQuestionSavoir();
}
function setQuestionSavoir() {
	var rand = getRandomInt(questionsSavoir.length);
	while (questionsRepondues.includes(rand))
		rand = getRandomInt(questionsSavoir.length);
	var questionHasard = questionsSavoir[rand];
	innerHtml('question', questionHasard.question);
	for(var i = 0; i < 4; i++){
		var rep = getElt('reponse' + i);
		rep.value = questionHasard.reponses[i];
		var a = rand;
		setOnclickSavoir(rep, rand, i);
	}
}
function setOnclickSavoir(rep, a, b) {
	rep.onclick = () => repondreSavoir(a, b);
}
function repondreSavoir(ques, resp) {
	innerHtml('intro','');
	if (isGoodSavoir(ques, resp)) {
		round++;
		questionsRepondues.push(ques);
		innerHtml('compte', questionsRepondues.length + 1)
		if (round === 11) gotoHidden('templeSavoir');
		setQuestionSavoir();
	} else {
		gotoMessage('presentationSavoir', "Ce n'est pas la bonne réponse. Vous devez apprendre encore!")
		//setQuestionSavoir();
	}
}
function isGoodSavoir(ques, resp) {
	console.log(ques + "=>" + resp);
	switch(ques){
		case 0 : return resp === 0;
		case 1 : return resp === 2;
		case 2 : return resp === 1;
		case 3 : return resp === 3;
		case 4 : return resp === 0;
		case 5 : return resp === 0;
		case 6 : return resp === 3;
		case 7 : return resp === 1;
		case 8 : return resp === 2;
		case 9 : return resp === 0;
		case 10 : return resp === 2;
		case 11 : return resp === 3;
		case 12 : return resp === 1;
		case 13 : return resp === 2;
		case 14 : return resp === 0;
		case 15 : return resp === 2;
		case 16 : return resp === 3;
		case 17 : return resp === 2;
		case 18 : return resp === 1;
		case 19 : return resp === 3;
		case 20 : return resp === 3;
		case 21 : return resp === 2;
		case 22 : return resp === 0;
		case 23 : return resp === 3;
		case 24 : return resp === 2;
		case 25 : return resp === 1;
		case 26 : return resp === 3;
		case 27 : return resp === 0;
		case 28 : return resp === 0;
		case 29 : return resp === 1;
		case 30 : return resp === 2;
		case 31 : return resp === 0;
	}
}


/*************************Honnêteté*****************************************************************/

var questionsHonnetete = [];
function initHonnetete() {
	var uneQuestion = {};
	uneQuestion.question = "Vous efforcez-vous de corformer vos actes à votre éthique ?";
	uneQuestion.question2 = "Votre éthique est-elle souvent en opposition avec vos actes ?";
	uneQuestion.reponses = ["Oui", "Le plus souvent possible", "Cela m'est impossible", "Non"];
	uneQuestion.reponses2 = ["Non", "Pas tant que je le peux", "Malheureusement", "Non, jamais"];
	questionsHonnetete.push(uneQuestion);

	uneQuestion = {};
	uneQuestion.question = "Différenciez-vous bien ce qui est de votre responsabilité, et de celle des autres ?";
	uneQuestion.question2 = "Faites-vous la part, au quotidien, entre les tâches qui vous échoient et des tâches qui sont le fait d'autres ?";
	uneQuestion.reponses = ["Naturellement", "Je ne comprends pas la question", "Je ne suis responsable de rien", "Non, c'est difficile"];
	uneQuestion.reponses2 = ["Oui", "Ce n'est pas clair", "Rien ne m'échoie, en vérité", "C'est compliqué"];
	questionsHonnetete.push(uneQuestion);

	uneQuestion = {};
	uneQuestion.question = "Ne faites-vous de promesses que celles que vous saurez tenir ?";
	uneQuestion.question2 = "Tenez-vous toujours vos engagements ?";
	uneQuestion.reponses = ["Toujours", "Parfois", "Je ne fais jamais de promesses", "Non, je m'engage trop facilement"];
	uneQuestion.reponses2 = ["Toujours", "Généralement", "Je préfère ne pas m'engager", "Je n'y parviens pas, non"];
	questionsHonnetete.push(uneQuestion);
	
	uneQuestion = {};
	uneQuestion.question = "Admettez-vous lorsque vous avez tort ?";
	uneQuestion.question2 = "Vous arrive-t-il de vous entêter, au point de ne pas changer d'avis tandis qu'il le faudrait ?";
	uneQuestion.reponses = ["Immédiatement", "Cela me prend du temps", "Pas publiquement", "Je n'ai jamais tort"];
	uneQuestion.reponses2 = ["Jamais", "Oui, et puis je cède", "Devant les autres, oui", "Pourquoi changerais-je d'avis ?"];
	questionsHonnetete.push(uneQuestion);
	
	uneQuestion = {};
	uneQuestion.question = "Faites-vous parfois du mal aux gens de façon intentionnelle ?";
	uneQuestion.question2 = "Vous arrive-t-il de vous venger ?";
	uneQuestion.reponses = ["Non, quelle idée", "Oui, mais je le regrette", "Oui, si j'ai de bonnes raisons", "Il le faut bien !"];
	uneQuestion.reponses2 = ["Jamais", "Cela m'arrive, puis j'ai des remords", "Oui, selon le motif", "Et pourquoi pas, c'est très sain !"];
	questionsHonnetete.push(uneQuestion);
	
	uneQuestion = {};
	uneQuestion.question = "Vous arrive-t-il de mentir dans un but égoïste ?";
	uneQuestion.question2 = "Lorsque vous travestissez la vérité, dans quel dessein est-ce ?";
	uneQuestion.reponses = ["Le mensonge est interdit", "Dans un but altruiste uniquement", "Oui, parfois", "Le mensonge est nécessaire"];
	uneQuestion.reponses2 = ["Je ne le fais jamais !", "Pour le bien d'autrui", "Cela dépend", "Parce qu'il le faut"];
	questionsHonnetete.push(uneQuestion);
	
	uneQuestion = {};
	uneQuestion.question = "Etes-vous sincère ?";
	uneQuestion.question2 = "Vous arrive-t-il de dire des choses qui ne reflètent pas vos pensées ?";
	uneQuestion.reponses = ["Jamais", "Parfois", "En général", "Toujours"];
	uneQuestion.reponses2 = ["Jamais", "Parfois", "En général", "Toujours"];
	questionsHonnetete.push(uneQuestion);
	
	uneQuestion = {};
	uneQuestion.question = "Préférez-vous être heureux, satisfait, en sécurité, ou libre ?";
	uneQuestion.question2 = "Quel sentiment vous est le plus agréable ?";
	uneQuestion.reponses = ["Heureux", "Satisfait", "En sécurité", "Libre"];
	uneQuestion.reponses2 = ["Le bonheur", "La satisfaction", "La sécurité", "La liberté"];
	questionsHonnetete.push(uneQuestion);
	
	uneQuestion = {};
	uneQuestion.question = "Les règles de vie en société, doit-on leur obéir ?";
	uneQuestion.question2 = "A Valbabotes existent de nombreuses lois qui régissent votre parole et votre comportement. Les suivrez-vous ?";
	uneQuestion.reponses = ["Toujours", "Le plus possible", "Certaines", "Elles sont absurdes"];
	uneQuestion.reponses2 = ["Quelles qu'elles soient", "Je m'y efforcerai", "Je choisirai en fonction des lois", "Il n'en est pas question"];
	questionsHonnetete.push(uneQuestion);/**/
	
	questionsHonnetete = getRandomSortArray(questionsHonnetete);
	questionRound = 0;

	displayQuestionHonnetete();
	/*uneQuestion = {};
	uneQuestion.question = "";
	uneQuestion.reponses = ["", "", "", ""];
	questionsHonnetete.push(uneQuestion);/**/
}

function displayQuestionHonnetete(){
	//console.log(questionsHonnetete);
	//console.log(questionRound);
	
	if (questionRound === questionsHonnetete.length * 2) {
		var equiv = 0;
		for (var i = 0; i < questionsHonnetete.length; i++) {
			currentQuestion = questionsHonnetete[i];
			if (currentQuestion.r1 === currentQuestion.r2) equiv++;
			else {
				console.log(currentQuestion);
			}
		}
		if (equiv > questionsHonnetete.length * 0.7) {
			gotoHidden('templeHonnetete');
		} else {
			gotoMessage('presentationHonnetete',"Vous n'êtes pas assez honnête pour que je vous fasse passer l'épreuve, déclare le clerc");
		}
	} else if (questionRound < questionsHonnetete.length)
	{
		var currentQuestion = questionsHonnetete[questionRound];
		innerHtml('question', currentQuestion.question);
		for (var i = 0; i < 4; i++) {
			var t = currentQuestion.reponses[i];
			currentQuestion.reponses[i] = { ordre : i, text : t};
		}
		currentQuestion.reponses = getRandomSortArray(currentQuestion.reponses);
		for (var i = 0; i < 4; i++) {
			var elt = getElt('reponse'+i);
			setOnclickHonnetete(elt, currentQuestion.reponses[i].text, 0, currentQuestion.reponses[i].ordre);
		}
	} else {
		if (questionRound === questionsHonnetete.length)
			questionsHonnetete = getRandomSortArray(questionsHonnetete);
		var currentQuestion = questionsHonnetete[questionRound % questionsHonnetete.length];
		innerHtml('question', currentQuestion.question2);
		for (var i = 0; i < 4; i++) {
			var t = currentQuestion.reponses2[i];
			currentQuestion.reponses2[i] = { ordre : i, text : t};
		}
		currentQuestion.reponses = getRandomSortArray(currentQuestion.reponses);
		for (var i = 0; i < 4; i++) {
			var elt = getElt('reponse'+i);
			setOnclickHonnetete(elt, currentQuestion.reponses2[i].text, 1, currentQuestion.reponses2[i].ordre);
		}
	}
	questionRound++;
}
function setOnclickHonnetete(rep, text, a, b) {
	rep.value = text;
	rep.onclick = () => repondreHonnetete(a, b);
}
function repondreHonnetete(roun, resp) {
	hide('intro');
	if (roun === 0) questionsHonnetete[(questionRound - 1) % questionsHonnetete.length].r1 = resp;
	else questionsHonnetete[(questionRound - 1) % questionsHonnetete.length].r2 = resp;
	displayQuestionHonnetete();
}

/******************tempérance***********************************************************************************************/
function initTemperance() {
	waitTemperance = timeOut(20000, temp1, '');
}
function temp1(val){
	clearTimeout(waitTemperance);
	var elt = getElt('boutonTemperance');
	elt.value = 'Frapper à la porte';
	elt.onclick = () => frapperPorte();
	waitTemperance = timeOut(40000, temp2, '');
}
function frapperPorte() {
	innerHtml('intro', "Quelqu'un finit par venir. Le clerc qui s'occupe de la tempérance est absent, il faudra revenir plus tard...");
	var elt = getElt('boutonTemperance');
	elt.value = 'Retourner à Luciandath';
	elt.onclick = () => goto('luciandath');
}
var waitTemperance;
function temp2(val){
	clearTimeout(waitTemperance);
	var elt = getElt('boutonTemperance');
	elt.value = "Aller à l'auberge";
	elt.onclick = () => allerAuberge();
	waitTemperance = timeOut(10000, attendreEncore, '');
}
function attendreEncore(val) {
	innerHtml('intro', "Il semble n'y avoir personne. Peut-être le temple est-il abandonné ?");
	var elt = getElt('boutonTemperance');
	elt.value = 'Retourner à Luciandath';
	elt.onclick = () => goto('luciandath');
}
function allerAuberge() {
	window.clearTimeout(waitTemperance);
	innerHtml('intro', "Le clerc est en train de discuter avec l'aubergiste. Vous voilà enfin à destination !");
	var elt = getElt('boutonTemperance');
	elt.value = 'Aborder le clerc';
	elt.onclick = () => aborderClerc();
}
function aborderClerc() {
	innerHtml('intro', "Le clerc vous demande : Etes-vous venu pour le courage, ou la tempérance ? ");
	var elt = getElt('boutonTemperance');
	elt.value = 'Le courage';
	elt.onclick = () => goto('presentationCourage');

	elt = getElt('boutonTemperance2');
	show('boutonTemperance2');
	elt.value = 'La Tempérance';
	elt.onclick = () => gotoHidden('templeTemperance');
	timeOut(5000, clercEnerve, '');
}
function clercEnerve() {
	innerHtml('intro', "Hé bien ? Vous ne dites rien ? Vous me faites perdre mon temps... ");
	var elt = getElt('boutonTemperance');
	elt.value = 'Retourner à Luciandath';
	elt.onclick = () => goto('luciandath');
}

/******************************************************force****************************************************************/
var compteurForce = 0;
function initForce(){
	getElt('bouton2').onclick = () => force(0);
	getElt('bouton3').onclick = () => force(1);
}

function force(val) {
	switch(val) {
	case 0: //visiter
		specialEvent = '0';
		hide('timerDisplay');
		setChoicesForce("Quelle partie de Gardénia souhaitez-vous visiter ?",
			"Les fameux vergers", 12, "La taverne du Minéa", 15, "Le marché", 17);
		break;
	case 1: //aller
		compteurForce++; 
		if (compteurForce === 1) {
			innerHtml('messageDiv',"Le temple est vraiment très éloigné");
			show('messageDiv');
		} else if (compteurForce === 2) {
			innerHtml('messageDiv',"");
			hide('messageDiv');
		} else if (compteurForce === 10) {
			getElt('bouton3').style.backgroundColor = 'red';
		} else if (compteurForce === 30) {
			getElt('bouton3').style.backgroundColor = 'buttonface';
			setChoicesForce("Vous semblez vraiment désirer aller au temple... Vous apercevez la flèche, au loin. Il vous faudra un long moment pour l'atteindre. Peut-être faudrait-il d'abord se renseigner sur la présence du clerc ?<br/>",
			"Aller à l'auberge", 2, "Aller vers le temple", 3, "Retourner à Luciandath", 4);
		}
		break;
	case 2: //auberge
		specialEvent = '0';
		setChoicesForce("A l'auberge, on vous apprend que le clerc est souffrant : Une maladie étrange, certainement l'Ensourd. Mieux vaut ne pas approcher !",
			"Chercher un emploi", 7, "Retourner à Luciandath", 4, "Visiter Gardénia", 0);
		break;
	case 3:
		setChoicesForce("Sur la route du temple, un Gardénian vous interpelle, affolé : Le clerc est malade ! C'est l'Ensourd ! L'Ensourd est là !",
			"Prendre la route secrète vers Sorbotin", 8, "Aller à l'auberge", 2, "Continuer malgré tout", 5);
		break;
	case 4:
		specialEvent = '0';
		goto("luciandath");
		break;
	case 5:
		if (specialEvent === '2') {
			setChoicesForce("Déjà de retour ? Sombres feux, on ne se débarrassera pas de vous ainsi, n'est-ce pas ? Allez-y, le clerc va vous recevoir ! <span onclick=\"gotoHidden('templeForce')\">J'appuie votre solicitation, appuyez mes propos en retour !</span>",
				"Continuer", -2, "Aller voir le clerc", -2, "Aller vers le temple", -2);
			specialEvent = '0';
		} else {
			var x = nombreDeVertues();
			if (x === 0) {
				setChoicesForce("Cette fois, c'est l'assistant du clerc qui vient à votre rencontre. Il ne faut pas approcher ! Vous avez été prévenus. Quelqu'un comme vous ne peut devenir Juste ! Si vous aviez passé des épreuves, je vous les retirerais ! ",
				"", -1, "Aller à l'auberge", 2, "Continuer malgré tout !", 6);
			} else if (x === 1) {
				setChoicesForce("Cette fois, c'est l'assistant du clerc qui vient à votre rencontre. Il ne faut pas approcher ! Vous avez été prévenus. Quelqu'un comme vous ne peut devenir Juste ! Je vous retire l'épreuve que vous avez réussie ! ",
				"", -1, "Visiter Gardénia", 0, "Continuer malgré tout !", 6);
			} else {
				setChoicesForce("Cette fois, c'est l'assistant du clerc qui vient à votre rencontre. Il ne faut pas approcher ! Vous avez été prévenus. Quelqu'un comme vous ne peut devenir Juste ! Je vous retire toutes vos épreuves réussies ! ",
				"", -1, "Visiter Gardénia", 0, "Continuer malgré tout !", 6);
			}
		}
		break;
	case 6:
		specialEvent = '1';
		goto("luciandath");
	 	break;
	case 7: //chercher du travail
		setChoicesForce("Quel genre d'emploi voudriez-vous occuper ?",
				"Scribe", 9, "Coursier", 10, "Paysan", 11);
	 	break; 
	case 8:
	 	goto('presentationCourage');
	 	break; 
 	case 9:
 		setChoicesForce("Par chance, de nombreux livres ont besoin d'être recopiés à Phéonédura. On vous envoie là-bas sans attendre...",
			"Aller à Phéonédura", 13, "", -1, "", -1);
	 	break; 
 	case 10:
	 	monnaieSud += 20;
		displayMonnaie();
 		setChoicesForce("Justement, il manquait quelqu'un pour amener un pli important à Sorbotin ! À l'arrière, il est écrit : À destination de Maître Artholien Finefeuille, S.S.",
			"Aller à Sorbotin", 8, "", -1, "", -1);
 		break; 
 	case 11:
 		setChoicesForce("Chaque journée de travail vous rapportera 4 pièces de bronze ! Il s'agit de s'occuper des vergers...",
			"Travailler un jour", 14, "Abandonner", 0, "", -1);
	 	break;
	case 12://vergers
		setChoicesForce("Vous discutez avec plusieurs anciens apprentis justicians, qui ont finalement abandonné la voie de la justice-en-tout pour s'intaller à Gardénia. L'un des leurs arrivera bientôt qui sait pù trouver le clerc !",
			"Attendre le villageois", 18, "Retourner vers le centre-bourg", 0, "", -1);
	 	break;
 	case 13:
	 	goto('presentationSavoir');
	 	break; 
	 case 14:
	 	monnaieSud += 4;
		displayMonnaie();
	 	if (monnaieSud < 80)
	 		setChoicesForce("Chaque journée de travail dans les vergers vous rapporte 4 pièces de bronze !",
				"Travailler un jour de plus", 14, "Retourner à l'auberge", 2, "", -1);
	 	else 
	 		setChoicesForce("L'exploitant du verger est content de vous voir motivé! Il propose de vous embaucher pour 10 jours d'affilée, à 5 pièces par jour !",
				"Travailler un jour de plus", 14, "Travailler dix jours", 16, "Retourner à l'auberge", 2);
	 	break;
 	case 15:
 		setChoicesForce("Il y a trois hommes dans la taverne, A qui allez-vous parler ?",
				"Le serveur", 24, "L'homme musclé", 25, "Le borgne", 26);
	 	break; 
 	case 16:
 		monnaieSud += 50;
		displayMonnaie();
	 	if (monnaieSud < 1200)
	 		setChoicesForce("Chaque période de travail dans les vergers vous rapporte 50 pièces de bronze !",
				"Travailler 10 jours de plus", 16, "Retourner à l'auberge", 2, "", -1);
	 	else {
	 		removeEpreuve('temperance');
	 		setChoicesForce("Finalement, cette situation vous plait beaucoup, et vous en oubliez vos ambitions de devenir Juste, vos connaissances et vos réussites sur la voie...",
				"Travailler 10 jours de plus", 16, "Retourner à Luciandath", 4, "", -1);
	 	} /*else {
	 		setChoicesForce("Malheureusement, à cause de l'Ensourd, plus rien ne pousse, les gens fuient. L'on n'a plus besoin de vous à Gardénia, il vous faut repartir à Luciandath...",
				"Retourner à Luciandath", 4, "", -1, "", -1);
	 	}*/
	 	break; 
	case 17: //le marché
		displayMonnaie();
		if (monnaieSud < 400) {
			var x = Math.round(monnaieSud / 100) * 100 + 100;
			setChoicesForce("Sur le marché, un camelot vous accoste : j'ai ici une épée enchantée, je vous la vends pour " + x + " pièces !",
					"Je n'ai pas les moyens !", 19, "Je vais chercher un emploi", 7, "", -1);
		} else if (monnaieSud >= 960) {
			setChoicesForce("Sur le marché, un camelot vous accoste : j'ai ici une épée enchantée, je vous la vends pour 960 pièces !",
					"J'achète !", 32, "Je refuse !", 19, "", -1);
		} else {
			setChoicesForce("Sur le marché, un camelot vous accoste : j'ai ici une épée enchantée, je vous la vends pour 960 pièces !",
					"Je refuse !", 19, "Vous volez l'épée", 33, "", -1);
		}
	 	break; 
	case 18:
		show('timerDisplay');
		forceInterval = setInterval(displayForceTimer, debug ? 200 : 1000);
		innerHtml('intro',"Il sera là avant que vous ayez le temps de compter jusqu'à 100 ! Prenez une infusion en attendant!");
		setForceBouton('bouton1',"Ne plus attendre", 19);
		var elt = getElt('bouton2');
		elt.value = "Demander s'il arrive bientôt";
		elt.onclick = () => stopTriche();
	 	break; 
 	case 19: //2eme visite
		hide('timerDisplay');
		clearInterval(forceInterval);
		setChoicesForce("Quelle partie de Gardénia souhaitez-vous visiter maintenant ?",
			"La guilde des bardes", 20, "La taverne du Minéa", 21, "Retourner à Luciandath", 4);
		break;
	case 20:
		setChoicesForce("Les bardes sont en train de jouer à un jeu de dé. Ils vous proposent de jouer avec eux. Avec deux dés 6, il faut faire le plus grand nombre pour emporter la mise !",
			"Vous essayez", 34, "Vous allez à la taverne", 21, "", -1);
	 	break;
	case 21:
		setChoicesForce("Un vieil homme vous propose un jeu de rapidité. Voulez-vous essayer ? Cela testera votre force, sous-entend-il...",
			"Essayer", 36, "Retourner au bourg", 0, "", -1);
	 	break;
	case 22:
		removeEpreuve('altruisme');
		force(19);
	 	break;
	case 23:
		setChoicesForce("Désolé, il n'a pas l'air de venir aujourd'hui. Peut-être le trouverez-vous au bourg ?",
			"Retourner au bourg", 19, "", -1, "", -1);
	 	break;
	case 24:
		setChoicesForce("Pas trop dur, le séjour ? demande-t-il. Les gens d'ici sont parfois taquins...",
			"Commander une bière", 27, "Commander du vin", 28, "Sortir de la taverne", 19);
	 	break;
	case 25:
		displayMonnaie();
		setChoicesForce("L'homme musclé vous propose un jeu de hasard... Acceptez-vous de jouer ? ",
			"Je joue 5 pièces", 29, "Sortir de la taverne", 19, "", -1);
	 	break;
	case 26:
		setChoicesForce("Le borgne semble préoccupé : j'ai perdu l'anneau que m'avait confié ma mère, gémit-il... M'aiderez-vous à le retrouver ?",
			"Oui", 19, "Non", 22, "J'essaierai", 19);
	 	break;
 	case 27:
 		forceAlcool += 2;
		monnaieSud -= 1;
		displayMonnaie();
 		setChoicesForce("Pas trop dur, le séjour ? demande-t-il. Les gens d'ici sont parfois taquins...",
			"Commander une bière", 27, "Commander du vin", 28, "Sortir de la taverne", 19);
	 	break;
	case 28:
		forceAlcool += 4;
		monnaieSud -= 1;
		displayMonnaie();
 		setChoicesForce("Pas trop dur, le séjour ? demande-t-il. Les gens d'ici sont parfois taquins...",
			"Commander une bière", 27, "Commander du vin", 28, "Sortir de la taverne", 19);
	 	break;
	case 29:
		monnaieSud += 10;
		displayMonnaie();
		setChoicesForce("L'homme musclé commence la partie de goulot de quatre. Vous gagnez la première manche !",
			"Continuer", 30, "Parler au serveur", 24, "Sortir de la taverne", 19);
	 	break;
 	case 30:
 		var x = getRandomInt(10);
 		if (x > 7) monnaieSud -= 5;
 		else monnaieSud += 10;
		displayMonnaie();
		if (monnaieSud > 400) {
			setChoicesForce("Face à votre chance, l'homme musclé abandonne : les fortunelles sont de votre côté! admet-il",
				"Payer une tournée", 31, "Sortir de la taverne", 19, "", -1);
		} else {
			setChoicesForce(x > 7 ? "C'est perdu !" : "C'est gagné !",
				"Continuer", 30, "Sortir de la taverne", 19, "", -1);
		}
	 	break;
 	case 31:
		forceAlcool += 4;
		setChoicesForce("Tout le monde vous remercie de votre générosité. Commandez-vous encore à boire ?",
			"Commander une bière", 27, "Commander du vin", 28, "Sortir de la taverne", 19);
	 	break;
 	case 32:
 		monnaieSud -= 960;
		displayMonnaie();
 		setChoicesForce("Vous disposez désormais d'une superbe épée ! Le vendeur a indiqué qu'elle augmenterait votre force et votre résistance, et qu'elle avait des pouvoirs secrets...",
			"Continuer dans le bourg", 19, "", -1, "", -1);
	 	break;
	case 33:
 		removeEpreuve('honnetete');
		displayMonnaie();
 		setChoicesForce("Vous disposez désormais d'une superbe épée ! ",
			"Continuer dans le bourg", 19, "", -1, "", -1);
	 	break;
	 case 34:
	 	monnaieSud += 30;
		displayMonnaie();
 		setChoicesForce("Vous avez gagné 30 pièces ! Vous avez fait 8 et eux 6, 6 et 4...",
			"Rejouer", 35, "Visiter le bourg", 0, "", -1);
	 	break;
 	case 35:
	 	monnaieSud -= 2;
		displayMonnaie();
		var x = getRandomInt(9) + 2;
		var r1 = getLowerDice(x);
		var r2 = getLowerDice(x);
		var r3 = getLowerDice(x);
		switch(getRandomInt(6)) {
		case 0: r1 = getHigherDice(x); break;
		case 1: r2 = getHigherDice(x); break;
		case 2: r3 = getHigherDice(x); break;
		case 3: r1 = getHigherDice(x);r2 = getHigherDice(x); break;
		case 4: r2 = getHigherDice(x);r3 = getHigherDice(x); break;
		case 5: r3 = getHigherDice(x);r1 = getHigherDice(x); break;
		}
 		setChoicesForce("Vous avez perdu ! Vous avez fait "+x+" et eux "+r1+", "+r2+" et "+r3+"...",
			"Rejouer", 35, "Visiter le bourg", 0, "", -1);
	 	break;
 	case 36:
 		laMainEstLevee = false;
 		forceDelai = 600;
 		forceMainTentatives = 1;
 		innerHtml('timerDisplay', 'Attention...<br/><br/><br/><br/><br/>');
		show('timerDisplay');
		setChoicesForce("Posez la main sur la table... Je vais faire de même... Je vais essayer de taper votre main : vous n'avez pas le droit de l'enlever avant que je l'ai soulevée de la table...",
			"C'est parti", 38, "Sortir de la taverne", 19, "", -1);
	 	break;
 	case 37:
 		console.log('click');
 		forceMainTentatives++;
		clearInterval(forceInterval);
 		if (laMainEstLevee) {
 			if (forceDelai >= 100) forceDelai -= 50;
 			innerHtml('timerDisplay', 'Vous avez réussi ! Attention...<br/><br/><br/><br/><br/>');
 		} else {
 			innerHtml('timerDisplay', 'Trop tôt ! Attention...<br/><br/><br/><br/><br/>');
 		}
		force(38);
	 	break;
	 case 38:
 		console.log(forceMainTentatives);
 		jeuDeMains();
	 	if (forceMainTentatives % 10 === 0) {
			setChoicesForce("Posez la main sur la table... Je vais faire de même... Je vais essayer de taper votre main : vous n'avez pas le droit de l'enlever avant que je l'ai soulevée de la table...",
				"Donner votre argent", 39, "Enlever votre main", 37, "", -1);
		} else {
			setChoicesForce("Posez la main sur la table... Je vais faire de même... Je vais essayer de taper votre main : vous n'avez pas le droit de l'enlever avant que je l'ai soulevée de la table...",
				"Enlever votre main", 37, "Sortir de la taverne", 19, "", -1);
		}
	 	break;
	case 39:
		monnaieSud = 0;
		clearInterval(forceInterval);
		innerHtml('timerDisplay', '');
		hide('timerDisplay');
		setChoicesForce("Le vieil homme vous remercie de lui avoir donné tout votre argent.",
				"Donner votre argent", 39, "Visiter le bourg", 0, "", -1, );
	 	break;
	}
}

function getHigherDice(x){
	var d = x + getRandomInt(3) + 1;
	if (d > 12) return 12;
	return d;
}
function getLowerDice(x){
	var d = x - getRandomInt(3);
	if (d < 2) return 2;
	return d;
}
function jeuDeMains(){
	var x = getRandomInt(5) + 4;
	laMainEstLevee = false;
	forceInterval = setTimeout(mainLevee , x * forceDelai);
}
function mainLevee(){
	laMainEstLevee = true;
	innerHtml('timerDisplay', 'YAHAAAAA !!!!<br/><br/><br/><br/><br/>');
	clearInterval(forceInterval);
	forceInterval = setTimeout(mainBaissee, forceDelai);
}
function mainBaissee(){
	clearInterval(forceInterval);
	laMainEstLevee = false;
	innerHtml('timerDisplay', 'Perdu ! Attention...<br/><br/><br/><br/><br/>');
	setChoicesForce("Posez la main sur la table... Je vais faire de même... Je vais essayer de taper votre main : vous n'avez pas le droit de l'enlever avant que je l'ai soulevée de la table...",
			"", -1, "", -1, "", -1);
	forceInterval = setTimeout(relancer, 2000);
}
function relancer() {
	clearInterval(forceInterval);
	force(38);
}

var laMainEstLevee = false;
var forceMainTentatives = 1;
var forceCount = 0;
var forceDelai = 0;
var forceTriche = true;
var forceInterval = 0;
var forceAlcool = 0;
function displayMonnaie(){
	show('timerDisplay');
	innerHtml('timerDisplay', 'Vous possédez ' + monnaieSud + ' pièces de bronze');
	if (monnaieSud <= 0) gotoMessage('Luciandath','Vous êtes ruiné... Vous retournez donc à Luciandath...');
}
function stopTriche(){
	forceTriche = false;
	innerHtml('timerDisplay', "Oui ! Ne vous inquiétez pas !");
	forceCount -= 5;
	forceDelai = 5;
}
function displayForceTimer(){
	forceCount++;
	dblog(forceCount);
	if (forceDelai === 0)
		innerHtml('timerDisplay', "Vous comptez dans votre tête : " + (100 - forceCount));
	else 
		forceDelai --;
	if (forceTriche) {
		switch(forceCount) {
		case 30 : forceCount = 20; dblog('+10'); forceTriche = false; break;
		case 60 : forceCount = 50; dblog('+10'); forceTriche = false; break;
		case 90 : forceCount = 60; dblog('+20'); forceTriche = false; break;
		case 68 : forceCount -= getRandomInt(20); dblog('+???'); break;
		case 93 : window.clearInterval(forceInterval); dblog('+lent'); forceInterval = setInterval(displayForceTimer, 2000); break;
		}
	} else {
		switch(forceCount) {
		case 30 : dblog('e30'); forceTriche = true; break;
		case 60 : dblog('e60'); forceTriche = true; break;
		case 90 : dblog('e90'); forceTriche = true; break;
		case 68 : dblog('e68'); forceTriche = true; break;
		}
	}
	if (forceCount === 100) {
		hide('timerDisplay');
		window.clearInterval(forceInterval);
		force(23);
	}
}
function setChoicesForce(introduction, text1, number1, text2, number2, text3, number3) {
	innerHtml('intro', alcoolise(introduction) + "<br/>");
	setForceBouton('bouton1', alcoolise(text1), number1);
	setForceBouton('bouton2', alcoolise(text2), number2);
	setForceBouton('bouton3', alcoolise(text3), number3);
}
function setForceBouton(bouton, text, number) {
	if (number === -1) {
		hide(bouton);
		return;
	}
	showInline(bouton);
	var elt = getElt(bouton);
	elt.value = text;
	if (number === -2)
		elt.onclick = () => {};
	else elt.onclick = () => force(number);
}
function alcoolise(text) {
	if (text.includes('<')) return text;
	if (text.length < 2) return text;
	for(var i = 0; i < forceAlcool; i++) {
		var x = getRandomInt(text.length - 2);
		var a = text.charAt(x);
		dblog(text + ' / ' + x);
		text = setStr(text, text.charAt(x + 1), x);
		dblog(text);
		text = setStr(text, a, x + 1);
		dblog(text);
	}
	return text;
}


function initHumilite(){
	var currentDate = new Date(); 
	const hour = currentDate.getHours();
	var elt = getElt('bouton2');
	var intr = getElt('intro');
	dblog(doEncCheat("18"));//U2FsdGVkX19k8+IRo0Xc8CYSZAthNlKlGCalk5zc7ZI=
	if (hour === doDecCheat("U2FsdGVkX19xUaCixmY3lcptcSny35SPy2YrKAFQpZQ=") || debug) {
		intr.innerHTML = "Par chance, le clerc est disponible pour vous recevoir !"
		elt.value = "Parler au clerc";
		elt.onclick = () => gotoHidden('templeHumilite');
	} else {
		intr.innerHTML = "Quelqu'un vous accueille à l'entrée du temple : <i>Le clerc est très pris. Revenez tôt le matin, si vous voulez avoir une chance de le voir.</i>"
		elt.value = "Attendre";
	}
}

var pointsHumilite = 0;
var okHum = [7, 12, 4, 3, 7, 1];
var toHum;
function initCharite(){
	for (var i = 1; i <= 12 ; i++) {
		var elt = getElt('bouton' + i);
		if (i === okHum[pointsHumilite]) {
			elt.value = "Ru des ruelles";
			elt.onclick = () => ohum();
		} else {
			elt.value = getRandomRue();
			elt.onclick = () => ehum();
		}
	}
	toHum = setTimeout(thum, 3000);
}

function ehum(){
	pointsHumilite = 0;
	clearTimeout(toHum);
	initCharite();
}

function ohum(){
	pointsHumilite++;
	clearTimeout(toHum);
	if (pointsHumilite === okHum.length) gotoHidden('templeCharite')
	else initCharite();
}

function thum(){
	pointsHumilite--;
	if (pointsHumilite < 0) pointsHumilite = 0;
	else initCharite();
}

var appellationDesRues = ["Allée", "Venelle", "Parc", "Voie", "Chemin", "Impasse", "Passage", "Promenade", "Galerie", "Cours"];
var nomDesRues = [
	"des vergers", "du vent", "des lilas", "des fermes", "des champs", "de l'ours", "des corbeaux", "des corneilles", "des arts", "des faucons", 
	"du soir", "de la guilde", "de la Hanse", "des spectacles", "de la lice", "des auberges", "du nécrodermiste", "des oiseaux", "des nids", "du pic-vert", "des Herboises", "de l'est", "de l'ouest", "du sommeil", "des vieux loups", 
	"des grottes", "de la tour", "du retour", "des herbes", "des troncs", "des cerisiers", "du chêne", "du peuplier", "des hêtres", "de Bourretin", "des pisteurs", "de l'ennui", "des chants", "de la fête", "du firmament", 
	"du ru", "du temple", "de l'appétit", "des mille pas", "des tavernes", "des silences", "du meurisier", "des gentianes", "des pierres", "des étroits", "des haltes", "des saisons", "du printemps", "des refuges"
	//"", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
	];
function getRandomRue(){
	return appellationDesRues[getRandomInt(appellationDesRues.length)] + " " + nomDesRues[getRandomInt(nomDesRues.length)];
}


var espCount = 0;
var espRound = 0;
var espColors = [0, 0, 0, 255, 255, 255];
function initEsperance(){
	clearInterval(toHum);
	toHum = setInterval(upEsp, 100);
}

function upEsp(){
	espCount += 10;
	//console.info(espCount + "=>" + colorPart(0));
	var d1 = getElt('div1');
	var d2 = getElt('div2');
	setEspColors();
	d1.style.backgroundColor = "rgb("+espColors[0] +","+espColors[1] +","+espColors[2] +")";
	d2.style.backgroundColor = "rgb("+espColors[3] +","+espColors[4] +","+espColors[5] +")";
}

function espColor(haut, col){
	switch(espRound){
	case 0: return haut ? colorPart(0) : colorPart(255);
	case 1: 
		switch(col){
		case 0: return haut ? colorPart(0) : colorPart(255);
		case 1: return haut ? colorPart(50) : colorPart(205);
		case 2: return haut ? colorPart(0) : colorPart(255);
		}
	case 2: 
		switch(col){
		case 0: return haut ? colorPart(0) : colorPart(255);
		case 1: return haut ? colorPart(50) : colorPart(205);
		case 2: return haut ? colorPart(100) : colorPart(155);
		}
	case 3: return haut ? colorPartFast(0) : colorPartFast(255);
	case 4: 
		switch(col){
		case 0: return haut ? colorPartFast(0) : colorPartFast(255);
		case 1: return haut ? colorPartFast(50) : colorPartFast(205);
		case 2: return haut ? colorPartFast(0) : colorPartFast(255);
		}
	case 5: 
		switch(col){
		case 0: return haut ? colorPartFast(0) : colorPart(255);
		case 1: return haut ? colorPart(50) : colorPartFast(205);
		case 2: return haut ? colorPartFast(100) : colorPart(155);
		}
	}

}
function setEspColors(){
	espColors[0] = espColor(true,0);
	espColors[1] = espColor(true,1);
	espColors[2] = espColor(true,2);
	espColors[3] = espColor(false,0);
	espColors[4] = espColor(false,1);
	espColors[5] = espColor(false,2);
}

function colorPart(seed) {
	var phase = (seed + espCount) % 510;
	if (phase > 255) phase = 510 - phase;
	return phase;
}
function colorPartFast(seed) {
	var phase = (seed + espCount * 2) % 510;
	if (phase > 255) phase = 510 - phase;
	return phase;
}

function esperer(){
	if (isNearEsp()) {
		espRound++;
		if (espRound == 6) gotoHidden("templeEsperance");
	} else {
		espRound--;
		initEsperance();
	}
}
function isNearEsp(){
	//console.log(espColors);
	for(var i = 0; i < 3; i++) {
		if (Math.abs(espColors[i] - espColors[i+3]) > 70 ) {
			console.log("RATE!!!");
			return false;
		}
	}
	console.log("OK!!!" + espRound);
	return true;
}



function initAltruisme(){
	setSalaire(1, 100);
	setSalaire(2, 100);
	setSalaire(3, 200);
	setSalaire(4, 200);
}
function transfereSalaire(from, to, value){
	var s1 = getElt('salaire' + from);
	var s2 = getElt('salaire' + to);
	console.log(s1);
	var val1 = parseInt(s1.innerHTML);
	console.info(val1);
	if (val1 - value < 0) return;
	s1.innerHTML = val1 - value;
	s2.innerHTML = parseInt(s2.innerHTML) + value;

	checkAltDone();
}
function transfereDeuxSalaires(from, to, value, from2, to2, value2){
	var s1 = getElt('salaire' + from);
	var s2 = getElt('salaire' + to);
	var val1 = parseInt(s1.innerHTML);
	if (val1 - value < 0) return;
	var s12 = getElt('salaire' + from2);
	var s22 = getElt('salaire' + to2);
	var val12 = parseInt(s12.innerHTML);
	if (val12 - value2 < 0) return;
	
	s1.innerHTML = val1 - value;
	s2.innerHTML = parseInt(s2.innerHTML) + value;
	s12.innerHTML = val12 - value2;
	s22.innerHTML = parseInt(s22.innerHTML) + value2;

	checkAltDone();
}
function setSalaire(which, value){
	innerHtml('salaire' + which, value);
}
function altruisme(which){
	switch(which){
	case 1: transfereSalaire(1,2,10);break;
	case 2: transfereSalaire(2,3,5);break;
	case 3: transfereSalaire(3,4,10);break;
	case 4: transfereDeuxSalaires(3,1,20,4,2,10);break;
	case 5: transfereDeuxSalaires(1,2,10,3,4,5);break;
	case 6: transfereDeuxSalaires(4,1,10,3,2,5);break;
	}
}

function checkAltDone(){
	if (parseInt(getElt('salaire1').innerHTML) != 150) return;
	if (parseInt(getElt('salaire2').innerHTML) != 150) return;
	if (parseInt(getElt('salaire3').innerHTML) != 150) return;
	if (parseInt(getElt('salaire4').innerHTML) != 150) return;
	gotoHidden('templeAltruisme');
}




var prudStarts = [1, 5, 6, 1, 8];
var prudCalc = ["x 2","+ 3","- 10","+ 7","/ 3","+ 8","+ 9","√","x 3","+ 4","- 7","x 3","x 5","/ 8","+ 15"/*,"","",""*/];
var toFind = [10, 14, 9, 4, 320];
var prudCount = 0;
function initPrudence(){
	getElt('resultat1').innerHTML = prudStarts[prudCount];
	getElt('resultat2').innerHTML = toFind[prudCount];
	for (var i = 0; i < 3; i++) {
		var elt = getElt('bouton' + i);
		elt.value = prudCalc[3*prudCount + i];
		setClickPrud(elt, 3*prudCount + i);
	}
}
function setClickPrud(elt, val){
	elt.onclick = () => prudMod(val);
}

function prudMod(which){
	console.info(which);
	var res = parseInt(getElt('resultat1').innerHTML);
	switch(which){
	case 0 : res = res * 2; break;
	case 1 : res = res + 3; break;
	case 2 : res = res - 10; break;

	case 3 : res = res + 7; break;
	case 4 : if (res % 3 === 0) res = res / 3; break;
	case 5 : res = res + 8; break;

	case 6 : res = res + 9; break;
	case 7 : if (parseInt(Math.sqrt(res)) === Math.sqrt(res)) res = Math.sqrt(res); break;
	case 8 : res = res * 3; break;
	
	case 9 : res = res + 4; break;
	case 10 : res = res - 7; break;
	case 11 : res = res * 3; break;
	
	case 12 : res = res * 5; break;
	case 13 : if (res % 8 === 0) res = res / 8; break;
	case 14 : res = res + 15; break;
	
	}
	if (res > 0) {
		getElt('resultat1').innerHTML = res;
		if (res === toFind[prudCount]) {
			prudCount++;
			if (prudCount === 5) gotoHidden('templePrudence');
			else initPrudence();
		}
	}
}

function initEE(){
	if (epreuvesReussies !== '111111111111') 
		goto('luciandath');
	hide('mainDiv');
 	getElt('image').style.backgroundImage = "url('../IMAGES/eet2.png')";
}
