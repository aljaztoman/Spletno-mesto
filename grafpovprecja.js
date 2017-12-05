class GrafPovprečja {
    constructor(idPlatna, maxGraphX, maxGraphY, dolžinaOkna) { // pri konstruktorju moramo podati ID platna, ki ga sicer ustvarimo v html-ju
        this.canvas = document.getElementById(idPlatna);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "#ff0000"; // določimo rdečo barva grafa
        this.širinaPlatna = this.canvas.width; // določimo širino platna
        this.višinaPlatna = this.canvas.height; // določimo višino platna
        this.maxGraphX = maxGraphX; // maksimum po x osi
        this.maxGraphY = maxGraphY; // maksimum po y osi
        this.x = new Array(); // ustvarimo novo polje x
        this.y = new Array(); // ustvarimo novo polje y
        this.dolžinaOkna = dolžinaOkna; // dolžina okna pri drsečem povprečju
        this.yOkno = new Array(); // vektor vrednosti y iz katerih nato izračunamo povprečje
        this.povprečnaVrednost = 0;
        
        // napolnimo vektor x; vektor y polnimo sproti
        for (var i=0; i<this.maxGraphX; i++) {
            this.x[i] = i; // vrednosti za x koordinato; 0, 1, 2, ...
        }
    }
    
    dodajVrednostAliBrišiInDodaj(yVrednost) {
        this.yOkno.push(yVrednost);
    
        if(this.yOkno.length == this.dolžinaOkna + 1) {
            this.yOkno.splice(0,1);
            this.povprečnaVrednost = this.yOkno.reduce(function(a, b) { return a + b;})/this.dolžinaOkna;
        }
    
        else if (this.yOkno.length == this.dolžinaOkna) {
            this.povprečnaVrednost = this.yOkno.reduce(function(a, b) { return a + b;})/this.dolžinaOkna;
        }
    
        else {
            this.povprečnaVrednost = 0;
        }
        
        
        if (this.y.length == this.maxGraphX+1) { // če je platno vel 10x10 imamo 11x11 točk (začnemo z 0)
            this.y.splice(0, 1); // na mestu 0 v polju y brišemo eno vrednost
            this.y[this.maxGraphX] = this.povprečnaVrednost; // novo vrednost dodamo na koncu polja
        }
        else {
            this.y.push(this.povprečnaVrednost); // če polje še ni napolnjeno potisnemo novo vrednost v polje
        }
    }
    
    izriši(yVrednost) {
        this.dodajVrednostAliBrišiInDodaj(yVrednost);
        this.ctx.clearRect(0, 0, this.širinaPlatna, this.višinaPlatna); // brišemo platno
        this.ctx.beginPath(); // za začetek izrisa črte
    
        for (var i=0; i<this.y.length; i++) {
            this.ctx.lineTo(this.x[i]/this.maxGraphX*this.širinaPlatna, (this.višinaPlatna-(this.y[i]/this.maxGraphY) * this.višinaPlatna)); // za y vrednosti pomnožimo z višino platna, npr. 0.25 * 100 = 25
        }
    
        this.ctx.stroke();
    }
}