const level1 = new Level(
  2750,
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  [
    new Bottle(550, 335),
    new Bottle(950, 335),
    new Bottle(1450, 335),
    new Bottle(1850, 335),
    new Bottle(2350, 335),
    new Coin(100, 100),
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
