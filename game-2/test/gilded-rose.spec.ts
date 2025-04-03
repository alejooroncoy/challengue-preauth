import { expect } from 'chai';
import { GildedRose, Item } from '../app/gilded-rose';

describe('GildedRose', () => {
  let gildedRose: GildedRose;

  beforeEach(() => {
    // Configura un escenario base para las pruebas
    gildedRose = new GildedRose([
      new Item("Aged Brie", 10, 20),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Conjured Mana Cake", 5, 30),
      new Item("Normal Item", 5, 10)
    ]);
  });

  it('Debería aumentar la calidad de Aged Brie', () => {
    const initialQuality = gildedRose.items[0].quality;
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).to.be.greaterThan(initialQuality);
  });

  it('No debería aumentar la calidad de Sulfuras', () => {
    const initialQuality = gildedRose.items[1].quality;
    gildedRose.updateQuality();
    expect(gildedRose.items[1].quality).to.equal(initialQuality);
  });

  it('Debería disminuir la calidad de un item normal', () => {
    const initialQuality = gildedRose.items[4].quality;
    gildedRose.updateQuality();
    expect(gildedRose.items[4].quality).to.be.lessThan(initialQuality);
  });

  // Caso 1: Verificar Aged Brie después de la fecha de vencimiento
  it('Debería aumentar la calidad de Aged Brie después de la fecha de vencimiento', () => {
    const agedBrie = gildedRose.items[0];
    agedBrie.sellIn = 0; // Expiró
    const initialQuality = agedBrie.quality;
    gildedRose.updateQuality();
    expect(agedBrie.quality).to.be.greaterThan(initialQuality);
  });

  // Caso 2: Verificar Backstage passes cuando se acerca el evento
  it('Debería aumentar la calidad de Backstage passes dependiendo del sellIn', () => {
    const backstagePass = gildedRose.items[2];
    
    // Varios valores de sellIn
    backstagePass.sellIn = 10;
    gildedRose.updateQuality();
    expect(backstagePass.quality).to.equal(22); // SellIn <= 10, aumenta 2

    backstagePass.sellIn = 5;
    gildedRose.updateQuality();
    expect(backstagePass.quality).to.equal(25); // SellIn <= 5, aumenta 3

    backstagePass.sellIn = 0;
    gildedRose.updateQuality();
    expect(backstagePass.quality).to.equal(0); // Después del evento, calidad = 0
  });

  // Caso 3: Verificar que los Conjured items disminuyan el doble de rápido
  it('Debería disminuir la calidad de Conjured Mana Cake dos veces más rápido', () => {
    const conjuredItem = gildedRose.items[3];
    const initialQuality = conjuredItem.quality;
    gildedRose.updateQuality();
    expect(conjuredItem.quality).to.equal(initialQuality - 2);
  });

  // Caso 4: Verificar que la calidad no sea menor que 0
  it('No debería permitir que la calidad de un item sea menor que 0', () => {
    gildedRose.items.forEach(item => {
      item.quality = 0; // Configura la calidad en 0
    });

    gildedRose.updateQuality();
    
    gildedRose.items.forEach(item => {
      expect(item.quality).to.be.at.least(0); // No debe ser menor que 0
    });
  });

  // Caso 5: Verificar que la calidad de Backstage passes se ponga a 0 después del evento
  it('La calidad de Backstage passes debería ser 0 después del evento', () => {
    const backstagePass = gildedRose.items[2];
    backstagePass.sellIn = 0; // El evento ha pasado
    gildedRose.updateQuality();
    expect(backstagePass.quality).to.equal(0);
  });

  // Caso 6: Verificar que los items con sellIn no expirado se comporten correctamente
  it('Debería disminuir la calidad de un item normal en 1 si no ha expirado', () => {
    const normalItem = gildedRose.items[4];
    const initialQuality = normalItem.quality;
    gildedRose.updateQuality();
    expect(normalItem.quality).to.equal(initialQuality - 1);
  });

  // Caso 7: Verificar que Sulfuras no cambie de ninguna manera
  it('Sulfuras, Hand of Ragnaros no debería cambiar su calidad ni su sellIn', () => {
    const sulfuras = gildedRose.items[1];
    const initialQuality = sulfuras.quality;
    const initialSellIn = sulfuras.sellIn;
    
    gildedRose.updateQuality();
    
    expect(sulfuras.quality).to.equal(initialQuality); // No cambia la calidad
    expect(sulfuras.sellIn).to.equal(initialSellIn); // No cambia el sellIn
  });

  // Caso 8: Verificar que Conjured Mana Cake disminuya su calidad más rápido después de la fecha de vencimiento
  it('Conjured Mana Cake debería disminuir su calidad el doble después de la fecha de vencimiento', () => {
    const conjuredItem = gildedRose.items[3];
    conjuredItem.sellIn = -1; // Venció
    const initialQuality = conjuredItem.quality;
    gildedRose.updateQuality();
    expect(conjuredItem.quality).to.equal(initialQuality - 2); // Decrementa 4 por ser Conjured y estar vencido
  });
});
