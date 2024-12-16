// TO TEST:

// end's code (unspaced)      : DC2.Dw[H]GnL8mW-T-PflhtvwSksCbk^\rb,ere-,sre-,wre-,vgy-,cgy-BflAFr---NeM---!OH++$---Fc/oR+++Ac++J+SU?I--#VQ+Tc++E++
// end's code (spaced)        : DC2.Dw[H] Gn L8m W- T- Pflhtvw Sks Cbk^\rb,ere-,sre-,wre-,vgy-,cgy- Bfl A Fr--- Ne M---! O H++ $--- Fc/o R+++ Ac++ J+ S U? I--# V Q+ Tc++ E++
// every's code               : DC2.DwGmL++WTSksCbl/pu/bl-BicA++NmH+++!$+++FR+++!Ac-J++IV+++Tc+++E

// colour success             : DC2.Dw Cbl-
// colour fail                : DC2.DwCbl/pu/bl-

// notes on DC:
// remember, all tags can use "?" and "~" to indicate either unknown or anything
// DC2.* : species tag can be either 1 or 2 characters by default (with some being more specific going to 3 or even 4), not including modifiers/shapechanger
// G* : gender tag is 2 characters standard, but can be modified to 4 (or unlimited with a custom tag in quotations (""))
// L* : length tag is very variable, either being generalized with the usual symbols (+, -, !, ~, ^) or being specified with units. It also gives five options to specify which limb, so this will be tough.
// W* : width tag is pretty simple, only using the standard symbols
// T* : weight tag is also variable, with either standard symbols or several different specific units
// P* : Appendages look simple, but can get pretty complicated. technically it can just keep going, and the modifiers add a lot of complexity with 6 different modifiers
// Sk* : Skin type tag is fairly simple, but adds a lot of complexity in allowing specific limbs to be selected
// C* : Colouration is probably the most complex tag, with a fuck ton of color options, on top of a fuck ton of modifiers, on top of limb specification. do this is parts, seperating color, modifiers, further modifiers, and limbs (+-^_'%!|=:*@\/#&>,) <- included symbols, + alphabet
// B* : Breath weapon is pretty simple, with just a few modifiers. unfortunately one of those lets you add multiple breath weapons soooooo. it also gives a custom ("") option (|#/")
// A* : age tag is fairly simple, but does allow some specification of IRL vs virtual age which adds complexity (()rv)
// Fr* : fruitiness tag is pretty simple, biggest complexity addition is the option for custom ("")
// N* : native land, super simple, just a few tags
// M* : mating status tag is fairly complex, with a whole lotta modifiers. it's not *too* crazy though, it shouldn't get super long
// O* : offspring tag is pretty simple, a few modifiers and one option for a custom number
// H* : hoard size tag is super simple, just the defaults
// $* : monetary philosophy tag is also super simple, still just the defaults
// F* : diet tag has several options, and enough customizability it may be annoying
// R* : reality index, another super simple tag. just the basics
// Ac* : activity index, another simple one
// J* : humour index, a few modifiers but pretty simple
// S* : social life, another simple one
// U* : ubiquity, simple tag
// I* : irritability, pretty simple, single modifier
// V* : magical ability, fairly simple with one custom modifier
// Q* : psy-power, also fairly simple with one custom
// Tc* : technology, simple with one custom.
// E* : huggability, simple with one modifier
// Df* : dragon-friend, optional tag and simple.

// species tags *can* involve square and curly brackets,. one other tag uses parentheses

// HEX CHARACTER CODES: "^"="5E" "+"="2B" "-"="2D" "!"="21" "~"="7E" "/"="2F" "?"="3F"
// Completion: 28/28
// approximate progress: 98%

const speciesArray = ['D','Da','Dc','Dd','De','Df','Dh','Di','Dl','Dp','Dr','Ds','Dss','Dsf','Dt','Du','Dv','Dw','Dy','H','Ha','Hd','He','Hew','Hf','Hi','Hg','Hh','Hk','Hy','Ht','Hw','H?','A','Af','An','As','At','B','Bc','Be','Bh','Bp','Br','C','Cc','Cl','Cs','S','Sa','Sc','Sp','Ss','St','Sv','E','Ed','Et','F','Fh','Ff','Ffg','Fft','Fs','I','Ia','Ib','If','Il','Im','Iu','L','Lr','Ll','Lg','Ln','Lm','Lf','Ls','Lt','Lu','M','Ma','Mb','Mc','Mcd','Mcf','Mcw','Mf','Mfb','Mfc','Mfd','Mfp','Mfps','Mfl','Mfx','Mfa','Mfu','Mft','Mh','Mm','Mmg','Mp','Mpf','Mpm','Mr','Mrg','Mrh','Mrm','Mrr','Mrs','Mw','Mwd','Mwk','Mwp','O','Oc','Ol','Oo','Oy','Os','Y','Yc','Yy','Yg','Yh','Ym','Yp','Yt','Ys','P','Pc','Pf','Pt','Pta','Pte','Pto','R','Ra','Rc','Rg','Rk','Rl','Rn','Rsnf','Rs','Rt','Q','Qa','Qd','Qg','Qi','Qp','Qs','Qw','U','Ug','Uv','Uz','?'];

let codeOffset = 1; // offset for the code array
let code = "";

function standardizeDC(code) {
    if (code.match(" M")) {
        code = code.slice(0,code.indexOf(" M")+1).replaceAll(" ", "") + code.slice(code.indexOf(" M")+1,code.indexOf("O")-1) + code.slice(code.indexOf("O")-1).replaceAll(" ", ""); // remove all spaces
    }else {
        code = code.replaceAll(" ", "")
    }
    code = code.slice(4) // remove "DC2." (check still works below cause it bypasses the variable)
    code = code.split(/(?=[A-Z])/g) // seperate into an array based on capital letters
    return code;
}


/* ENCODING BLOCKS */
function encodeDC() { // this function is a lot easier cause i can limit the options a lot more. decoding requires accounting for *every* variable, which is a fuck of a lot. pretty much just reading a buncha inputs

}

