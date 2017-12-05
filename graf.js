class Graf {
    constructor(idPlatna, maxGraphX, maxGraphY) { // pri konstruktorju moramo podati ID platna, ki ga sicer ustvarimo v html-ju
        this.canvas = document.getElementById(idPlatna);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "#ff0000"; // določimo rdečo barva grafa
        this.širinaPlatna = this.canvas.width;
        this.višinaPlatna = this.canvas.height;
        this.x = new Array(); // ustvarimo novo polje x
        this.y = new Array(); // ustvarimo novo polje y
        this.maxGraphX = maxGraphX;
        this.maxGraphY = maxGraphY;
        
        // napolnimo vektor x; vektor y polnimo sproti
        for (var i=0; i<this.maxGraphX; i++) {
            this.x[i] = i; // vrednosti za x koordinato; 0, 1, 2, ...
        }
    }
    
    dodajVrednostAliBrišiInDodaj(yVrednost) {
        if (this.y.length == this.maxGraphX+1) { // če je platno vel 10x10 imamo 11x11 točk (začnemo z 0)
            this.y.splice(0, 1); // na mestu 0 v polju y brišemo eno vrednost
            this.y[this.maxGraphX] = yVrednost; // novo vrednost dodamo na koncu polja
        }
        else {
            this.y.push(yVrednost); // če polje še ni napolnjeno potisnemo novo vrednost v polje
        }
    }
        izrišiNeg(yVrednost) {
        this.dodajVrednostAliBrišiInDodaj(yVrednost);
        this.ctx.clearRect(0, 0, this.širinaPlatna, this.višinaPlatna); // brišemo platno
        this.ctx.beginPath(); // za začetek izrisa črte
    
        for (var i=0; i<this.y.length; i++) {
            this.ctx.strokeStyle = "#ff0000";
            this.ctx.lineTo(this.x[i]/this.maxGraphX*this.širinaPlatna, (this.višinaPlatna - (this.y[i]/this.maxGraphY) * this.višinaPlatna)/1.6); 
        }
        this.ctx.stroke();
            
        //
            
        
        this.ctx.beginPath(); // za začetek izrisa črte
    
        for (var i=0; i<this.y.length; i++) {  // za izris y=0
            this.ctx.strokeStyle = "#000000";
            this.ctx.lineTo(this.x[i]/this.maxGraphX*this.širinaPlatna, 126); 
        }
        this.ctx.stroke();
    }
    
    izriši(yVrednost) {
        this.dodajVrednostAliBrišiInDodaj(yVrednost);
        this.ctx.clearRect(0, 0, this.širinaPlatna, this.višinaPlatna); // brišemo platno
        this.ctx.beginPath(); // za začetek izrisa črte
    
        for (var i=0; i<this.y.length; i++) {
            this.ctx.lineTo(this.x[i]/this.maxGraphX*this.širinaPlatna, (this.višinaPlatna - (this.y[i]/this.maxGraphY) * this.višinaPlatna)); // za y vrednosti pomnožimo z višino platna, npr. 0.25 * 100 = 25
        }
    
        this.ctx.stroke();
    }
}