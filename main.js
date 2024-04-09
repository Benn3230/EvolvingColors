const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	gameEngine.init(ctx);
	//const plantBoard = new Plant(ctx);
	//gameEngine.addEntity(plantBoard);
	const automata = new Automata(ctx);
	gameEngine.addEntity(automata);
	
	document.getElementById("addplant").addEventListener("click", () => {
		automata.addPlant();
	});

	document.getElementById("addanimat").addEventListener("click", () => {
		gameEngine.addEntity(new Animat(automata, randomInt(params.canvasSize), randomInt(params.canvasSize), 
							randomInt(360)));
	});

	document.getElementById("clear").addEventListener("click", () => {
		automata.emptyPlants();
		gameEngine.killAnimats();
	});

	gameEngine.start();
});