{ // encode selects
function speciesSelect() {
    let dropdownB = document.getElementById('subspeciesDropdown')
    document.getElementById('subspeciesDropdown').style.display = 'inline';
    document.getElementsByClassName('multiSpecies')[0].textContent = 'Between'
    document.getElementsByClassName('multiSpecies')[2].textContent = 'And'
    for (i=0; i<document.getElementsByClassName('multiSpecies').length; i++) {
        document.getElementsByClassName('multiSpecies')[i].style.display = 'none';
    }
    switch (document.getElementById('speciesSelect').value) {
        case 'dragon':
            dropdownB.innerHTML = `<option value="D" selected>OPTIONAL SUBSPECIES</option><option value="Da">Amphitere</option><option value="Dc">Draconid</option><option value="Dd">Dragonette</option><option value="De">Eastern</option><option value="Df">Faeries</option><option value="Dh">Hydra</option><option value="Di">Dimar</option><option value="Dl">Dracolich</option><option value="Dp">Pernese</option><option value="Dr">Turtle</option><option value="Ds">Serpent</option><option value="Dss">Sea Serpent</option><option value="Dfs">Fire Serpent</option><option value="Dt">Tarrasque</option><option value="Du">Pseudodragon</option><option value="Dv">Wyvern</option><option value="Dw">Western</option><option value="Dy">Wyrm</option>`;
            break;
        case 'humanoid':
            dropdownB.innerHTML = `<option value="H" selected>OPTIONAL SUBSPECIES</option><option value="Ha">Ape</option><option value="Hd">Dwarf</option><option value="He">Elf</option><option value="Hew">Wood Elf</option><option value="Hf">Fairie</option><option value="Hi">Giant</option><option value="Hg">Gnome</option><option value="Hh">Hobbit</option><option value="Hk">Kender</option><option value="Hy">Nymph</option><option value="Ht">Troll</option><option value="Hw">Wolfman</option><option value="H?">Unknown (Anthro)</option>`;
            break;
        case 'amphibian':
            dropdownB.innerHTML = `<option value="A" selected>OPTIONAL SUBSPECIES</option><option value="Af">Frog</option><option value="An">Newt</option><option value="As">Salamander</option><option value="At">Toad</option>`;
            break;
        case 'bird':
            dropdownB.innerHTML = `<option value="B" selected>OPTIONAL SUBSPECIES</option><option value="Bc">Crow</option><option value="Be">Eagle</option><option value="Bh">Hawk</option><option value="Bp">Pheonix</option><option value="Br">Raven</option>`;
            break;
        case 'crustacean':
            dropdownB.innerHTML = `<option value="C" selected>OPTIONAL SUBSPECIES</option><option value="Cc">Crab</option><option value="Cl">Lobster</option><option value="Cs">Shrimp</option>`;
            break;
        case 'dinosaur':
            dropdownB.innerHTML = `<option value="S" selected>OPTIONAL SUBSPECIES</option><option value="Sa">Allosaur</option><option value="Sc">Triceratops</option><option value="Sp">Apatosaur</option><option value="Ss">Stegosaur</option><option value="St">Tyrannosaur</option><option value="Sv">Velociraptor</option>`;
            break;
        case 'extraterrestrial':
            dropdownB.innerHTML = `<option value="E" selected>OPTIONAL SUBSPECIES</option><option value="Ed">Dalek</option><option value="Et">Tribble</option>`;
            break;
        case 'fish':
            dropdownB.innerHTML = `<option value="F" selected>OPTIONAL SUBSPECIES</option><option value="Fh">Sea Horse</option><option value="Ff">Freshwater Fish</option><option value="Ffg">Goldfish</option><option value="Fft">Trout</option><option value="Fs">Shark</option>`;
            break;
        case 'insect':
            dropdownB.innerHTML = `<option value="I" selected>OPTIONAL SUBSPECIES</option><option value="Ia">Ant</option><option value="Ib">Beetle</option><option value="If">Fly</option><option value="Il">Locust</option><option value="Im">Moth</option><option value="Iu">Butterfly</option>`;
            break;
        case 'legend':
            dropdownB.innerHTML = `<option value="L" selected>OPTIONAL SUBSPECIES</option><option value="Lr">Gargoyle</option><option value="Ll">Gremlin</option><option value="Lg">Griffon</option><option value="Ln">Manticore</option><option value="Lm">Mermaid</option><option value="Lf">Salamander</option><option value="Ls">Sprite</option><option value="Lt">Treefolk</option><option value="Lu">Unicorn</option>`;
            break;
        case 'mammal':
            dropdownB.innerHTML = `<option value="M" selected>OPTIONAL SUBSPECIES</option><option value="Ma">Bat</option><option value="Mb">Bear</option><option value="Mc">Canine</option><option value="Mcd">Domestic Dog</option><option value="Mcf">Fox</option><option value="Mcw">Wolf</option><option value="Mf">Feline</option><option value="Mfb">Black Panther</option><option value="Mfc">Cheetah</option><option value="Mfd">Domestic Cat</option><option value="Mfp">Leopard</option><option value="Mfps">Snow Leopard</option><option value="Mfl">Lion</option><option value="Mfx">Lynx</option><option value="Mfa">Panther</option><option value="Mfu">Puma</option><option value="Mft">Tiger</option><option value="Mh">Horse</option><option value="Mm">Monkey</option><option value="Mmg">Gibbon</option><option value="Mp">Polecat</option><option value="Mpf">Ferret</option><option value="Mpm">Mink</option><option value="Mr">Rodent</option><option value="Mrg">Gerbil</option><option value="Mrh">Hamster</option><option value="Mrm">Mouse</option><option value="Mrr">Rat</option><option value="Mrs">Squirrel</option><option value="Mw">Whale</option><option value="Mwd">Dolphin</option><option value="Mwk">Orca</option><option value="Mwp">Porpoise</option>`;
            break;
        case 'mollusc':
            dropdownB.innerHTML = `<option value="O" selected>OPTIONAL SUBSPECIES</option><option value="Oc">Cuttlefish</option><option value="Ol">Limpet</option><option value="Oo">Octopus</option><option value="Oy">Oyster</option><option value="Os">Snail</option>`;
            break;
        case 'mythical':
            dropdownB.innerHTML = `<option value="Y" selected>OPTIONAL SUBSPECIES</option><option value="Yc">Centaur</option><option value="Yy">Cyclops</option><option value="Yg">Golem</option><option value="Yh">Hellhound</option><option value="Ym">Minotaur</option><option value="Yp">Pegasus</option><option value="Yt">Satyr</option><option value="Ys">Sphinx</option>`;
            break;
        case 'plant':
            dropdownB.innerHTML = `<option value="P" selected>OPTIONAL SUBSPECIES</option><option value="Pc">Cacti</option><option value="Pf">Fungii</option><option value="Pt">Tree</option><option value="Pta">Ash Tree</option><option value="Pte">Elm Tree</option><option value="Pto">Oak Tree</option>`;
            break;
        case 'reptile':
            dropdownB.innerHTML = `<option value="R" selected>OPTIONAL SUBSPECIES</option><option value="Ra">Alligator</option><option value="Rc">Chameleon</option><option value="Rg">Gecko</option><option value="Rk">Komodo Dragon</option><option value="Rl">Lizard</option><option value="Rn">Skink</option><option value="Rnf">Fire Skink</option><option value="Rs">Snake</option><option value="Rt">Turtle</option>`; // fun fact: "skink" is actually mistyped as "Pn" on the archive. i'm just assuming this is a typo and correcting it here. typing all this out without fucking up is difficult. pls point out my spelling mistakes. they could break shit.
            break;
        case 'spirit':
            dropdownB.innerHTML = `<option value="Q" selected>OPTIONAL SUBSPECIES</option><option value="Qa">Angel</option><option value="Qd">Devil</option><option value="Qg">Ghost</option><option value="Qi">Imp</option><option value="Qp">Poltergeist</option><option value="Qs">Spectre</option><option value="Qw">Will-o-the-Wisp</option>`;
            break;
        case 'undead':
            dropdownB.innerHTML = `<option value="U" selected>OPTIONAL SUBSPECIES</option><option value="Ug">Ghoul</option><option value="Uv">Vampire</option><option value="Uz">Zombie</option>`;
            break;
        case 'shapechanger':
            dropdownB.innerHTML = `<option value="~" selected>OPTIONAL SUBSPECIES</option>`;
            document.getElementById('subspeciesDropdown').style.display = 'none';
            for (i=0; i<document.getElementsByClassName('multiSpecies').length; i++) {
                document.getElementsByClassName('multiSpecies')[i].style.display = 'inline';
            }
            break;
        case 'unknown':
            dropdownB.innerHTML = `<option value="?" selected></option>`;
            break;
        case 'shaped':
            dropdownB.innerHTML = `<option value="^" selected>OPTIONAL SUBSPECIES</option>`;
            document.getElementById('subspeciesDropdown').style.display = 'none';
            for (i=0; i<document.getElementsByClassName('multiSpecies').length; i++) {
                document.getElementsByClassName('multiSpecies')[i].style.display = 'inline';
            }
            break;
        case 'formtrapped':
            dropdownB.innerHTML = `<option value="[" selected>OPTIONAL SUBSPECIES</option>`;
            document.getElementById('subspeciesDropdown').style.display = 'none';
            document.getElementsByClassName('multiSpecies')[0].textContent = 'I am a'
            document.getElementsByClassName('multiSpecies')[2].textContent = 'In a'
            for (i=0; i<document.getElementsByClassName('multiSpecies').length; i++) {
                document.getElementsByClassName('multiSpecies')[i].style.display = 'inline';
            }
            break;
        case 'crossed':
            dropdownB.innerHTML = `<option value="+" selected>OPTIONAL SUBSPECIES</option>`;
            document.getElementById('subspeciesDropdown').style.display = 'none';
            for (i=0; i<document.getElementsByClassName('multiSpecies').length; i++) {
                document.getElementsByClassName('multiSpecies')[i].style.display = 'inline';
            }
            break;
    }
}

function genderSelect() {
    // array!! gotta make space for custom too, but array!!
    const genderArray = ['Gf','Gh','Gm','Gn','Gp','G~','G?']
}

function lengthSelect() {

}

function widthSelect() {

}

function weightSelect() {

}

function appendageSelect() {

}

function skinSelect() {

}

function colourSelect() {
 // dis gonna suck :(
}

function breathSelect() {

}

function ageSelect() {

}

function fruitSelect() {

}

function habitatSelect() {

}

function mateSelect() {

}

function offspringSelect() {

}
function hoardSelect() {

}

function monetarySelect() {

}

function dietSelect() {

}

function realitySelect() {

}

function activitySelect() {

}

function humourSelect() {

}

function socialSelect() {

}

function ubiquitySelect() {

}

function irritabilitySelect() {

}

function magicSelect() {

}

function psySelect() {

}

function techSelect() {

}

function hugSelect() {

}

function friendSelect() {

}
}

/* DECODING BLOCKS */
function decodeDC(text) { // yeah this is a bit of an overscoped project, but at least i'll use it later :crying thumbs up:
    let output = "";
    code = text;
    console.log("code array: ")
    console.log(code);
    if (document.getElementById("codeInput").value.slice(0, 4) == "DC2.") { // make sure it's dragon code v2
        output += checkSpecies(code[0]);
        for (r=codeOffset; r<code.length; r++) {
            if (code[r].slice(0,1) == "G") output += checkGender(code[r]) + ", ";
            if (code[r].slice(0,1) == "L") output += checkLength(code[r]) + ", ";
            if (code[r].slice(0,1) == "W") output += checkWidth(code[r]);
            if (code[r].slice(0,1) == "T" && code[r].slice(0,2) != "Tc") output += checkWeight(code[r]);
            if (code[r].slice(0,1) == "P") output += checkAppendages(code[r]);
            if (code[r].slice(0,2) == "Sk") output += checkSkin(code[r]).trim() + ", ";
            if (code[r].slice(0,1) == "C") {
                output += checkColour(code[r]);
                if (output.slice(-3) == " + ") output = output.slice(0,-3) + ", ";
                else output = output.slice(0,-1) + ", ";
            }
            if (code[r].slice(0,1) == "B") output += "Breathes " +  checkBreath(code[r]).trimEnd() + ", ";
            if (code[r].slice(0,1) == "A" && code[r].slice(0,2) != "Ac") output += checkAge(code[r] + ", ");
            if (code[r].slice(0,2) == "Fr") output += checkFruit(code[r]);
            if (code[r].slice(0,1) == "N") output += checkHabitat(code[r]);
            if (code[r].slice(0,1) == "M") output += checkMate(code[r]) + ", ";
            if (code[r].slice(0,1) == "O") output += checkOffspring(code[r]);
            if (code[r].slice(0,1) == "H") output += checkHoard(code[r]) + ", ";
            if (code[r].slice(0,1) == "$") output += checkMonetary(code[r]) + ", ";
            if (code[r].slice(0,1) == "F" && code[r].slice(0,2) != "Fr") output += checkDiet(code[r]) + ", ";
            if (code[r].slice(0,1) == "R") output += checkReality(code[r]);
            if (code[r].slice(0,2) == "Ac") output += checkActivity(code[r]);
            if (code[r].slice(0,1) == "J") output += checkHumour(code[r]) + ", ";
            if (code[r].slice(0,1) == "S" && code[r].slice(0,2) != "Sk") output += checkSocial(code[r]);
            if (code[r].slice(0,1) == "U") output += checkUbiquity(code[r]);
            if (code[r].slice(0,1) == "I") output += checkIrritability(code[r]) + ", ";
            if (code[r].slice(0,1) == "V") output += checkMagic(code[r]) + ", ";
            if (code[r].slice(0,1) == "Q") output += checkPsy(code[r]) + ", ";
            if (code[r].slice(0,2) == "Tc") output += checkTech(code[r]) + ", ";
            if (code[r].slice(0,1) == "E") output += checkHug(code[r]) + ", ";
            if (code[r].slice(0,2) == "Df") output += checkFriend(code[r]);
        }
    }else {
        output = "Not dragon code / Incorrectly formatted code / Unsupported so far. check link at top of page"
    }
    if (output.trimEnd().slice(-1) == ",") output=output.trimEnd().slice(0,-1) + "."
    document.getElementById("translatedOutput").textContent = output;
    codeOffset = 1;
}

