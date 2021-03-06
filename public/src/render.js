$(document).ready(function() {
  $(function() {
    cycle = new Cycle()
    game = new Game(cycle);
    player = new Player(game);
    collisionLogic = new CollisionLogic();
    script = new Script();
    move = new Move();

    sprite_computer = {
      src: '',
      x: 320,
      y: 0,
      w: 32,
      h: 45
    }

    npc_computer1 = new Npc('computer', 36, 90, 250, 80, script, game, sprite_computer)
    npc_computer2 = new Npc('computer', 36, 280, 250, 80, script, game, sprite_computer)
    npc_computer3 = new Npc('computer', 36, 470, 250, 80, script, game, sprite_computer)
    npc_computer4 = new Npc('computer', 70, 640, 50, 50, script, game, sprite_computer)
    npc_computer5 = new Npc('computer', 200, 640, 50, 50, script, game, sprite_computer)
    npc_computer6 = new Npc('computer', 455, 450, 50, 110, script, game, sprite_computer)
    npc_computer7 = new Npc('computer', 455, 160, 50, 175, script, game, sprite_computer)
    npc_computer8 = new Npc('computer', 455, 670, 50, 50, script, game, sprite_computer)
    npc_computer9 = new Npc('computer', 550, 670, 50, 50, script, game, sprite_computer)

    sprite_lana = {
      src: '../img/npc_f.png',
      x: 320,
      y: 0,
      w: 32,
      h: 45
    }
    npc_lana = new Npc('lana', 510, 51, 32, 45, script, game, sprite_lana);

    sprite_ned = {
      src: '../img/npc_m.png',
      x: 32,
      y: 225,
      w: 32,
      h: 45
    }
    npc_ned = new Npc('ned', 383, 440, 32, 45, script, game, sprite_ned);


    collisionBox6 = new CollisionBox(550, 670, 50, 50, 'box6');
    collisionBox10 = new CollisionBox(545, 50, 60, 46, 'box5');
    collisionBox11 = new CollisionBox(353, 1, 62, 62, 'box11');
    collisionBox12 = new CollisionBox(353, 160, 62, 62, 'box12');
    collisionBox13 = new CollisionBox(353, 353, 62, 62, 'box13');
    collisionBox14 = new CollisionBox(353, 510, 62, 62, 'box14');
    collisionBox15 = new CollisionBox(353, 670, 62, 62, 'box15');
    collisionBox16 = new CollisionBox(577, 383, 60, 160, 'box16');

    dialogueBoxProject = new DialogueBox();

    actionPointsBar = new StatsBar(10, 15, 200, 20, 'red', game, 'AP');
    energyPointsBar = new StatsBar(10, 45, 200, 20, 'yellow', game, 'EL');
    projectPointsBar = new StatsBar(10, 75, 200, 20, 'chartreuse', game, 'PS');



    player._collisionable.push(npc_lana, npc_ned, collisionBox10, collisionBox11,
      collisionBox12, collisionBox13, collisionBox14, collisionBox15, collisionBox16, npc_computer1, npc_computer2,
      npc_computer3, npc_computer4, npc_computer5, npc_computer6, npc_computer7, npc_computer8, npc_computer9)

    setInterval(function() {
      game.draw([player, npc_lana, npc_ned,
        collisionBox10, collisionBox11,
        collisionBox12, collisionBox13, collisionBox14, collisionBox15, collisionBox16,
        dialogueBoxProject, actionPointsBar, energyPointsBar, projectPointsBar, cycle,
        npc_computer1, npc_computer2, npc_computer3, npc_computer4, npc_computer5,
        npc_computer6, npc_computer7, npc_computer8, npc_computer9
      ])
    }, 100);
  });

  $(function() {
    $(this).keydown(function(e) {
      if (dialogueBoxProject._inUse === true) {
        console.log("You can't move while in dialogue...");
        return;
      }
      if (cycle.shade === 1) {
        console.log("You can't move while in dialogue...");
        return;
      }
      if (e.keyCode == 68) {
        player._rightPressed = true;
      } else if (e.keyCode == 65) {
        player._leftPressed = true;
      } else if (e.keyCode == 87) {
        player._upPressed = true;
      } else if (e.keyCode == 83) {
        player._downPressed = true;
      }
    });

    $(this).keyup(function(e) {
      if (e.keyCode == 68) {
        player._rightPressed = false;
      } else if (e.keyCode == 65) {
        player._leftPressed = false;
      } else if (e.keyCode == 87) {
        player._upPressed = false;
      } else if (e.keyCode == 83) {
        player._downPressed = false;
      }
    })

    // X
    $(this).keyup(function(e) {
      if (e.keyCode == 88 && cycle.gameEnd !== true) {
        cycle.turnStart();
      }
    })

    // SPACEBAR
    $(this).keyup(function(e) {
      if (e.keyCode == 32) {
        if (dialogueBoxProject.exhausted === true) {
          dialogueBoxProject.hide();
          dialogueBoxProject.exhausted = false;
        } else if (dialogueBoxProject._inUse === true && dialogueBoxProject.finalDialogue() !== true) {
          dialogueBoxProject._count += 1
        }
      }
    })

    // Y
    $(this).keyup(function(e) {
      if (e.keyCode == 89) {
        if (dialogueBoxProject.finalDialogue() === true) {
          dialogueBoxProject.gameAction();
          dialogueBoxProject.hide();
        }
      }
    })

    // N
    $(this).keyup(function(e) {
      if (e.keyCode == 78) {
        if (dialogueBoxProject.finalDialogue() === true) {
          dialogueBoxProject.hide();
        }
      }
    })

    $('#gotItButton').hide();
    $('#controls').hide();

    $('#playButton').click(function() {
      $('#myCanvas').animate({
        'marginLeft': "+=200px"
      });
      $('#playButton').hide();
      $('#gotItButton').show();
      $('#controls').show();
    });

    $('#gotItButton').click(function() {
      $('#myCanvas').animate({
        'marginLeft': "-=200px" //moves left
      });
      $('#gotItButton').hide();
      $('#playButton').show();
      $('#controls').hide();
    });

    $('#zoomButton').click(function() {
      optimiseZoom();
    });


    $('#widthButton').click(function() {
      optimiseWidth();
    });

    $('#rulesButton').click(function() {
      var ask = confirm("This will take you away from the current page");
      if (ask === true) {
        location.replace("/rules");
      }
    });

    $('#homeButton').click(function() {
      var ask = confirm("Return to home page?");
      if (ask === true) {
        location.replace("/");
      }
    });

    $('#restartButton').click(function() {
      var ask = confirm("Restart the game?");
      if (ask === true) {
        location.replace("/game");
      }
    });

    optimiseZoom();
  });

  function optimiseZoom() {
    actualHeight = $(window).height();
    ratioDecimal = actualHeight / 760;
    ratioPercentStr = (ratioDecimal * 100).toString() + "%";
    ratioDecimalStr = ratioDecimal.toString();

    if (actualHeight < 760) {
      $('body').css('zoom', ratioPercentStr); /* Webkit browsers */
      $('body').css('zoom', ratioDecimalStr); /* Other non-webkit browsers */
      $('body').css('-moz-transform', scale(ratioDecimal, ratioDecimal)); /* Moz-browsers */
    }
  };

});
