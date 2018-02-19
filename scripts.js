window.onload = function() { // Dès le chargement de la page, ont demande les instructions suivantes...

    // VARIABLES GLOBALES
    var canvasWidth = 900, // largeur en px du canvas
        canvasHeight = 600, // hauteur en px du canvas
        blockSize = 30, // Dimention de la taille d'un bloc du serpent. Celui-ci est de 30px
        ctx, // Variable représentant le contexte dans lequel se trouve les eléments dessinés.
        delay = 100, // Temps de rafraichissement du canvas et de son contenu.
        crocky, //Nom de mon serpent. Je craignait de mélanger les pinceaux entre Snake et Snakee. Il croque des pomme alors crocky ;-)
        meal, // Nom de ma pomme pour ne pas mélanger apple et applee
        score,
        widthInBlock = canvasWidth / blockSize, // On calcule le nombre de blocks dans la largeur du canvas
        heightInBlocks = canvasHeight / blockSize; // On calcule le nombre de blocks dans la hauteur du canvas


    // INITIALISATION
    init(); // Initialisation du canvas et des éléments situés à l'intérieur (serpent, pomme)

    function init() {
        var canvas = document.createElement("canvas"); // On demande au document de créer le canvas
        canvas.width = canvasWidth; // Largeur du canvas (6px mentionnés à la variable ligne 5)
        canvas.height = canvasHeight; // Hauteur du canvas (6px mentionnés à la variable ligne 6)
        canvas.style.border = "1px blue solid"; // Stylisation du canvas
        document.body.appendChild(canvas); // On demande au document d'attacher l'élément canvas comme dernier élément enfant du body
        ctx = canvas.getContext("2d"); // On indique que le contexte de travail sera en 2d, donc axes x et y seulement.


        /* On crée un tableau représentant le serpent avec 3 sous-tableau de 2 valeurs chacun.
        Une valeur à 0 servant à s'alligner sur l'axe x et la 2ème sur l'axe y de chaque bloc du serpent
        
        Taille initiale de mon serpent de 3 blocs de 30 px chacun. 
        Mentionnés dans l'ordre de la tête au pieds introduit dans le canvas comme un objet.*/
        crocky = new snake([
            [6, 4],
            [5, 4],
            [4, 4],
            [3, 4],
            [2, 4]
        ], "right"); // On indique la direction initiale du serpent

        // On crée la pomme en tant qu'objet
        meal = new apple([10, 10]);
        score = 0;
        refrechCanvas(); // Pour terminer, on demande de rafraichir le canvas.
    }

    // RAFRAICHISSEMENT DU CANVAS
    function refrechCanvas() {
        crocky.advence(); // On initialise la fonction qui fait avancer le serpent

        // On met une condition pour savoir si il y a collision du serpent.
        if (crocky.checkCollision()) {
            gameOver(); // Si oui, game Over
        }
        // Si non, le jeu continue
        else {
            // Si le serpent mange son repas
            if (crocky.isEatingApple(meal)) {
                score++;
                crocky.ateApple = true;
                do {
                    meal.setNewPosition();
                }
                while (meal.isOnSnake(crocky));
                // la pomme prend une nouvelle position

            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight); // On demande d'effacer le canvas
            crocky.draw(); // On initialise la fonction qui dessine le serpent sur le canvas.
            meal.draw(); // On initialise la fonction qui dessine la pomme
            drowScore();
            setTimeout(refrechCanvas, delay); // On indique le délais d'éxecution du rafraichissement du canvas et son contenu.
        }

    }

    function gameOver() {
        ctx.save();
        ctx.fillText("Game Over", 5, 15);
        ctx.fillText("Appuillez sur la touche espace pour rejouer", 5, 30);
        ctx.restore();
    }

    function restart() {
        crocky = new snake([
            [6, 4],
            [5, 4],
            [4, 4],
            [3, 4],
            [2, 4]
        ], "right"); // On indique la direction initiale du serpent

        // On crée la pomme en tant qu'objet
        meal = new apple([10, 10]);
        score = 0;
        refrechCanvas(); // Pour terminer, on demande de rafraichir le canvas.
    }

    function drowScore() {
        ctx.save();
        ctx.fillText(score.toString(), 5, canvasHeight - 5);
        ctx.restore();
    }

    // DESSIN DES BLOCS DU SERPENT (crocky)
    function drawBlock(ctx, position) {
        var x = position[0] * blockSize; // Taille d'un bloc par rapport à l'axe x
        var y = position[1] * blockSize; // Taille d'un bloc par rapport à l'axe y
        ctx.fillRect(x, y, blockSize, blockSize); // Dimensions de chaque bloc du serpent soit 30px sur x et 30px sur y
    }

    // CONSTRUCTION DU SERPENT (Objet)
    function snake(body, direction) {
        this.body = body; // On sible le body du serpent
        this.direction = direction; // On sible la direction du serpent
        this.ateApple = false;
        // On crée le dessin du serpent
        this.draw = function() {
            ctx.save(); // On commance par suvgarder son état
            ctx.fillStyle = "#ff0000"; // On attribue une couleur à l'objet dessiné

            // On passe en boucle la longeur du serpent à chaque déplacements
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]); // On indique le résultat de la longueur du serpent dans le canvas 
            }
            ctx.restore(); // On restore l'état du serpent
        };

        // ON FAIT AVANCER LE SERPENT
        this.advence = function() {
            var nextPosition = this.body[0].slice(); // On copie le premier bloc du array du serpent sur l'axe x
            // On crée une boucle (switch) pur attribuer des valeurs x et y suivant la direction prise par le serpent
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1; // On soustrait un bloc sur l'axe x lorsqu'il va à gauche
                    break;
                case "right":
                    nextPosition[0] += 1; // On ajoute un bloc sur l'axe x lorsqu'il va à droite
                    break;
                case "up":
                    nextPosition[1] -= 1; // On soustrait un bloc sur l'axe y lorsqu'il va en haut
                    break;
                case "down":
                    nextPosition[1] += 1; // On ajoute un bloc sur l'axe y lorsqu'il va en bas
                    break;
                default:
                    throw ("Invalid Direction");
            }
            this.body.unshift(nextPosition); // On cole le nouveau bloc devant le premier et on le voit maintenant 4 blocs
            if (!this.ateApple)
                this.body.pop(); // On efface la dernière ocurance de l'array. Le serpent fait de nouveau 3 blocs mais décalés d'un cran sur l'axe x
            else
                this.ateApple = false;
        };

        // Directions autorisées
        this.setDirection = function(newDirection) {
            var allowedDirections; // Variable où sera stockée les valeurs de direction autorisées
            // On fait une boucle sur les touches appuyées et on examine si c'est autorisé
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"]; // Si le serpent se dirige à gauche ou à droite, on l'autorise à monter ou descendre
                    break;
                case "up":
                case "down":
                    allowedDirections = ["left", "right"]; // Si le serpent se dirige en haut ou en bas, on l'autorise à aller à gauche ou à droite
                    break;
                default:
                    throw ("Invalid allowDirection");

            }

            // On met une condition pour atribuer à la direction du serpent, la nouvelle direction à prendre, soit, la nouvelle direction
            /* Cette condition va vérifier la valeurdu tableau de "allowedDirection"
            en vérifiant si la touche enfoncée correspond à la valeur 0 ou 1 du tableau dans le switch(this.direction)
            ci-dessus */
            if (allowedDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection; // Atribue à la variable direction du serpent la nouvelle direction à prendre
            }
        };

        // fonction check de collision canvas ou serpent
        this.checkCollision = function() {
            var wallCollision = false; // Variable collision canvas initialisée à false = jeu continue
            var snakeCollision = false; // Variable collision canvas initialisée à false = jeu continue
            var head = this.body[0]; // Variable valeur 0 du array de "crocky" = tête du serpent
            var rest = this.body.slice(1); // Variable contenant le corp du serpent 
            var snakeX = head[0]; // Valleur du bloc sur l'axe x dans le array de "crocky"
            var snakeY = head[1]; // Valleur du bloc sur l'axe x dans le array de "crocky"
            var minX = 0; // On indique la limite de la bordure gauche du canvas
            var minY = 0; // On indique la limite de la bordure du haut du canvas
            var maxX = widthInBlock - 1; //On indique la limite du bordure droite du canvas
            var maxY = widthInBlock - 1; //On indique la limite du bordure du bas du canvas
            var isNotBeetweenHorizontalWalls = snakeX < minX || snakeX > maxX; // On indique les limites horizontalles à ne pas dépasser
            var isNotBeetweenVerticalWalls = snakeY < minY || snakeY > maxY; // On indique les limites verticales à ne pas dépasser

            //On conditionne le comportement du serpent en cas de collision du canvas
            if (isNotBeetweenHorizontalWalls || isNotBeetweenVerticalWalls) {
                wallCollision = true; // La collision fait passer à true ce qui engendre l'arret du jeu
            }

            // On parcoure le tableau pour verifier si la tête touche le corp de crocky
            for (var i = 0; i < rest.length; i++) {
                // Si l'emplacement de la tête est égale au reste du corp
                if (snakeX === rest[i][0] && snakeY === rest[i][1])
                    snakeCollision = true; // Il y a collision du serpent sur lui même
            }
            return wallCollision || snakeCollision;

        };

        // Si la pomme est croquée
        this.isEatingApple = function(appleToEat) {
            var head = this.body[0]; // La tête est égale à 0 sur l'axe X

            /* Dans le cas où il n'y a qu'une instruction par ligne
            il n'est pas nécéssaire de mettre des crochets */
            if (head[0] === appleToEat.position[0] && head === appleToEat.position[1]) // Si la tête est absolument égale à 0 sur axe X et 1 sur axe Y
                return true; // crocky mange la pomme
            else
                return false; // crocky ne mange pas la pomme
        };
    }

    // CONSTRUCTION LA POMME (Objet)
    function apple(position) {
        this.position = position;

        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };

        //On donne une nouvelle position à la pomme
        this.setNewPosition = function() {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };


        this.isOnSnake = function(snakeToCheck) {
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.length; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][0]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }

    // A LA PRESSION DES TOUCHES
    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode; // Variable stockant le code de référance de la touche enfoncée lors de l'évènement onkeydown
        var newDirection; // Variable dans laquelle sera stockée la nouvelle valeur suivant la touche enfoncée.

        // On fait une boucle pour passer la valeur des touches à la newDirection
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            case 32:
                restart();
                return;
            default:
                return;
        }
        crocky.setDirection(newDirection); // On atribue à l'objet crocky la nouvelle direction à prendre
    };

};