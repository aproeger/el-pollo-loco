const level1 = new Level(
  2750,
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [
    new BottleOnGround(550, 335),
    new BottleOnGround(950, 335),
    new BottleOnGround(1450, 335),
    new BottleOnGround(1850, 335),
    new BottleOnGround(2200, 335),
    new BottleOnGround(2350, 335),
    new Coin(660, 50),
    new Coin(880, 50),
    new Coin(1120, 50),
    new Coin(1460, 50),
    new Coin(1840, 50),
    new Coin(2090, 50),
    new Coin(2210, 50),
  ],
  [
    new Cloud("img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("img/5_background/layers/4_clouds/2.png", 852),
    new Cloud("img/5_background/layers/4_clouds/1.png", 852 * 2),
    new Cloud("img/5_background/layers/4_clouds/2.png", 852 * 3),
  ],
  [
    new BackgroundObject("img/5_background/layers/air.png", -852),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -852),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -852),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -852),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 852),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 852),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 852),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 852),

    new BackgroundObject("img/5_background/layers/air.png", 852 * 2),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 852 * 2),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 852 * 2),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 852 * 2),

    new BackgroundObject("img/5_background/layers/air.png", 852 * 3),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 852 * 3),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 852 * 3),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 852 * 3),
  ]
);