// actually i'm just gonna seperate each tag into it's own function. why not, fuck it we ball, etc etc.

// 5 days later, i can not *imagine* how horrible decodeDC() would look if I didn't seperate out all the tag checks. it already looks like shit, but it could be *so* much worse.
{ // decode checks
function checkSpecies(text) { // complete // needs multi support
    let output = "";
    if (text.match(/[\x7B]/g)) { // multiple descriptions {}
        output += "Multiple described shapes are not supported yet." // TODO: for complex (meaning, multiple described with "{}"), i can prolly just recursively call decodeDC()
    }else if (text.match(/\x5B/g)) { // form trapped []
        output += checkSpecies(text.slice(0,-1)).slice(0,-2) + " in a " + checkSpecies(code[1].slice(0,-1)).slice(0,-2) + " body, ";
        codeOffset ++;
    }else if (text.match(/\x7E/g)) { // shapechanger ~
        if (text == "~" && code[1].slice(0,1) == "G") {
            output += "Shapechanger, "
        }else {
            output += "Changes shape between a " + checkSpecies(code[0].slice(0,-1)).slice(0,-2) + " and a " + checkSpecies(code[0]);
            codeOffset += 2;
        }
    }else if (text.match(/\x5E/g)) { // shaped ^
        output += checkSpecies(code[0].slice(0,-1)).slice(0,-2) + " with " + checkSpecies(code[1]).slice(0,-2) + " features, "
        codeOffset ++;
    }else if (text.match(/\x2B/g)) { // crossed +
        output += "Cross between a " + checkSpecies(code[0].slice(0,-1)).slice(0,-2) + " and a " + checkSpecies(code[1]);
        codeOffset ++;
    }else {
        switch(text) {
            case speciesArray[0]:
                    output += "Dragon, ";
                    break;
            case speciesArray[1]:
                    output += "Amphitere, ";
                    break;
            case speciesArray[2]:
                    output += "Draconid, ";
                    break;
            case speciesArray[3]:
                    output += "Dragonette, ";
                    break;
            case speciesArray[4]:
                    output += "Eastern Dragon, ";
                    break;
            case speciesArray[5]:
                    output += "Faerie Dragon, ";
                    break;
            case speciesArray[6]:
                    output += "Hydra, ";
                    break;
            case speciesArray[7]:
                    output += "Dimar, ";
                    break;
            case speciesArray[8]:
                    output += "Dracolich, ";
                    break;
            case speciesArray[9]:
                    output += "Pernese Dragon, ";
                    break;
            case speciesArray[10]:
                    output += "Turtle Dragon, ";
                    break;
            case speciesArray[11]:
                    output += "Serpent, ";
                    break;
            case speciesArray[12]:
                    output += "Sea Serpent, ";
                    break;
            case speciesArray[13]:
                    output += "Fire Serpent, ";
                    break;
            case speciesArray[14]:
                    output += "Tarrasque, ";
                    break;
            case speciesArray[15]:
                    output += "Pseudodragon, ";
                    break;
            case speciesArray[16]:
                    output += "Wyvern, ";
                    break;
            case speciesArray[17]:
                    output += "Western Dragon, ";
                    break;
            case speciesArray[18]:
                    output += "Wyrm, ";
                    break;
            case speciesArray[19]:
                    output += "Human, ";
                    break;
            case speciesArray[20]:
                    output += "Humanoid Ape, ";
                    break;
            case speciesArray[21]:
                    output += "Dwarf, ";
                    break;
            case speciesArray[22]:
                    output += "Elf, ";
                    break;
            case speciesArray[23]:
                    output += "Wood Elf, ";
                    break;
            case speciesArray[24]:
                    output += "Fairie, ";
                    break;
            case speciesArray[25]:
                    output += "Giant, ";
                    break;
            case speciesArray[26]:
                    output += "Gnome, ";
                    break;
            case speciesArray[27]:
                    output += "Hobbit, ";
                    break;
            case speciesArray[28]:
                    output += "Kender, ";
                    break;
            case speciesArray[29]:
                    output += "Nymph, ";
                    break;
            case speciesArray[30]:
                    output += "Troll, ";
                    break;
            case speciesArray[31]:
                    output += "Wolfman, ";
                    break;
            case speciesArray[32]:
                    output += "Unknown (Anthropomorphic), ";
                    break;
            case speciesArray[33]:
                    output += "Amphibian, ";
                    break;
            case speciesArray[34]:
                    output += "Frog, ";
                    break;
            case speciesArray[35]:
                    output += "Newt, ";
                    break;
            case speciesArray[36]:
                    output += "Salamander, ";
                    break;
            case speciesArray[37]:
                    output += "Toad, ";
                    break;
            case speciesArray[38]:
                    output += "Bird, ";
                    break;
            case speciesArray[39]:
                    output += "Crow, ";
                    break;
            case speciesArray[40]:
                    output += "Eagle, ";
                    break;
            case speciesArray[41]:
                    output += "Hawk, ";
                    break;
            case speciesArray[42]:
                    output += "Pheonix, ";
                    break;
            case speciesArray[43]:
                    output += "Raven, ";
                    break;
            case speciesArray[44]:
                    output += "Crustacean, ";
                    break;
            case speciesArray[45]:
                    output += "Crab, ";
                    break;
            case speciesArray[46]:
                    output += "Lobster, ";
                    break;
            case speciesArray[47]:
                    output += "Shrimp, ";
                    break;
            case speciesArray[48]:
                    output += "Dinosaur, ";
                    break;
            case speciesArray[49]:
                    output += "Allosaur, ";
                    break;
            case speciesArray[50]:
                    output += "Triceratops, ";
                    break;
            case speciesArray[51]:
                    output += "Apatosaur, ";
                    break;
            case speciesArray[52]:
                    output += "Stegosaur, ";
                    break;
            case speciesArray[53]:
                    output += "Tyrannosaur, ";
                    break;
            case speciesArray[54]:
                    output += "Velociraptor, ";
                    break;
            case speciesArray[55]:
                    output += "Extraterrestrial, ";
                    break;
            case speciesArray[56]:
                    output += "Dalek, ";
                    break;
            case speciesArray[57]:
                    output += "Tribble, ";
                    break;
            case speciesArray[58]:
                    output += "Fish, ";
                    break;
            case speciesArray[59]:
                    output += "Sea horse, ";
                    break;
            case speciesArray[60]:
                    output += "Freshwater fish, ";
                    break;
            case speciesArray[61]:
                    output += "Goldfish, ";
                    break;
            case speciesArray[62]:
                    output += "Trout, ";
                    break;
            case speciesArray[63]:
                    output += "Shark, ";
                    break;
            case speciesArray[64]:
                    output += "Insect, ";
                    break;
            case speciesArray[65]:
                    output += "Ant, ";
                    break;
            case speciesArray[66]:
                    output += "Beetle, ";
                    break;
            case speciesArray[67]:
                    output += "Flies, ";
                    break;
            case speciesArray[68]:
                    output += "Locust, ";
                    break;
            case speciesArray[69]:
                    output += "Moth, ";
                    break;
            case speciesArray[70]:
                    output += "Butterfly, ";
                    break;
            case speciesArray[71]:
                    output += "Legend, ";
                    break;
            case speciesArray[72]:
                    output += "Gargoyles, ";
                    break;
            case speciesArray[73]:
                    output += "Gremlin, ";
                    break;
            case speciesArray[74]:
                    output += "Griffon, ";
                    break;
            case speciesArray[75]:
                    output += "Manticore, ";
                    break;
            case speciesArray[76]:
                    output += "Mermaid, ";
                    break;
            case speciesArray[77]:
                    output += "Legendary Salamander, ";
                    break;
            case speciesArray[78]:
                    output += "Sprite, ";
                    break;
            case speciesArray[79]:
                    output += "Treefolk, ";
                    break;
            case speciesArray[80]:
                    output += "Unicorn, ";
                    break;
            case speciesArray[81]:
                    output += "Mammal, ";
                    break;
            case speciesArray[82]:
                    output += "Bat, ";
                    break;
            case speciesArray[83]:
                    output += "Bear, ";
                    break;
            case speciesArray[84]:
                    output += "Canine, ";
                    break;
            case speciesArray[85]:
                    output += "Dog, ";
                    break;
            case speciesArray[86]:
                    output += "Fox, ";
                    break;
            case speciesArray[87]:
                    output += "Wolf, ";
                    break;
            case speciesArray[88]:
                    output += "Feline, ";
                    break;
            case speciesArray[89]:
                    output += "Black Panther, ";
                    break;
            case speciesArray[90]:
                    output += "Cheetah, ";
                    break;
            case speciesArray[91]:
                    output += "Cat, ";
                    break;
            case speciesArray[92]:
                    output += "Leopard, ";
                    break;
            case speciesArray[93]:
                    output += "Snow Leopard, ";
                    break;
            case speciesArray[94]:
                    output += "Lion, ";
                    break;
            case speciesArray[95]:
                    output += "Lynx, ";
                    break;
            case speciesArray[96]:
                    output += "Panther, ";
                    break;
            case speciesArray[97]:
                    output += "Puma, ";
                    break;
            case speciesArray[98]:
                    output += "Tiger, ";
                    break;
            case speciesArray[99]:
                    output += "Horse, ";
                    break;
            case speciesArray[100]:
                    output += "Monkey, ";
                    break;
            case speciesArray[101]:
                    output += "Gibbon, ";
                    break;
            case speciesArray[102]:
                    output += "Polecat, ";
                    break;
            case speciesArray[103]:
                    output += "Ferret, ";
                    break;
            case speciesArray[104]:
                    output += "Mink, ";
                    break;
            case speciesArray[105]:
                    output += "Rodent, ";
                    break;
            case speciesArray[106]:
                    output += "Gerbil, ";
                    break;
            case speciesArray[107]:
                    output += "Hamster, ";
                    break;
            case speciesArray[108]:
                    output += "Mice, ";
                    break;
            case speciesArray[109]:
                    output += "Rat, ";
                    break;
            case speciesArray[110]:
                    output += "Squirrel, ";
                    break;
            case speciesArray[111]:
                    output += "Whale, ";
                    break;
            case speciesArray[112]:
                    output += "Dolphin, ";
                    break;
            case speciesArray[113]:
                    output += "Killer Whale, ";
                    break;
            case speciesArray[114]:
                    output += "Porpoise, ";
                    break;
            case speciesArray[115]:
                    output += "Mollusc, ";
                    break;
            case speciesArray[116]:
                    output += "Cuttlefish, ";
                    break;
            case speciesArray[117]:
                    output += "Limpet, ";
                    break;
            case speciesArray[118]:
                    output += "Octopus, ";
                    break;
            case speciesArray[119]:
                    output += "Oyster, ";
                    break;
            case speciesArray[120]:
                    output += "Snail, ";
                    break;
            case speciesArray[121]:
                    output += "Mythical, ";
                    break;
            case speciesArray[122]:
                    output += "Centaur, ";
                    break;
            case speciesArray[123]:
                    output += "Cyclopses, ";
                    break;
            case speciesArray[124]:
                    output += "Golem, ";
                    break;
            case speciesArray[125]:
                    output += "Hellhound, ";
                    break;
            case speciesArray[126]:
                    output += "Minotaur, ";
                    break;
            case speciesArray[127]:
                    output += "Pegasi, ";
                    break;
            case speciesArray[128]:
                    output += "Satyr, ";
                    break;
            case speciesArray[129]:
                    output += "Sphinx, ";
                    break;
            case speciesArray[130]:
                    output += "Plant, ";
                    break;
            case speciesArray[131]:
                    output += "Cacti, ";
                    break;
            case speciesArray[132]:
                    output += "Fungii, ";
                    break;
            case speciesArray[133]:
                    output += "Tree, ";
                    break;
            case speciesArray[134]:
                    output += "Ash Tree, ";
                    break;
            case speciesArray[135]:
                    output += "Elm Tree, ";
                    break;
            case speciesArray[136]:
                    output += "Oak Tree, ";
                    break;
            case speciesArray[137]:
                    output += "Reptile, ";
                    break;
            case speciesArray[138]:
                    output += "Alligator, ";
                    break;
            case speciesArray[139]:
                    output += "Chameleon, ";
                    break;
            case speciesArray[140]:
                    output += "Gecko, ";
                    break;
            case speciesArray[141]:
                    output += "Komodo Dragon, ";
                    break;
            case speciesArray[142]:
                    output += "Lizard, ";
                    break;
            case speciesArray[143]:
                    output += "Skink, ";
                    break;
            case speciesArray[144]:
                    output += "Fire Skink, ";
                    break;
            case speciesArray[145]:
                    output += "Snake, ";
                    break;
            case speciesArray[146]:
                    output += "Turtle, ";
                    break;
            case speciesArray[147]:
                    output += "Spirit, ";
                    break;
            case speciesArray[148]:
                    output += "Angel, ";
                    break;
            case speciesArray[149]:
                    output += "Devil, ";
                    break;
            case speciesArray[150]:
                    output += "Ghost, ";
                    break;
            case speciesArray[151]:
                    output += "Imp, ";
                    break;
            case speciesArray[152]:
                    output += "Poltergeist, ";
                    break;
            case speciesArray[153]:
                    output += "Spectre, ";
                    break;
            case speciesArray[154]:
                    output += "Will-o-the-wisp, ";
                    break;
            case speciesArray[155]:
                    output += "Undead, ";
                    break;
            case speciesArray[156]:
                    output += "Ghoul, ";
                    break;
            case speciesArray[157]:
                    output += "Vampire, ";
                    break;
            case speciesArray[158]:
                    output += "Zombie, ";
                    break;
            case speciesArray[159]:
                    output += "Unknown species, ";
                    break;
            default:
                    output += `Species tag: ${standardizeDC(document.getElementById("codeInput").value)[0]}, no species matched, failure somewhere. `;
                    break;
        }
    }
    return output;
}

function checkGender(text) { // complete
    let gender = "";
    console.log("checkGender called with: >" + text + "<")
    if (text.match(/\x3E/g)) { // > /x to y
        gender += checkGender(text.slice(1,text.indexOf('>')-1)) + " to " + checkGender(text.slice(text.indexOf('>')+1))
    }else if (text.match(/\x2F/g)) { // / (y in x body)
        gender += checkGender(text.slice(1,text.indexOf('/')-1)) + " in a " + checkGender(text.slice(text.indexOf('/')+1)) + " body"
    }else {
        switch (text) {
            case "f":
                gender += "Female";
                break;
            case "h":
                gender += "Hermaphrodite";
                break;
            case "m":
                gender += "Male";
                break;
            case "n":
                gender += "Neuter";
                break;
            case "p":
                gender += "Pseudo-hermaphrodite";
                break;
            case "~":
                gender += "Variable gender";
                break;
            case "?":
                gender += "Unknown gender";
                break;
            default:
                gender = text.slice(text.indexOf('"')+1,).replaceAll('"', '')
        }
    }
    return gender;
}

function checkLength(text) { // complete
    let length = "";
    console.log(text)
    if (text.match(/[alntw]/g)) {
        let preLengthArray = text.split(/(?![alntw])/g)
        let lengthArray = [];
        for (k=0; k<preLengthArray.length; k++) {
            if (preLengthArray[k].length>1) lengthArray.push(preLengthArray[k])
        }
        length += checkLength(text.slice(0,text.lastIndexOf(text.match(/i|f|y|c|m|k|\x21|\x7E|\x5E|\x2B|\x2D/).pop())+1))
        for (j=0; j<lengthArray.length; j++) {
            length += " " + checkLength("L" + lengthArray[j].slice(0,-1) + text.match(/[ifycmk]/));
            switch(lengthArray[j].slice(-1)) {
                case "a":
                    length += " arms"
                    break;
                case "l":
                    length += " legs"
                    break;
                case "n":
                    length += " neck and head"
                    break;
                case "t":
                    length += " tail"
                    break;
                case "w":
                    length += " wingspan"
                    break;
            }
        }
    }else if (text.match(/\d/g)) {
        switch (text.slice(-1)) {
            case "i":
                length += text.slice(1,-1) + " inches long";
                break;
            case "f":
                length += text.slice(1,-1) + " feet long";
                break;
            case "y":
                length += text.slice(1,-1) + " yards long";
                break;
            case "c":
                length += text.slice(1,-1) + " centimeters long";
                break;
            case "m":
                length += text.slice(1,-1) + " meters long";
                break;
            case "k":
                length += text.slice(1,-1) + " kilometers long";
                break;
            default:
                length += "Incorrect units. ";
                break;
        }
    }else {
        switch (text) {
            case "L+++!":
                length += "Celestial length";
                break;
            case "L+++":
                length += "Mistaken for mountain ranges";
                break;
            case "L++":
                length += "Can't see own tail on a foggy day";
                break;
            case "L+":
                length += "Godzilla-sized";
                break;
            case "L":
                length += "Draco-sized";
                break;
            case "L-":
                length += "Human-sized";
                break;
            case "L--":
                length += "Dog-sized";
                break;
            case "L---":
                length += "Pocket dragon-sized";
                break;
            case "L---!":
                length += "Microscopic length";
                break;
            case "L~":
                length += "Variable length";
                break;
            case "L^":
                length += "One-dragon-sized";
                break;
        }
    }
    return length;
}

function checkWidth(text) { // complete
    let width = "";
    switch (text) {
        case "W+++!":
            width += "I am Athelind! My belly is now several galaxies wide ... while I'm only a few hundred feet long!, "; // descriptions yoinked straight from the dragon code v2.6
            break;
        case "W+++":
            width += "Planets have been known to crack in half with my arrival!, ";
            break;
        case "W++":
            width += "My digestion of food has been known to cause earthquakes, ";
            break;
        case "W+":
            width += "I move by rolling. Flying has always been an effort for me, ";
            break;
        case "W":
            width += "What can I say ... I'm normal, except for a few feasts here or there, ";
            break;
        case "W-":
            width += "I'm slightly on the slim side!, ";
            break;
        case "W--":
            width += "Ever heard of serpentine?, ";
            break;
        case "W---":
            width += "Whoah! Whaddaya mean I look like a long string with wings?, ";
            break;
        case "W---!":
            width += "I'm one-dimensional - all length and no width or depth. Just one long super-string!, ";
            break;
        case "W~":
            width += "Variable width, ";
            break;
    }
    return width;
}

function checkWeight(text) { // complete
    let weight = "";
    if (text.match(/\d/g)) {
        switch (text.slice(-1)) {
            case "c":
                weight += text.slice(1,-1) + " hundredweight, ";
                break;
            case "g":
                weight += text.slice(1,-1) + " grams, ";
                break;
            case "k":
                weight += text.slice(1,-1) + " kilograms, ";
                break;
            case "l":
                weight += text.slice(1,-1) + " pounds, ";
                break;
            case "o":
                weight += text.slice(1,-1) + " ounces, ";
                break;
            case "s":
                weight += text.slice(1,-1) + " stones, ";
                break;
            case "t":
                weight += text.slice(1,-1) + " tons, ";
                break;
            default:
                weight += "Incorrect units. ";
                break;
        }
    }else {
        switch (text) {
            case "T+++!":
                weight += "Black Hole, ";
                break;
            case "T+++":
                weight += "Massive, ";
                break;
            case "T++":
                weight += "Obese, ";
                break;
            case "T+":
                weight += "Overweight, ";
                break;
            case "T":
                weight += "Normal, ";
                break;
            case "T-":
                weight += "Underweight, ";
                break;
            case "T--":
                weight += "Buoyant, ";
                break;
            case "T---":
                weight += "Featherweight, ";
                break;
            case "T---!":
                weight += "Weightless, ";
                break;
        }
    }
    return weight;
}

function checkAppendages(text) { // complete
    let appendages = "";
    let appendageArray = text.split(/(?=[a-z])/g);
    for (i=1; i<appendageArray.length; i++) {
        if (appendageArray[i].match(/[aflpvw]/)) {
            if (appendageArray[i].match(/\d/)) {
                appendages += " " + appendageArray[i].slice(1) + " pairs of ";
            }else if (appendageArray[i].match(/\x5E/)) { // up carrot
                appendages += " a pair of webbed ";
            }else if (appendageArray[i].match(/\x2B/)) { // plus
                if (appendageArray[i].match(/[hkt]/)) {
                    appendages += " two ";
                }else {
                    appendages += " three ";
                }
            }else if (appendageArray[i].match(/\x2D/)) { // minus
                if (appendageArray[i].match(/[hkt]/)) {
                    appendages += " no ";
                }else {
                    appendages += " a single ";
                }
            }else if (appendageArray[i].match(/\x21/)) { // exclamation
                appendages += " many ";
            }else if (appendageArray[i].match(/\x7E/)) { // tilde
                appendages += " variable ";
            }else {
                appendages += " a pair of ";
            }
            switch (appendageArray[i].slice(0,1)) {
                case "a":
                    appendages += " arms + ";
                    break;
                case "f":
                    appendages += " fore-limbs + ";
                    break;
                case "l":
                    appendages += " legs + ";
                    break;
                case "p":
                    appendages += " fins + ";
                    break;
                case "v":
                    appendages += " horns + ";
                    break;
                case "w":
                    appendages += " wings + ";
                    break;
                case "w'":
                    appendages += " wing-limbs + ";
                    break;
            }
        }else if (appendageArray[i].match(/[hkt]/)) {
            if (appendageArray[i].match(/\d/)) {
                appendages += " " + appendageArray[i].slice(1)
                switch (appendageArray[i].slice(0,1)) {
                    case "h":
                        appendages += " heads + ";
                        break;
                    case "k":
                        appendages += " crests + ";
                        break;
                    case "t":
                        appendages += " tails + ";
                        break;
                }
            }else {
                appendages += " a ";
                switch (appendageArray[i]) {
                    case "h":
                        appendages += " head + ";
                        break;
                    case "k":
                        appendages += " crest + ";
                        break;
                    case "t":
                        appendages += " tail + ";
                        break;
                }
            }

        }
    }
    appendages = appendages.slice(0, -3) + ", ";
    return appendages;
}

function checkSkin(text) { // complete
    let skin = "";
    if (text.match(/\x2C/)) { // comma
        skinArray = text.slice(2).split(",");
        for (i=0; i<skinArray.length; i++) {
            skin += checkSkin(skinArray[i]);
            switch (skinArray[i].slice(0,-1)) {
                case "a":
                    skin += " arms + ";
                    break;
                case "b":
                    skin += " belly + ";
                    break;
                case "h":
                    skin += " head + ";
                    break;
                case "l":
                    skin += " legs + ";
                    break;
                case "n":
                    skin += " neck + ";
                    break;
                case "t":
                    skin += " tail + ";
                    break;
                case "w":
                    skin += " wings + ";
                    break;
                default:
                    skin += " + ";
            }
        }
    }else if (text == "Sk") {
        skin += " just bones..."
    }else {
        switch (text.slice(-1)) {
            case "b":
                skin += " bark ";
                break;
            case "c":
                skin += " cellulose ";
                break;
            case "e":
                skin += " exoskeleton ";
                break;
            case "f":
                skin += " feathers ";
                break;
            case "h":
                skin += " hide ";
                break;
            case "k":
                skin += " skin ";
                break;
            case "l":
                skin += " leather ";
                break;
            case "m":
                skin += " metal ";
                break;
            case "r":
                skin += " rock ";
                break;
            case "s":
                skin += " scales ";
                break;
            case "u":
                skin += " fur ";
                break;
            case "x":
                skin += " crystal ";
                break;
        }
        skin += "  ";
    }

    return skin;
}

function checkColour(text) { // complete // I ONLY SACRIFICED MY SANITY!!!!! ITS COMPLETE !!!! IVE BEEN WORKING ON THIS FOR 3 DAYS STRAIGHT!!!!! I CAN FINALLY MOVE ON!!!!
    let colour = "";
    if (text.slice(0,1) == "C") {text = text.replace("C", "");}
    if (text.slice(1).match(/\x2C/)) { // first, check to see if it's a basic or multiargument (limb) colour (2C = `,`)
        let colourArray = text.split(/(?=\x2C)/g);
        for (i=0; i<colourArray.length; i++) { // loop through all items
            colour += checkColour(colourArray[i])
            colour += "+ "
        }
    }else {
        //Add the first colour of the list
        colour += nameColour(text.split(/[\x7C\x3D\x3A\x2A\x40\x2F\x5C\x23\x26\x3E]/)[0])

        if (text.match(/[\x7C\x3D\x3A\x2A\x40\x2F\x5C\x23\x26\x3E]/g)) { // further modifiers (|=:*@/\#&>)
            //Constant for the second colour
            let imaginativeName = nameColour(text.split(/[\x7C\x3D\x3A\x2A\x40\x2F\x5C\x23\x26\x3E]/)[1]) // listen, it's 4am gimme a break
            if (text.match(/\x7C/)) { // `\`
                colour += "striped with " + imaginativeName
            }
            else if (text.match(/\x3D/)) { // `=`
                colour += "banded with " + imaginativeName
            }
            else if (text.match(/\x3A/)) { // `:`
                colour += "spotted with " + imaginativeName
            }
            else if (text.match(/\x2A/)) { // `*`
                colour += "star sprinkled with " + imaginativeName
            }
            else if (text.match(/\x40/)) { // `@`
                colour += "mottled with " + imaginativeName
            }
            else if (text.match(/\x5C/)) { // `\`
                colour += "iridescent with " + imaginativeName
            }
            else if (text.match(/\x3E/)) { // `>`
                colour += "in transition to " + imaginativeName
            }
            else if (text.match(/\x2F/)) { // `/`
                let mixArray = text.split("/");
                console.log("mixed colours: " + mixArray)
                console.log("length: " + mixArray.length)
                //English grammar, doing `and` between them all sounds weird so i'm adding `mixed with` for the first one, then the `and`s
                colour += "mixed with " + imaginativeName
                //oh fuck off. i left off the `let` and it made it an infinite loop cause it was reassigning every time
                for (let j = 2; j < mixArray.length; j++) {
                    console.log("calling mixed with " + mixArray[j])
                    console.log("J is " + j)
                    colour += "and " + nameColour(mixArray[j])
                }
                console.log("loop exited!")
            }
            else if (text.match(/\x23/)) { // `#`
                let plaidArray = text.split("#");
                colour += "plaid with " + nameColour(plaidArray[1])
                for (j=2; j<plaidArray.length; j++) {
                    colour += "and " + nameColour(plaidArray[j])
                }
            }
            else if (text.match(/\x261/)) { // `&1`
                let marbleArray = text.split(/\x261/)[1].split("&");
                colour += "marble patterned with " + nameColour(marbleArray[0])
                for (j=1; j<marbleArray.length; j++) {
                    colour += "and " + nameColour(marbleArray[j])
                }
                colour += "veins "
            }
            else if (text.match(/\x26/)) { // `&`
                let patternArray = text.split(/\x26/)[1].split(";");
                colour += "patterned with " + nameColour(patternArray[0])
                for (j=1; j<patternArray.length; j++) {
                    colour += "and " + nameColour(patternArray[j])
                }
            }
        }
        // body parts
        if (text.slice(0,2) == ",a") {colour += "arms "}
        if (text.slice(0,2) == ",b") {colour += "belly "}
        if (text.slice(0,2) == ",c") {colour += "claws "}
        if (text.slice(0,2) == ",e") {colour += "eyes "}
        if (text.slice(0,2) == ",f") {colour += "fur "}
        if (text.slice(0,2) == ",h") {colour += "head "}
        if (text.slice(0,2) == ",k") {colour += "crest "}
        if (text.slice(0,2) == ",l") {colour += "legs "}
        if (text.slice(0,2) == ",n") {colour += "neck "}
        if (text.slice(0,2) == ",p") {colour += "highlights "}
        if (text.slice(0,2) == ",s") {colour += "spines "}
        if (text.slice(0,2) == ",t") {colour += "tail "}
        if (text.slice(0,2) == ",u") {colour += "aura "}
        if (text.slice(0,2) == ",v") {colour += "horns "}
        if (text.slice(0,2) == ",w") {colour += "wings "}
    }
    return colour;
}

function nameColour(text) { // secondary colour function, complete
    console.log("COLOUR PASSED: " + text);
    // fail case: DC2.DwCbl/pu/bl-
    let colour = ""
    if (text.match(/[\x2B\x2D\x5E\x5F\x21\x27\x25]/g)) { // modifiers (+-^_'%!)
        console.log("modifier found")
        if (text.match(/\x2B/g)) {
            for (j=0; j<(text.match(/\x2B/g)).length; j++) {
                console.log("lighter")
                colour += "light ";
            }
        }
        if (text.match(/\x2D/g)) {
            for (j=0; j<(text.match(/\x2D/g)).length; j++) {
                console.log("darker")
                colour += "dark ";
            }
        }
        if (text.match(/\x5E/g)) {colour += "metallic "} // `^`
        if (text.match(/\x5F/g)) {colour += "transparent "} // `_`
        if (text.match(/\x27/g)) {colour += "liminescent "} // `'`
        if (text.match(/\x25/g)) {colour += "pearlescent "} // `%`
        if (text.match(/\x21/g)) {colour += "glittery "} // `!`
    }
    if (text.match("ag")) {colour += "silver "}
    else if (text.match("am")) {colour += "amber "}
    else if (text.match("au")) {colour += "gold "}
    else if (text.match("bk")) {colour += "black "}
    else if (text.match("bl")) {colour += "blue "}
    else if (text.match("br")) {colour += "brown "}
    else if (text.match("bs")) {colour += "brass "}
    else if (text.match("bz")) {colour += "bronze "}
    else if (text.match("ch")) {colour += "chromium "}
    else if (text.match("cu")) {colour += "copper "}
    else if (text.match("cy")) {colour += "cyan "}
    else if (text.match("eb")) {colour += "ebony "}
    else if (text.match("fs")) {colour += "flesh "}
    else if (text.match("gr")) {colour += "green "}
    else if (text.match("gy")) {colour += "grey "}
    else if (text.match("hg")) {colour += "mercury "}
    else if (text.match("in")) {colour += "indigo "}
    else if (text.match("iv")) {colour += "ivory "}
    else if (text.match("ja")) {colour += "jade "}
    else if (text.match("ma")) {colour += "magenta "}
    else if (text.match("mv")) {colour += "mauve "}
    else if (text.match("or")) {colour += "orange "}
    else if (text.match("aq")) {colour += "aquamarine "}
    else if (text.match("pi")) {colour += "pink "}
    else if (text.match("pu")) {colour += "purple "}
    else if (text.match("rb")) {colour += "rainbow "}
    else if (text.match("re")) {colour += "red "}
    else if (text.match("ta")) {colour += "tan "}
    else if (text.match("tu")) {colour += "turquoise "}
    else if (text.match("mb")) {colour += "umber "}
    else if (text.match("vi")) {colour += "violet "}
    else if (text.match("wh")) {colour += "white "}
    else if (text.match("ye")) {colour += "yellow "}
    else if (text.match("~")) {colour += "variable colour "}
    else if (text.match(/\x3F/)) {colour += "unknown colour "} // `?`
    else if (text == "") {colour += "colourless "}
    return colour
}

function checkBreath(text) { // complete
    let breath = "";
    text = text.replace("B","");
    if (text.match(/\x2F/g)) {
        let breathArray = text.split("/")
        for (j=0; j<breathArray.length; j++) {
            breath += checkBreath(breathArray[j]) + "and ";
        }
        breath = breath.slice(0,-4)
    }else{
        if (text.match('"')) {
            breath += text.slice(1,-1);
        }else {
            switch (text.slice(0,2)) {
                case "ac":
                    breath += "acid ";
                    break;
                case "co":
                    breath += "frost ";
                    break;
                case "en":
                    breath += "enchantment ";
                    break;
                case "eg":
                    breath += "energy ";
                    break;
                case "fl":
                    breath += "fire ";
                    break;
                case "he":
                    breath += "heat ";
                    break;
                case "ic":
                    breath += "ice ";
                    break;
                case "la":
                    breath += "lava ";
                    break;
                case "ph":
                    breath += "light ";
                    break;
                case "pl":
                    breath += "plasma ";
                    break;
                case "ro":
                    breath += "rot ";
                    break;
                case "sm":
                    breath += "smoke ";
                    break;
                case "st":
                    breath += "steam ";
                    break;
                case "su":
                    breath += "sulphur ";
                    break;
                case "vg":
                    breath += "volcanic gasses ";
                    break;
                case "wa":
                    breath += "water ";
                    break;
                case "wi":
                    breath += "wind ";
                    break;
                case "zz":
                    breath += "electricity ";
                    break;
                case "-":
                    breath += "no breath weapon ";
                    break;
            }
        }
        if (text.match(/\x7C/)) {breath+="beam "}
        if (text.match(/\x23/)) {breath+="cloud "}
    }
    return breath;
}

function checkAge(text) { // complete
    let age = "";
    if (text.match(/\x28/)) {
        age += checkAge(text.slice(2,text.indexOf("v")))
        age += " + " + checkAge(text.slice(text.indexOf("v"),-1))
    }else{
        switch (text.slice(-1)) {
            case "+++!":
                age += "Ancient";
                break;
            case "+++":
                age += "Venerable";
                break;
            case "++":
                age += "Old enough to know better";
                break;
            case "+":
                age += "I've been around";
                break;
            case "A":
                age += "Mature adult";
                break;
            case "-":
                age += "Young adult";
                break;
            case "--":
                age += "Still under the wing";
                break;
            case "---":
                age += "Hatchling";
                break;
            case "---!":
                age += "I'm still an egg";
                break;
            case "?":
                age += "No idea how old I am";
                break;
        }
        if (text.match("r")) {age += " in real life"}
        if (text.match("v")) {age += " online"}
    }

    return age;
}

function checkFruit(text) { // complete
    let fruit = "";
    if (text.match('"')) {
        fruit += text.slice(text.indexOf('"')+1,text.indexOf('"',text.length-2)) + " + "
        text = text.slice(0,text.indexOf('"'))
    }
    switch (text.slice(0,)) {
        case "Fr+++!":
            fruit += "I remember when humans ruled the newsgroup, ";
            break;
        case "Fr+++":
            fruit += "I remember Dalvenjah posting regularly, ";
            break;
        case "Fr++":
            fruit += "I've been here a couple years or so, ";
            break;
        case "Fr+":
            fruit += "I've been here for just over a year, ";
            break;
        case "Fr":
            fruit += "Old fruits know me, ";
            break;
        case "Fr-":
            fruit += "My name is known and that's about it, ";
            break;
        case "Fr--":
            fruit += "They're still responding to my welcome post, ";
            break;
        case "Fr---":
            fruit += "I haven't posted yet I'm just lurking, ";
            break;
        case "Fr---!":
            fruit += "I've never heard of AFD, ";
            break;
        case "Fr^":
            fruit += "I've joined left and returned, ";
            break;
        case "Fr*":
            fruit += "I got flamed off the newsgroup for yelling at Shim, ";
            break;
    }
    return fruit;
}

function checkHabitat(text) { // complete
    let habitat = "";
    switch (text) {
        case "Na":
            habitat += "I live in the air, ";
            break;
        case "Ne":
            habitat += "I live underground, ";
            break;
        case "Nf":
            habitat += "I live in fire, ";
            break;
        case "Ni":
            habitat += "I live in the ice, ";
            break;
        case "Nj":
            habitat += "I live in the jungle, ";
            break;
        case "Nm":
            habitat += "I live in the mountains, ";
            break;
        case "Nn":
            habitat += "I live in nature, ";
            break;
        case "Np":
            habitat += "I live in the plains, ";
            break;
        case "Nr":
            habitat += "I live in the rock, ";
            break;
        case "Ns":
            habitat += "I live in space, ";
            break;
        case "Nt":
            habitat += "I live in the trees, ";
            break;
        case "Nu":
            habitat += "I live in the city, ";
            break;
        case "Nw":
            habitat += "I live in the water, ";
            break;
        case "N^":
            habitat += "I exist between the folds of reality, ";
            break;
        case "N!":
            habitat += "I only live inside my own mind, ";
            break;
    }
    return habitat;
}

function checkMate(text) { // complete
    let mate = "";
    text = text.replace("M","")
    if (text.match(/\d|\x7C|\x2A|\x5F|r|v|\x28|xx|xy/g)) {
        if (text.match(/r|v|\x28/g)) {
            if (text.match(/\x28/)) {
                mate += checkMate(text.slice(1,text.slice(2).search(/[rv]/)+2)) + " + " + checkMate(text.slice(2).slice(text.slice(1).search(/[rv]/)+2,-1))
            }else if(text.match("r")) {
                mate += "In real life " + checkMate(text.slice(1))
            }else if(text.match("v")) {
                mate += "Online " + checkMate(text.slice(1))
            }
        }else if (text.match(/\x7C|\x2A|\x5F/g)) { // | * _
            let status = "";
            if (text.match(/\x7C/)) {
                status = " I am seperated from"
            }else if (text.match(/\x2A/)) {
                status = " I am seperated from and bitter about"
            }else if (text.match(/\x5F/)) {
                status = " died"
            }

            if (text.match(/\d/g)) {
                mate += checkMate(text.slice(0,text.indexOf(/[\x7C\x2A\x5F]/)-1)) + " " + text.slice(text.indexOf(text.match(/[\x7C\x2A\x5F]/))).match(/\d/g) + " who" + status
            }else {
                mate += checkMate(text.slice(0,-1)) + " who" + status;
            }
        }else if (text.match(/\d/)) {

            switch (text.slice(0,text.indexOf(/\d/))) {
                case "+++!":
                    mate += "I'm mated to the same " + text.match(/\d/g) + " people on and off line";
                    break;
                case "+++":
                    mate += "Am I mated? Ask the hatchlings of any of my " + text.match(/\d/g) + " mates";
                    break;
                case "++":
                    mate += "Ask my " + text.match(/\d/g) + " significant others";
                    break;
                case "+":
                    mate += "Ask my " + text.match(/\d/g) + " mates-to-be";
                    break;
                case " +++!":
                    mate += "I'm mated to the same " + text.match(/\d/g) + " people on and off line who is far from home";
                    break;
                case " +++":
                    mate += "Am I mated? Ask the hatchlings of any of my " + text.match(/\d/g) + " mates who are far from home";
                    break;
                case " ++":
                    mate += "Ask my " + text.match(/\d/g) + " significant others who are far from home";
                    break;
                case " +":
                    mate += "Ask my " + text.match(/\d/g) + " mates-to-be who are far from home";
                    break;
            }
        }
        if (text.match("xx")) {mate += checkMate(text.replace("xx","")) + " + card carrying member of the XX conspiracy"}
        if (text.match("xy")) {mate += checkMate(text.replace("xy","")) + " + card carrying member of the XY conspiracy"}
    }else {
        switch (text) {
            case "+++!":
                mate += "I'm mated to the same person on and off line";
                break;
            case "+++":
                mate += "Am I mated? Ask the hatchlings of my partner";
                break;
            case "++":
                mate += "Ask my significant other";
                break;
            case "+":
                mate += "Ask my mate-to-be";
                break;
            case " +++!":
                mate += "I'm mated to the same person on and off line who is far from home";
                break;
            case " +++":
                mate += "Am I mated? Ask my hatchlings who are far from home";
                break;
            case " ++":
                mate += "Ask my significant other who is far from home";
                break;
            case " +":
                mate += "Ask my mate-to-be who is far from home";
                break;
            case "-":
                mate += "Don't ask my mating status";
                break;
            case "--":
                mate += "Ask my club buddies if I'm mated";
                break;
            case "---":
                mate += "I'm single and proud of it";
                break;
            case "---!":
                mate += "Not only am I single but I despise the idea of mating";
                break;
            case "/":
                mate += "Ask me if i'm mated and i'll ask your snout to meet your kidneys";
                break;
            default:
                mate += "Ask me and I might just say yes";
                break;
        }
    }
    return mate;
}

function checkOffspring(text) { // complete
    let offspring = "";
    text = text.slice(1)
    if (text.match(/r|v|\x28/)) {
        if (text.match(/\x28/)) {
                offspring += checkOffspring(text.slice(0,text.slice(3).search(/(?=[rv])/)+3)) + " + " + checkOffspring(text.slice(text.slice(3).search(/(?=[rv])/)+2,-1))
            }else if(text.match("r")) {
                offspring += "In real life " + checkOffspring(text)
            }else if(text.match("v")) {
                offspring += "Online " + checkOffspring(text)
            }
    }else if (text.match("a")) {
        offspring += "adopted " + checkOffspring(text)
    }else if (text.match(/\d/)) {
        if (text.match(/\x2B/)) {
            offspring += "I have " + text.match(/\d/g) + " offspring still at home"
        }else if (text.match("-")) {
            offspring += "I have " + text.match(/\d/g) + " offspring flown the nest"
        }
    }else {
        switch (text) {
            case "+++!":
                offspring += "I have many offspring and none of them have left yet";
                break;
            case "+++":
                offspring += "I have several offspring that haven't left home yet";
                break;
            case "++":
                offspring += "I've got a couple offspring that haven't left home";
                break;
            case "+":
                offspring += "I've got one offspring still in the nest";
                break;
            case "":
                offspring += "I haven't had any offspring";
                break;
            case "-":
                offspring += "I had one offspring but they've left home";
                break;
            case "--":
                offspring += "I had a couple of offspring but they've flown away now";
                break;
            case "---":
                offspring += "I've had several offspring, but they've all fledged";
                break;
            case "---!":
                offspring += "I've had many offspring but they've all flown away now";
                break;
            case "?":
                offspring += "I lost track of my offspring long ago";
                break;
            case "~":
                offspring += "I have a variable number of offspring";
                break;
            case "/":
                offspring += "I'd faint if I knew I had offspring";
                break;
        }
    }
    return offspring;
}

function checkHoard(text) { // complete
    let hoard = "";
    switch (text) {
        case "H+++!":
            hoard += "The economy trembles in fear when you decide to go on a shopping spree, ";
            break;
        case "H+++":
            hoard += "You have enough you don't notice theft, ";
            break;
        case "H++":
            hoard += "Comfortable but you wouldn't mind more, ";
            break;
        case "H+":
            hoard += "Not quite down to my last coin, ";
            break;
        case "H":
            hoard += "My lair is unfurnished but mine, ";
            break;
        case "H-":
            hoard += "Me and the bank own my lair, ";
            break;
        case "H--":
            hoard += "The lair is rented, ";
            break;
        case "H---":
            hoard += "All I have left is food, ";
            break;
        case "H---!":
            hoard += "My hoard is empty, ";
            break;
    }
    return hoard;
}

function checkMonetary(text) { // complete
    let monetary = "";
    switch (text) {
        case "$+++!":
            monetary += "I take everything of value and never give it up, ";
            break;
        case "$+++":
            monetary += "The coins have my face on them, ";
            break;
        case "$++":
            monetary += "I kill other dragons for their wealth, ";
            break;
        case "$+":
            monetary += "I invest in businesses, ";
            break;
        case "$":
            monetary += "Take your hands off my hoard or I'll take your hands, ";
            break;
        case "$-":
            monetary += "Bought the weaponsmiths with my savings, ";
            break;
        case "$--":
            monetary += "Some thief ";
            break;
        case "$---":
            monetary += "I'm a philanthropist I gave it all to the poor, ";
            break;
        case "$---!":
            monetary += "Whatever I find I give away, ";
            break;
    }
    return monetary;
}

function checkDiet(text) { // complete
    let diet = "";
    text = text.slice(1)
    if (text.match("c")) diet+="Carnivorous ";
    if (text.match("f")) diet+="Fluids ";
    if (text.match("j")) diet+="Junk Food ";
    if (text.match("m")) diet+="Minerals ";
    if (text.match("o")) diet+="Omnivorous ";
    if (text.match("p")) diet+="Photosynthesizer ";
    if (text.match("t")) diet+="Thaumivore ";
    if (text.match("v")) diet+="Vegetarian ";

    if (text.match(/\x7E/)) diet+="Anything "; // ~

    if (text.match(/\x2B\x2B\x2B\x21/)) diet+="Insatiable"; // +++!
    else if (text.match(/\x2D\x2D\x2D\x21/)) diet+="Fasting"; // ---!
    else if (text.match(/\x2B\x2B\x2B/)) diet+="Voracious"; // +++
    else if (text.match(/\x2D\x2D\x2D/)) diet+="Anorexic"; // ---
    else if (text.match(/\x2B\x2B/)) diet+="Glutton"; // ++
    else if (text.match(/\x2D\x2D/)) diet+="Efficient eater"; // --
    else if (text.match(/\x2B/)) diet+="Overindulgent"; // +
    else if (text.match(/\x2D/)) diet+="Dieting"; // -
    else diet+="Average Appetite";
    return diet;
}

function checkReality(text) { // complete
    let reality = "";
    switch (text) {
        case "R+++!":
            reality += "I am as I describe myself and what you see is what your mind wants you to see, ";
            break;
        case "R+++":
            reality += "I am as I describe myself the human body is an unfortunate mismatch, ";
            break;
        case "R++":
            reality += "I tend to answer as a dragon, ";
            break;
        case "R+":
            reality += "If it's a role it's part of my identity, ";
            break;
        case "R":
            reality += "I haven't thought about whether I'm more real as a dragon or not, ";
            break;
        case "R-":
            reality += "It would be nice to be a dragon but I have doubts, ";
            break;
        case "R--":
            reality += "This is just a hobby for me, ";
            break;
        case "R---":
            reality += "I consider all of this imaginary, ";
            break;
        case "R---!":
            reality += "I am role playing. You are roleplaying. If you try to correct me I will publicly flame you as insane, "; // <- don't do that
            break;
        case "R*":
            reality += "Don't ask about the reality of my draconity, ";
            break;
        case "R?":
            reality += "Haven't thought about the reality of my draconity, ";
            break;
    }
    return reality;
}

function checkActivity(text) { // complete
    let activity = "";
    switch (text) {
        case "Ac+++!":
            activity += "I'm never offline not even to eat, ";
            break;
        case "Ac+++":
            activity += "I'm at home online and almost always there, ";
            break;
        case "Ac++":
            activity += "I'm online for most of the day, ";
            break;
        case "Ac+":
            activity += "I'm online for a couple hours every day, ";
            break;
        case "Ac":
            activity += "I'm online for a bit every day, ";
            break;
        case "Ac-":
            activity += "I'm online every weekend, ";
            break;
        case "Ac--":
            activity += "I'm barely online once a week, ";
            break;
        case "Ac---":
            activity += "I'm lucky if I get online once a month, ";
            break;
        case "Ac---!":
            activity += "If you see me online it must be raining frogs again, ";
            break;
        case "Ac~":
            activity += "I'm online randomly, ";
            break;
        case "Ac?":
            activity += "I don't know when I'll be online again, ";
            break;
    }
    return activity;
}

function checkHumour(text) { // complete
    let humour = "";
    if (text.match(/r|v|\x28/)) {
        if (text.match(/\x28/)) {
                humour += checkHumour("J" + text.slice(2,text.slice(3).search(/(?=[rv])/)+3)) + " + " + checkHumour("J" + text.slice(text.slice(3).search(/(?=[rv])/)+3,-1))
            }else if(text.match("r")) {
                humour += "In real life " + checkHumour(text.replace("r", ""))
            }else if(text.match("v")) {
                humour += "Online " + checkHumour(text.replace("v", ""))
            }
    }else {
        switch (text) {
            case "J+++!":
                humour += "Everything is a joke";
                break;
            case "J+++":
                humour += "Theres very little I won't laugh at";
                break;
            case "J++":
                humour += "Laughing is good for you even when talking about something serious";
                break;
            case "J+":
                humour += "I appreciate humour of all kinds but I know when to take things seriously";
                break;
            case "J":
                humour += "I laugh a lot but theres a time and place for laughing";
                break;
            case "J-":
                humour += "Laughing out loud is bad for my health";
                break;
            case "J--":
                humour += "Everything is serious by default";
                break;
            case "J---":
                humour += "I can't think of when I last laughed";
                break;
            case "J---!":
                humour += "Jokes are the work of the devil";
                break;
        }
    }
    return humour;
}

function checkSocial(text) { // complete
    let social = "";
    switch (text) {
        case "S+++!":
            social += "Everyone I meet knows I'm a dragon, ";
            break;
        case "S+++":
            social += "My friends parents know I'm a dragon and I'm well known for it online too, ";
            break;
        case "S++":
            social += "All of my friends and family know I'm a dragon, ";
            break;
        case "S+":
            social += "Most of my friends know I'm a dragon, ";
            break;
        case "S":
            social += "A few of my friends know I'm a dragon, ";
            break;
        case "S-":
            social += "I'd only tell my closest friends offline about me being a dragon, ";
            break;
        case "S--":
            social += "I'm open about being a dragon online but nowhere else, ";
            break;
        case "S---":
            social += "I've emailed a few people about my dragon side, ";
            break;
        case "S---!":
            social += "No one knows I'm a dragon period, ";
            break;
    }
    return social;
}

function checkUbiquity(text) { // complete
    let ubiquity = "";
    switch (text) {
        case "U+++!":
            ubiquity += "There are still holy wars being fought over me, ";
            break;
        case "U+++":
            ubiquity += "I remember most of my past lives and a bit about you too, ";
            break;
        case "U++":
            ubiquity += "I wrote that book over there in a different life, ";
            break;
        case "U+":
            ubiquity += "I can remember several past-life names, ";
            break;
        case "U":
            ubiquity += "This isn't my first time around!, ";
            break;
        case "U-":
            ubiquity += "I'm pretty sure I've done something important I'm just not sure what, ";
            break;
        case "U--":
            ubiquity += "404: Past life not found, ";
            break;
        case "U---":
            ubiquity += "I don't want to know how i ended up here, ";
            break;
        case "U---!":
            ubiquity += "I blocked out memories of my past life, ";
            break;
        case "U?":
            ubiquity += "What's a past life?, ";
            break;
        case "U!":
            ubiquity += "This is my first life, ";
            break;
        case "U*":
            ubiquity += "I've been around a bit, not telling you though, ";
            break;
        case "U2":
            ubiquity += "My name is Bono! :8), ";
            break;
    }
    return ubiquity;
}

function checkIrritability(text) { // complete
    let irritable = "";
    switch (text.replace("#", "")) {
        case "I+++!":
            irritable += "You're never going to catch me in a good mood";
            break;
        case "I+++":
            irritable += "I'd eat my mother if she looked at me wrong";
            break;
        case "I++":
            irritable += "Come too close and you're a cinder";
            break;
        case "I+":
            irritable += "Call me grumpy";
            break;
        case "I":
            irritable += "I will defend my honour but I'll only attack with reason";
            break;
        case "I-":
            irritable += "Just don't call me lizard lips and I won't get angry";
            break;
        case "I--":
            irritable += "I take everything in stride";
            break;
        case "I---":
            irritable += "You could stab me with a ten-foot pike and I wouldn't blink";
            break;
        case "I---!":
            irritable += "There's nothing you could do to make me lose my cool";
            break;
    }
    if (text.match("#")) irritable += " but when I get angry prepare for barbecue"
    return irritable;
}

function checkMagic(text) { // complete
    let magic = "";
    if (text.match(/\x5B/)) {
        magic += checkMagic(text.slice(0,text.indexOf("["))) + " of " + text.slice(1).match(/\w/g) + " magic"
        magic = magic.replaceAll(",", "")
    }else{
        switch (text.slice(0)) {
            case "V+++!":
                magic += "I've reached the pinnacle of my magical profession";
                break;
            case "V+++":
                magic += "I'm adept in my magical field";
                break;
            case "V++":
                magic += "I know a number of spells";
                break;
            case "V+":
                magic += "I can perform a few cantrips";
                break;
            case "V":
                magic += "I've never really looked into magic";
                break;
            case "V-":
                magic += "Magicians worry when I'm near";
                break;
            case "V--":
                magic += "Most magic seems to fail when I'm nearby";
                break;
            case "V---":
                magic += "Only a few spells seem to have an effect but it could be my imagination";
                break;
            case "V---!":
                magic += "Magic? what's that?";
                break;
        }
    }
    return magic;
}

function checkPsy(text) { // complete
    let psy = "";
    if (text.match(/\x5B/)) {
        psy += checkPsy(text.slice(0,text.indexOf("["))) + " of " + text.slice(1).match(/\w/g) + " psionics"
        psy = psy.replaceAll(",", "")
    }else{
        switch (text.slice(0)) {
            case "Q+++!":
                psy += "I've reached the pinnacle of my magical profession";
                break;
            case "Q+++":
                psy += "I can move mountains and not bit-by-bit";
                break;
            case "Q++":
                psy += "I know what you're thinking";
                break;
            case "Q+":
                psy += "I can talk to the odd spirit";
                break;
            case "Q":
                psy += "I'm like a psionic book but I haven't learned to read yet";
                break;
            case "Q-":
                psy += "Psychics have trouble communicating when I'm around";
                break;
            case "Q--":
                psy += "Only my very outer thoughts are exposed";
                break;
            case "Q---":
                psy += "Psionics don't have any effect on me";
                break;
            case "Q---!":
                psy += "I am immune to any Psionic effect and block them around me";
                break;
        }
    }
    return psy;
}

function checkTech(text) { // complate
    let tech = "";
    if (text.match(/\x5B/)) {
        tech += checkTech(text.slice(0,text.indexOf("["))) + " of " + text.slice(2).match(/\w/g) + " tech"
        tech = tech.replaceAll(",", "")
    }else{
        switch (text.slice(0)) {
            case "Tc+++!":
                tech += "I write microcode in my spare time";
                break;
            case "Tc+++":
                tech += "I can program using assembly";
                break;
            case "Tc++":
                tech += "I can program using high-level languages";
                break;
            case "Tc+":
                tech += "I can program along with a tutorial";
                break;
            case "Tc":
                tech += "I haven't learned how to wire a plug";
                break;
            case "Tc-":
                tech += "If a program has a bug I'll find it the hard way";
                break;
            case "Tc--":
                tech += "Electricity does funny things when I'm at the controls";
                break;
            case "Tc---":
                tech += "Only the most basic of machines survive when I'm near";
                break;
            case "Tc---!":
                tech += "All technology fails when I'm near";
                break;
        }
    }
    return tech;
}

function checkHug(text) { // complete
    let hug = "";
    switch (text.replace("#", "")) {
        case "E+++!":
            hug += "I'll hug anything to death and keep hugging";
            break;
        case "E+++":
            hug += "I'll hug anything alive";
            break;
        case "E++":
            hug += "I'm fairly free with my hugs";
            break;
        case "E+":
            hug += "I'm selective but give me a hug and I'll return it";
            break;
        case "E":
            hug += "I don't mind hugs from friends";
            break;
        case "E-":
            hug += "I'll only accept hugs from my nearest and dearest";
            break;
        case "E--":
            hug += "Only my mate is allowed to hug me";
            break;
        case "E---":
            hug += "Don't you dare hug me";
            break;
        case "E---!":
            hug += "Don't even think about touching me";
            break;
    }
    if (text.match(/\x23/)) hug+=" but when you do expect a violent reaction!"
    return hug;
}

function checkFriend(text) { // complete
    let friend = "";
    switch (text) {
        case "Df+++!":
            friend += "Started growing scales!";
            break;
        case "Df+++":
            friend += "Popular with dragons.";
            break;
        case "Df++":
            friend += "Reasonably popular with dragons.";
            break;
        case "Df+":
            friend += "Polite acquaintance of dragons";
            break;
        case "Df":
            friend += "Tolerable to dragons.";
            break;
        case "Df-":
            friend += "Irritating to dragons.";
            break;
        case "Df--":
            friend += "Maddening to dragons.";
            break;
        case "Df---":
            friend += "Infuriating to dragons.";
            break;
        case "Df---!":
            friend += "Hunted by dragons.";
            break;
    }
    return friend;
}
}