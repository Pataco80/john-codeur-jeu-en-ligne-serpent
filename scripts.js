window.onload = function() { // Dès le chargement de la page, ont demande les instructions suivantes...

    // VARIABLES GLOBALES
    var canvas, // Variable représentant le canvas
        canvasWidth = 900, // largeur en px du canvas
        canvasHeight = 600, // hauteur en px du canvas
        blockSize = 30, // Dimention de la taille d'un bloc du serpent. Celui-ci est de 30px
        ctx, // Variable représentant le contexte dans lequel se trouve les eléments dessinés.
        delay = 200, // Temps de rafraichissement du canvas et de son contenu.
        crocky; //Nom de mon serpent. Je craignait de mélanger les pinceaux entre Snake et Snakee. Il croque des pomme alors crocky ;-)

    // INITIALISATION
    init(); // Initialisation du canvas et des éléments situés à l'intérieur (serpent, pomme)

    function init() {
        canvas = this.document.createElement("canvas"); // On demande au document de créer le canvas
        canvas.width = canvasWidth; // Largeur du canvas (6px mentionnés à la variable ligne 5)
        canvas.height = canvasHeight; // Hauteur du canvas (6px mentionnés à la variable ligne 6)
        canvas.style.border = "1px blue solid"; // Stylisation du canvas
        document.body.appendChild(canvas); // On demande au document d'attacher l'élément canvas comme dernier élément enfant du body
        ctx = canvas.getContext("2d"); // On indique que le contexte de travail sera en 2d, donc axes x et y seulement.

        // Taille initiale de mon serpent de 3 blocs de 30 px chacun. Mentionnés dans l'ordre de la tête au pieds introduit dans le canvas comme un objet.
        crocky = new snake([
            [6, 4],
            [5, 4],
            [4, 4]
        ]);
        refrechCanvas(); // Pour terminer, on demande de rafraichir le canvas.
    }

    // RAFRAICHISSEMENT DU CANVAS
    function refrechCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // On demande d'effacer le canvas
        crocky.draw(); // On initialise la fonction qui dessine le serpent sur le canvas.
        crocky.advence(); // On initialise la fonction qui fait avancer le serpent
        setTimeout(refrechCanvas, delay); // On indique le délais d'éxecution du rafraichissement du canvas et son contenu.
    }

    // DESSIN DES BLOCS DU SERPENT (crocky)
    function drawBlock(ctx, position) {
        var x = position[0] * blockSize; // Taille d'un bloc par rapport à l'axe x
        var y = position[1] * blockSize; // Taille d'un bloc par rapport à l'axe y
        ctx.fillRect(x, y, blockSize, blockSize); // Dimensions de chaque bloc du serpent soit 30px sur x et 30px sur y
    }

    // CONSTRUCTION DU SERPENT (Objet)
    function snake(body) {
        this.body = body; // On sible le body du serpent

        // On crée le dessin du serpent
        this.draw = function() {
            ctx.save(); // On commance par suvgarder son état
            ctx.fillStyle = "#ff0000"; // On attribue une couleur à l'objet dessiné

            // On passe en boucle la longeur du serpent à chaque déplacements
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]); // On indique le résultat de la longueur du serpent dans le canvas 
            }
            ctx.restore(); // On restore le serpent à son nouvel emplacement

        };

        // On crée la fonction faisant avancer le serpent
        this.advence = function() {
            var nextPosition = this.body[0].slice(); // On copie le premier bloc du array du serpent sur l'axe x
            nextPosition[0] += 1; // On ajoute un bloc de plus au serpent (il fait 4 blocs maintenant, mais ne se voit pas encore)
            this.body.unshift(nextPosition); // On cole le nouveau bloc devant le premier et on le voit maintenant 4 blocs
            this.body.pop(); // On efface la dernière ocurance de l'array. Le serpent fait de nouveau 3 blocs mais décalés d'un cran sur l'axe x
        };
    }

};