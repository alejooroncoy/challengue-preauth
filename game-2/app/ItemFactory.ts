import AgedBrieUpdater from "./updaters/AgedBrieUpdater";
import BackstagePassesUpdater from "./updaters/BackstagePassesUpdater";
import ConjuredUpdater from "./updaters/ConjuredUpdater";
import { Item } from "./gilded-rose";
import { ItemUpdater } from "./updaters/ItemUpdater";
import NormalItemUpdater from "./updaters/NormalItemUpdater";
import SulfurasUpdater from "./updaters/SulfurasUpdater";

class ItemFactory {
  private static readonly TYPES_ITEMS = {
    AGED_BRIE: "Aged Brie",
    SULFURAS: "Sulfuras, Hand of Ragnaros",
    BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
    CONJURED_MANA_CAKE: "Conjured Mana Cake",
  };

  static getUpdater(item: Item): ItemUpdater {
    switch (item.name) {
      case ItemFactory.TYPES_ITEMS.AGED_BRIE:
        return new AgedBrieUpdater();
      case ItemFactory.TYPES_ITEMS.SULFURAS:
        return new SulfurasUpdater();
      case ItemFactory.TYPES_ITEMS.BACKSTAGE_PASSES:
        return new BackstagePassesUpdater();
      case ItemFactory.TYPES_ITEMS.CONJURED_MANA_CAKE:
        return new ConjuredUpdater();
      default:
        return new NormalItemUpdater();
    }
  }
}

export default ItemFactory;
